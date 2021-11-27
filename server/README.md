# Server Guide

## Database
windows setup
```
cd C:\Program Files\MySQL\MySQL Server 8.0\bin

mysql -u root -p
```

`users` table:
```sql
CREATE DATABASE playpal;
use playpal;

    CREATE TABLE users ( 
        id INT unsigned NOT NULL AUTO_INCREMENT,  
        name VARCHAR(150) NOT NULL,
        created_date VARCHAR(255),
        last_modified_date VARCHAR(255),
        email VARCHAR(150) NOT NULL, PRIMARY KEY (id)  
    );

    CREATE TABLE posts (
       id INT unsigned NOT NULL AUTO_INCREMENT,
       creator_id INT unsigned,
       title VARCHAR(150) NOT NULL,
       content VARCHAR(150) NOT NULL, 
       created_date VARCHAR(255),
       last_modified_date VARCHAR(255)
       PRIMARY KEY (id),
       FOREIGN KEY (creator_id) REFERENCES users(id)
    );

    CREATE TABLE comments (
       id INT unsigned NOT NULL AUTO_INCREMENT,
       userId INT,
       created_date VARCHAR(255),
       last_modified_date VARCHAR(255),
       content VARCHAR(150) NOT NULL, PRIMARY KEY (id)
    );

    CREATE TABLE messages (
        id INT unsigned NOT NULL AUTO_INCREMENT,
        sender_id INT unsigned,
        post_id INT unsigned,
        content VARCHAR(150) NOT NULL, 
        PRIMARY KEY(id),
        FOREIGN KEY (sender_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
    );   
```
