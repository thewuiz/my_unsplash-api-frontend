import { EventEmitter, Injectable } from '@angular/core';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root',
})
export class ModalLoginService {
  public showModal: boolean = false;
  public user: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  abrirModal() {
    this.showModal = true;
  }

  cerrarModal() {
    this.showModal = false;
  }
}
