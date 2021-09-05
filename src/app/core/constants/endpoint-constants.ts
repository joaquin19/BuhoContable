import { Injectable } from '@angular/core';
import { ProjectSettings } from './project-settings';

@Injectable({
  providedIn: 'root'
})
export class EndpointsConstants extends ProjectSettings {

  private api = 'api/';
  private version1 = 'v1/';
  private apiLogin = `${this.api}${this.version1}login`;
  private apiMenu = `${this.api}${this.version1}menu`;
  private apiProfileSystem = `${this.api}${this.version1}profileSystem`;
  private apiArticle = `${this.api}${this.version1}article`;
  private apiBank = `${this.api}${this.version1}bank`;
  private apiCountry = `${this.api}${this.version1}country`;
  private apiCurrency = `${this.api}${this.version1}currency`;
  private apiStateProvince = `${this.api}${this.version1}stateProvince`;
  private apiUserSystem = `${this.api}${this.version1}userSystem`;
  private apiArticleType = `${this.api}${this.version1}articleType`;
  private apiUnitMeasure = `${this.api}${this.version1}unitMeasure`;
  private apiSupplierType = `${this.api}${this.version1}supplierType`;
  private apiCustomerType = `${this.api}${this.version1}customerType`;
  private apiCity = `${this.api}${this.version1}city`;
  private apiRequisitionHeader = `${this.api}${this.version1}requisitionHeader`;
  private apiPurchaseOrderHeader = `${this.api}${this.version1}purchaseOrderHeader`;
  private apiPriceHeader = `${this.api}${this.version1}PriceHeader`;
  private apiPriceDetail = `${this.api}${this.version1}PriceDetail`;
  private apiPlant = `${this.api}${this.version1}plant`;
  private apiTax = `${this.api}${this.version1}tax`;
  private apiAuthorizer = `${this.api}${this.version1}authorizer`;
  private apiPaymentType = `${this.api}${this.version1}paymentType`;
  private apiProcessType = `${this.api}${this.version1}processType`;
  private apiRequisitionType = `${this.api}${this.version1}requisitionType`;
  private apiBusinessUnit = `${this.api}${this.version1}businessUnit`;
  private apiPurchaseOrderType = `${this.api}${this.version1}purchaseOrderType`;
  private apiRemissionType = `${this.api}${this.version1}RemissionType`;
  private apiPriceListType = `${this.api}${this.version1}PriceListType`;
  private apiSupplier = `${this.api}${this.version1}supplier`;
  private apiCustomer = `${this.api}${this.version1}customer`;
  private apiSupplierPaymentTerm = `${this.api}${this.version1}supplierPaymentTerm`;
  private apiCustomerPaymentTerm = `${this.api}${this.version1}customerPaymentTerm`;
  private apiCostCenter = `${this.api}${this.version1}costCenter`;
  private apiSupplierContact = `${this.api}${this.version1}supplierContact`;
  private apiSupplierDocumentType = `${this.api}${this.version1}supplierDocumentType`;
  private apiSupplierLegalRepresentative = `${this.api}${this.version1}supplierLegalRepresentative`;
  private apiSupplierFinancial = `${this.api}${this.version1}supplierFinancial`;
  private apiSupplierRecord = `${this.api}${this.version1}supplierRecord`;
  private apiSupplierRecordDocument = `${this.api}${this.version1}supplierRecordDocument`;
  private apiCustomerContact = `${this.api}${this.version1}customerContact`;
  private apiCustomerDocumentType = `${this.api}${this.version1}customerDocumentType`;
  private apiCustomerLegalRepresentative = `${this.api}${this.version1}customerLegalRepresentative`;
  private apiCustomerFinancial = `${this.api}${this.version1}customerFinancial`;
  private apiCustomerRecord = `${this.api}${this.version1}customerRecord`;
  private apiCustomerRecordDocument = `${this.api}${this.version1}customerRecordDocument`;
  private apiPurchaseOrderDetail = `${this.api}${this.version1}purchaseOrderDetail`;
  private apiAuthorizationProcess = `${this.api}${this.version1}authorizationProcess`;
  private apiAuthorizationPriceList = `${this.api}${this.version1}AuthorizationPriceList`;
  private apiRequisitionDetail = `${this.api}${this.version1}requisitionDetail`;
  private apiAccountPayable = `${this.api}${this.version1}accountPayable`;
  private apiMerchandiseReceptionHeader = `${this.api}${this.version1}merchandiseReceptionHeader`;
  private apiMerchandiseReceptionDetail = `${this.api}${this.version1}merchandiseReceptionDetail`;
  private apiMerchandiseReceptionDocument = `${this.api}${this.version1}merchandiseReceptionDocument`;
  private apiRequisitionDocument = `${this.api}${this.version1}requisitionDocument`;
  private apiAccountPayableStatus = `${this.api}${this.version1}accountPayableStatus`;
  private apiPurchaseOrderDocument = `${this.api}${this.version1}purchaseOrderDocument`;
  private apiPriceListDocument = `${this.api}${this.version1}PriceListDocument`;
  private apiExchangeRate = `${this.api}${this.version1}exchangeRate`;
  private apiPurchaseOrderDetailTax = `${this.api}${this.version1}purchaseOrderDetailTax`;
  private apiRequisitionDetailTax = `${this.api}${this.version1}requisitionDetailTax`;
  private apiCostType = `${this.api}${this.version1}costType`;
  private apiReconciliationHeader = `${this.api}${this.version1}reconciliationHeader`;
  private apiInvoice = `${this.api}${this.version1}invoice`;
  private apiReconciliationPurchaseOrderDetail = `${this.api}${this.version1}reconciliationPurchaseOrderDetail`;
  private apiReconciliationRemissionDetail = `${this.api}${this.version1}ReconcilationRemisssisonDetail`;
  private apiReconciliationPriceListDetail = `${this.api}${this.version1}ReconciliationPriceListDetail`;
  private apiSupplierInvoiceHeader = `${this.api}${this.version1}supplierInvoiceHeader`;
  private apiSupplierInvoiceDetail = `${this.api}${this.version1}supplierInvoiceDetail`;
  private apiSupplierInvoiceDocument = `${this.api}${this.version1}supplierInvoiceDocument`;
  private apiAccountBankContact = `${this.api}${this.version1}accountBankContact`;
  private apiAccountBank = `${this.api}${this.version1}accountBank`;
  private apiBalanceMovementHeader = `${this.api}${this.version1}balanceMovementHeader`;
  private apiBalanceMovementDetail = `${this.api}${this.version1}balanceMovementDetail`;
  private apiDownloadFile = `${this.api}${this.version1}downloadFile`;
  private apiCustomerInvoiceHeader = `${this.api}${this.version1}customerInvoiceHeader`;
  private apiCustomerInvoiceDetail = `${this.api}${this.version1}customerInvoiceDetail`;
  private apiCustomerInvoiceDocument = `${this.api}${this.version1}customerInvoiceDocument`;
  private apiProduct = `${this.api}${this.version1}Product`;
  private apiProductType = `${this.api}${this.version1}ProductType`;
  private apiProductLevel = `${this.api}${this.version1}ProductLevel`;
  private apiProjects = `${this.api}${this.version1}Project`;
  private apiProjectCustomer = `${this.api}${this.version1}ProjectCustomer`;
  private apiOrderHeader = `${this.api}${this.version1}OrderHeader`;
  private apiOrderDetail = `${this.api}${this.version1}OrderDetail`;
  private apiSalesSupport = `${this.api}${this.version1}SalesSupport`;
  private apiPreInvoice = `${this.api}${this.version1}PreInvoice`;
  private apiSaleSupportHeader = `${this.api}${this.version1}SaleSupportHeader`;
  private apiSaleSupportDetail = `${this.api}${this.version1}SaleSupportDetail`;
  private apiSaleSupportDetailTax = `${this.api}${this.version1}SaleSupportDetailTax`;

