CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    text_task VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    state INT,
    user_id INT,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);