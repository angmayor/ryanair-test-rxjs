import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/service/app.service";
import { Observable, combineLatest, of } from "rxjs";
import { map } from "rxjs/operators";
import { Airport } from "src/app/models/airport.model";

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

  departure_iataCode: string;
  arrival_iataCode: string;
  departure_date: string;
  arrival_date: string;

  originCities$: Observable<any>;
  destinationCities$: Observable<any>;
  resultSearchFlight$: Observable<any>;
  inputOnKeyUpSearchFligth$: Observable<Airport[]>;
  airports$: Observable<Airport[]>;
  filterSearchFligthWords$: Observable<string>;
  inputOnKeyUpSearchArrivalFligth$: Observable<any>;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.airports$ = this.appService.getAirports();
  }

  destinationDesiredAirport(airport) {
    this.departure_iataCode = airport.airportSelected;
    this.destinationCities$ = this.appService.getDestinationCities(
      airport.airportSelected
    );
  }

  arrivallIataCodes(airport) {
    this.arrival_iataCode = airport.airportSelected;
  }

  selectedDepartureDate(departureDate) {
    this.departure_date = departureDate;
  }

  selectedArrivalDate(arrivalDate) {
    this.arrival_date = arrivalDate;
  }

  onClickSelectedInformation() {
    this.appService.getSelectedInformationOfTheFlight(
      this.departure_iataCode,
      this.arrival_iataCode,
      this.departure_date,
      this.arrival_date
    );
  }
}
