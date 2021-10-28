#!/usr/bin/env node
import cli from "./cli";

(async function main() {
  (await cli()).parse(process.argv);
})();
