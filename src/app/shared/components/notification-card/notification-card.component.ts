import { Component, Input, Output, EventEmitter, computed, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
}

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-card.component.html',
  // styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent {
  // Backing writable signal used internally for reactivity
  private _notification = signal<Notification | null>(null);

  /**
   * Accept either a plain Notification (or null) or a WritableSignal<Notification|null>.
   * This keeps the component flexible and fixes the type error when the parent passes
   * a plain Notification value.
   */
  @Input({ required: true })
  set notification(value: Notification | WritableSignal<Notification | null> | null) {
    // Detect if a WritableSignal was passed (Angular signals have an internal marker).
    const maybeSignal = value as any;
    if (maybeSignal && (maybeSignal['ɵWRITABLE_SIGNAL'] !== undefined || maybeSignal['SIGNAL'] !== undefined)) {
      // Adopt the passed writable signal
      this._notification = value as WritableSignal<Notification | null>;
    } else {
      // Treat as a plain Notification and set the backing signal value
      this._notification.set(value as Notification | null);
    }
  }

  // Expose the backing writable signal as the public `notification` property
  // so the template can call `notification()` without seeing a union type.
  get notification(): WritableSignal<Notification | null> {
    return this._notification;
  }

  @Output() viewDetails = new EventEmitter<string>();

  // Return a consistent visual style for all notification types:
  // white background, black border, black text. This overrides any
  // type-specific CSS coming from utility libraries (e.g., daisyUI).
  alertClass = computed(() => {
    return 'bg-white border border-black text-black';
  });

  onViewDetailsClick(): void {
    const id = this._notification()?.id;
    if (id) {
      this.viewDetails.emit(id);
    }
  }
}
