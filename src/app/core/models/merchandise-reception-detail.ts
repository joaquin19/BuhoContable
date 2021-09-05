export class MerchandiseReceptionDetail {
  id: number;
  merchandiseReceptionHeaderId: number;
  purchaseOrderHeaderId: number;
  ArticleId: number;
  code: string;
  name: string;
  description: string;
  fullName: string;
  articleTypeId: number;
  articleTypeName: string;
  unitMeasureId: number;
  unitMeasureName: string;
  unitPrice: number;
  dimension: number;
  quantity: number;
  pendingQuantity: number;
  receivedQuantity: number;
  lastRecord: number;
  createBy: string;
  createdOn: string;
}