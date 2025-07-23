const express = require('express')
const app = express();
import v1Route from "../routes/v1"
app.use(express.json())


app.use('/api/v1' ,v1Route)
app.listen(5500);

