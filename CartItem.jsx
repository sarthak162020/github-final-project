import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncrease = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const calculateTotalCart = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px"
              }}
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px"
                }}
              />

              {/* Product Details */}
              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Item Total: ${item.price * item.quantity}
                </p>
              </div>

              {/* Action Buttons */}
              <div>
                <button onClick={() => handleIncrease(item)}>+</button>
                <button onClick={() => handleDecrease(item)}>-</button>
                <button
                  onClick={() => handleRemove(item.id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total Cart Amount */}
          <h3>Total Cart Amount: ${calculateTotalCart()}</h3>
        </>
      )}
    </div>
  );
}

export default CartItem;
