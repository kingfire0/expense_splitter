

 💸 SplitSquare (Expense Splitter)

A simple **expense splitting app** (like Splitwise) built with **React + Node.js + MongoDB**.  
You can create groups, add members, record expenses, and see balances with settlement suggestions.  
Supports **light/dark mode** 🌗 and **multi-currency selection** 💱.

---

## ✨ Features
- 🏠 **Dashboard**: Manage all your groups in one place.  
- 👥 **Groups**: Create groups (e.g., "Goa Trip", "Flatmates") and add members.  
- 💰 **Expenses**: Add, update, and delete expenses with date & time tracking.  
- 📊 **Balances**: Automatically calculates who owes whom.  
- 🔄 **Smart Settlement**: Suggests the minimum number of transactions.  
- 🎨 **UI**: Clean design with **dark & light themes**.  
- 💱 **Currency Selector**: Choose your preferred currency (₹, $, €, etc).  

---

## 🛠️ Tech Stack
**Frontend**
- React.js  
- CSS (custom styles inspired by KittySplit & modern dashboards)  

**Backend**
- Node.js + Express.js  
- MongoDB (via Mongoose)  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone repo
```bash
git clone https://github.com/<your-username>/mini-splitwise.git
cd mini-splitwise

2️⃣ Backend Setup
cd backend
npm install


Start MongoDB (ensure it’s running locally):

mongod


Run backend:

npm start


By default it runs on http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm start


Frontend runs on http://localhost:3000

📸 Screenshots
Dashboard

Group View

📂 Project Structure
mini-splitwise/
│── backend/         # Express + MongoDB API
│── frontend/        # React app
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── api/          # API calls (Axios)
│   │   ├── utils/        # Settlement logic
│   │   └── App.js
│── docs/           # Screenshots for README
│── README.md

🚀 Future Improvements

🔔 Add notifications (e.g., when a group is updated)

📱 Make fully responsive for mobile-first use

📤 Export settlements as PDF/CSV

🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.
