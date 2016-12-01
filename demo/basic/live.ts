import { Component } from '@angular/core';

@Component({
  selector: 'live-data-demo',
  template: `
    <div>
      <h3>
        Live Data Demo ( not working ATM )
        <small>
          <a href="#" (click)="start()">Start</a>
          <a href="#" (click)="stop()">Stop</a>
        </small>
      </h3>
      <swui-datatable
        #mydatatable
        class="material"
        [headerHeight]="50"
        [limit]="5"
        [columnMode]="'force'"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [trackByProp]="'updated'"
        [rows]="rows">
        <swui-datatable-column name="Type" prop="Type"></swui-datatable-column>
        <swui-datatable-column name="Organization" prop="Organization"></swui-datatable-column>
        <swui-datatable-column name="Date Added" prop="DateAdded"></swui-datatable-column>
        <swui-datatable-column name="Tags" prop="Tags">
          <template let-value="value" swui-datatable-cell-template>
            {{value}}
          </template>
        </swui-datatable-column>
      </swui-datatable>
    </div>
  `
})
export class LiveDataComponent {

  rows: any[] = [];
  active: boolean = true;
  cols: any = [
    'Type', 'Organization', 'DateAdded', 'Tags'
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data.map(d => {
        d.updated = Date.now().toString();
        return d;
      });
    });

    this.start();
  }

  randomNum(start: number, end: number): number {
    return Math.floor(Math.random() * end) + start;
  }

  start(): void {
    if(!this.active) return;

    setTimeout(this.updateRandom.bind(this), 50);
  }

  stop(): void {
    this.active = false;
  }

  updateRandom() {
    const rowNum = this.randomNum(0, 5);
    const cellNum = this.randomNum(0, 4);
    // const newRow = this.randomNum(0, 100);
    const prop = this.cols[cellNum];
    let rows = this.rows;

    if(rows.length) {
      // let rows = [...this.rows];
      
      let row = rows[rowNum];
      row[prop] = Date.now().toString(); // this.rows[newRow][prop];
      row.updated = Date.now().toString();

      // this.rows = rows;
    }

    this.start();
  }

  fetch(cb: any): void {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/security.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

}
