require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');
const keys = require('./config/keys');
const cors = require('cors');


const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = keys.mongoURI
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=>{
    console.log('Connected to mongo instance');
})

mongoose.connection.on('error', (err)=>{
    console.error('Error to mongo instance', err);
})

app.get('/', requireAuth, (req, res)=>{
    res.send(`Your email: ${req.user.email}`);
});

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})