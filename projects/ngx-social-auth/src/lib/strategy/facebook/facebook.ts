/**
 * @see https://developers.facebook.com/docs/javascript/reference/FB.init/v9.0
 */
export interface FacebookAuthConfig {
  version: string;
  appId?: string;
  cookie?: boolean;
  status?: boolean;
  xfbml?: boolean;
  frictionlessRequests?: boolean;
  hideFlashCallback?: () => void;
  /**
   * 'en_US' by default
   *
   * @see https://developers.facebook.com/docs/javascript/advanced-setup
   */
  lang?: string;
}

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.login/v9.0#options
 */
export interface FacebookAuthSignInOptions {
  auth_type?: string;
  scope?: string;
  return_scopes?: boolean;
  enable_profile_selector?: boolean;
  profile_selector_ids?: string;
}

export type FacebookAuthSignOutOptions = any;

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus#servers
 */
export type FacebookAuthStateOptions = boolean;

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.getAuthResponse
 */
export interface FacebookAuthResponse {
  [key: string]: any;
}
