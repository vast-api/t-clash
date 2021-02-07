import ClashConf from "../types/clash";

const keyUpdateMap: Record<string, string> = {
  Proxy: "proxies",
  "Proxy Group": "proxy-groups",
  Rule: "rules",
  "rule-provider": "rule-providers",
};

// https://github.com/Dreamacro/clash/wiki/breaking-changes-in-1.0.0
export function updateOldClashConfig(source: any): ClashConf {
  const result = Object.fromEntries(
    Object.entries(source).map(([key, value]: [string, any]) => [
      keyUpdateMap[key] || key,
      value,
    ])
  );

  if (result.proxies) {
    for (const proxy of result.proxies) {
      if (proxy.type !== "ss") continue;
      if (proxy.obfs) {
        proxy.plugin = "obfs";
        proxy["plugin-opts"] = {
          mode: proxy.obfs,
          host: proxy["obfs-host"],
        };
        delete proxy.obfs;
        delete proxy["obfs-host"];
      }
    }
  }

  if (result.rules) {
    result.rules = (result.rules as string[]).map((i) =>
      i.replace(/^FINAL/, "MATCH").replace(/^SOURCE-IP-CIDR/, "SRC-IP-CIDR")
    );
  }

  const interfaceName = result?.experimental?.["interface-name"];

  if (interfaceName) {
    result["interface-name"] = interfaceName;
    delete result.experimental["interface-name"];
  }

  if (result.experimental && Object.keys(result.experimental).length) {
    delete result.experimental;
  }

  return result as ClashConf;
}
