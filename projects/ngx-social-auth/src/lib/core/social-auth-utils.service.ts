import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {fromEvent, merge, Observable, throwError} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthUtilsService {

  private readonly renderer = this.createRenderer();

  constructor(@Inject(DOCUMENT) private readonly document: Document,
              private readonly rendererFactory: RendererFactory2) {
  }

  /**
   * Load external script
   *
   * @param attributes a key-value pair of script attributes.
   * Details {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script}
   * @param append where the script will appended
   */
  loadScript(attributes: {src: string, [key: string]: any}, append: 'head' | 'body'): Observable<Event | never> {
    /*const script = this.renderer.createElement('script') as HTMLScriptElement;

    Object.keys(attributes).forEach(key => this.renderer.setAttribute(script, key, attributes[key]));

    this.renderer.appendChild(this.document, script);*/

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