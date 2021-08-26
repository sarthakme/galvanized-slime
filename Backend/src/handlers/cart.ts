import { CartClass } from '../services/cart';
import express, { Request, Response } from 'express';

const cart = new CartClass();

const showCurrent = async (req: Request, res: Response) => {
    const carts = await cart.showCurrent();
    res.json(carts);
};

const cart_routes = (app: express.Application): void => {
    app.get('/cart', showCurrent);
};

export default cart_routes;
