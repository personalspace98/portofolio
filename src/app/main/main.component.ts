import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollService } from 'ngx-page-scroll-core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';

export interface Projects {
  img: string;
  txt: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  projects: Observable<Projects[]>;
  data: Observable<any>;
  email: string;
  db: AngularFirestore;
  ref: AngularFirestoreCollection<Projects>;

  contactForm: FormGroup;

  speed: number;
  timeout: number;
  devTxt: string;

  // bcDone = false;
  webDone = true;
  txt = 'Web developer';
  sendingMail: boolean;

  constructor(
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any,
    // db: AngularFirestore,
    private title: Title,
    private meta: Meta,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    this.contactForm = this.fb.group({
      emailFrom: [, [Validators.required, Validators.email]],
      subject: [, [Validators.required]],
      message: [, [Validators.required]],
      name: [, [Validators.required]],
    });
    this.title.setTitle('Home | Joep van de Pol');
    this.meta.updateTag({
      name: 'description',
      content:
        // tslint:disable-next-line: max-line-length
        'My name is Joep and I from the Netherlands. My passsion is developing all sort\'s of website\'s. Send me a message if you ever need a website.',
    });
    this.webDone = true;
  }

  ngOnInit() {
    this.webDone = true;
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.webDone = false;
    }, 3500);
  }

  scrollTo(id: string) {
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: id,
    });
  }

  openUrl(url: string) {
    window.open(url);
  }

  showSuccess() {
    this.toastr.success('', 'Your message is succesfully send');
  }

  showError() {
    this.toastr.error('', 'Ooopss, something went wrong');
  }

  sendEmail() {

    if (this.contactForm.valid) {
      this.sendingMail = true;
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      const data = {
        emailFrom: this.contactForm.value.emailFrom,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        name: this.contactForm.value.name
      };
      this.http
        .post(
          'https://us-central1-gj-brieven.cloudfunctions.net/sendEmail',
          JSON.stringify(data),
          {
            headers: headers,
          }
        ).subscribe((result: any) => {
          console.log('result', result);
          this.sendingMail = false;
          if (result === 'succeed') {
            this.showSuccess();
          } else {
            this.showError();
          }
          this.contactForm.reset();
        });
    }
  }
}
