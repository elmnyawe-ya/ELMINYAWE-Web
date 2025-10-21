import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { CodeSnippet } from '../types';
import { getCodeSnippets } from '../services/dataService';

// highlight.js is loaded via CDN
declare const hljs: any;

const CodeSnippetCard: React.FC<{ snippet: CodeSnippet }> = ({ snippet }) => {
  const codeRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [snippet.code]);

  return (
    <div className="bg-dark-bg/50 border border-neon-cyan/30 rounded-lg overflow-hidden glow-border-hover transition-all duration-300 transform hover:-translate-y-1">
      {snippet.imageUrl && <img src={snippet.imageUrl} alt={snippet.title} className="w-full h-48 object-cover" />}
      <div className="p-4">
        <h3 className="text-xl font-bold text-neon-cyan glow-text-hover">{snippet.title}</h3>
        <p className="text-gray-400 text-sm mt-1 mb-2">{snippet.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="bg-black/50 px-2 py-1 rounded">{snippet.language}</span>
          <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="max-h-40 overflow-auto bg-black/50 rounded-md p-2">
          <pre><code ref={codeRef} className={`language-${snippet.language.toLowerCase()}`}>{snippet.code}</code></pre>
        </div>
        {snippet.tags && snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {snippet.tags.map((tag, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-neon-red/20 text-neon-red rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CodesPage: React.FC = () => {
  const { t } = useTranslation();
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadSnippets = () => {
      try {
        const data = getCodeSnippets();
        setSnippets(data);
      } catch (error) {
        console.error("Failed to fetch snippets:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSnippets();
  }, []);
  
  const filteredSnippets = useMemo(() => {
    if (!searchTerm) {
      return snippets;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return snippets.filter(snippet =>
      snippet.title.toLowerCase().includes(lowercasedFilter) ||
      snippet.description.toLowerCase().includes(lowercasedFilter) ||
      snippet.language.toLowerCase().includes(lowercasedFilter) ||
      snippet.tags?.some(tag => tag.toLowerCase().includes(lowercasedFilter))
    );
  }, [searchTerm, snippets]);

  if (loading) {
    return <div className="flex justify-center items-center h-64 text-neon-cyan">Loading snippets...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-neon-cyan glow-text mb-4 text-center">{t('codes_title', 'Code Snippets')}</h1>
      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          placeholder={t('search_placeholder', 'Search snippets...')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 bg-dark-bg/70 border border-neon-cyan/30 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan transition-all"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSnippets.map(snippet => (
          <CodeSnippetCard key={snippet.id} snippet={snippet} />
        ))}
      </div>
      {filteredSnippets.length === 0 && !loading && (
        <p className="text-center text-gray-500 col-span-full">
          {searchTerm ? t('no_results', 'No snippets found matching your search.') : t('no_codes', 'No code snippets yet.')}
        </p>
      )}
    </div>
  );
};

export default CodesPage;
