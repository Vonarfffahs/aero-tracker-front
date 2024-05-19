import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { createFlight } from '../http/flightAPI';

const CreateFlight = ({ show, onHide }) => {
    const [direction, setDirection] = useState('');
    const [date, setDate] = useState('');
    const [terminal, setTerminal] = useState('A');
    const [capacity, setCapacity] = useState(0);

    const addFlight = () => {
        const flight = { terminal, direction, capacity, date }
        createFlight(flight).then(data => onHide());
    }

    return (
        <Modal 
            show={show} 
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add new flight</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="direction" className='mt-2'>
                        <Form.Label>Enter direction:</Form.Label>
                        <Form.Control 
                            value={direction}
                            type="text" 
                            placeholder="Enter direction"
                            onChange={(e) => setDirection(e.target.value)} 
                        />
                    </Form.Group>
                    <Form.Group controlId="date" className='mt-2'>
                        <Form.Label>Select date:</Form.Label>
                        <Form.Control 
                            value={date}
                            type="datetime-local"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="terminal" className='mt-2'>
                        <Form.Label>Select terminal:</Form.Label>
                        <Form.Select 
                            aria-label="Choose Terminal"
                            value={terminal}
                            onChange={(e) => setTerminal(e.target.value)}
                        >
                            <option value="A">A</option>
                            <option value="B">B</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="capacity" className='mt-2'>
                        <Form.Label>Enter capacity:</Form.Label>
                        <Form.Control 
                            value={capacity}
                            type="number" 
                            placeholder="Enter capacity" 
                            onChange={(e) => setCapacity(Number(e.target.value))}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="primary" 
                    type="submit"
                    onClick={addFlight}
                >
                    Add
                </Button>
                <Button 
                    variant="secondary" 
                    onClick={onHide}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateFlight;