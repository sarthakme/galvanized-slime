import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
    {
        path: '',
        component: ProductListComponent,
    },
    {
        path: 'cart',
        component: CartComponent,
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
