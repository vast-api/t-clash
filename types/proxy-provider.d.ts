declare namespace ClashProxyProvider {
  declare namespace Http {
    interface HealthCheck {
      enable: boolean;
      interval: number;
      lazy?: boolean;
      url: string;
    }
  }
  interface Http {
    type: "http";
    url: string;
    interval: number;
    path: string;
    "health-check": Http.HealthCheck;
  }
  declare namespace File {
    interface HealthCheck {
      enable: boolean;
      interval: number;
      url: string;
    }
  }
  interface File {
    type: "file";
    path: string;
    "health-check": File.HealthCheck;
  }
}

type ClashProxyProvider = ClashProxyProvider.File | ClashProxyProvider.Http;

export default ClashProxyProvider;
