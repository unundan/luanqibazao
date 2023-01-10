import React from "react";
import { GameProcess, ServerStatus, ServerType } from "../common/server_types";
import { Card } from "antd";
import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import {
  listArchives,
  listGameProcesses,
  startServer,
  stopServer,
} from "./font_api";
import { AppState, wapper } from "../front_common/store";
import { connect, useSelector } from "react-redux";

interface ServerSpan {
  props: {
    server: GameProcess;
  };
}

class ServerSpan extends React.Component {
  constructor(props: ArchiveCardProp) {
    super(props);
  }
  startServer = async () => {
    const result = await startServer(
      this.props.server.archive,
      this.props.server.serverType
    );
    console.debug(result);
  };
  stopServer = async () => {
    const result = await stopServer(
      this.props.server.archive,
      this.props.server.serverType
    );
    console.debug(result);
  };
  render() {
    switch (this.props.server.serverStatus) {
      case ServerStatus.Running: {
        return (
          <span>
            <span style={{ color: "green" }}>
              {ServerType[this.props.server.serverType]} 运行中
            </span>
            &nbsp;
            <span style={{ color: "red" }}>
              <PauseCircleOutlined onClick={this.stopServer} />
            </span>
          </span>
        );
      }
      default: {
        return (
          <span>
            <span style={{ color: "red" }}>
              {ServerType[this.props.server.serverType]} 已停止
            </span>
            &nbsp;
            <span style={{ color: "green" }}>
              <PlayCircleOutlined onClick={this.startServer} />
            </span>
          </span>
        );
      }
    }
  }
}

export type ArchiveCardProp = {
  servers: GameProcess[];
  archive: string;
};
interface ArchiveCard {
  props: ArchiveCardProp;
  archive: string;
}

class ArchiveCard extends React.Component {
  constructor(props: ArchiveCardProp) {
    super(props);
  }
  render(): React.ReactNode {
    let serverSpans;
    if (this.props.servers.length) {
      serverSpans = this.props.servers.map((v) => {
        return (
          <ServerSpan
            key={`${v.archive}_${v.serverType}`}
            server={v}
          ></ServerSpan>
        );
      });
    } else {
      serverSpans = (
        <ServerSpan
          key={`${this.props.archive}_`}
          server={{
            archive: this.archive,
            serverType: ServerType.Master,
            parentPort: 0,
            pid: 0,
            serverStatus: ServerStatus.Stopped,
          }}
        ></ServerSpan>
      );
    }
    return (
      <Card
        key={this.props.archive}
        title={this.props.archive}
        bordered={false}
        style={{
          width: 300,
          margin: "0.5rem",
          display: "inline-block",
        }}
      >
        {serverSpans}
      </Card>
    );
  }
}

function ArchiveCardGroups() {
  const gameProcesses = useSelector(
    (state: AppState) => state.gameProcesses.value.servers
  );
  const archives = useSelector((state: AppState) => state.archives.value);
  return archives.map((archiveName) => {
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
  });
}
export default ArchiveCardGroups;
