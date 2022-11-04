import React, { useContext } from 'react'
import { Text, Title, Button, ButtonWrapper, Image } from '../../../elements/CardElements'
import DataContext from '../../../assets/context/DataContext';
import { postData } from '../../../assets/context/APIHooks';

const EventCard = ({event}) => {

  const {setFilteredEvents, setEvents} = useContext(DataContext);

  const deleteEntry = async (entry_id) => {
    const result = await postData("http://localhost:5000/deleteEvent", {entry_id:entry_id});
    console.log(result.data?.events);
    setFilteredEvents(result.data?.events);
    setEvents(result.data?.events);
  }

  return (
    <div className="event-card">
        <div className="event-card-content">
          <div className="event-card-text">
            <Title>{event.title}</Title>
            <br/>
            <Text><strong>{event.date} - {event.time}</strong></Text>
            <Text className='event-card-place'>{event.place_name}</Text>
            <Text>{event.place_address}
            <br />
            {event.place_number && event.place_number}
            <br />
            {event.message}</Text>
          </div>
          <ButtonWrapper>
            <Button className='remove' onClick={()=> deleteEntry(event.id)}>Delete</Button>
          </ButtonWrapper>
        </div>
        <div className='event-card-image'>
            <Image  src={event.place_image} alt='thumbnail'/>
        </div>
    </div>
  )
}

export default EventCard