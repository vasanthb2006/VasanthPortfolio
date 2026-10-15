# 📁 Portfolio Folder Structure

```
portfolio/
├── index.html          ← Main HTML file (edit all content here)
├── style.css           ← All styles, colors, fonts (edit theme here)
├── script.js           ← All JavaScript features
├── images/
│   ├── profile.jpg     ← Your profile photo (replace this)
│   └── certificates/
│       ├── cert1.jpg   ← Certificate images
│       ├── cert2.jpg
│       ├── cert3.jpg
│       └── cert4.jpg
└── resume/
    └── resume.pdf      ← Your resume PDF (replace this)
```

---

## ✏️ How to Edit

### Change Your Name / Title
Open `index.html` and search for:
- `Your Name` — replace with your actual name
- `Student / Java Developer` — edit in the `phrases` array in `script.js`

### Change Colors
Open `style.css` and edit the `:root` variables at the top:
```css
--accent: #f59e0b;   /* Gold accent color */
--bg-dark: #0f172a;  /* Dark background */
```

### Add a Certificate
In `index.html`, find the `<!-- ADD / REMOVE CERTIFICATE IMAGES HERE -->` comment and copy-paste a cert-card block:
```html
<div class="cert-card" onclick="openCertModal('images/certificates/certX.jpg', 'Your Title')">
  <img src="images/certificates/certX.jpg" alt="Your Title" />
  <div class="cert-overlay"><i class="fas fa-search-plus"></i></div>
  <p class="cert-title">Your Title</p>
</div>
```

### Add a Project
Find the `<!-- EDIT / ADD PROJECT CARDS HERE -->` comment and copy a project-card block.

### Update CGPA / Education
Find the `<!-- EDIT EDUCATION CARDS HERE -->` comment and update the text inside.

### Set Your Portfolio URL for QR Code
Open `script.js` and find section 8 (QR Code). Change:
```js
const portfolioURL = window.location.href; // auto-detects
// OR set manually:
const portfolioURL = "https://yourusername.github.io";
```

---

## 🚀 Deploy to GitHub Pages (Free Hosting)
1. Create a GitHub account and a new repository named `yourusername.github.io`
2. Upload all portfolio files to the repository
3. Go to Settings → Pages → Source: main branch
4. Your portfolio is live at `https://yourusername.github.io`
5. The QR code will auto-point to this URL!
