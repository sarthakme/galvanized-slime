"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersProductClass = void 0;
var db_1 = __importDefault(require("../db"));
var OrdersProductClass = /** @class */ (function () {
    function OrdersProductClass() {
    }
    OrdersProductClass.prototype.create = function (ordersProduct, id) {
        return __awaiter(this, void 0, void 0, function () {
            var conn, select1, result, select2, existingValue, quantity, update, insert, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        return [4 /*yield*/, db_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        select1 = 'SELECT id FROM orders WHERE user_id = ($1) AND status = TRUE';
                        return [4 /*yield*/, conn.query(select1, [id])];
                    case 2:
                        result = _a.sent();
                        select2 = 'SELECT quantity FROM orders_products WHERE order_id = ($1) AND product_id = ($2)';
                        return [4 /*yield*/, conn.query(select2, [
                                result.rows[0].id,
                                ordersProduct.product_id,
                            ])];
                    case 3:
                        existingValue = _a.sent();
                        if (!existingValue.rows.length) return [3 /*break*/, 5];
                        quantity = ordersProduct.quantity + existingValue.rows[0].quantity;
                        update = 'UPDATE orders_products SET quantity = ($1) WHERE order_id = ($2) AND product_id = ($3)';
                        return [4 /*yield*/, conn.query(update, [
                                quantity,
                                result.rows[0].id,
                                ordersProduct.product_id,
                            ])];
                    case 4:
                        result = _a.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        insert = 'INSERT INTO orders_products VALUES ($1, $2, $3)';
                        return [4 /*yield*/, conn.query(insert, [
                                result.rows[0].id,
                                ordersProduct.product_id,
                                ordersProduct.quantity,
                            ])];
                    case 6:
                        result = _a.sent();
                        _a.label = 7;
                    case 7:
                        conn.release();
                        return [2 /*return*/, result.rowCount];
                    case 8:
                        err_1 = _a.sent();
                        console.log("Error inserting: " + err_1);
                        return [2 /*return*/, false];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return OrdersProductClass;
}());
exports.OrdersProductClass = OrdersProductClass;
