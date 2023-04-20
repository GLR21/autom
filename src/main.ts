import 'dotenv/config'
import express from 'express';
import Logging from './util/Logging';
import routes from './routes';
import cors from 'cors';

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use( express.json() );

const corsOptions = 
{
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200,
	credentials: true
}

app.use( cors( corsOptions ) );

app.listen( port, () => 
{	
	Logging.log( 'hello' );
	routes(app);
} );