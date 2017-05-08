# Q

> When lines get long, everyone wins...

## Table of Contents

1. [Team](#team)
2. [Usage](#usage)
3. [Requirements](#requirements)
4. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [How to start the app](#how-to-start-the-app)
5. [Contributing](#contributing)


## Team

  - __Product Owner__: Doris Chiu
  - __Scrum Master__: Rodolfo Rodriguez
  - __Development Team Members__: Adam Alcott

## Usage

To start using Q, simply go to the site and create an account with our app or login through Google. You will be redirected to the home page, where you can see all available Qs. You can sort them by amount, date, or filter by location. To create your own Q event, simply click the "+" button at top right of the page, fill out the form accordingly, and submit. On the homepage, there's also a button to view Qs you have created.


## Requirements

- [Node JS](http://nodejs.org)  
- [NPM](http://npmjs.com) 
- [MySql](https://dev.mysql.com/downloads/installer/)

## Development

### Installing dependencies
1.  Install app dependencies  
`$ npm install`
2.  Install client dependencies  
`$ cd client && npm install`

### How to Start the App
1. Setup the mysql server:  
    `$ mysql -u root < schema.sql`
2. Start the front end, and backend servers:  
    `npm run all`
#### Or: 
1. Setup the mysql server:  
  `$ mysql -u root < schema.sql`  
  `$ mysql`  
  `mysql> use q;`  
2. Start the backend server  
   `$ npm start`  
3. Start the front end server  
   `$ cd client && npm start`  

### Developing on Q
At this point, you should be able to access the application at `localhost:3000` and requests to the server should be sent to `localhost:8080`.
To access the __React Developer Tools__, download the [__Chrome Extension__](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) or the [__Firefox Add Ons__](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/). Open the Developer Tools on page on the browser and click on `React` to access the React Dev Tools.


### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

### Styling

See [_STYLE-GUIDE.md](_STYLE-GUIDE.md) for styling guidelines. This project uses [Airbnb's javascript guideline](https://github.com/airbnb/javascript) with [eslint](http://eslint.org/) as the linter. 

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.

