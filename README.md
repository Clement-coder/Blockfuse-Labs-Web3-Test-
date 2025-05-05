# Real-Time Football Pitch Visualizer

A fun and interactive real-time football pitch built with **Next.js**, **Tailwind CSS**, **TypeScript**, and **Socket.IO**. Watch players move, track the ball, and see live match events like goals, fouls, and substitutions.

---

##  Features

Real-time player and ball movement (via WebSocket)
Auto-generated in-game events (goal, foul, substitution)
Live scoreboard updates
Responsive UI styled with Tailwind CSS
Smart random player positioning with collision-safe boundaries

---

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript  
- **Styling**: Tailwind CSS  
- **Real-Time Engine**: Socket.IO  
- **State Management**: React Hooks (`useState`, `useEffect`)

---

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/Clement-coder/Blockfuse-Labs-Web3-Test-
Vercle https://blockfuse-labs-web3-test-nine.vercel.app/
cd football-pitch
npm install


🧪 Run Locally
Start the development server:

bash
Copy
Edit
npm run dev
Open http://localhost:3000 in your browser.

Ensure your Socket.IO server is running and matches the URL in the code (io("YOUR_SOCKET_SERVER_URL")).

File Structure
csharp
Copy
Edit
components/
├── Pitch.tsx       
├── Player.tsx     
└── Ball.tsx        

public/
└── players/        
Author
Built with  by Clement Raymond
🔧 Powered by Blockfuse Labs

