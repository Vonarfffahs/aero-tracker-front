import { makeAutoObservable } from 'mobx';

export default class FlightStore {
    constructor() {
        this._flights = [];
        makeAutoObservable(this);
    }

    setFlights(flights) {
        this._flights = flights;
    }

    get flights() {
        return this._flights;
    }
}