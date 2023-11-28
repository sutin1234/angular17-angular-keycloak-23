import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, afterNextRender, afterRender, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-keycloak'
  kc = inject(KeycloakService)

  constructor(@Inject(DOCUMENT) private document: Document,) {
    afterRender(() => {
      console.log('afterRender')
    })

    afterNextRender(() => {
      console.log('afterNextRender')
    })

  }

  async ngOnInit() {
    const profile = await this.kc.loadUserProfile()
    console.log('profile', profile)

    const token = await this.kc.getToken()
    console.log('token ', token)

    const tokenDecode = jwtDecode(token)
    console.log('tokenDecode ', tokenDecode)

    const userRole = await this.kc.getUserRoles()
    console.log('userRole ', userRole)

    const isexpired = await this.kc.isTokenExpired()
    console.log('isTokenExpired', isexpired)


    const isLogined = await this.kc.isLoggedIn()
    console.log('islogined ', isLogined)

    const instance = await this.kc.getKeycloakInstance()
    console.log({ instance })


    this.kc.keycloakEvents$.subscribe(event => {
      console.log('event ', event)
      if (event.type === KeycloakEventType.OnAuthLogout) {
        console.log("session logout")
      }
      if (event.type === KeycloakEventType.OnAuthRefreshError) {
        console.log("refresh error")
      }
      if (event.type === KeycloakEventType.OnTokenExpired) {
        console.log("refresh token expired")
      }
      if (event.type === KeycloakEventType.OnTokenExpired) {
        this.kc.updateToken(50).then(refreshed => {
          if (refreshed) {
            console.log('Token was successfully refreshed');
          } else {
            console.log('Token is still valid');
          }
        }).catch(function () {
          console.log('Failed to refresh the token, or the session has expired');
        });
      }
    })

    // this.keycloak.updateToken(180);
    // this.keycloak.init({ onLoad: "login-required", checkLoginIframe: false }).then(auth => {
    //   console.log(auth, this.keycloak)
    // })
    // .success(auth => {
    //   localStorage.setItem("token", keycloak.token);
    //   localStorage.setItem("refresh-token", keycloak.refreshToken);

    //   this.token = "" + keycloak.token;

    //   let jwtData = keycloak.token.split(".")[1];
    //   let decodedJwtJsonData = window.atob(jwtData);
    //   this.tokenDecodificado = "" + decodedJwtJsonData;
    //   let decodedJwtData = JSON.parse("" + decodedJwtJsonData);

    //   this.roles = decodedJwtData["cyber-financial"].roles[0];
    // });
  }
  async logout() {
    await this.kc.logout('https://web-portal-devsit.nonprod.ngernhaijai.com')
  }
}
