import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CollectionOverview from '../../components/collections-overview/collections-overview.component.jsx';
import CollectionPage from '../collection/collection.component.jsx';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import './shop.styles.scss'
import { updateCollections } from '../../redux/shop/shop.actions'
import WithSpinner from '../../components/with-spinner/with-spinner.component.jsx';



const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
    state = {       
        loading: true               // write like this --> don't have to write constructor
    }

    unsubscribeFromSnapShot = null;

    componentDidMount() {
        const  { updateCollections } = this.props
        const collectionRef = firestore.collection('collections')
        // console.log('collectionRef', collectionRef)
        
        this.unsubscribeFromSnapShot = collectionRef.onSnapshot(async snapshot => {
            // console.log('snapshot', snapshot)
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            // console.log(collectionsMap)
            updateCollections(collectionsMap)
            this.setState({ loading: false })
        })
    }

    // componentWillUnmount() { 
    //     this.unsubscribeFromSnapShot()
    // }

    render() {
        const { match } = this.props
        const { loading } = this.state

        return (
            <div className="shop-page">
                <Route 
                    exact 
                    path={`${match.path}`} 
                    render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>} 
                />
                <Route 
                    path={`${match.path}/:collectionId`} 
                    render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />}
                />
                
                {/* BEFORE USING SPINNER: */}
                {/* <Route exact path={`${match.path}`} component={CollectionOverview}/> */}
                {/* <Route path={`${match.path}/:collectionId`} component={CollectionPage}/> */}
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(
    null,
    mapDispatchToProps
)(ShopPage)
