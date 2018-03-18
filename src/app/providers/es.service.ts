import { Injectable } from '@angular/core';

import es from 'elasticsearch';

@Injectable()
export class ESService extends es.Client {

  constructor() {
    super({
      host: 'http://localhost:9200',
      log: 'info',
      createNodeAgent: function () {
        return false;
      }
    });
  }

  index(params, cb) {
    super.index(params, cb);
  }

  search(params, cb) {
    super.search(params, cb);
  }

  get(params, cb) {
    super.get(params, cb);
  }

}
