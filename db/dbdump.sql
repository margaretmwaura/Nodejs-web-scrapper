-- Notes -> Foreign Keys should be in caps

CREATE TABLE vowels ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
name varchar(200) DEFAULT NULL, 
description varchar(200) DEFAULT NULL, 
filename varchar(2000) DEFAULT NULL, 
created_at timestamp NULL DEFAULT NULL, 
deleted_at timestamp NULL DEFAULT NULL, 
updated_at timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;


CREATE TABLE users ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
first_name varchar(200) DEFAULT NULL, 
last_name varchar(200) DEFAULT NULL, 
email varchar(200) DEFAULT NULL, 
password varchar(200) DEFAULT NULL, 
created_at timestamp NULL DEFAULT NULL, 
deleted_at timestamp NULL DEFAULT NULL, 
updated_at timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;


CREATE TABLE todoLists ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
created_at timestamp NULL DEFAULT NULL, 
deleted_at timestamp NULL DEFAULT NULL, 
updated_at timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;


CREATE TABLE todoListItems ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
item_name varchar(200) NOT NULL, 
key_name varchar(200) NOT NULL,
reminder DATETIME NULL DEFAULT NULL,
todo_list_id int(11) unsigned NOT NULL,
status_name varchar(200) NOT NULL,
created_at timestamp NULL DEFAULT NULL, 
deleted_at timestamp NULL DEFAULT NULL, 
updated_at timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1
FOREIGN KEY (todo_list_id) REFERENCES todoLists(id) ON DELETE CASCADE UPDATE CASCADE


-- FIXME: Read the password from config
ALTER USER 'root' IDENTIFIED WITH mysql_root_password BY 'Aswift07';

flush privileges;