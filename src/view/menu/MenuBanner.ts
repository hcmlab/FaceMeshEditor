import { MenuItem } from "./MenuItem";

export class MenuBanner implements MenuItem {
  private readonly title: string;
  private readonly imageUrl: string | undefined | null;

  constructor(title: string, imageUrl: string | undefined | null) {
    this.title = title;
    this.imageUrl = imageUrl;
  }

  toHtml(): HTMLElement {
    const a = document.createElement("a");
    a.innerText = this.title;
    if(this.imageUrl) {
      const img = document.createElement('img');
      img.src = this.imageUrl;
      img.className = "d-inline-block align-text-top";
      img.width = 30;
      img.height = 24;
      img.alt = "Logo";
      a.appendChild(img)
    }
    return a;
  }
}