import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
// import { ExcelMergeService } from '../excel-merge.service';

@Component({
  selector: 'app-excel-merge',
  templateUrl: './excel-merge.component.html',
  styleUrls: ['./excel-merge.component.scss']
})
export class ExcelMergeComponent implements OnInit {

  ngOnInit(): void { }
  
  showSection(id: any) {
    console.log("id", id);
    document.querySelectorAll('.section').forEach((sec: any) => sec.style.display = 'none');
    const section = document.getElementById(id)!;
    section.style.display = 'block';
  }
}