import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { RouterTestingModule } from "@angular/router/testing";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  it("should render title", () => {
    const fixture = TestBed.createComponent(AppComponent);

    expect(fixture).toMatch(/\w+/g);
  });
});
