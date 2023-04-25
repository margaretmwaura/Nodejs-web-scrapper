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


CREATE TABLE todoLists ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
createdAt timestamp NULL DEFAULT NULL, 
deletedAt timestamp NULL DEFAULT NULL, 
updatedAt timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;


CREATE TABLE todoListStatuses ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
name varchar(200) DEFAULT NULL, 
createdAt timestamp NULL DEFAULT NULL, 
deletedAt timestamp NULL DEFAULT NULL, 
updatedAt timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;


CREATE TABLE todoListItems ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
firstName varchar(200) DEFAULT NULL, 
itemStatus varchar(200) DEFAULT NULL, 
reminder timestamp NULL DEFAULT NULL
todolistID int NOT NULL,
statusId int NOT NULL,
createdAt timestamp NULL DEFAULT NULL, 
deletedAt timestamp NULL DEFAULT NULL, 
updatedAt timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
FOREIGN KEY (todolistID) REFERENCES todoLists(id) ON DELETE CASCADE UPDATE CASCADE
FOREIGN KEY (statusId) REFERENCES todoListStatuses(id) ON DELETE CASCADE ON UPDATE CASCADE

-- FIXME: Read the password from config
ALTER USER 'root' IDENTIFIED WITH mysql_root_password BY 'Aswift07';

flush privileges;