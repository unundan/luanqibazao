
export enum ServerType {
    Caves,
    Master,
  }
  
  export enum ServerStatus {
    Starting,
    Running,
    Stopping,
    Stopped,
  }
  export type GameProcess = {
    archive: string;
    serverType: ServerType;
    parentPort: number;
    pid: number;
    serverStatus: ServerStatus;
  };
  