# MeetApp

A full-stack video calling web app built with React, Vite, Node.js, Express, MongoDB, and Socket.IO. The project lets users sign up or log in, create or join a room, and start real-time video calls with chat and screen-sharing support.

## Features

- User registration and login
- Secure JWT-based auth flow for protected app behavior
- Real-time video and audio calling using WebRTC + Socket.IO signaling
- Shared room URLs for joining calls
- In-call chat messages
- Screen sharing support
- MongoDB-backed user storage
- Responsive frontend built with React

## Tech Stack

- Frontend: React, Vite, React Router, Socket.IO client
- Backend: Node.js, Express, Socket.IO server
- Database: MongoDB with Mongoose
- Authentication: JWT + bcrypt
- Real-time communication: WebRTC + Socket.IO

## Project Structure

```bash
VideoCall/
├── Backend/
│   ├── Src/
│   │   ├── app.js
│   │   ├── SecretToken.js
│   │   ├── Controllers/
│   │   │   ├── socketManager.js
│   │   │   └── user.controller.js
│   │   ├── Models/
│   │   │   ├── meeting.model.js
│   │   │   └── User.model.js
│   │   └── Routes/
│   │       └── user.routes.js
│   └── package.json
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
└── ai.js
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 18+ installed
- npm or yarn installed
- MongoDB running locally or a MongoDB Atlas connection URL
- A modern browser with camera and microphone permissions enabled

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd VideoCall
```

2. Install backend dependencies:

```bash
cd Backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../Frontend
npm install
```

## Environment Variables

The backend currently loads environment variables via `dotenv` and expects a few values to be set.

Create a `.env` file in the `Backend` folder with values like:

```env
PORT=8000
ACCESS_TOKEN_SECRET=your_jwt_secret
MONGODB_URI=mongodb://localhost:27017/videocall
```

> Note: the code in `Backend/Src/app.js` currently connects to a MongoDB Atlas URI directly. For a secure and portable setup, it is recommended to move that connection string into an environment variable instead of keeping it hardcoded.

## Running the App

### Start the backend

```bash
cd Backend
npm run dev
```

Or in production mode:

```bash
npm start
```

### Start the frontend

```bash
cd Frontend
npm run dev
```

The Vite app typically runs at:

```text
http://localhost:5173
```

The backend usually runs at:

```text
http://localhost:8000
```

## API Endpoints

The backend exposes a simple API under `/api/v1`:

- `POST /api/v1/register` — create a user account
- `POST /api/v1/login` — log in and receive a token
- `GET /home` — basic health check endpoint

## How It Works

### Authentication

Users can sign up using a name, username, and password. The password is hashed before saving, and a JWT is generated during login.

### Video Calling

The frontend creates peer connections using WebRTC and uses Socket.IO to coordinate the signaling process between participants. Each room is identified by the current page URL, which is shared across users.

### Chat

Messages are broadcast through the Socket.IO server so all users in the same call room receive updates in real time.

## Usage

1. Open the frontend in the browser.
2. Register or log in.
3. Create a meeting room or join an existing room using the URL.
4. Grant browser permissions for microphone and camera.
5. Start the call and use the on-screen controls for mute, video toggle, and screen sharing.
6. Use the chat panel to send messages during the call.

## Important Notes

- The frontend is configured to connect to `localhost:8000` for the Socket.IO backend.
- CORS is enabled for `http://localhost:5173` in the backend.
- The app is suitable for local development and learning experiments, but should be hardened before production deployment.
- You may want to move the hardcoded MongoDB connection string and other secrets into a secure `.env` setup.

## Future Improvements

Potential enhancements for this app include:

- Room persistence and meeting history
- Better call cleanup and reconnection handling
- Improved peer state management
- Production-ready security and environment configuration
- Hosted signaling server for remote access across networks

## License

This project is currently unlicensed unless otherwise specified by the repository owner.

## Contributing

Contributions are welcome. If you want to improve the app:

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## Support

If you run into issues, check:

- backend console logs for Socket.IO and MongoDB errors
- browser console logs for WebRTC/media permission issues
- whether MongoDB is reachable from the backend
- whether the frontend and backend ports match the configured CORS and socket settings

