# ngx-social-auth2

The Angular library provides opportunity to authenticate users by using social identity providers.

## Supported providers

- [Google](https://developers.google.com/identity/sign-in/web/reference)
- [Facebook](https://developers.facebook.com/docs/javascript)
- [Microsoft](https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/)

## Demo

[ngx-social-auth2](https://ngx-social-auth2.web.app/)

## Install

NPM: `npm install ngx-social-auth2 --save`

Yarn: `yarn add ngx-social-auth2`

## Usage

Import `NgxSocialAuthModule` to your working module

```
import {NgxSocialAuthModule} from 'ngx-social-auth2';

@NgModule({
  imports: [
    NgxSocialAuthModule.forRoot({
      providers: [
        new NgxSocialAuthProvider(NgxSocialAuthProviderType.Google, {
          client_id: 'YOUR_CLIENT_ID'
        }),
        new NgxSocialAuthProvider(NgxSocialAuthProviderType.Facebook, {
          appId: 'YOUR_APP_ID', 
          status: true, 
          version: 'v9.0'
        }),
        new NgxSocialAuthProvider(NgxSocialAuthProviderType.Microsoft, {
          auth: {
            clientId: 'YOUR_CLIENT_ID', 
            postLogoutRedirectUri: 'YOUR_REDIRECT_URI_AFTER_LOGOUT'
          }
        })
      ]
    }),
  ]
})
export class AppModule { }
```

Use `NgxSocialAuthService` to authenticate user

```
import {NgxSocialAuthProviderType, NgxSocialAuthService} from 'ngx-social-auth2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private readonly ngxSocialAuthService: NgxSocialAuthService) {
  }

  signIn(): void {
    this.ngxSocialAuthService.signIn(NgxSocialAuthProviderType.Google).subscribe(authResponse => {
      // do something
    });
  }

  signOut(): void {
    this.ngxSocialAuthService.signOut(NgxSocialAuthProviderType.Google).subscribe(() => {
      // do something
    });
  }

  getState(): void {
    this.ngxSocialAuthService.getState(NgxSocialAuthProviderType.Google).subscribe(authResponse => {
      // do something
    });
  }
}
```

Every method in `NgxSocialAuthService` supports the second optional argument according to the specific provider. 
You can pass it to provide additional functionality.

```
this.ngxSocialAuthService.signIn(NgxSocialAuthProviderType.Google, { redirect_uri: 'YOUR_REDIRECT_URI' }).subscribe(authResponse => {
  // do something
});
```

More examples you can find in [demo app](https://github.com/dmytro-parfenov/ngx-social-auth/tree/master/projects/ngx-social-auth-demo)

## Documentation

[Docs site](https://dmytro-parfenov.github.io/ngx-social-auth/)
