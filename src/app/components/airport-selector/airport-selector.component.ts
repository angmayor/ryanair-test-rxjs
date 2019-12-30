import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { AppService } from "src/app/service/app.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-airport-selector",
  templateUrl: "./airport-selector.component.html",
  styleUrls: ["./airport-selector.component.css"]
})
export class AirportSelectorComponent implements OnInit {
  @Input() input: string;
  @Input() cities: string[];
  @Output() sendIataCode = new EventEmitter<string>();

  airport = new FormGroup({
    selectedAirportValue: new FormControl()
  });

  constructor(private service: AppService) {}

  ngOnInit() {}

  onChangeSelectedAirpot(airportSelected) {
    this.sendIataCode.emit(airportSelected);
  }
}
