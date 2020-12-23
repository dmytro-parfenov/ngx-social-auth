/* tslint:disable:max-line-length */
/**
 * @see https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/modules/_src_config_configuration_.html
 */
export interface MicrosoftAuthConfig {
  [key: string]: any;
}

/**
 * When [isLoginRedirect] is true, then [RedirectRequest] type definition should be used, otherwise [PopupRequest]. Default is false
 *
 * @see https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/modules/_src_request_popuprequest_.html#popuprequest
 * @see https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/modules/_src_request_redirectrequest_.html#redirectrequest
 */
export interface MicrosoftAuthSignInOptions {
  isLoginRedirect?: boolean;
  [key: string]: any;
}

/**
 * @see https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/modules/_src_request_endsessionrequest_.html#endsessionrequest
 */
export interface MicrosoftAutSignOutOptions {
  [key: string]: any;
}

/**
 * @see https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-browser/modules/_src_request_silentrequest_.html#silentrequest
 */
export interface MicrosoftAuthStateOptions {
  [key: string]: any;
}

/**
 * @see @see https://azuread.github.io/microsoft-authentication-library-for-js/ref/msal-common/classes/_src_response_authenticationresult_.authenticationresult.html
 */
export interface MicrosoftAuthResponse {
  [key: string]: any;
}
