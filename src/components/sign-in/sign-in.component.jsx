import React from 'react'
import { connect } from 'react-redux'
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

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
        const { emailSignInStart } = this.props
        const { email, password } = this.state
        emailSignInStart(email, password)
        // try{
        //     await auth.signInWithEmailAndPassword(email, password)
        //     this.setState({ email: '', password: ''})       // clear form
        // } catch(error) {
        //     console.log(error)
        // }
    }

    render() {
        const { googleSignInStart } = this.props
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
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn> Sign In With Google </CustomButton>
                    </div>
                    
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
                                                        // pass as objects
                                                        // key-value
})

export default connect(
    null, 
    mapDispatchToProps
)(SignIn)