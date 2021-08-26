import Client from '../db';
import { Product } from '../models/product';

export class CartClass {
    async showCurrent(): Promise<
        {
            product: Product;
            amount: number;
        }[]
    > {
        try {
            const conn = await Client.connect();
            const sql =
                'SELECT id, name, price, url, description, amount FROM products INNER JOIN orders ON product_id = id';
            const result = await conn.query(sql);
			conn.release();
			let cart: {
				product: Product;
				amount: number;
			}[] = [];
			for(let i = 0; i < result.rows.length; i++) {
				cart.push({
					product: {
						id: result.rows[i].id,
						name: result.rows[i].name,
						price: result.rows[i].price,
						url: result.rows[i].url,
						description: result.rows[i].description
					}, amount: result.rows[i].amount
				});
			}
            return cart;
        } catch (err) {
            console.log(`Error retrieving: ${err}`);
            return [];
        }
    }
}
