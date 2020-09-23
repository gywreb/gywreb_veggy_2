import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, List } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteFromCart,
  quantityDecrease,
  quantityIncrease,
} from "../../../store/reducer/cart/cart";
import { IProductInCart } from "../../../store/types";
import styles from "./Item.module.scss";

const Item: React.FC<IProductInCart> = ({
  id,
  name,
  image,
  price,
  category,
  quantity,
}) => {
  const dispatch = useDispatch();
  return (
    <List.Item
      key={id}
      actions={[
        <Button
          icon={<DeleteOutlined />}
          onClick={() => dispatch(deleteFromCart(id))}
        ></Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={image} />}
        title={name}
        description={`$${price} - ${category}`}
      />
      <Button.Group style={{ paddingLeft: 20 }}>
        <Button
          icon={<MinusOutlined />}
          onClick={() => dispatch(quantityDecrease(id))}
        ></Button>
        <Button className={styles.quantity}>{quantity}</Button>
        <Button
          icon={<PlusOutlined />}
          onClick={() => dispatch(quantityIncrease(id))}
        ></Button>
      </Button.Group>
    </List.Item>
  );
};

export default Item;
