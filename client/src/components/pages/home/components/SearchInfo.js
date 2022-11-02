import React from 'react'
import {TextWrapper, PageRow, PageColumn1, PageColumn2, Paragraph, Heading} from '../../../elements/PageElements'
import {BiSearch} from 'react-icons/bi'
import './../Home.css'

function SearchInfo() {
  return (
    <>
    <TextWrapper>
            <Heading>The perfect day is just a search away.</Heading>
    </TextWrapper>
    <div className='display-search'>
        <PageRow>
            <PageColumn1>
                <TextWrapper className='search-input'>
                    <Paragraph>peaceful</Paragraph>
                    <BiSearch/>
                </TextWrapper>
            </PageColumn1>
            <PageColumn2>
                <TextWrapper>
                    <Paragraph className='home-paragraph'>Search for a <strong>mood</strong>...</Paragraph>
                </TextWrapper>
            </PageColumn2>
        </PageRow>
        <PageRow>
            <PageColumn1>
                <TextWrapper className='search-input'>
                    <Paragraph>San Francisco</Paragraph>
                    <BiSearch/>
                </TextWrapper>
            </PageColumn1>
            <PageColumn2>
                <TextWrapper>
                    <Paragraph className='home-paragraph'>...or a <strong>place</strong>...</Paragraph>
                </TextWrapper>
            </PageColumn2>
        </PageRow>
        <PageRow >
            <PageColumn1>
                <TextWrapper className='search-input'>
                    <Paragraph>picnic</Paragraph>
                    <BiSearch/>
                </TextWrapper>
            </PageColumn1>
            <PageColumn2>
                <TextWrapper>
                    <Paragraph className='home-paragraph'>...or an <strong>activity</strong>...</Paragraph>
                </TextWrapper>
            </PageColumn2>
        </PageRow>
    </div>
    <TextWrapper>
            <Paragraph className='home-paragraph'>...and we’ll provide you with a <strong>world of possibilities</strong>.</Paragraph>
    </TextWrapper>
    </>
  )
}

export default SearchInfo