import React, {useContext, useState} from 'react'
import { Heading, PageContainer, PageWrapper, TextWrapper, ButtonWrapper, Paragraph, Button } from './../../elements/PageElements'
import AuthContext from '../../assets/context/AuthContext'
import SignUp from '../signup/SignUp'
import { postData } from '../../assets/context/APIHooks'
import './Access.css'

const Access = () => {

  const [createAccount, setCreateAccount] = useState(false)
  const {setShowAccessWindow, setAuthenticated, authenticated} = useContext(AuthContext);

  function testAccount() {
    document.getElementById('user_email').value = 'testaccount@timescape.com'
    document.getElementById('user_password').value = 'Testacc1'
  }

  async function auth(event) {
    event.preventDefault()
    const url = "/access";
    const email = document.getElementById('user_email');
    const password = document.getElementById('user_password');
    const data = JSON.stringify({[email.name]: email.value, [password.name]: password.value});
    const result = await postData(url, data) 
    setAuthenticated({value: result.data.authenticated, message: result.data.message})
    if (result.data.authenticated === true) {
      setShowAccessWindow(false)
    }
  }

  return (
    <PageContainer style={{position:'fixed', top:'0', zIndex:'9000'}}>
      <div className='login-backdrop' onClick={()=>setShowAccessWindow(false)}/>
      <PageWrapper className='login-wrapper'>
        {!createAccount ?
          (
            <>
              <TextWrapper>
                <Heading className='title'>Timescape</Heading>
              </TextWrapper>
              <form className="access" method="POST" id='login-form' onSubmit={(event)=>auth(event)}>
                <input className="smallInput" type="email" placeholder="Email address" name="user_email" id='user_email' required />
                <br></br>
                <input className="smallInput" type="password" placeholder="Password" name="user_password" id='user_password' required />
              </form>
              <ButtonWrapper className='login-btn-wrapper'>
                <Button className='login-btn' type='submit' form='login-form'>Login</Button>
              </ButtonWrapper>
              <TextWrapper>
                <Paragraph className="login-option" onClick={() => testAccount()}>Log in with test account</Paragraph>
                <Paragraph className="login-option" onClick={() => setCreateAccount(true)}>Don't have an account? Sign Up</Paragraph>
              </TextWrapper>
            </>
          ) : (
            <SignUp setAuthenticated={setAuthenticated} setShowAccessWindow={setShowAccessWindow}/>
          )
        }

        {authenticated && 
          <TextWrapper>
            <Paragraph style={authenticated.value ? {color:'green'} : {color:'red'}}>{authenticated.message}</Paragraph>
          </TextWrapper>
        }

      </PageWrapper>
    </PageContainer>
  )
}

export default Access