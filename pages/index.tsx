import React, { createContext } from "react";
import { GetServerSideProps } from "next";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "antd/dist/reset.css";
import { LaptopOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";

import { GameProcess } from "../common/server_types";
import ArchiveCardGroups, { ArchiveCard } from "../front_common/archive_card";
import { listArchive, listGameProcess } from "../server/gameServerManager";

import { connect, Provider, useDispatch, useSelector } from "react-redux";
import { AppState, wrapper } from "../front_common/store";
import { updateAll } from "../front_common/redux_slice/archive_card";
import { update } from "../front_common/redux_slice/archives";
import { AppProps } from "next/app";

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

const App: React.FC<AppProps> = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const gameProcesses = useSelector(
    (state: AppState) => state.gameProcesses.value
  );
  const archives = useSelector((state: AppState) =>
    state.archives.value);
  return (
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
            {archives.map((archiveName) => {
              const serverProcesses = gameProcesses.filter(
                (v) => v.archive == archiveName
              );
              return (
                <ArchiveCard
                  servers={serverProcesses}
                  archive={archiveName}
                  key={`${archiveName}`}
                ></ArchiveCard>
              );
            })}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (content) => {
    const archives = await listArchive();
    const gameProcesses = await listGameProcess();
    store.dispatch(updateAll(gameProcesses));
    store.dispatch(update(archives));
    return {
      props: {
        archives: await listArchive(),
        gameProcesses: await listGameProcess(),
      },
    };
  }
);
