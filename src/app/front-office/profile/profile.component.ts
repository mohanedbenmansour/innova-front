import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientService } from 'src/app/core/client.service';
import { TokenStorageService } from 'src/app/core/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profilForm!: FormGroup;
  private user: any
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private _snackBar: MatSnackBar,
    private tokenStorage: TokenStorageService,
    private dialogRef: MatDialogRef<ProfileComponent>,
  ) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()
    console.log(this.user, 'user')
    this.createForm();
    if (this.user) {
      this.profilForm.patchValue(this.user)
    }
  }

  get f() {
    return this.profilForm.controls;
  }

  createForm() {
    this.profilForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      date_naissance: [''],
      profession: [''],
      password: [''],
      categorie_client: [''],
      role: ['USER'],
      accessToken: ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c']
    });
  }

  onEdit() {
    console.log(this.profilForm.value, 'prix')
    let user = this.profilForm.value
    user.id = this.user.id
    if (this.user) {
      this.clientService.updateClient(this.profilForm.value, this.user.id).subscribe(
        (data) => {
          this.openSnackBar("client updated", 'success')
          this.tokenStorage.saveUser(user)
          this.user = this.tokenStorage.getUser()
        },
        (err) => console.log(err)
      )
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
