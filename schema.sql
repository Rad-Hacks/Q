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
INSERT INTO events (name, amount, address, city, state, date, time, duration, contactEmail) VALUES ("Abby's", 40, '9900 E. 11th St.', 'Dallas', 'TX', '2017-05-05', '11:30:00', 4, 'peter@johnson.com');
INSERT INTO events (name, amount, address, city, state, date, time, duration, contactEmail) VALUES ("Fred's", 10, '800 E. 11th St.', 'Dallas', 'TX', '2017-05-05', '11:30:00', 4, 'peter@johnson.com');
INSERT INTO events (name, amount, address, city, state, date, time, duration, contactEmail) VALUES ("Tom's", 150, '4000 E. 11th St.', 'Orlando', 'FL', '2017-05-05', '11:30:00', 4, 'peter@johnson.com');
INSERT INTO events (name, amount, address, city, state, date, time, duration, contactEmail) VALUES ("Billy's", 270, '400 E. 11th St.', 'Houston', 'TX', '2017-05-05', '11:30:00', 4, 'peter@johnson.com');
INSERT INTO events (name, amount, address, city, state, date, time, duration, contactEmail) VALUES ("Kate's", 50, '30 E. 11th St.', 'Orlando', 'FL', '2017-05-05', '11:30:00', 4, 'peter@johnson.com');
INSERT INTO events (name, amount, address, city, state, date, time, duration, contactEmail) VALUES ("Sally's", 125, '100 E7. 11th St.', 'Austin', 'TX', '2017-05-05', '11:30:00', 4, 'peter@johnson.com');
