import { observable } from "mobx";

class UserInfoStore {
    @observable role = 1;
}

export default new UserInfoStore();