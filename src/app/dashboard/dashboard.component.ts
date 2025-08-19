import { Component, inject } from '@angular/core';
import { CommonService } from '../common.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, MatIconModule,MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  service: CommonService = inject(CommonService);

  displayedColumns: string[] = ['position', 'name', 'dept', 'join_year', 'action'];
  dataSource!: any[]

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.loadEmployees();
  }
  
  loadEmployees(){
    this.service.getEmployee().subscribe({
      next: (res) => {
  
        this.dataSource = res;
      }
    })
  }

  openDialog(element?:any, string?:string): any {
    
    const dialogRef = this.dialog.open(DialogComponent, {
    data: {ele: element,str: string},
    });

    dialogRef.afterClosed().subscribe((action) => {
      this.loadEmployees();
    });
  }
}