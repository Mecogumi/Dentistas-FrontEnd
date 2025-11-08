import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationCardComponent, Notification } from '../../shared/components/notification-card/notification-card.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, NotificationCardComponent],
  templateUrl: './notifications.component.html',
//   styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  // This would be populated by a service fetching data from your backend
  notifications = signal<Notification[]>([
    {
      id: '1',
      type: 'info',
      title: 'Recordatorio de Cita',
      message: 'Tu cita con el Dr. Juan Pérez es mañana a las 10:00 AM.',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'success',
      title: 'Cita Confirmada',
      message: 'Tu cita para el 30 de Noviembre ha sido confirmada.',
      timestamp: new Date()
    },
    {
      id: '3',
      type: 'warning',
      title: 'Actualiza tu información',
      message: 'Por favor, actualiza tu información de contacto.',
      timestamp: new Date()
    }
  ]);

  handleViewDetails(notificationId: string): void {
    console.log('Viewing details for notification:', notificationId);
    // Here you can implement navigation to a details page or show a modal
  }
}
