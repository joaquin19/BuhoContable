import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { PurchaseOrderHeader } from '../models/purchase-order-header';
import * as moment from 'moment';
import * as numeral from 'numeral';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PurchaseOrderType } from '../enums/purchaseOrderType';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderHeaderService {

  private endpointPurchaseOrderHeader: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointPurchaseOrderHeader = this.endPoints.getApiPurchaseOrderHeader;
  }

  getPurchaseOrders(userName) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderHeader);
    return this.http.get<PurchaseOrderHeader[]>(`${endpoint}/getPurchaseOrders?userName=${userName}`);
  }

  getPurchaseOrderById(purchaseOrderId) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderHeader);
    return this.http.get<PurchaseOrderHeader[]>(`${endpoint}/getPurchaseOrderById?purchaseOrderId=${purchaseOrderId}`);
  }

  getAuthorizationRequisitions(purchaseOrderId, userName) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderHeader);
    return this.http.get<PurchaseOrderHeader>(`${endpoint}/getAuthorizationRequisitions?purchaseOrderId=${purchaseOrderId}&userName=${userName}`);
  }

  getPurchaseOrdersNoReconciliation(userName) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderHeader);
    return this.http.get<PurchaseOrderHeader[]>(`${endpoint}/getPurchaseOrdersNoReconciliation?userName=${userName}`);
  }

  savePurchaseOrder(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderHeader);
    return this.http.post<PurchaseOrderHeader>(`${endpoint}/savePurchaseOrder`, form);
  }

  updatePurchaseOrder(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderHeader);
    return this.http.post<PurchaseOrderHeader[]>(`${endpoint}/updatePurchaseOrder`, form);
  }

  updatePurchaseOrderSendAuthorization(purchaseOrderSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderHeader);
    return this.http.put<PurchaseOrderHeader>(`${endpoint}/updatePurchaseOrderSendAuthorization`, purchaseOrderSave);
  }

  updatePurchaseOrdersAuthorize(purchaseOrderSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderHeader);
    return this.http.post<PurchaseOrderHeader[]>(`${endpoint}/updatePurchaseOrdersAuthorize`, purchaseOrderSave);
  }

  updatePurchaseOrdersReject(purchaseOrderSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderHeader);
    return this.http.post<PurchaseOrderHeader[]>(`${endpoint}/updatePurchaseOrdersReject`, purchaseOrderSave);
  }

  deletePurchaseOrder(purchaseOrderId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointPurchaseOrderHeader);
    return this.http.delete<PurchaseOrderHeader>(`${endpoint}/deletePurchaseOrder?purchaseOrderId=${purchaseOrderId}&deleteBy=${deleteBy}`);
  }

  getDocumentDefinition(cols: any, data: any, dataParent: any, taxes: any) {
    const purchaseOrderType = PurchaseOrderType;
    const plantName = (dataParent.plantName == null) ? '' : dataParent.plantName;
    const lastPeriod = (dataParent.lastPeriodStart == null) ? '' : `${moment(`${dataParent.lastPeriodStart}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}-${moment(`${dataParent.lastPeriodEnd}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}`;
    const period = (dataParent.startPeriod === '') ? '' : `${moment(`${dataParent.startPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}-${moment(`${dataParent.endPeriod}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}`;
    const lastTotal = (dataParent.lastPeriodStart == null) ? '' : `${numeral(dataParent.lastTotal).format('$0,0.0000')}`;
    const lastCurrencyCode = (dataParent.lastPeriodStart == null) ? '' : dataParent.lastCurrencyCode;
    return {
      header: (currentPage) => {
        if (currentPage > 1) {
          return [
            {
              text: `${dataParent.businessUnitName} (${dataParent.costCenterName})`,
              style: 'labelHeaderPagin'
            }
          ];
        }
      },
      footer: {
        columns: [
          {
            text: `${dataParent.createdOn}`,
            style: 'labelHeaderPagin'
          }
        ]
      },
      content: [
        {
          columns: [
            [
              {
                text: `${dataParent.businessUnitName} (${dataParent.costCenterName})`,
                style: 'labelBusinessUnit'
              },
              {
                columns: [
                  {
                    image: `${this.settings.base64Logo()}`,
                    width: 70,
                    height: 20
                  },
                  { width: 190, text: 'KRAEM, S.A. DE C.V.', style: 'nameCompany' }
                ]
              },
              {
                text: 'AVENIDA INDUSTRIAL #560, FINSA, GUADALUPE, N.L, C.P. 67132',
                style: 'tableItemLeft'
              },
              {
                text: '',
                style: 'spaceSection'
              },
              {
                height: 20,
                text: 'ORDEN DE COMPRA',
                style: 'labelPO'
              },
            ],
            [
              {
                height: 20, style: 'tableAuthorizationRight', table: {
                  widths: [31, 30, 30, 30],
                  body: [
                    [
                      { text: 'SOLICITANTE', style: 'tableLabelCenter' },
                      { text: 'REVISO', style: 'tableLabelCenter' },
                      { text: 'APROBO', style: 'tableLabelCenter' },
                      { text: 'AUTORIZO', style: 'tableLabelCenter' }
                    ],
                    [
                      { text: `${dataParent.createBy}`, style: 'boxAuthorization' },
                      { text: 'EDUARDO', style: 'boxAuthorization' },
                      { text: 'KS.CHO', style: 'boxAuthorization' },
                      { text: 'GE.SON', style: 'boxAuthorization' }
                    ]
                  ]
                },
              },
              {
                text: '',
                style: 'spaceSection'
              },
              {
                style: 'tableRight', table: {
                  widths: [60, 60],
                  body: [
                    [
                      { text: 'PLANTA', color: 'blue', fillColor: '#DBDBDB', style: 'labelFolioLeft' },
                      { text: `${plantName}`, style: 'labelFolioRight' }
                    ],
                    [
                      { text: 'NO. FOLIO', color: 'blue', fillColor: '#DBDBDB', style: 'labelFolioLeft' },
                      { text: `${dataParent.folio}`, style: 'labelFolioRight' }
                    ],
                    [
                      { text: 'FECHA', color: 'blue', fillColor: '#DBDBDB', style: 'labelFolioLeft' },
                      { text: `${moment(`${dataParent.createdOn}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}`, style: 'labelFolioRight' }
                    ],
                    [
                      { text: 'NO. PROV.', color: 'blue', fillColor: '#DBDBDB', style: 'labelFolioLeft' },
                      { text: `${dataParent.supplierId}`, style: 'labelFolioRight' }
                    ],
                    [
                      { text: 'NO. FACTURA', color: 'blue', fillColor: '#DBDBDB', style: 'labelFolioLeft' },
                      { text: '', style: 'labelFolioRight' }
                    ]
                  ]
                },
              }
            ]
          ]
        },
        {
          text: '',
          style: 'spaceSection'
        },
        {
          text: 'PROVEEDOR',
          style: 'labelSupplier'
        },
        {
          columns: [
            {
              width: 120, height: 20, style: { alignment: 'right' }, table: {
                widths: [50, 160, 100, 160],
                body: [
                  [
                    { text: 'NOMBRE', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.supplierName}`, style: 'tableItemCenter' },
                    { text: 'FECHA REQUERIDA', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${moment(`${dataParent.estimatedDate}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}`, style: 'tableItemCenter' }
                  ],
                  [
                    { text: 'CONTACTO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.supplierContactName}`, style: 'tableItemCenter' },
                    { text: 'CONDICIONES DE PAGO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.supplierPaymentTermName}`, style: 'tableItemCenter' }
                  ],
                  [
                    { text: 'TEL.', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.supplierPhone}`, style: 'tableItemCenter' },
                    { text: 'TIPO DE PAGO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: `${dataParent.paymentTypeName}`, style: 'tableItemCenter' }
                  ]
                ]
              },
            }
          ]
        },
        {
          text: '',
          style: 'spaceSection'
        },
        this.getPeriodSection(dataParent, period, purchaseOrderType),
        {
          text: '',
          style: 'spaceSection'
        },
        this.getDetailObject(cols, data, dataParent, taxes),
        {
          text: '',
          style: 'spaceSection'
        },
        {
          columns: [
            {
              width: 'auto', height: 20, table: {
                widths: [100, 388],
                body: [
                  [
                    { text: 'NOTA', style: 'tableHeaderLeft', fillColor: '#FF8B8B' },
                    { text: `${dataParent.notes}`, style: 'tableHeaderLeft' }
                  ]
                ]
              },
            }
          ]
        },
        {
          text: '',
          style: 'spaceSection'
        },
        {
          columns: [
            {
              width: 'auto', height: 20, table: {
                widths: [100, 388],
                body: [
                  [
                    { text: 'OBSERVACIÓN (MATERIAL/CALIDAD)', fillColor: 'FFFF00', style: 'tableHeaderLeft' },
                    { text: `${dataParent.observations}`, style: 'tableHeaderLeft' }
                  ]
                ]
              },
            }
          ]
        },
        {
          text: '',
          style: 'spaceSection'
        },
        {
          columns: [
            {
              margin: [55, 0, 0, 0],
              width: 'auto',
              height: 20,
              table: {
                widths: [90, 90, 90, 90],
                body: [
                  [
                    { text: 'MATERIAL', rowSpan: 6, style: 'boxes' },
                    { text: 'CALIDAD', rowSpan: 6, style: 'boxes' },
                    { text: 'FECHA', fillColor: '#DBDBDB', style: 'labelHeader' },
                    { text: '' }
                  ],
                  [
                    {}, {},
                    { text: 'RECIBIÓ', fillColor: '#DBDBDB', style: 'labelHeader' },
                    { text: '' }
                  ],
                  [
                    {}, {},
                    { text: 'QTY', fillColor: '#DBDBDB', style: 'labelHeader' },
                    { text: '' }
                  ],
                  [
                    {}, {},
                    { text: 'ALMACÉN', fillColor: '#DBDBDB', style: 'labelHeader' },
                    { text: '' }
                  ],
                  [
                    {}, {},
                    { text: 'LOTE', fillColor: '#DBDBDB', style: 'labelHeader' },
                    { text: '' }
                  ],
                  [
                    {}, {},
                    { text: 'No FACTURA', fillColor: '#DBDBDB', style: 'labelHeader' },
                    { text: '' }
                  ],
                ]
              }
            }
          ]
        },
      ],
      styles: {
        nameCompany: { bold: true, fontSize: 15, color: 'black', alignment: 'left', margin: [0, 5, 0, 0] },
        labelFolioRight: { fontSize: 7, color: 'black', alignment: 'right' },
        labelFolioLeft: { fontSize: 7, color: 'black', alignment: 'left' },
        labelHeader: { bold: true, fontSize: 10, color: 'black', alignment: 'left' },
        fieldHeader: { fontSize: 10, color: 'black', alignment: 'center' },
        tableHeaderCenter: { bold: true, fontSize: 9, color: 'black', alignment: 'center' },
        tableHeaderRight: { bold: true, fontSize: 9, color: 'black', alignment: 'right' },
        tableHeaderLeft: { bold: true, fontSize: 9, color: 'black', alignment: 'left' },
        tableItemCenter: { fontSize: 8, color: 'black', alignment: 'center' },
        tableItemRight: { fontSize: 8, color: 'black', alignment: 'right' },
        tableItemLeft: { fontSize: 8, color: 'black', alignment: 'left' },
        labelSubTotal: { bold: true, fontSize: 10, color: 'black', alignment: 'left' },
        fieldSubTotal: { fontSize: 8, color: 'black', alignment: 'right' },
        labelTotal: { bold: true, fontSize: 10, color: 'black', alignment: 'left' },
        fieldTotal: { fontSize: 8, color: 'black', alignment: 'right' },
        tableLabelRight: { fontSize: 5, color: 'black', alignment: 'right' },
        tableLabelCenter: { fontSize: 5, color: 'black', alignment: 'center' },
        tableRight: { margin: [88, 0, 0, 0] },
        tableAuthorizationRight: { margin: [70, 0, 0, 0] },
        tableAuthorization: { margin: [0, 20, 0, 10] },
        labelPO: {
          bold: true,
          fontSize: 20,
          color: 'black',
          alignment: 'right',
          arial: true,
          margin: [0, 20, 0, 0],
          decoration: 'underline'
        },
        labelSupplier: { bold: true, fontSize: 15, color: 'black', alignment: 'center', arial: true },
        labelProducts: { bold: true, fontSize: 12, color: 'black', alignment: 'center', arial: true },
        boxes: { bold: true, fontSize: 10, color: 'black', alignment: 'center', margin: [0, 40, 0, 0] },
        boxAuthorization: { bold: true, fontSize: 5, color: 'black', alignment: 'center', margin: [0, 20, 0, 0] },
        spaceSection: { margin: [0, 20, 0, 10] },
        labelBusinessUnit: { fontSize: 8, color: 'black', alignment: 'left', margin: [0, -32, 0, 30] },
        labelHeaderPagin: { fontSize: 8, color: 'black', alignment: 'left', margin: [40, 10, 0, 0] },
        labelFooterPagin: { fontSize: 8, color: 'black', alignment: 'right', margin: [0, 0, 40, 0] },
        labelQuantityTotal: { fontSize: 8, alignment: 'right' }
      },
      defaultStyle: {
        columnGap: 10
      }
    };
  }

  private getPeriodSection(dataParent, period, purchaseOrderType) {
    const previousAmount = (dataParent.previousAmount == null) ? '' : dataParent.previousAmount;
    if (dataParent.purchaseOrderTypeId == purchaseOrderType.StandardProjectCustomer) {
      return {
        columns: [
          {
            width: 120, height: 20, style: { alignment: 'right' }, table: {
              widths: [50, 50, 50, 60, 100, 160],
              body: [
                [
                  { text: 'PERIODO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                  { text: `${period}`, style: 'tableItemCenter' },
                  { text: 'PROYECTO CLIENTE', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                  { text: `${dataParent.projectName}`, style: 'tableItemCenter' },
                  { text: 'MONTO ANTERIOR', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                  { text: `${previousAmount}`, style: 'tableItemCenter' }
                ],
              ]
            }
          }
        ]
      }
    } else {
      return {
        columns: [
          {
            width: 120, height: 20, style: { alignment: 'right' }, table: {
              widths: [50, 160, 100, 160],
              body: [
                [
                  { text: 'PERIODO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                  { text: `${period}`, style: 'tableItemCenter' },
                  { text: 'MONTO ANTERIOR', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                  { text: `${previousAmount}`, style: 'tableItemCenter' }
                ],
              ]
            }
          }
        ]
      };
    }
  }

  private getDetailObject(cols: any, data: any, dataParent: any, taxes: any) {
    let subTotalGral = 0;
    let totalGral = 0;
    for (const item of data) {
      subTotalGral = numeral(subTotalGral).value() + numeral(item.subTotal).value();
      totalGral = numeral(totalGral).value() + numeral(item.total).value();
    }
    let quantityTotal: any = 0;
    const headerTitle: any = [{ colSpan: 8, text: 'PRODUCTOS REQUERIDOS', fillColor: '#DBDBDB', style: 'labelProducts' },
    {}, {}, {}, {}, {}, {}, {}];
    const headers: any = [
      { text: 'No.', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'NO. PARTE', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'DESCRIPCIÓN', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'DIMENSIÓN', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'CANTIDAD', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'U/M', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PRECIO UNITARIO', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PRECIO TOTAL', fillColor: '#FFFF99', style: 'tableHeaderCenter' }
    ];

    // cols.forEach(element => {
    //   const itemHeader: any = {};
    //   itemHeader.text = element.header.toUpperCase();
    //   itemHeader.style = 'tableHeaderCenter';
    /*switch (element.textAlign) {
      case 'center':
        itemHeader.style = 'tableHeaderCenter';
        break;
      case 'right':
        itemHeader.style = 'tableHeaderRight';
        break;
      case 'left':
        itemHeader.style = 'tableHeaderLeft';
        break;
    }*/
    //   itemHeader.fillColor = '#FFFF99';
    //   headers.push(itemHeader);
    // });

    return {
      table: {
        headerRows: 2,
        widths: [15, 30, 100, 49, 45, 38, 77, 80],
        body: [
          headerTitle,
          headers,
          ...data.map((o, index) => {
            quantityTotal = quantityTotal + o.quantity;
            return [
              { text: index + 1, style: 'tableItemCenter' },
              { text: o.code, style: 'tableItemCenter' },
              { text: o.articleName, style: 'tableItemCenter' },
              { text: o.dimension, style: 'tableItemCenter' },
              { text: o.quantity, style: 'tableItemCenter' },
              { text: o.unitMeasureName, style: 'tableItemCenter' },
              { text: `${numeral(o.unitPrice).format('$0,0.0000')}`, style: 'tableItemRight' },
              { text: `${numeral(o.subTotal).format('$0,0.0000')}`, style: 'tableItemRight' }
            ];
          }),
          [
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { colSpan: 2, text: 'Total cantidad:', style: 'labelQuantityTotal' },
            { text: '', border: [false, false, false, false] },
            { text: `${quantityTotal}`, style: 'tableItemCenter', },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] }
          ],
          [
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { colSpan: 1, text: 'SUB TOTAL:', fillColor: '#DBDBDB', style: 'labelSubTotal' },
            { text: `${numeral(subTotalGral).format('$0,0.00')}`, style: 'fieldSubTotal', }
          ],
          ...taxes.map((t, indexT) => {
            return [
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
              { colSpan: 1, text: `${t.name}`, fillColor: '#DBDBDB', style: 'labelSubTotal' },
              { text: `${numeral(t.amount).format('$0,0.00')}`, style: 'fieldSubTotal' }
            ];
          }),
          [
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { colSpan: 1, text: 'TOTAL:', fillColor: '#DBDBDB', style: 'labelTotal' },
            { text: `${dataParent.currencyCode} ${numeral(totalGral).format('$0,0.00')}`, style: 'fieldTotal' }
          ]
        ]
      }
    };
  }

}
