import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Observable, fromEvent, combineLatest } from "rxjs";
import {
  startWith,
  debounceTime,
  pluck,
  distinctUntilChanged,
  map
} from "rxjs/operators";
import { Airport } from "src/app/models/airport.model";

@Component({
  selector: "app-airport-selector",
  templateUrl: "./airport-selector.component.html",
  styleUrls: ["./airport-selector.component.css"]
})
export class AirportSelectorComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() airports: Observable<Airport[]>;
  @Input() destinations$: Observable<Airport[]>;
  @Output() sendIataCode = new EventEmitter<any>();
  @Output() writtenAirpotSearch = new EventEmitter<Observable<string>>();
  @ViewChild("input", { static: true }) searchFligth: ElementRef;
  onKeyUpSearchFilter$: Observable<any>;
  searchForAirportFilter$: Observable<Airport[]>;

  fligthSelectionForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.fligthSelectionForm = this.formBuilder.group({
      inputSelectedCity: ["", Validators.minLength(3)],
      airportSelected: ["", Validators.required]
    });

    this.onKeyUpSearchFilter$ = fromEvent(
      this.searchFligth.nativeElement,
      "keyup"
    ).pipe(
      debounceTime(300),
      pluck("target", "value"),
      distinctUntilChanged(),
      startWith("")
    );

    this.searchForAirportFilter$ = combineLatest(
      this.airports,
      this.onKeyUpSearchFilter$
    ).pipe(
      map(([store, filter]) =>
        store.filter(state => state.name.indexOf(filter) !== -1)
      )
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.airports) {
      this.searchForAirportFilter$ = combineLatest(
        this.airports,
        this.onKeyUpSearchFilter$
      ).pipe(
        map(([store, filter]) =>
          store.filter(state => state.name.indexOf(filter) !== -1)
        )
      );
    }
  }

  onChangeSelectedAirpot() {
    this.sendIataCode.emit(this.fligthSelectionForm.value);
  }
}
