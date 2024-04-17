import { NormalDraw, SelectDraw } from "./draw.js";
import { createImageItem, createVideoItem, isDrawableItem } from "./util.js";
import { getVisualizer } from "./visualizer.js";
import { Observer } from "./observer.js";

abstract class Drawable
  extends Observer<GalleryEvent>
  implements DrawableInterface
{
  private drawStrategy;
  constructor() {
    super();
    this.drawStrategy = new NormalDraw();
  }
  public draw(ctx: CanvasRenderingContext2D): void {
    this.drawStrategy.draw(ctx, this);
  }
  public setDrawStrategy(
    drawStrategy: DrawStrategyInterface<CanvasImageSource>
  ): void {
    this.drawStrategy = drawStrategy;
  }
  public abstract update(data: GalleryEvent): void;
  // draw(ctx) {
  //   this.#drawStrategy.draw(ctx, this);
  // }
  // setDrawStrategy(drawStrategy) {
  //   this.#drawStrategy = drawStrategy;
  // }
  // update(data) {
  //   throw new Error("구현해!");
  // }
}

class Item<T extends CanvasImageSource>
  extends Drawable
  implements ItemInterface<T>
{
  private _position: Rect;
  private _animateHandle: number;
  public visualizer: ReturnType<typeof getVisualizer> | null;
  public source: T | null;

  constructor(
    public readonly index: number,
    gallery: GalleryInterface,
    public scale = 1
  ) {
    super();
    this.visualizer = null;
    this.source = null;
    this.calcPosition(gallery, index);
  }
  get position() {
    return this._position;
  }
  private calcPosition(gallery: GalleryInterface, index: number) {
    const { column, margin, itemWidth, itemHeight } = gallery;
    const row = Math.floor(index / column);
    const col = index % column;

    this._position = {
      left: col * (itemWidth + margin),
      top: row * (itemHeight + margin),
      width: itemWidth,
      height: itemHeight,
    };
  }
  private animateScale(targetScale: number, duration = 250) {
    const start = Date.now();
    const initialScale = 1;
    const diff = targetScale - initialScale;
    const step = () => {
      const timePassed = Date.now() - start;
      const progress = timePassed / duration;
      this.scale = initialScale + diff * progress;

      if (progress < 1) {
        this._animateHandle = requestAnimationFrame(step);
      }
    };
    step();
  }
  protected select() {
    this.setDrawStrategy(new SelectDraw());
  }
  protected unselect() {
    this.setDrawStrategy(new NormalDraw());
  }
  protected hover() {
    this.animateScale(1.2);
  }
  protected leave() {
    cancelAnimationFrame(this._animateHandle);
    this.scale = 1;
  }
  public hitTest(x: number, y: number) {
    const { left, top, width, height } = this._position;
    return x > left && x < left + width && y > top && y < top + height;
  }
  public draw(ctx: CanvasRenderingContext2D) {
    this.source && super.draw(ctx);
  }
  public update(data: GalleryEvent) {
    switch (data.type) {
      case "select":
        {
          data.index === this.index ? this.select() : this.unselect();
        }
        break;
      case "hover":
        {
          data.index === this.index ? this.hover() : this.leave();
        }
        break;
    }
  }
}

export class ImageItem extends Item<HTMLImageElement> {
  constructor(index, src, gallery) {
    super(index, gallery);
    createImageItem(src).then((image) => {
      this.source = image;
    });
  }
}

export class VideoItem extends Item<HTMLVideoElement> {
  constructor(index, src, gallery) {
    super(index, gallery);
    createVideoItem(src).then((video) => {
      this.source = video;
      video.muted = true;
      video.play();
    });
  }
  private initVisualizer() {
    this.visualizer === null &&
      !isDrawableItem(this.source) &&
      (this.visualizer = getVisualizer(this.source, 640, 320));
  }
  protected select() {
    if (this.source === null) throw new Error("소스가 이상해!");
    this.initVisualizer();
    this.visualizer?.play();
    this.source.muted = false;
    this.source.play();
    super.select();
  }
  protected unselect() {
    if (this.source === null) throw new Error("소스가 이상해!");
    this.source.muted = true;
    this.source.pause();
    this.visualizer?.pause();
    super.unselect();
  }
}

export abstract class ItemFactory<T extends CanvasImageSource>
  implements ItemFactoryInterface<T>
{
  public create(
    index: number,
    src: string,
    gallery: GalleryInterface
  ): Item<T> {
    return this.createItem(index, src, gallery);
  }
  protected abstract createItem(
    index: number,
    src: string,
    gallery: GalleryInterface
  ): Item<T>;
}

export class ImageItemFactory extends ItemFactory<HTMLImageElement> {
  public createItem(
    index: number,
    src: string,
    gallery: GalleryInterface
  ): ImageItem {
    return new ImageItem(index, src, gallery);
  }
}

export class VideoItemFactory extends ItemFactory<HTMLVideoElement> {
  public createItem(
    index: number,
    src: string,
    gallery: GalleryInterface
  ): VideoItem {
    return new VideoItem(index, src, gallery);
  }
}
