import { OrderClass, Order } from '../models/order';
import express, { Request, Response } from 'express';

const order = new OrderClass();

const create = async (req: Request, res: Response) => {
    if (
        req.body.product_id === undefined ||
        req.body.amount === undefined
    ) {
        res.json('Required field(s) empty');
        return;
    }
    const o: Order = {
        product_id: req.body.product_id,
        amount: req.body.amount,
    };
    const result = await order.create(o);
    if (result) {
        res.json('Product added to cart');
        return;
    }
    res.json('Error inserting into database');
};

const clear = (req: Request, res: Response) => {
	order.clear();
	res.json('Cart cleared');
};

const ordersProduct_routes = (app: express.Application): void => {
    app.post('/order', create);
	app.delete('/order', clear);
};

export default ordersProduct_routes;
