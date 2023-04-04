import 'dotenv/config'
import express from 'express';
import Logging from './util/Logging';
import routes from './routes';

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use( express.json() );

app.listen( port, () => 
{	
	Logging.log( 'hello' );
	routes(app);
} );