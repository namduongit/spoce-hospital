# SPOCE Hospital Management System

**A comprehensive web application for managing hospital appointments and medical services**  
_Backend: Spring Boot | Frontend: React + Vite + TypeScript_

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/namduongit/spoce-hospital.git
cd spoce-hospital
```

### 2. Environment Configuration

Before running the application, you **must** configure the environment variables:

#### Server Configuration (`server/src/main/resources/application.properties`)
Create and configure the following properties:
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/spoce_hospital
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# JWT Configuration
jwt.secret=your_jwt_secret_key_here
jwt.expiration=86400000

# Email Configuration (if applicable)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
```

#### Client Configuration (`client/.env`)
Create and configure the following variables:
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8080/api
VITE_API_TIMEOUT=30000

# Environment
VITE_NODE_ENV=development

# Features
VITE_ENABLE_LOGGING=true
VITE_ENABLE_MOCK_DATA=false

# Authentication
VITE_JWT_STORAGE_KEY=spoce_auth_token
```

## 📁 Project Structure

```
spoce-doctor/
├── server/                     # Spring Boot Backend
│   ├── src/main/java/         # Java source code
│   │   └── com/spoce/        # Main package
│   │       ├── controllers/   # REST Controllers
│   │       ├── models/       # Entity models
│   │       ├── repositories/ # Data repositories
│   │       └── services/     # Business logic
│   ├── src/main/resources/   # Configuration files
│   │   └── application.properties
│   ├── build.gradle          # Gradle dependencies
│   └── gradlew              # Gradle wrapper
│
├── client/                   # React Frontend
│   ├── src/
│   │   ├── admin/           # Admin panel components
│   │   ├── doctor/          # Doctor dashboard
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── contexts/       # React contexts
│   │   ├── models/         # TypeScript interfaces
│   │   └── utils/          # Utility functions
│   ├── package.json        # Node.js dependencies
│   ├── vite.config.ts      # Vite configuration
│   └── .env               # Environment variables
│
├── docker/                 # Docker configuration
│   └── docker-compose.yaml
└── README.md
```

### Key Components

- **Admin Panel**: Hospital administration interface for managing doctors, departments, and system settings
- **Doctor Dashboard**: Interface for doctors to manage appointments, patient records, and schedules
- **Patient Interface**: Public-facing interface for appointment booking and medical services
- **API Services**: RESTful APIs for data management and authentication
- **Authentication**: JWT-based authentication system
- **Database Models**: Entities for Users, Appointments, Departments, Rooms, and Profiles

## 🛠️ Prerequisites

### Required Software Versions
- **Java**: 17 or higher (JDK 17+)
- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher (comes with Node.js)
- **Gradle**: 7.0+ (included via wrapper)
- **MySQL**: 8.0+ (for database)

### Build Tools
- **Backend**: Gradle (wrapper included)
- **Frontend**: Vite (TypeScript + React)

### Recommended IDEs
- **Backend**: IntelliJ IDEA, Eclipse, or VS Code with Java extensions
- **Frontend**: VS Code with React/TypeScript extensions

## 🏃‍♂️ How to Run

### 1. Database Setup
```bash
# Start MySQL and create database
mysql -u root -p
CREATE DATABASE spoce_hospital;
exit
```

### 2. Running the Server (Backend)

#### Option A: Using Gradle Wrapper (Recommended)
```bash
cd server
./gradlew bootRun
```

#### Option B: Using IDE
1. Open the `server` folder in your Java IDE
2. Wait for Gradle to download dependencies
3. Run the main application class or use the "Run" button

#### Option C: Building JAR and Running
```bash
cd server
./gradlew build
java -jar build/libs/server-*.jar
```

The server will start on `http://localhost:8080`

### 3. Running the Client (Frontend)

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

The client will start on `http://localhost:5173`

### 4. Using Docker (Optional)

```bash
cd docker
docker-compose up -d
```

## 📝 Additional Commands

### Server Commands
```bash
# Run tests
./gradlew test

# Build without running
./gradlew build

# Clean build
./gradlew clean build
```

### Client Commands
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## 🔧 Troubleshooting

1. **Database Connection Issues**: Ensure MySQL is running and credentials in `application.properties` are correct
2. **Port Conflicts**: Change ports in configuration files if 8080 or 5173 are already in use
3. **Node Modules Issues**: Delete `node_modules` and run `npm install` again
4. **Java Version**: Ensure you're using Java 17+ with `java --version`

## 📞 Support

For issues or questions, please open an issue in the GitHub repository.

---

**Happy Coding! 🚀**
