import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../contexts/ToastContext';
import { getProjects, addProject, updateProject, deleteProject } from '../../services/dataService';
import type { Project } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Modal } from '../ui/Modal';

const ProjectManagement: React.FC = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    technologies: '',
    githubUrl: '',
    liveUrl: ''
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const data = getProjects();
    setProjects(data);
  };

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl || '',
        technologies: project.technologies.join(', '),
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || ''
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        technologies: '',
        githubUrl: '',
        liveUrl: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      title: formData.title,
      description: formData.description,
      imageUrl: formData.imageUrl || undefined,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      githubUrl: formData.githubUrl || undefined,
      liveUrl: formData.liveUrl || undefined
    };

    if (editingProject) {
      updateProject(editingProject.id, projectData);
      addToast(t('project_updated', 'Project updated successfully'), 'success');
    } else {
      addProject(projectData);
      addToast(t('project_added', 'Project added successfully'), 'success');
    }

    loadProjects();
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t('confirm_delete', 'Are you sure you want to delete this item?'))) {
      deleteProject(id);
      addToast(t('project_deleted', 'Project deleted successfully'), 'success');
      loadProjects();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neon-red glow-text-subtle">
          {t('projects', 'Projects')}
        </h2>
        <Button onClick={() => handleOpenModal()}>
          + {t('add_project', 'Add Project')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-dark-bg/50 border border-neon-cyan/30 rounded-lg overflow-hidden hover:border-neon-cyan transition-all"
          >
            {project.imageUrl && (
              <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold text-neon-cyan mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-neon-red/20 text-neon-red text-xs rounded">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleOpenModal(project)}
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  {t('edit', 'Edit')}
                </Button>
                <Button
                  onClick={() => handleDelete(project.id)}
                  size="sm"
                  variant="outline"
                  className="flex-1 hover:bg-red-500/10 hover:border-red-500"
                >
                  {t('delete', 'Delete')}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {t('no_projects', 'No projects yet. Add your first one!')}
        </div>
      )}

      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          title={editingProject ? t('edit_project', 'Edit Project') : t('add_project', 'Add Project')}
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
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neon-red mb-2">
                {t('technologies', 'Technologies')} ({t('comma_separated', 'Comma separated')})
              </label>
              <Input
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="React, TypeScript, TailwindCSS"
                required
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
                {t('github_url', 'GitHub URL')} ({t('optional', 'Optional')})
              </label>
              <Input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neon-red mb-2">
                {t('live_url', 'Live URL')} ({t('optional', 'Optional')})
              </label>
              <Input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                {t('cancel', 'Cancel')}
              </Button>
              <Button type="submit" className="flex-1">
                {editingProject ? t('update', 'Update') : t('add', 'Add')}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ProjectManagement;
