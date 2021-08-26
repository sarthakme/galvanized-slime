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
exports.UserClass = void 0;
var db_1 = __importDefault(require("../db"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var pepper = process.env.BCRYPT_PASSWORD;
var saltRounds = process.env.SALT_ROUNDS;
var UserClass = /** @class */ (function () {
    function UserClass() {
    }
    UserClass.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT id, fname, lname FROM users';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        console.log("Error retrieving: " + err_1);
                        return [2 /*return*/, []];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserClass.prototype.show = function (n) {
        return __awaiter(this, void 0, void 0, function () {
            var u, conn, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        u = {
                            id: 0,
                            fname: '',
                            lname: '',
                            password: '',
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, db_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        sql = 'SELECT id, fname, lname FROM users WHERE id = ($1)';
                        return [4 /*yield*/, conn.query(sql, [n])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        if (result.rows.length === 0)
                            return [2 /*return*/, u];
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        err_2 = _a.sent();
                        console.log("Error retrieving: " + err_2);
                        return [2 /*return*/, u];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserClass.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var u, conn, sql, hash, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        u = {
                            id: 0,
                            fname: '',
                            lname: '',
                            password: '',
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, db_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        sql = 'INSERT INTO users (fname, lname, password) VALUES ($1, $2, $3)';
                        hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(saltRounds));
                        return [4 /*yield*/, conn.query(sql, [user.fname, user.lname, hash])];
                    case 3:
                        result = _a.sent();
                        sql = 'SELECT * FROM users WHERE id = (SELECT MAX(id) FROM users)';
                        return [4 /*yield*/, conn.query(sql)];
                    case 4:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 5:
                        err_3 = _a.sent();
                        console.log("Error inserting: " + err_3);
                        return [2 /*return*/, u];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserClass.prototype.validate = function (id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var u, conn, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        u = {
                            id: 0,
                            fname: '',
                            lname: '',
                            password: '',
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, db_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        sql = 'SELECT * FROM users WHERE id = ($1)';
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 3:
                        result = _a.sent();
                        conn.release();
                        if (result.rows.length === 0)
                            return [2 /*return*/, u];
                        if (bcrypt_1.default.compareSync(password + pepper, String(result.rows[0].password)))
                            return [2 /*return*/, result.rows[0]];
                        else
                            return [2 /*return*/, u];
                        return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        console.log("Error retrieving: " + err_4);
                        return [2 /*return*/, u];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return UserClass;
}());
exports.UserClass = UserClass;
