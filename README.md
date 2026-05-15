# Portfolio Application - Osama bin Adnan

Full-stack portfolio website with AI-powered chatbot assistant (OBIN). Built with Next.js 16, FastAPI, and Supabase.

## 🌟 Overview

A modern, responsive portfolio showcasing professional experience, projects, and technical skills. Features an intelligent chatbot assistant that answers questions about the portfolio using AI.

**Live Demo**: [Your URL]

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion, GSAP
- **State Management**: Zustand
- **3D Graphics**: Spline, Three.js

### Backend
- **Framework**: FastAPI (Python 3.14+)
- **Database**: Supabase (PostgreSQL)
- **AI Agent**: OpenAI Agents SDK
- **LLM Provider**: OpenRouter (configure via MODEL_NAME env var)
- **Package Manager**: uv

## 📁 Complete Project Structure

```
osamabinadnan/
│
├── frontend/                     # Next.js Frontend Application
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API Routes
│   │   │   └── ai/chat/          # AI chat fallback endpoint
│   │   ├── work/                 # Projects showcase page
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout + metadata
│   │   ├── not-found.tsx         # Custom 404 page
│   │   └── page.tsx              # Homepage
│   │
│   ├── components/               # React Components
│   │   ├── layout/               # Layout components
│   │   │   ├── Footer.tsx        # Footer with social links
│   │   │   └── Header.tsx        # Header with navigation
│   │   ├── sections/             # Page sections
│   │   │   ├── AboutIntro.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TechStackSection.tsx
│   │   │   └── WorkProjects.tsx
│   │   ├── ui/                   # UI components
│   │   │   ├── ChatWidget.tsx    # OBIN chatbot
│   │   │   ├── HoverLink.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── StickySocialSidebar.tsx
│   │   │   ├── TechStackTabs.tsx
│   │   │   └── WhatsAppFloat.tsx
│   │   └── ThemeProvider.tsx
│   │
│   ├── lib/                      # Utilities and data
│   │   ├── data/                 # Data files
│   │   │   ├── data.json         # Portfolio data (single source of truth)
│   │   │   ├── experience.ts
│   │   │   ├── profile.ts
│   │   │   ├── projects.ts
│   │   │   └── techStack.ts
│   │   ├── store/                # Zustand stores
│   │   │   ├── useChatStore.ts
│   │   │   └── useThemeStore.ts
│   │   ├── types/                # TypeScript types
│   │   │   └── index.ts
│   │   └── utils.ts
│   │
│   ├── public/                   # Static assets
│   │   ├── Project-Images/       # Project screenshots
│   │   ├── Techs-Logos/          # Technology logos
│   │   └── OsamabinAdnan_Resume.pdf
│   │
│   ├── .env.local                # Frontend environment variables
│   ├── next.config.ts            # Next.js configuration
│   ├── package.json              # Frontend dependencies
│   ├── README.md                 # Frontend documentation
│   └── tsconfig.json             # TypeScript configuration
│
├── backend/                      # FastAPI Backend Application
│   ├── app/                      # Application package
│   │   ├── __init__.py
│   │   ├── agent.py              # OBIN agent configuration
│   │   ├── api.py                # FastAPI routes
│   │   ├── config.py             # Settings loader
│   │   └── db.py                 # Supabase functions
│   │
│   ├── test/                     # Test files
│   │   └── test_gemini.py
│   │
│   ├── .env                      # Backend environment variables
│   ├── main.py                   # Application entry point
│   ├── pyproject.toml            # Python dependencies
│   ├── README.md                 # Backend documentation
│   └── uv.lock                   # Dependency lock file
│
└── README.md                     # This file (root documentation)
```

## ✨ Key Features

### 1. **OBIN - AI Portfolio Assistant**
- **Name**: OBIN (Osama's Digital Intelligence)
- AI-powered chatbot answering portfolio questions
- Lead capture form (name, email, subject)
- Large centered modal interface
- **Rate Limiting**: 3 questions per email per day
- Session-based chat management
- Context-aware responses using portfolio data

### 2. **Responsive Portfolio Website**
- Modern, animated hero section
- Interactive project showcase
- Tech stack with category tabs
- Work experience timeline
- Contact section
- Custom 404 page

### 3. **Performance Optimized**
- Next.js 16 with Turbopack
- Static page generation
- Image optimization
- Code splitting
- Fast page loads

### 4. **SEO & Social Sharing**
- Optimized metadata
- OpenGraph tags
- Semantic HTML
- Sitemap ready

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ (for frontend)
- Python 3.14+ (for backend)
- uv package manager (for backend)
- Supabase account
- OpenRouter API key

### 1. Clone Repository
```bash
git clone https://github.com/OsamabinAdnan/portfolio-app.git
cd portfolio-app/osamabinadnan
```

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run development server
npm run dev
```

Frontend will be available at: http://localhost:3000

### 3. Backend Setup
```bash
cd backend

# Install uv (if not installed)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Sync dependencies
uv sync

# Create .env file (see backend/.env.example)
# Add your Supabase and OpenRouter credentials

# Run development server
uv run uvicorn main:app --reload --port 8000
```

Backend will be available at: http://localhost:8000

### 4. Database Setup (Supabase)

1. Create a Supabase project
2. Run the following SQL in Supabase SQL Editor:

```sql
-- Create chat_sessions table
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  questions_used INT NOT NULL DEFAULT 0,
  max_questions INT NOT NULL DEFAULT 3,
  status TEXT NOT NULL DEFAULT 'active'
);

