import { Component, OnInit, Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear: number;

  constructor(
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnInit(): void {
    const now = new Date;
    this.currentYear = now.getFullYear();
  }

  openUrl(url: string) {
    window.open(url);
  }

  openEmail() {
    window.location.href = 'mailto:joepvdpol1998@gmail.com?subject=Contact';
  }

  scrollTo(id: string) {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: id,
    });
  }

}
