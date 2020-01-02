import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/service/app.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-wrap",
  templateUrl: "./wrap.component.html",
  styleUrls: ["./wrap.component.css"]
})
export class WrapComponent implements OnInit {
  // Information send to child components:
  // Airport-selected Component:
  from = "DE:";
  to = "A:";

  // Flight-date Component:
  departure = "DESDE:";
  arrive = "HASTA:";

  // Convetntion is that capitalized properties are used as constants
  DEPARTURE_IATACODE: string;
  ARRIVAL_IATACODE: string;
  DEPARTURE_DATE: string;
  ARRIVAL_DATE: string;

  originCities$: Observable<any>;
  destinationCities$: Observable<any>;
  resultSearchFlight$: Observable<any>;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.originCities$ = this.appService.getOriginCities();
  }

  // Convention is that get* Methods are getters and they should return something
  getAirportsIataCodes(iataCode) {
    this.destinationCities$ = this.appService.getDestinationCities(iataCode);
    this.DEPARTURE_IATACODE = iataCode;
  }

  getAirportsArrivallIataCodes(iataCode) {
    this.ARRIVAL_IATACODE = iataCode;
  }

  // Method names should be verbs
  selectedDepartureDate(departureDate) {
    this.DEPARTURE_DATE = departureDate;
  }

  selectedArrivalDate(arrivalDate) {
    this.ARRIVAL_DATE = arrivalDate;
  }

  onClickSelectedInformation() {
    this.resultSearchFlight$ = this.appService.getFlights(
      this.DEPARTURE_IATACODE,
      this.ARRIVAL_IATACODE,
      this.DEPARTURE_DATE,
      this.ARRIVAL_DATE
    );
  }
}
