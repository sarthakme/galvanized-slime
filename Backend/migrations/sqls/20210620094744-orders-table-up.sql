CREATE TABLE orders (
	product_id int REFERENCES products(id),
	amount int
);