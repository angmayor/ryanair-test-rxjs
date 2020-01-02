import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { WrapComponent } from "./wrap.component";
import { AirportSelectorComponent } from "../airport-selector/airport-selector.component";
import { FlightDatesComponent } from "../flight-dates/flight-dates.component";
import { RouterTestingModule } from "@angular/router/testing";
import { ButtonComponent } from "../shared/button/button.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Origin } from "../../models/origin.model";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { FlightBooking } from "src/app/models/flight-booking.model";
import { Airport } from "src/app/models/airport.model";
import { FlightsDetail } from "src/app/models/flights-detail.model";

const AppServiceStub = {
  getDestinationCities(): Observable<Airport> {
    return of({
      iataCode: "MAD",
      name: "Madrid"
    });
  },

  getFlights(): Observable<FlightsDetail> {
    return of({
      dateFrom: "30122019",
      dateTo: "15012020",
      currency: "€",
      price: 200
    });
  }
};

describe("WrapComponent", () => {
  let component: WrapComponent;
  let fixture: ComponentFixture<WrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        WrapComponent,
        AirportSelectorComponent,
        FlightDatesComponent,
        ButtonComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should getAirportsIataCodes to have been call", () => {
    const spyOnGetAirportsIataCodes = spyOn(component, "getAirportsIataCodes");
    component.getAirportsIataCodes("MAD");
    expect(spyOnGetAirportsIataCodes).toHaveBeenCalled();
  });

  it("should destinationCities$ have Airport infomation", () => {
    component.destinationCities$ = AppServiceStub.getDestinationCities();
    component.destinationCities$.subscribe(value => {
      // False positive
      expect(value).toEqual({
        iataCode: "MAD",
        name: "Madrid"
      });
    });
  });

  it("should have been call getAirportsArrivallIataCodes", () => {
    const spyOnGetAirportsArrivallIataCodes = spyOn(
      component,
      "getAirportsArrivallIataCodes"
    );

    component.getAirportsArrivallIataCodes("mad");
    expect(spyOnGetAirportsArrivallIataCodes).toHaveBeenCalled();
  });

  it("should have been call selectedDepartureDate", () => {
    const spyOnSelectedDepartureDate = spyOn(
      component,
      "selectedDepartureDate"
    );
    component.selectedDepartureDate("MAD");
    expect(spyOnSelectedDepartureDate).toHaveBeenCalled();
  });

  it("should have been call selectedArrivalDate", () => {
    const spyOnselectedArrivalDate = spyOn(component, "selectedArrivalDate");
    component.selectedArrivalDate("MAD");
    expect(spyOnselectedArrivalDate).toHaveBeenCalled();
  });

  it("should onClickSelectedInformation$ get result of the flight search", () => {
    component.resultSearchFlight$ = AppServiceStub.getFlights();
    component.resultSearchFlight$.subscribe(value => {
      // False positive
      expect(value).toEqual({
        dateFrom: "30122019",
        dateTo: "15012020",
        currency: "€",
        price: 200
      });
    });
  });
});
