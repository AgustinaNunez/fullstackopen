# Part 3 (Programming a server with NodeJS and Express)
In this part our focus shifts towards the backend, that is, towards implementing functionality on the server side of the stack. We will implement a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. At the end of this part, we will deploy our application to the internet.

## Steps to run the app locally
Create the `.env` file using the `env.example` file as a reference

Create a collection in mongodb, it can be using https://cloud.mongodb.com/

Fill the env variables

```
cd phonebook/backend
npm install
npm run build:ui
npm start
```
Go to http://localhost:3000/

## Deploy your app remotely
Review the `render.yaml` file

Config and deploy your app in https://dashboard.render.com/

## Access to the currently app deployed on render
Go to https://phonebook-b1ik.onrender.com
