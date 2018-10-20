import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  details = this.navParams.get('data');

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewController: ViewController) {

    console.log(this.details);
  }

  closeModal() {
    this.viewController.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
