![Trackout Logo](https://i.imgur.com/PT3WqLP.png)
# TRACKOUT
Trackout is a workout tracking app designed to be lightweight but functional. It allows to quickly and effectively create, track, and review workouts and training of all different types. It was designed to be as unrestrictive as possible, and doesn't enforce restrictions on how you structure your workouts and what you put in them.
Currently, Trackout is only a prototype and will continue to be updated and revised as much as possible. In this initial prototype, it has everything I (and presumably others) need for it to be a fully functional workout tracking app.
## Motivation
Trackout was built out of a desire to combine two passions: programming and fitness. On starting this project, I knew I wanted to create something that I would personally use. In this way, I was motivated by the desire to "scratch my own itch" so to speak, by creating a workout tracking solution that suits my (and presumably others) needs. 
In addition, I wanted to gain more experience with programming (which has become a passion of mine) while creating something that would demonstrate my current skill-level as a developer. 
## Technologies Used
#### Client / Front-End
- React
	- React Hooks
	- React Router
	- Context API
- Axios
- Chart.js
- CSS Flexbox and Grid
- Adobe Illustrator (logo and graphics)
#### API / Back-End
- Express.js
	- Passport Authentication
	- Bcrypt
- Mongo DB
	- Mongoose

Trackout was built completely from scratch using the MERN Stack. Other than the frameworks and libraries in this stack, no other frameworks were used. No CSS or HTML (Converted to JSX in React) frameworks such as Bootstrap were used. 

## Running a Copy of Trackout on Your Own Machine  
If you're just interested in in seeing what Trackout can do, the easiest way to access the app is to go to trackoutapp.com. 
But, iff you'd prefer to simply run a copy of it on your own machine, downloading and setting up Trackout is a straightforward process. You will need node.js installed on your system. Simply download the repo, and run `npm i` in both the API and client directories. Then, create a .env file in the API directory with the variable `SESSION_SECRET`, and set it to whatever string of characters you like. 
You will also need to set up a database with MongoDB Atlas. Then create a new variable in the API directory's .env folder called `DB_CONNECTION` and set it equal to the connection string of your cluster.
After that, run `npm start` in both the client and API directories, and launch go to localhost:3000 in your browser to access the app.
## Features
Once you've created an account and logged in, Trackout has three main pages: Track, Logs, and Templates.
On the Track page, you can create workouts consisting of one Warmup, Cooldown, and Mobility sections, along with as many Strength and Cardio sections as you'd like.  You can choose to include all of these sections, or none of them. In fact, the only required piece of data to save a workout is a date. In this way, the app is completely unrestrictive in how you track your training sessions. 
In the Logs section, you can see all of your past workouts and filter them by a date-range. By clicking on a log, you open a window that displays that workout's data along with a deletion option for that log. 
Templates (Which are essentially pre-made workout sections) are created and viewed on the Templates page. On this page, you can see all of your created templates in a similar fashion to how logs are viewed. Templates can be filtered by type (Warmup/Cooldown, Strength, Cardio, Mobility), and clicking on a template pulls up its data. Templates can be created by clicking on the New Template button, which pulls up a window where a template can be created in a similar fashion to how workouts are tracked.
## Deployment
Trackout was deployed under the domain trackoutapp.com. The Express server running the API was slightly configured to serve the React app build from the trackoutapp.com/, while the API was modified to be served from trackoutapp.com/api/.  NginX's reverse proxy was used to secure all connections to this Express server. 
## Security
All user passwords stored in the database are hashed by Bcrypt. Authentication is handled by Passport.js and Express session, using cookies to establish a session with the server upon each login. A user's data can only be modified by that user when logged in. SSL certificates are active on trackoutapp.com and www.trackoutapp.com. Despite these security measures, it is still prominently recommended on the login and signup pages that users use a unique password for Trackout that is unused anywhere else.
