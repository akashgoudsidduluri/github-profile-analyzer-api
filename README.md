# GitHub Profile Analyzer API

## Overview

GitHub Profile Analyzer API is a backend service built using Node.js, Express.js, MySQL, and the GitHub Public API.

The application fetches GitHub profile information for a given username, analyzes useful profile metrics, stores the data in a MySQL database, and provides APIs to retrieve stored profile information.

---

## Features

### Analyze GitHub Profiles

* Fetch GitHub user data using GitHub Public API
* Extract useful profile insights
* Store profile information in MySQL database

### Retrieve Stored Profiles

* Fetch all analyzed profiles
* Fetch a specific analyzed profile by username

### Error Handling

* Invalid GitHub usernames
* Database errors
* API failures

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* Axios
* Dotenv

---

## Project Structure

```text
github-profile-analyzer-api/
│
├── index.js
├── package.json
├── .env
├── README.md
│
└── database
```

Future scalable structure:

```text
github-profile-analyzer-api/
│
├── config
│   └── db.js
│
├── controllers
│   └── profileController.js
│
├── routes
│   └── profileRoutes.js
│
├── services
│   └── githubService.js
│
├── .env
├── index.js
└── package.json
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd github-profile-analyzer-api
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env` file in the root directory.

```env
PORT=5000
DB_PASS=your_mysql_password
```

### Start Server

```bash
npm start
```

Server will run on:

```text
http://localhost:5000
```

---

## Database Setup

### Create Database

```sql
CREATE DATABASE github_analyzer;
```

### Select Database

```sql
USE github_analyzer;
```

### Create Table

```sql
CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    name VARCHAR(255),
    followers INT,
    following INT,
    public_repos INT,
    public_gists INT,
    profile_url VARCHAR(255),
    avatar_url TEXT,
    account_created_at TIMESTAMP,
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Home Route

#### Request

```http
GET /
```

#### Response

```html
<h1>github analyser started</h1>
```

---

### Analyze GitHub Profile

Fetches data from GitHub API and stores it in MySQL.

#### Request

```http
POST /analyze/:username
```

#### Example

```http
POST /analyze/torvalds
```

#### Response

```json
{
    "message": "Profile stored successfully"
}
```

---

### Get GitHub Profile Directly

Fetches live profile data from GitHub API.

#### Request

```http
GET /github/:username
```

#### Example

```http
GET /github/torvalds
```

#### Response

```json
{
    "username": "torvalds",
    "followers": 250000
}
```

---

### Get All Stored Profiles

#### Request

```http
GET /profiles
```

#### Response

```json
[
  {
    "id": 1,
    "username": "torvalds"
  }
]
```

---

### Get Single Stored Profile

#### Request

```http
GET /profiles/:username
```

#### Example

```http
GET /profiles/torvalds
```

#### Response

```json
{
  "id": 1,
  "username": "torvalds",
  "followers": 250000
}
```

---

## Example Workflow

```text
Client Request
      ↓
Express Route
      ↓
GitHub API Request
      ↓
GitHub Response
      ↓
Data Processing
      ↓
MySQL Storage
      ↓
API Response
```

---

## References

### GitHub REST API

https://docs.github.com/en/rest/users/users

### Express.js Documentation

https://expressjs.com/

### Axios Documentation

https://axios-http.com/docs/intro

### MySQL Documentation

https://dev.mysql.com/doc/

### Node.js Documentation

https://nodejs.org/en/docs

---

## Future Improvements

* Update existing profiles instead of duplicate insertion errors
* Add profile popularity score
* Add account age analysis
* Add developer level classification
* Implement pagination
* Deploy using Render or Railway
* Refactor into MVC architecture

---

## Author

Akash Goud Sidduluri
