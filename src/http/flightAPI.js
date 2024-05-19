import { $host } from './index';

export const createFlight = async (flight) => {
    const { data } = await $host.post('api/flight/create', flight);
    return data;
}

export const fetchFlights = async () => {
    const { data } = await $host.get('api/flight/all');
    return data;
}

export const fetchOneFlight = async (id) => {
    const { data } = await $host.get('api/flight/' + id);
    return data;
}

export const updateFlight = async (id, updatedFlight) => {
    const { data } = await $host.put(`api/flight/${id}`, updatedFlight);
    return data;
}

export const deleteFlight = async (id) => {
    const { data } = await $host.delete('api/flight/' + id);
    return data;
}