  constructor() {
    super();
  }

  public get getApiLogin(): string {
    return this.apiLogin;
  }

  public get getApiMenu(): string {
    return this.apiMenu;
  }

  public get getApiProfileSystem(): string {
    return this.apiProfileSystem;
  }

  public get getApiArticle(): string {
    return this.apiArticle;
  }

  public get getApiArticleType(): string {
    return this.apiArticleType;
  }

  public get getApiBank(): string {
    return this.apiBank;
  }

  public get getApiCountry(): string {
    return this.apiCountry;
  }

  public get getApiCurrency(): string {
    return this.apiCurrency;
  }

  public get getApiStateProvince(): string {
    return this.apiStateProvince;
  }

  public get getApiUserSystem(): string {
    return this.apiUserSystem;
  }

  public get getApiUnitMeasure(): string {
    return this.apiUnitMeasure;
  }

  public get getApiSupplierType(): string {
    return this.apiSupplierType;
  }

  public get getApiCustomerType(): string {
    return this.apiCustomerType;
  }

  public get getApiCity(): string {
    return this.apiCity;
  }

  public get getApiRequisitionHeader(): string {
    return this.apiRequisitionHeader;
  }

  public get getApiPurchaseOrderHeader(): string {
    return this.apiPurchaseOrderHeader;
  }

