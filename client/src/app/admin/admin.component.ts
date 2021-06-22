import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.css"]
  })
  export class AdminComponent {
    credentials: TokenPayload = {
      email: "",
      name: "",
      prenom: "",
      date_naissance: "",
      admin: "",
      password: ""
    };
}