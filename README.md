# X-Check-App

## Technologies used:

* React
* Redux
* Ant Desing
* Momentjs
* Node.js
* Express
* MongoDB

## User roles:

* student: 
  - can look through the tasks
  - create, edit and delete review requests
  - check review request of other users
  - look through the review result and dispute it
* author, superviser, course manager:
  - have all privileges like a student
  - plus can create, edit and delete new tasks
  - create cross-check sessions

User role can be selected during the registration
You can select several roles at once

## Instructions for beginning of development

1. Fork the repository 
2. Go to \x-check-app\ folder in the command line
3. Do command **npm install** to download packages for server side
4. Go to \x-check-app\client folder in the command line
5. Do command **npm install** to download packages for client side
6. Return back to \x-check-app\ folder in the command line
7. Run command **npm run dev** to start webserver
Now you can start development. 


## Instructions for production deploy

There is no specific instructions for production deploy.
For local deploy use **npm run dev** in \x-check-app\ folder
