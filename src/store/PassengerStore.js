import { makeAutoObservable } from 'mobx';

export default class PassengerStore {
    constructor() {
        this._passengers = [];
        makeAutoObservable(this);
    }

    setPassengers(passengers) {
        this._passengers = passengers;
    }

    get passengers() {
        return this._passengers;
    }
}