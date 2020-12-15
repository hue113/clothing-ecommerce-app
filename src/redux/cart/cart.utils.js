export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        item => item.id === cartItemToAdd.id
    )

    // check if item is found in array (means add more than 1 quantity)
    if(existingCartItem) {
        return cartItems.map(item => 
            item.id === cartItemToAdd.id
                ? {...item, quantity: item.quantity +1 }
                : {item}        // means no modification to item
        )
    }

    // if item is not found in array, we will return the original cartItems and add base quantity =1
    return [...cartItems, {...cartItemToAdd, quantity: 1}] 

}