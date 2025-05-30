import { Handle, Position } from '@xyflow/react';

export default function ToolSelectNode({ data }: { data: any }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', background: '#fff', width: 250 }}>
      <label htmlFor="tool-select" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
        {data.label || 'Tool:'}
      </label>
      <select
        id="tool-select"
        className="w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        value={data.value}
        onChange={data.onChange}
      >
        {data.tools?.map((t:any) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <Handle type="source" position={Position.Right} id="tool-out" style={{ background: '#28a745', width: '10px', height: '10px' }} />
    </div>
  );
}