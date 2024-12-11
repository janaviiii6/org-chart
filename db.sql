CREATE DATABASE IF NOT EXISTS org_chart;
USE org_chart;

-- Create employee table
CREATE TABLE employees(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    parent_id INT DEFAULT NULL,
    photo_url VARCHAR(255),
    FOREIGN KEY (parent_id) REFERENCES employees(id)
);

-- insert dummy data into employees table
INSERT INTO employees (name, title, parent_id, photo_url)
VALUES 
('John Doe', 'CEO', NULL, 'ceo.jpg'),
('Jane Smith', 'CTO', 1, 'cto.jpg'),
('Bob Brown', 'CFO', 1, 'cfo.jpg'),
('Alice Green', 'Engineer', 2, 'alice.jpg'),
('Charlie White', 'Accountant', 3, 'charlie.jpg');