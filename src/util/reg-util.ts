import { exec } from "./cli-util";

export async function delReg(options: { key: string; log?: boolean }) {
  await exec(
    "reg",
    ["delete", options.key, "/f"],
    {},
    {
      log: options.log,
    }
  );
}
export async function addReg(options: {
  key: string;
  value?: string;
  type?: string;
  data?: string;
  log?: boolean;
}) {
  await exec(
    "reg",
    [
      "add",
      options.key,
      "/f",
      ...(options.value ? ["/v", options.value] : []),
      ...(options.type ? ["/t", options.type] : []),
      ...(options.data ? ["/d", options.data] : []),
    ],
    {},
    {
      log: options.log,
    }
  );
}
