import { NextApiRequest, NextApiResponse } from "next";

// 내가 필요할때마다 지속적으로 revalidation 할수있다 =
// ondemand revalidation
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate('/')
    res.json({
        success: true,
        message: "모든 데이터가 갱신되었습니다.",
        timestemp: new Date().toISOString(),
        path: '/'
    });
  } catch {
    return res.status(500).json({
        success: false,
        message: "api 요청 실패",
    })
  }
}
