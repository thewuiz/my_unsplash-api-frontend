import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalLoginService {
  public showModal: boolean = true;

  constructor() {}

  abrirModal() {
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
  }
}
