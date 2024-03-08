import {MockFolder, MockFolderModel} from "../models/mock_folder.model";
import {MockModel} from "../models/mock.model";
import MockHelper from "./mock.helper";

export default class MockFolderHelper {

    static toJson(model: MockFolderModel, folders: MockFolderModel[] | null = null, files: MockModel[] | null = null) : any {
        return {
            id: model._id,
            name: model.name,
            folders: folders?.map((e) => MockFolderHelper.toJson(e)),
            files: files?.map((e) => MockHelper.toJson(e))
        }
    }

}