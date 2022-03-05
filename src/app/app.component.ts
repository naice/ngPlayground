import { Component } from '@angular/core';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngPlayground';
  constructor(
    public popupService: PopupService,
  ) {
    popupService.injectGlobalWindowStuff(window);
  }

  public openPopup(): void {
    this.popupService.openPopup("<app-popup-component></app-popup-component>")
  }
  public injectTime(): void {
    this.popupService.serviceBus.next((new Date()).getTime() + "");
  }
}
