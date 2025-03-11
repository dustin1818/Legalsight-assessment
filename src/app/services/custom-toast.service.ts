import { Injectable } from '@angular/core';
import { HotToastService, ToastPosition } from '@ngxpert/hot-toast';

@Injectable({
  providedIn: 'root'
})
export class CustomToastService {
  private toastConfig = {
    duration: 2000,
    position: 'bottom-right' as ToastPosition,
    style: {
      border: 'none',
      padding: '16px',
      height: '64px',
      width: '364px',
      color: '#212529',
      boxShadow: '0 0 7px ##282d32',
    },
    iconTheme: {
      primary: '#198754',
      secondary: '#FFFAEE',
    },
  };

  constructor(private toast: HotToastService) { }

  success(message: string) {
    return this.toast.success(message, this.toastConfig);
  }

  error(message: string) {
    return this.toast.error(message, {
      ...this.toastConfig,
      iconTheme: {
        primary: '$light-red',
        secondary: '#FFFAEE',
      },
    });
  }

  info(message: string) {
    return this.toast.info(message, {
      ...this.toastConfig,
      iconTheme: {
        primary: '#0dcaf0',
        secondary: '#FFFAEE',
      },
    });
  }

  warning(message: string) {
    return this.toast.warning(message, {
      ...this.toastConfig,
      iconTheme: {
        primary: '#ffc107',
        secondary: '#FFFAEE',
      },
    });
  }
}