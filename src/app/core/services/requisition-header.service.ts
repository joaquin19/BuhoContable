import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { RequisitionHeader } from '@app/core/models';
import * as moment from 'moment';
import * as numeral from 'numeral';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class RequisitionHeaderService {

  private endpointRequisitionHeader: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointRequisitionHeader = this.endPoints.getApiRequisitionHeader;
  }

  getRequisitions(userName) {
    const endpoint = this.settings.generateEndpoint(this.endpointRequisitionHeader);
    return this.http.get<RequisitionHeader[]>(`${endpoint}/getRequisitions?userName=${userName}`);
  }

  getRequisitionById(requisitionId) {
    const endpoint = this.settings.generateEndpoint(this.endpointRequisitionHeader);
    return this.http.get<RequisitionHeader>(`${endpoint}/getRequisitionById?requisitionId=${requisitionId}`);
  }

  getAuthorizationPurchaseOrders(requisitionId, userName) {
    const endpoint = this.settings.generateEndpoint(this.endpointRequisitionHeader);
    return this.http.get<RequisitionHeader>(
      `${endpoint}/getAuthorizationPurchaseOrders?requisitionId=${requisitionId}&userName=${userName}`);
  }

  saveRequisition(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointRequisitionHeader);
    return this.http.post<RequisitionHeader>(`${endpoint}/saveRequisition`, form);
  }

  updateRequisition(form: FormData) {
    const endpoint = this.settings.generateEndpoint(this.endpointRequisitionHeader);
    return this.http.put<RequisitionHeader>(`${endpoint}/updateRequisition`, form);
  }

  updateRequisitionSendAuthorization(requisitionSave) {
    const endpoint = this.settings.generateEndpoint(this.endpointRequisitionHeader);
    return this.http.put<RequisitionHeader>(`${endpoint}/updateRequisitionSendAuthorization`, requisitionSave);
  }

  deleteRequisition(requisitionId, deleteBy) {
    const endpoint = this.settings.generateEndpoint(this.endpointRequisitionHeader);
    return this.http.delete<RequisitionHeader>(`${endpoint}/deleteRequisition?requisitionId=${requisitionId}&deleteBy=${deleteBy}`);
  }

  getDocumentDefinition(cols: any, data: any, dataParent: any, taxes: any) {
    console.log(dataParent);
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
                text: 'REQUISICIÓN',
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
                      { text: `${dataParent.plantName}`, style: 'labelFolioRight' }
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
                    { text: `${moment(`${dataParent.dateOrder}`, 'DD-MM-YYYY').format('DD/MM/YYYY')}`, style: 'tableItemCenter' }
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
        this.getDetailObject(cols, data, dataParent, taxes),
        {
          text: '',
          style: 'spaceSection'
        },
        {
          text: '',
          style: 'spaceSection'
        },
        /*{
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
        },*/
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
        labelQuantityTotal: { fontSize: 8, alignment: 'right' }
      },
      defaultStyle: {
        columnGap: 10
      }
    };
  }

  private getDetailObject(cols: any, data: any, dataParent: any, taxes: any) {
    let subTotalGral = 0;
    let totalGral = 0;
    for (const item of data) {
      subTotalGral = numeral(numeral(subTotalGral).value() + numeral(item.subTotal).value()).format('$0,0.0000');
      totalGral = numeral(numeral(totalGral).value() + numeral(item.total).value()).format('$0,0.0000');
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
              { text: o.name, style: 'tableItemCenter' },
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
              { colSpan: 1, text: 'IVA', fillColor: '#DBDBDB', style: 'labelSubTotal' },
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
            { text: `${numeral(totalGral).format('$0,0.00')}`, style: 'fieldTotal' }
          ]
        ]
      }
    };
  }

}
