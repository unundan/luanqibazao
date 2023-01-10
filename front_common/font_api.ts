import { ListArchivesResult, ListGameProcessResult } from "../common/api_types";
import { GameProcess, ServerType } from "../common/server_types";

function getUrl(url: string, params?: Record<string, string>) {
  if (params === undefined) {
    return url;
  }
  return `${url}?${new URLSearchParams(params)}`;
}

export async function startServer(archive: string, serverType: ServerType) {
  const result = await fetch(
    getUrl("api/startServer", {
      archive,
      serverType: ServerType[serverType],
    })
  );
  return result.json();
}

export async function stopServer(archive: string, serverType: ServerType) {
  const result = await fetch(
    getUrl("api/stopServer", {
      archive,
      serverType: ServerType[serverType],
    })
  );
  return result.json();
}

export async function listArchives(): Promise<ListArchivesResult> {
  const result = await fetch(getUrl("api/listArchives"));
  return result.json();
}
export async function listGameProcesses(): Promise<ListGameProcessResult> {
  const result = await fetch(getUrl("api/listGameProcesses"));
  return result.json();
}
