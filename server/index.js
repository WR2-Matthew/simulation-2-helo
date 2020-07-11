require('dotenv').config();
const massive = require('massive'),
  express = require('express'),
  app = express(),
  session = require('express-session'),
  authCtrl = require('./controllers/authController'),
  { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
}));

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then((db) => {
  app.set('db', db)
  console.log('DB had a successful connection, good work people!')
}).catch(err => console.log(err));

app.post('/auth/register', authCtrl.registerUser)
app.post('/auth/login', authCtrl.loginUser)

app.listen(SERVER_PORT, () => console.log(`We will move forward on to galaxy ${SERVER_PORT}`));