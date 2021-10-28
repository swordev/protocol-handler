import { protocol as rdpProtocol } from "./rdp-handler";

export const protocols = [rdpProtocol] as const;
export type ProtocolType = typeof protocols[number];
