import { Airport } from "./airport.model";
import { Country } from "./country.model";

export interface Origin {
  routes?: {};
  airports?: Airport[];
  discount?: {};
  countries?: Country[];
  menssage?: {};
}
