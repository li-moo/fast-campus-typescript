import { ImageItemFactory, VideoItemFactory } from "./item.js";
import { Subject } from "./observer.js";

class GalleryItemBuilder {
  private factory;
  constructor(private readonly gallery: GalleryInterface) {
    this.factory = new Map();
    this.factory.set("image", new ImageItemFactory());
    this.factory.set("video", new VideoItemFactory());
  }
  public build(src: string, index: number) {
    const item = this.factory
      .get(src.endsWith(".mp4") || src.endsWith(".mp3") ? "video" : "image")
      .create(index, src, this.gallery);
    this.gallery.addObserver(item);
    return item;
  }
}

export class Gallery extends Subject<GalleryEvent> implements GalleryInterface {
  private animateHandle: number | null;
  private itemBuilder: GalleryItemBuilder;
  private itemList: GalleryItem[] = [];
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private maxScrollY: number;
  private currentScrollY: number;
  private hoverItem: GalleryItem | null;
  public selectedItem: GalleryItem | null;
  public itemWidth: number;
  public itemHeight: number;
  constructor(
    imageSrcList: string[],
    public readonly width: number,
    public readonly height: number,
    public readonly row: number,
    public readonly column: number,
    public readonly margin = 2
  ) {
    super();
    this.itemBuilder = new GalleryItemBuilder(this);
    this.hoverItem = null;
    this.selectedItem = null;
    this.itemWidth = width / column - margin;
    this.itemHeight = height / row - margin;

    this.initCanvas();
    this.createItems(imageSrcList);
    this.startRender();
    this.registEventHandler();
    this.currentScrollY = 0;
    this.maxScrollY = this.calcMaxScrollPos(imageSrcList.length);
  }
  get renderer() {
    return this.canvas;
  }
  private initCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    this.canvas = canvas;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("컨텍스트에 문제가 있어!");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, this.width, this.height);
    this.ctx = ctx;
  }
  private createItems(srcList) {
    this.itemList = srcList.map((src, index) =>
      this.itemBuilder.build(src, index)
    );
  }
  private startRender() {
    const render = () => {
      const canvas = this.canvas;
      const ctx = this.ctx;

      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.translate(0, this.currentScrollY);
      this.itemList.forEach((item, index) => {
        if (this.hoverItem === item || this.selectedItem === item) return;
        item.draw(ctx);
      });
      this.hoverItem?.draw(ctx);
      this.selectedItem?.draw(ctx);
      ctx.restore();
      this.animateHandle = requestAnimationFrame(render);
    };
    render();
  }
  private calcMaxScrollPos(itemCount) {
    const rowCount = Math.ceil(itemCount / this.column);
    const totalHeight = rowCount * (this.itemHeight + this.margin);
    return totalHeight - this.canvas.height;
  }

  registEventHandler() {
    this.canvas.addEventListener("wheel", (event) => {
      if (this.selectedItem !== null) return;
      event.preventDefault();
      let scrollY = this.currentScrollY - event.deltaY;
      scrollY = Math.min(scrollY, 0);
      scrollY = Math.max(scrollY, -this.maxScrollY);
      this.currentScrollY = scrollY;

      console.log(this.currentScrollY);
    });

    this.canvas.addEventListener("mousemove", (event) => {
      if (this.selectedItem !== null) return;
      const { offsetX, offsetY } = event;
      const hoverItem = this.itemList.find((item) =>
        item.hitTest(offsetX, offsetY)
      );
      if (this.hoverItem !== hoverItem) {
        // hoverItem.hover();
        const index = hoverItem
          ? isFinite(hoverItem.index)
            ? hoverItem.index
            : -1
          : -1;
        this.notify({ type: "hover", index });
        this.hoverItem = hoverItem || null;
      }
    });

    this.canvas.addEventListener("click", (event) => {
      if (this.selectedItem !== null) {
        this.notify({ type: "select", index: null });
        this.selectedItem = null;
        return;
      }
      const { offsetX, offsetY } = event;
      this.selectedItem =
        this.itemList.find((item) => item.hitTest(offsetX, offsetY)) || null;

      const index = this.selectedItem
        ? isFinite(this.selectedItem?.index)
          ? this.selectedItem.index
          : -1
        : -1;
      this.notify({ type: "select", index });
    });
  }
}
