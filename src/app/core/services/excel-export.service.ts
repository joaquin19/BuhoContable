import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  constructor() { }

  exportToExcel(json: any[], excelFileName: string): void {
    const wS: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const wB: XLSX.WorkBook = {
      Sheets: { 'data': wS },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(wB, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcel(excelBuffer, excelFileName);
  }

  private saveAsExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([ buffer ], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, `${fileName}_export_'${new Date().getTime()}${EXCEL_EXT}`);
  }

}
