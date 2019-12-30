import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-flight-dates",
  templateUrl: "./flight-dates.component.html",
  styleUrls: ["./flight-dates.component.css"]
})
export class FlightDatesComponent implements OnInit {
  @Input() input: string;
  @Output() selectedDate = new EventEmitter<Date>();

  DATE_DEPARTURE_RESULT: Date;

  dates = new FormGroup({
    departure: new FormControl(),
    arrive: new FormControl()
  });

  constructor() {}

  ngOnInit() {}

  onChangeDate(date: Date) {
    this.selectedDate.emit(date);
  }
}
