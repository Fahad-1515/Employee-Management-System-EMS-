#  Employee Management System (EMS)

### Tech Stack: Java, Spring Boot, Hibernate, MySQL, Angular, JWT , MySQL

## Implemented -- CRUD, REST APIs, data validation, and authentication.

## Features:

Login/Logout (JWT-based Authentication)

CRUD for employees (add, update, delete, list)

Search and filter employees

Role-based access (Admin/User)

Responsive UI with Angular

REST APIs built with Spring Boot + Hibernate

### Prerequisites

Make sure you have these installed:

Tool Version Check Command
Java 17+ java -version
Maven 3.8+ mvn -v
MySQL Server 8+ mysql -V
Node.js + npm 18+ node -v, npm -v
Angular CLI Latest npm install -g @angular/cli
### Demonstrates:
✅ Angular + REST integration
✅ Spring Boot backend + Hibernate ORM
✅ MySQL database
✅ Full stack CRUD and security

| Component           | Port                                                | Purpose                   |
| ------------------- | --------------------------------------------------- | ------------------------- |
| Spring Boot backend | **8080**                                            | REST API & authentication |
| Angular frontend    | **4200**                                            | User interface            |
| Proxy               | connects `/api/**` → `http://localhost:8080/api/**` | seamless integration      |

---

### Run ems-backend

mvn clean install

mvn spring-boot:run | ./mvnw spring-boot:run

http://localhost:4200    ---View Website

### ems-frontend setup

npm install -g @angular/cli

npm install

update package.json  
"start": "ng serve --proxy-config proxy.conf.json"

proxy.config.json

{
"/api": {
"target": "http://localhost:8080",
"secure": false,
"changeOrigin": true
}
}

### Run FrontEnd

npm install --save-dev @angular-devkit/build-angular

npx ng serve --open --proxy-config proxy.conf.json  |  (Prefered) ng serve --proxy-config proxy.conf.json  |  ng serve

--------------------------------------------------------------------------------------------------------------------------------------

