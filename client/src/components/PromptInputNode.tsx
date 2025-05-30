import React from 'react';
import { Handle, Position } from '@xyflow/react';

export default function PromptInputNode({ data }: { data: any }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', background: '#fff', width: 250 }}>
      <label htmlFor="prompt-text" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
        {data.label || 'Prompt:'}
      </label>
      <textarea
        id="prompt-text"
        rows={4}
        className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter your instruction..."
        value={data.value}
        onChange={data.onChange}
        maxLength={500}
      />
      <Handle type="source" position={Position.Right} id="prompt-out" style={{ background: '#007bff', width: '10px', height: '10px' }} />
    </div>
  );
}