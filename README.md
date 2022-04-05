# NCNEWS-BACKEND

This is a news application inspired by reddit and created with Node.js, Express, and PostgreSQL. Testing is done with Jest and Supertest, and hosted on Heroku.

# Table of contents
- [General-Information <a name="general-information"></a>](#general-information-)
- [Technologies <a name="technologies"></a>](#technologies-)
- [Setup <a name="setup"></a>](#setup-)
  - [Cloning & Dependencies <a name="cloning-dependencies"></a>](#cloning--dependencies-)
  - [Create dotenv files <a name="create-dotenv-files"></a>](#create-dotenv-files-)
  - [Seeding & Testing <a name="seeding-testing"></a>](#seeding--testing-)
- [Link To Hosted Application on Heroku <a name="link-to-api"></a>](#link-to-api-)

# General-Information <a name="general-information"></a>

The NCDC-Backend news API leverages an Express server with RESTful API endpoints that retrieve article, comment and user data from a PSQL database. It uses Node.js and particularly node-postgres in order to GET, POST, PATCH and DELETE data from the database. The project follows the model/controller architecture, where the models are responsible for the queries to the database and the controllers handle routing and error-handling. The NCDC-Backend was the first individual project undertaken as part of the Northcoders Bootcamp and is coupled with a React-based Frontend user interface. This application was developed using a test-driven development (TDD) paradigm using Jest and Supertest.

# Technologies <a name="technologies"></a>

```
- Node.js: 16.13.0
- npm: 8.3.0
- express: 4.17.2
- PostgreSQL: 11.7
- jest: 27.5.1
- supertest: 6.2.2
```

# Setup <a name="setup"></a>

## Cloning & Dependencies <a name="cloning-dependencies"></a>

Clone this repository and install dependencies:

```npm install```

<br>

Dependencies required to develop this app:

```
- husky: 7.0.4
- jest: 27.5.1
- jest-extended: 2.0.0
- jest-sorted: 1.0.14
- pg-format: 1.0.4
- supertest: 6.2.2
```

<br>

Dependencies required to run this app:

```
- cors: 2.8.5
- dotenv: 16.0.0
- express: 4.17.3
- pg: 8.7.3
```

## Create dotenv files <a name="create-dotenv-files"></a>

This project requires both test and development databases and environments. Two <strong>dotenv files</strong> are therefore required that contain the correct database names for each environment. In the root directory of this app create <strong>.env.test</strong> and <strong>.env.development</strong> files, and add to each the following line:

```PGDATABASE=<database_name_here>``` 

The relationship between these two files and the databases is contained in <strong>./db/connection.js</strong>

## Seeding & Testing <a name="seeding-testing"></a>

Before running the test or delveloper environments, the databases require initiating (setup-dbs drops - deletes - and creates the database) seeding with data. To do this, run the scripts below from the command line (see package.json for more information about these scripts):

```
- npm setup-dbs
- npm seed
```

To run the tests:

```
- npm test
```

# Link to API <a name="link-to-api"></a>

<a href="http://ncdc-backend.herokuapp.com/api">Hosted NCDC news API</a>
