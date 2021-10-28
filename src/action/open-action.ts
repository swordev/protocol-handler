import * as rdp from "./../handler/rdp-handler";
import { URL } from "url";

export async function openAction(options: { url: URL }) {
  const protocol = options.url.protocol.slice(0, -1);
  if (protocol === rdp.protocol) {
    await rdp.open(options.url);
  } else {
    throw new Error(`Protocol not found: ${options.url.protocol}`);
  }
}
