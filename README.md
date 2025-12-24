# 🏛️ Members Only
An exclusive message board where only the initiated can see the true faces behind the messages. Built as part of The Odin Project curriculum.

### 🔗 [Live Demo](https://members-only-cyon.onrender.com/)

---

## 📖 The Concept
In this clubhouse, anyone can read the messages, but the authors and timestamps are hidden behind a "Member Status" wall. Users must find the secret passcode to become a member. For those with even higher clearance, an Admin role allows for the moderation and deletion of posts.

---

## ✨ Features
- **Secure Authentication**: User registration and login using **Passport.js** and **bcrypt** for password hashing.
- **Dynamic Content**: Messages display differently based on the user's membership level.
- **Role-Based Access**: 
  - **Guest**: Can only read message content.
  - **Member**: Can see authors and timestamps.
  - **Admin**: Full visibility plus the ability to delete any post.
- **Automated Schema**: Built-in database initialization script for seamless deployment.

---

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (hosted on Render)
- **View Engine**: EJS (Embedded JavaScript)
- **Authentication**: Passport.js
- **Environment Management**: Dotenv

---

## 🚀 Local Installation

1. **Clone the repo**
   ```bash
   git clone [https://github.com/Wahablawerl/members-only.git](https://github.com/Wahablawerl/members-only.git)
   cd members-only
