# Create the events database tables

CREATE TABLE events_table
(
    event_id INT NOT NULL AUTO_INCREMENT,
    event_year INT,
    event_month INT,
    event_day INT,
    description VARCHAR(255),
    completed INT,
    PRIMARY KEY(event_id)
)

# Create the user database tables

CREATE TABLE user_table
(
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255),
    user_email VARCHAR(255),
    user_password VARCHAR(255),
    PRIMARY KEY(user_id)
)
