import { exec, spawn } from "child_process";
import path, { resolve } from "path";
import * as fs from "fs";
import { GameProcess, ServerStatus, ServerType } from "../common/serverTypes";

const gameShell = "dontstarve_dedicated_server_nullrenderer_x64";
const gameDir = "";


const processMap: Map<string, Map<ServerType, ServerStatus>> = new Map();

function getProcessStatus(archive: string, serverType: ServerType) :ServerStatus {
  let serverStatus = processMap.get(archive)?.get(serverType);
  if (serverStatus === undefined) {
    serverStatus = ServerStatus.Running;
    setProcessStatus(archive, serverType, serverStatus);
  }
  return serverStatus;
}
function setProcessStatus(archive: string, serverType: ServerType, serverStatus: ServerStatus) {
  let archveMap = processMap.get(archive);
  if (archveMap === undefined) {
    archveMap = new Map();
    processMap.set(archive, archveMap);
  }
  archveMap.set(serverType, serverStatus);
}
export function listGameProcess(): Promise<GameProcess[]> {
  return new Promise((resolve, reject) => {
    exec(`ps h -C ${gameShell} -o pid,cmd`, (err, stdout, stderr) => {
      if (err !== null) {
        if (err.code === 1 && err.killed === false) {
          return resolve([]);
        }
        return reject(err);
      }
      const processList = stdout.trim().split("\n");
      const gameProcessList: GameProcess[] = processList.map((command) => {
        const commandArgs = command.split(" ");
        const archive = commandArgs[4];
        const serverType = ServerType[commandArgs[8] as keyof typeof ServerType];
        let serverStatus = getProcessStatus(archive, serverType);
        return {
          pid: parseInt(commandArgs[0], 10),
          archive,
          serverType,
          parentPort: parseInt(commandArgs[6], 10),
          serverStatus,
        };
      });
      resolve(gameProcessList);
    });
  });
}

const userHome = "/root";
const archiveDir = path.resolve(userHome, ".klei", "DoNotStarveTogether");
const serverBin = "/root/DSTDedicatedServer/bin64";

export async function listArchive(): Promise<string[]> {
  const files = await fs.promises.readdir(archiveDir, { withFileTypes: true });
  return files
    .filter((direct) => {
      return direct.isDirectory();
    })
    .map((direct) => {
      return direct.name;
    });
}

async function getGameActiveProcess(
  archiveName: string,
  serverType: ServerType
): Promise<GameProcess | undefined> {
  const gameProcesses = await listGameProcess();
  const gameProcess = gameProcesses.find(
    (v) => v.archive === archiveName && v.serverType === serverType
  );
  const processStatus = processMap.get(archiveName)?.get(serverType);
  if (processStatus === ServerStatus.Running) {
    return gameProcess;
  }
}

export async function stopServer(
  archiveName: string,
  serverType: ServerType
): Promise<boolean> {
  const gameProcess = await getGameActiveProcess(archiveName, serverType);
  if (!gameProcess || gameProcess.serverStatus !== ServerStatus.Running) {
    throw new Error(`${archiveName} is not running!!`);
  }
  return new Promise((resolve, reject) => {
    exec(`kill -3 ${gameProcess.pid}`, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve(true);
    });
  });
}

export async function startServer(
  archiveName: string,
  serverType: ServerType
): Promise<boolean> {
  const gameProcess = await getGameActiveProcess(archiveName, serverType);
  if (gameProcess && gameProcess.serverStatus !== ServerStatus.Stopped) {
    throw new Error(`${archiveName} is running!!`);
  }
  const archives = await listArchive();
  if (!archives.includes(archiveName)) {
    throw new Error(`${archiveName} archive not exists!!`);
  }
  const archivePath = path.resolve(archiveDir, archiveName);
  const outLogger = fs.createWriteStream(path.join(archivePath, "server.log"));
  outLogger.on("error", console.error);
  const errLogger = fs.createWriteStream(path.join(archivePath, "err.log"));
  errLogger.on("error", console.error);

  const processHandel = spawn(
    "./dontstarve_dedicated_server_nullrenderer_x64",
    [
      `-console`,
      `-cluster`,
      archiveName,
      `-monitor_pa_process`,
      process.pid.toString(),
      `-shard ${ServerType[serverType]}`,
    ],
    {
      cwd: serverBin,
      detached: true,
    }
  );
  setProcessStatus(archiveName, serverType, ServerStatus.Running);
  processHandel.stdout.pipe(outLogger);
  processHandel.stderr.pipe(errLogger);
  processHandel.on('exit', () => {
    outLogger.end();
    errLogger.end();
  });
  return true;
}
