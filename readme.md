# Backup and Restore
First we define our mongo instance like below. Notice that instead of mapping the data directory onto our filesystem we have a native volume.

## docker-compose.yml
```
services:
  database_service:
    image: mongo
    restart: always
    volumes:
      - ./dbdata:/data/db
    ports:
      - 27017:27017
```
Then start with 
```
docker-compose up -d.
```

### Backup
First we will do a backup of our running instance:
```
docker-compose exec -T database_service mongodump --archive --gzip --db db_name > dump.gz
```
The -T option is for enabling piping the output to our own machine. 
We also tell mongo to use the --gzip option to compress the file significantly.
Lastly we specify the --db <database> that we want to backup.

### Restore
Whenever we want to restore the database, or maybe seed it we can run the following:
```
docker-compose exec -T database_service mongorestore --archive --gzip < dump.gz
```
