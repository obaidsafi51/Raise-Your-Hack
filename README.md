# Raise Your Hack - AI Developer Assistant

A comprehensive AI-powered developer assistant built with Next.js 14, TypeScript, and modern web technologies. This application helps developers generate code, refactor existing code, review pull requests, and more using AI assistance.

## 🚀 Features

### Core Functionality

- **AI Code Generation**: Generate code snippets from natural language prompts with streaming responses
- **Code Refactoring**: Refactor existing code with AI-suggested improvements and explanations
- **GitHub PR Reviews**: Automatically review pull requests and generate summaries with risk assessments
- **Voice Control**: Use voice commands for hands-free interaction via Whisper transcription
- **Usage Analytics**: Track your AI interactions and usage patterns
- **User Settings**: Configure API tokens and feature preferences

### Technical Stack

- **Frontend**: Next.js 14+ with App Router, TypeScript, TailwindCSS
- **UI Components**: ShadCN UI with Radix UI primitives
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js with GitHub OAuth
- **State Management**: Zustand (global state) + React Query (server state)
- **Database**: Prisma ORM with PostgreSQL
- **AI Integration**: OpenAI GPT-4 and Whisper
- **File Storage**: AWS S3 for voice recordings
- **Styling**: TailwindCSS with custom design system

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- PostgreSQL database
- GitHub OAuth app configured
- OpenAI API key
- AWS S3 bucket (for voice recordings)

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd raise-your-hack
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/raise-your-hack"

   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-key-here"

   # GitHub OAuth
   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"

   # OpenAI
   OPENAI_API_KEY="your-openai-api-key"

   # AWS S3
   AWS_ACCESS_KEY_ID="your-aws-access-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
   AWS_REGION="us-east-1"
   AWS_S3_BUCKET_NAME="your-s3-bucket-name"

   # GitHub API (for PR reviews)
   GITHUB_TOKEN="your-github-personal-access-token"
   ```

4. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
raise-your-hack/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth.js routes
│   │   ├── generate/             # AI code generation
│   │   ├── refactor/             # Code refactoring
│   │   ├── voice/                # Voice transcription
│   │   ├── github/               # GitHub integration
│   │   ├── ai/                   # AI-powered features
│   │   ├── analytics/            # Usage analytics
│   │   └── settings/             # User settings
│   ├── prs/                      # PR Dashboard page
│   ├── analytics/                # Analytics page
│   ├── settings/                 # Settings page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # React components
│   ├── ui/                       # ShadCN UI components
│   ├── PromptGeneratePanel.tsx   # Main AI prompt interface
│   ├── RefactorWidget.tsx        # Code refactoring widget
│   ├── PRReviewCard.tsx          # PR review display
│   ├── VoiceControl.tsx          # Voice recording interface
│   └── StatCard.tsx              # Analytics metrics
├── lib/                          # Utility libraries
│   ├── auth.ts                   # NextAuth.js configuration
│   ├── openai.ts                 # OpenAI client setup
│   ├── prisma.ts                 # Prisma client
│   ├── s3.ts                     # AWS S3 client
│   ├── store.ts                  # Zustand state management
│   └── utils.ts                  # Utility functions
├── prisma/                       # Database schema
│   └── schema.prisma             # Prisma schema
├── styles/                       # Additional styles
├── .github/                      # GitHub Actions
├── package.json                  # Dependencies and scripts
├── tailwind.config.ts            # TailwindCSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Railway

1. Connect your GitHub repository to Railway
2. Add environment variables
3. Deploy automatically

## 🔐 Authentication

The application uses NextAuth.js with GitHub OAuth for authentication. Users can:

1. Sign in with their GitHub account
2. Access protected routes and API endpoints
3. Manage their profile and settings

## 🤖 AI Features

### Code Generation

- Natural language to code conversion
- Streaming responses for real-time feedback
- Support for multiple programming languages
- Context-aware suggestions

### Code Refactoring

- AI-powered code improvement suggestions
- Detailed explanations of changes
- Best practices recommendations
- Performance optimization tips

### PR Reviews

- Automatic pull request analysis
- Risk assessment and summaries
- Inline comment suggestions
- Code quality evaluation

### Voice Control

- Voice-to-text transcription using Whisper
- Hands-free interaction
- Audio file storage in S3
- Real-time processing

## 📊 Analytics

Track your usage with built-in analytics:

- Total prompts and interactions
- Feature usage statistics
- Response time metrics
- Recent activity timeline

## 🎨 UI/UX Features

- **Modern Design**: Clean, responsive interface using ShadCN UI
- **Dark Mode Support**: Automatic theme switching
- **Accessibility**: WCAG compliant components
- **Mobile Responsive**: Works on all device sizes
- **Loading States**: Smooth user experience with loading indicators

## 🔧 Configuration

### Environment Variables

All configuration is done through environment variables. See `env.example` for the complete list.

### Database Schema

The application uses three main models:

- **User**: Authentication and profile data
- **PromptLog**: AI interaction history
- **PRReview**: GitHub PR review data

### API Routes

All API routes are protected and require authentication. They include:

- `/api/generate` - AI code generation
- `/api/refactor` - Code refactoring
- `/api/voice/transcribe` - Voice transcription
- `/api/github/prs` - GitHub PR fetching
- `/api/analytics` - Usage analytics
- `/api/settings` - User preferences

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🔮 Roadmap

- [ ] Multi-language support
- [ ] Advanced code analysis
- [ ] Team collaboration features
- [ ] Custom AI model fine-tuning
- [ ] Integration with more IDEs
- [ ] Advanced analytics dashboard
- [ ] API rate limiting and usage tracking
- [ ] Mobile app development

---

Built with ❤️ by the Raise Your Hack team
