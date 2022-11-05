import React from 'react'
import { Heading, TextWrapper, ButtonWrapper } from './../../elements/PageElements'
import './../access/Access.css'
import { postData } from '../../assets/context/APIHooks'

const SignUp = ({setAuthenticated, setShowAccessWindow}) => {

    async function signUp(event) {
        event.preventDefault()
        const url = "/signup";
        const firstName = document.getElementById('user_first_name');
        const lastName = document.getElementById('user_last_name');
        const email = document.getElementById('user_email');
        const password = document.getElementById('user_password');
        const passwordConfirmation = document.getElementById('user_password_confirmation');
        const data = JSON.stringify({[email.name]: email.value, 
            [password.name]: password.value,
            [firstName.name]: firstName.value,
            [lastName.name]: lastName.value,
            [passwordConfirmation.name]: passwordConfirmation.value});
        const result = await postData(url, data) 
        setAuthenticated({value: result.data.authenticated, message: result.data.message})
        if (result.data.authenticated === true) {
            setShowAccessWindow(false)
        }
    }

return (
    <>
        <TextWrapper>
            <Heading className='title'>Sign up</Heading>
        </TextWrapper>
        <form className="access" method="POST" id='sign-up-form' onSubmit={(event)=>signUp(event)}>
        <input className = "smallInput" type="text" placeholder="First name" name="user_first_name" id='user_first_name' required/>
        <br></br>
        <input className = "smallInput" type="text" placeholder="Last name" name="user_last_name" id='user_last_name' required/> 
        <br></br>
        <input className = "smallInput" type="email" placeholder="Email address" name="user_email" id='user_email' required/>
        <br></br>
        <input className = "smallInput" type="password" placeholder="Password" name="user_password" id='user_password' required/>
        <br></br>
        <input className = "smallInput" type="password" placeholder="Password confirmation" name="user_password_confirmation" id='user_password_confirmation' required/> 
        </form>
        <ButtonWrapper className='login-btn-wrapper'>
            <button className='login-btn' type="submit" form='sign-up-form'>Create account</button>
        </ButtonWrapper>
    </>
)
}

export default SignUp