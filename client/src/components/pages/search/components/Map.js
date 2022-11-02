import React, { useContext, useEffect, useRef, useState } from 'react'
import { PageRow, PageColumn1, PageColumn2 } from './../../../elements/PageElements'
import DataContext from "./../../../assets/context/DataContext"
import Autocomplete from './Autocomplete';
import EventForm from '../../../pages/planner/components/EventForm'
import Calendar from 'react-calendar'
import Slider from './Slider';
import '../Search.css'

const Map = ({data, setData}) => {
    const mapRef = useRef();
    let map;
    let marker;
    const [coordinates, setCoordinates] = useState({ lat: 40.7127837, lng: -74.0059413});

    function initMap() {
        if (mapRef.current && !map) {
            map = new window.google.maps.Map(mapRef.current, {
                center: { lat: coordinates.lat, lng: coordinates.lng },
                zoom: 8,
                disableDefaultUI: true
            });
        if (data.length > 0) {
            for (let place of data) {
                let position={lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
                marker = new window.google.maps.Marker({position: position, map: map});
            }
            map.setCenter({lat: data[0].geometry.location.lat(), lng: data[0].geometry.location.lng()})
        }
        }
    }

    function getUserCoords() {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: parseFloat(latitude), lng: parseFloat(longitude) })
        })
    }

    useEffect(() => {
        getUserCoords();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])    

    window.onload = initMap();

    return (
        <>
            <div className='map-container' ref={mapRef}></div>
            <div className='autocomplete-wrapper'>
                <Autocomplete map={map} setData={setData} data={data}></Autocomplete>
            </div>
            <Slider data={data} map={map}/>
            <DisplayEventForm/>
        </>
    )
}

export default Map


function DisplayEventForm() {

    const {createEvent, setDate, date} = useContext(DataContext);

    return (
        <section className='map-event-form' style={createEvent ? {bottom:'5px'}:{bottom:'-1000px'}}>
            <PageRow>
                <PageColumn1>
                    <Calendar onChange={setDate} value={date}/>
                </PageColumn1>
                <PageColumn2>
                    <EventForm date={date}/>
                </PageColumn2>
            </PageRow>
        </section>)
}