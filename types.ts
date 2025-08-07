
export type SearchMode = 'internal' | 'external';

export interface Source {
  title: string;
  url: string;
  type: 'jira' | 'confluence' | 'web';
}

export interface SearchResult {
  summary?: string;
  sources: Source[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
