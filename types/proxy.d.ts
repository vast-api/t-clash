declare namespace ClashProxy {
  declare namespace Shadowsocks {
    type Cipher =
      | "aes-128-gcm"
      | "aes-192-gcm"
      | "aes-256-gcm"
      | "aes-128-cfb"
      | "aes-192-cfb"
      | "aes-256-cfb"
      | "aes-128-ctr"
      | "aes-192-ctr"
      | "aes-256-ctr"
      | "rc4-md5"
      | "chacha20-ietf"
      | "xchacha20"
      | "chacha20-ietf-poly1305"
      | "xchacha20-ietf-poly1305";
    type ObfsPluginType = "tls" | "http";
    interface ObfsPluginOptions {
      mode: ObfsPluginType;
      host: string;
    }
    type ClashPluginType = "websocket";

    interface V2rayPluginOptions {
      mode: "websocket";
      tls?: boolean;
      "skip-cert-verify"?: boolean;
      host?: string;
      path?: string;
      mux?: boolean;
      headers?: Record<string, string>;
    }
  }

  interface ShadowsocksSimple {
    name: string;
    type: "ss";
    server: string;
    port: number;
    cipher: Shadowsocks.Cipher;
    password: string;
    udp?: boolean;
  }

  interface ShadowsocksObfs extends ShadowsocksSimple {
    plugin: "obfs";
    "plugin-opts": Shadowsocks.ObfsPluginOptions;
  }

  interface ShadowsocksV2Ray extends ShadowsocksSimple {
    plugin: "v2ray-plugin";
    "plugin-opts": Shadowsocks.V2rayPluginOptions;
  }

  type Shadowsocks = ShadowsocksSimple | ShadowsocksObfs | ShadowsocksV2Ray;

  declare namespace VMess {
    type Cipher = "auto" | "aes-128-gcm" | "chacha20-poly1305" | "none";
    interface H2Opts {
      host: string[];
      path: string;
    }

    interface HttpOpts {
      method?: string;
      path?: string[];
      headers?: Record<string, string>;
    }

    interface WsOpts {
      path?: string;
      headers?: Record<string, string>;
      "max-early-data"?: number;
      "early-data-header-name"?: string;
    }

    interface GrpcOpts {
      "grpc-service-name": string;
    }

    interface VMessBase {
      name: string;
      type: "vmess";
      server: string;
      port: number;
      uuid: string;
      alterId: number;
      cipher: VMess.Cipher;
    }
  }

  interface VMessBasicAndWs extends VMess.VMessBase {
    udp?: boolean;
    tls?: boolean;
    "skip-cert-verify"?: boolean;
    servername?: string;
    network?: string;
    "ws-opts"?: VMess.WsOpts;
  }

  interface VMessH2 extends VMess.VMessBase {
    network: "h2";
    tls: boolean;
    "h2-opts": VMess.H2Opts;
  }

  interface VMessHttp extends VMess.VMessBase {
    network: "http";
    udp?: boolean;
    "http-opts": VMess.HttpOpts;
  }

  interface VMessGrpc extends VMess.VMessBase {
    network: "grpc";
    tls?: boolean;
    "skip-cert-verify"?: boolean;
    servername?: string;
    "grpc-opts": GrpcOpts;
  }

  type VMess = VMessBasicAndWs | VMessH2 | VMessHttp | VMessGrpc;

  interface Socks {
    name: string;
    type: "socks";
    server: string;
    port: number;
    username?: string;
    password?: string;
    tls?: boolean;
    "skip-cert-verify"?: boolean;
    udp?: boolean;
  }

  interface HTTP {
    name: string;
    type: "http";
    server: string;
    port: number;
    username?: string;
    password?: string;
    tls?: boolean;
    "skip-cert-verify"?: boolean;
    sni?: string;
  }

  declare namespace Snell {
    interface ObfsOpts {
      mode: string;
      host: string;
    }
  }

  interface Snell {
    name: string;
    type: "snell";
    server: string;
    port: number;
    psk: string;
    version: number;
    "obfs-opts": Snell.ObfsOpts;
  }

  declare namespace Trojan {
    interface GrpcOpts {
      "grpc-service-name": string;
    }
    interface WsOpts {
      path?: "string"
      headers?: Record<string, string>
    }
  }

  interface TrojanNormal {
    name: string;
    type: "trojan";
    server: string;
    port: number;
    password: string;
    udp?: boolean;
    sni?: string;
    alpn?: string[];
    "skip-cert-verify"?: boolean;
  }

  interface TrojanGrpc extends TrojanNormal {
    "grpc-opts": Trojan.GrpcOpts;
  }

  interface TrojanWs extends TrojanNormal {
    network: "ws";
    "ws-opts": Trojan.WsOpts;
  }

  type Trojan = TrojanNormal | TrojanGrpc | TrojanWs;

  declare namespace ShadowsocksR {
    type Cipher = Shadowsocks.Cipher;
    type Obfs =
      | "plain"
      | "http_simple"
      | "http_post"
      | "random_head"
      | "tls1.2_ticket_auth"
      | "tls1.2_ticket_fastauth";
    type Protocol =
      | "origin"
      | "auth_sha1_v4"
      | "auth_aes128_md5"
      | "auth_aes128_sha1"
      | "auth_chain_a"
      | "auth_chain_b";
  }

  interface ShadowsocksR {
    name: string;
    type: "ssr";
    server: string;
    port: number;
    cipher: ShadowsocksR.Cipher;
    password: string;
    obfs: ShadowsocksR.Obfs;
    protocol: ShadowsocksR.Protocol;
    "obfs-param"?: string;
    "protocol-param"?: string;
    udp?: boolean;
  }
}

type ClashProxy =
  | ClashProxy.Shadowsocks
  | ClashProxy.VMess
  | ClashProxy.Socks
  | ClashProxy.HTTP
  | ClashProxy.Snell
  | ClashProxy.Trojan
  | ClashProxy.ShadowsocksR;

export default ClashProxy;
