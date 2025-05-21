# Logistics App

A modern logistics management application built with React, Node.js, and Supabase.

## Features

- 🔐 Secure authentication with Supabase
- 📱 Responsive UI built with shadcn/ui components
- 📊 Dashboard for logistics management
- 💳 Transaction tracking
- 👥 User account management
- 📝 API documentation with Swagger/OpenAPI

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- shadcn/ui components
- Supabase Client

### Backend
- Node.js
- Express
- Supabase
- Swagger/OpenAPI
- CORS enabled

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

## Environment Variables

### Frontend (.env)
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```env
PORT=4000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NODE_ENV=development
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/logistics-app.git
cd logistics-app
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both root and server directories
   - Fill in your Supabase credentials

4. Start the development servers:

```bash
# Start frontend (from root directory)
npm run dev

# Start backend (from server directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:4000
- API Documentation: http://localhost:4000/api-docs

## API Documentation

The API documentation is available at `/api-docs` when the server is running. It provides:
- Interactive API testing interface
- Detailed endpoint descriptions
- Request/response schemas
- Authentication requirements

### Available Endpoints

- `GET /health` - Health check endpoint
- `GET /test-db` - Test Supabase connection
- More endpoints documented in the Swagger UI

## Project Structure

```
logistics-app/
├── src/
│   ├── components/     # React components
│   ├── contexts/       # React contexts
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   └── App.jsx        # Main app component
├── server/
│   ├── config/        # Server configuration
│   ├── routes/        # API routes
│   └── index.js       # Server entry point
└── public/            # Static assets
```

## Authentication

The application uses Supabase for authentication with the following features:
- Email/password authentication
- JWT token-based sessions
- Protected routes
- User profile management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@logisticsapp.com or open an issue in the repository.
