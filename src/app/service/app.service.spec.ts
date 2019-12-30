import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { AppService } from "./app.service";
import { NavbarComponent } from "../components/shared/navbar/navbar.component";
import { Origin } from "../models/origin.model";
import { Observable, of } from "rxjs";
import { FlightsDetail } from "../models/flights-detail.model";
import { FlightParameters } from "../models/flight-parameter.model";
import { Airport } from "../models/airport.model";
import { map } from "rxjs/operators";

const ServiceStub = {
  get(): Observable<Origin> {
    return of({
      routes: { MAD: "DUB" },
      airports: [{ iataCode: "MAD", name: "Madrid" }]
    });
  }
};

describe("AppService", () => {
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService, NavbarComponent]
    });

    service = TestBed.get(AppService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should getAirports", () => {
    const airportsStub = {
      routes: { MAD: "DUB" },
      airports: [{ iataCode: "MAD", name: "Madrid" }]
    };

    service.getAirports().subscribe(airport => {
      expect(airport).toEqual(airportsStub);
    });

    const request = httpMock.expectOne(service.AIRPORTS_API);
    expect(request.request.method).toBe("GET");
    request.flush(airportsStub);
  });

  it("should getFlights", () => {
    const flightStub: FlightsDetail = {
      dateFrom: "24122019",
      dateTo: "15012020",
      currency: "€",
      price: 200
    };

    const flightParametersStub: FlightParameters = {
      departureAirport: "MAD",
      arrivalAirport: "DUB",
      departureDate: "2019-12-24",
      arrivalDate: "2020-01-15"
    };

    service
      .getFlights(
        flightParametersStub.departureAirport,
        flightParametersStub.arrivalAirport,
        flightParametersStub.departureDate,
        flightParametersStub.arrivalDate
      )
      .subscribe(flight => {
        expect(flight).toEqual(flightStub);
      });

    const request = httpMock.expectOne(
      // tslint:disable-next-line:max-line-length
      `${service.FLIGHT_API}${flightParametersStub.departureAirport}/to/${flightParametersStub.arrivalAirport}/${flightParametersStub.departureDate}/${flightParametersStub.arrivalDate}/250/unique/?limit=15&offset-0`
    );
    expect(request.request.method).toBe("GET");
    request.flush(flightStub);
  });

  it("should getOriginCities", () => {
    const cityStub = [{ iataCode: "MAD", name: "Madrid" }];
    const cityStub2 = {
      routes: { MAD: "DUB" },
      airports: [{ iataCode: "MAD", name: "Madrid" }]
    };
    service
      .getOriginCities()
      .pipe(
        map(city =>
          city.map(item => ({
            iataCode: item.iataCode,
            name: item.name
          }))
        )
      )
      .subscribe(city => expect(city).toEqual(cityStub));

    const request = httpMock.expectOne(service.AIRPORTS_API);
    expect(request.request.method).toBe("GET");
    request.flush(cityStub2);
  });

  it("should getDestinationCities", () => {
    const originIataCodeStub = "DUB";
    service.getDestinationCities().pipe(
      map(data => {
        // tslint:disable-next-line:no-string-literal
        const dest = data["routes"][originIataCode.target.value];
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
      });
  });
});
