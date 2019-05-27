import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

const isInViewport = function (el) {
  var rect = el.getBoundingClientRect();

  return rect.bottom > 0 &&
    rect.right > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
    rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;

}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('headerElement')
  public headerElement: ElementRef;

  @ViewChild('firstColumnElement')
  public firstColumnElement: ElementRef;

  @ViewChild('containerElement')
  public containerElement: ElementRef;

  @ViewChild('wrapperElement')
  public wrapperElement: ElementRef;

  public header = [];
  public firstColumn = [];
  public array2 = [];
  public stickyHeaderElement: any;
  public stickyColumnElement: any;
  public firstHeaderCell: any;

  public rowCount = 200;
  public columnCount = 50;

  constructor() {
  }

  public ngOnInit() {
    this.header = new Array(this.columnCount + 1);
    this.firstColumn = new Array(this.rowCount);

    for (let i = 0; i < this.rowCount; i++) {
      this.array2.push({
        cells: new Array(this.columnCount)
      })
    }
  }

  public onScrollY(event) {
    // console.log('$event', event)
    const isHeaderVisible = isInViewport(this.headerElement.nativeElement);

    if (!isHeaderVisible && !this.stickyHeaderElement) {
      this.stickyHeaderElement = this.headerElement.nativeElement.cloneNode(true);
      this.stickyHeaderElement.classList.add('header-sticky');

      this.containerElement.nativeElement.appendChild(this.stickyHeaderElement);

      if (this.firstHeaderCell) {
        this.firstHeaderCell.style.top = event.target.scrollTop + 'px';
      }

    } else if (isHeaderVisible && this.stickyHeaderElement) {
      this.stickyHeaderElement.parentNode.removeChild(this.stickyHeaderElement);
      this.stickyHeaderElement = null;

      if (this.firstHeaderCell) {
        this.firstHeaderCell.style.top = 0;
      }

    } else if (!isHeaderVisible && this.stickyHeaderElement) {
      this.stickyHeaderElement.style.top = event.target.scrollTop + 'px';

      if (this.firstHeaderCell) {
        this.firstHeaderCell.style.top = event.target.scrollTop + 'px';
      }
    }
  }

  public onScrollX(event) {
    // console.log('$event', event)
    const isFirstColumnVisible = isInViewport(this.firstColumnElement.nativeElement);

    if (!isFirstColumnVisible && !this.stickyColumnElement) {
      this.stickyColumnElement = this.firstColumnElement.nativeElement.cloneNode(true);
      this.firstHeaderCell = this.headerElement.nativeElement.querySelector('.header-cell-first').cloneNode(true);
      const firstColumnCell = this.stickyColumnElement.querySelector('.column-cell-first');
      // console.log('firstHeaderCell', this.firstHeaderCell)
      // console.log('firstColumnCell', firstColumnCell)
      this.stickyColumnElement.insertBefore(this.firstHeaderCell, firstColumnCell);
      this.stickyColumnElement.classList.add('column-sticky');
      this.containerElement.nativeElement.appendChild(this.stickyColumnElement);

      if (this.firstHeaderCell) {
        this.firstHeaderCell.style.top = event.target.scrollTop + 'px';
      }
    } else if (isFirstColumnVisible && this.stickyColumnElement) {
      this.stickyColumnElement.parentNode.removeChild(this.stickyColumnElement);
      this.stickyColumnElement = null;
      this.firstHeaderCell = null;
    } else if (!isFirstColumnVisible && this.stickyColumnElement) {
      this.stickyColumnElement.style.left = event.target.scrollLeft + 'px';
      // this.stickyColumnElement.style.top = 30 + event.target.scrollTop + 'px';
    }
  }
}
