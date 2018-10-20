import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { CalculatorPage } from '../pages/calculator/calculator';
import { ResultPage } from '../pages/result/result';
import { HistoryPage } from '../pages/history/history';
import { SettingsPage } from '../pages/settings/settings';
import { DetailsPage } from '../pages/details/details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { SQLite } from '@ionic-native/sqlite';
// import { Toast } from '@ionic-native/toast';
// import { Chart } from 'chart.js';

import { DataProvider } from '../providers/data/data';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { CalculatorProvider } from '../providers/calculator/calculator';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    CalculatorPage,
    TabsPage,
    ResultPage,
    HistoryPage,
    SettingsPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    CalculatorPage,
    TabsPage,
    ResultPage,
    HistoryPage,
    SettingsPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    SQLite,
    // Toast,
    LocalNotifications,
    CalculatorProvider
  ]
})
export class AppModule {}
