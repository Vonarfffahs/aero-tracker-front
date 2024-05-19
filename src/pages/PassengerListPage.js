import React, { useContext, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import PassengerList from '../components/PassengerList';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchPassengers } from '../http/passengerAPI';

const PassengerListPage = observer(() => {
    const { passenger } = useContext(Context);

    useEffect(() => {
        fetchPassengers().then(data => passenger.setPassengers(data))
    }, []);

    const onUpdateData = async () => {
        const data = await fetchPassengers();
        passenger.setPassengers(data);
    }

    return (
        <Container className='d-flex flex-column align-items-center mt-3'>
            <h1>Passenger List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Patronimic name</th>
                        <th>Last name</th>
                        <th>Passport number</th>
                        <th>Wanted</th>
                    </tr>
                </thead>
                <PassengerList onRemove={onUpdateData}/>
            </Table>
        </Container>
    );
});

export default PassengerListPage;