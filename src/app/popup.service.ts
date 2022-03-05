import { Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ICustomWindow extends Window {
  serviceBus: BehaviorSubject<string>;
}

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  public serviceBus = new BehaviorSubject<string>("INTIAL VALUE");

  constructor() { }

  public openPopup(componentTag: string) {
    const windowRef = window.open("", "_blank", "fullscreen=yes, location=no");
    if (!windowRef) {
      throw Error("Could not open Window.");
      return;
    }

    const baseTag: HTMLBaseElement = windowRef.document.createElement("base");

    baseTag.href = window.location.origin;
    windowRef.document.head.appendChild(baseTag);

    const titleTag = windowRef.document.createElement("title");
    titleTag.text = "my shiny title";
    windowRef.document.head.appendChild(titleTag);

    this.copyScript(windowRef, /.*zone(\.min)*\.js$/);
    this.copyScript(windowRef, "webcomponents-registry");

    const globalStyleTags: NodeList = document.head.querySelectorAll("link");
    globalStyleTags.forEach((styleTag: Node) => windowRef.document.head.appendChild(styleTag.cloneNode()));

    this.injectGlobalWindowStuff(windowRef);

    const div = windowRef.document.createElement("div");
    div.innerHTML = "<h1>I AM INJECTED!</h1>" + componentTag;
    windowRef.document.body.appendChild(div);

    this.injectScript(windowRef, "http://127.0.0.1:8081/polyfills.js");
    this.injectScript(windowRef, "http://127.0.0.1:8081/main.js");
  }

  public injectScript(windowRef: Window, scriptPath: string): void {
    let js: HTMLScriptElement;
    js = windowRef.document.createElement("script");
    js.defer = true;
    js.src = scriptPath;
    windowRef.document.body.appendChild(js);
  }

  public injectGlobalWindowStuff(windowRef: Window): ICustomWindow {
    const customWindow = (windowRef as unknown) as ICustomWindow;
    if (!customWindow.serviceBus) {
      customWindow.serviceBus = this.serviceBus;
    }
    return customWindow;
  }

  private copyScript(windowRef: Window, scriptName: string | RegExp): void {
    Array.from(document.querySelectorAll("script"))
      .filter((scriptTag: HTMLScriptElement) => {
        if (typeof scriptName === "string") {
          return scriptTag.src.includes(scriptName);
        }
        return scriptName.test(scriptTag.src);
      })
      .forEach((zoneJsScriptTag: HTMLScriptElement) => {
        const newScriptTag: HTMLScriptElement = windowRef.document.createElement("script");

        newScriptTag.src = zoneJsScriptTag.src;
        newScriptTag.type = "text/javascript";
        windowRef.document.head.appendChild(newScriptTag);
      });
  }

}
