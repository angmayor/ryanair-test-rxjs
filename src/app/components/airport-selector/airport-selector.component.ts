import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { AppService } from "src/app/service/app.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-airport-selector",
  templateUrl: "./airport-selector.component.html",
  styleUrls: ["./airport-selector.component.css"]
})
export class AirportSelectorComponent implements OnInit {
  // What's input?
  @Input() input: string;
  @Input() cities: string[];
  // This output will be used later on a template, so the name can be something like 'change'
  @Output() sendIataCode = new EventEmitter<string>();

  // Should be done inside ngOnInit
  airport = new FormGroup({
    // selectedAirport should be enough. *Value is redundandt, we already know it's a value :P
    selectedAirportValue: new FormControl()
  });

  constructor(private service: AppService) {}

  ngOnInit() {}

  onChangeSelectedAirpot(airportSelected) {
    this.sendIataCode.emit(airportSelected);
  }
}
