import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IndexService } from '../../services/index.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  orderNo!: string;
  order: any;

  constructor(private route: ActivatedRoute, private _http: IndexService) {}

  ngOnInit() {
    this.orderNo = this.route.snapshot.paramMap.get('orderNo') || '';
    this._http.getDataTable( res => {this.order = res[0];}, { orderNo: this.orderNo });
  }

}
