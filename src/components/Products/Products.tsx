import React, { useEffect, useState, ReactText } from "react";
import { Row, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IProduct, RootState } from "../../store/types";
import { getProductList } from "../../store/reducer/products/products";
import Loader from "react-loader-spinner";
import Product from "./Product/Product";
import { addToCart } from "../../store/reducer/cart/cart";

export type HandleAddToCartEvent = (
  product: IProduct,
  quantity: ReactText
) => void;

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const [renderedList, setRenderedList] = useState<IProduct[]>([]);
  const products = useSelector<RootState, IProduct[]>(
    (state) => state.products.list
  );

  const seacrhedProducts = useSelector<RootState, IProduct[] | null>(
    (state) => state.products.searchedList
  );

  const loading = useSelector<RootState, boolean>(
    (state) => state.products.loading
  );

  const filteredCategory = useSelector<RootState, string | null>(
    (state) => state.products.filteredCategory
  );

  useEffect(() => {
    if (filteredCategory) {
      seacrhedProducts
        ? setRenderedList(
            seacrhedProducts.filter((product) =>
              product.category.includes(filteredCategory)
            )
          )
        : setRenderedList(
            products.filter((product) =>
              product.category.includes(filteredCategory)
            )
          );
    } else {
      seacrhedProducts
        ? setRenderedList(seacrhedProducts)
        : setRenderedList(products);
    }
  }, [products, seacrhedProducts, filteredCategory]);

  useEffect(() => {
    dispatch(getProductList());
  }, [getProductList]);

  const handleAddToCart: HandleAddToCartEvent = (
    product: IProduct,
    quantity: ReactText
  ) => {
    if (!quantity.toString().length) return;

    dispatch(addToCart({ product, quantity: parseInt(quantity.toString()) }));

    notification["success"]({
      message: `${quantity} ${product.name} added to cart`,
      placement: "topLeft",
      duration: 2,
      closeIcon: <></>,
    });
  };

  if (loading)
    return (
      <Row align="middle" justify="center">
        <Loader type="TailSpin" color="#68b423" height={100} width={100} />
      </Row>
    );
  else {
    console.log(products);
    return (
      <Row gutter={[16, 16]} justify="center">
        {renderedList.length ? (
          renderedList.map(({ id, name, price, image, category }) => (
            <Product
              key={id}
              id={id}
              name={name}
              price={price}
              image={image}
              category={category}
              handleAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <div className="centerized">
            <img
              src="https://res.cloudinary.com/sivadass/image/upload/v1494699523/icons/bare-tree.png"
              alt="empty"
            />
          </div>
        )}
      </Row>
    );
  }
};

export default Products;
