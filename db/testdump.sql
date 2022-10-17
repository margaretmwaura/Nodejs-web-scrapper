CREATE TABLE vowels ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
name varchar(200) DEFAULT NULL, 
description varchar(200) DEFAULT NULL, 
filename BLOB DEFAULT NULL, 
createdAt timestamp NULL DEFAULT NULL, 
deletedAt timestamp NULL DEFAULT NULL, 
updatedAt timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

ALTER USER 'root' IDENTIFIED WITH mysql_root_password BY 'Aswift07';

flush privileges;