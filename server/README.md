# Server Guide

## Database
`users` table:
```sql
    CREATE TABLE users ( 
        id INT unsigned NOT NULL AUTO_INCREMENT,  
        name VARCHAR(150) NOT NULL, 
        email VARCHAR(150) NOT NULL, PRIMARY KEY (id)  
    );
```
