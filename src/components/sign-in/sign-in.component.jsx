import React from 'react'
import { Component } from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'

class SignIn extends Component{

    constructor(props){
        super(props)

        this.state={
            email:'',
            password:''
        }

    }

    handleSubmit=(e)=>{
        e.preventDefault()
        this.setState({email:'',password:''})
    }

    handleChange=(e)=>{
        const {value, name} = e.target
        this.setState({[name]:value})

    }

    render(){

        return(
        <div className='sign-in'>
        <h2>I Already have an account</h2>
        <span>Sign In with your email and password</span>

        <form onSubmit={this.handleSubmit} >

            <FormInput 
            type="email" 
            onChange={this.handleChange}
            name="email"
            handleChange={this.state.email}
            value={this.state.email}
            label='email'
            required/>

          
            <FormInput 
            type="password"
            onChange={this.handleChange} 
            name="password" 
            handleChange={this.state.password}
            value={this.state.password}
            label='password'
            required
            />


            <CustomButton type="submit">Sign in</CustomButton>
        </form>

        </div>


        )
        


    }
}

export default SignIn;