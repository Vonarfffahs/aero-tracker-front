import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import PassengerItem from './PassengerItem';

const PassengerList = observer(({onRemove}) => {
    const { passenger } = useContext(Context);
    return (
        <tbody>
            {passenger.passengers.map(passenger => 
                <PassengerItem key={passenger.passport_id} passenger={passenger} onRemove={onRemove}/>
            )}
        </tbody>
    );
});

export default PassengerList;