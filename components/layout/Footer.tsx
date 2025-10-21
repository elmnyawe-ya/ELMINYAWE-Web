import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-black border-t border-neon-red/30 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-red/5 to-transparent" />
      
      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-neon-red glow-text-subtle mb-2">ELMINYAWE</h3>
            <p className="text-muted-foreground text-sm">
              {t('footer_tagline', 'The Futurist Developer Hub')}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Quick Links</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-muted-foreground hover:text-neon-red transition text-sm">
                {t('nav_about', 'About')}
              </a>
              <a href="#skills" className="block text-muted-foreground hover:text-neon-red transition text-sm">
                {t('nav_skills', 'Skills')}
              </a>
              <a href="#projects" className="block text-muted-foreground hover:text-neon-red transition text-sm">
                {t('nav_projects', 'Projects')}
              </a>
              <a href="#contact" className="block text-muted-foreground hover:text-neon-red transition text-sm">
                {t('nav_contact', 'Contact')}
              </a>
            </div>
          </div>
          
          {/* Social */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-3">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://youtube.com/@johnny12407?si=_JQ8umT0CHBuNwKy" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-neon-red transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="mailto:steg453@gmail.com" className="text-muted-foreground hover:text-neon-red transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neon-red/20 pt-6 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} ELMINYAWE. {t('footer_text', 'All rights reserved.')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
