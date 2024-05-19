import { $host } from './index';

export const createRegistration = async (registration) => {
    const { data } = await $host.post('api/registration/create', registration);
    return data;
}

export const fetchRegistrations = async () => {
    const { data } = await $host.get('api/registration/all');
    return data;
}

export const fetchOneRegistration = async (id) => {
    const { data } = await $host.get('api/registration/' + id);
    return data;
}

export const updateRegistration = async (id, updatedRegistration) => {
    const { data } = await $host.put(`api/registration/${id}`, updatedRegistration);
    return data;
}

export const deleteRegistration = async (id) => {
    const { data } = await $host.delete('api/registration/' + id);
    return data;
}