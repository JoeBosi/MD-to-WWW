# Project Information - MD to WWW

**Author:** Giuseppe Bosi  
**Project Type:** General Purpose Markdown to Website Converter  
**Status:** Planning Phase

---

## 1. Project Overview

### Description
A general-purpose system that automatically converts Markdown files from a predefined folder (`MD_Contents`) into a fully functional website. The system provides dynamic hot-reload capabilities, automatic title extraction, and a responsive UI with customizable formatting options.

### Core Objective
Create an automated website generator that:
- Reads Markdown files from `MD_Contents/` folder
- Dynamically generates web pages without manual configuration
- Provides real-time hot-reload during development
- Extracts titles automatically from Markdown content (no YAML frontmatter required)
- Renders content with syntax highlighting and proper table formatting
- Offers user-customizable text formatting options

### Key Principles
- **Zero Configuration**: Add MD files → Website updates automatically
- **Dynamic Hot Reload**: Changes visible immediately without rebuild
- **No Frontmatter**: Titles extracted from first `#` heading in file
- **Responsive Design**: Works beautifully on all devices
- **User Customization**: Format panel for font and size preferences

---

## 2. Requirements & Features

### Core Features

#### ✅ Implemented Requirements
1. **Dynamic Hot Reload**
   - Real-time file system watching
   - Changes reflected immediately without rebuild
   - No static generation needed

2. **Automatic Title Extraction**
   - Extracts title from first `#`, `##`, or `###` heading
   - No YAML frontmatter required
   - Fallback to "Untitled" if no heading found

3. **Homepage with File List**
   - Dynamic list of all Markdown files
   - Clickable links to open each file
   - Titles displayed from extracted headings

4. **Fixed Left Sidebar**
   - Navigation sidebar fixed on left side
   - Lists all available Markdown files
   - Responsive: hidden on mobile, hamburger menu
   - Updates automatically when files change

5. **Syntax Highlighting**
   - Code blocks with syntax highlighting
   - Based on Shiki engine (same as VS Code)
   - Supports 100+ programming languages
   - Dark theme with black background

6. **Table Rendering**
   - Proper Markdown table rendering
   - Professional compact styling
   - Responsive with horizontal scroll
   - Hover effects on rows

7. **Formatting Panel**
   - Font family selection (Sans Serif, Serif, Monospace)
   - Font size selection (XS, Small, Normal, Large, XL, 2XL)
   - Preferences saved in localStorage
   - Reset to defaults option

8. **Responsive Design**
   - Mobile-friendly layout
   - Sidebar adapts to screen size
   - Touch-friendly controls

### Future Enhancements (Optional)
- Full-text search functionality
- Categories/tags system
- Dark mode toggle
- Automatic TOC (Table of Contents) in sidebar
- Image support with automatic asset handling
- Line height customization
- Letter spacing options
- Content max-width settings
- Color theme selection

---

## 3. Technology Stack

### Core Framework
- **Next.js 15** (App Router)
  - Server-side rendering and static generation
  - API routes for file system access
  - Dynamic routing with `[slug]`

- **TypeScript**
  - Type safety throughout the project
  - Better IDE support and error detection

- **Tailwind CSS**
  - Utility-first CSS framework
  - Responsive design utilities
  - Dark mode support

### Markdown Processing
- **react-markdown** (`^9.0.0`)
  - React component for rendering Markdown
  - Plugin-based architecture

- **remark-gfm** (`3.0.1` - **locked version**)
  - GitHub Flavored Markdown support
  - Tables, strikethrough, task lists
  - ⚠️ **Important**: Version 4.0.1 has bugs with tables, use 3.0.1

- **rehype-pretty-code** (`^0.13.0`)
  - Syntax highlighting using Shiki engine
  - VS Code-like code rendering
  - Theme: `github-dark` (configurable)

- **remark-slug** (`^6.0.0`)
  - Generates IDs for headings
  - Enables anchor links in content

- **remark-toc** (optional)
  - Automatic table of contents generation

### File System & Hot Reload
- **chokidar** (`^3.5.3`)
  - File system watcher
  - Detects file changes, additions, deletions
  - Cross-platform support

- **fs-extra** (`^11.2.0`)
  - Enhanced file system operations
  - Promise-based API
  - Additional utilities beyond native `fs`

- **glob** (`^10.3.10`)
  - Pattern matching for file discovery
  - Finds all `.md` files in directory

