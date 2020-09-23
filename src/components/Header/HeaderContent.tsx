import React, { ChangeEvent } from "react";
import { Col, Row, Input, Badge, Button, Popover, Affix } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./HeaderContent.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  renderSearchedProducts,
  resetSearchedProducts,
} from "../../store/reducer/products/products";
import { RootState } from "../../store/types";
import Cart from "../Cart/Cart";

const HeaderContent: React.FC = () => {
  const dispatch = useDispatch();

  const cartTotalItems = useSelector<RootState, number>((state) =>
    state.cart.list.reduce(
      (acc, currProduct) => (acc += currProduct.quantity),
      0
    )
  );

  const cartTotalPrice = useSelector<RootState, number>((state) =>
    state.cart.list.reduce(
      (acc, currProduct) => (acc += currProduct.price * currProduct.quantity),
      0
    )
  );

  const handleSearchedInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    !value.length
      ? dispatch(resetSearchedProducts())
      : dispatch(renderSearchedProducts(value));
  };

  return (
    <div className="container">
      <Row className={styles.header_content} align="middle" gutter={[24, 24]}>
        <Col span={5}>
          <img
            src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png"
            alt="logo"
          />
        </Col>
        <Col span={16} className="centerized">
          <Input.Search
            className={styles.search_bar}
            placeholder="Search for vegetables and fruits"
            size="large"
            onChange={handleSearchedInput}
            enterButton
          />
        </Col>
        <Col span={3} className="centerized">
          <Popover
            title={`TOTAL: $${cartTotalPrice}`}
            content={<Cart />}
            trigger="click"
          >
            <Badge count={cartTotalItems} showZero>
              <Button size="large" icon={<ShoppingCartOutlined />}></Button>
            </Badge>
          </Popover>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderContent;
