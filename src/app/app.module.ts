import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AirportSelectorComponent } from "./components/airport-selector/airport-selector.component";
import { FlightListComponent } from "./components/flight-list/flight-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { WrapComponent } from "./components/wrap/wrap.component";
import { FlightDatesComponent } from "./components/flight-dates/flight-dates.component";
import { APP_ROUTING } from "./app.routes";
import { ButtonComponent } from "./components/shared/button/button.component";

@NgModule({
  declarations: [
    AppComponent,
    AirportSelectorComponent,
    FlightListComponent,
    NavbarComponent,
    WrapComponent,
    FlightDatesComponent,
    ButtonComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
