import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const prerender = false;

export const load: PageServerLoad = async ({ platform }) => {
  const worker = platform?.env?.worker;
  if (!worker) {
    error(500, "Worker not found in environment");
  }
  return {
    hello: worker.hello(),
  };
};