  public get getApiPriceHeader(): string {
    return this.apiPriceHeader;
  }

  public get getApiPriceDetail(): string {
    return this.apiPriceDetail;
  }

  public get getApiPlant(): string {
    return this.apiPlant;
  }

  public get getApiTax(): string {
    return this.apiTax;
  }

  public get getApiAuthorizer(): string {
    return this.apiAuthorizer;
  }

  public get getApiPaymentType(): string {
    return this.apiPaymentType;
  }

  public get getApiProcessType(): string {
    return this.apiProcessType;
  }

  public get getApiRequisitionType(): string {
    return this.apiRequisitionType;
  }

  public get getApiBusinessUnit(): string {
    return this.apiBusinessUnit;
  }

  public get getApiPurchaseOrderType(): string {
    return this.apiPurchaseOrderType;
  }

  public get getApiRemissionType(): string {
    return this.apiRemissionType;
  }

  public get getApiPriceListType(): string {
    return this.apiPriceListType;
  }

  public get getApiSupplier(): string {
    return this.apiSupplier;
  }

  public get getApiCustomer(): string {
    return this.apiCustomer;
  }

  public get getApiSupplierPaymentTerm(): string {
    return this.apiSupplierPaymentTerm;
  }

  public get getApiCustomerPaymentTerm(): string {
    return this.apiCustomerPaymentTerm;
  }

  public get getApiCostCenter(): string {
    return this.apiCostCenter;
  }

  public get getApiSupplierContact(): string {
    return this.apiSupplierContact;
  }

  public get getApiSupplierDocumentType(): string {
    return this.apiSupplierDocumentType;
  }

  public get getApiSupplierLegalRepresentative(): string {
    return this.apiSupplierLegalRepresentative;
  }

  public get getApiSupplierFinancial(): string {
    return this.apiSupplierFinancial;
  }

  public get getApiSupplierRecord(): string {
    return this.apiSupplierRecord;
  }

  public get getApiSupplierRecordDocument(): string {
    return this.apiSupplierRecordDocument;
  }

  public get getApiCustomerContact(): string {
    return this.apiCustomerContact;
  }

  public get getApiCustomerDocumentType(): string {
    return this.apiCustomerDocumentType;
  }

  public get getApiCustomerLegalRepresentative(): string {
    return this.apiCustomerLegalRepresentative;
  }

  public get getApiCustomerFinancial(): string {
    return this.apiCustomerFinancial;
  }

  public get getApiCustomerRecord(): string {
    return this.apiCustomerRecord;
  }

  public get getApiCustomerRecordDocument(): string {
    return this.apiCustomerRecordDocument;
  }

  public get getApiPurchaseOrderDetail(): string {
    return this.apiPurchaseOrderDetail;
  }

  public get getApiAuthorizationProcess(): string {
    return this.apiAuthorizationProcess;
  }

