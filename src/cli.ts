import { openAction } from "./action/open-action";
import { registerAction } from "./action/register-action";
import { unregisterAction } from "./action/unregister-action";
import { protocols, ProtocolType } from "./handler";
import { program } from "commander";
import { URL } from "url";

export function parseStringListOption(value: string) {
  return value.split(",").map((v) => v.trim());
}

export default async function () {
  program
    .command("register")
    .option(
      "-p,--protocols [values]",
      `Protocols (values: ${protocols.join(", ")})`,
      parseStringListOption,
      protocols as any
    )
    .action(async (options: { protocols: ProtocolType[] }) => {
      await registerAction(options.protocols);
    });
  program
    .command("unregister")
    .option(
      "-p,--protocols [values]",
      `Protocols (values: ${protocols.join(", ")})`,
      parseStringListOption,
      protocols as any
    )
    .action(async (options: { protocols: ProtocolType[] }) => {
      await unregisterAction(options.protocols);
    });
  program.command("open [url]").action(async (url: string) => {
    await openAction({
      url: new URL(url),
    });
  });
  return program;
}
