import {MockFolderModel} from "../models/mock_folder.model";
import {MockModel} from "../models/mock.model";
import MockHelper from "./mock.helper";

export default class MockFolderHelper {

    static toJson(model: MockFolderModel, child: MockModel[] | null) {
        return {
            id: model._id,
            name: model.name,
            folders: child?.map((e) => MockHelper.toJson(e))
        }
    }

}