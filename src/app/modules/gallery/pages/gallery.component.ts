import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

import { ApiService } from 'src/app/core/http/api.service';
import { Image } from '@models/image';
import { ModalUploadService } from '@shared/services/modal-upload.service';
import { Subscription } from 'rxjs';
import { ModalLoginService } from '@shared/services/modal-login.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit, OnDestroy, AfterViewInit {
  public images: Image[] = [];
  public imagesA1: Image[] = [];
  public imagesA2: Image[] = [];
  public imagesA3: Image[] = [];
  public widthWindow: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(
    private apiService: ApiService,
    public authService: AuthService,
    private modalUploadComponent: ModalUploadService,
    private modalLoginService: ModalLoginService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.authService.isAuthenticated();
    this.listeners();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.eventsEmitters();
  }

  // ===============================================================================================
  // ================================= LISTEMERS OF WINDOW =========================================
  listeners() {
    this.renderer.listen('window', 'load', (evt) => {
      this.widthWindow = evt.path[0].innerWidth;
      if (this.authService.isAuthenticated()) {
        this.getAllImagesUser();
      }
    });

    this.renderer.listen('window', 'resize', (evt) => {
      this.widthWindow = evt.path[0].innerWidth;
      this.galleryColums(this.widthWindow);
    });
  }

  // ===============================================================================================
  // ===============================================================================================
  eventsEmitters() {
    this.subscription.add(
      this.modalLoginService.user.subscribe({
        next: () => {
          if (this.authService.isAuthenticated()) {
            return this.getAllImagesUser();
          }
          this.clearArrayImages();
          this.images = [];
          return;
        },
      })
    );

    this.subscription.add(
      this.modalUploadComponent.newImage.subscribe({
        next: (response: Image) => {
          this.images.unshift(response);
          this.galleryColums(this.widthWindow);
        },
      })
    );

    this.subscription.add(
      this.apiService.arrayImages.subscribe({
        next: (response: any) => {
          this.images = response;
          this.galleryColums(this.widthWindow);
        },
      })
    );
  }

  // ===============================================================================================
  // ===============================================================================================
  galleryColums(widthWindow: number) {
    if (widthWindow > 991) {
      return this.distribuirImages(this.images, 3);
    }
    if (widthWindow > 767 && widthWindow <= 991) {
      return this.distribuirImages(this.images, 2);
    } else {
      return this.distribuirImages(this.images, 1);
    }
  }

  // ===============================================================================================
  // ============================== =================================================================
  distribuirImages(images: Image[], col: number = 3) {
    this.clearArrayImages();

    for (let i = 0; i < images.length; i++) {
      if (images[i] && col >= 1) {
        this.imagesA1.push(images[i]);
      }
      if (this.images[i + 1] && col >= 2) {
        this.imagesA2.push(images[i + 1]);
      }
      if (this.images[i + 2] && col >= 3) {
        this.imagesA3.push(images[i + 2]);
      }
      i = i + (col - 1);
    }
  }

  // ===============================================================================================
  // ============================== GET ALL IMAGE USER =============================================
  getAllImagesUser() {
    this.subscription.add(
      this.apiService.getAllImagesUser().subscribe({
        next: (response) => {
          this.images = response;
          this.galleryColums(this.widthWindow);
        },
        error: (err) => {
          Swal.fire('Ups', 'Error: ' + err, 'error');
        },
        complete: () => {},
      })
    );
  }

  // ===============================================================================================
  // ================================== DELETE IMAGE BY ID =========================================
  deleteImage(image: Image) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(
          this.apiService.deleteImage(image.uid).subscribe({
            next: () => {
              this.images = this.images.filter((ima) => ima !== image);
            },
            error: (err) => {
              Swal.fire('Ups!', 'Error deleting image', 'error');
            },
            complete: () => {
              Swal.fire('Deleted!', 'Image deleted successfully', 'success');
              this.galleryColums(this.widthWindow);
            },
          })
        );
      }
    });
  }

  // ===============================================================================================
  // ===============================================================================================
  clearArrayImages() {
    this.imagesA1 = [];
    this.imagesA2 = [];
    this.imagesA3 = [];
  }
}
