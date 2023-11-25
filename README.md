 <a name="readme-start"></a>
 <h3 align="center"> Northcoders News API</h3>


<p align="center">
<a href="https://nc-news-js3f.onrender.com/api">View Demo</a>
</p>

## About the Project

This is an API built to access application data. The idea is to build something similar to the backend service of Reddit, and provide information to the front end once that has been created.

The database is PSQL and interacted with using node-postgres.

Project created using TDD.

## Getting Started
Follow these instructions to get a local copy up-and-running.

## Installation

1) Clone this repo: 
    > https://github.com/crossmatthew/nc-news.git

2) Install dependencies:
    > npm install
    <details>
    <summary>List of Dependencies</summary>

    dependencies:

            pg-format 1.0.4
            dotenv: 16.0.0
            express: 4.18.2
            pg: 8.7.3

    devDependencies:
        
            husky: 8.0.2
            jest: 27.5.1
            jest-extended: 2.0.0
            jest-sorted: 1.0.14
            supertest: 6.3.3
    </details>

    _npm version 9.7.2 and node v20.4.0 were used on this project._

3) Create .env Files

    To connect locally to the two databases create two .env files in the project root directory:
    > .env.test
    >
    >.env.development
    
    Both files will need to have the environment variable PGDATABASE=,

    _The database names are found at the following path: ./db/setup.sql_

    1) .env.test should contain:
        
        > PGDATABASE=nc_news_test;
    2) .env.development should contain:
    
        > PGDATABASE=nc_news;

## Set-up databases and localhost server

Run the following scripts:

     npm run setup-dbs  
     npm run seed
     npm run start


The API can now be interacted with on port 9090 using a client. 

A list of all endpoints are available on http://localhost:9090/api or in the endpoints.json file.

## Acknowledgements

[Northcoders](https://northcoders.com)

Thank you to Ali, Hev, Michael, MKD and Saima for providing feedback and managing pull requests.

<p align="right"><a href="readme-start">Back to top</a></p>