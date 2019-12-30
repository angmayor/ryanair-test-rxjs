import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { FlightDatesComponent } from "./flight-dates.component";
import { WrapComponent } from "../wrap/wrap.component";
import { AirportSelectorComponent } from "../airport-selector/airport-selector.component";
import { ButtonComponent } from "../shared/button/button.component";
import { AppService } from "../../service/app.service";
import { RouterTestingModule } from "@angular/router/testing";

describe("FlightDatesComponent", () => {
  let component: FlightDatesComponent;
  let fixture: ComponentFixture<FlightDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])],
      declarations: [
        FlightDatesComponent,
        WrapComponent,
        AirportSelectorComponent,
        ButtonComponent
      ],
      providers: [AppService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Should emit date onChangeDate", () => {
    const spyOnChangeDateEmit = spyOn(component.selectedDate, "emit");
    component.onChangeDate(new Date(2019, 11, 24));
    expect(spyOnChangeDateEmit).toHaveBeenCalledWith(new Date(2019, 11, 24));
  });
});
