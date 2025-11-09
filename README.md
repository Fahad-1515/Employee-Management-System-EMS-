# Employee-Management-System-EMS-
Tech Stack: Java, Spring Boot, Hibernate, MySQL, Angular, JWT

start making 1. Employee Management System (EMS)

Tech Stack: Java, Spring Boot, Hibernate, Angular, MySQL

Why: It’s classic but powerful — covers CRUD, REST APIs, data validation, and authentication.

Features:

Login/Logout (JWT-based Authentication)

CRUD for employees (add, update, delete, list)

Search and filter employees

Role-based access (Admin/User)

Responsive UI with Angular

REST APIs built with Spring Boot + Hibernate


🧩 1. Prerequisites

Make sure you have these installed:

Tool	Version	Check Command
Java	17+	java -version
Maven	3.8+	mvn -v
MySQL Server	8+	mysql -V
Node.js + npm	18+	node -v, npm -v
Angular CLI	Latest	npm install -g @angular/cli
Demonstrates:
✅ Angular + REST integration
✅ Spring Boot backend + Hibernate ORM
✅ MySQL database
✅ Full stack CRUD and security


| Component           | Port                                                | Purpose                   |
| ------------------- | --------------------------------------------------- | ------------------------- |
| Spring Boot backend | **8080**                                            | REST API & authentication |
| Angular frontend    | **4200**                                            | User interface            |
| Proxy               | connects `/api/**` → `http://localhost:8080/api/**` | seamless integration      |

