"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    success;
    data;
    message;
    constructor(success, data, message) {
        this.success = success;
        this.data = data;
        this.message = message;
    }
    static success(data, message = null) {
        return new ApiResponse(true, data, message);
    }
    static error(error) {
        return new ApiResponse(false, null, error);
    }
}
exports.ApiResponse = ApiResponse;
