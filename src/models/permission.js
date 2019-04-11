import { observable } from 'mobx';

class PermissionStore {
    @observable permissionPageList = ['/project', '/403', '/404', '/login'];
    @observable permissionButtonList = [];
}

export default new PermissionStore();