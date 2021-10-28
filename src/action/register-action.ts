import type { ProtocolType } from "../handler";
import * as rdp from "./../handler/rdp-handler";

export async function registerAction(protocols?: ProtocolType[]) {
  if (protocols?.includes(rdp.protocol)) await rdp.register();
}
