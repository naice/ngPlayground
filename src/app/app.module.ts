import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PopupComponentComponent } from './popup-component/popup-component.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, PopupComponentComponent]
})
export class AppModule {

  constructor(
    protected readonly injector: Injector,
  ) { this.registerWebComponents(); }

  registerWebComponents(): void {
    setInterval(() => console.log("### BOOTSTRAPPING DONE"), 500);
    console.log("### BOOTSTRAPPING");
    const injector = this.injector;
    if (!customElements.get("app-popup-component")) {
      const element = createCustomElement(PopupComponentComponent, { injector });
      customElements.define("app-popup-component", element);
    }
  }
}
