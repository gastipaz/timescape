import React, {useContext} from 'react'
import { PageContainer, PageWrapper, TextWrapper, PageRow, PageColumn1, PageColumn2, Paragraph, Heading, Button, ButtonWrapper, ImgWrapper } from '../../elements/PageElements'
import MobileCard from './components/MobileCard'
import SearchInfo from './components/SearchInfo'
import EventsInfo from './components/EventsInfo'
import DisplayData from './components/DisplayData'
import Footer from './components/Footer'
import Access from '../access/Access'
import Background from './../../assets/images/background.png'
import Marker from './components/Marker'
import AuthContext from '../../assets/context/AuthContext'
import './Home.css'

const Home = () => {

  const {showAccessWindow, setShowAccessWindow} = useContext(AuthContext);

  return (
    <PageContainer>
      <PageWrapper>
        <div className='color-background'/>
        <PageRow className='home-row'>
          <PageColumn1>
            <TextWrapper>
            <Heading className='home-title'>Start making the most out of your free time.</Heading>
            <Paragraph className='home-paragraph'>Find a place, pick a date and time, arrange an event, and start enjoying.</Paragraph>
            </TextWrapper>
            <ButtonWrapper className='home-button'>
              <Button onClick={()=>setShowAccessWindow(true)}>Begin the journey</Button>
            </ButtonWrapper>
          </PageColumn1>
          <PageColumn2 className='home-column'>
            <ImgWrapper className='home-background-wrapper'>
              <img className='background-image' src={Background} alt='background'/>
            </ImgWrapper>
            <div className='canvas-container'>
              <Marker/>
            </div>
          </PageColumn2>
        </PageRow>
        <SearchInfo/>
        <div className='display-cards'>
          {DisplayData.map((item, index) => <MobileCard key={index} image={item.image} name={item.place} address={item.address} phone={item.phone} rating={item.rating} hours={item.hours} />)}
        </div>
        <EventsInfo/>
        <Footer/>

      {showAccessWindow && <Access/>}

      </PageWrapper>
    </PageContainer>
  )
}

export default Home