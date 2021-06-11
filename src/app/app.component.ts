import { Component, OnInit } from '@angular/core';
import { pdfjsVersion } from 'ngx-extended-pdf-viewer';
import * as PDFJS from 'pdfjs-dist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pdfSrc = '/assets/exemple-form-sign-SIGNED.pdf';
  renderedPageImage: string = '';

  constructor() {
    console.log(pdfjsVersion);
  }

  ngOnInit(): void {
    this.loadPDFJs();
  }

  private loadPDFJs(): void {
    PDFJS.getDocument(this.pdfSrc).promise.then((pdfDoc) => {
      pdfDoc.getPage(1).then((page) => {
        const scale = 1.0;
        const viewport = page.getViewport({ scale });
        const canvas = <HTMLCanvasElement>document.createElement('canvas');
        const canvasContext = canvas.getContext('2d');
        if (canvasContext) {
          canvasContext.canvas.width = viewport.width;
          canvasContext.canvas.height = viewport.height;
          page
            .render({
              canvasContext: canvasContext as any,
              viewport,
            })
            .promise.then(() => {
              this.renderedPageImage = <string>(
                canvasContext?.canvas.toDataURL()
              );
            });
        }
      });
    });
  }
}
