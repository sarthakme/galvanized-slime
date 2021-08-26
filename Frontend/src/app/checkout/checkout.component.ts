import { Component, OnInit } from '@angular/core';
import { JsonService } from '../services/json.service';
import { CartItem } from '../models/CartItem';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
    fname: string = '';
    add: string = '';
    card: number | null = null;
    empty: boolean = true;
    done: boolean = false;

    constructor(private jsonService: JsonService) {}

    ngOnInit(): void {
		this.jsonService.getCart().subscribe((data: CartItem[]) => {
			if(data.length != 0) this.empty = false;
		});
    }

    submitForm(): void {
		this.jsonService.clearCart().subscribe();
        this.fname = '';
        this.add = '';
        this.card = null;
        this.done = true;
    }
}
