CREATE DATABASE IF NOT EXISTS `property_management_system`;

USE `property_management_system`;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'tenant', 'manager') DEFAULT 'tenant',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE houses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    house_number VARCHAR(50) NOT NULL,
    house_type VARCHAR(50),
    property_id INT,
    status ENUM('occupied', 'vacant') DEFAULT 'vacant',
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

CREATE TABLE tenancies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    house_id INT,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP
    end_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (house_id) REFERENCES houses(id)
);

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    house_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    receipt_path VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (house_id) REFERENCES houses(id)
);

CREATE TABLE vacating_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    house_id INT NOT NULL,
    vacate_date DATE NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (house_id) REFERENCES houses(id)
);
