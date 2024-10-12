import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config'
import { authMiddleware } from './middlewares/authMiddlewares.js';
import routes from './routes.js';


const app = express();

//Setup db
const url = 'mongodb://localhost:27017'
mongoose.connect(url,{dbName: 'volcanoes'})
    .then(() => console.log("DB Connected!"))
    .catch((err) => console.log(`DB Failed ${err}`))



//setup view engine

app.engine('hbs' , handlebars.engine({
    extname: 'hbs',
}));

app.set('views', 'src/views');
app.set('view engine', 'hbs');


app.use('/static', express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware)
app.use(routes);



app.listen(3000, () => console.log('Server is running on http://localhost:3000/'))