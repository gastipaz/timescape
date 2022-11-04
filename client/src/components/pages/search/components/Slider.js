import React from 'react'
import { Paragraph } from './../../../elements/PageElements';
import Card from './Card'
import '../Search.css'

const Slider = ({data, map}) => {

    return (
        <section className="slider" style={data?.length > 0 ? {left:'0px'}:{left:'-1100px'}}>
          <div className='slider-top'/>
          {data?.length > 0 ?
            data.map((value) => {
              return (
                <Card key={value.place_id}
                image={value.photos}
                name={value.name} 
                address={value.formatted_address} 
                rating={value.rating}
                phone={value.formatted_phone_number}
                hours={value.opening_hours}
                maps_url={value.url}
                id={value.place_id}
                map={map}
                />
              );
          }) : <Paragraph>No results available.</Paragraph>}
        </section>
      )
}

export default Slider
