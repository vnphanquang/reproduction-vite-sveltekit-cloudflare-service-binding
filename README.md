# Reproduction: Service binding with SvelteKit + Cloudflare Worker (Vite Plugin)

## Setup Information

Sveltekit app was bootstrapped with using `sv` (using the "demo" template).

```bash
pnpm dlx sv create .
```

Cloudflare worker was bootstrapped following guide at [Cloudflare > Products > Workers > Vite plugin > Get started](https://developers.cloudflare.com/workers/vite-plugin/get-started/).

## System Information

Output of `pnpm dlx envinfo --system --binaries --browsers --npmPackages "{wrangler,@cloudflare/*,vite}"` in `./worker`:

```raw
  System:
    OS: Linux 6.12 Arch Linux
    CPU: (4) x64 Intel(R) Core(TM) i5-4590 CPU @ 3.30GHz
    Memory: 7.66 GB / 15.56 GB
    Container: Yes
    Shell: 4.0.2 - /usr/bin/fish
  Binaries:
    Node: 22.11.0 - ~/.volta/tools/image/node/22.11.0/bin/node
    Yarn: 4.5.1 - ~/.volta/tools/image/yarn/4.5.1/bin/yarn
    npm: 10.9.0 - ~/.volta/tools/image/node/22.11.0/bin/npm
    pnpm: 10.9.0 - ~/.volta/bin/pnpm
  Browsers:
    Chromium: 137.0.7151.55
  npmPackages:
    @cloudflare/vite-plugin: ^1.5.0 => 1.5.0
    @cloudflare/workers-types: ^4.20250604.0 => 4.20250604.0
    vite: ^6.3.5 => 6.3.5
    wrangler: ^4.19.1 => 4.19.1
```

Output of `pnpm dlx envinfo --system --binaries --browsers --npmPackages "{svelte,@sveltejs/*,vite}"` in `./sveltekit`:

```raw
  System:
    OS: Linux 6.12 Arch Linux
    CPU: (4) x64 Intel(R) Core(TM) i5-4590 CPU @ 3.30GHz
    Memory: 7.63 GB / 15.56 GB
    Container: Yes
    Shell: 4.0.2 - /usr/bin/fish
  Binaries:
    Node: 22.11.0 - ~/.volta/tools/image/node/22.11.0/bin/node
    Yarn: 4.5.1 - ~/.volta/tools/image/yarn/4.5.1/bin/yarn
    npm: 10.9.0 - ~/.volta/tools/image/node/22.11.0/bin/npm
    pnpm: 10.9.0 - ~/.volta/bin/pnpm
  Browsers:
    Chromium: 137.0.7151.55
  npmPackages:
    @sveltejs/adapter-cloudflare: ^7.0.0 => 7.0.3
    @sveltejs/kit: ^2.16.0 => 2.21.2
    @sveltejs/vite-plugin-svelte: ^5.0.0 => 5.1.0
    svelte: ^5.25.0 => 5.33.14
    vite: ^6.2.6 => 6.3.5
```

## Steps to reproduce

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the worker dev server using vite:

   ```bash
   cd worker
   pnpm dev
   ```

3. Start the SvelteKit dev server:

   ```bash
   cd sveltekit
   pnpm dev
   ```

4. Go to the Sveltekit app in your browser (likely at `http://localhost:5174`, but look for stdout in (3) for exact port).

5. Observe the error from stdout of the SvelteKit dev server:

   ```raw
   Error: Cannot access `hello` as we couldn't find a `wrangler dev` session for service "worker" to proxy to.
   ```

## Workaround

The service binding works if the worker dev server is started with wrangler instead of vite:

```
cd worker
pnpm wrangler dev
```

> [!IMPORTANT]
> the worker needs to be started before SvelteKit app, otherwise SvelteKit won't be able to find the worker service.

## Code of Interest

SvelteKit app calls the worker service in `sveltekit/src/routes/+page.server.ts`:
