import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { ResultPage } from '../../pages/result/result';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CalculatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {
  height: number;
  weight: number;
  age: number;
  sex: string = "male";
  activity: string = "0";
  goal: string = "0";

  ideal = {
    58:'41 to 53 kgs',
    59:'42 to 55 kgs',
    60:'44 to 57 kgs',
    61:'45 to 59 kgs',
    62:'47 to 61 kgs',
    63:'48 to 63 kgs',
    64:'49 to 65 kgs',
    65:'51 to 67 kgs',
    66:'53 to 70 kgs',
    67:'55 to 71 kgs',
    68:'56 to 74 kgs',
    69:'58 to 76 kgs',
    70:'60 to 78 kgs',
    71:'61 to 80 kgs',
    72:'63 to 83 kgs',
    73:'65 to 85 kgs',
    74:'67 to 87 kgs',
    75:'69 to 90 kgs',
    76:'70 to 92 kgs'
  };

  goals = {
    "0":"Maintain weight",
    "1":"Lose 1 lb a week",
    "2":"Lose 2 lb a week",
    "3":"Gain 1 lb a week",
    "4":"Gain 2 lb a week"
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public dataProvider: DataProvider,
    public modalCtrl: ModalController) {
    
    this.dataProvider.get('settings')
    .then(settings => {
      if(settings.remember) this.populateRemember();
      if(settings.activity) this.activity = settings.activity;
      if(settings.goal) this.goal = settings.goal;
    });
  }

  calculate() {
    let date = new Date();
    let result = {info:{},bmi:{},bmr:{},calories:{},date:'',prev:{}};
    
    result.date = date.toJSON().slice(0, 10);
    // result.date = '2018-06-24';
    result.bmi = this.calculateBMI();
    result.bmr = this.calculateBMR();
    result.calories = this.calculateCalories(result.bmr);
    ////////////////////////////////////////
    result.prev = {};
    /////////////////////////////////////////
    result.info = {
      weight:this.weight,
      height:this.height,
      age:this.age,
      sex:this.sex,
      activity:this.activity,
      goal:this.goals[this.goal],
      weightgoal:this.weightGoal()
      // previous:this.goalCheck()
      // achievement:this.achievement()
    };
    
    let achieve = this.goalCheck();

    if(achieve !== null) {
      console.log(achieve);
    }

    console.log(result);
    
    //save inputs
    this.remember();
    // this.achievement();

    let myModal = this.modalCtrl.create(ResultPage, {data:result});
    myModal.present();
  }

  private weightGoal() {
    let goal;
    switch(this.goal) {
      case '0':
        goal = this.weight;
        break;
      case '1':
        goal = this.weight - 0.45;
        break;
      case '2':
        goal = this.weight - 0.90;
        break;
      case '3':
        goal = this.weight + 0.45;
        break;
      case '4':
        goal = this.weight + .90;
        break;
    }

    return goal;
  }

  private populateRemember() {
    this.dataProvider.get('entries').then(entries => {
      if(entries) {
        // populate fields with last inputs
        this.height = entries.height;
        this.weight = entries.weight;
        this.age = entries.age;
        this.sex = entries.sex;
      }
    }).catch(err => {
      console.log(err);
    });
  }

  // todo
  private goalCheck() {
    let lastWeek = () => {
      let date = new Date().setDate(new Date().getDate() - 7);
      return new Date(date).toJSON().slice(0,10);
    }

    console.log(lastWeek());
    
    let seven_days_b4 = lastWeek();

    console.log(seven_days_b4);

    let key = seven_days_b4.slice(0,7);
    
    this.dataProvider.get(key).then(res => {
      console.log(res);
      if(res) {
        let item = res.find(el => {
          return el.date == seven_days_b4;
        });

        console.log(item);

        return item;
      } else {
        return undefined;
      }
    });
  }

  private remember() {
    let data = {
      sex: this.sex,
      height: this.height,
      weight: this.weight,
      age: this.age
    }

    this.dataProvider.remember(data).catch(err => {
      console.log(err);
    });
  }

  private calculateCalories(bmr) {
    var calories = 0;
    var goal = 0;

    switch(this.activity) {
      case '0':
        calories = bmr*1.2;
        break;
      case '1':
        calories = bmr*1.375;
        break;
      case '2':
        calories = bmr*1.55;
        break;
      case '3':
        calories = bmr*1.725;
        break;
      case '4':
        calories = bmr*1.9;
        break;
    }

    switch(this.goal) {
      case '0':
        goal = calories;
        break;
      case '1':
        goal = calories - 500;
        break;
      case '2':
        goal = calories - 1000;
        break;
      case '3':
        goal = calories + 500;
        break;
      case '4':
        goal = calories + 1000;
        break;
    }

    //let's set the minimum calories for male and female
    switch(this.sex) {
      case "male":
        goal = (goal < 1800 ? 1800 : goal);
        calories = (calories < 1800 ? 1800 : calories);
        break;
      case "female":
        goal = (goal < 1200 ? 1200 : goal);
        calories = (calories < 1200 ? 1200 : calories);
        break;
    }

    return {calories:Math.round(calories), calgoal:Math.round(goal)};
  }

  private calculateBMR() {
    //we need to convert weight into lbs
    var bmr;
    switch(this.sex) {
      case "male":
        bmr = 66 + (6.23 * (this.weight * 2.20462)) + (12.7 * this.height) - (6.8 * this.age);
        return Math.round(bmr);
      case "female":
        bmr = 665 + (4.35 * (this.weight * 2.20462)) + (4.7 * this.height) - (4.7 * this.age);
        // this.bmrValue = Math.round(bmr);
        return Math.round(bmr);
      default:
        break;
    }
  }

  private calculateBMI() {
    //we need to convert height to cm
    if(this.weight > 0 && this.height > 0) {
      //compute bmi
      var finalBmi = this.weight / ((this.height * 2.54) / 100 * (this.height * 2.54) / 100);
      var bmi = Math.round(finalBmi);
      var ideal_weight;
      //bmi category
      var category = this.bmiCategory(bmi);
      //get ideal weight
      if(this.height in this.ideal){
        ideal_weight = this.ideal[this.height];
      } else {
        ideal_weight = "unkown";
      }

      return {bmi:bmi, category: category, ideal:ideal_weight};
    }
  }

  private bmiCategory(bmiValue) {
    if(bmiValue < 18.5) {
      return "Underweight";
    }else if(bmiValue >= 18.5 && bmiValue < 25) {
      return "Normal";
    } else if(bmiValue >= 25 && bmiValue < 30) {
      return "Overweight";
    } else if(bmiValue >= 30) {
      return "Obese";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculatorPage');
  }

}
