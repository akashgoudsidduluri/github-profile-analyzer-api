CREATE DATABASE github_analyzer;

USE github_analyzer;

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