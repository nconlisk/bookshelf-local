CREATE DATABASE bookshelf;

CREATE TABLE books (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(100),
    progress INT,
    date VARCHAR(300),
    author VARCHAR,
    year VARCHAR,
    isbn VARCHAR,
    thumbnail VARCHAR

);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);