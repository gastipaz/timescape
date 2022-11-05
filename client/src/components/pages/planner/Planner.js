import React, { useContext, useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import EventForm from './components/EventForm'
import EventCard from './components/EventCard'
import { PageContainer, PageWrapper, TextWrapper, Paragraph, Heading } from '../../elements/PageElements'
import DataContext from '../../assets/context/DataContext'
import { getData, postData } from '../../assets/context/APIHooks';
import './Planner.css'

const Planner = () => {

    const { setFilteredEvents, filteredEvents, placeEvent, date, setDate } = useContext(DataContext);
    const [loading, setLoading] = useState(true); 
    const [datesList, setDatesList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const dates = await getData("/getEvents/dates");
            const result = await getData("/getEvents");
            setFilteredEvents(result.data?.events);
            setDatesList(dates.data?.dates);
            setLoading(false);
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function DisplayEvents(value) {
        const selected_date = new Date(value);
        const formatted_date = new Date(selected_date.getTime() + Math.abs(selected_date.getTimezoneOffset() * 60000)).toUTCString();
        const result = await postData(`/getEvents`,{date: formatted_date});
        const dates = await getData("/getEvents/dates");
        setFilteredEvents(result.data?.events)
        setDatesList(dates.data?.dates);
    }

    function highlightDate({date}) {
        if (datesList.find(dateItem => new Date(dateItem).toDateString() === new Date(date).toDateString()) !== undefined) {
            return "highlighted"
        }
    }

    return (
        <PageContainer>
            <PageWrapper className='planner-background'>
                <div className='planner-row'>
                    <div className='planner-column left'>
                        <div className='calendar-container'>
                            <Calendar
                                onChange={setDate}
                                value={date}
                                onClickDay={(value) => DisplayEvents(value)}
                                tileClassName={highlightDate}/>
                        </div>
                        <EventForm date={date} placeEvent={placeEvent}/>
                    </div>
                    <div className='planner-column right'>
                        {!loading ?
                            <div className='current-events-container'>
                                {filteredEvents && filteredEvents?.length > 0 ?
                                    filteredEvents?.map((event) => {
                                        return (
                                            <EventCard key={event.id} event={event} />
                                        );
                                    }) :
                                    <TextWrapper className='no-events'>
                                        <Paragraph>There are no events assigned.</Paragraph>
                                    </TextWrapper>
                                }
                            </div>
                        : <Heading>Loading...</Heading>}
                    </div>
                </div>
            </PageWrapper>
        </PageContainer>
    )
}

export default Planner