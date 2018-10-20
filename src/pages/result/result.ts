import { Component } from '@angular/core';
import { ToastController, NavController, NavParams, ViewController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
// import { Toast } from '@ionic-native/toast';
import { LocalNotifications } from '@ionic-native/local-notifications';
// import { Tabs } from 'ionic-angular/umd/navigation/nav-interfaces';

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {
  // experiment
  // @ViewChild('tabs') tabRef: Tabs;

  result = this.navParams.get('data');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public dataProvider: DataProvider, 
    // public toast: Toast,
    public localNotifications: LocalNotifications,
    public toastCtrl: ToastController
  ) {

  }

  saveData() {
    var date = new Date();
    var today = date.toJSON().slice(0,10);
    // var today = '2018-06-24';

    console.log(today);
    
    var key = today.slice(0,7);
    // var duplicate;

    // experiment, automatically go to history tab after saving
    // this.navCtrl.parent.select(2);
    // this.tabRef.select(1);

    this.dataProvider.get(key).then(res => {
       //check existing data today
      // let duplicate = res ? res.find(dup => dup.date == today) : null;
      var duplicate;
      // var result = res;

      if(res) {
        duplicate = res.find((el) => {
          return el.date == today;
        });
      }

      let showToast = (message)=>{
        // this.toast.show(`Saved.`, '5000', 'center').subscribe(toast => {console.log(toast)});
        let toast = this.toastCtrl.create({
          message:message,
          duration:5000
        });

        toast.present();
      };
      
      if(duplicate !== undefined) {
        // remove existing data
        var data = res.filter(el => {
          return el.date !== today
        });

        // push new data
        data.push(this.result);

        this.dataProvider.update(key, data).then(res => {
          console.log(res);
          if(res) {
            showToast("Saved.");
          }
        }).catch(err => {
          console.log(err);
          showToast("Error saving.");
        });
      } else { // no duplicate found, just save the data
        this.dataProvider.save(key, this.result).then(res => {
          console.log(res);
          if(res) {
            showToast("Saved.");
          }
        }).catch(err => {
          console.log(err);
          showToast("Error saving.");
        });
      }
    }).catch(err => { console.log(err); });

    //set scheduled local notification
    this.dataProvider.get("settings").then(res => {
      if(res && res.notify) {
        let notifyOn = new Date().setDate(new Date().getDate() +7);
        this.localNotifications.schedule({
          id:1,
          text:"Check your weight today!",
          trigger:{ at: new Date(notifyOn) },
          sound:null
        });
      }
    }).catch(err => {
      console.log(err);
    });
    
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');

    var date = new Date();
    var today = date.toJSON().slice(0,7);

    this.dataProvider.get(today)
      .then(res => {
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = res[key];
          }
        }
      });
  }

}
