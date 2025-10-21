import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../shared/LanguageSwitcher';
import GlitchText from '../effects/GlitchText';
import AdminLoginModal from '../admin/AdminLoginModal';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive ? 'text-neon-red glow-text-subtle' : 'text-muted-foreground hover:text-neon-red hover:glow-text-subtle'
    }`;

  return (
    <header className="bg-black/90 backdrop-blur-sm sticky top-0 z-50 border-b border-neon-red/30">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-neon-red glow-text-subtle">
              <GlitchText>ELMINYAWE</GlitchText>
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-neon-red hover:glow-text-subtle transition-all duration-300">
              {t('nav_home', 'Home')}
            </a>
            <a href="#about" className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-neon-red hover:glow-text-subtle transition-all duration-300">
              {t('nav_about', 'About')}
            </a>
            <a href="#skills" className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-neon-red hover:glow-text-subtle transition-all duration-300">
              {t('nav_skills', 'Skills')}
            </a>
            <a href="#programming" className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-neon-red hover:glow-text-subtle transition-all duration-300">
              {t('nav_programming', 'Programming')}
            </a>
            <a href="#projects" className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-neon-red hover:glow-text-subtle transition-all duration-300">
              {t('nav_projects', 'Projects')}
            </a>
            <a href="#contact" className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-neon-red hover:glow-text-subtle transition-all duration-300">
              {t('nav_contact', 'Contact')}
            </a>
            <NavLink to="/codes" className={navLinkClass}>{t('nav_codes', 'Codes')}</NavLink>
            <NavLink to="/chat" className={navLinkClass}>{t('nav_chat', 'AI Chat')}</NavLink>
            
            {/* Edits Menu Item */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-neon-red hover:glow-text-subtle transition-all duration-300"
            >
              {t('nav_edits', 'Edits')}
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden px-2 py-2 text-neon-red"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neon-red/30">
            <div className="flex flex-col space-y-2">
              <a href="#home" className="px-3 py-2 text-sm text-muted-foreground hover:text-neon-red" onClick={() => setIsMenuOpen(false)}>
                {t('nav_home', 'Home')}
              </a>
              <a href="#about" className="px-3 py-2 text-sm text-muted-foreground hover:text-neon-red" onClick={() => setIsMenuOpen(false)}>
                {t('nav_about', 'About')}
              </a>
              <a href="#skills" className="px-3 py-2 text-sm text-muted-foreground hover:text-neon-red" onClick={() => setIsMenuOpen(false)}>
                {t('nav_skills', 'Skills')}
              </a>
              <a href="#programming" className="px-3 py-2 text-sm text-muted-foreground hover:text-neon-red" onClick={() => setIsMenuOpen(false)}>
                {t('nav_programming', 'Programming')}
              </a>
              <a href="#projects" className="px-3 py-2 text-sm text-muted-foreground hover:text-neon-red" onClick={() => setIsMenuOpen(false)}>
                {t('nav_projects', 'Projects')}
              </a>
              <a href="#contact" className="px-3 py-2 text-sm text-muted-foreground hover:text-neon-red" onClick={() => setIsMenuOpen(false)}>
                {t('nav_contact', 'Contact')}
              </a>
              <NavLink to="/codes" className="px-3 py-2 text-sm text-muted-foreground hover:text-neon-red" onClick={() => setIsMenuOpen(false)}>
                {t('nav_codes', 'Codes')}
              </NavLink>
              <NavLink to="/chat" className="px-3 py-2 text-sm text-muted-foreground hover:text-neon-red" onClick={() => setIsMenuOpen(false)}>
                {t('nav_chat', 'AI Chat')}
              </NavLink>
              <button
                onClick={() => {
                  setIsAdminModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="px-3 py-2 text-sm text-neon-red text-left"
              >
                {t('nav_edits', 'Edits')}
              </button>
            </div>
          </div>
        )}
      </nav>
      
      {isAdminModalOpen && <AdminLoginModal onClose={() => setIsAdminModalOpen(false)} />}
    </header>
  );
};

export default Header;
