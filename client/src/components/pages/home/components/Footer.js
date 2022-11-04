import React from 'react'
import { PageColumn1, PageColumn2, PageRow, Paragraph, TextWrapper } from '../../../elements/PageElements'
import { animateScroll as scroll } from 'react-scroll'
import './../Home.css'

const Footer = () => {
  return (
    <div className='footer'>
            <TextWrapper className='footer-logo'>
                <Paragraph onClick={()=>scroll.scrollToTop()}>Timescape</Paragraph>
            </TextWrapper>
            <PageRow className='footer-row'>
                <PageColumn1 className='footer-column'>
                    <div>
                        <Paragraph>
                            Information
                        </Paragraph>
                        <TextWrapper>
                            <li>About</li>
                            <li>Contact</li>
                            <li>Services</li>
                            <li>Team</li>
                        </TextWrapper>
                    </div>
                </PageColumn1>
                <PageColumn2 className='footer-column'>
                    <div>
                        <Paragraph>
                            Socials
                        </Paragraph>
                        <TextWrapper>
                            <li>Instagram</li>
                            <li>Facebook</li>
                            <li>GitHub</li>
                            <li>LinkedIn</li>
                        </TextWrapper>
                    </div>
                </PageColumn2 >
            </PageRow>
    </div>
  )
}

export default Footer