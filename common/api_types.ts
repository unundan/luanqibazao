import { GameProcess } from "./server_types";

export type ListGameProcessResult = {
  gameProcesses: GameProcess[];
};

export type ListArchivesResult = {
  archives: string[];
};
