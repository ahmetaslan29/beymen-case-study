import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StatCardComponent } from '../../component/stat-card/stat-card.component';
import { TurkishUppercasePipe } from '../../pipes/turkish-uppercase/turkish-uppercase.pipe';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DataTable, Total, StatusEnum,StatCards  } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StatCardComponent,
    TurkishUppercasePipe,
    NgxDaterangepickerMd,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}

  dataTable: DataTable[] = [];
  filteredData: DataTable[] = [];
  paginatedData: DataTable[] = [];
  visiblePages: number[] = [];
  totalPages: number = 0;
  dateTotal: Total = { total: 0 };
  filters: any = {
    shipmentTrackingNo: '',
    orderTrackingNo: '',
    plate: '',
    date: '',
    statu: '',
    releasedForDistribution: '',
  };
  currentPage: number = 1;
  pageSize: number = 5;
  pageSizes: number[] = [5, 10, 20];
  statusEnumEntries: any[] = Object.entries(StatusEnum).filter(([key]) => !isNaN(Number(key)));

  statusText = (status: StatusEnum): string => {
    switch (Number(status)) {
      case StatusEnum.Created:
        return 'Oluşturuldu';
      case StatusEnum.Canceled:
        return 'İptal Edildi';
      case StatusEnum.Delivered:
        return 'Teslim Edildi';
      case StatusEnum.Pending:
        return 'Bekliyor';
      case StatusEnum.NotDelivered:
        return 'Teslim Edilemedi';
      default:
        return 'Bilinmiyor';
    }
  };


  statCards: StatCards[] = [
    { title: 'Rotadaki Paket', value: 721, bgColor: 'bg-blue-100' },
    { title: 'Dm Paket Sayısı', value: 367, bgColor: 'bg-slate-200' },
    { title: 'Dağıtıma Çıkan Paket', value: 250, bgColor: 'bg-blue-100' },
    { title: 'Teslim Edildi', value: 120, bgColor: 'bg-slate-200' },
    { title: 'Teslim Edilemedi', value: 20, bgColor: 'bg-blue-100' },
  ];

  navigateToDetail(orderNo: number): void {
    window.location.href = `/detail/${orderNo}`;
  }

  loadData() {
    this.http.get<DataTable[]>('http://localhost:3000/dataTable').subscribe((data) => {
      this.dataTable = data;
      this.filteredData = data;
      this.updatePaginatedData();
    });

    this.http.get<Total>('http://localhost:3000/total').subscribe((data) => {
      this.dateTotal = data;
    });
  }

  applyFilters() {

    this.filteredData = this.dataTable.filter((item) => {
      const itemDate = new Date(item.Date);
      return (
        (this.filters.shipmentTrackingNo ? item.shipmentTrackingNo.includes(this.filters.shipmentTrackingNo) : true) &&
        (this.filters.orderTrackingNo ? item.orderTrackingNo.toString().includes(this.filters.orderTrackingNo) : true) &&
        (this.filters.plate ? item.plate.includes(this.filters.plate) : true) &&
        (this.filters.date?.startDate ? itemDate >= new Date(this.filters.date['startDate']) && itemDate <= new Date(this.filters.date['endDate']) : true) &&
        (this.filters.statu ? item.Statu === this.filters.statu : true) &&
        (this.filters.releasedForDistribution ? item.releasedForDistribution === this.filters.releasedForDistribution : true)
      );
    });

    this.resetPagination();
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    const startPage = Math.max(1, this.currentPage - 1);
    const endPage = Math.min(this.totalPages, startPage + 2);
    this.visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  onPageSizeChange(event: any) {
    this.pageSize = +event.target.value;
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.updatePaginatedData();
  }

  resetPagination(){
    this.currentPage = 1;
    this.pageSize = 5;
  }
  ngOnInit() {
    this.loadData();
  }
}
