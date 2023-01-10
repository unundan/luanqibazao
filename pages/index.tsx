import React from "react";
import { GetServerSideProps } from "next";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";
import { LaptopOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";

import { GameProcess } from "../common/serverTypes";
import ArchiveCardGroups from "../common/archive_card";
import { listArchive, listGameProcess } from "../server/gameServerManager";

import { Provider } from "react-redux";
import store from "../common/store";

dayjs.locale("zh-cn");

const { Header, Content, Sider } = Layout;

const items1: MenuProps["items"] = [
  {
    key: 1,
    label: "主页",
  },
];

const items2: MenuProps["items"] = [
  {
    key: "1",
    icon: React.createElement(LaptopOutlined),
    label: "服务管理",
  },
];

const App: React.FC<{ archives: string[]; gameProcesses: GameProcess[] }> = ({
  archives,
  gameProcesses: gameProcess,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Provider store={store}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
          />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
            />
          </Sider>
          <Layout style={{ padding: "1em" }}>
            <Content>
              <ArchiveCardGroups
                archives={archives}
                gameProcess={gameProcess}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Provider>
  );
};

export default App;

export const getServerSideProps: GetServerSideProps = async (content) => {
  return {
    props: {
      archives: await listArchive(),
      gameProcesses: await listGameProcess(),
    },
  };
};
