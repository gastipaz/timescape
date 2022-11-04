import React, {useContext} from 'react'
import DataContext from '../../../assets/context/DataContext';
import { CardContainer, ContentWrapper, TextWrapper, Text, Title, ImageWrapper, Image, Link, ButtonWrapper, Button } from './../../../elements/CardElements'
import { GrStar } from 'react-icons/gr'
import 'react-calendar/dist/Calendar.css';
import { postData } from '../../../assets/context/APIHooks'
import { useNavigate, useLocation } from 'react-router-dom';

const Card = ({ image, name, address, rating, phone, hours, maps_url, id, map }) => {

    const { setPlaceEvent, setCreateEvent, defaultImage, saved, setSaved } = useContext(DataContext);

    let stars = !rating ? [] : [...Array(Math.floor(parseFloat(rating)))];
    let thumbnail = Array.isArray(image) && image?.length > 0 ? image[0]?.getUrl() : image;
    let day = new Date().getDay()
    let isOpen = hours?.open_now === true ? "Open now." : "Closed at the moment.";
    let open_hours = hours?.weekday_text && hours?.weekday_text?.length > 0 ? `${isOpen}\n ${hours?.weekday_text[day-1]}` : isOpen;
    const navigate = useNavigate()
    const location = useLocation()

    async function addFavorite(image=null,place=null,address=null,phone=null,rating=null,maps_url=null,id=null) {
        const url = "http://localhost:5000/savePlace";
        let favorite = {name: place, address: address, phone_number: phone, rating: rating, maps_url: maps_url, place_id: id, image: image};
        const result = await postData(url, favorite);
        setSaved(result?.data?.saved);
        console.log(result?.data?.saved);
    };

    async function deleteFavorite(id) {
        const url = "http://localhost:5000/deletePlace";
        const result = await postData(url, {id: id});
        console.log(result.data?.saved)
        setSaved(result?.data?.saved)
    }

    function showEventForm() {
        if(location.pathname === '/search') {
            setCreateEvent(true);
            setPlaceEvent({name: name, address: address, phone_number: phone, image: image ? thumbnail : defaultImage})
        } else {
            setPlaceEvent({name: name, address: address, phone_number: phone, image: image ? thumbnail : defaultImage})
            navigate('/planner')
        }
    }

    function panToMarker() {
        let geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({placeId: id}, function(result) {
        map.panTo(new window.google.maps.LatLng(result[0].geometry.location))
        map.setZoom(17)
        });
    }

    function DisplayFavoritesButton(id) {
        let place = saved?.find(place => place.place_id === id)
        return (
            <>
                {place === undefined ?
                    <Button onClick={()=>addFavorite(thumbnail,name,address,phone,rating,maps_url,id)}>Add to favorites</Button> :
                    <Button className='remove' onClick={()=>deleteFavorite(id)}>Remove favorite</Button>
                }
            </>
        )
    }

    return (
        <CardContainer pathname={location.pathname} onClick={location.pathname === '/search' ? ()=>panToMarker() : null}>
            <ContentWrapper>
                <TextWrapper>
                    <Link href={maps_url} target='_blank' rel='noopener noreferrer'>
                        <Title>{name}</Title>
                    </Link>
                </TextWrapper>
                <div className='miniature-rating'>
                    {stars?.length > 0 ? stars.map((_, index) => 
                        <GrStar key={index}/>
                    ) : <Text>No rating information</Text>} 
                </div>
                <TextWrapper>
                    <Text>{address ? address : 'No address information available.'}</Text>
                </TextWrapper>
                <TextWrapper>
                    <Text>{phone ? phone : 'No phone number information.'}</Text>
                </TextWrapper>
                <TextWrapper>
                    <Text>{hours ? open_hours : "No schedule available."}</Text>
                </TextWrapper>
                <ButtonWrapper>
                    <Button onClick={()=>showEventForm()}>Create event</Button>
                    {DisplayFavoritesButton(id)}
                </ButtonWrapper>
            </ContentWrapper>
            <ImageWrapper>
                <Image src={image ? thumbnail : defaultImage} alt="thumbnail" />
            </ImageWrapper>
        </CardContainer>
    )
}

export default Card