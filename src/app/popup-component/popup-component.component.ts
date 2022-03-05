import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ICustomWindow } from '../popup.service';

@Component({
  selector: 'app-popup-component',
  templateUrl: './popup-component.component.html',
  styleUrls: ['./popup-component.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PopupComponentComponent implements OnInit {

  protected customWindow = (window as unknown) as ICustomWindow;
  public value$ = this.customWindow.serviceBus.asObservable();

  constructor() { }

  ngOnInit(): void {
    this.value$.subscribe((val) => console.log(val));
  }

}
