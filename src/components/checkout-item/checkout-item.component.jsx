import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ item }) => {
  const { name, price, quantity, imageUrl } = item;

  const { addItemToCart, removeItemFromCart, deleteItemFromCart } =
    useContext(CartContext);

  const removeItemHandler = () => removeItemFromCart(item);
  const addItemHandler = () => addItemToCart(item);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>

      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div onClick={() => deleteItemFromCart(item)} className="remove-button">
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
