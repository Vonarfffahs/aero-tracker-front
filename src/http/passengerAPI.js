import { $host } from './index';

export const createPassenger = async (passenger) => {
    const { data } = await $host.post('api/passenger/create', passenger);
    return data;
}

export const fetchPassengers = async () => {
    const { data } = await $host.get('api/passenger/all');
    return data;
}

export const fetchOnePassenger = async (id) => {
    const { data } = await $host.get('api/passenger/' + id);
    return data;
}

export const updatePassenger = async (id, updatedPassenger) => {
    const { data } = await $host.put(`api/passenger/${id}`, updatedPassenger);
    return data;
}

export const deletePassenger = async (id) => {
    const { data } = await $host.delete('api/passenger/' + id);
    return data;
}