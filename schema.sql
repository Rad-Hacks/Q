DROP DATABASE IF EXISTS  q;

CREATE DATABASE q;

USE q;

CREATE TABLE events(
  id int NOT NULL AUTO_INCREMENT,
  name varchar (50) NOT NULL,
  amount decimal (10, 2) NOT NULL,
  address varchar (225) NOT NULL,
  city varchar (25) NOT NULL,
  state varchar (2) NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  duration int (10) NOT NULL,
  contactEmail varchar(50),
  PRIMARY KEY(ID)
);

INSERT INTO events (name, amount, address, city, state, date, time, duration, contactEmail) VALUES ("Franklin's", 200, '900 E. 11th St.', 'Austin', 'TX', '2017-05-05', '11:30:00', 4, 'peter@johnson.com');
