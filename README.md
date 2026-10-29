# MD to WWW

**Author:** Giuseppe Bosi  
**Version:** 1.0.0

A general-purpose system that automatically converts Markdown files from a predefined folder into a fully functional website with hot reload, syntax highlighting, and customizable formatting.

## Features

- ✅ **Dynamic Hot Reload** - Changes reflected immediately without rebuild
- ✅ **Automatic Title Extraction** - Titles extracted from first `#` heading (no YAML required)
- ✅ **Syntax Highlighting** - Code blocks with Shiki engine (VS Code-like)
- ✅ **Table Rendering** - Professional Markdown table support
- ✅ **Formatting Panel** - Customizable font family and size
- ✅ **Responsive Design** - Works beautifully on all devices
- ✅ **Fixed Sidebar Navigation** - Easy navigation between documents

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create MD_Contents folder** (if not exists):
   ```bash
   mkdir MD_Contents
   ```

3. **Add Markdown files:**
   - Create `.md` files in `MD_Contents/` folder
   - Each file should start with `# Title` as first line

4. **Start development server:**
   
   **Option A - Using batch script (Windows, recommended):**
   ```bash
   start-server.bat
   ```
   Or double-click `start-server.bat` in Windows Explorer.
   
   **Option B - Using npm directly:**
   ```bash
   npm run dev
   ```
   
   **Note:** The batch script runs the server in background, so the terminal remains available.

5. **Open browser:**
   - Navigate to `http://localhost:3000`
   - Homepage shows list of all Markdown files
   - Click any file to view content

## Project Structure

```
MD_to_WWW/
├── MD_Contents/          # Input folder for Markdown files
├── app/                  # Next.js App Router
│   ├── layout.tsx       # Root layout with sidebar
│   ├── page.tsx         # Homepage
│   ├── [slug]/          # Dynamic pages
│   └── api/             # API routes
├── components/          # React components
├── contexts/            # React Context providers
├── lib/                 # Utility functions
└── public/              # Static assets
```

## Usage

### Adding New Documents

1. Create a new `.md` file in `MD_Contents/`
2. Start with `# Title` as first line
3. Write your content
4. File appears automatically in homepage and sidebar
5. No restart needed (hot reload)

### Formatting Options

Click the "Formattazione" button (top-right) to customize:
- **Font Family**: Sans Serif, Serif, Monospace
- **Font Size**: XS, Small, Normal, Large, XL, 2XL

Preferences are saved in localStorage and persist across sessions.

### Markdown Features Supported

- Headings (`#`, `##`, `###`, etc.)
- **Bold** and *italic* text
- Code blocks with syntax highlighting
- Inline `code`
- Tables
- Lists (ordered and unordered)
- Task lists
- Links and images
- Blockquotes
- And more...

## Development

### Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **react-markdown** with plugins:
  - `remark-gfm@3.0.1` (tables, task lists)
  - `rehype-pretty-code` (syntax highlighting)
  - `remark-slug` (anchor links)

### Scripts

#### NPM Scripts
- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

#### Batch Scripts (Windows)
- `start-server.bat` - Start development server in background
- `restart-server.bat` - Kill existing server and restart (with hot reload)
- `kill-server.bat` - Stop all Node.js processes (kill server)

## Configuration

### Environment Variables

- `MD_CONTENTS_PATH` - Override default `MD_Contents/` path (optional)
- `NEXT_PUBLIC_BASE_URL` - Base URL for API calls (default: `http://localhost:3000`)

### Customization

- **Syntax Highlighting Theme**: Edit `components/MarkdownContent.tsx` - change `theme: 'github-dark'`
- **Font Options**: Edit `contexts/FormatContext.tsx` - modify `defaultPreferences`
- **Sidebar Width**: Edit `components/Sidebar.tsx` - change `w-64` class

## API Routes

- `GET /api/markdown/list` - Returns list of all Markdown files
- `GET /api/markdown/[slug]` - Returns content of specific Markdown file

## Troubleshooting

### Files Not Appearing

- Check that files are in `MD_Contents/` folder
- Ensure files have `.md` extension
- Verify files start with `# Title` heading
- Check browser console for errors

### Hot Reload Not Working

- Ensure development server is running (`npm run dev` or `start-server.bat`)
- Check that files are being saved
- Wait 2-3 seconds for polling to detect changes
- Check browser console for API errors
- Try restarting the server: `restart-server.bat`

### Server Management

**Windows Users:**
- Use `start-server.bat` to start the server in background
- Use `restart-server.bat` to restart the server (kills and restarts)
- Use `kill-server.bat` to stop all Node.js processes
- These scripts handle process management automatically

### Syntax Highlighting Not Working

- Verify `rehype-pretty-code` is installed
- Check that code blocks have language specified (e.g., ` ```javascript`)
- Ensure `globals.css` is imported in layout

## Documentation

For detailed project information, see `PROJECT_INFO.md`.

## License

This project is private and proprietary.

## Author

**Giuseppe Bosi**  
Email: info@giuseppebosi.com

---

*Last Updated: 2025-01-05*


---

Author: Giuseppe Bosi · [www.giuseppebosi.com](https://www.giuseppebosi.com) · [LinkedIn](https://www.linkedin.com/in/giuseppebosi) · License: MIT
