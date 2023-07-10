# Part 4 (Testing Express servers, user administration)
In this part, we will continue our work on the backend. Our first major theme will be writing unit and integration tests for the backend. After we have covered testing, we will take a look at implementing user authentication and authorization.

## Steps to run the app locally
Create the `.env` file using the `env.example` file as a reference

Create a collection in mongodb, it can be using https://cloud.mongodb.com/

Fill the env variables

```
cd blogs
npm install
npm run dev
```
Use this as a base URL in Postman (or similar apps) http://localhost:3001/api/

## Run the tests
```
npm run test
```
