'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ngx-social-auth2 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/NgxSocialAuthModule.html" data-type="entity-link">NgxSocialAuthModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/NgxSocialAuthProvider.html" data-type="entity-link">NgxSocialAuthProvider</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/FacebookAuthStrategyService.html" data-type="entity-link">FacebookAuthStrategyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleAuthStrategyService.html" data-type="entity-link">GoogleAuthStrategyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MicrosoftAuthStrategyService.html" data-type="entity-link">MicrosoftAuthStrategyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgxSocialAuthService.html" data-type="entity-link">NgxSocialAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SocialAuthUtilService.html" data-type="entity-link">SocialAuthUtilService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/FacebookAuthConfig.html" data-type="entity-link">FacebookAuthConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacebookAuthResponse.html" data-type="entity-link">FacebookAuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FacebookAuthSignInOptions.html" data-type="entity-link">FacebookAuthSignInOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GoogleAuthConfig.html" data-type="entity-link">GoogleAuthConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GoogleAuthResponse.html" data-type="entity-link">GoogleAuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GoogleAuthSignInOptions.html" data-type="entity-link">GoogleAuthSignInOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MicrosoftAuthConfig.html" data-type="entity-link">MicrosoftAuthConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MicrosoftAuthResponse.html" data-type="entity-link">MicrosoftAuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MicrosoftAuthSignInOptions.html" data-type="entity-link">MicrosoftAuthSignInOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MicrosoftAuthStateOptions.html" data-type="entity-link">MicrosoftAuthStateOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MicrosoftAutSignOutOptions.html" data-type="entity-link">MicrosoftAutSignOutOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxSocialAuthModuleConfig.html" data-type="entity-link">NgxSocialAuthModuleConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgxSocialAuthResponse.html" data-type="entity-link">NgxSocialAuthResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignInOptionsMap.html" data-type="entity-link">SignInOptionsMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SignOutOptionsMap.html" data-type="entity-link">SignOutOptionsMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SocialAuthConfigMap.html" data-type="entity-link">SocialAuthConfigMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SocialAuthResponseMap.html" data-type="entity-link">SocialAuthResponseMap</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SocialAuthStrategy.html" data-type="entity-link">SocialAuthStrategy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateOptionsMap.html" data-type="entity-link">StateOptionsMap</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});