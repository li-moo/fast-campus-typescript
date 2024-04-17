import { getVisualizer } from "./visualizer";

declare global {
  interface Window {
    webkitAudioContext: AudioContext;
  }
  type GalleryItem = ItemInterface<HTMLImageElement | HTMLVideoElement>;
  type GalleryEvent = { type: "select" | "hover"; index: number | null };
  type Rect = { left: number; top: number; width: number; height: number };
  interface DrawableInterface {
    draw(ctx: CanvasRenderingContext2D): void;
    setDrawStrategy(drawStrategy: any): void;
    update(data): void;
  }
  interface ItemInterface<T extends CanvasImageSource>
    extends DrawableInterface {
    position: Rect;
    scale: number;
    visualizer: ReturnType<typeof getVisualizer> | null;
    source: T | null;
    index: number;
    hitTest(x: number, y: number): void;
  }
  interface ItemFactoryInterface<T extends CanvasImageSource> {
    create(
      index: number,
      src: string,
      gallery: GalleryInterface
    ): ItemInterface<T>;
  }
  interface DrawStrategyInterface<T extends CanvasImageSource> {
    draw(ctx: CanvasRenderingContext2D, item: ItemInterface<T>): void;
  }
  interface SubjectInterface<T> {
    addObserver(observer: ObserverInterface<T>): void;
    notify(data: T): void;
  }
  interface ObserverInterface<T> {
    update(data: T): void;
  }

  interface GalleryInterface extends SubjectInterface<GalleryEvent> {
    renderer: HTMLCanvasElement | null;
    selectedItem: GalleryItem | null;
    itemWidth: number;
    itemHeight: number;
    width: number;
    height: number;
    row: number;
    column: number;
    margin: number;
  }
}

export {};
