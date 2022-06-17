import ClashProxy from "./proxy";
import ClashProxyGroup from "./proxy-group";
import ClashProxyProvider from "./proxy-provider";

declare namespace ClashConf {
  type Mode = "rule" | "global" | "direct";
  type LogLevel = "info" | "warning" | "error" | "debug" | "silent";

  declare namespace DNS {
    type EnhancedMode = "redir-host" | "fake-ip";
    interface FallbackFilter {
      geoip: boolean;
      "geoip-code": string;
      ipcidr: string[];
      domain: string[];
    }
  }

  interface DNS {
    enable: boolean;
    listen: string;
    ipv6?: boolean;
    "default-nameserver": string[];
    "enhanced-mode": DNS.EnhancedMode;
    "fake-ip-range": string;
    "use-hosts"?: boolean;
    "fake-ip-filter": string[];
    nameserver: string[];
    fallback: string[];
    "fallback-filter": DNS.FallbackFilter;
    "nameserver-policy"?: Record<string, string>
  }

  declare namespace ParsedRule {
    type Type =
      | "DOMAIN"
      | "DOMAIN-SUFFIX"
      | "DOMAIN-KEYWORD"
      | "GEOIP"
      | "IP-CIDR"
      | "IP-CIDR6"
      | "SRC-IP-CIDR"
      | "SRC-PORT"
      | "DST-PORT"
      | "PROCESS-NAME"
      | "MATCH";
  }

  interface ParsedRule {
    type: ParsedRule.Type;
    options?: string;
    target: string | "DIRECT" | "REJECT";
    "no-resolve"?: boolean;
  }

  interface Profile {
    "store-selected": boolean;
    "store-fake-ip"?: boolean;
    tracing: boolean;
  }
}

interface ClashConf {
  port: number;
  "socks-port": number;
  "redir-port"?: number;
  "tproxy-port"?: number;
  "mixed-port"?: number;
  authentication?: string[];
  "allow-lan": boolean;
  "bind-address": string;
  mode: ClashConf.Mode;
  "log-level": ClashConf.LogLevel;
  ipv6: boolean;
  "external-controller"?: string;
  "external-ui"?: string;
  secret?: string;
  "interface-name"?: string;
  "routing-mark"?: number;
  hosts?: Record<string, string>;
  dns: ClashConf.DNS;
  proxies?: ClashProxy[];
  "proxy-groups"?: ClashProxyGroup[];
  "proxy-providers": Record<string, ClashProxyProvider>;
  rules: string[];
  profile?: ClashConf.Profile;
}

export default ClashConf;
