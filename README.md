# Pandemic Simulation

## What's this?

## Technologies used
1. Java 11
2. Spring Boot and listed Spring modules 
    - Spring Data Jdbc
3. Lombok
4. Mapstruct
5. H2O database

## Some information about it


## How to Run?
### Run using docker(preferred) by docker-compose
Make sure docker is up and running on your local machine, and ports 8080, 8081, 8082, 8090, 3306  are free

1. Download the repo and execute the following commands in the same order
2. Build the project
    ```shell script
    mvn clean package -DskipTests
      ```
3. Build credit dockers images
    ```shell script
    docker-compose up --force-recreate
      ```   

## Documentation

backend api:
https://www.postman.com/collections/f2226638d19c1478728a

## Sample use
