import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef} from '@angular/core';
import {ColumnDef} from '../../../models/column-def';
import {RowTemplateDirective} from '../../directives/row-template.directive';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-ic-custom-table',
  template: `
    <div class="table__warpper">
      <table mat-table [dataSource]="dataProvider" class="table">
        <ng-container matColumnDef="select">
          <th mat-header-cell *matHeaderCellDef class="select-column">
          </th>
          <td mat-cell *matCellDef="let row" class="select-td">
            <mat-checkbox (click)="$event.stopPropagation()"
                          (change)=" toggleCheckBox($event, row)"
                          [checked]="selected.isSelected(row)"
                          [aria-label]="checkboxLabel(row)">
            </mat-checkbox>
          </td>
        </ng-container>
        <ng-container *ngFor="let col of columnsDef" [matColumnDef]="col.id">
          <th mat-header-cell *matHeaderCellDef>{{col.header}}</th>
          <td mat-cell *matCellDef="let element">
            <ng-container *ngIf="templateRefs.get(col.id); else defaultRow" [ngTemplateOutlet]="templateRefs.get(col.id)"
                          [ngTemplateOutletContext]="{$implicit: element}">
            </ng-container>
            <ng-template #defaultRow>
              {{element | nested: col.fieldId}}
            </ng-template>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columns"></tr>
        <tr mat-row *matRowDef="let row; columns: columns;"></tr>
      </table>
      <span class="table__empty" *ngIf="!dataProvider?.length">No data to be displayed</span>
    </div>`,
  styleUrls: ['./ic-custom-table.component.scss']
})

export class IcCustomTableComponent implements OnInit, AfterContentInit {
  templateRefs: Map<string, TemplateRef<any>>;
  public columns: (string | undefined)[] = [];

  @Input() dataProvider = [];
  @Input() columnsDef: ColumnDef[] = [];
  @Input() filter = '';
  @Input() selectable = false;
  @Input() selection = null;
  @Output() selectionChange = new EventEmitter();
  @ContentChildren(RowTemplateDirective) rTemplates: QueryList<any>;
  selected = new SelectionModel<any>(false, []);

  constructor() {
  }

  ngOnInit(): void {
    this.columns = this.columnsDef.map(col => col.id);
    if (this.selectable) {
      this.columns.unshift('select');
    }
  }

  ngAfterContentInit(): void {
    this.templateRefs = new Map();
    this.rTemplates.forEach((item) => {
      this.templateRefs.set(item.rTemplate, item.templateRef);
    });
  }

  checkboxLabel(row?: any): string {
    return `${this.selected.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  toggleCheckBox(event = null, row: any): void {
      this.selected.toggle(row);
      this.selectionChange.emit(event.checked ? row : null);
  }
}