-- Create chat_messages table
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id UUID REFERENCES chat_sessions(id),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL
);

-- Create indexes
CREATE INDEX idx_chat_sessions_email ON chat_sessions(email);
CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON chat_messages(created_at);

-- Create function to increment questions
CREATE OR REPLACE FUNCTION increment_questions_used(session_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE chat_sessions
  SET questions_used = questions_used + 1
  WHERE id = session_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Revoke public access (backend uses service role key)
REVOKE ALL ON chat_sessions FROM anon, authenticated;
REVOKE ALL ON chat_messages FROM anon, authenticated;
```

## 🌐 Environment Variables

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (`.env`)
```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_ANON_KEY=your-anon-key

# OpenRouter
OPENROUTER_API_KEY=sk-or-v1-your-api-key
BASE_URL=https://openrouter.ai/api/v1
MODEL_NAME=inclusionai/ring-2.6-1t:free

# Chat Configuration
CHAT_MAX_QUESTIONS_PER_EMAIL_PER_DAY=3
```

## 📊 API Endpoints

### Backend API
- `GET /` - API information
- `GET /health` - Health check
- `GET /docs` - Swagger UI documentation
- `GET /redoc` - ReDoc documentation
- `POST /chat/start` - Start new chat session
- `POST /chat/message` - Send message in session

### Frontend API
- `POST /api/ai/chat` - Fallback AI chat endpoint

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

## 🚀 Deployment

### Frontend (Vercel - Recommended)
```bash
cd frontend
vercel deploy
```

### Backend (Railway/Render)
```bash
cd backend
# Follow platform-specific deployment guide
```

### Environment Variables
Remember to set all environment variables in your deployment platform.

## 📱 Features Breakdown

### Portfolio Sections
- ✅ Hero with animated role transitions
- ✅ About section with stats
- ✅ Work experience timeline
- ✅ Tech stack with category tabs
- ✅ Projects showcase with filters
- ✅ Contact section
- ✅ Footer with social links

### Chatbot (OBIN)
- ✅ Lead capture form
- ✅ Session management
- ✅ Rate limiting (3 questions/day)
- ✅ AI-powered responses
- ✅ Context-aware answers
- ✅ Mobile responsive

### Additional Features
- ✅ WhatsApp floating button
- ✅ Resume download (PDF)
- ✅ Custom 404 page
- ✅ Sticky social sidebar
- ✅ Mobile navigation menu
- ✅ Dark theme

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run build  # Check for build errors
npm run lint   # Check for linting errors
```

### Backend
```bash
cd backend
uv run python test/test_gemini.py  # Test OpenRouter connection
curl http://localhost:8000/health   # Test health endpoint
```

## 📈 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: Optimized with code splitting

## 🔒 Security

- CORS configured for production
- Environment variables for secrets
- Supabase RLS enabled
- Input validation with Pydantic
- Rate limiting on chatbot
- SQL injection prevention

## 📝 Data Management

All portfolio data is centralized in `frontend/lib/data/data.json`:
- Profile information
- Tech stack
- Projects
- Work experience
- Social links

Update this single file to reflect across the entire application.

## 🤝 Contributing

This is a personal portfolio project. Feel free to fork and adapt for your own use.

## 📄 License

MIT License - feel free to use this project as inspiration for your own portfolio.

## 👤 Author

**Osama bin Adnan**
- **Title**: Agentic AI Engineer, Web Developer, Digital Marketer & Textile Engineer
- **Location**: Karachi, Pakistan
- **GitHub**: [@OsamabinAdnan](https://github.com/OsamabinAdnan)
- **LinkedIn**: [Osama bin Adnan](https://www.linkedin.com/in/osama-bin-adnan/)
- **Email**: imosamabinadnan@gmail.com
- **Twitter**: [@osamabinadnan1](https://x.com/osamabinadnan1)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- FastAPI for the elegant Python API framework
- Supabase for the backend infrastructure
- OpenRouter for AI model access
- Vercel for hosting platform

## 📅 Version History

- **v1.0.0** (May 12, 2026) - Initial release
  - Portfolio website with all sections
  - OBIN chatbot integration
  - Responsive design
  - Custom 404 page

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Email: imosamabinadnan@gmail.com

---

**Built with ❤️ by Osama bin Adnan**
