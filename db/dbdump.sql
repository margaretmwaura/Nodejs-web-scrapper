CREATE TABLE vowels ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
name varchar(200) DEFAULT NULL, 
description varchar(200) DEFAULT NULL, 
filename varchar(2000) DEFAULT NULL, 
createdAt timestamp NULL DEFAULT NULL, 
deletedAt timestamp NULL DEFAULT NULL, 
updatedAt timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

CREATE TABLE users ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
firstName varchar(200) DEFAULT NULL, 
lastName varchar(200) DEFAULT NULL, 
email varchar(200) DEFAULT NULL, 
password varchar(200) DEFAULT NULL, 
createdAt timestamp NULL DEFAULT NULL, 
deletedAt timestamp NULL DEFAULT NULL, 
updatedAt timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;


-- FIXME: Read the password from config
ALTER USER 'root' IDENTIFIED WITH mysql_root_password BY 'Aswift07';

flush privileges;