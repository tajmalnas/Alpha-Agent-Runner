# 🤖 Alpha Agent Runner

**Alpha Agent Runner** is a full-stack application that allows users to run AI agents with dynamic branching logic, visualize the flow using a node-based UI, and interact with powerful LLMs. It supports real-time agent execution and stream-based outputs.

Built using modern technologies like **React**, **React Flow**, **Tailwind CSS**, **Node.js**, **Express**, **Supabase**, and **Redis**, it is designed for extensibility and performance.

---

## 🧠 Features

- 🌐 **Visual Node Editor**: Design complex agent pipelines with a drag-and-drop UI powered by React Flow.
- ⚡ **Streaming Output**: Real-time display of LLM responses using server-sent events or streaming APIs.
- 🔁 **Agent Branching**: Run agents in a logical flow, with each node representing an action or decision.
- 📦 **Database Integration**: Stores agents, executions, and user sessions in Supabase.
- 🧰 **Tool/Model Modularity**: Easily extend with new tools, models, and data sources.
- 🚀 **Full-stack Integration**: Built with a backend in Node.js + Express and frontend in React + Vite.
- 🔒 **Validation**: Uses `zod` for runtime validation of inputs and outputs.
- 🔁 **Caching**: Redis used for efficient job and response caching.
- 🔧**LLM**: Gemini 2.0 Flash for quick and efficient response.

---

## 🔧 Tech Stack

### Frontend
- ⚛️ **React** with **Vite**
- 🎨 **Tailwind CSS** for styling
- 🔗 **React Flow** for flow visualization
- 🧪 **Zod** for schema validation
- 🔄 **Axios/Fetch** for API communication

### Backend
- 🧩 **Node.js** with **Express**
- 🧪 **Zod** for request/response validation
- 💾 **Supabase** for PostgreSQL database & authentication
- 🚀 **Redis** for caching and real-time job tracking
- 🔄 **Streaming APIs** for continuous data flow from LLMs
- ⚡ **Serper API** for web searching

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- Redis installed locally or via cloud
- Supabase project (you can use the hosted version)

---

### 🔧 Backend Setup

```bash
cd backend
npm install
npm run build      # or use ts-node if you're in dev
npm start
```
