import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FlightListComponent } from "./flight-list.component";
import { APP_ROUTING } from "../../app.routes";
import { WrapComponent } from "../wrap/wrap.component";
import { AirportSelectorComponent } from "../airport-selector/airport-selector.component";
import { FlightDatesComponent } from "../flight-dates/flight-dates.component";
import { ButtonComponent } from "../shared/button/button.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { APP_BASE_HREF } from "@angular/common";
import { AppService } from "../../service/app.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FlightsDetail } from "src/app/models/flights-detail.model";
import { of } from "rxjs";
import { Flight } from "src/app/models/flights.model";
import { map } from "rxjs/operators";

const AppServiceStub = {
  getResultFromSelectedTripOnWrapComponent() {
    const SelectedFlight: Flight = {
      flights: [
        {
          dateFrom: "30122019",
          dateTo: "1512020",
          currency: "€",
          price: 200
        }
      ]
    };
    return of(SelectedFlight);
  }
};

describe("FlightListComponent", () => {
  let component: FlightListComponent;
  let fixture: ComponentFixture<FlightListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FlightListComponent,
        WrapComponent,
        AirportSelectorComponent,
        FlightDatesComponent,
        ButtonComponent
      ],
      imports: [
        APP_ROUTING,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: "/" },
        { provide: AppService, useValue: AppServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get onInitSelectedFlightInformation$", done => {
    component.selectedFlightInformation$ = AppServiceStub.getResultFromSelectedTripOnWrapComponent().pipe(
      map<Flight, FlightsDetail[]>(flight => flight.flights)
    );

    component.selectedFlightInformation$.subscribe(value => {
      expect(value).toContain({
        dateFrom: "30122019",
        dateTo: "1512020",
        currency: "€",
        price: 200
      });
      done();
    });
  });
});
