import React, { useState, useContext, useEffect } from 'react';
import { Table, Button, Container, CardGroup } from 'react-bootstrap';
import FlightList from '../components/FlightList';
import CreateFlight from '../components/CreateFlight';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchFlights } from '../http/flightAPI';

const FlightListPage = observer(() => {
    const { flight } = useContext(Context);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchFlights().then(data => {
            data.map(item => {
                const serverDate = new Date(item.date);
                const serverDateTime = serverDate.getHours();
                serverDate.setHours(serverDateTime+3);
                const formattedDate = serverDate.toISOString().slice(0, 16);
                item.date = formattedDate;
            })
            flight.setFlights(data);
        })
    }, []);

    const onCloseModal = async () => {
        setShowModal(false);
        const data = await fetchFlights();
        data.map(item => {
            const serverDate = new Date(item.date);
            const serverDateTime = serverDate.getHours();
            serverDate.setHours(serverDateTime+3);
            const formattedDate = serverDate.toISOString().slice(0, 16);
            item.date = formattedDate;
        })
        flight.setFlights(data);
    }

    const onUpdateData = async () => {
        const data = await fetchFlights();
        data.map(item => {
            const serverDate = new Date(item.date);
            const serverDateTime = serverDate.getHours();
            serverDate.setHours(serverDateTime+3);
            const formattedDate = serverDate.toISOString().slice(0, 16);
            item.date = formattedDate;
        })
        flight.setFlights(data);
    }

    return (
        <Container 
            className='d-flex flex-column mt-3'
        >
            <CardGroup className='d-flex justify-content-between align-items-center'>
                <h1>Flight List</h1>
                <Button 
                    onClick={() => setShowModal(true)}
                    style={{width: 100, height: 40}}
                >
                    Add flight
                </Button>
            </CardGroup>
            <Table 
                className='mt-2' 
                striped 
                bordered
                hover
            >
                <thead>
                    <tr>
                        <th>Direction</th>
                        <th>Date</th>
                        <th>Terminal</th>
                        <th>Capacity</th>
                    </tr>
                </thead>
                <FlightList onRemove={onUpdateData} />
            </Table>
            <CreateFlight show={showModal} onHide={onCloseModal}/>
        </Container>
    );
});

export default FlightListPage;