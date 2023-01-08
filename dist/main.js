"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const mock_1 = require("./models/mock");
const api_response_1 = require("./models/api_response");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect(process.env.DB_URL);
const db = mongoose_1.default.connection;
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.get('/', async (req, res) => {
    try {
        const mocks = await mock_1.Mock.find();
        const response = api_response_1.ApiResponse.success(mocks);
        res.status(200).json(response);
    }
    catch (error) {
        const response = api_response_1.ApiResponse.error(error.message);
        res.status(500).json(response);
    }
});
app.get('/:id', async (req, res) => {
    try {
        const mock = await mock_1.Mock.findById(req.params.id);
        if (mock != null) {
            const response = api_response_1.ApiResponse.success(mock);
            res.status(200).json(response);
        }
        else {
            const response = api_response_1.ApiResponse.error(`No document found with id ${req.params.id}`);
            res.status(404).json(response);
        }
    }
    catch (error) {
        const response = api_response_1.ApiResponse.error('An error occured');
        res.status(500).json(response);
    }
});
app.get('/mock/:id', async (req, res) => {
    try {
        const mock = await mock_1.Mock.findById(req.params.id);
        if (mock != null) {
            res.status(200).json(JSON.parse(mock.response));
        }
        else {
            const response = api_response_1.ApiResponse.error(`No document found with id ${req.params.id}`);
            res.status(404).json(response);
        }
    }
    catch (error) {
        const response = api_response_1.ApiResponse.error('An error occured');
        res.status(500).json(response);
    }
});
app.post('/', async (req, res) => {
    const data = new mock_1.Mock({
        name: req.body.name,
        response: req.body.response
    });
    try {
        const mock = await data.save();
        const response = api_response_1.ApiResponse.success(mock, 'Document created');
        res.status(201).json(response);
    }
    catch (error) {
        const response = api_response_1.ApiResponse.error(error.message);
        res.status(401).json(response);
    }
});
app.put('/:id', async (req, res) => {
    try {
        const newName = req.body.name;
        const newResponse = req.body.response;
        const query = { name: newName, response: newResponse };
        mock_1.Mock.findByIdAndUpdate(req.params.id, query, (updateError) => {
            if (updateError) {
                const response = api_response_1.ApiResponse.error(updateError.message);
                res.status(500).json(response);
            }
            else {
                const response = api_response_1.ApiResponse.success(null, 'Document updated successfully');
                res.status(200).json(response);
            }
        });
    }
    catch (error) {
        const response = api_response_1.ApiResponse.error(error.message);
        res.status(500).json(response);
    }
});
app.delete('/:id', async (req, res) => {
    try {
        mock_1.Mock.findByIdAndDelete(req.params.id, null, (deleteError) => {
            if (deleteError) {
                const response = api_response_1.ApiResponse.error(deleteError.message);
                res.status(500).json(response);
            }
            else {
                const response = api_response_1.ApiResponse.success(null, `Document with id ${req.params.id} removed`);
                res.status(200).json(response);
            }
        });
    }
    catch (error) {
        const response = api_response_1.ApiResponse.error(error.message);
        res.status(500).json(response);
    }
});
app.listen(process.env.PORT, () => {
    console.log('Server running..');
});
