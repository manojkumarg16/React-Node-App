# React-Node App

# PreRequisites
node : > 10
postgress

# Description
Simple React Node app with express framerwork to perform create,update and list Cars operations.

# Client

1. `/` - Retreives all the cars from the server and displays 
2. `/add` - Used to add car into the database
3. `/cars/:id` - Update the car by id into the database

# To setup in local

1. yarn build
2. yarn start

Runs in `http://localhost:3000`

# Server

1. GET - `/api/cars` - Retrieves all the values from the postgress db
2. POST - `/api/cars` - Adds the single car into the database
3. PUT - `/api/cars/:id` - Updates the existing car present in the database

# To setup in local

1. npm start

Runs in `http://localhost:8080`

# Config the postgress db using 
    `HOST: "localhost",
    USER: "postgres",
    PASSWORD: "123",
    DB: "cars",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }`

# Configure the models 
`    const Cars = sequelize.define("cars", {
        company: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        }
    });
    return Cars;
`
Receives company and model as the paramters and declare the type neesd to be used

# Configure the routes for api calls

`router.get('/api/cars', controller.findAll);

router.post('/api/cars', controller.create);

router.put('/api/cars/:id', controller.update);`

# Configure server

`const cors = require("cors");
const db = require("./models");
const routes = require('./routes');
const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

app.use('/', routes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});`

# Cors 
set cors pointing to `http://localhost:3000` local frontend app
`const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true
};`

# Test cases

Using chai and mocha for api test cases-

# To run locally

npm run test

# Sample request

1. Get - `http://localhost:8080/api/cars`
2. Post - `http://localhost:8080/api/cars`
        - payload
            - `{"model": "i10","company": "Hyundai"}`
3. Put - `http://localhost:8080/api/cars`
        - Payload
            - `{"model": "i20","company": "Hyundai"}`


# Sample response

1. Get - `{
        "id": 4,
        "company": "Hyundai",
        "model": "i10",
        "updatedAt": "2021-08-15T15:54:46.930Z",
        "createdAt": "2021-08-15T15:54:46.930Z"
    }`
2. Post - `{
    "id": 20,
    "model": "i10",
    "company": "Hyundai",
    "updatedAt": "2021-08-15T15:54:46.930Z",
    "createdAt": "2021-08-15T15:54:46.930Z"
}`
3. Put - `{
    "data": 1,
    "message": "Updated Cars Successfully"
}`