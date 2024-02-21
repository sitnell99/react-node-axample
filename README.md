1. ENV configuration

   1.1 Set port (example: 3005)

   1.2 Set mode (develop or production)

   1.3 Set GraphQL url for your react application

   1.4 Set mongo database uri

   1.5 Set secret key for json web token


2. Run yarn install


3. Develop mode

   3.1 Run backend in first console: yarn backend

   3.2 Run frontend in second console: yarn frontend


4. Production mode

   4.1 Create frontend build: yarn build

   4.2 Start application: npm start (If mode in env file is production server will automatically use static files)
