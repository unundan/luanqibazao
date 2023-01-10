// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ListArchivesResult } from "../../common/api_types";
import { listArchive } from "../../server/gameServerManager";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListArchivesResult>
) {
  listArchive().then((archiveList) => {
    res.status(200).json({ archives: archiveList });
  });
}
