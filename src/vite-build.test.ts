import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("vite build configuration", () => {
  it("declares vite directly in package.json because runtime scripts invoke it", async () => {
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = JSON.parse(
      await readFile(packageJsonPath, "utf8"),
    ) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };

    const viteVersion =
      packageJson.dependencies?.vite ?? packageJson.devDependencies?.vite;

    expect(viteVersion).toBeTruthy();
  });

  it("wires both Vinext and Nitro plugins into the root Vite config", async () => {
    const configModule = await import("../vite.config");
    const config = configModule.default;
    const plugins = (config.plugins ?? []).flatMap((plugin) =>
      Array.isArray(plugin) ? plugin : [plugin],
    );
    const pluginNames = plugins
      .map((plugin) => plugin?.name)
      .filter((name): name is string => typeof name === "string");

    expect(pluginNames.some((name) => name.includes("vinext"))).toBe(true);
    expect(pluginNames.some((name) => name.includes("nitro"))).toBe(true);
  });
});
