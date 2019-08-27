# Spots

## Overview
Full stack MERN application that allows users to create collections of their favorite bars, restaurants and other businesses. Utilizes Yelp API and Google Maps API for searches, and JSON web tokens for authentication. Read reviews, get directions, and create custom lists to keep track of your favorite spots. 

<img src="client/public/images/Screen Shot 2019-08-22 at 5.07.12 AM.png">

--- 

## Technologies Used
* React 
* Bootstrap
* Node.js
* Express
* MongoDB
* Mongoose

---

## Installation
1. Make sure you have Node and MongoDB installed on your local machine
2. Clone this repository to your computer
3. In a terminal window, run 'mongod' to start the mongo daemon
4. In a seperate terminal window, cd into the project folder
5. Run 'npm install' to install dependencies
6. Create a .env file at the root level of the application and set JWT_SECRET to your own jwt secret and set YELP_KEY to your own Yelp api key
7. In client/public/index.html, replace the Google Maps API key in the script tag with your own key
8. run 'npm start' to start the development server

---

## Demo
See the app here: <a href="https://fierce-oasis-33706.herokuapp.com/">Spots</a>
