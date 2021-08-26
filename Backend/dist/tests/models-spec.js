"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlers_spec_1 = require("./handlers-spec");
var product_1 = require("../models/product");
var order_1 = require("../models/order");
var cart_1 = require("../services/cart");
var product = new product_1.ProductClass();
var p2 = {
    id: 2,
    name: 'Milk',
    price: 20,
    url: '',
    description: ''
};
describe('Product model', function () {
    it('create method', function () {
        product.create(p2).then(function (value) {
            expect(value).toEqual(p2);
        });
    });
    it('index method', function () {
        product.index().then(function (value) {
            expect(value).toEqual([handlers_spec_1.p, p2]);
        });
    });
});
var order = new order_1.OrderClass();
var o2 = {
    product_id: 2,
    amount: 2
};
describe('Order model', function () {
    it('create method', function () {
        order.create(o2).then(function (value) {
            expect(value).toBeTruthy();
        });
    });
});
var cart = new cart_1.CartClass();
describe('Cart service', function () {
    it('showCurrent method', function () {
        cart.showCurrent().then(function (value) {
            expect(value).toEqual([
                {
                    product: handlers_spec_1.p,
                    amount: handlers_spec_1.o.amount
                }, {
                    product: p2,
                    amount: o2.amount
                }
            ]);
        });
    });
});
