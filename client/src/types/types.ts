export type CustomNode = 'prompt' | 'tool' | 'action' | 'output';

export interface PromptNodeData {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface ToolNodeData {
  value: string;
  tools: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface ActionNodeData {
  onClick: () => void;
  loading: boolean;
}

export interface OutputNodeData {
  response: string;
  isLoading: boolean;
}

export type NodeData =
  | PromptNodeData
  | ToolNodeData
  | ActionNodeData
  | OutputNodeData;
