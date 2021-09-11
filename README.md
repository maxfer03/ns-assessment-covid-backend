# NicaSource Assessment - Back end

## Developed with Typescript

API used: [covid-193](https://rapidapi.com/api-sports/api/covid-193.) (only stats endpoint)

To run:

```
$ npm install      -> to install dependencies
$ npm run ts-start -> to run it locally on port 3001 
```
Other npm commands:
```
build: compile TS code to js with es6 syntax
clear: delete build folder
dev: run it developer mode (with nodemon and other utilities)
start: run it with js
```

---
## TO DO =

### Required endpoints:

 * ~~/statistics (protected) GET~~ **DONE ✔**

 * ~~/statistics/{country-id}~~ (protected) GET, POST - **DONE ✔**

 * ~~/sync (protected) GET~~ **DONE ✔**

 * ~~/auth/login (public) POST~~ **DONE ✔**

 * ~~_/auth/signup (public) POST~~ **DONE ✔**

 

### Requirements:

 * _Use ES6 or Typescript syntax - **IN PROGRESS**_

 * ~~Save RapidApi's data in personal mongoDB.~~ **DONE ✔**

 * ~~Create DB Schemas.~~ **DONE ✔**

 * ~~The solution should have CORS enabled.~~ **DONE ✔**

 * ~~Implement JWT~~ **DONE ✔**

 * ~~Hash passwords.~~ **DONE ✔**
 
 * ~~Validate Pw before issuing a JWT.~~ **DONE ✔**

 * ~~The source code must be a GitHub repository publicly available containing backend code only.~~ **DONE ✔**

 * ~~The repository should include a README file with all documentation necessary to run the project locally.~~ **DONE ✔**

 

### Optional:

 * Unit tests

 * _Short-lived JWT tokens with a refresh token flow - **IN PROGRESS**_ (probably finished, need to test it more)

 * Deploy your backend service on any cloud provider.







