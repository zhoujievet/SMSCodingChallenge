import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { TestBed } from '@angular/core/testing';
import { Item } from '../item';
import { ItemService } from '../item.service';

/**
 * enum for sort status
 */
const statusEnum = {"Daily":1, 
                    "Weekly":2, 
                    "Monthly":3, 
                    "Often":4, 
                    "Yearly":5, 
                    "Seldom":6,
                    "Once":7, 
                    "Never":8};

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.less'],
  providers: [
  ],
})

export class ItemsComponent implements OnInit {
  
  startDate: Date;
  endDate: Date;
  sortedItem: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  /**
   * get all items and assign the sortedItem variable
   */
  getItems(): void {
    this.itemService.getItems()
      .subscribe(items => this.sortedItem = items);
  }

  /**
   * 
   * event trigged by select startdate datepicker
   * @param type type of the event
   * @param event event contend
   */
  startDateChangeEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startDate = new Date(event.value);
    this.itemService.filterItems( this.startDate.toISOString(), this.endDate ? this.endDate.toISOString() : "")
    .subscribe(items => this.sortedItem = items);
  }

  /**
   * event trigged by select enddate datepicker
   * @param type 
   * @param event 
   */
  endDateChangeEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.endDate = new Date(event.value);
    this.itemService.filterItems( this.startDate ? this.startDate.toISOString() : "", this.endDate.toISOString())
    .subscribe(items => this.sortedItem = items);
  }

  /**
   * function to sort the table
   * @param sort 
   */
  sortData(sort: Sort) {
    const data = this.sortedItem.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedItem = data;
      return;
    }

    this.sortedItem = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'city': return compare(a.city, b.city, isAsc);
        case 'start_date': return compare(a.start_date, b.start_date, isAsc);
        case 'end_date': return compare(a.end_date, b.end_date, isAsc);
        case 'price': return compare(a.price, b.price, isAsc);
        case 'status': return compare(statusEnum[a.status], statusEnum[ b.status ], isAsc);
        case 'color': return compare(a.color, b.color, isAsc);
        default: return 0;
      }
    });
  }
}

/**
 * 
 * compare two string or number
 * @param a first item
 * @param b second item
 * @param isAsc 
 */
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

