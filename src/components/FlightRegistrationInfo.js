import React from 'react'
import { ListGroup, FloatingLabel, Form, InputGroup } from 'react-bootstrap'

const FlightRegistrationInfo = ({ flightInfo, registrationInfo }) => {
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
                <Form.Control 
                    type="text" 
                    value={registrationInfo.visa ? 'Yes' : 'No'}
                    readOnly
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="baggage"
                label="Baggage weight, kg"
            >
                <Form.Control 
                    type='text'
                    maxLength='3'
                    value={registrationInfo.baggage}
                    readOnly
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="flightPermission"
                label="Flight Permission"
            >
                <Form.Control 
                    type="text" 
                    value={registrationInfo.flight_permission ? 'Yes' : 'No'}
                    readOnly
                />
            </FloatingLabel>
        </InputGroup>
    </ListGroup.Item>
  )
}

export default FlightRegistrationInfo