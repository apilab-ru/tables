import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appMarkFound]'
})
export class MarkFoundDirective implements AfterViewInit {

  @Input() set appMarkFound(search: string) {
    if (search !== undefined && this.baseString) {
      this.search = search;
      this.processFound();
    }
  }

  private search: string;
  private baseString: string;

  constructor(
    private element: ElementRef
  ) {
  }

  ngAfterViewInit(): void {
    this.baseString = this.text;
  }

  private processFound(): void {
    const index = this.baseString.indexOf(this.search);
    if (index === -1) {
      this.clearElement();
    } else {
      this.createMark(index);
    }
  }

  private createMark(index: number): void {
    let prev = null;
    if (index !== 0) {
      prev = this.baseString.substr(0, index);
    }
    const found = this.baseString.substr(index, this.searchLength);
    const after = this.baseString.substr(index + this.searchLength);

    this.element.nativeElement.innerHTML =
      (prev ? `<span>${prev}</span>`: ``)
      + `<span class='founded'>${found}</span>`
      + (after ? `<span>${after}</span>` : ``);
  }

  private get searchLength(): number {
    return this.search.length;
  }

  private get text(): string {
    return this.element && this.element.nativeElement.innerText;
  }

  private clearElement(): void {
    this.element.nativeElement.innerHTML = this.baseString;
  }
}
