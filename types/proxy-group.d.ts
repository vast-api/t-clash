declare namespace ClashProxyGroup {
  interface Relay {
    name: string;
    type: "relay";
    proxies: string[];
  }

  interface UrlTest {
    name: string;
    type: "url-test";
    proxies: string[];
    tolerance?: number;
    lazy?: true;
    url: string;
    interval: number;
  }

  interface Fallback {
    name: string;
    type: "fallback";
    proxies: string[];
    url: string;
    interval: number;
  }

  declare namespace LoadBalance {
    type Strategy = "consistent-hashing" | "round-robin";
  }

  interface LoadBalance {
    name: string;
    type: "load-balance";
    proxies: string[];
    url: string;
    interval: number;
    strategy?: LoadBalance.Strategy;
  }

  interface Select {
    name: string;
    type: "select";
    "disable-udp"?: false;
    proxies: string[];
  }
}

type ClashProxyGroup =
  | ClashProxyGroup.Relay
  | ClashProxyGroup.UrlTest
  | ClashProxyGroup.Fallback
  | ClashProxyGroup.LoadBalance;

export default ClashProxyGroup;
