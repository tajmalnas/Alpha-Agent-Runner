// AT THE VERY TOP OF YOUR FILE:
// Try this import style for Cheerio first.
import * as cheerio from 'cheerio';
// If the above import *as cheerio doesn't work, and you've confirmed esModuleInterop is true,
// you could revert to `import cheerio from "cheerio";` but the `* as` form is often more robust.

import axios from "axios";

// Ensure your SERPER_API_KEY is loaded from .env or your environment configuration
const SERPER_API_KEY = process.env.SERPER_API_KEY;

// Interface for better type safety with Serper's organic results
interface OrganicSearchResult {
  title: string;
  link: string;
  snippet: string;
  position: number;
  // Add other properties if you use them
}

/**
 * Fetches HTML content from a URL.
 */
async function fetchHTML(url: string): Promise<string> {
  try {
    console.log(`Fetching HTML from: ${url}`);
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; YourLLMBot/1.0; +http://yourdomain.com/bot-info)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      timeout: 10000,
    });
    console.log(`Fetched HTML (length: ${data.length}) from ${url}`);
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(`Failed to fetch URL: ${url}. Status: ${error.response?.status}. Message: ${error.message}`);
    } else {
      console.error(`Failed to fetch URL: ${url}. Error: ${error.message || error}`);
    }
    return "";
  }
}

/**
 * Extracts readable text content from HTML using Cheerio.
 */
function extractTextFromHTML(html: string): string {
  if (!html || typeof html !== 'string' || html.trim() === "") {
    console.warn("Empty or invalid HTML received, skipping Cheerio processing.");
    return "";
  }

  // --- DIAGNOSTIC LOGS FOR CHEERIO ---
  console.log('Inside extractTextFromHTML:');
  console.log('  typeof cheerio:', typeof cheerio);
  if (cheerio && typeof cheerio === 'object') {
    console.log('  cheerio.load available:', typeof cheerio.load === 'function');
    // console.log('  Cheerio object keys:', Object.keys(cheerio)); // Can be very verbose
  } else if (typeof cheerio === 'function') {
    // If cheerio itself is the load function (less common with `import * as cheerio`)
    console.log('  Cheerio is a function.');
  }


  // Check if Cheerio or its load function is actually available
  if (!cheerio || typeof cheerio.load !== 'function') {
    console.error("Cheerio is not loaded correctly or cheerio.load is not a function. Cannot parse HTML.");
    // You could log the `cheerio` object itself here for more detail if it's not too large:
    // console.error("Cheerio object is:", cheerio);
    return ""; // Critical error, cannot proceed with parsing
  }
  // --- END DIAGNOSTIC LOGS ---

  try {
    // This is where the error "Cannot read properties of undefined (reading 'load')" happens
    // if `cheerio` (the object) is undefined, or if the `cheerio` object doesn't have a `load` method.
    const $ = cheerio.load(html);

    $("script, style, nav, footer, header, aside, form, noscript, iframe, link, meta, img, svg, path, button, input").remove();

    let text = "";
    const selectors = ["article", 'main', 'div[role="main"]', ".main-content", ".content", ".post-content", "#content", "#main", ".entry-content", ".td-post-content"];
    let foundSelector = false;

    for (const selector of selectors) {
      if ($(selector).length > 0) {
        text = $(selector).text();
        console.log(`Extracted text using selector: "${selector}"`);
        foundSelector = true;
        break;
      }
    }

    if (!foundSelector) {
      text = $("body").text();
      console.log("Extracted text using <body> as a fallback");
    }

    const cleanedText = text.replace(/\s\s+/g, " ").trim();
    console.log(`Extracted text length (before slicing): ${cleanedText.length}`);
    return cleanedText.length > 50 ? cleanedText.slice(0, 4000) : "";
  } catch (err: any) {
    // This catch block might not even be reached if `cheerio.load` itself fails due to `cheerio` being undefined.
    // The diagnostic check above is more likely to catch the issue first.
    console.error("Error during HTML parsing with Cheerio (within try-catch):", err.message || err);
    return "";
  }
}

