import type {
  DashboardResource,
  GlobalDatasourceResource,
  DatasourceResource,
} from "@perses-dev/core";
import type { DatasourceApi } from "@perses-dev/dashboards";

const fakeDatasource: GlobalDatasourceResource = {
  kind: "GlobalDatasource",
  metadata: { name: "hello" },
  spec: {
    default: true,
    plugin: {
      kind: "PrometheusDatasource",
      spec: {
        // Setup your datasource here
        // https://perses.dev/perses/docs/plugins/prometheus
        // https://github.com/perses/perses/blob/main/docs/concepts/proxy.md
        directUrl: "https://demo.promlabs.com",
      },
    },
  },
};

class DatasourceApiImpl implements DatasourceApi {
  getDatasource(): Promise<DatasourceResource | undefined> {
    return Promise.resolve(undefined);
  }

  getGlobalDatasource(): Promise<GlobalDatasourceResource | undefined> {
    return Promise.resolve(fakeDatasource);
  }

  listDatasources(): Promise<DatasourceResource[]> {
    return Promise.resolve([]);
  }

  listGlobalDatasources(): Promise<GlobalDatasourceResource[]> {
    return Promise.resolve([fakeDatasource]);
  }

  buildProxyUrl(): string {
    return "/prometheus";
  }
}

export const fakeDatasourceApi = new DatasourceApiImpl();

export const fakeDashboard = {
  kind: "Dashboard",
  metadata: {},
  spec: {},
} as DashboardResource;
