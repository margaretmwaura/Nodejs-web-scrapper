CREATE TABLE vowels ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
name varchar(200) DEFAULT NULL, 
description varchar(200) DEFAULT NULL, 
filename varchar(200) DEFAULT NULL, 
created_at timestamp NULL DEFAULT NULL, 
deleted_at timestamp NULL DEFAULT NULL, 
updated_at timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;

ALTER USER 'root' IDENTIFIED WITH mysql_root_password BY 'Aswift07';

flush privileges;