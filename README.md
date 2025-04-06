# PlanX App

A modern, real-time Planning Poker application built with Next.js, TypeScript, MongoDB, and Socket.io. This application helps agile teams estimate tasks collaboratively and efficiently.

![PlanX App](public/planx.svg)

## Features

- **Real-time Collaboration**: Multiple users can join the same session and vote simultaneously
- **Authentication**: Secure login with Google OAuth and email/password
- **Session Management**: Create, join, and manage planning sessions
- **Task Management**: Add, edit, and delete tasks within sessions
- **Voting System**: Vote on tasks with customizable card sets
- **Admin Controls**: Session creators can manage participants and control the voting process
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Real-time Communication**: Socket.io
- **Deployment**: Docker, Synology NAS

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB Atlas account or local MongoDB instance
- Google OAuth credentials (for Google login)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/planning-poker.git
   cd planning-poker
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   # MongoDB connection string
   MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/planning-poker?retryWrites=true&w=majority

   # NextAuth configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key

   # OAuth providers
   GOOGLE_ID=your-google-client-id
   GOOGLE_SECRET=your-google-client-secret

   # Socket.io configuration
   SOCKET_URL=http://localhost:3000
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker Deployment

### Building the Docker Image

```bash
docker build -t planning-poker:latest .
```

### Running with Docker Compose

```bash
docker-compose up -d
```

For detailed deployment instructions on Synology NAS, see [DOCKER_DEPLOYMENT.md](DOCKER_DEPLOYMENT.md).

## Project Structure

```
planning-poker/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── api/         # API routes
│   │   ├── auth/        # Authentication pages
│   │   └── ...          # Other pages
│   ├── components/      # React components
│   │   ├── auth/        # Authentication components
│   │   ├── layout/      # Layout components
│   │   ├── sessions/    # Session-related components
│   │   └── ui/          # UI components
│   ├── lib/             # Utility functions and libraries
│   ├── types/           # TypeScript type definitions
│   └── ...              # Other source files
├── .env.example         # Example environment variables
├── .dockerignore        # Docker ignore file
├── docker-compose.yml   # Docker Compose configuration
├── Dockerfile           # Docker configuration
├── next.config.js       # Next.js configuration
└── package.json         # Project dependencies
```

## Key Components

### Session Management

The application allows users to create and join planning sessions. Each session has:

- A unique ID
- A name and description
- A set of tasks to estimate
- A list of participants
- A voting state (waiting, voting, revealed)

### Voting Process

1. The session creator adds tasks to the session
2. Participants join the session
3. The session creator starts the voting process
4. Participants vote on the current task
5. Once all participants have voted, the session creator reveals the results
6. The team discusses the results and can revote if needed
7. The session creator moves to the next task

### Authentication

The application supports:

- Google OAuth login
- Email/password registration and login
- Session-based authentication with NextAuth.js

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Socket.io](https://socket.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
