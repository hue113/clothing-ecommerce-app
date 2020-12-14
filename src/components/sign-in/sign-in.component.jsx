import React from 'react'
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

import './sign-in.styles.scss'

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({ [name] : value})        // dynamic setState
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password } = this.state
        try{
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ email: '', password: ''})       // clear form
        } catch(error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email"
                        type="email"
                        onChange={this.handleChange}
                        value={this.state.email}
                        label="Email"
                        required
                    />
                    <FormInput 
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        label="Password"
                        required
                    />
                    
                    <div className="buttons" >
                        <CustomButton type="submit"> Sign In </CustomButton>
                        <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn> Sign In With Google </CustomButton>
                    </div>
                    
                </form>
            </div>
        );
    }
}

export default SignIn;