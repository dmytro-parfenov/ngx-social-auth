/**
 * @see https://developers.google.com/identity/sign-in/web/reference#gapiauth2clientconfig
 */
export interface GoogleAuthConfig {
  client_id: string;
  cookie_policy?: string;
  scope?: string;
  fetch_basic_profile?: string;
  hosted_domain?: string;
  ux_mode?: string;
  redirect_uri?: string;
}

/**
 * @see https://developers.google.com/identity/sign-in/web/reference#gapiauth2signinoptions
 */
export interface GoogleAuthSignInOptions {
  prompt?: string;
  scope?: string;
  ux_mode?: string;
  redirect_uri?: string;
  /**
   * @see https://developers.google.com/identity/sign-in/web/reference#googleusergetauthresponseincludeauthorizationdata
   */
  includeAuthorizationData?: boolean;
}

export type GoogleAuthSignOutOptions = any;

/**
 * https://developers.google.com/identity/sign-in/web/reference#googleusergetauthresponseincludeauthorizationdata
 */
export type GoogleAuthStateOptions = boolean;

/**
 * @see https://developers.google.com/identity/sign-in/web/reference#gapiauth2authresponse
 */
export type GoogleAuthResponse = any;
