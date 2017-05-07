DROP DATABASE IF EXISTS  q;

CREATE DATABASE q;

USE q;

CREATE TABLE users(
  user_id varchar (100) NOT NULL,
  username varchar (100) NOT NULL,
  password varchar (100) NOT NULL,
  city varchar (25) NOT NULL,
  state varchar (2) NOT NULL,
  contactEmail varchar (50) NOT NULL,
  PRIMARY KEY(USER_ID)
);

CREATE TABLE events(
  id int NOT NULL AUTO_INCREMENT,
  user_id varchar (100) NOT NULL,
  name varchar (80) NOT NULL,
  amount decimal (10, 2) NOT NULL,
  address varchar (50) NOT NULL,
  city varchar (25) NOT NULL,
  state varchar (5) NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  duration int (10) NOT NULL,
  contactEmail  varchar (40) NOT NULL,
  image varchar (200),
  PRIMARY KEY(ID),
  FOREIGN KEY(USER_ID) REFERENCES users(USER_ID)
);

INSERT INTO users (user_id, username, password, city, state, contactEmail) VALUES (123, 'bettysue', 'password123', 'Austin', 'TX', 'bettysue@what.com');
INSERT INTO users (user_id, username, password, city, state, contactEmail) VALUES (124, 'joebuddy', 'password123', 'Dallas', 'TX', 'joe@what.com');
INSERT INTO users (user_id, username, password, city, state, contactEmail) VALUES (125, 'kimmy', 'password123', 'Orlando', 'FL', 'kim@what.com');
INSERT INTO users (user_id, username, password, city, state, contactEmail) VALUES (126, 'chris', 'password123', 'Houston', 'TX', 'krispychris@what.com');

INSERT INTO events (user_id, name, amount, address, city, state, date, time, duration, contactEmail) VALUES (123, "Franklin's", 200, '900 E. 11th St.', 'Austin', 'TX', '2017-05-05', '11:30:00', 4, 'bettysue@what.com');
INSERT INTO events (user_id, name, amount, address, city, state, date, time, duration, contactEmail) VALUES (124, "Abby's", 40, '9900 E. 11th St.', 'Dallas', 'TX', '2017-05-05', '11:30:00', 4, 'joe@what.com');
INSERT INTO events (user_id, name, amount, address, city, state, date, time, duration, contactEmail) VALUES (124, "Fred's", 10, '800 E. 11th St.', 'Dallas', 'TX', '2017-05-05', '11:30:00', 4, 'joe@what.com');
INSERT INTO events (user_id, name, amount, address, city, state, date, time, duration, contactEmail) VALUES (125, "Tom's", 150, '4000 E. 11th St.', 'Orlando', 'FL', '2017-05-05', '11:30:00', 4, 'kim@what.com');
INSERT INTO events (user_id, name, amount, address, city, state, date, time, duration, contactEmail) VALUES (126, "Billy's", 270, '400 E. 11th St.', 'Houston', 'TX', '2017-05-05', '11:30:00', 4, 'peter@johnson.com');
INSERT INTO events (user_id, name, amount, address, city, state, date, time, duration, contactEmail) VALUES (125, "Kate's", 50, '30 E. 11th St.', 'Orlando', 'FL', '2017-05-05', '11:30:00', 4, 'kim@what.com');
INSERT INTO events (user_id, name, amount, address, city, state, date, time, duration, contactEmail) VALUES (123, "Sally's", 125, '100 E7. 11th St.', 'Austin', 'TX', '2017-05-05', '11:30:00', 4, 'bettysue@what.com');
