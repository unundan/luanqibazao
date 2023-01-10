// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ServerType } from "../../common/serverTypes";
import { stopServer } from "../../server/gameServerManager";

type Data = {
  success: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const serverType =
      ServerType[req.query["serverType"] as keyof typeof ServerType] ||
      ServerType.Master;
    await stopServer(String(req.query["archive"]), serverType);
    res.status(200).json({ success: true });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(200).json({ success: false, message: e.toString() });
    }
    return res.status(200).json({ success: false, message: "unknown error" });
  }
}
