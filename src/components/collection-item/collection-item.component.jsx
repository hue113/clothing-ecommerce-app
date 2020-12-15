import React from 'react'
import { connect } from 'react-redux'

import CustomButton from '../custom-button/custom-button.component'
import { addItem } from '../../redux/cart/cart.actions'
import './collection-item.styles.scss'

const CollectionItem = ({ item, addItem}) => {
    const { name, imageUrl, price } = item
    
    return (
        <div className="collection-item">
            <div
                className="image"
                style={{
                    background: `url(${imageUrl})`
                }}
            />
            <div className="collection-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <CustomButton onClick={() => addItem(item) } inverted>Add To Cart</CustomButton>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: (item) => dispatch(addItem(item))
})

export default connect(
    null,                   // because there is no mapStateToProps
    mapDispatchToProps
)(CollectionItem)
