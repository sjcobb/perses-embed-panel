// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import {
  ChartsProvider,
  generateChartsTheme,
  getTheme,
  SnackbarProvider,
} from "@perses-dev/components";
import {
  DataQueriesProvider,
  dynamicImportPluginLoader,
  PluginRegistry,
  TimeRangeProvider,
} from "@perses-dev/plugin-system";
import type { PluginLoader } from "@perses-dev/plugin-system";
import { Panel } from "@perses-dev/dashboards";
import { Box, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  DatasourceStoreProvider,
  VariableProvider,
} from "@perses-dev/dashboards";
import * as prometheusPlugin from "@perses-dev/prometheus-plugin";
import * as timeseriesChartPlugin from "@perses-dev/timeseries-chart-plugin";
import { fakeDatasourceApi, fakeDashboard } from "./model";

function App() {
  const muiTheme = getTheme("light");
  const chartsTheme = generateChartsTheme(muiTheme, {});

  const pluginLoader: PluginLoader = dynamicImportPluginLoader([
    {
      resource: prometheusPlugin.getPluginModule(),
      importPlugin: () => Promise.resolve(prometheusPlugin),
    },
    {
      resource: timeseriesChartPlugin.getPluginModule(),
      importPlugin: () => Promise.resolve(timeseriesChartPlugin),
    },
  ]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });
  return (
    <ThemeProvider theme={muiTheme}>
      <ChartsProvider chartsTheme={chartsTheme}>
        <SnackbarProvider
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="default"
          content=""
        >
          <PluginRegistry
            pluginLoader={pluginLoader}
            defaultPluginKinds={{
              Panel: "TimeSeriesChart",
              TimeSeriesQuery: "PrometheusTimeSeriesQuery",
            }}
          >
            <QueryClientProvider client={queryClient}>
              <TimeRangeProvider
                refreshInterval="0s"
                timeRange={{ pastDuration: "30m" }}
              >
                <VariableProvider>
                  <DatasourceStoreProvider
                    dashboardResource={fakeDashboard}
                    datasourceApi={fakeDatasourceApi}
                  >
                    <Box sx={{ width: 600, height: 300 }}>
                      <DataQueriesProvider
                        definitions={[
                          {
                            kind: "PrometheusTimeSeriesQuery",
                            spec: { query: `up{job="prometheus"}` },
                            // spec: { query: `1` },
                          },
                        ]}
                      >
                        <Panel
                          panelOptions={{
                            hideHeader: true,
                          }}
                          definition={{
                            kind: "Panel",
                            spec: {
                              // queries: queries,
                              // queries: [],
                              display: { name: "Example" },
                              plugin: {
                                kind: "TimeSeriesChart",
                                spec: {
                                  legend: {
                                    position: "bottom",
                                    size: "medium",
                                  },
                                },
                              },
                            },
                          }}
                        />
                      </DataQueriesProvider>
                    </Box>
                  </DatasourceStoreProvider>
                </VariableProvider>
              </TimeRangeProvider>
            </QueryClientProvider>
          </PluginRegistry>
        </SnackbarProvider>
      </ChartsProvider>
    </ThemeProvider>
  );
}

export default App;
