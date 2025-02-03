CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password TEXT,
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, password, avatar) VALUES
('Alice', 'password123', 'avatar1.png'),
('Bob', 'password456', 'avatar2.png'),
('Charlie', 'password789', 'avatar3.png');