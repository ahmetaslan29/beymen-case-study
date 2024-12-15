import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IndexService } from '../../services/index.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit,OnDestroy {
  orderNo!: string;
  order: any;
  subscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private _http: IndexService) {}

  ngOnInit() {
    this.subscription = this.route.paramMap.subscribe((paramMap) => {
      this.orderNo = paramMap.get('orderNo') || '';
      this.fetchOrderDetails();
    });
  }

  fetchOrderDetails() {
    this._http.getDataTable( (res) =>
      {this.order = res[0]},
      { orderNo: this.orderNo }
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
