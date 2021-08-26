import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import order_routes from './handlers/order';
import product_routes from './handlers/product';
import cart_routes from './handlers/cart';
import Client from './db';

export const app: express.Application = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/', async (req: Request, res: Response) => {
	try {
		const conn = await Client.connect();
		conn.release();
		res.json('Successfully connected');
	} catch(err) {
		console.log(err);
		res.json('Not connected');
	}
});

order_routes(app);
product_routes(app);
cart_routes(app);

app.listen(port, () => {
    console.log(`Started server on 127.0.0.1:${port}`);
});
