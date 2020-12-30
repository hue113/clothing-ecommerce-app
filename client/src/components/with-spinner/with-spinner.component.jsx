import React from 'react'
import Spinner from '../spinner/spinner.component'
// import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles'

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />
}

// const WithSpinner = (WrappedComponent) => {
//     const Spinner = ({ isLoading, ...otherProps }) => {
//         return isLoading 
//             ? <SpinnerOverlay>
//                 <SpinnerContainer />
//             </SpinnerOverlay>

//             : <WrappedComponent {...otherProps} />
//     }
//     return Spinner
// }

export default WithSpinner