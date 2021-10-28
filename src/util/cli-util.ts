import { spawn, SpawnOptions } from "child_process";

export async function exec(
  name: string,
  args: string[],
  options?: SpawnOptions,
  settings: {
    log?: boolean;
  } = {}
) {
  return new Promise((resolve, reject) => {
    const p = spawn(name, args, options ?? {});
    if (settings.log) console.info(`+ ${name} ${args.join(" ")}`);
    let stdout = "";
    let stderr = "";
    p.on("error", reject);
    p.stdout?.on("data", (chunk: Buffer) => {
      const str = chunk.toString();
      if (settings.log) console.info(str);
      stdout += str;
    });
    p.stderr?.on("data", (chunk: Buffer) => {
      const str = chunk.toString();
      if (settings.log) console.info(str);
      stderr += str;
    });

    if (options?.detached) {
      p.unref();
      resolve("");
    } else {
      p.on("exit", (exitCode) =>
        exitCode
          ? reject(new Error(`Exit code: ${exitCode} (${stderr})`))
          : resolve(stdout)
      );
    }
  });
}
