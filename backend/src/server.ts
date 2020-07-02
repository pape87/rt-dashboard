import "reflect-metadata";

import { DashboardServer } from "./dashboard-server";
import DIContainer from "./di-container";

const app = DIContainer.resolve<DashboardServer>(DashboardServer).app;
export { app };