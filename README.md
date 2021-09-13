# NicaSource Assessment - Back end

## Developed with Typescript

API used: [covid-193](https://rapidapi.com/api-sports/api/covid-193.) (only stats endpoint)
Deployed at: https://vast-basin-26481.herokuapp.com/
Connected to: https://ns-assessment-covid.vercel.app/ [(check out the repo)](https://github.com/maxfer03/ns-assessment-covid)

I decided to develop this API with TS and get some experience with it, because I only knew the basics. I believe I used it quite correctly, but any feedback is welcome.

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

- ~~/statistics (protected) GET~~ **DONE ✔**

- ~~/statistics/{country-id} (protected) GET, POST~~ **DONE ✔**

- ~~/sync (protected) GET~~ **DONE ✔**

- ~~/auth/login (public) POST~~ **DONE ✔**

- ~~\_/auth/signup (public) POST~~ **DONE ✔**

### Requirements:

- ~~Save RapidApi's data in personal mongoDB.~~ **DONE ✔**

- ~~Create DB Schemas.~~ **DONE ✔**

- ~~The solution should have CORS enabled.~~ **DONE ✔**

- ~~Implement JWT~~ **DONE ✔**

- ~~Hash passwords.~~ **DONE ✔**

- ~~Validate Pw before issuing a JWT.~~ **DONE ✔**

- ~~The source code must be a GitHub repository publicly available containing backend code only.~~ **DONE ✔**

- ~~The repository should include a README file with all documentation necessary to run the project locally.~~ **DONE ✔**

### Optional:

- Unit tests

- ~~Short-lived JWT tokens with a refresh token flow~~ **DONE ✔**

- ~~Deploy your backend service on any cloud provider.~~**DONE ✔**
