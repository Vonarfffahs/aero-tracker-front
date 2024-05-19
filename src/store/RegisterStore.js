import { makeAutoObservable } from 'mobx';

export default class RegisterStore {
    constructor() {
        this._registrations = [];
        makeAutoObservable(this);
    }

    setRegistrations(registrations) {
        this._registrations = registrations;
    }

    get registrations() {
        return this._registrations;
    }
}