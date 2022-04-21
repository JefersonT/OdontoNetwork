const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Iniciando o App
const app = express();
const routes = require('./routes');

// Para testar o projeto
//require('./app/controllers/ProjectController')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);
app.use(cors());
app.listen(3001);