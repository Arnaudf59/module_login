import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: "",
    admin: "",
    password: ""
  };

  constructor(private auth: AuthenticationService, private router: Router) {}
  
  login() {
    
    this.auth.login(this.credentials).subscribe(
      () => {
        alert(this.credentials.email);
        if(this.credentials.admin == "1"){
          this.router.navigateByUrl("/admin");
        }else{
          this.router.navigateByUrl("/profile");
        }
      },
      err => {
        console.error(err);
      }
    );
  }
}
