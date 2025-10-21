export interface CodeSnippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  imageUrl?: string;
  createdAt: number;
  tags?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  createdAt: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string;
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
}

export interface ContentItem {
  id: string;
  type: 'code' | 'project' | 'skill';
  data: CodeSnippet | Project | Skill;
}
