import Client from '../db';

export interface Product {
    id?: number;
    name: string;
    price: number;
	url: string;
	description: string;
}

export class ProductClass {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            console.log(`Error retrieving: ${err}`);
            return [];
        }
    }
	
	async create(p: Product): Promise<Product> {
		const product: Product = {
			id: 0,
			name: '',
			price: 0,
			url: '',
			description: ''
		};
		try {
			const conn = await Client.connect();
			const insert = 'INSERT INTO products (name, price, url, description) VALUES ($1, $2, $3, $4)';
			await conn.query(insert, [p.name, p.price, p.url, p.description]);
			const select = 'SELECT * FROM products WHERE id = (SELECT max(id) FROM products)';
			const result = await conn.query(select);
			conn.release();
			return result.rows[0];
		} catch(err) {
			console.log(`Error retrieving: ${err}`);
			return product;
		}
	}
}
