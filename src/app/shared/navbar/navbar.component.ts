import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/http/api.service';
import Swal from 'sweetalert2';
import { ModalLoginService } from '../services/modal-login.service';
import { ModalUploadService } from '../services/modal-upload.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput')
  searchInput!: ElementRef;
  public search: string = '';

  constructor(
    private modalLoginService: ModalLoginService,
    private modalUploadService: ModalUploadService,
    private apiService: ApiService,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.renderer.listen(this.searchInput.nativeElement, 'input', (evt) => {
      this.getImagesBySearch(this.search);
    });
  }

  ngOnInit(): void {}

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.modalLoginService.user.emit('user');
        this.isAuthenticated();
        Swal.fire('Logout', 'Bye', 'success');
      }
    });
  }

  getImagesBySearch(search: string) {
    this.apiService.getImagesBySearch(search).subscribe({
      next: (response: any) => {
        this.apiService.arrayImages.emit(response.images);
      },
      error: (err) => {},
      complete: () => {},
    });
  }

  abrirModal() {
    this.modalLoginService.abrirModal();
  }

  abrirModalUpload() {
    this.modalUploadService.abrirModal();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
