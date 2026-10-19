
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    // Convert a price such as "$15" into the number 15.
    const getPrice = (item) => {
        return Number(String(item.cost).replace(/[^0-9.]/g, '')) || 0;
    };

    // Calculate the total amount for every product in the cart.
    const calculateTotalAmount = () => {
        return cart.reduce(
            (total, item) => total + getPrice(item) * item.quantity,
            0
        ).toFixed(2);
    };

    // Return to the plant catalogue.
    const handleContinueShopping = (e) => {
        e.preventDefault();

        if (onContinueShopping) {
            onContinueShopping();
        }
    };

    // Increase the quantity of a plant.
    const handleIncrement = (item) => {
        dispatch(
            updateQuantity({
                name: item.name,
                quantity: item.quantity + 1
            })
        );
    };

    // Decrease the quantity of a plant.
    const handleDecrement = (item) => {
        const newQuantity = item.quantity - 1;

        if (newQuantity <= 0) {
            dispatch(removeItem(item.name));
        } else {
            dispatch(
                updateQuantity({
                    name: item.name,
                    quantity: newQuantity
                })
            );
        }
    };

    // Remove a plant from the cart.
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // Calculate the cost for an individual product.
    const calculateTotalCost = (item) => {
        return (getPrice(item) * item.quantity).toFixed(2);
    };

    // Simple checkout feedback for this prototype.
    const handleCheckout = () => {
        if (cart.length === 0) {
            window.alert('Your cart is empty. Please add some plants first.');
            return;
        }

        window.alert(
            `Thank you for shopping at Paradise Nursery! Your total is $${calculateTotalAmount()}.`
        );
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>
                Shopping Cart
            </h2>

            <h3 style={{ color: 'black' }}>
                Total Cart Amount: ${calculateTotalAmount()}
            </h3>

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty.</p>
                    <p>Discover our plants and find something you love!</p>

                    <button
                        className="get-started-button"
                        onClick={handleContinueShopping}
                    >
                        Browse Plants
                    </button>
                </div>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div className="cart-item" key={item.name}>
                            <img
                                className="cart-item-image"
                                src={item.image}
                                alt={item.name}
                            />

                            <div className="cart-item-details">
                                <div className="cart-item-name">
                                    {item.name}
                                </div>

                                <div className="cart-item-cost">
                                    Price: {item.cost}
                                </div>

                                <div className="cart-item-quantity">
                                    <button
                                        type="button"
                                        className="cart-item-button cart-item-button-dec"
                                        onClick={() => handleDecrement(item)}
                                        aria-label={`Decrease ${item.name} quantity`}
                                    >
                                        -
                                    </button>

                                    <span className="cart-item-quantity-value">
                                        {item.quantity}
                                    </span>

                                    <button
                                        type="button"
                                        className="cart-item-button cart-item-button-inc"
                                        onClick={() => handleIncrement(item)}
                                        aria-label={`Increase ${item.name} quantity`}
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="cart-item-total">
                                    Total: ${calculateTotalCost(item)}
                                </div>

                                <button
                                    type="button"
                                    className="cart-item-delete"
                                    onClick={() => handleRemove(item)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div
                style={{ marginTop: '20px', color: 'black' }}
                className="total_cart_amount"
            >
                {cart.length > 0 && (
                    <strong>
                        Order Total: ${calculateTotalAmount()}
                    </strong>
                )}
            </div>

            <div className="continue_shopping_btn">
                <button
                    type="button"
                    className="get-started-button"
                    onClick={handleContinueShopping}
                >
                    Continue Shopping
                </button>

                <button
                    type="button"
                    className="get-started-button1"
                    onClick={handleCheckout}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default CartItem;
