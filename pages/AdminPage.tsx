import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useToast } from '../contexts/ToastContext';
import { Button } from '../components/ui/Button';
import CodeManagement from '../components/admin/CodeManagement';
import ProjectManagement from '../components/admin/ProjectManagement';
import SkillManagement from '../components/admin/SkillManagement';
import PasswordManagement from '../components/admin/PasswordManagement';

type AdminTab = 'codes' | 'projects' | 'skills' | 'password';

const AdminPage: React.FC = () => {
  const { t } = useTranslation();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('codes');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if admin is logged in
    const session = sessionStorage.getItem('elminyawe_admin_session');
    if (session !== 'true') {
      addToast(t('admin_access_denied', 'Access denied. Please login as admin.'), 'error');
      navigate('/');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate, addToast, t]);

  const handleLogout = () => {
    sessionStorage.removeItem('elminyawe_admin_session');
    addToast(t('admin_logout', 'Logged out successfully'), 'success');
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  const tabs = [
    { id: 'codes' as AdminTab, label: t('manage_codes', 'Manage Codes'), icon: '💻' },
    { id: 'projects' as AdminTab, label: t('manage_projects', 'Manage Projects'), icon: '🚀' },
    { id: 'skills' as AdminTab, label: t('manage_skills', 'Manage Skills'), icon: '⚡' },
    { id: 'password' as AdminTab, label: t('change_password', 'Change Password'), icon: '🔐' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-neon-red glow-text mb-2">
              {t('admin_panel', 'Admin Panel')}
            </h1>
            <p className="text-gray-400">
              {t('admin_panel_desc', 'Manage your website content in real-time')}
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            {t('logout', 'Logout')}
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-neon-red/30 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-neon-red text-white shadow-red-glow'
                  : 'bg-black/50 text-gray-400 border border-neon-red/30 hover:bg-neon-red/10 hover:text-neon-red'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-black/50 border-2 border-neon-red/30 rounded-lg p-6 holographic-border">
          {activeTab === 'codes' && <CodeManagement />}
          {activeTab === 'projects' && <ProjectManagement />}
          {activeTab === 'skills' && <SkillManagement />}
          {activeTab === 'password' && <PasswordManagement />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
