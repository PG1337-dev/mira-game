# 🚀 Deployment Guide - GitHub Pages

This guide will help you deploy Mira's Labyrinth Game to GitHub Pages so your daughter can play it online!

## 📋 Prerequisites

- Git installed on your computer
- GitHub account
- Node.js installed

## 🔧 Setup Steps

### 1️⃣ Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **"+"** button (top right) → **"New repository"**
3. Repository details:
   - **Name**: `mira-game` (must match exactly!)
   - **Description**: "A fun labyrinth game for kids"
   - **Public** (so it can be hosted on GitHub Pages)
   - ❌ **DON'T** initialize with README (we already have one)
4. Click **"Create repository"**

### 2️⃣ Connect Local Repository to GitHub

Open your terminal and run these commands:

```bash
cd /Users/pavelgerasimov/Projects/mira-game

# Add GitHub as remote (replace with your actual repo URL if different)
git remote add origin https://github.com/pablozzz/mira-game.git

# Push all commits to GitHub
git push -u origin main
```

**If you get an error about authentication:**
- You may need to create a Personal Access Token
- Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token with `repo` permissions
- Use the token as your password when pushing

### 3️⃣ Deploy to GitHub Pages

```bash
# Build and deploy in one command!
npm run deploy
```

This command will:
1. ✅ Run TypeScript checks
2. ✅ Build the production version
3. ✅ Create a `gh-pages` branch
4. ✅ Upload to GitHub Pages
5. ✅ Make your game live!

### 4️⃣ Enable GitHub Pages (First Time Only)

1. Go to your GitHub repository: `https://github.com/pablozzz/mira-game`
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **"Save"**

GitHub will show you the URL where your game is published!

## 🎮 Your Game URL

After deployment, your game will be available at:

**🌐 https://pablozzz.github.io/mira-game**

Share this link with your daughter! She can play it on any device with a browser!

## 🔄 Updating the Game

Whenever you make changes to the game:

```bash
# 1. Commit your changes
git add .
git commit -m "description of changes"

# 2. Push to GitHub
git push

# 3. Deploy the updates
npm run deploy
```

The game will update in ~2-5 minutes!

## 📱 Playing on Different Devices

### On Laptop/Desktop:
- Just open the URL in any browser
- Chrome, Firefox, Safari, Edge all work!

### On Tablet:
- Open the URL in the browser
- For easier access, add to home screen:
  - **iOS**: Safari → Share → "Add to Home Screen"
  - **Android**: Chrome → Menu → "Add to Home screen"

### On Phone:
- Works the same as tablet!
- Arrow keys won't work, but you could add touch controls later

## 🐛 Troubleshooting

### "404 - Page Not Found"
- Wait 2-5 minutes after first deploy
- Check GitHub Pages settings are correct
- Make sure `gh-pages` branch exists

### "Build Failed"
- Run `npm run lint` to check for errors
- Fix any TypeScript errors
- Try `npm run build` locally first

### "Permission Denied" when pushing
- You need to authenticate with GitHub
- Use a Personal Access Token as password
- Or set up SSH keys

### Game doesn't update after deploy
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait a few minutes for GitHub to process
- Check the `gh-pages` branch was updated on GitHub

## 🎨 Customization Ideas

Once deployed, you can easily customize:
- Change maze size in `GameBoard.tsx` (currently 15x15)
- Adjust colors in `src/styles/theme.ts`
- Modify hero character in `src/components/Hero.tsx`
- Add more letters or power-ups

## 📊 Analytics (Optional)

Want to see how many times the game is played?
- Add Google Analytics
- Use Cloudflare Web Analytics (free)
- GitHub doesn't provide usage stats for Pages

## 🎉 That's It!

Your game is now live on the internet! 🎮✨

Send the link to your daughter and watch her have fun! 

**Game URL**: https://pablozzz.github.io/mira-game

---

**Need Help?** Check the console for errors or re-read the setup steps carefully.

