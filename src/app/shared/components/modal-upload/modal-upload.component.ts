import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalUploadService } from '../../services/modal-upload.service';

import { ApiService } from 'src/app/core/http/api.service';
import { Image } from '@models/image';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css'],
})
export class ModalUploadComponent implements OnInit, OnDestroy {
  public errors: string[] = [];
  public image: Image = new Image();
  private subscription: Subscription = new Subscription();

  constructor(
    public modalUploadService: ModalUploadService,
    private apiService: ApiService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}

  cerrarModal() {
    this.modalUploadService.cerrarModal();
    this.clearImage();
  }

  clearImage() {
    this.image.label = '';
    this.image.image_url = '';
  }

  addImage() {
    this.subscription.add(
      this.apiService.addImage(this.image).subscribe({
        next: (reponse) => {
          this.modalUploadService.newImage.emit(reponse);
          this.cerrarModal();
        },
        error: (err) => {
          this.cerrarModal();
          Swal.fire('Ups!', 'Error: ' + err.errors, 'error');
        },
        complete: () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Image Uploaded',
            showConfirmButton: false,
            timer: 1000,
          });
        },
      })
    );
  }
}
