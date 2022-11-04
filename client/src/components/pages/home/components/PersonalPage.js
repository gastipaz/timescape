import React, { useContext, useEffect, useState } from 'react'
import { PageContainer, PageWrapper, TextWrapper, Heading } from '../../../elements/PageElements'
import Footer from './Footer'
import DataContext from '../../../assets/context/DataContext'
import EventCard from '../../planner/components/EventCard'
import HomeCards from './HomeCards'
import StillNothing from './../../../assets/images/waiting.gif'
import { getData, postData } from '../../../assets/context/APIHooks'
import NoInfoAvailable from './NoInfoAvailable'
import './../PersonalPage.css'

const PersonalPage = () => {

    const { events, setEvents, saved, setSaved } = useContext(DataContext);
    const [nearby, setNearby] = useState([]);
    const [showNearby, setShowNearby] = useState(false);
    const [activeType, setActiveType] = useState("");
    const [user, setUser] = useState(null)
    const types = [{name: "Bars 🍺", type: 'bar'}, {name: "Restaurants 🍴", type: 'restaurant'}, {name: "Cafes ☕", type: 'cafe'}, {name: "Clubs 🕺💃", type: 'night_club'}, {name: "Parks 🌳", type:'park'}, {name:"Malls 🛍️", type:'shopping_mall'}];
    const noInfoMessage = "It seems like your schedule is clear at the moment.\nWhen you create new events, you'll see all of the upcoming ones here. You can also visit the Planner page and inspect your upcoming events by date.\nLet's get started!"

    useEffect(() => {
        async function fetchData() {
            const eventsData = await getData("http://localhost:5000/userEvents");
            const savedPlacesData = await getData("http://localhost:5000/getSavedPlaces");
            const user = await getData("http://localhost:5000/user");
            setEvents(eventsData.data?.events);
            setSaved(savedPlacesData.data?.saved);
            setUser(user?.data);
            console.log(user?.data);
            console.log(eventsData.data?.events);
            console.log(savedPlacesData.data?.saved);
        }
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    function getNearby(type) {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            let coordinates = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
            async function postRequest() {
                const url = "http://localhost:5000/getNearby";
                let result = await postData(url,{coordinates: coordinates, type: type.type})
                setNearby(result?.data?.nearby)
                setShowNearby(true);
                setActiveType(type.name)
                console.log(result?.data?.nearby)
            }
            postRequest();
        });
    }

    return (
        <PageContainer>
            <PageWrapper>
                <div className='personal-page-background' />
                <div className='home-content-wrapper'>
                    <TextWrapper className='welcome-title'>
                        <Heading>Welcome {user?.name}!</Heading>
                    </TextWrapper>
                    <section className='quick-search'>
                            <TextWrapper className='quick-search-text'>
                                <Heading className='column-title'>Discover what's around you</Heading>
                            </TextWrapper>
                            <div className='type-buttons-container'>
                                {types.map((type, index)=> 
                                    <button className='type-button' key={index} onClick={()=>getNearby(type)}>{type.name}</button>
                                )}
                            </div>
                    </section>
                    <section className='columns-container'>
                        <div className='column favorites'>
                            <div className='cards-container'>
                                <HomeCards data={showNearby ? nearby : saved} showNearby={showNearby} setShowNearby={setShowNearby} activeType={activeType}/>
                            </div>
                        </div>
                        <div className='column upcoming-events'>
                            <TextWrapper>
                                <Heading className='column-title'>Upcoming events</Heading>
                            </TextWrapper>
                            {events?.length > 0 ? events?.map(event => 
                                <EventCard key={event.id} event={event}/>
                            ) : 
                            <NoInfoAvailable message={noInfoMessage} image={StillNothing} />
                            }
                        </div>
                    </section>
                </div>
                <Footer />
            </PageWrapper>
        </PageContainer>
    )
}

export default PersonalPage