import React, { ChangeEvent, useState } from "react";
import { Col, Card, Button, Input, Row } from "antd";
import { IProduct } from "../../../store/types";
import styles from "./Product.module.scss";
import {
  PlusOutlined,
  MinusOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { HandleAddToCartEvent } from "../Products";

const { Meta } = Card;

interface ProductProp extends IProduct {
  handleAddToCart: HandleAddToCartEvent;
}

const Product: React.FC<ProductProp> = ({
  id,
  name,
  price,
  image,
  category,
  handleAddToCart,
}) => {
  const [value, setValue] = useState<number | string>(1);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    if (!input.length) return setValue("");
    if (isNaN(parseInt(input)) || parseInt(input) < 1) return;
    setValue(parseInt(input));
  };

  return (
    <Col xs={12} md={8} lg={6}>
      <Card
        hoverable
        className={styles.products_card}
        cover={<img alt="product" src={image} />}
      >
        <Meta
          className={styles.products_desc}
          title={name}
          description={`$${price}`}
        />
        <Row
          className={styles.products_control}
          gutter={[8, 8]}
          align="middle"
          justify="center"
        >
          <Col span={6} className="centerized">
            <Button
              type="primary"
              shape="circle"
              icon={<MinusOutlined key="minus" />}
              onClick={() => (value > 1 ? setValue(+value - 1) : null)}
            ></Button>
          </Col>
          <Col span={12} className="centerized">
            <Input
              value={value}
              style={{ textAlign: "center" }}
              onChange={handleInputChange}
            ></Input>
          </Col>
          <Col span={6} className="centerized">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined key="plus" />}
              onClick={() => (value < 99 ? setValue(+value + 1) : null)}
            ></Button>
          </Col>
        </Row>
        <Row className={styles.products_addbtn} align="middle" justify="center">
          <Button
            type="primary"
            icon={<ShoppingCartOutlined key="addtocart" />}
            onClick={() =>
              handleAddToCart({ id, name, price, image, category }, value)
            }
          >
            ADD TO CART
          </Button>
        </Row>
      </Card>
    </Col>
  );
};

export default Product;
