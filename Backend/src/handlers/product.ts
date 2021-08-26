import { ProductClass, Product } from '../models/product';
import express, { Request, Response } from 'express';

const product = new ProductClass();

const index = async (req: Request, res: Response) => {
    const products = await product.index();
    res.json(products);
};

const create = async (req: Request, res: Response) => {
	if (req.body.name === undefined || req.body.price === undefined || req.body.url === undefined || req.body.description === undefined) {
		res.json('Required field(s) empty');
		return;
	}
	const p: Product = {
		name: req.body.name as string,
		price: req.body.price as unknown as number,
		url: req.body.url as string,
		description: req.body.description as string
	};
	const products = await product.create(p);
	if (products.id === 0) {
		res.json('Error creating entry in database');
		return;
	}
	res.json(products);
};

const product_routes = (app: express.Application): void => {
    app.get('/product', index);
	app.post('/product', create);
};

export default product_routes;
