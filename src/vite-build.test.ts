import { describe, expect, it } from "vitest";

describe("vite build configuration", () => {
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
