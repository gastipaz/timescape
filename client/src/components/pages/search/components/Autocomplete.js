import React, { useState } from 'react'
import {MdClose} from 'react-icons/md'
import '../Search.css'


const Autocomplete = ({ map, setData, data }) => {

  let autocomplete;
  let service;
  const [value, setValue] = useState("");
  const options = {
    fields: ['formatted_address', 'formatted_phone_number', 'geometry', 'name', 'opening_hours', 'photos', 'place_id', 'rating', 'url']
  }

  function initAutocomplete() {
    const input = document.getElementById("autocomplete2");
    service = new window.google.maps.places.PlacesService(map);
    autocomplete = new window.google.maps.places.Autocomplete(input, options);
    autocomplete.addListener('place_changed', ()=>getDetails(autocomplete));
  }

  function getDetails(autocomplete) {
    let place = autocomplete.getPlace();
    if (place.geometry) {
      let position={lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
      map.panTo(position);
      console.log(place);
      setData([place]);
    } else {
      console.log("no geometry", place.name)
      const request = {
        query: place.name,
        fields: options.fields
      } 
      service.textSearch(request, (results, status) => {
        if(status === window.google.maps.places.PlacesServiceStatus.OK) {
          setData(results)
      }});
    }
  }

  const handleInput = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  window.onload = initAutocomplete();

  return (
    <form className='search-form' onSubmit={(event)=>handleSubmit(event)}>
      <input id='autocomplete2' className='autocomplete' value={value} onChange={handleInput} placeholder='Enter a place' name="search_area" required />
      {data.length > 0 &&
        <MdClose className='clear-search' onClick={()=>setData([])}/>
      }
    </form>
  )
}

export default Autocomplete;