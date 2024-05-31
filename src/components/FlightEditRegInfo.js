import React, { useEffect, useState } from 'react'
import { ListGroup, FloatingLabel, Form, InputGroup } from 'react-bootstrap'

const FlightEditRegInfo = ({ flightInfo, registrationInfo }) => {
    const [tiket, setTiket] = useState('');
    const [visa, setVisa] = useState('');
    const [baggage, setBaggage] = useState('');
    const [flightPermission, setFlightPermission] = useState('');

    useEffect(() => {
        setTiket(registrationInfo.tiket);
        setVisa(registrationInfo.visa);
        setBaggage(registrationInfo.baggage);
        setFlightPermission(registrationInfo.flight_permission);
    }, [registrationInfo]);

  return (
    <ListGroup.Item key={flightInfo.id} className='mb-1' variant="primary">
        <h5>Flight №{flightInfo.id}</h5>
        <InputGroup>
            <FloatingLabel 
                controlId="direction"
                label="Direction"
            >
                <Form.Control 
                    type="text" 
                    value={flightInfo.direction}
                    readOnly
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="terminal"
                label="Terminal"
            >
                <Form.Control 
                    type="text" 
                    value={flightInfo.terminal}
                    readOnly
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="date"
                label="Date"
            >
                <Form.Control 
                    value={flightInfo.date}
                    type="datetime-local"
                    readOnly
                />
            </FloatingLabel>
        </InputGroup>
        <InputGroup className='mt-1'>
            <FloatingLabel 
                controlId="visa"
                label="Visa"
            >
                <Form.Select
                    value={visa}
                    onChange={(e) => setVisa(e.target.value)}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </Form.Select>
            </FloatingLabel>
            <FloatingLabel
                controlId="baggage"
                label="Baggage, kg"
            >
                <Form.Control 
                    type='text'
                    maxLength='3'
                    value={baggage}
                    onChange={(e) => setBaggage(e.target.value)}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="flightPermission"
                label="Flight Permission"
            >
                <Form.Select
                    value={flightPermission}
                    onChange={(e) => setFlightPermission(e.target.value)}
                >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </Form.Select>
            </FloatingLabel>
            <FloatingLabel
                controlId="ticketNumber"
                label="Ticket number"
            >
                <Form.Control
                    type="text" 
                    maxLength="4"
                    value={tiket}
                    onChange={(e) => setTiket(e.target.value)}    
                />
            </FloatingLabel>
        </InputGroup>
    </ListGroup.Item>
  )
}

export default FlightEditRegInfo