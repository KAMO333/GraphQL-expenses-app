# GraphQL Expense Tracker - MERN Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Apollo](https://img.shields.io/badge/Apollo-311C87?style=for-the-badge&logo=apollographql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=white)

Welcome to the MERN GraphQL Expense Tracker App! This project is a full-stack application designed to manage expenses efficiently using a modern, scalable tech stack.

[![Run Tests](https://github.com/KAMO333/GraphQL-expenses-app/actions/workflows/tests.yml/badge.svg)](https://github.com/KAMO333/GraphQL-expenses-app/actions/workflows/tests.yml)

## 🌟 Features

- **Tech Stack:** MERN (MongoDB, Express.js, React.js, Node.js) + Apollo GraphQL
- **GraphQL Schema:** Robust type definitions and resolvers for data fetching logic
- **Relational Data:** Mutations for modifying data and establishing graph relations between Users and Transactions
- **Authentication:** Secure auth using Passport.js and MongoDB session store
- **State Management:** Global state handled via Apollo Client for seamless UI updates
- **Automated Testing:** Unit testing with Jest and TDD principles to ensure reliability
- **CI/CD:** Automated testing pipeline via GitHub Actions on every push
- **Containerization:** Dockerized testing environment for hardware-agnostic database instances
- **Automation:** Integrated Cron jobs for scheduled tasks

---

## 🛠️ Testing & Environment

This project utilizes **Docker Compose** to ensure a consistent testing environment across different hardware.

- **Hardware Compatibility:** The testing suite uses a containerized MongoDB 4.4 instance to support systems without AVX instruction sets (fixing the `SIGILL` error common in newer Mongo versions on older CPUs).
- **CI/CD Pipeline:** GitHub Actions automatically builds the environment and runs the test suite (User & Transaction resolvers) to ensure code integrity before deployment.

---

## ⚙️ Setup

### 1. Configure Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

### 2. Run Tests (Docker Required)

```bash
# Spins up the test DB and runs the Jest suite
sudo docker compose up --build --abort-on-container-exit
```

### 3. Build the App

```bash
npm run build
```

### 4. Start the App

```bash
# Production mode
npm start

# Development mode
npm run dev
```
