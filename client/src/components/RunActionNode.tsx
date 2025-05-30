import { Handle, Position } from '@xyflow/react';

export default function RunActionNode({ data }: { data: any }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', background: '#fff', textAlign: 'center' }}>
      <Handle type="target" position={Position.Left} id="prompt-in" style={{ top: '35%', background: '#007bff', width: '10px', height: '10px' }} />
      <Handle type="target" position={Position.Left} id="tool-in" style={{ top: '65%', background: '#28a745', width: '10px', height: '10px' }}/>
      <button
        onClick={data.onClick}
        disabled={data.loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold shadow-md disabled:bg-gray-400"
      >
        {data.loading ? "Running..." : "Run Agent"}
      </button>
      <Handle type="source" position={Position.Right} id="response-out" style={{ background: '#ffc107', width: '10px', height: '10px' }}/>
    </div>
  );
}