import { useState, useCallback, useMemo, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  MiniMap,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css'; 

// Import your custom nodes (adjust paths if necessary)
import PromptInputNode from '../components/PromptInputNode';
import ToolSelectNode from '../components/ToolSelectNode';
import RunActionNode from '../components/RunActionNode';
import ResultDisplayNode from '../components/ResultDisplayNode';
import type { ActionNodeData, OutputNodeData, PromptNodeData, ToolNodeData } from "../types/types";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TOOLS = [
  "web-search", "calculator",
] as const;

// Initial structure of nodes
const initialNodesConfig = [
  {
    id: 'prompt',
    type: 'promptInputNode',
    position: { x: 50, y: 50 },
    data: { label: '📝 Enter Prompt' },
  },
  {
    id: 'tool',
    type: 'toolSelectNode',
    position: { x: 50, y: 260 },
    data: { label: '🛠️ Select Tool', tools: TOOLS }, 
  },
  {
    id: 'action',
    type: 'runActionNode',
    position: { x: 400, y: 155 }, 
    data: {},
  },
  {
    id: 'output',
    type: 'resultDisplayNode',
    position: { x: 700, y: 125 },
    data: { },
  },
];

// Initial connections between nodes
const initialEdgesConfig = [
  { id: 'e-prompt-action', source: 'prompt', target: 'action', sourceHandle: 'prompt-out', targetHandle: 'prompt-in', animated: true, style: { stroke: '#007bff', strokeWidth: 2 } },
  { id: 'e-tool-action', source: 'tool', target: 'action', sourceHandle: 'tool-out', targetHandle: 'tool-in', animated: true, style: { stroke: '#28a745', strokeWidth: 2 } },
  { id: 'e-action-output', source: 'action', target: 'output', sourceHandle: 'response-out', targetHandle: 'response-in', animated: true, style: { stroke: '#ffc107', strokeWidth: 2 } },
];

export default function AgentRunner() {
  const [prompt, setPrompt] = useState("");
  const [tool, setTool] = useState("web-search");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesConfig);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesConfig);

  const handleRun = async () => {
    if (!prompt.trim()) {
      toast.warning("Please enter a prompt before running.");
      return;
    }
  
    const containsNumber = /\d/.test(prompt);
    const isCalcPrompt = /^[\d\s+\-*/().]+$/.test(prompt.trim());
  
    if (tool === "calculator" && !containsNumber) {
      toast.error("Calculator tool requires numeric input.");
      return;
    }
  
    if (tool === "web-search" && isCalcPrompt) {
      toast.info("Web Search is not suited for mathematical calculations.");
      return;
    }
  
    setLoading(true);
    setResponse("");
  
    try {
      const res = await fetch("https://alpha-agent-runner.vercel.app/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, tool }),
      });
  
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
  
      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");
  
      if (!reader) {
        setResponse("Error: Could not read response stream.");
        setLoading(false);
        toast.error("Failed to read the response stream.");
        return;
      }
  
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        setResponse(prev => prev + decoder.decode(value));
      }
  
      toast.success("Response generated successfully!");
    } catch (error: any) {
      console.error("Failed to run agent:", error);
      setResponse(`Error: ${error.message}`);
      toast.error(`Error running agent: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  

  // Define nodeTypes for React Flow, mapping type names to components
  const nodeTypes = useMemo(() => ({
    promptInputNode: PromptInputNode,
    toolSelectNode: ToolSelectNode,
    runActionNode: RunActionNode,
    resultDisplayNode: ResultDisplayNode,
  }), []);

  // useEffect to update node data when App state changes
  useEffect(() => {
    setNodes((currentNodes:any) =>
      currentNodes.map((n:any) => {
        switch (n.id) {
          case 'prompt':
            return {
              ...n,
              data: {
                ...(n.data as PromptNodeData),
                value: prompt,
                onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value),
              },
            };
          case 'tool':
            return {
              ...n,
              data: {
                ...(n.data as ToolNodeData),
                value: tool,
                tools: TOOLS,
                onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setTool(e.target.value),
              },
            };
          case 'action':
            return {
              ...n,
              data: {
                ...(n.data as ActionNodeData),
                onClick: handleRun,
                loading,
              },
            };
          case 'output':
            return {
              ...n,
              data: {
                ...(n.data as OutputNodeData),
                response,
                isLoading: loading && !response,
              },
            };
          default:
            return n;
        }
      })
    );
  }, [prompt, tool, loading, response]);
  

  const onConnect = useCallback(
    (params:any) => setEdges((eds:any) => addEdge({ ...params, animated: true, style: { strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  return (
    <>
    <ToastContainer />
    <ReactFlowProvider>
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }} className="bg-gray-100">
        <h1 className="text-3xl font-bold text-center py-4 bg-white shadow-sm text-gray-800">
          Alpha Agent Runner - Node View 🚀
        </h1>
        <div style={{ flexGrow: 1 }}> {/* This div will contain the ReactFlow component and take remaining space */}
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.1 }}
          >
            <Controls />
            <MiniMap nodeStrokeWidth={3} zoomable pannable />
            <Background variant="dots" gap={16} size={2} color="#ddd" />
          </ReactFlow>
        </div>
      </div>
    </ReactFlowProvider>
    <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
}