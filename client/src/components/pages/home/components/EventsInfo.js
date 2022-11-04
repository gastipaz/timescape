import React, {useState} from 'react'
import {TextWrapper, PageRow, PageColumn1, PageColumn2, Paragraph, Heading} from '../../../elements/PageElements'
import MobileCard from './MobileCard'
import DisplayData from './DisplayData'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './../Home.css'

const EventsInfo = () => {

    const [date, setDate] = useState(new Date());
    const selected_date = new Date(date).toLocaleDateString();
    const time = `${new Date().getHours()}:${new Date().getMinutes()}`;

  return (
    <>
    <TextWrapper>
        <Heading>Schedule your next adventure to make sure you don't miss it.</Heading>
    </TextWrapper>
    <PageRow className='events-info-row'>
        <PageColumn1 className='events-info-column'>
            <div className='single-card-container'>
                <MobileCard image={DisplayData[0].image} name={DisplayData[0].place} address={DisplayData[0].address} phone={DisplayData[0].phone} rating={DisplayData[0].rating} hours={DisplayData[0].hours} />
            </div>
        </PageColumn1>
        <PageColumn2>
            <TextWrapper className='events-info-text'>
                <Paragraph className='home-paragraph'>Creating <strong>everlasting memories</strong> has never been easier.</Paragraph>
            </TextWrapper>
            <TextWrapper className='events-info-text'>
                <Paragraph className='home-paragraph'>Generate <strong>new events</strong> or establish a list of <strong>favorite places</strong> you'd like to visit later.</Paragraph>
            </TextWrapper>
        </PageColumn2>
    </PageRow>
    <PageRow className='events-info-row'>
        <PageColumn1>
            <TextWrapper className='events-info-text'>
                <Paragraph className='home-paragraph'>All you have to do is <strong>set the time and date</strong> and add reminder notes when necessary.</Paragraph>
            </TextWrapper>
        </PageColumn1>
        <PageColumn2>
            <div className='display-form'>
            <TextWrapper className='search-input'>
                <Paragraph className='grayed-input'>Golden Gate Park</Paragraph>
            </TextWrapper>
            <TextWrapper className='search-input'>
                <Paragraph className='grayed-input'>San Francisco, California</Paragraph>
            </TextWrapper>
            <TextWrapper className='search-input'>
                <Paragraph className='grayed-input'>+1 415-831-2700</Paragraph>
            </TextWrapper>
            <TextWrapper className='search-input'>
                <Paragraph>{selected_date} - {time}</Paragraph>
            </TextWrapper>
            <TextWrapper className='search-input'>
                <Paragraph style={{lineHeight: '109%'}}>
                    Bring spare glasses and a
                    coat in case it gets chilly at 
                    sunset. 
                </Paragraph>
            </TextWrapper>
            </div>
        </PageColumn2>
    </PageRow>
    <PageRow className='events-info-row'>
            <PageColumn1 className='events-info-column'>
                <div className='calendar-container'>
                    <Calendar onChange={setDate} value={date}/>
                </div>
                <TextWrapper className='display-event'>
                    <TextWrapper>
                        <Paragraph>{selected_date}</Paragraph>
                        <Paragraph className='display-event-time'>{time}</Paragraph>
                    </TextWrapper>
                    <Paragraph className='display-event-place'><strong>Golden Gate Park</strong></Paragraph>
                    <Paragraph>San Francisco, California</Paragraph>
                </TextWrapper>
            </PageColumn1>
            <PageColumn2>
                <TextWrapper className='events-info-text'>
                    <Paragraph className='home-paragraph'>Revisit your events whenever you want. And don't worry: <strong>as soon as life calls you, we'll let you know ;-)</strong>.</Paragraph>
                </TextWrapper>
            </PageColumn2>
        </PageRow>
    </>
  )
}

export default EventsInfo