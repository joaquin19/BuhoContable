export class RemissionHeader {
  id: number;
  folio: string;
  remissionTypeId: number;
  remissionTypeName: string;
  businessUnitId: number;
  businessUnitName: string;
  costCenterId: number;
  costCenterName: string;
  requisitionHeader: number;
  supplierId: number;
  supplierName: string;
  supplierContactId: number;
  supplierContactName: string;
  paymentTypeId: number;
  paymentTypeName: string;
  paymentTermId: number;
  paymentTermName: string;
  statusId: number;
  statusNameName: string;
  currencyId: number;
  CurrencyCode: string;
  CurrencyName: string;
  LastCurrencyCode: string;
  LastTotal: number;
  plantId: number;
  plantName: string;
  LastPeriodStart: string;
  LastPeriodEnd: string;
  startPeriod: string;
  endPeriod: string;
  estimatedDate: string;
  previousAmount: string;
  subTotal: number;
  taxes: number;
  total: number;
  notes: string;
  observations: string;
  createBy: string;
  createdOn: string;
}
