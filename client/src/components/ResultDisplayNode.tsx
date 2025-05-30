import { Handle, Position } from '@xyflow/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ResultDisplayNode({ data }: { data: any }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '15px',
      borderRadius: '8px',
      background: '#fff',
      width: 350,
      minHeight: 150
    }}>
      <Handle
        type="target"
        position={Position.Left}
        id="response-in"
        style={{
          background: '#ffc107',
          width: '10px',
          height: '10px'
        }}
      />
      <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
        Output:
      </div>
      <div
        className="bg-gray-50 p-3 rounded-md shadow-inner text-sm text-gray-800 prose prose-sm max-w-none"
        style={{ maxHeight: '300px', overflowY: 'auto' }}
      >
        {data.response ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data.response}
          </ReactMarkdown>
        ) : (
          data.isLoading ? "Waiting for response..." : "Output will appear here."
        )}
      </div>
    </div>
  );
}
