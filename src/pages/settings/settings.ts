import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  remember: boolean;
  notifyme: boolean;
  goal: any;
  activity: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dataProvider: DataProvider,
    public toastCtrl: ToastController) {

    this.dataProvider.get('settings')
    .then(res => {
      if(res) {
        this.remember = res.remember;
        this.notifyme = res.notify;
        this.goal = res.goal;
        this.activity = res.activity;
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  // save_remember() {
  //   let data = {remember:this.remember,notify:this.notifyme};
  //   this.dataProvider.settings(data).catch(err => { console.log(err); });
  // }

  // save_notifyme() {
  //   let data = {notify: this.notifyme,remember:this.remember};
  //   this.dataProvider.settings(data).catch(err => { console.log(err); });
  // }

  save() {
    // this.dataProvider.delete('settings');
    let data = {
      remember:this.remember,
      notify:this.notifyme,
      goal:this.goal,
      activity:this.activity
    };
    
    this.dataProvider.settings(data)
    .then(res => {
      if(res) {
        this.showToast("New settings saved.");
      }
    })
    .catch(err => {
      this.showToast("Error saving.");
      console.log(err);
    });
  }

  private showToast(message) {
    let toast = this.toastCtrl.create({
      message:message,
      duration:5000
    });

    return toast.present();
  }

}
