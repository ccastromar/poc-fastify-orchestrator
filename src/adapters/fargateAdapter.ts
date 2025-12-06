
import axios from 'axios';
import {performance} from "node:perf_hooks";

export async function callFargate(
  operation: string,
  payload: Record<string, unknown>
): Promise<any> {
  const t0 = performance.now();
  const url = `${process.env.FARGATE_BASE_URL}/${operation}`;
  const res = await axios.post(url, payload);
  const t1 = performance.now();

  console.log({
    msg: "fargate_call",
    operation,
    latency_ms: (t1-t0).toFixed(1)
  });
  return res.data;
}
