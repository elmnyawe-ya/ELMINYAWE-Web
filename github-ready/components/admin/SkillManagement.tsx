import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../contexts/ToastContext';
import { getSkills, addSkill, updateSkill, deleteSkill } from '../../services/dataService';
import type { Skill } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';

const SkillManagement: React.FC = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Frontend',
    level: 50,
    icon: '⚡'
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = () => {
    const data = getSkills();
    setSkills(data);
  };

  const handleOpenModal = (skill?: Skill) => {
    if (skill) {
      setEditingSkill(skill);
      setFormData({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        icon: skill.icon || '⚡'
      });
    } else {
      setEditingSkill(null);
      setFormData({
        name: '',
        category: 'Frontend',
        level: 50,
        icon: '⚡'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const skillData = {
      name: formData.name,
      category: formData.category,
      level: Number(formData.level),
      icon: formData.icon || undefined
    };

    if (editingSkill) {
      updateSkill(editingSkill.id, skillData);
      addToast(t('skill_updated', 'Skill updated successfully'), 'success');
    } else {
      addSkill(skillData);
      addToast(t('skill_added', 'Skill added successfully'), 'success');
    }

    loadSkills();
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm(t('confirm_delete', 'Are you sure you want to delete this item?'))) {
      deleteSkill(id);
      addToast(t('skill_deleted', 'Skill deleted successfully'), 'success');
      loadSkills();
    }
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-neon-red glow-text-subtle">
          {t('skills', 'Skills')}
        </h2>
        <Button onClick={() => handleOpenModal()}>
          + {t('add_skill', 'Add Skill')}
        </Button>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="text-xl font-bold text-neon-cyan mb-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorySkills.map((skill) => (
                <div
                  key={skill.id}
                  className="bg-dark-bg/50 border border-neon-cyan/30 rounded-lg p-4 hover:border-neon-cyan transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{skill.icon}</span>
                      <span className="font-bold text-white">{skill.name}</span>
                    </div>
                    <span className="text-neon-red font-bold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                    <div
                      className="bg-neon-red h-2 rounded-full transition-all"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleOpenModal(skill)}
                      size="sm"
                      variant="outline"
                      className="flex-1"
                    >
                      {t('edit', 'Edit')}
                    </Button>
                    <Button
                      onClick={() => handleDelete(skill.id)}
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
          </div>
        ))}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {t('no_skills', 'No skills yet. Add your first one!')}
        </div>
      )}

      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          title={editingSkill ? t('edit_skill', 'Edit Skill') : t('add_skill', 'Add Skill')}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neon-red mb-2">
                {t('name', 'Name')}
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neon-red mb-2">
                {t('category', 'Category')}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-background border-2 border-neon-red/30 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-neon-red"
              >
                <option>Frontend</option>
                <option>Backend</option>
                <option>Language</option>
                <option>Database</option>
                <option>Tools</option>
                <option>Styling</option>
                <option>DevOps</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neon-red mb-2">
                {t('level', 'Level')} ({formData.level}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neon-red mb-2">
                {t('icon', 'Icon')} ({t('emoji', 'Emoji')})
              </label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="⚡"
                maxLength={2}
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1">
                {t('cancel', 'Cancel')}
              </Button>
              <Button type="submit" className="flex-1">
                {editingSkill ? t('update', 'Update') : t('add', 'Add')}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SkillManagement;
