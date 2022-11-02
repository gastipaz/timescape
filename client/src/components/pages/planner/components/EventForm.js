import React, {useContext} from 'react'
import { TextWrapper, PageRow, PageColumn1, PageColumn2, ButtonWrapper, Button } from '../../../elements/PageElements'
import DataContext from '../../../assets/context/DataContext'
import { postData } from '../../../assets/context/APIHooks'
import { useLocation } from 'react-router-dom'

const EventForm = ({ date }) => {

    const {setFilteredEvents, setPlaceEvent, setCreateEvent, placeEvent, defaultImage } = useContext(DataContext)
    const location = useLocation()

    async function handleSubmit(event) {
        event.preventDefault();
        const url = "http://localhost:5000/createEvent";
        const title = document.getElementById('title');
        const message = document.getElementById('message');
        const place_name = document.getElementById('place_name');
        const date = document.getElementById('date');
        const place_address = document.getElementById('place_address');
        const place_number = document.getElementById('place_number');
        const time = document.getElementById('time');
        const result = await postData(url,
            {
                data: JSON.stringify({
                    [title.name]: title.value,
                    [message.name]: message.value,
                    [place_name.name]: place_name.value,
                    [date.name]: date.value,
                    [place_address.name]: place_address.value,
                    [place_number?.name]: place_number?.value,
                    [time.name]: time.value,
                    place_image: placeEvent.image ? placeEvent.image : defaultImage
                })
            });
        console.log(result.data?.events)
        setFilteredEvents(result.data?.events)
        setPlaceEvent({})
        setCreateEvent(false)
    }

    return (
        <>
            <TextWrapper className='form-wrapper'>
                <form className="event" method="POST" id='calendar-form' onSubmit={(event) => handleSubmit(event)}>
                    <PageRow className='form-row'>
                        <PageColumn1 className='form-column1'>
                            <input className="cal-input" type="text" placeholder="Title" name="title" id='title' required />
                            <br />
                            <textarea className="cal-input" type="text" placeholder="Message" name="message" id="message" />
                            <br />
                            <input className="cal-input" type="text" placeholder="choose date" value={date.toLocaleDateString()} name="date" id="date" readOnly={true} required />
                            <br />
                        </PageColumn1>
                        <PageColumn2 className='form-column2'>
                            <input className="cal-input" type="text" placeholder="Place name" defaultValue={placeEvent?.name} name="place_name" id="place_name" required />
                            <br />
                            <input className="cal-input" type="text" placeholder="Place address" defaultValue={placeEvent?.address} name="place_address" id="place_address" required />
                            <br />
                            <input className="cal-input" type="time" placeholder="Select the time" name="time" id="time" />
                            <br />
                            {placeEvent?.phone_number && <input className="cal-input" type="text" placeholder="Place phone number" defaultValue={placeEvent?.phone_number} name="place_number" id="place_number" required />}
                        </PageColumn2>
                    </PageRow>
                </form>
                <ButtonWrapper className='event-btn-wrapper'>
                    <Button className='event-btn' type='submit' form='calendar-form'>Create event</Button>
                    {location.pathname === '/search' && 
                        <Button className='event-btn' onClick={()=>setCreateEvent(false)}>Close</Button>
                    }
                </ButtonWrapper>
            </TextWrapper>
        </>
    )
}

export default EventForm