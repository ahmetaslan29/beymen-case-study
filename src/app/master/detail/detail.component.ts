import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  orderNo!: string;
  order: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.orderNo = this.route.snapshot.paramMap.get('orderNo') || '';
    this.fetchOrderDetails();
  }

  fetchOrderDetails() {
    this.http.get(`http://localhost:3000/dataTable?orderNo=${this.orderNo}`).subscribe((data: any) => {
      this.order = data[0];

    });
  }
}
