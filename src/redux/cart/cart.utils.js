export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(item => item.id === cartItemToAdd.id)

    // check if item is found in array (means add more than 1 quantity)
    if(existingCartItem) {
        return cartItems.map(item => 
            item.id === cartItemToAdd.id
                ? {...item, quantity: item.quantity +1 }
                : item          // means no modification to item
                                // Don't put {item} with curly braces here.
                                // Because the result with the curly braces is a nested object rather than the object itself
        )
    }

    // if item is not found in array, we will return the original cartItems and add base quantity =1
    return [...cartItems, {...cartItemToAdd, quantity: 1}] 
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(item => item.id === cartItemToRemove.id)
    if(existingCartItem.quantity === 1) {
        return cartItems.filter(item => item.id !== cartItemToRemove.id)
    }
    return cartItems.map(
        item => item.id === cartItemToRemove.id
            ? {...item, quantity: item.quantity -1} 
            : item
    )
}