### State Management
- **React Context API**
  - Format preferences management
  - Global state for formatting options
  - No external state library needed

### Storage
- **localStorage**
  - Persists user formatting preferences
  - Survives page refreshes
  - Browser-native storage

### Development Dependencies
- `@types/node` - Node.js type definitions
- `@types/react` - React type definitions
- `@types/react-dom` - React DOM type definitions
- `tailwindcss` - Tailwind CSS framework
- `@tailwindcss/typography` - Typography plugin for prose styling

---

## 4. Architecture

### System Architecture Flow

```mermaid
graph TD
    A[MD_Contents Folder] -->|File Changes| B[Chokidar Watcher]
    B -->|Detect Changes| C[API Routes]
    C -->|/api/markdown/list| D[File List Endpoint]
    C -->|/api/markdown/[slug]| E[Content Endpoint]
    D -->|JSON Response| F[Homepage Component]
    E -->|Markdown Content| G[MarkdownContent Component]
    F -->|Display List| H[User Interface]
    G -->|Render MD| H
    I[FormatContext] -->|Preferences| G
    J[FormatPanel] -->|Update| I
    I -->|Apply Styles| H
    K[localStorage] -->|Load/Save| I
```

### Data Flow

1. **File System → API**
   - Chokidar watches `MD_Contents/` folder
   - Detects changes (add, modify, delete)
   - Triggers API route updates

2. **API → React Components**
   - API routes read file system
   - Return JSON with file list or content
   - Client components fetch via `fetch()` or `useEffect`

3. **Hot Reload Mechanism**
   - **Option 1**: Client-side polling (every 2-3 seconds)
   - **Option 2**: Server-Sent Events (SSE) for real-time updates
   - **Option 3**: WebSocket (development only)

4. **Format Preferences Flow**
   - User changes format in `FormatPanel`
   - Updates `FormatContext` state
   - Saves to `localStorage`
   - Applies to `MarkdownContent` component
   - All text elements inherit formatting

### Component Hierarchy

```
RootLayout
├── FormatProvider (Context)
│   ├── Sidebar (Fixed Navigation)
│   ├── Main Content Area
│   │   ├── Homepage (File List)
│   │   └── [slug] Page (Markdown Content)
│   └── FormatPanel (Floating UI)
└── Global Styles (Tailwind)
```

---

## 5. Project Structure

```
MD_to_WWW/
├── MD_Contents/              # Input folder for Markdown files
│   ├── file1.md
│   ├── file2.md
│   └── images/               # Optional: images folder
│       └── logo.png
│
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with sidebar
│   ├── page.tsx             # Homepage with file list
│   ├── [slug]/
│   │   └── page.tsx         # Dynamic page for each MD file
│   ├── api/
│   │   └── markdown/
│   │       ├── list/
│   │       │   └── route.ts # GET: List all MD files
│   │       └── [slug]/
│   │           └── route.ts # GET: Get MD file content
│   └── globals.css          # Global styles, Tailwind imports
│
├── contexts/                 # React Context providers
│   └── FormatContext.tsx    # Format preferences context
│
├── components/              # React components
│   ├── Sidebar.tsx         # Fixed left navigation
│   ├── MarkdownContent.tsx # Markdown renderer component
│   ├── FormatPanel.tsx     # Formatting options UI
│   └── FileList.tsx        # Homepage file list
│
├── lib/                     # Utility functions
│   ├── markdown.ts         # MD parsing, title extraction
│   ├── fileSystem.ts       # File system operations
│   └── watcher.ts          # Chokidar file watcher setup
│
├── public/                  # Static assets
│
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── PROJECT_INFO.md         # This file
```

---

## 6. Key Components

### FormatContext (`contexts/FormatContext.tsx`)
**Purpose**: Manages global formatting preferences

**State**:
- `fontFamily`: 'sans' | 'serif' | 'mono'
- `fontSize`: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'

**Features**:
- Loads preferences from localStorage on mount
- Saves preferences to localStorage on change
- Provides update functions for font and size
- Reset to defaults function

**Usage**:
```typescript
const { preferences, updateFontFamily, updateFontSize } = useFormat();
```

### FormatPanel (`components/FormatPanel.tsx`)
**Purpose**: UI panel for formatting options

**Features**:
- Floating panel in top-right corner
- Toggle button to show/hide
- Font family selector (3 options)
- Font size selector (6 options)
- Reset button
- Responsive design
- Dark mode support

