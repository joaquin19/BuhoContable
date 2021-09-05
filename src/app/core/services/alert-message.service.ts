import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  errorMessage(message) {
    this.spinner.hide();

    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      icon: 'error',
      title: 'Error',
      html: message
    });
  }

  warningMessage(message) {
    this.spinner.hide();

    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      icon: 'warning',
      title: 'Advertencia',
      html: message
    });
  }

  successMessage(message) {
    this.spinner.hide();

    Swal.fire({
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      icon: 'success',
      title: 'Éxito',
      html: message
    });
  }

}
