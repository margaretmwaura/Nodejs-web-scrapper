-- Notes -> Foreign Keys should be in caps

CREATE TABLE vowels ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
name varchar(200) DEFAULT NULL, 
description varchar(200) DEFAULT NULL, 
filename varchar(2000) DEFAULT NULL, 
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
deleted_at timestamp NULL DEFAULT NULL, 
updated_at timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE users ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
first_name varchar(200) DEFAULT NULL, 
last_name varchar(200) DEFAULT NULL, 
email varchar(200) DEFAULT NULL, 
password varchar(200) DEFAULT NULL, 
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
deleted_at timestamp NULL DEFAULT NULL, 
updated_at timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id) ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE todoLists ( id int(11) unsigned NOT NULL AUTO_INCREMENT, 
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
deleted_at timestamp NULL DEFAULT NULL, 
updated_at timestamp NULL DEFAULT NULL, 
user_id int(11) unsigned NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE todoListItems ( 
id int(11) unsigned NOT NULL AUTO_INCREMENT, 
item_name varchar(200) NOT NULL, 
key_name varchar(200) NOT NULL,
reminder timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
todo_list_id int(11) unsigned NOT NULL,
status_name varchar(200) NOT NULL,
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
deleted_at timestamp NULL DEFAULT NULL, 
updated_at timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id),
FOREIGN KEY (todo_list_id) REFERENCES todoLists(id) ON DELETE CASCADE ON UPDATE CASCADE ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


CREATE TABLE notes ( 
id int(11) unsigned NOT NULL AUTO_INCREMENT, 
topic varchar(200) NOT NULL, 
content varchar(32765) NOT NULL, 
user_id int(11) unsigned NOT NULL,
created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, 
deleted_at timestamp NULL DEFAULT NULL, 
updated_at timestamp NULL DEFAULT NULL, 
PRIMARY KEY (id),
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

