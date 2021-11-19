CREATE TABLE users (
                       id INT unsigned NOT NULL AUTO_INCREMENT,
                       name VARCHAR(150) NOT NULL,
                       email VARCHAR(150) NOT NULL, PRIMARY KEY (id)
);

CREATE TABLE posts (
                       id INT unsigned NOT NULL AUTO_INCREMENT,
                       creator_id INT unsigned,
                       title VARCHAR(150) NOT NULL,
                       content VARCHAR(150) NOT NULL,
                       PRIMARY KEY (id),
                       FOREIGN KEY (creator_id) REFERENCES users(id)
);