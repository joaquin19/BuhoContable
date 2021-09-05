
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectSettings, EndpointsConstants } from '@app/core/constants';
import { Invoice } from '../models/invoice';
import * as moment from 'moment';
import * as numeral from 'numeral';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private endpointInvoice: string;

  constructor(
    private http: HttpClient,
    private settings: ProjectSettings,
    private endPoints: EndpointsConstants
  ) {
    this.endpointInvoice = this.endPoints.getApiInvoice;
  }

  getInvoices(stateId) {
    const endpoint = this.settings.generateEndpoint(this.endpointInvoice);
    return this.http.get<Invoice[]>(`${endpoint}/getInvoices?stateId=${stateId}`);
  }

  getDocumentDefinition(cols: any, data: any, dataParent: any, taxes: any) {
    return {
      content: [
        {
          columns: [
            [
              {
                columns: [
                  {
                    image: `${this.settings.base64Logo()}`,
                    width: 70,
                    height: 20
                  }
                ]
              },
              {
                text: 'MÉXICO - - MTY & SLP',
                style: 'tableItemLeft'
              },
              {
                text: '560 AVENIDA INDUSTRIAL FINSA NL',
                style: 'tableItemLeft'
              },
              {
                width: 190,
                text: 'KRAEM, S.A. DE C.V.', style: 'nameCompany'
              },
              {
                text: 'AVENIDA INDUSTRIAL No. 560 FINSA GUADALUPE',
                style: 'tableItemLeft'
              },
              {
                text: 'Guadalupe Nuevo León México',
                style: 'tableItemLeft'
              },
              {
                text: 'RFC: KRA061027MT5',
                style: 'tableItemLeft'
              },
              {
                text: '601 - General de Ley Personas Morales',
                style: 'tableItemLeft'
              }
            ],
            [
              {
                height: 20, style: 'tableAuthorizationRight', table: {
                  widths: [75, 45],
                  body: [
                    [
                      { colSpan: 2, text: 'FACTURA', style: 'tableLabelCenter' },
                      {}
                    ],
                    [
                      { text: 'ORDEND E COMPRA', style: 'boxAuthorization' },
                      { text: 'NUMERO', style: 'boxAuthorization' }
                    ],
                    [
                      { text: 'N/A', style: 'boxAuthorization' },
                      { text: '4564', style: 'labelInvoice' }
                    ]
                  ]
                },
              },
              {
                text: '',
                style: 'spaceSection'
              }
            ]
          ]
        },
        {
          width: 120, height: 0, margin: [140, -22, 0, 0],
          table: {
            widths: [200],
            body: [
              [{
                height: 20,
                text: 'Confirmación Facturación',
                style: 'labelPO'
              }
              ]
            ]
          }
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
                    { text: '', style: 'tableItemCenter' },
                    { text: 'FECHA DE RECIBIR', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: '', style: 'tableItemCenter' }
                  ],
                  [
                    { text: 'CONTACTO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: '', style: 'tableItemCenter' },
                    { text: 'CONDICIONES DE PAGO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: '', style: 'tableItemCenter' }
                  ],
                  [
                    { text: 'TEL.', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: '', style: 'tableItemCenter' },
                    { text: 'TIPO DE PAGO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: '', style: 'tableItemCenter' }
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
              width: 120, height: 20, style: { alignment: 'right' }, margin: [0, -13, 0, 0],
              table: {
                widths: [50, 160, 100, 160],
                body: [
                  [
                    { text: 'PERIODO', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: '', style: 'tableItemCenter' },
                    { text: 'MONTO ANTERIOR', fillColor: '#DBDBDB', style: 'tableItemLeft' },
                    { text: '', style: 'tableItemCenter' }
                  ],
                ]
              }
            }
          ]
        },
        {
          text: '',
          style: 'spaceSection'
        },
        {
          columns: [
            [this.getPODetailObject()],
            [this.getInvoiceDetailObject()]
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
                    { text: 'DISCREPANCIA', style: 'tableHeaderLeft', fillColor: '#FF8B8B' },
                    { text: '', style: 'tableHeaderLeft' }
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
                    { text: 'JUSTIFICACIÓN', fillColor: '#DBDBDB', style: 'tableHeaderLeft' },
                    { text: '', style: 'tableHeaderLeft' }
                  ]
                ]
              },
            }
          ]
        }
      ],
      styles: {
        nameCompany: { bold: true, fontSize: 15, color: 'black', alignment: 'left', margin: [0, 5, 0, 0] },
        labelFolioRight: { fontSize: 7, color: 'black', alignment: 'right' },
        labelFolioLeft: { fontSize: 7, color: 'black', alignment: 'left' },
        labelHeader: { bold: true, fontSize: 10, color: 'black', alignment: 'left' },
        fieldHeader: { fontSize: 10, color: 'black', alignment: 'center' },
        tableHeaderCenter: { bold: true, fontSize: 6, color: 'black', alignment: 'center' },
        tableHeaderRight: { bold: true, fontSize: 9, color: 'black', alignment: 'right' },
        tableHeaderLeft: { bold: true, fontSize: 9, color: 'black', alignment: 'left' },
        tableItemCenter: { fontSize: 8, color: 'black', alignment: 'center' },
        tableItemRight: { fontSize: 8, color: 'black', alignment: 'right' },
        tableItemLeft: { fontSize: 6, color: 'black', alignment: 'left' },
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
          fontSize: 10,
          color: 'black',
          alignment: 'center',
          arial: true,
          margin: [0, 0, 0, 0],
          decoration: 'underline'
        },
        labelInvoice: { bold: true, fontSize: 9, color: 'red' },
        labelSupplier: { bold: true, fontSize: 9, color: 'black', alignment: 'center', arial: true, margin: [0, -13, 0, 0] },
        labelProducts: { bold: true, fontSize: 8, color: 'black', alignment: 'center', arial: true },
        boxes: { bold: true, fontSize: 10, color: 'black', alignment: 'center', margin: [0, 40, 0, 0] },
        boxAuthorization: { bold: true, fontSize: 5, color: 'black', alignment: 'center', margin: [0, 20, 0, 0] },
        spaceSection: { margin: [0, 20, 0, 10] },
        labelBusinessUnit: { fontSize: 8, color: 'black', alignment: 'left', margin: [0, -32, 0, 30] },
        labelHeaderPagin: { fontSize: 8, color: 'black', alignment: 'left', margin: [40, 10, 0, 0] },
        labelQuantityTotal: { fontSize: 6, alignment: 'right' }
      },
      defaultStyle: {
        columnGap: 10
      }
    };
  }

  private getPODetailObject() {
    /*let subTotalGral = 0;
    let totalGral = 0;
    for (const item of data) {
      subTotalGral = numeral(subTotalGral).value() + numeral(item.subTotal).value();
      totalGral = numeral(totalGral).value() + numeral(item.total).value();
    }*/
    let quantityTotal: any = 0;
    const headerTitlePO: any = [{ colSpan: 6, text: 'PO', fillColor: '#DBDBDB', style: 'labelProducts' },
    {}, {}, {}, {}, {}];
    const headersPO: any = [
      { text: 'No.', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PO NO', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'DESCRIPCIÓN', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'QTY', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PRECIO UNITARIO', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PRECIO TOTAL', fillColor: '#FFFF99', style: 'tableHeaderCenter' }
    ];

    return {
      margin: [0, -12, 0, 0],
      table: {
        headerRows: 2,
        widths: [15, 30, 100, 18, 50, 50],
        body: [
          headerTitlePO,
          headersPO,
          [
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: 'TOTAL CANTIDAD:', style: 'labelQuantityTotal' },
            { text: '12', style: 'labelQuantityTotal' },
            { text: 'SUBTOTAL', style: 'labelQuantityTotal' },
            { text: '333', style: 'labelQuantityTotal' }
          ],
          [
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: 'IVA', style: 'labelQuantityTotal' },
            { text: 's666df', style: 'labelQuantityTotal' }
          ],
          [
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: '', border: [false, false, false, false] },
            { text: 'TOTAL', style: 'labelQuantityTotal' },
            { text: '666667', style: 'labelQuantityTotal' }
          ]
        ]
      }
    };
  }

  private getInvoiceDetailObject() {
    /*let subTotalGral = 0;
    let totalGral = 0;
    for (const item of data) {
      subTotalGral = numeral(subTotalGral).value() + numeral(item.subTotal).value();
      totalGral = numeral(totalGral).value() + numeral(item.total).value();
    }*/
    let quantityTotal: any = 0;
    const headerTitle: any = [{ colSpan: 4, text: 'FACTURACIÓN', fillColor: '#DBDBDB', style: 'labelProducts' },
    {}, {}, {}];
    const headers: any = [
      { text: 'QTY', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PRECIO UNITARIO', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'PRECIO TOTAL', fillColor: '#FFFF99', style: 'tableHeaderCenter' },
      { text: 'Remark', fillColor: '#FFFF99', style: 'tableHeaderCenter' }
    ];

    return {
      margin: [-11, -12, 0, 0],
      table: {
        headerRows: 2,
        widths: [18, 50, 50, 35],
        body: [
          headerTitle,
          headers,
          [
            { text: '10', style: 'labelQuantityTotal' },
            { text: 'SUBTOTAL', style: 'labelQuantityTotal' },
            { text: 'MXN 789.45', style: 'labelQuantityTotal' },
            { text: 'VERDADERO', style: 'labelQuantityTotal' }
          ],
          [
            { text: '', border: [false, false, false, false] },
            { text: 'IVA', style: 'labelQuantityTotal' },
            { text: '$61.55', style: 'labelQuantityTotal' },
            { text: 'FALSO', style: 'labelQuantityTotal' }
          ],
          [
            { text: '', border: [false, false, false, false] },
            { text: 'TOTAL', style: 'labelQuantityTotal' },
            { text: '850.00', style: 'labelQuantityTotal' },
            { text: 'FALSO', style: 'labelQuantityTotal' }
          ]

        ]
      }
    };
  }
}