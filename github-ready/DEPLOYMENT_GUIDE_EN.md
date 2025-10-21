# GitHub Pages Deployment Guide

## Complete Steps to Deploy Your Website

### 1. Repository Setup

1. Open GitHub and create a new repository named `ELMINYAWE-Web`
2. **Do not** add README, .gitignore, or license (we'll do this later)

### 2. Update Repository Name in Code

Open `vite.config.ts` and ensure this line contains your correct repository name:

```typescript
base: '/ELMINYAWE-Web/',  // Your repository name
```

### 3. Upload Files

#### Method 1: Using Command Line

```bash
cd github-ready
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ELMINYAWE-Web.git
git push -u origin main
```

#### Method 2: Using GitHub Interface (Drag & Drop)

1. Go to your repository on GitHub
2. Click "uploading an existing file"
3. Drag all files from the `github-ready` folder and drop them
4. Click "Commit changes"

### 4. Enable GitHub Pages

1. Go to repository Settings
2. From the sidebar, select "Pages"
3. In "Build and deployment" section:
   - Source: Select "GitHub Actions"
4. Deployment will start automatically on any push

### 5. Access Your Website

After deployment completes (usually 2-5 minutes), your site will be available at:

```
https://YOUR-USERNAME.github.io/ELMINYAWE-Web/
```

## Admin Panel Access

### Default Admin Password

```
Myyaa1212
```

### Accessing Admin Panel:

1. Click the "Edits" menu item in the navigation bar
2. Enter the password
3. Now you can manage:
   - Code snippets
   - Projects
   - Skills
   - Change password

## Adding New Content

### Adding Code Snippet:

1. Go to Admin Panel → Manage Codes
2. Click "+ Add Code"
3. Fill the form:
   - Title
   - Description
   - Language
   - Code
   - Image URL (optional)
   - Tags (comma-separated)
4. Click "Add"

### Adding Project:

1. Go to Admin Panel → Manage Projects
2. Click "+ Add Project"
3. Fill in the required data
4. Click "Add"

### Adding Skill:

1. Go to Admin Panel → Manage Skills
2. Click "+ Add Skill"
3. Set:
   - Name
   - Category
   - Level (0-100%)
   - Icon (emoji)
4. Click "Add"

## Updating the Website

When making changes:

```bash
git add .
git commit -m "Description of changes"
git push
```

The site will automatically redeploy within minutes.

## Important Notes

### Data Storage

- All data (codes, projects, skills) is stored in browser `localStorage`
- Data persists across page reloads
- Data will be lost if browser data is cleared
- Each device/browser has its own data

### Security

- Admin password is stored locally in the browser
- To reset password:
  1. Open Developer Tools (F12)
  2. Go to Console
  3. Type:
     ```javascript
     localStorage.setItem('elminyawe_admin_password', 'YourNewPassword')
     ```

### Technical Support

If you encounter any issues:

- YouTube: [@johnny12407](https://youtube.com/@johnny12407?si=_JQ8umT0CHBuNwKy)
- Email: steg453@gmail.com
- Discord: [Join Server](https://discord.gg/wicks)

## Features

✅ No user login required
✅ Complete admin control panel
✅ Standalone AI chat
✅ Live content management
✅ Full Arabic & English support
✅ Responsive design for all devices
✅ Stunning visual effects
✅ GitHub Pages ready

---

**Congratulations! Your website is now ready to go live 🎉**
