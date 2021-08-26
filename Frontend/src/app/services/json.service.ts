import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cartitem';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class JsonService {
	endpoint: string;

    constructor(private http: HttpClient) {
		this.endpoint = 'Backend-dev22.us-east-1.elasticbeanstalk.com';
	}

    getItems(): Observable<Product[]> {
        return this.http.get<Product[]>(`http://${this.endpoint}/product`);
    }
	
	addItem(data: {
		product_id: number;
		amount: number;
	}): Observable<ArrayBuffer> {
		return this.http.post<ArrayBuffer>(`http://${this.endpoint}/order`, data);
	}
	
	getCart(): Observable<CartItem[]> {
		return this.http.get<CartItem[]>(`http://${this.endpoint}/cart`);
	}
	
	clearCart() {
		return this.http.delete<ArrayBuffer>(`http://${this.endpoint}/order`);
	}
}
