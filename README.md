# SPOCE Doctor

**Web app for medical appointments and checkups**  
_Backend: Spring Boot | Frontend: Vite + TypeScript_

---

### Get Started
- Server:
- Client:

*Note* You must config variable in `.env` and `application.properties`. You can read example file to config

### Clone the repository
```bash
git clone https://github.com/namduongit/appointments-hostpital.git
cd appointments-hostpital
```

### Project Structure
```bash
spoсe-doctor/
├── server/           # Spring Boot backend (Update later)
├── client/           # Vite + TypeScript frontend
├── docker/           # Docker (Update later)
├── .env              # Config variable
└── README.md         # README.md
... Some file or Folder
... Update somethings later
```

### Prerequisites
- Java 21+ (for Spring Boot)
- Node.js 20+ (for Vite)
- Gradle
- Your favorite IDE (Vscode, SpringTools,...) or CLI(Terminal)

### Running the project
*** 1. Run docker compose ***
- Note: You must config some things before run docker compose
- Script
    ```bash
        cd appointments-hostpital/docker && docker compose up
    ```
*** 2. Run BackEnd ***
- Note: Run with IDE or Docker. This script to help you run with VsCode
- Script: 
    ```bash
        cd appointments-hostpital/server && code . 
        # Run by button Run in JavaSpring project
    ```
*** 3. Run FontEnd ***
- Note: You can run with docker or CLI. This script to help you run with CLI
- Script:
    ```bash
        # Install dependencies
        cd appointments-hostpital/client && npm install
        npm run dev
    ```