/**
 * Performs a web search using Serper API, fetches content from top results,
 * and extracts text to be passed to an LLM.
 */
export async function performWebSearch(query: string): Promise<string> {
  if (!SERPER_API_KEY) {
    console.error("SERPER_API_KEY is not defined. Please set it in your environment variables.");
    return "Web search is not available due to missing API key.";
  }

  if (!query || typeof query !== 'string' || query.trim() === "") {
    return "Invalid search query provided.";
  }

  try {
    console.log(`Performing web search for query: "${query}"`);
    const response = await axios.post(
      "https://google.serper.dev/search",
      JSON.stringify({ q: query, num: 5 }), // Request 5 results
      {
        headers: {
          "X-API-KEY": SERPER_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const results: OrganicSearchResult[] = response.data.organic || [];
    console.log(`Number of organic results received: ${results.length}`);

    if (results.length === 0) {
      return "No search results found for your query.";
    }

    const maxResultsToProcess = 3;
    const scrapedContents: string[] = [];

    for (let i = 0; i < Math.min(maxResultsToProcess, results.length); i++) {
      const result = results[i];
      const url = result.link;

      if (!url) {
        console.warn(`Result at index ${i} (Title: ${result.title}) missing URL, skipping.`);
        continue;
      }
      if (url.endsWith(".pdf") || url.endsWith(".doc") || url.endsWith(".xml") || url.endsWith(".jpg") || url.endsWith(".png")) {
        console.warn(`Skipping non-HTML or image link: ${url}`);
        continue;
      }

      console.log(`Processing result ${i + 1}: ${result.title} (${url})`);
      const html = await fetchHTML(url);

      if (!html) {
        console.warn(`No HTML content fetched from URL: ${url}, skipping.`);
        continue;
      }

      const textContent = extractTextFromHTML(html); // This is where Cheerio is used
      if (textContent && textContent.length > 100) { // Min length for meaningful content
        scrapedContents.push(`Source URL: ${url}\nContent Snippet:\n${textContent}\n`);
      } else {
        console.warn(`Extracted text too short (or empty) from URL: ${url}. Length: ${textContent?.length || 0}. Skipping.`);
      }
    }

    // --- FALLBACK TO SNIPPETS ---
    if (scrapedContents.length === 0) {
      console.warn("Full content scraping failed to yield significant results. Attempting to use search result snippets as fallback.");
      const snippetContents = results
        .slice(0, maxResultsToProcess) // Use snippets from the same number of results we attempted to scrape
        .map(result => {
          if (result.snippet) {
            return `Source Title: ${result.title}\nURL: ${result.link}\nSnippet:\n${result.snippet}\n`;
          }
          return null;
        })
        .filter(content => content !== null) as string[];

      if (snippetContents.length > 0) {
        const finalContext = `Could not fetch full page content. Using SNIPPETS from web search for "${query}":\n\n` + snippetContents.join("\n---\n");
        console.log(`Final combined context (from snippets) length: ${finalContext.length}`);
        return finalContext;
      } else {
        return "Could not extract sufficient readable content or even snippets from the top search results.";
      }
    }
    // --- END FALLBACK ---

    const finalContext = `Based on web search for "${query}":\n\n` + scrapedContents.join("\n---\n");
    console.log(`Final combined context (from full scrape) length: ${finalContext.length}`);
    return finalContext;

  } catch (error: any) {
    console.error("Error in performWebSearch function:");
    if (axios.isAxiosError(error) && error.response) {
      console.error(`Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`);
      return `Failed to perform web search due to API error: ${error.response.data?.message || error.message}`;
    } else {
      console.error(error.message || error);
      return `Failed to perform web search: ${error.message || "An unknown error occurred."}`;
    }
  }
}

// Example usage (ensure you have SERPER_API_KEY in your .env or environment):
// (async () => {
//   const query = "What are the favourite food of elephants";
//   console.log("--- Running test query ---");
//   const searchContext = await performWebSearch(query);
//   console.log("\n--- LLM CONTEXT ---");
//   console.log(searchContext);
//   console.log("--- Test query finished ---");
// })();