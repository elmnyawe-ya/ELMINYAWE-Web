import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../contexts/ToastContext';
import { getCodeSnippets, addCodeSnippet, updateCodeSnippet, deleteCodeSnippet } from '../../services/dataService';
import type { CodeSnippet } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Modal } from '../ui/Modal';

const CodeManagement: React.FC = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState<CodeSnippet | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    language: 'JavaScript',
    code: '',
    imageUrl: '',
    tags: ''
  });

  useEffect(() => {
    loadSnippets();
  }, []);

  const loadSnippets = () => {
    const data = getCodeSnippets();
    setSnippets(data);
  };

  const handleOpenModal = (snippet?: CodeSnippet) => {
    if (snippet) {
      setEditingSnippet(snippet);
      setFormData({
        title: snippet.title,
        description: snippet.description,
        language: snippet.language,
        code: snippet.code,
        imageUrl: snippet.imageUrl || '',
        tags: snippet.tags?.join(', ') || ''
      });
    } else {
      setEditingSnippet(null);
      setFormData({
        title: '',
        description: '',
        language: 'JavaScript',
        code: '',
        imageUrl: '',
        tags: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSnippet(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const snippetData = {
      title: formData.title,
      description: formData.description,
      language: formData.language,
      code: formData.code,
      imageUrl: formData.imageUrl || undefined,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    if (editingSnippet) {
      updateCodeSnippet(editingSnippet.id, snippetData);
      addToast(t('code_updated', 'Code snippet updated successfully'), 'success');
    } else {
      addCodeSnippet(snippetData);
      addToast(t('code_added', 'Code snippet added successfully'), 'success');
    }

    loadSnippets();
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t('confirm_delete', 'Are you sure you want to delete this item?'))) {
      deleteCodeSnippet(id);
      addToast(t('code_deleted', 'Code snippet deleted successfully'), 'success');
      loadSnippets();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neon-red glow-text-subtle">
          {t('code_snippets', 'Code Snippets')}
        </h2>
        <Button onClick={() => handleOpenModal()}>
          + {t('add_code', 'Add Code')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="bg-dark-bg/50 border border-neon-cyan/30 rounded-lg p-4 hover:border-neon-cyan transition-all"
          >
            <h3 className="text-lg font-bold text-neon-cyan mb-2">{snippet.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{snippet.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span>{snippet.language}</span>
              <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => handleOpenModal(snippet)}
                size="sm"
                variant="outline"
                className="flex-1"
              >
                {t('edit', 'Edit')}
              </Button>
              <Button
                onClick={() => handleDelete(snippet.id)}
                size="sm"
                variant="outline"
                className="flex-1 hover:bg-red-500/10 hover:border-red-500"
              >
                {t('delete', 'Delete')}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {snippets.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {t('no_codes', 'No code snippets yet. Add your first one!')}
        </div>
      )}

      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          title={editingSnippet ? t('edit_code', 'Edit Code Snippet') : t('add_code', 'Add Code Snippet')}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neon-red mb-2">
                {t('title', 'Title')}
              </label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neon-red mb-2">
                {t('description', 'Description')}
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neon-red mb-2">
                {t('language', 'Language')}
              </label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-4 py-2 bg-background border-2 border-neon-red/30 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-neon-red"
              >
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>Python</option>
                <option>Java</option>
                <option>C++</option>
                <option>CSS</option>
                <option>HTML</option>
                <option>PHP</option>
                <option>Ruby</option>
                <option>Go</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neon-red mb-2">
                {t('code', 'Code')}
              </label>
              <Textarea
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
                rows={10}
                className="font-mono text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neon-red mb-2">
                {t('image_url', 'Image URL')} ({t('optional', 'Optional')})
              </label>
              <Input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neon-red mb-2">
                {t('tags', 'Tags')} ({t('comma_separated', 'Comma separated')})
              </label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="React, Hooks, JavaScript"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                {t('cancel', 'Cancel')}
              </Button>
              <Button type="submit" className="flex-1">
                {editingSnippet ? t('update', 'Update') : t('add', 'Add')}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default CodeManagement;
