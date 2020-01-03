import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { FlightsDetail } from "../models/flights-detail.model";
import { Origin } from "../models/origin.model";
import { Airport } from "../models/airport.model";
import { Flight } from "../models/flights.model";
import { FlightDatesComponent } from "../components/flight-dates/flight-dates.component";

@Injectable({
  providedIn: "root"
})
export class AppService {
  AIRPORTS_API =
    "https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/";
  FLIGHT_API =
    "https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/";

  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  arrivalDate: string;
  originCities$: Observable<Origin>;

  constructor(public service: HttpClient) {}

  getOriginCities(): Observable<Origin> {
    if (!this.originCities$) {
      this.originCities$ = this.service.get<Origin>(this.AIRPORTS_API);
    }
    return this.originCities$;
  }

  getAirports(): Observable<Airport[]> {
    return this.getOriginCities().pipe(
      map(data =>
        data.airports.map(item => ({
          iataCode: item.iataCode,
          name: item.name
        }))
      )
    );
  }

  getDestinationCities(originIataCode): Observable<Airport[]> {
    return this.getOriginCities().pipe(
      map(data => {
        const dest = data["routes"][originIataCode];
        return data.airports.reduce((result, airport) => {
          if (dest.indexOf(airport.iataCode) !== -1) {
            return [
              ...result,
              {
                iataCode: airport.iataCode,
                name: airport.name
              }
            ];
          }
          return result;
        }, []);
      })
    );
  }

  getSelectedInformationOfTheFlight(
    departureAirport,
    arrivalAirport,
    departureDate,
    arrivalDate
  ) {
    (this.departureAirport = departureAirport),
      (this.arrivalAirport = arrivalAirport),
      (this.departureDate = departureDate),
      (this.arrivalDate = arrivalDate);
  }

  getResultFromSelectedTripOnWrapComponent() {
    return this.service
      .get(`${this.FLIGHT_API}${this.departureAirport}/to/${this.arrivalAirport}
    /${this.departureDate}/${this.arrivalDate}/250/unique/?limit=15&offset-0`);
  }
}
