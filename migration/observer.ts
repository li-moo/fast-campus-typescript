export class Subject<T extends GalleryEvent> implements SubjectInterface<T> {
  observers: ObserverInterface<T>[];
  constructor() {
    this.observers = [];
  }
  addObserver(observer: ObserverInterface<T>) {
    this.observers.push(observer);
  }
  notify(data: T) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

export abstract class Observer<T extends GalleryEvent>
  implements ObserverInterface<T>
{
  public abstract update(data: T): void;
}
