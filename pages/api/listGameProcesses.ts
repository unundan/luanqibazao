// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ListGameProcessResult } from "../../common/api_types";
import { listGameProcess } from "../../server/gameServerManager";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListGameProcessResult>
) {
  listGameProcess().then((processList) => {
    res.status(200).json({ gameProcesses: processList });
  });
}
