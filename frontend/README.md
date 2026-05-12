# Frontend - Portfolio Application

Modern, responsive portfolio website built with Next.js 16, React 19, and TypeScript.

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion, GSAP
- **Icons**: Lucide React
- **State Management**: Zustand
- **HTTP Client**: Native Fetch API
- **3D Graphics**: Spline, Three.js

## 📁 Folder Structure

```
frontend/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── ai/
│   │       └── chat/
│   │           └── route.ts      # AI Chat API endpoint
│   ├── work/                     # Work/Projects page
│   │   └── page.tsx
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with metadata
│   ├── not-found.tsx             # Custom 404 page
│   └── page.tsx                  # Homepage
│
├── components/                   # React Components
│   ├── layout/                   # Layout components
│   │   ├── Footer.tsx            # Footer with social links
│   │   └── Header.tsx            # Header with navigation
│   ├── sections/                 # Page sections
│   │   ├── AboutIntro.tsx        # About section
│   │   ├── ContactSection.tsx    # Contact form section
│   │   ├── ExperienceSection.tsx # Work experience timeline
│   │   ├── HeroSection.tsx       # Hero with animated roles
│   │   ├── TechStackSection.tsx  # Technologies showcase
│   │   └── WorkProjects.tsx      # Projects grid
│   ├── ui/                       # UI components
│   │   ├── ChatWidget.tsx        # OBIN chatbot (lead form + modal)
│   │   ├── HoverLink.tsx         # Animated navigation links
│   │   ├── MobileMenu.tsx        # Mobile navigation menu
│   │   ├── ProjectCard.tsx       # Project card component
│   │   ├── StickySocialSidebar.tsx # Fixed social links sidebar
│   │   ├── TechStackTabs.tsx     # Tech stack category tabs
│   │   └── WhatsAppFloat.tsx     # WhatsApp floating button
│   └── ThemeProvider.tsx         # Theme context provider
│
├── lib/                          # Utilities and data
│   ├── data/                     # Data files
│   │   ├── data.json             # Portfolio data (profile, projects, etc.)
│   │   ├── experience.ts         # Experience data export
│   │   ├── profile.ts            # Profile data export
│   │   ├── projects.ts           # Projects data export
│   │   └── techStack.ts          # Tech stack data export
│   ├── store/                    # Zustand stores
│   │   ├── useChatStore.ts       # Chat state management
│   │   └── useThemeStore.ts      # Theme state management
│   ├── types/                    # TypeScript types
│   │   └── index.ts              # Type definitions
│   └── utils.ts                  # Utility functions
│
├── public/                       # Static assets
│   ├── Project-Images/           # Project screenshots
│   ├── Techs-Logos/              # Technology logos
│   ├── OsamabinAdnan_Resume.pdf  # Resume PDF
│   └── [other static files]
│
├── .env.local                    # Environment variables
├── .gitignore                    # Git ignore rules
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies
├── postcss.config.mjs            # PostCSS configuration
├── README.md                     # This file
└── tsconfig.json                 # TypeScript configuration
```

## 🎨 Key Features

### 1. **OBIN Chatbot**
- AI-powered portfolio assistant
- Lead capture form (name, email, subject)
- Large centered modal interface
- 3 questions per email per day limit
- Session-based chat management
- Responsive design (mobile + desktop)

### 2. **Responsive Design**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Optimized for all devices

### 3. **Animations**
- GSAP ScrollTrigger for scroll animations
- Framer Motion for UI transitions
- Smooth page transitions
- Interactive hover effects

### 4. **SEO Optimized**
- Metadata configuration in `layout.tsx`
- OpenGraph tags for social sharing
- Semantic HTML structure

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📦 Key Dependencies

```json
{
  "next": "16.2.4",
  "react": "19.0.0",
  "typescript": "^5",
  "tailwindcss": "^4.0.0",
  "framer-motion": "^11.15.0",
  "gsap": "^3.12.7",
  "zustand": "^5.0.2",
  "lucide-react": "^0.468.0"
}
```

## 🎯 Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Pages

- `/` - Homepage (Hero, About, Experience, Tech Stack, Projects, Contact)
- `/work` - Projects showcase page
- `/api/ai/chat` - AI chat API endpoint (fallback)
- `/not-found` - Custom 404 page

## 🎨 Design System

### Colors
- **Primary**: `#a73dff` (Purple)
- **Secondary**: `#8b2fd9` (Dark Purple)
- **Background**: `#0a0a0a` (Near Black)
- **Text**: `#ffffff` (White)

### Fonts
- **Body**: Inter
- **Headings**: Space Grotesk
- **Logo**: Orbitron

## 🔗 API Integration

The frontend connects to the FastAPI backend for the chatbot:

- **POST** `/chat/start` - Start new chat session
- **POST** `/chat/message` - Send message in session

## 📄 Data Structure

All portfolio data is stored in `lib/data/data.json`:

```json
{
  "profile": { ... },
  "techStack": [ ... ],
  "projects": [ ... ],
  "experience": [ ... ]
}
```

## 🚀 Deployment

Built with Next.js, can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting

## 📝 Notes

- Uses Next.js 16 App Router (not Pages Router)
- Turbopack enabled for faster builds
- TypeScript strict mode enabled
- Tailwind CSS v4 with custom configuration

## 👤 Author

**Osama bin Adnan**
- GitHub: [@OsamabinAdnan](https://github.com/OsamabinAdnan)
- LinkedIn: [Osama bin Adnan](https://www.linkedin.com/in/osama-bin-adnan/)
- Email: imosamabinadnan@gmail.com

## 📅 Last Updated

May 12, 2026
