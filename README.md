# SPOCE Hospital Management System
**A comprehensive web application for managing hospital appointments and medical services**  
_Backend: Spring Boot | Frontend: React + Vite + TypeScript_

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/namduongit/appointments-hospital
cd appointments-hospital
```
---
### 2. Environment Configuration
- Create and update a `.env` file in the `client` directory by copying the contents from `.example.env` and modifying the values as needed for your environment.
- Create and update a `application.properties` file in the `server/src/main/resources` directory by copying the contents from `.example.application.properties` and modifying the values as needed for your environment.
- Create and update a `config.json` file in the `server/src/main/resources/firebase` directory by copying the contents from `.example.config.json` and modifying the values as needed for your environment.

### 3. Backend Setup
- Database: Ensure you have a running instance of MySQL
- AMQP: Ensure you have a running instance of RabbitMQ

### 4. Running the Application
- Run with Docker Compose:
```bash
docker-compose up --build
```