**UI Elements**:
- Settings icon button
- Collapsible panel
- Radio-style button groups
- Visual preview of selected options

### MarkdownContent (`components/MarkdownContent.tsx`)
**Purpose**: Renders Markdown content with all features

**Features**:
- Syntax highlighting for code blocks
- Table rendering with professional styling
- Anchor links on headings
- Applies format preferences from context
- Custom component mapping for all MD elements
- Responsive code blocks with scroll
- Inline code styling

**Plugins**:
- `remarkGfm` - Tables, task lists
- `remarkSlug` - Heading IDs
- `rehypePrettyCode` - Syntax highlighting

### Sidebar (`components/Sidebar.tsx`)
**Purpose**: Fixed left navigation

**Features**:
- Lists all Markdown files
- Clickable links to each file
- Shows extracted titles
- Fixed position on desktop
- Hidden on mobile (hamburger menu)
- Auto-updates when files change
- Scrollable if many files

### FileList (`components/FileList.tsx`)
**Purpose**: Homepage file listing

**Features**:
- Displays all MD files as cards/links
- Shows extracted titles
- Click to navigate to file
- Updates with hot reload
- Empty state handling

---

## 7. API Routes

### GET `/api/markdown/list`
**Purpose**: Returns list of all Markdown files

**Response**:
```json
[
  {
    "slug": "tutorial-react",
    "title": "React Tutorial",
    "filename": "tutorial-react.md",
    "lastModified": "2025-01-05T10:30:00Z"
  }
]
```

**Implementation**:
- Scans `MD_Contents/` folder
- Reads all `.md` files
- Extracts title from first heading
- Returns metadata array

### GET `/api/markdown/[slug]`
**Purpose**: Returns content of specific Markdown file

**Parameters**:
- `slug`: File name without `.md` extension

**Response**:
```json
{
  "content": "# Title\n\nContent here...",
  "title": "Title",
  "slug": "tutorial-react"
}
```

**Implementation**:
- Reads file from `MD_Contents/[slug].md`
- Extracts title
- Returns raw markdown content
- Handles file not found errors

### Future: GET `/api/watch` (Optional)
**Purpose**: Server-Sent Events for real-time updates

**Implementation**:
- Uses SSE to push file change notifications
- Client subscribes to updates
- More efficient than polling

---

## 8. Configuration Files

### package.json
```json
{
  "name": "md-to-www",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-markdown": "^9.0.0",
    "remark-gfm": "3.0.1",
    "rehype-pretty-code": "^0.13.0",
    "remark-slug": "^6.0.0",
    "chokidar": "^3.5.3",
    "fs-extra": "^11.2.0",
    "glob": "^10.3.10"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "@tailwindcss/typography": "^0.5.10"
  }
}
```

### tailwind.config.js
```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable file system API routes
  // No special config needed for file system access in API routes
};

module.exports = nextConfig;
```

---

## 9. Features Details

### Title Extraction
**Method**: Regex pattern matching
```typescript
function extractTitle(markdown: string): string {
  const match = markdown.match(/^#{1,3}\s+(.+)$/m);
  return match ? match[1].trim() : 'Untitled';
}
```

**Behavior**:
- Searches for first `#`, `##`, or `###` heading
- Extracts text after heading marker
- Trims whitespace
- Returns "Untitled" if no heading found

