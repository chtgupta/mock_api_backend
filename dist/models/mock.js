"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mock = void 0;
const mongoose_1 = require("mongoose");
const MockSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
});
exports.Mock = (0, mongoose_1.model)('Mock', MockSchema);
