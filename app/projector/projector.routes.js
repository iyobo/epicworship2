import { provideRouter, RouterConfig } from '@angular/router';
import {ProjectorHome} from "./pages/projectorHome";

const routes: RouterConfig = [
	{ path: '', component: ProjectorHome, name: 'home'}
];

export const appRouterProviders = [
	provideRouter(routes)
];