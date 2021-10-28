import { exec } from "../util/cli-util";
import {
  register as _register,
  unregister as _unregister,
} from "../util/protocol-util";
import { normalize } from "path";
import { URL } from "url";

export const protocol = "rdp";

export async function register() {
  const openPath = normalize(`${__dirname}/../../scripts/open.vbs`);
  await _register({
    name: protocol,
    description: "Remote Desktop Connection",
    command: `wscript "${openPath}" "%1"`,
    icon: `${process.env["WINDIR"]}\\mstsc.exe`,
    log: true,
  });
}

export async function unregister() {
  await _unregister({ name: protocol });
}

export async function open(url: URL) {
  const mstscBin = "mstsc";
  const cmdkeyBin = "cmdkey";
  if (url.username)
    await exec(
      cmdkeyBin,
      [`/generic:"${url.host}"`, `/user:"${url.username}`],
      {
        shell: true,
      }
    );
  await exec(mstscBin, [`/v:${url.host}`], {
    detached: true,
    stdio: "ignore",
  });
  if (url.username) {
    await new Promise<void>((resolve) => {
      setTimeout(async () => {
        await exec(cmdkeyBin, [`/delete:"${url.host}"`]);
        resolve();
      }, 1_000);
    });
  }
}
