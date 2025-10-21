import type { CodeSnippet, Project, Skill } from '../types';

// Storage keys
const STORAGE_KEYS = {
  CODES: 'elminyawe_codes',
  PROJECTS: 'elminyawe_projects',
  SKILLS: 'elminyawe_skills',
  ADMIN_PASSWORD: 'elminyawe_admin_password'
};

// Default admin password (can be changed via admin panel)
const DEFAULT_ADMIN_PASSWORD = 'Myyaa1212';

// Initialize storage with default data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD)) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, DEFAULT_ADMIN_PASSWORD);
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.CODES)) {
    localStorage.setItem(STORAGE_KEYS.CODES, JSON.stringify(getDefaultCodes()));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(getDefaultProjects()));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.SKILLS)) {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(getDefaultSkills()));
  }
};

// Admin Authentication
export const verifyAdminPassword = (password: string): boolean => {
  const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD) || DEFAULT_ADMIN_PASSWORD;
  return password === stored;
};

export const updateAdminPassword = (newPassword: string): void => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newPassword);
};

// Code Snippets Management
export const getCodeSnippets = (): CodeSnippet[] => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.CODES);
  return data ? JSON.parse(data) : [];
};

export const addCodeSnippet = (snippet: Omit<CodeSnippet, 'id' | 'createdAt'>): CodeSnippet => {
  const snippets = getCodeSnippets();
  const newSnippet: CodeSnippet = {
    ...snippet,
    id: `code_${Date.now()}`,
    createdAt: Date.now()
  };
  snippets.unshift(newSnippet);
  localStorage.setItem(STORAGE_KEYS.CODES, JSON.stringify(snippets));
  return newSnippet;
};

export const updateCodeSnippet = (id: string, updates: Partial<CodeSnippet>): void => {
  const snippets = getCodeSnippets();
  const index = snippets.findIndex(s => s.id === id);
  if (index !== -1) {
    snippets[index] = { ...snippets[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.CODES, JSON.stringify(snippets));
  }
};

export const deleteCodeSnippet = (id: string): void => {
  const snippets = getCodeSnippets().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.CODES, JSON.stringify(snippets));
};

// Projects Management
export const getProjects = (): Project[] => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
  return data ? JSON.parse(data) : [];
};

export const addProject = (project: Omit<Project, 'id' | 'createdAt'>): Project => {
  const projects = getProjects();
  const newProject: Project = {
    ...project,
    id: `project_${Date.now()}`,
    createdAt: Date.now()
  };
  projects.unshift(newProject);
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  return newProject;
};

export const updateProject = (id: string, updates: Partial<Project>): void => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }
};

export const deleteProject = (id: string): void => {
  const projects = getProjects().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
};

// Skills Management
export const getSkills = (): Skill[] => {
  initializeStorage();
  const data = localStorage.getItem(STORAGE_KEYS.SKILLS);
  return data ? JSON.parse(data) : [];
};

export const addSkill = (skill: Omit<Skill, 'id'>): Skill => {
  const skills = getSkills();
  const newSkill: Skill = {
    ...skill,
    id: `skill_${Date.now()}`
  };
  skills.push(newSkill);
  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  return newSkill;
};

export const updateSkill = (id: string, updates: Partial<Skill>): void => {
  const skills = getSkills();
  const index = skills.findIndex(s => s.id === id);
  if (index !== -1) {
    skills[index] = { ...skills[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }
};

export const deleteSkill = (id: string): void => {
  const skills = getSkills().filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
};

// Default Data Functions
function getDefaultCodes(): CodeSnippet[] {
  return [
    {
      id: 'code_1',
      title: 'Futuristic Glow Effect',
      description: 'A simple CSS snippet to create a glowing text effect, perfect for a sci-fi UI.',
      language: 'CSS',
      code: `.glow-text {
  color: #fff;
  text-shadow:
    0 0 7px #fff,
    0 0 10px #fff,
    0 0 21px #fff,
    0 0 42px #ff0032,
    0 0 82px #ff0032,
    0 0 92px #ff0032,
    0 0 102px #ff0032,
    0 0 151px #ff0032;
}`,
      imageUrl: 'https://picsum.photos/seed/glow/800/600',
      createdAt: Date.now() - 1000 * 60 * 60 * 24,
      tags: ['CSS', 'Effects', 'UI']
    },
    {
      id: 'code_2',
      title: 'React Custom Hook for Fetch',
      description: 'A reusable React hook to handle data fetching, loading, and error states.',
      language: 'JavaScript',
      code: `import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};`,
      createdAt: Date.now() - 1000 * 60 * 60 * 48,
      tags: ['React', 'Hooks', 'JavaScript']
    },
    {
      id: 'code_3',
      title: 'Python Web Scraper',
      description: 'A basic web scraper using BeautifulSoup and Requests to extract titles from a webpage.',
      language: 'Python',
      code: `import requests
from bs4 import BeautifulSoup

URL = 'http://example.com'
page = requests.get(URL)

soup = BeautifulSoup(page.content, 'html.parser')
titles = soup.find_all('h1')

for title in titles:
    print(title.text)`,
      imageUrl: 'https://picsum.photos/seed/python/800/600',
      createdAt: Date.now(),
      tags: ['Python', 'Web Scraping']
    }
  ];
}

function getDefaultProjects(): Project[] {
  return [
    {
      id: 'project_1',
      title: 'ELMINYAWE Developer Hub',
      description: 'A futuristic developer portfolio with AI chat, code snippets, and stunning visual effects.',
      imageUrl: 'https://picsum.photos/seed/elminyawe/800/600',
      technologies: ['React', 'TypeScript', 'Vite', 'TailwindCSS'],
      githubUrl: 'https://github.com/elmnyawe-ya/ELMINYAWE-Web',
      liveUrl: 'https://elmnyawe-ya.github.io/ELMINYAWE-Web',
      createdAt: Date.now()
    }
  ];
}

function getDefaultSkills(): Skill[] {
  return [
    { id: 'skill_1', name: 'React', category: 'Frontend', level: 95, icon: '⚛️' },
    { id: 'skill_2', name: 'TypeScript', category: 'Language', level: 90, icon: '📘' },
    { id: 'skill_3', name: 'Node.js', category: 'Backend', level: 85, icon: '🟢' },
    { id: 'skill_4', name: 'Python', category: 'Language', level: 88, icon: '🐍' },
    { id: 'skill_5', name: 'TailwindCSS', category: 'Styling', level: 92, icon: '🎨' },
    { id: 'skill_6', name: 'Git', category: 'Tools', level: 87, icon: '📦' }
  ];
}

// Export for initialization
export const initializeDataStorage = initializeStorage;
