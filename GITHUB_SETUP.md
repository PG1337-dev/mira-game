# 🚀 Quick GitHub Setup & Deployment

## Step-by-Step Instructions

### 1️⃣ Create GitHub Repository

Go to: https://github.com/new

Fill in:
- **Repository name**: `mira-game` ✅ (must match exactly!)
- **Description**: "Mira's Labyrinth - A fun letter collection game"
- Select: **Public** ✅
- **DON'T** check "Add a README file" ❌

Click **"Create repository"**

### 2️⃣ Push Code to GitHub

In your terminal (in the project folder):

```bash
# Add GitHub as remote
git remote add origin https://github.com/pablozzz/mira-game.git

# Push your code
git push -u origin main
```

**Note**: If you get "remote origin already exists", skip the first command and just run `git push -u origin main`

### 3️⃣ Deploy to GitHub Pages

```bash
npm run deploy
```

Wait 2-3 minutes...

### 4️⃣ Enable GitHub Pages

1. Go to: https://github.com/pablozzz/mira-game/settings/pages
2. Under "Source":
   - Select branch: **gh-pages**
   - Select folder: **/ (root)**
3. Click **Save**

### 5️⃣ Share the Game! 🎮

Your game will be live at:

**🌐 https://pablozzz.github.io/mira-game**

That's it! Send this link to your daughter!

---

## 🔄 To Update the Game Later

```bash
# After making changes:
git add .
git commit -m "your changes description"
git push
npm run deploy
```

---

## ⚡ Quick Commands Reference

```bash
# Run locally
npm run dev

# Deploy to GitHub Pages
npm run deploy

# Check for errors
npm run lint

# Build for production
npm run build
```

---

## 🐛 Common Issues

**"fatal: remote origin already exists"**
- Run: `git remote remove origin`
- Then try adding it again

**"Permission denied"**
- You need to authenticate with GitHub
- Use your GitHub username and password
- Or set up an access token

**"Page not found (404)"**
- Wait 2-5 minutes after first deployment
- Check Settings → Pages is configured correctly
- Verify `gh-pages` branch exists

---

For detailed instructions, see **DEPLOY.md**

