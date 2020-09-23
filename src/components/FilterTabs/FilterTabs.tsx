import React from "react";
import { Row, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/types";
import { getFilteredCategory } from "../../store/reducer/products/products";

const FilterTabs = () => {
  const dispatch = useDispatch();
  const categories = useSelector<RootState, string[]>((state) =>
    state.products.list.reduce((acc, { category }) => {
      if (!acc.includes(category)) acc.push(category);
      return acc;
    }, [] as string[])
  );

  return (
    <Row style={{ marginTop: 24 }} align="middle" justify="center">
      <Tabs
        defaultActiveKey=""
        onChange={(key) => dispatch(getFilteredCategory(key))}
      >
        <Tabs.TabPane tab="ALL" key=""></Tabs.TabPane>
        {categories.map((category) => (
          <Tabs.TabPane
            tab={category.toUpperCase()}
            key={category}
          ></Tabs.TabPane>
        ))}
      </Tabs>
    </Row>
  );
};

export default FilterTabs;
