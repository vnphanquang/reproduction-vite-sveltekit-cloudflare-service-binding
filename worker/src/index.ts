import { WorkerEntrypoint } from "cloudflare:workers";

export default class extends WorkerEntrypoint {
  override async fetch() {
    return new Response("Hello from Worker B");
  }

  hello() {
    return "hello";
  }
}
