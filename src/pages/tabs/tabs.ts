import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';
// import { BmiPage } from '../bmi/bmi';
// import { BmrPage } from '../bmr/bmr';
import { CalculatorPage } from '../calculator/calculator';
import { HistoryPage } from '../history/history';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  aboutTab = AboutPage;
  calculatorTab = CalculatorPage;
  historyTab = HistoryPage;
  settingsTab = SettingsPage;

  constructor() {

  }
}
