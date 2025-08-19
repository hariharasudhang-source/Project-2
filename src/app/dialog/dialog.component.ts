import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CommonService } from '../common.service';

export interface Model {
  "id": number,
  "name": string,
  "dept": string,
  "join_year": any
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, CommonModule, FormsModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  staticObj = {
    "id": null,
  "name": null,
  "dept": null,
  "join_year": null,
  }
  username = '';
  password = '';
  dynamicForm: FormGroup;
  dialogData!: any;
  option!: any;
  keys: any[] = [];
  formData: any = {};
  isAddUser!: boolean; 

  service: CommonService = inject(CommonService);

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.isAddUser = data.str === 'edit' ? false : true;
    this.dialogData = data.ele || this.staticObj;
    
    this.option = data.str;
    this.dynamicForm = this.fb.group({});
  }

  ngOnInit() {
    this.keys = Object.keys(this.dialogData)?.filter(k => k !== 'id');
    this.keys?.forEach(key => {
      this.dynamicForm?.addControl(key, this.fb.control(this.dialogData[key], [
        Validators.required,
      ]))

    })
    // this.dynamicForm.patchValue(this.dialogData);
  }

  onSubmit(option: string) {

    if (this.dynamicForm.valid) {
      this.formData = this.dynamicForm.value;
      if(option.includes('edit')){
        this.editUser();
      }else{
        this.addUser();
      }
    }
  }
  addUser(){
    this.service.addEmployee(this.formData).subscribe({
      next: (res) => {

        this.dialogRef.close('refresh');
      },
      error: (err) => {
        if (err.error.errors) {
          this.errorHandling(err);
        }
      }
    });
  }
  editUser(){
    this.service.editEmployee(this.dialogData.id, this.formData).subscribe({
      next: (res) => {

        this.dialogRef.close('refresh');
      },
      error: (err) => {
        if (err.error.errors) {
          this.errorHandling(err);
        }
      }
    });
  }

  errorHandling(err:any){
      Object.keys(err.error.errors).forEach(field => {
        const control = this.dynamicForm.get(field);
        console.log('field',field);
        
        if (control) {
          control.setErrors({ backend: err.error.errors[field] });
        }
      });
  }
  
  deleteData(){
    
    this.service.deleteEmployee(this.dialogData).subscribe({
      next: (res) => {
        this.dialogRef.close();
      },
      error: () => {

      }
    })
  }

}