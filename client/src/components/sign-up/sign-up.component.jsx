import React, { useState } from 'react'
import { connect } from 'react-redux'
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'    
import { signUpStart} from '../../redux/user/user.actions'

const SignUp = ({ signUpStart }) => {
    // constructor() {
    //     super()
    //     this.state = {
    //         displayName: '',
    //         email: '',
    //         password: '',
    //         confirmPassword: ''
    //     }
    // }
    const [userCredentials, setCredentials ] = useState({ 
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const { displayName, email, password, confirmPassword } = userCredentials

    const handleChange = e => {
        const {name, value} = e.target
        setCredentials({...userCredentials, [name]: value })        // dynamic setState
    }

    const handleSubmit = async e => {
        e.preventDefault()
        // const { signUpStart } = this.props          
        // const { displayName, email, password, confirmPassword } = this.state
        if (password !== confirmPassword) {
            alert("Passwords don't match")
            return;         // stop whole function
        }
        signUpStart({ displayName, email, password })


        // BEFORE USING user.sagas:
        // try {
        //     const { user } = await auth.createUserWithEmailAndPassword (
        //         email, 
        //         password
        //     )   
        //     await createUserProfileDocument(user, { displayName })      // displayName is a object, so you must use { }
            
        //     this.setState({                 // clear form
        //         displayName:'',
        //         email: '',
        //         password: '',
        //         confirmPassword: ''
        //     })
        // } catch (error) {
        //     console.error(error)
        // }
    }

    // render() {
        // const { displayName, email, password, confirmPassword } = this.state
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>

                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        onChange={handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton className='button' type="submit"> Sign Up </CustomButton>
                </form>

            </div>
        );
    // }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(
    null,
    mapDispatchToProps
)(SignUp);
