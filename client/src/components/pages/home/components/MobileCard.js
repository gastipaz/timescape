import React, {useContext} from 'react'
import DataContext from '../../../assets/context/DataContext'
import { DisplayCardContainer, DisplayContentWrapper, DisplayTextWrapper, DisplayText, DisplayTitle, DisplayImageWrapper, DisplayImage, DisplayLink, DisplayButtonWrapper, DisplayButton } from '../../../elements/CardElements'
import { GrStar } from 'react-icons/gr'
import 'react-calendar/dist/Calendar.css';
import './../Home.css'

const MobileCard = ({ image, name, address, rating, phone, hours, maps_url, id }) => {

    const { defaultImage } = useContext(DataContext);
    let stars = rating !== undefined ? [...Array(Math.floor(parseFloat(rating)))] : [];
    let thumbnail = Array.isArray(image) && image?.length > 0 ? image[0]?.getUrl() : image;
    let day = new Date().getDay().toString().toLowerCase();
    let isOpen = hours?.open_now === true ? "Open now." : "Closed at the moment.";
    let open_hours = hours?.weekday_text && hours?.weekday_text?.length > 0 ? `${isOpen}\n ${hours?.weekday_text?.find(timeframe => timeframe?.includes(day))}` : isOpen;

    return (
        <DisplayCardContainer className='display-card'>
            <DisplayImageWrapper>
                <DisplayImage src={image ? thumbnail : defaultImage} alt="thumbnail" />
            </DisplayImageWrapper>
            <DisplayContentWrapper>
                <DisplayTextWrapper>
                    <DisplayLink href={maps_url} target='_blank' rel='noopener noreferrer'>
                        <DisplayTitle>{name}</DisplayTitle>
                    </DisplayLink>
                </DisplayTextWrapper>
                <div className='display-rating'>
                    {stars.length > 0 ? stars.map((_, index) => 
                        <GrStar key={index}/>
                    ) : <DisplayText>No rating information</DisplayText>} 
                </div>
                <DisplayTextWrapper>
                    <DisplayText>{address ? address : 'No address information available.'}</DisplayText>
                </DisplayTextWrapper>
                <DisplayTextWrapper>
                    <DisplayText>{phone ? phone : 'No phone number information.'}</DisplayText>
                </DisplayTextWrapper>
                <DisplayTextWrapper>
                    <DisplayText>{hours ? open_hours : "No schedule available."}</DisplayText>
                </DisplayTextWrapper>
            </DisplayContentWrapper>
            <DisplayButtonWrapper>
                <DisplayButton>Create event</DisplayButton>
                <DisplayButton>Add to favorites</DisplayButton>
            </DisplayButtonWrapper>
        </DisplayCardContainer>
    )
}

export default MobileCard