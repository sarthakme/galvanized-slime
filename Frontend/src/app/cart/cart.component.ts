import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/models/cartitem';
import { JsonService } from '../services/json.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
    cart: CartItem[] = [];
    notEmpty: boolean = true;
    total: number = 0;

    constructor(private jsonService: JsonService) {}

    async ngOnInit() {
        this.jsonService.getCart().subscribe((data: CartItem[]) => {
			this.cart = data;
			if (this.cart.length === 0) this.notEmpty = false;
			else this.notEmpty = true;
			for (let cartItem of this.cart)
				this.total += cartItem.product.price * cartItem.amount;
		});
    }
}
