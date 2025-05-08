# Embed Perses Panel Example

See below for official Perses docs on embedding a single panel in a React app:

https://github.com/perses/perses/blob/main/docs/embedding-panels.md

This example app created using Vite:

```bash
npm create vite@latest perses-embed-panel -- --template react-ts
```

## TimeSeriesChart

https://github.com/sjcobb/perses-embed-panel/blob/main/src/App.tsx

```typescript
import { Panel } from "@perses-dev/dashboards";
```

Pass spec with `kind: "TimeSeriesChart"`, setup queries and pass to DataQueriesProvider.

https://perses.dev/perses/docs/plugins/panels

## Datasource

https://perses.dev/perses/docs/plugins/prometheus
