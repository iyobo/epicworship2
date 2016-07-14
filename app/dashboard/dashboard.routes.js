import { provideRouter, RouterConfig } from '@angular/router';
import {DashboardHome} from "./pages/dashboardHome";

const routes: RouterConfig = [
	{ path: '', component: DashboardHome, name: 'home'}
];

export const appRouterProviders = [
	provideRouter(routes)
];