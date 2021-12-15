import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/core/client.service';
import { TokenStorageService } from 'src/app/core/token-storage.service';
import {ReclamationService} from "../../core/reclamation.service";
import { AuthService } from 'src/app/core/auth.service';
@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamationForm!: FormGroup;
  private reclamation: any
  currentUser:any
  constructor(
    private formBuilder: FormBuilder,
    private reclamationService: ReclamationService,
    private _snackBar: MatSnackBar,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<ReclamationComponent>,private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser()
    console.log(this.reclamation, 'reclamation')
    this.createForm();

  }

  get f() {
    return this.reclamationForm.controls;
  }

  createForm() {
    this.reclamationForm = this.formBuilder.group({
      sujet: [''],
      description: [''],

    });
  }

  onAdd() {
    console.log('reclamtion ++++',this.reclamationForm.value)
    let reclamation = this.reclamationForm.value
    reclamation.client=this.currentUser

      this.reclamationService.addReclamation(reclamation).subscribe(
        (data) => {
          console.log("data",data)
          this.openSnackBar("reclation added", 'success')


        },
        (err) => console.log("error++++",err)
      )

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  getCurrentUser(){
    this.currentUser=this.authService.getCurrentUser()
    console.log(this.currentUser)
  }
}
