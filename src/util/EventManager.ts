/**
 * The event manager helps to handle events and notifying listeners.
 */
export class EventManager<T> {
  private subscribers: ((item: T) => void)[] = [];

  /**
   * Subscribe a callback function.
   * @param {function} callback - The callback function.
   */
  subscribe(callback: (item: T) => void): void {
    this.subscribers.push(callback);
  }

  /**
   * Unsubscribe a callback.
   * @param {function} callback - The callback function.
   */
  unsubscribe(callback: (item: T) => void): void {
    const index = this.subscribers.indexOf(callback, 0);
    if (index >= 0) {
      this.subscribers.splice(index, 1);
    }
  }

  /**
   * Notify all subscribers of the appearing event.
   * @param {T} data - The data to pass along for the listeners.
   */
  notify(data: T): void {
    this.subscribers.forEach(lambda => lambda(data));
  }
}