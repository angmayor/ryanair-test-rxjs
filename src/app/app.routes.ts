import { RouterModule, Routes } from "@angular/router";
import { WrapComponent } from "../app/components/wrap/wrap.component";
import { FlightListComponent } from "../app/components/flight-list/flight-list.component";

const APP_ROUTES: Routes = [
  {
    path: "home",
    component: WrapComponent,
    children: [{ path: "selection", component: FlightListComponent }]
  },
  { path: "**", pathMatch: "full", redirectTo: "home" }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
