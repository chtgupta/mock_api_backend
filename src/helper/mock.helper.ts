import {MockModel} from "../models/mock.model";

export default class MockHelper {

    static toJson(model: MockModel) {
        return {
            id: model._id,
            parentId: model.parentId,
            name: model.name,
            response: model.response
        }
    }

}