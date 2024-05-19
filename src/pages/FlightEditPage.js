import React, { useEffect, useState } from 'react';
import { Container, Card, Form, FloatingLabel, Button, CloseButton } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOneFlight, updateFlight, deleteFlight } from '../http/flightAPI';
import { FLIGHT_LIST_ROUTE, FLIGHT_ROUTE } from '../utils/consts';

const FlightEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [direction, setDirection] = useState('');
    const [date, setDate] = useState('');
    const [terminal, setTerminal] = useState('A');
    const [capacity, setCapacity] = useState(0);

    useEffect(() => {
        fetchOneFlight(id)
            .then(data => {
                const serverDate = new Date(data.date);
                const serverDateTime = serverDate.getHours();
                serverDate.setHours(serverDateTime+3);
                const formattedDate = serverDate.toISOString().slice(0, 16);
                setDirection(data.direction);
                setDate(formattedDate);
                setTerminal(data.terminal);
                setCapacity(data.capacity);
            })
    }, [])

    const saveFlight = async () => {
        const flight = { id, terminal, direction, capacity, date }
        await updateFlight(id, flight);
        navigate(FLIGHT_ROUTE + '/' + id);
    }

    const removeFlight = async () => {
        await deleteFlight(id);
        navigate(FLIGHT_LIST_ROUTE);
    }
        

    return (
        <Container 
            className='d-flex justify-content-center  mt-4'
        >
            <Card style={{width: 600}} className='p-3'>
                <h2 className='m-auto'>Flight №{id}</h2>
                <CloseButton 
                    style={{"position": 'absolute', 'right': '15px'}}
                    onClick={() => navigate(FLIGHT_LIST_ROUTE)}
                />
                <Form>
                    <FloatingLabel 
                        className='mt-2'
                        controlId="direction"
                        label="Direction"
                    >
                        <Form.Control 
                            value={direction}
                            type="text"
                            onChange={(e) => setDirection(e.target.value)} 
                        />
                    </FloatingLabel>
                    <FloatingLabel 
                        className='mt-2'
                        controlId="date"
                        label="Date"
                    >
                        <Form.Control 
                            value={date}
                            type="datetime-local"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        className='mt-2' 
                        controlId="terminal"
                        label="Terminal"
                    >
                        <Form.Select 
                            aria-label="Choose Terminal"
                            value={terminal}
                            onChange={(e) => setTerminal(e.target.value)}
                        >
                            <option value="A">A</option>
                            <option value="B">B</option>
                        </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                        className='mt-2' 
                        controlId="capacity"
                        label='Capacity'
                    >
                        <Form.Control 
                            value={capacity}
                            type="number" 
                            onChange={(e) => setCapacity(Number(e.target.value))}
                        />
                    </FloatingLabel>
                    <hr/>
                    <Form.Group className='d-flex justify-content-center align-items-center'>
                        <Button 
                            style={{'marginRight': '1rem'}}
                            variant={"success"}
                            onClick={saveFlight}
                        >
                            Save
                        </Button>
                        <Button 
                            variant={'danger'}
                            onClick={removeFlight}
                        >
                            Delete
                        </Button>
                        <Button 
                            style={{'marginLeft': '1rem'}}
                            variant={"secondary"}
                            onClick={() => navigate(FLIGHT_ROUTE + '/' + id)}
                        >
                            Cancel
                        </Button>
                    </Form.Group>
                </Form>
            </Card>
        </Container>
    );
};

export default FlightEditPage;