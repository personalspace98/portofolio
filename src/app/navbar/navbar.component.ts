import { Component, OnInit, Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any,
  ) { }

  ngOnInit(): void {
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
