import { Component, OnInit, Input} from '@angular/core';
import { CartItem } from '../models/cartitem';
import { JsonService } from '../services/json.service';

@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
    @Input() cartItem: CartItem;

    constructor(private jsonService: JsonService) {
        this.cartItem = {
            product: {
                id: 0,
                name: '',
                price: 0,
                url: '',
                description: '',
            },
            amount: 0,
        };
    }

    ngOnInit(): void {}
}
