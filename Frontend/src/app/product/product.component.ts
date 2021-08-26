import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product';
import { JsonService } from '../services/json.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
    @Input() product: Product;
    //Used to determine which item needs to be expanded
    @Output() eventEmitter: EventEmitter<number> = new EventEmitter();
    amount: number;

    arr = new Array(12);

    constructor(private jsonService: JsonService) {
        this.product = {
            id: 0,
            name: '',
            price: 0,
            url: '',
            description: '',
        };
		this.amount = 1;
    }

    ngOnInit(): void {}

    submitForm(): void {
        this.jsonService.addItem({
			product_id: this.product.id,
			amount: this.amount
		}).subscribe(data => {
			alert(data);
		});
        this.amount = 1;
    }

    showDetails(product: Product): void {
        this.eventEmitter.emit(product.id);
    }
}
