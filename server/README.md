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
        email VARCHAR(150) NOT NULL, PRIMARY KEY (id)  
    );

    CREATE TABLE posts (
       id INT unsigned NOT NULL AUTO_INCREMENT,
       userId INT,
       title VARCHAR(150) NOT NULL,
       content VARCHAR(150) NOT NULL, PRIMARY KEY (id)
    );
```
