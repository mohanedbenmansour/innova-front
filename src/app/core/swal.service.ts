import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  alert(title: string, icon: string, text: string) {
    return  Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      confirmButtonColor: '#172063', 
    })
  }
  confirmAlert(title: string, text: string, action: string) {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      confirmButtonColor: '#172063',
      cancelButtonColor: '#1f9dd2',
      confirmButtonText: action,
      showCancelButton: true,
    });
  }
}
