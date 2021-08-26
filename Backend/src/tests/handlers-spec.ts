import supertest from 'supertest';
import { app } from '../server';
import { Product } from '../models/product';
import { Order } from '../models/order';

const test = supertest(app);

export const p: Product = {
    id: 1,
    name: 'Book',
    price: 10,
	url: '',
	description: ''
};

describe('Testing product routes', () => {
    it('post /product', async () => {
        const res = await test
            .post('/product')
            .send(p);
        expect(JSON.parse(res.text)).toEqual(p);
    });

    it('get /product', async () => {
        const res = await test.get('/product');
        expect(JSON.parse(res.text)).toEqual([p]);
    });
});

export const o: Order = {
    product_id: 1,
    amount: 1
};

describe('Testing order route', () => {
    it('post /order', async () => {
        const res = await test
            .post('/order')
            .send(o);
        expect(JSON.parse(res.text)).toEqual(
            'Product added to cart'
        );
    });
});

describe('Testing cart route', () => {
    it('get /cart', async () => {
        const res = await test
            .get('/cart');
        expect(JSON.parse(res.text)).toEqual([
            {
                product: p,
                amount: o.amount,
            },
        ]);
    });
});