### Syntax Highlighting
**Engine**: Shiki (VS Code's syntax highlighter)

**Configuration**:
- Theme: `github-dark` (configurable)
- `keepBackground: false` - Allows custom black background
- Supports 100+ languages automatically

**Styling**:
- Background: Black (`#000`)
- Text: White (`#fff`)
- Custom scrollbar for code blocks
- Padding and rounded corners

**Languages Supported**: JavaScript, TypeScript, Python, Java, C++, HTML, CSS, JSON, YAML, Markdown, and 90+ more

### Table Rendering
**Plugin**: `remark-gfm@3.0.1`

**Styling**:
- Compact design: `px-4 py-2.5`
- Small fonts: `text-xs` for headers, `text-sm` for cells
- Header: Uppercase, semibold, tracking wider
- Borders: Subtle gray (`border-border/50`)
- Hover: Light background change
- Responsive: Horizontal scroll on mobile

**Example**:
```markdown
| Name | Age | City |
|------|-----|------|
| John | 30  | NYC  |
```

### Formatting System
**Font Families**:
- `sans` - Sans Serif (default system font)
- `serif` - Serif font (Times, Georgia)
- `mono` - Monospace font (Courier, Monaco)

**Font Sizes**:
- `xs` - 0.75rem (12px)
- `sm` - 0.875rem (14px)
- `base` - 1rem (16px) - **Default**
- `lg` - 1.125rem (18px)
- `xl` - 1.25rem (20px)
- `2xl` - 1.5rem (24px)

**Application**:
- Base size applied to paragraphs, lists
- Headings use relative multipliers (h1 = base × 2.25)
- Code blocks use smaller relative size (base × 0.875)
- Tables use smaller sizes for compact display

**Persistence**:
- Saved to `localStorage` key: `markdown-format-preferences`
- Loaded on app mount
- Survives page refresh

### Hot Reload Mechanism
**Implementation Options**:

1. **Client-Side Polling** (Recommended for simplicity)
   - Poll `/api/markdown/list` every 2-3 seconds
   - Update UI when response changes
   - Simple, works everywhere

2. **Server-Sent Events (SSE)**
   - Server pushes updates when files change
   - More efficient than polling
   - Requires SSE support

3. **WebSocket** (Development only)
   - Real-time bidirectional communication
   - Most complex, best for development

**Current Choice**: Client-side polling for simplicity and reliability

---

## 10. Development Workflow

### Initial Setup
1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create MD_Contents Folder**
   ```bash
   mkdir MD_Contents
   ```

3. **Add Sample Markdown Files**
   - Create `.md` files in `MD_Contents/`
   - Each file should have a `# Title` as first line

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   - Open `http://localhost:3000`
   - Homepage shows list of MD files
   - Click file to view content

### Adding New Markdown Files
1. Create new `.md` file in `MD_Contents/`
2. Add `# Title` as first line
3. Write content
4. File appears automatically in homepage and sidebar
5. No restart needed (hot reload)

### Hot Reload During Development
- **File Changes**: Detected automatically
- **New Files**: Appear in list within 2-3 seconds
- **Deleted Files**: Removed from list automatically
- **Content Updates**: Refresh page to see changes (or implement auto-refresh)

### Testing
1. **Test Title Extraction**
   - Create file without `#` heading → Should show "Untitled"
   - Create file with `# Title` → Should show "Title"

2. **Test Syntax Highlighting**
   - Add code block with language
   - Verify syntax colors appear

3. **Test Tables**
   - Add Markdown table
   - Verify proper rendering and styling

4. **Test Formatting Panel**
   - Change font family → Verify text changes
   - Change font size → Verify size changes
   - Refresh page → Verify preferences persist

5. **Test Responsive Design**
   - Resize browser window
   - Verify sidebar behavior on mobile
   - Test on actual mobile device

---

## 11. File System Structure Details

### MD_Contents Folder
**Location**: Root of project  
**Purpose**: Input folder for all Markdown files

**Rules**:
- Only `.md` files are processed
- Subdirectories are ignored (flat structure)
- File names become URL slugs (e.g., `tutorial.md` → `/tutorial`)
- Special characters in filenames should be avoided

**Example Structure**:
```
MD_Contents/
├── getting-started.md
├── advanced-topics.md
├── api-reference.md
└── images/              # Optional: for images
    └── logo.png
```

### Image Handling (Future)
- Images in `MD_Contents/images/` can be referenced
- Copy to `public/images/` automatically
- Reference in MD: `![alt](images/logo.png)`
- Renders as: `/images/logo.png`

---

## 12. Styling Guidelines

### Color Scheme
- **Background**: White (light mode), Dark gray (dark mode)
- **Text**: Black (light), White (dark)
- **Code Blocks**: Black background, White text (always)
- **Links**: Blue (`#3b82f6`)
- **Borders**: Light gray (`#e5e7eb`)

### Typography
- **Base Font**: System default (Sans Serif)
- **Headings**: Bold, larger sizes
- **Code**: Monospace font
- **Line Height**: 1.5-1.75 for readability

### Spacing
- **Container Padding**: `p-6` or `p-8`
- **Section Margins**: `my-4` to `my-8`
- **Code Block Padding**: `p-4`
- **Table Cell Padding**: `px-4 py-2.5`

### Responsive Breakpoints
- **Mobile**: `< 768px` - Sidebar hidden, hamburger menu
- **Tablet**: `768px - 1024px` - Sidebar visible, smaller
- **Desktop**: `> 1024px` - Full sidebar, optimal layout

---

## 13. Error Handling

### File Not Found
- **Scenario**: User navigates to non-existent slug
- **Handling**: Show 404 page or error message
- **Implementation**: Check file exists before reading

### Invalid Markdown
- **Scenario**: Malformed Markdown syntax
- **Handling**: Render as-is, let react-markdown handle gracefully
- **Implementation**: No special handling needed (react-markdown is forgiving)

### File System Errors
- **Scenario**: Permission denied, disk full, etc.
- **Handling**: Log error, show user-friendly message
- **Implementation**: Try-catch in API routes

### Missing Title
- **Scenario**: File has no `#` heading
- **Handling**: Use "Untitled" as fallback
- **Implementation**: `extractTitle()` function handles this

---

## 14. Performance Considerations

### File Reading
- **Caching**: Consider caching file list and content
- **Lazy Loading**: Load file content only when page visited
- **Pagination**: If many files, paginate homepage list

### Hot Reload
- **Polling Interval**: 2-3 seconds (balance between responsiveness and server load)
- **Debouncing**: Debounce file system events if using watcher
- **Selective Updates**: Only update changed files, not entire list

### Markdown Rendering
- **Memoization**: Memoize rendered content if props don't change
- **Code Splitting**: Lazy load syntax highlighting for better initial load
- **Image Optimization**: Use Next.js Image component for images

---

## 15. Security Considerations

### File System Access
- **Restriction**: Only read from `MD_Contents/` folder
- **Path Traversal**: Sanitize slug parameter to prevent `../` attacks
- **File Types**: Only process `.md` files, ignore others

### API Routes
- **Rate Limiting**: Consider rate limiting for production
- **CORS**: Configure CORS if needed for cross-origin requests
- **Input Validation**: Validate slug parameter format

### Content Security
- **XSS Prevention**: react-markdown sanitizes by default
- **No Script Execution**: Markdown doesn't execute scripts
- **Safe Rendering**: All content rendered as text/HTML, no eval

---

## 16. Deployment Considerations

### Build Process
- **Static Export**: Can export as static site if needed
- **API Routes**: Require Node.js server (Vercel, Netlify Functions)
- **File System**: Requires server-side file system access

### Hosting Options
1. **Vercel** (Recommended)
   - Native Next.js support
   - Serverless functions for API routes
   - File system access in serverless functions

2. **Netlify**
   - Next.js support
   - Serverless functions
   - Similar to Vercel

3. **Self-Hosted**
   - Requires Node.js server
   - Full file system access
   - More control, more maintenance

### Environment Variables
- `MD_CONTENTS_PATH`: Override default `MD_Contents/` path (optional)
- `NODE_ENV`: Development vs production

---

## 17. Known Limitations

1. **Flat File Structure**: No subdirectories support (future enhancement)
2. **No Categories/Tags**: Files not organized by category (future enhancement)
3. **No Search**: No full-text search (future enhancement)
4. **Image Handling**: Basic image support, no optimization (future enhancement)
5. **No Authentication**: All files publicly accessible (add if needed)

---

## 18. Future Roadmap

### Phase 1 (Current)
- ✅ Basic MD to HTML conversion
- ✅ Hot reload
- ✅ Syntax highlighting
- ✅ Table rendering
- ✅ Formatting panel

### Phase 2 (Next)
- [ ] Full-text search
- [ ] Categories/tags system
- [ ] Image optimization
- [ ] TOC in sidebar
- [ ] Dark mode toggle

### Phase 3 (Future)
- [ ] Multi-language support
- [ ] Export to PDF
- [ ] Print-friendly styles
- [ ] Analytics integration
- [ ] Comments system

---

## 19. References & Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [remark-gfm](https://github.com/remarkjs/remark-gfm)
- [rehype-pretty-code](https://github.com/wooorm/rehype-pretty-code)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Best Practices
- See `C:\SynologyDrive\Joe-Dev\Cursor_Best_Practise.md` for project-specific best practices
- Next.js App Router patterns
- React Context API usage
- TypeScript best practices

---

## 20. Changelog

### Version 1.0.0 (Planning Phase)
- Project specification completed
- Architecture designed
- Technology stack selected
- Component structure planned

---

**Last Updated**: 2025-01-05  
**Document Version**: 1.0.0

