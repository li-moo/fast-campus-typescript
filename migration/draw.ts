import { drawClipPath, isDrawableItem, getOrgSize } from "./util";

const defaultAudioImg = document.createElement("img");
defaultAudioImg.src = "./images/mp3.png";
defaultAudioImg.onload = () => {
  console.log("audio image loaded");
};

abstract class DrawStrategy<T extends CanvasImageSource>
  implements DrawStrategyInterface<T>
{
  public abstract draw(
    ctx: CanvasRenderingContext2D,
    item: ItemInterface<T>
  ): void;
}

export class NormalDraw<T extends CanvasImageSource> extends DrawStrategy<T> {
  public draw(ctx: CanvasRenderingContext2D, item: ItemInterface<T>) {
    if (item.source === null) throw new Error("소스가 이상해!");

    const { left, top, width, height } = item.position;
    const destWidth = width * item.scale;
    const destHeight = height * item.scale;
    const destLeft = left + (width - destWidth) / 2;
    const destTop = top + (height - destHeight) / 2;

    ctx.save();
    drawClipPath(ctx, destLeft, destTop, destWidth, destHeight, 10);
    ctx.drawImage(
      isDrawableItem(item.source) ? item.source : defaultAudioImg,
      destLeft,
      destTop,
      destWidth,
      destHeight
    );
    ctx.restore();
  }
}

export class SelectDraw<T extends CanvasImageSource> extends DrawStrategy<T> {
  public draw(ctx: CanvasRenderingContext2D, item: ItemInterface<T>) {
    if (item.source === null) throw new Error("소스가 이상해!");
    const source = item.visualizer?.renderer || item.source;
    const canvas = ctx.canvas;
    const { width, height } = getOrgSize(source);
    const imgAspectRatio = width / height;
    const canvasAspectRatio = canvas.width / canvas.height;
    let renderWidth, renderHeight, offsetX, offsetY;
    if (imgAspectRatio > canvasAspectRatio) {
      renderWidth = canvas.width;
      renderHeight = canvas.width / imgAspectRatio;
      offsetX = 0;
      offsetY = (canvas.height - renderHeight) / 2;
    } else {
      renderWidth = canvas.height * imgAspectRatio;
      renderHeight = canvas.height;
      offsetX = (canvas.width - renderWidth) / 2;
      offsetY = 0;
    }
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(source, offsetX, offsetY, renderWidth, renderHeight);
    ctx.restore();
  }
}
