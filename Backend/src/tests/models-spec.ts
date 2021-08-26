import { p, o } from './handlers-spec';
import { ProductClass, Product } from '../models/product';
import { OrderClass, Order } from '../models/order';
import { CartClass } from '../services/cart';

const product = new ProductClass();

const p2: Product = {
    id: 2,
    name: 'Milk',
    price: 20,
	url: '',
	description: ''
};

describe('Product model', () => {
    it('create method', () => {
        product.create(p2).then((value) => {
            expect(value).toEqual(p2);
        });
    });

    it('index method', () => {
        product.index().then((value) => {
            expect(value).toEqual([p, p2]);
        });
    });
});

const order = new OrderClass();

const o2: Order = {
    product_id: 2,
    amount: 2
};

describe('Order model', () => {
    it('create method', () => {
        order.create(o2).then((value) => {
            expect(value).toBeTruthy();
        });
    });
});

const cart = new CartClass();

describe('Cart service', () => {
	it('showCurrent method', () => {
		cart.showCurrent().then((value) => {
			expect(value).toEqual([
			{
				product: p,
				amount: o.amount
			}, {
				product: p2,
				amount: o2.amount
			}
			]);
		});
	});
});