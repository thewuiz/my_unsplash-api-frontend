import { Component, OnInit } from '@angular/core';
import { ModalLoginService } from '../components/services/modal-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private modalLoginService: ModalLoginService) {}

  ngOnInit(): void {}

  abrirModal() {
    this.modalLoginService.abrirModal();
  }
}
