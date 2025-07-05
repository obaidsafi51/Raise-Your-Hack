# 🚀 Raise Your Hack - Athena AI Assistant

**Lightning-fast AI-powered developer assistant that generates React applications INSTANTLY!**

Athena is your personal AI coding companion that creates complete, functional React applications in seconds without any external API calls. Built with Next.js 14, TypeScript, and modern web technologies.

## ⚡ Why Athena is Lightning Fast

- **No External APIs**: Generates code locally using pre-built templates
- **Instant Generation**: No waiting for API responses or network calls
- **Zero Configuration**: Works out of the box without API keys
- **Local File Generation**: Creates projects directly on your machine

## 🎯 Features

### ⚡ Instant Code Generation
- Generate complete React applications in seconds
- Pre-built templates for common app types (Todo, Calculator, etc.)
- Modern React with hooks and functional components
- Responsive design with beautiful CSS

### 🎨 Professional UI
- Black and gold theme with particle effects
- Smooth animations and transitions
- Modern, responsive design
- Professional user experience

### 🔧 Developer Tools
- Voice control for hands-free coding
- Code refactoring assistance
- GitHub PR integration
- Analytics dashboard

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/raise-your-hack.git
   cd raise-your-hack
   ```

2. **Run the setup script**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

### Generate a React App
1. Go to the **Code Generation** tab
2. Enter your app description (e.g., "Create a todo app")
3. Click **Generate** 
4. **INSTANTLY** get a complete React application!

### Available Templates
- **Todo App**: Modern task management with React hooks
- **Calculator**: iOS-style calculator with smooth animations
- **More coming soon!**

### Preview Your App
After generation, you'll get:
- Complete project files in `generated-projects/`
- Installation instructions
- Local development server setup

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS, Framer Motion
- **Database**: Prisma, SQLite
- **Authentication**: NextAuth.js
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
raise-your-hack/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── page.tsx           # Homepage
│   └── layout.tsx         # Root layout
├── components/            # React components
├── lib/                   # Utility functions
├── generated-projects/    # Generated React apps
├── prisma/               # Database schema
└── public/               # Static assets
```

## 🔧 Configuration

Copy `.env.example` to `.env` and configure:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# GitHub OAuth (optional)
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click!

### Local Development
```bash
npm run dev     # Development server
npm run build   # Production build
npm start       # Production server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## �� Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

---

**⚡ Experience the future of AI-powered development with Athena - where speed meets intelligence!**
