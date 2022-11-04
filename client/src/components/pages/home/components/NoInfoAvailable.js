import React from 'react'
import { TextWrapper, Paragraph, PageRow, PageColumn1, PageColumn2, ImgWrapper } from '../../../elements/PageElements'

const NoInfoAvailable = ({message, image}) => {
    return (
        <PageRow>
            <PageColumn1>
                <ImgWrapper className='nothing-image-wrapper'>
                    <img className='nothing-image' src={image} alt='nothing-here' />
                </ImgWrapper>
            </PageColumn1>
            <PageColumn2>
                <TextWrapper>
                    <Paragraph className='nothing-here'>
                        {message}
                    </Paragraph>
                </TextWrapper>
            </PageColumn2>
        </PageRow>
    )
}

export default NoInfoAvailable