import React from "react";
import { GameProcess, ServerStatus, ServerType } from "../common/serverTypes";
import { Card } from "antd";
import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import {
  listArchives,
  listGameProcesses,
  startServer,
  stopServer,
} from "./font_api";

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

type ArchiveCardGroupsProp = {
  archives: string[];
  gameProcess: GameProcess[];
};
type ArchiveCardGroupsState = ArchiveCardGroupsProp;
interface ArchiveCardGroups {
  props: ArchiveCardGroupsProp;
  state: ArchiveCardGroupsState;
}

class ArchiveCardGroups extends React.Component {
  constructor(props: ArchiveCardGroupsProp) {
    super(props);
  }
  ComponentDidMount() {
    setInterval(async () => {
      const res1 = await listArchives();
      const res2 = await listGameProcesses();
      this.setState({
        archives: res1.archives,
        gameProcess: res2.gameProcesses,
      });
    }, 2000);
  }
  render() {
    return this.props.archives.map((archiveName) => {
      const serverProcesses = this.props.gameProcess.filter(
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
  //   static async getServerSideProps() {
  //     return {
  //       props: {
  //         archives: await listArchive(),
  //         gameProcess: await listGameProcess(),
  //       },
  //     };
  //   }
}

export default ArchiveCardGroups;
