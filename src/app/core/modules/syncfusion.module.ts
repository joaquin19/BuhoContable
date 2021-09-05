import { NgModule } from '@angular/core';

// Modules
import { TreeViewModule, MenuModule } from '@syncfusion/ej2-angular-navigations';
import { EditService, GridModule, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { DropDownListModule, MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { AccumulationChartModule, ChartModule } from '@syncfusion/ej2-angular-charts';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { FormsModule } from '@angular/forms';

// Service
import {
  PageService, SortService, FilterService, GroupService, SelectionService, ReorderService,
  AggregateService, RowDDService, ExcelExportService, PdfExportService
} from '@syncfusion/ej2-angular-grids';
import {
  PieSeriesService, AccumulationDataLabelService, AccumulationLegendService, AccumulationTooltipService,
  LineSeriesService, CategoryService, LegendService, DataLabelService, TooltipService,
  ColumnSeriesService
} from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [],
  imports: [
    TreeViewModule,
    MenuModule,
    GridModule,
    DropDownListModule,
    DropDownButtonModule,
    ButtonModule,
    AccumulationChartModule,
    ChartModule,
    MultiSelectModule,
    DateRangePickerModule,
    FormsModule
  ],
  exports: [
    TreeViewModule,
    MenuModule,
    GridModule,
    DropDownListModule,
    DropDownButtonModule,
    ButtonModule,
    AccumulationChartModule,
    ChartModule,
    MultiSelectModule,
    DateRangePickerModule,
    FormsModule
  ],
  providers: [
    PageService,
    SortService,
    FilterService,
    EditService,
    ToolbarService,
    GroupService,
    SelectionService,
    PieSeriesService,
    AccumulationDataLabelService,
    AccumulationLegendService,
    AccumulationTooltipService,
    LineSeriesService,
    CategoryService,
    LegendService,
    DataLabelService,
    TooltipService,
    ColumnSeriesService,
    ReorderService,
    AggregateService,
    RowDDService,
    ExcelExportService,
    PdfExportService
  ]
})
export class SyncfusionModule { }
