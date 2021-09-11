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

 * _/statistics (protected) GET - **IN PROGRESS**_

 * _/statistics/{country-id} (protected) GET, POST - **IN PROGRESS**_

 * _/sync (protected) GET - **IN PROGRESS**_

 * _/auth/login (public) POST - **IN PROGRESS**_

 * _/auth/signup (public) POST - **IN PROGRESS**_

 

### Requirements:

 * _Use ES6 or Typescript syntax - **IN PROGRESS**_

 * The solution should have CORS enabled.

 * Implement JWT

 * Hash passwords and validate it before issuing a JWT.

 * ~~The source code must be a GitHub repository publicly available containing backend code only.~~ **DONE ✔**

 * ~~The repository should include a README file with all documentation necessary to run the project locally.~~ **DONE ✔**

 

### Optional:

 * Unit tests

 * Short-lived JWT tokens with a refresh token flow. 

 * Deploy your backend service on any cloud provider.







