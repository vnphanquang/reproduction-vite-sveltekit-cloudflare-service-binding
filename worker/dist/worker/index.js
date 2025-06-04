import { WorkerEntrypoint } from "cloudflare:workers";
class index extends WorkerEntrypoint {
  async fetch() {
    return new Response("Hello from Worker B");
  }
  hello() {
    return "world";
  }
}
export {
  index as default
};
