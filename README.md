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
Before running the application, you **must** configure the environment variables:
#### Server Configuration
**Properties file**: (`server/src/main/resources/application.properties`)
```properties
# Application Config
spring.application.name=server
server.port=8000

# Database Config
spring.datasource.url=jdbc:mysql://localhost:3306/jwt_demo
spring.datasource.username=namduongit
spring.datasource.password=NDuong205

# JPA Config
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Client URL
CLIENT_URL=http://localhost:5173

# JWT Config
SECRET_KEY=SjHJaop2ktX2WesRaw2T8Ou/z8qCxiTIK+FVyxTkuEa/I1Z2q7Pesp/ETyKqIwbuIbe7xcMSqwvZxBG/GkFX3Q==
EXPIRATION_TIME=86400

# Console DEBUG
logging.level.org.springframework.security=DEBUG

# File Upload Configuration
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```


**Firebase json**: (`server/src/main/resources/firebase-service-account.json`)
- Content file download in Firebase console -> Project settings

#### Client Configuration (`client/.env`)
Create and configure the following variables:
```env
# Server
VITE_SERVER_URL=http://localhost:8000
VITE_SERVER_PORT=8000
VITE_SERVER_HOST=http://localhost
```

---

