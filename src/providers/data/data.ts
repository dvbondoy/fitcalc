import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  database: SQLiteObject;

  constructor(public storage: Storage, public sqlite: SQLite) {
    console.log('Hello DataProvider Provider');
  }

  remember(data) {
    return this.storage.set('entries', data);
  }

  settings(data) {
    return this.storage.set('settings', data);
  }

  save(key, data) {
    return this.get(key).then(result => {
      if(result) {
        result.push(data);
        return this.storage.set(key, result);
      } else {
        return this.storage.set(key, [data]);
      }
    });
  }

  update(key, data) {
    return this.storage.remove(key).then(res => {
      return this.storage.set(key, data).then(res => {
        return res;
      });
    });
  }

  delete(key) {
    return this.storage.remove(key).then(res => {
      return res;
    });
  }

  clear() {
    return this.storage.clear().then(result => {
      return result;
    });
  }

  get(key) {
    return this.storage.get(key).then(result => {
      return result;
    });
  }

}
