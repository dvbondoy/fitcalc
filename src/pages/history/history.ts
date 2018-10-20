import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Chart } from 'chart.js';

import { DetailsPage } from '../details/details';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  @ViewChild('lineCanvas') lineCanvas;

  items: any;
  lineChart: any;
  date:any;
  month:any;
  year:any;
  currentMonth:any;
  // currentYear: any;


  months = {
    0:"January",
    1:"February",
    2:"March",
    3:"April",
    4:"May",
    5:"June",
    6:"July",
    7:"August",
    8:"September",
    9:"October",
    10:"November",
    11:"December"
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public dataProvider: DataProvider,
    public modalController: ModalController) {

  }

  clear() {
    this.dataProvider.clear().catch(err => {
      console.log(err);
    });
  }

  ionViewWillEnter() {
    let key = this.generateKey(this.month);
    this.generateReport(key);
  }

  prevMonth() {
    if(this.month != 0){
      this.month -= 1;
    } else {
      this.month = 11;
      this.year -= 1;
    }

    this.currentMonth = this.months[this.month];
    
    let key = this.generateKey(this.month);
    this.generateReport(key);
  }

  nextMonth(){
    if(this.month != 11){
      this.month += 1;
    } else {
      this.month = 0;
      this.year += 1;
    }

    this.currentMonth = this.months[this.month];

    let key = this.generateKey(this.month);
    this.generateReport(key);
  }

  generateReport(key) {
    this.dataProvider.get(key).then(res => {
      this.items = res;
      this.generateChart(res);
    }).catch(err => {
      this.generateChart({});
    });
  }

  // todo
  viewDetails(item) {
    let detailsModal = this.modalController.create(DetailsPage, {data:item});
    detailsModal.present();
  }

  private generateKey(num) {
    // add one since our months start from zero
    let char = (num + 1).toString();

    if(char.length == 1){
      char = "0" + char;
    }

    let key = this.year + "-" + char;

    return key;
  }

  private generateChart(data) {
    var labels = function(res) {
      let lab = [];
      for(let i = 0, len = res.length; i < len; i++) {
        lab.push(res[i].date.slice(8,10));
      }
      return lab;
    };

    var chartData = function(res) {
      let dat = [];
      for(let i = 0, len = res.length; i < len; i++) {
        dat.push(res[i].bmi.bmi);
      }
      return dat;
    };

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type:'line',
      data: {
        labels:labels(data),
        datasets:[
          {
            label: this.months[this.month],
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data:chartData(data),
            spanGaps: false
          }
        ]
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
    this.date = new Date();
    this.month = this.date.getMonth();
    this.year = this.date.getFullYear();
    // //get month in words
    this.currentMonth = this.months[this.month];
  }

}
