import React from "react";
import { Layout, BackTop, Button } from "antd";
import { UpOutlined } from "@ant-design/icons";
import Products from "./components/Products/Products";
import HeaderContent from "./components/Header/HeaderContent";
import FilterTabs from "./components/FilterTabs/FilterTabs";

const { Header } = Layout;

const App: React.FC = () => {
  return (
    <>
      <Layout>
        <Header className="header">
          <HeaderContent />
        </Header>
      </Layout>
      <div className="container">
        <FilterTabs />
      </div>
      <div className="container content">
        <Products />
      </div>
      <BackTop>
        <Button size="large" shape="circle" icon={<UpOutlined />} />
      </BackTop>
    </>
  );
};

export default App;
