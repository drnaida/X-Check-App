# X-Check-App

## Libraries, technologies, and frameworks we used:

* Redux. On our client-side, we used a bundle of React-Redux to control the state of the app. Redux is recommended for use in medium or big size apps when it becomes difficult to control app using the standard manager of states. For educational goals, we decided to use React in our app. The advantage of redux is that the state of the app is stored in one place and helps us to get rid of props drilling. Its disadvantage is that it's difficult to understand Redux architecture if you're a beginner. 

* Ant Desing. For styling, we used Ant Design. Its advantage is that it contains a lot of pre-styled components like tables, notifications, modal windows and etc. We haven't found any disadvantages of Ant Design when it comes to this project.

* Momentjs. It's a library for working with dates. Its advantage is that it provides a much easier and comprehensive interface for working with time than the native types of JavaScript it wraps. We haven't found any disadvantages of Momentjs when it comes to this project.

* MongoDB. Our app is developed on the MERN stack (MongoDB, Express, React, Node.js). Mongodb advantages are flexible JSON-format of documents and simple scalability. Disadvantages - there is no connection between collections and no ability to merge them.

* Express. Advantages of express.js are simplicity, flexibility, great scalability, and broad documentation. We haven't found any disadvantages of Express when it comes to this project.

* React. The main advantage of React for our team is that linking JavaScript and HTML using JSX makes components easier to understand and change. We haven't found any disadvantages of React when it comes to this project.

* Node.js. The server-side is made on Node.js together with Express, Mongoose, and MongoDB. Pros of Node.js – JavaScript, huge amount of external libraries and pre-made modules, lightness. Cons - because of the flexibility and fast evolution it's necessary to constantly keep up with updates. 

In addition, our team used bcrypt library for hashing passwords, Jwt for giving access to API only for authorized users, Winston for logging requests and errors.



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


## Additional functional

1. Users can log out.
2. If the login token expires, the app redirects the user to the login page. The app doesn't break.
3. In the header, a user can see his/her role and GitHub login.
4. If a user went to a page that doesn't exist, the system redirects him to the main page.
5. If a user isn't logged but goes to some page other than the login page, the system redirects him to log in page.
6. If a task is in the draft status its author can delete it. But if a task was published, its author is unable to do so. It protects cross-check / reviews system from being broken.
7. If the deadline for a task had passed, a user can't create a review request about it. It prevents users from cheating by submiting a task after the deadline.
8. If a review request is in the draft state it can be deleted or changed. But if it was published user is unable to do so. It prevents users from cheating by creating a review request before the deadline and adding a solution link after the deadline (if they hadn't done a task before the deadline).
9. One user can't publish multiple review requests about the same task. Otherwise, a user would be able to break the system of reviews by getting multiple scores.
10. Notifications appear when a user does something wrong (for instance, didn't fill the required inputs). In addition, notifications appear when a task or review request is published or saved.
11. Users can't see draft tasks or review requests of other users.
12. UX and UI.
