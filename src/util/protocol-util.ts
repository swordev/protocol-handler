import { addReg, delReg } from "./reg-util";

export async function register(options: {
  name: string;
  description?: string;
  icon?: string;
  command: string;
  log?: boolean;
}) {
  await addReg({
    key: `HKCR\\${options.name}`,
    value: "",
    type: "REG_SZ",
    data: `URL:${options.description ?? ""}`,
    log: options.log,
  });

  await addReg({
    key: `HKCR\\${options.name}`,
    value: "URL Protocol",
    type: "REG_SZ",
    data: "",
    log: options.log,
  });

  if (options.icon)
    await addReg({
      key: `HKCR\\${options.name}\\DefaultIcon`,
      value: "",
      type: "REG_SZ",
      data: options.icon,
      log: options.log,
    });

  await addReg({
    key: `HKCR\\${options.name}\\shell\\open\\command`,
    value: "",
    type: "REG_SZ",
    data: options.command,
    log: options.log,
  });
}

export async function unregister(options: { name: string }) {
  await delReg({
    key: `HKCR\\${options.name}`,
  });
}
