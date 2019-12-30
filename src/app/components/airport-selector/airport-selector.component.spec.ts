import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AirportSelectorComponent } from "./airport-selector.component";
import { WrapComponent } from "../wrap/wrap.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AppService } from "../../service/app.service";
import { FlightDatesComponent } from "../flight-dates/flight-dates.component";
import { RouterTestingModule } from "@angular/router/testing";
import { ButtonComponent } from "../shared/button/button.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("AirportSelectorComponent", () => {
  let component: AirportSelectorComponent;
  let fixture: ComponentFixture<AirportSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AirportSelectorComponent,
        WrapComponent,
        FlightDatesComponent,
        ButtonComponent
      ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [AppService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should Send onChanges Selected Airport ", () => {
    expect(component).toBeTruthy();
  });

  it("should triger function onChange onChangeSelectedAirpot ", () => {
    const spyOnChangeSelectedAirport = spyOn(component.sendIataCode, "emit");
    component.onChangeSelectedAirpot("Madrid");
    expect(spyOnChangeSelectedAirport).toHaveBeenCalledWith("Madrid");
  });
});