  public get getApiAuthorizationPriceList(): string {
    return this.apiAuthorizationPriceList;
  }

  public get getApiRequisitionDetail(): string {
    return this.apiRequisitionDetail;
  }

  public get getApiAccountPayable(): string {
    return this.apiAccountPayable;
  }

  public get getApiMerchandiseReceptionHeader(): string {
    return this.apiMerchandiseReceptionHeader;
  }

  public get getApiMerchandiseReceptionDetail(): string {
    return this.apiMerchandiseReceptionDetail;
  }

  public get getApiMerchandiseReceptionDocument(): string {
    return this.apiMerchandiseReceptionDocument;
  }

  public get getApiRequisitionDocument(): string {
    return this.apiRequisitionDocument;
  }

  public get getApiAccountPayableStatus(): string {
    return this.apiAccountPayableStatus;
  }

  public get getApiPurchaseOrderDocument(): string {
    return this.apiPurchaseOrderDocument;
  }

  public get getApiPriceListDocument(): string {
    return this.apiPriceListDocument;
  }

  public get getApiExchangeRate(): string {
    return this.apiExchangeRate;
  }

  public get getApiPurchaseOrderDetailTax(): string {
    return this.apiPurchaseOrderDetailTax;
  }

  public get getApiRequisitionDetailTax(): string {
    return this.apiRequisitionDetailTax;
  }

  public get getApiCostType(): string {
    return this.apiCostType;
  }

  public get getApiReconciliationHeader(): string {
    return this.apiReconciliationHeader;
  }

  public get getApiInvoice(): string {
    return this.apiInvoice;
  }

  public get getApiReconciliationPurchaseOrderDetail(): string {
    return this.apiReconciliationPurchaseOrderDetail;
  }

  public get getApiReconciliationRemissionDetail(): string {
    return this.apiReconciliationRemissionDetail;
  }

  public get getApiReconciliationPriceListDetail(): string {
    return this.apiReconciliationPriceListDetail;
  }

  public get getApiSupplierInvoiceHeader(): string {
    return this.apiSupplierInvoiceHeader;
  }

  public get getApiSupplierInvoiceDetail(): string {
    return this.apiSupplierInvoiceDetail;
  }

  public get getApiSupplierInvoiceDocument(): string {
    return this.apiSupplierInvoiceDocument;
  }

  public get getApiCustomerInvoiceHeader(): string {
    return this.apiCustomerInvoiceHeader;
  }

  public get getApiCustomerInvoiceDetail(): string {
    return this.apiCustomerInvoiceDetail;
  }

  public get getApiCustomerInvoiceDocument(): string {
    return this.apiCustomerInvoiceDocument;
  }

  public get getApiProduct(): string {
    return this.apiProduct;
  }

  public get getApiProductType(): string {
    return this.apiProductType;
  }

  public get getApiProductLevel(): string {
    return this.apiProductLevel;
  }

  public get getApiProjects(): string {
    return this.apiProjects;
  }

  public get getApiProjectCustomer(): string {
    return this.apiProjectCustomer;
  }

  public get getApiAccountBankContact(): string {
    return this.apiAccountBankContact;
  }

  public get getApiBalanceMovementDetail(): string {
    return this.apiBalanceMovementDetail;
  }

  public get getApiAccountBank(): string {
    return this.apiAccountBank;
  }

  public get getApiBalanceMovementHeader(): string {
    return this.apiBalanceMovementHeader;
  }

  public get getApiDownloadFile(): string {
    return this.apiDownloadFile;
  }

  public get getApiOrderHeader(): string {
    return this.apiOrderHeader;
  }

  public get getApiOrderDetail(): string {
    return this.apiOrderDetail;
  }

  public get getApiSaleSupportHeader(): string {
    return this.apiSaleSupportHeader;
  }

  public get getApiSaleSupportDetail(): string {
    return this.apiSaleSupportDetail;
  }

  public get getApiSaleSupportDetailTax(): string {
    return this.apiSaleSupportDetailTax;
  }

  public get getApiPreInvoice(): string {
    return this.apiPreInvoice;
  }
}
