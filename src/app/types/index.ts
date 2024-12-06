export interface DataTable {
  orderNo: number;
  shipmentTrackingNo: string;
  orderTrackingNo: string;
  customerName: string;
  district: string;
  plate: string;
  Statu: StatusEnum
  releasedForDistribution: string;
  Date: string;
}

export interface StatCards {
  title: string;
  value:number;
  bgColor:string;
}

export interface Total {
  total: number;
 }

export enum StatusEnum {
  Created = 0,          // Oluşturuldu
  Canceled = 1,         // İptal Edildi
  Delivered = 2,        // Teslim Edildi
  Pending = 3,          // Bekliyor
  NotDelivered = 4      // Teslim Edilemedi
}
