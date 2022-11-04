import React, {useState} from 'react'
import { ImgWrapper, PageContainer, PageWrapper} from './../../elements/PageElements'
import Map from './components/Map'
import './Search.css'

const NewActivity = () => {

  const [data, setData] = useState([])

  return (
    <>
    <PageContainer>
      <PageWrapper>
        <ImgWrapper className='map-wrapper'>
          <Map data={data} setData={setData}/>
        </ImgWrapper>
      </PageWrapper>
    </PageContainer>
    </>
  )
}

export default NewActivity