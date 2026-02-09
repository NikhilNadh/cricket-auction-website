# 🏏 Cricket Auction Web App

A web-based Cricket Auction Platform where users can manage teams, players, and conduct live bidding similar to real cricket league auctions.
This project is built using React + TypeScript + Vite for fast performance and modern UI.

# 🚀 Features

     👥 Team Creation & Management
     🧑‍🎤 Player Listing & Categorization
     💰 Live Bidding / Auction Board
     📊 Team Dashboard
     🔍 Navigation & Routing Between Pages
     ⚡ Fast UI with Vite
     🧩 Modular Component Structure


# 🛠 Tech Stack

Frontend: React + TypeScript

Build Tool: Vite

Styling: CSS / Custom Styles

Package Manager: npm / bun

State Management: React Context API

# 📂 Project Structure

Cricket-Auction/
│
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images & media
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   ├── AuctionBoard.tsx
│   │   ├── Navigation.tsx
│   │   ├── NavLink.tsx
│   │   ├── PlayerManagement.tsx
│   │   ├── TeamDashboard.tsx
│   │   └── TeamSetup.tsx
│   │
│   ├── context/
│   │   └── AuctionContext.tsx   # Global state
│   │
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # App pages
│   ├── types/              # TypeScript types
│   │
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── App.css
│
├── index.html
├── package.json
├── bun.lock / package-lock.json
└── README.md

## ⚙️ Installation & Setup

1. Clone the Repository

 - git clone 
 - cd cricket-auction-website

2. Install Dependencies

 - npm install
 - npm i

3. Run Development Server
 - npm run dev


4. Open in browser:

 - http://localhost:8080

# 🧠 How It Works

   - AuctionContext manages global state for teams, players, and bids.
   - Paste photos of player or team in "src\assets" name of the photo will be the code .
   - TeamSetup allows creation of teams before auction.
   - PlayerManagement handles player data.
   - AuctionBoard controls live bidding logic.
   - TeamDashboard displays final team results and budgets.

# 🔮 Future Improvements

   - User Authentication (Login/Register)
   - Real-time multiplayer auction using WebSockets
   - Database integration (Firebase / Supabase / MongoDB)
   - Admin Panel
   - Player statistics & filters
   - Dark/Light Theme Toggle

 ##  👨‍💻 Author

 Nikhil Nadh S 