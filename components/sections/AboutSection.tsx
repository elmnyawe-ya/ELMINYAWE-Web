import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/Card';
import GlitchText from '@/components/effects/GlitchText';

const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-neon-red glow-text">
            <GlitchText>{t('about_title', 'About ELMINYAWE')}</GlitchText>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about_subtitle', 'Futuristic Developer & Technology Enthusiast')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                {t('about_text1', 'Welcome to ELMINYAWE - where innovation meets code. I\'m a passionate developer dedicated to creating cutting-edge web experiences.')}
              </p>
              <p className="text-lg">
                {t('about_text2', 'With expertise in modern web technologies, I bring ideas to life through clean, efficient, and visually stunning code.')}
              </p>
              <p className="text-lg">
                {t('about_text3', 'My work focuses on creating immersive digital experiences that push the boundaries of what\'s possible on the web.')}
              </p>
              <p className="text-lg">
                {t('about_text4', 'From AI-powered applications to interactive 3D interfaces, I\'m constantly exploring new frontiers in web development.')}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center p-6 hover:scale-105 transition-transform">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-neon-red glow-text mb-2">3+</div>
                <div className="text-muted-foreground">{t('years_experience', 'Years Experience')}</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:scale-105 transition-transform">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-neon-red glow-text mb-2">∞</div>
                <div className="text-muted-foreground">{t('projects_completed', 'Projects Completed')}</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:scale-105 transition-transform">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-neon-red glow-text mb-2">10k+</div>
                <div className="text-muted-foreground">{t('users_served', 'Users Served')}</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:scale-105 transition-transform">
              <CardContent className="p-0">
                <div className="text-4xl font-bold text-neon-red glow-text mb-2">∞</div>
                <div className="text-muted-foreground">{t('lines_of_code', 'Lines of Code')}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
