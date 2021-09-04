USE sdcReviews;

SET sql_mode = "";

LOAD DATA 
    LOCAL 
    INFILE '/Users/mypc/hackreactor/ratings-and-reviews-service/csv_data/product.csv' 
    INTO TABLE product 
    FIELDS TERMINATED BY ',' 
    OPTIONALLY ENCLOSED BY '"' 
    LINES TERMINATED BY '\n' 
    IGNORE 1 LINES 
    (id, name, slogan, description, category, default_price)
;

LOAD DATA 
    LOCAL 
    INFILE '/Users/mypc/hackreactor/ratings-and-reviews-service/csv_data/reviews.csv' 
    INTO TABLE reviews 
    FIELDS TERMINATED BY ',' 
    OPTIONALLY ENCLOSED BY '"' 
    LINES TERMINATED BY '\n' 
    IGNORE 1 LINES 
    (id, product_id, rating, date, summary, body, @var1, @var2, reviewer_name, reviewer_email, response, helpfulness)
    SET recommend = (@var1 = 'true'), reported = (@var2 = 'true')
;

LOAD DATA 
    LOCAL 
    INFILE '/Users/mypc/hackreactor/ratings-and-reviews-service/csv_data/reviews_photos.csv' 
    INTO TABLE reviews_photos
    FIELDS TERMINATED BY ',' 
    OPTIONALLY ENCLOSED BY '"' 
    LINES TERMINATED BY '\n' 
    IGNORE 1 LINES 
    (id, review_id, url)
;

LOAD DATA 
    LOCAL 
    INFILE '/Users/mypc/hackreactor/ratings-and-reviews-service/csv_data/characteristics.csv' 
    INTO TABLE characteristics
    FIELDS TERMINATED BY ',' 
    OPTIONALLY ENCLOSED BY '"' 
    LINES TERMINATED BY '\n' 
    IGNORE 1 LINES 
    (id, product_id, name)
;

LOAD DATA 
    LOCAL 
    INFILE '/Users/mypc/hackreactor/ratings-and-reviews-service/csv_data/characteristic_reviews.csv' 
    INTO TABLE characteristic_reviews
    FIELDS TERMINATED BY ',' 
    OPTIONALLY ENCLOSED BY '"' 
    LINES TERMINATED BY '\n' 
    IGNORE 1 LINES 
    (id, characteristic_id, review_id, value)
;

-- mysql -u root < server/schema_loading.sql -p to execute the file