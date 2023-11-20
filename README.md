# Northcoders News API Set-up

To connect locally to the two databases please create two .env files (.env.test & .env.development) in the project root directory.
Both files will need to have the environment variable PGDATABASE=,
The database names are found at the following path: ./db/setup.sql

1) .env.test should contain: PGDATABASE=nc_news_test;
2) .env.development should contain: PGDATABASE=nc_news;