import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import FlightItem from './FlightItem';

const FlightList = observer(({onRemove}) => {
    const { flight } = useContext(Context);
    return (
        <tbody>
            {flight.flights.map(flight => 
                <FlightItem key={flight.id} flight={flight} onRemove={onRemove} />
            )}
        </tbody>
    );
});

export default FlightList;