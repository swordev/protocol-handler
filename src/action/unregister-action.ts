import type { ProtocolType } from "../handler";
import * as rdp from "./../handler/rdp-handler";

export async function unregisterAction(protocols?: ProtocolType[]) {
  if (protocols?.includes(rdp.protocol)) await rdp.unregister();
}
