# Backend - Portfolio Chat API

FastAPI backend for OBIN (Osama's Digital Intelligence) - an AI-powered portfolio chatbot with session management and rate limiting.

## 🚀 Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.14+
- **Package Manager**: uv
- **Database**: Supabase (PostgreSQL)
- **AI Agent**: OpenAI Agents SDK
- **LLM Provider**: OpenRouter (inclusionai/ring-2.6-1t:free)
- **Validation**: Pydantic v2
- **CORS**: FastAPI CORS Middleware

## 📁 Folder Structure

```
backend/
├── app/                          # Application package
│   ├── __init__.py               # Package initializer
│   ├── agent.py                  # OBIN agent configuration
│   ├── api.py                    # FastAPI routes and endpoints
│   ├── config.py                 # Settings and environment variables
│   └── db.py                     # Supabase database functions
│
├── test/                         # Test files
│   └── test_gemini.py            # OpenRouter model testing
│
├── .env                          # Environment variables (DO NOT COMMIT)
├── .gitignore                    # Git ignore rules
├── .python-version               # Python version (3.14.2)
├── main.py                       # Application entry point
├── pyproject.toml                # Project dependencies (uv)
├── README.md                     # This file
└── uv.lock                       # Dependency lock file
```

## 🎯 Key Features

### 1. **OBIN AI Agent**
- OpenAI Agents SDK with OpenRouter provider
- Context-aware responses using portfolio data
- Markdown-free plain text responses
- Thought tag stripping for clean output

### 2. **Rate Limiting**
- 3 questions per email per day
- 24-hour rolling window (resets at midnight UTC)
- Per-email tracking across multiple sessions
- Database-backed counter

### 3. **Session Management**
- Unique session IDs per user
- Active/inactive session status
- Email-based user identification
- Subject line capture for context

### 4. **Database Integration**
- Supabase PostgreSQL database
- Row Level Security (RLS) enabled
- Service role key for backend access
- Automatic timestamp tracking

## 🛠️ Installation

```bash
# Install uv (if not already installed)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Sync dependencies
uv sync

# Run development server
uv run uvicorn main:app --reload --port 8000
```

## 🌐 Environment Variables

Create a `.env` file in the backend directory:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_ANON_KEY=your-anon-key

# OpenRouter Configuration
OPENROUTER_API_KEY=sk-or-v1-your-api-key
BASE_URL=https://openrouter.ai/api/v1
MODEL_NAME=inclusionai/ring-2.6-1t:free

# Chat Configuration
CHAT_MAX_QUESTIONS_PER_EMAIL_PER_DAY=3
```

## 📦 Dependencies

```toml
[project]
dependencies = [
    "fastapi>=0.115.6",
    "uvicorn>=0.34.0",
    "python-dotenv>=1.0.1",
    "supabase>=2.30.0",
    "pydantic>=2.10.5",
    "email-validator>=2.2.0",
    "openai-agents>=0.1.0",
    "openai>=1.59.7",
]
```

## 🔌 API Endpoints

### Root
```http
GET /
```
Returns API information and available endpoints.

### Health Check
```http
GET /health
```
Returns `{"ok": true}` if the server is running.

### Start Chat Session
```http
POST /chat/start
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about projects"  // optional
}
```

**Response:**
```json
{
  "session_id": "uuid-here",
  "remaining": 3
}
```

### Send Message
```http
POST /chat/message
Content-Type: application/json

{
  "session_id": "uuid-here",
  "message": "What technologies does Osama use?"
}
```

**Response:**
```json
{
  "reply": "Osama uses technologies including...",
  "remaining": 2
}
```

**Error Responses:**
- `404` - Session not found
- `403` - Session inactive or daily limit reached
- `500` - Internal server error

## 🗄️ Database Schema

### `chat_sessions` Table
```sql
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
```

### `chat_messages` Table
```sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id UUID REFERENCES chat_sessions(id),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL
);
```

### Database Functions
```sql
CREATE FUNCTION increment_questions_used(session_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE chat_sessions
  SET questions_used = questions_used + 1
  WHERE id = session_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 🤖 OBIN Agent Configuration

The agent is configured with:
- **Name**: OBIN (Osama's Digital Intelligence)
- **Context**: Full portfolio data from `frontend/lib/data/data.json`
- **Instructions**: Professional, concise, no markdown formatting
- **Special Rules**:
  - Projects: Show only name + URL
  - Technologies: Group by category
  - Max 300 words per response

## 🔒 Security

- **CORS**: Configured to allow all origins (adjust for production)
- **RLS**: Enabled on Supabase tables
- **Service Role Key**: Used for backend-only database access
- **Email Validation**: Pydantic EmailStr validation
- **Input Limits**: Max lengths enforced on all text fields

## 🧪 Testing

```bash
# Test OpenRouter connection
uv run python test/test_gemini.py

# Test health endpoint
curl http://localhost:8000/health

# Test chat start
curl -X POST http://localhost:8000/chat/start \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

## 📊 Interactive API Documentation

Once the server is running:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🚀 Deployment

### Production Checklist
1. Update CORS origins to specific domains
2. Use production Supabase instance
3. Set secure environment variables
4. Enable HTTPS
5. Configure rate limiting at infrastructure level
6. Set up monitoring and logging

### Deployment Options
- **Railway**: Easy Python deployment
- **Render**: Free tier available
- **Fly.io**: Global edge deployment
- **AWS Lambda**: Serverless with Mangum
- **Docker**: Containerized deployment

## 📝 Notes

- Uses `uv` for fast dependency management
- Python 3.14+ required
- Async-ready (FastAPI + AsyncOpenAI)
- Stateless design (all state in database)
- Horizontal scaling ready

## 👤 Author

**Osama bin Adnan**
- GitHub: [@OsamabinAdnan](https://github.com/OsamabinAdnan)
- LinkedIn: [Osama bin Adnan](https://www.linkedin.com/in/osama-bin-adnan/)
- Email: imosamabinadnan@gmail.com

## 📅 Last Updated

May 12, 2026
