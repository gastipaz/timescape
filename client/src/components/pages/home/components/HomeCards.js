import React from 'react'
import Card from './../../search/components/Card'
import { TextWrapper, Heading } from '../../../elements/PageElements'
import {BiArrowBack} from 'react-icons/bi'
import './../Home.css'
import './../PersonalPage.css'
import NothingHere from './../../../assets/images/nothing-here.gif'
import NoInfoAvailable from './NoInfoAvailable'

const HomeCards = ({data, showNearby, setShowNearby, activeType}) => {

  const noInfoMessage = `You don't have any places in your favorites at the moment.\nShould you add any to the list you'll see them here. You can also check places near you selecting the categories on the discovery section above.\nHave fun!`

  return (
    <>
            {showNearby 
            ? <TextWrapper className='nearby-places-title'>
                <BiArrowBack className='nearby-arrow' onClick={()=>setShowNearby(false)}/> 
                <Heading className='column-title'>{activeType} near you</Heading>
            </TextWrapper>
            : <TextWrapper>
                <Heading className='column-title'>Your favorites</Heading>
            </TextWrapper>}
            <div className='cards-container'>
            {data?.length > 0 ? data?.map(place=> 
                <Card key={place.place_id}
                image={place.place_image}
                name={place.name} 
                address={place.address} 
                rating={place.rating}
                phone={place.place_number}
                maps_url={place.url}
                id={place.place_id}/>
            ) : 
            <NoInfoAvailable message={noInfoMessage} image={NothingHere}/>
            }
        </div>
    </>
  )
}

export default HomeCards