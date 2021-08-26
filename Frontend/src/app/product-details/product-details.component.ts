import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JsonService } from '../services/json.service';
import { CartItem } from 'src/models/cartitem';
import { Product } from 'src/models/product';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
    @Input() id: number = 0;
    @Output() eventEmitter: EventEmitter<null> = new EventEmitter();
    cartItem: CartItem;
    arr = new Array(12);

    constructor(
        private jsonService: JsonService
    ) {
        this.cartItem = {
            product: {
                id: 0,
                name: '',
                price: 0,
                url: '',
                description: '',
            },
            amount: 1,
        };
    }

    ngOnInit(): void {
        this.jsonService.getItems().subscribe((data: Product[]) => {
            for (let i of data) {
                if (this.id === i.id) {
                    this.cartItem.product = i;
                }
            }
        });
    }

    submitForm(): void {
        this.jsonService.addItem({
			product_id: this.cartItem.product.id,
			amount: this.cartItem.amount
		}).subscribe(data => {
			console.log(data);
			alert(data);
		});
        this.cartItem.amount = 1;
        this.eventEmitter.emit(null);
    }

    invert(): void {
        this.eventEmitter.emit(null);
    }
}
