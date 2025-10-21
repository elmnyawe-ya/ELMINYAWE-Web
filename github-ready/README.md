# ELMINYAWE - The Futurist Developer Hub

A cutting-edge developer portfolio featuring AI-powered chat, code snippets management, and stunning holographic visual effects with a black & red neon theme.

## 🚀 Features

- **AI Chat**: Integrated AI assistant powered by OpenRouter API with multiple models
- **Code Snippets Library**: Browse and search through code examples
- **Admin Panel**: Real-time content management (codes, projects, skills)
- **Bilingual Support**: Full i18n with Arabic and English
- **Stunning Effects**: Holographic grids, floating symbols, custom cursor
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **GitHub Pages Ready**: Configured for easy deployment

## 🔑 Admin Access

Default admin password: `Myyaa1212`

Access the admin panel by clicking the "Edits" menu item in the navigation bar and logging in.

### Admin Features:
- Add/Edit/Delete code snippets
- Manage projects
- Manage skills
- Change admin password

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment to GitHub Pages

1. Update the `base` in `vite.config.ts` with your repository name:
   ```ts
   base: '/YOUR-REPO-NAME/'
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy to GitHub Pages:
   - Push the `dist` folder to the `gh-pages` branch, OR
   - Use GitHub Actions (workflow file included)

## 🎨 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Routing**: React Router DOM
- **i18n**: i18next
- **AI**: OpenRouter API
- **Storage**: LocalStorage for data persistence

## 📁 Project Structure

```
├── components/
│   ├── admin/          # Admin panel components
│   ├── effects/        # Visual effects (glitch text)
│   ├── layout/         # Header, Footer, Layout
│   ├── sections/       # Home page sections
│   ├── shared/         # Shared components
│   ├── three/          # 3D effects
│   └── ui/             # UI components
├── contexts/           # React contexts
├── i18n/               # Internationalization
├── pages/              # Page components
├── services/           # Business logic & API
└── types/              # TypeScript types
```

## 🔐 Security Notes

- Admin password is stored in localStorage
- To reset password, use browser console:
  ```js
  localStorage.setItem('elminyawe_admin_password', 'YourNewPassword')
  ```
- All data is stored locally in the browser

## 📝 License

All rights reserved © 2025 ELMINYAWE

## 🤝 Contact

- YouTube: [@johnny12407](https://youtube.com/@johnny12407?si=_JQ8umT0CHBuNwKy)
- Email: steg453@gmail.com
- Discord: [Join Server](https://discord.gg/wicks)
