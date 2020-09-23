import React from "react";
import { List } from "antd";
import { useSelector } from "react-redux";
import { IProductInCart, RootState } from "../../store/types";
import styles from "./Cart.module.scss";
import Item from "./Item/Item";

const Cart: React.FC = () => {
  const inCartProducts = useSelector<RootState, IProductInCart[]>(
    (state) => state.cart.list
  );

  return (
    <div className={styles.cart_wrapper}>
      <List
        dataSource={inCartProducts}
        renderItem={({ id, name, image, price, category, quantity }) => (
          <Item
            id={id}
            name={name}
            image={image}
            price={price}
            category={category}
            quantity={quantity}
          />
        )}
        className={styles.cart_body}
      ></List>
    </div>
  );
};

export default Cart;
