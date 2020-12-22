import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {fromEvent, merge, Observable, throwError} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';

/**
 * @dynamic
 * @see https://angular.io/guide/angular-compiler-options#strictmetadataemit
 */
@Injectable({
  providedIn: 'root'
})
export class SocialAuthUtilService {

  private readonly renderer = this.createRenderer();

  constructor(@Inject(DOCUMENT) private readonly document: Document,
              private readonly rendererFactory: RendererFactory2) {
  }

  /**
   * Load an external script
   *
   * @param attributes a key-value pair of script attributes.
   * Details {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script}
   * @param append where the script will appended
   */
  loadScript(attributes: {src: string, [key: string]: any}, append: 'head' | 'body'): Observable<Event> {
    const script = this.document.createElement('script');

    Object.keys(attributes).forEach(key => this.renderer.setAttribute(script, key, attributes[key]));

    this.document[append].appendChild(script);

    const load$ = fromEvent(script, 'load');

    const error$ = fromEvent(script, 'error').pipe(
      mergeMap(error => throwError(error))
    );

    return merge(load$, error$).pipe(
      take(1)
    );
  }

  private createRenderer(): Renderer2 {
    return this.rendererFactory.createRenderer(null, null);
  }
}
