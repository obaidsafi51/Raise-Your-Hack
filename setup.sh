#!/bin/bash

echo "🚀 Setting up Raise Your Hack - Athena AI Assistant"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cp env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo "✅ .env file already exists"
fi

# Create generated-projects directory
echo "📁 Creating project directories..."
mkdir -p generated-projects

# Set up database
echo "🗄️ Setting up database..."
npx prisma generate
npx prisma db push

echo ""
echo "🎉 Setup complete! Athena AI Assistant is ready to use."
echo ""
echo "Next steps:"
echo "1. Update .env file with your configuration"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "✨ Athena will now generate React apps INSTANTLY without external APIs!" 