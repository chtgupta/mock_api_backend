export class ApiResponse {
    success: boolean
    data: unknown
    message: string | null

    constructor(success: boolean, data: unknown, message: string | null) {
        this.success = success;
        this.data = data;
        this.message = message;
    }

    public static success(data: unknown, message: string | null = null): ApiResponse {
        return new ApiResponse(true, data, message);
    }

    public static error(error: string): ApiResponse {
        return new ApiResponse(false, null, error);
    }
}