# Dip.

Simple, modern noticeboard application. Features a minimalist design and easy-to-use interface.

## How To Use.

### Prerequisites.

- Java 17+.
- Maven
- MySQL

### Install & Run

1. clone repository
   Clone the repositories ``bash
   git clone https://github.com/rxxuzi/dip.git
   cd dip
   ````

2. prepare MySQL database.
   ```sql
   CREATE DATABASE dip CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;.
   CREATE USER IF NOT EXISTS ‘user’@‘localhost’ IDENTIFIED BY ‘password’;.
   GRANT ALL PRIVILEGES ON dip.* TO ‘user’@‘localhost’;
   FLUSH PRIVILEGES;.
   ```

3. run the application.
   ```bash.
   . /mvnw spring-boot:run.
   ````

4. accessed via browser: http://localhost:8080

