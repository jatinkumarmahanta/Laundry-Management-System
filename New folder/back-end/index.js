const express = require('express');
const bodyParser = require('body-parser');
require("./db/db")

const app = express();

const cors = require('cors');


// enable all CORS requests
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayPrice"))
app.use('/api', require("./Routes/RequestData"))
app.listen(5000, () => {
  console.log('Server listening on port 5000...');
});
