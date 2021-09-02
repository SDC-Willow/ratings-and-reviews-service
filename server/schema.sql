CREATE DATABASE IF NOT EXISTS sdcReviews;

USE sdcReviews;

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60),
    slogan VARCHAR(200),
    description VARCHAR(300),
    category VARCHAR(60),
    default_price INT,
    primary key (id)
);

CREATE TABLE reviews (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT,
    rating INT,
    date VARCHAR(60),
    summary VARCHAR(60),
    body VARCHAR(200),
    recommend BOOLEAN,
    reported BOOLEAN,
    reviewer_name VARCHAR(60),
    reviewer_email VARCHAR(60),
    response VARCHAR(60),
    helpfulness INT,
    primary key (id),
    foreign key (product_id) REFERENCES product (id)
);

CREATE TABLE reviews_photos (
    id INT NOT NULL AUTO_INCREMENT,
    review_id INT,
    url VARCHAR(100),
    primary key (id),
    foreign key (review_id) REFERENCES reviews (id)
);

CREATE TABLE characteristics (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT,
    name VARCHAR(60),
    primary key (id),
    foreign key (product_id) REFERENCES product (id)
);

CREATE TABLE characteristic_reviews (
    id INT NOT NULL AUTO_INCREMENT,
    characteristic_id INT,
    review_id INT,
    value INT,
    primary key (id),
    foreign key (characteristic_id) REFERENCES characteristics (id)
);


-- mysql -u root < server/schema.sql -p to execute the file