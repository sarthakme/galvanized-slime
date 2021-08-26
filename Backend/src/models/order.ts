import Client from '../db';

export interface Order {
    product_id: number;
    amount: number;
}

export class OrderClass {
    async create(order: Order): Promise<boolean> {
        try {
            const conn = await Client.connect();
            const select =
                'SELECT amount FROM orders WHERE product_id = ($1)';
            const existingValue = await conn.query(select, [order.product_id]);
            if (existingValue.rows.length) {
                const amount =
                    order.amount + existingValue.rows[0].amount;
                const update =
                    'UPDATE orders SET amount = ($1) WHERE product_id = ($2)';
                var result = await conn.query(update, [
                    amount,
                    order.product_id
                ]);
            } else {
                const insert =
                    'INSERT INTO orders VALUES ($1, $2)';
                var result = await conn.query(insert, [
                    order.product_id,
                    order.amount
                ]);
            }
            conn.release();
            return result.rowCount as unknown as boolean;
        } catch (err) {
            console.log(`Error inserting: ${err}`);
            return false;
        }
    }
	
	async clear() {
		let con: boolean = true;
		while(con) {
			try {
				const conn = await Client.connect();
				const del = 'DELETE FROM orders';
				await conn.query(del);
				con = false;
			} catch (err) {
				console.log(`Error deleting ${err}`);
				con = true;
			}
		}
	}
}
