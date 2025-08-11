import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
// import { ExcelMergeService } from '../excel-merge.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

interface TemplateParams {
  [key: string]: unknown;
  from_name: string;
  from_email: string;
  message: string;
}

@Component({
  selector: 'app-excel-merge',
  templateUrl: './excel-merge.component.html',
  styleUrls: ['./excel-merge.component.scss']
})
export class ExcelMergeComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';
  openMessage: boolean = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  ngOnInit(): void { }

  showSection(id: any) {
    console.log("id", id);
    document.querySelectorAll('.section').forEach((sec: any) => sec.style.display = 'none');
    const section = document.getElementById(id)!;
    section.style.display = 'block';
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.contactForm.invalid) {
      this.successMessage = "Please fill details";
      this.openSnackBar();
      return;
    }

    const { name, email, message } = this.contactForm.value;

    this.sendEmail(name, email, message);
  }

  sendEmail(name: any, email: any, message: any): void {
    const templateParams: TemplateParams = {
      from_name: name,
      from_email: email,
      message: message
    };

    emailjs.send('service_snblcm1', 'template_whlhaih', templateParams, 'iWO8I-10jfcHD0yRA')
      .then((result: EmailJSResponseStatus) => {
        this.successMessage = 'Thank you for reaching out! I will get back to you soon.';
        this.contactForm.reset();
        this.submitted = false;
        this.errorMessage = '';
      })
      .catch((error: any) => {
        this.errorMessage = 'Failed to send message. Please try again.';
        this.successMessage = '';
        console.error('EmailJS error:', error);
      });
  }

  openSnackBar() {
    this.openMessage = true;
    setTimeout(() => {
      this.openMessage = false;
    }, 3000);
  }
}