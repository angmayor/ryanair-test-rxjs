import { Airport } from "./airport.model";
import { Country } from "./country.model";

export interface Origin {
  routes?: {}; // Same here with types
  airports?: Airport[];
  discount?: {};
  countries?: Country[];
  menssage?: {};
}
