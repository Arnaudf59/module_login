import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: "",
    name: "",
    prenom: "",
    date_naissance: "",
    admin: false,
    password: ""
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        if(this.credentials.admin == true){
          this.router.navigateByUrl("/admin");
        }else{
          this.router.navigateByUrl("/profile");
        };
      },
      err => {
        console.error(err);
      }
    );
  }
}
