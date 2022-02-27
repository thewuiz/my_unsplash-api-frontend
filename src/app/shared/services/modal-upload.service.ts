import { EventEmitter, Injectable } from '@angular/core';
import { Image } from '@models/image';

@Injectable({
  providedIn: 'root',
})
export class ModalUploadService {
  public showModal: boolean = false;
  public newImage: EventEmitter<Image> = new EventEmitter<Image>();

  constructor() {}

  abrirModal() {
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
  }
}
