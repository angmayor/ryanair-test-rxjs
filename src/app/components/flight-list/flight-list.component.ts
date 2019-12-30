import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/service/app.service";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { FlightsDetail } from "src/app/models/flights-detail.model";
import { Flight } from "src/app/models/flights.model";

@Component({
  selector: "app-flight-list",
  templateUrl: "./flight-list.component.html",
  styleUrls: ["./flight-list.component.css"]
})
export class FlightListComponent implements OnInit {
  selectedFlightInformation$: Observable<FlightsDetail[]>;
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.selectedFlightInformation$ = this.appService
      .getResultFromSelectedTripOnWrapComponent()
      .pipe(map<Flight, FlightsDetail[]>(flight => flight.flights));
  }
}
