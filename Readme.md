# Steps to run a project : 

1. run command `npm install` to install all dependencies.
2. Create database locally on postgres by name - `yocket_task_db`
3. Then run command `npx knex migrate:latest`, To run migrations.
4. use command `npx knex seed:run`, To do seeding of users data in database as we did not implemented JWT Authentication here.
5. Then start the app using `npm start` command.
6. Do not forget to import postman collection to explore apis.
```
https://www.getpostman.com/collections/0ac3754ccd5cddcc06df
```
    