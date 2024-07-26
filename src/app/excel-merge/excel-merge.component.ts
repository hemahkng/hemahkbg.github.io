import { Component, ViewChild, ElementRef } from '@angular/core';
import { ExcelMergeService } from '../excel-merge.service';

@Component({
  selector: 'app-excel-merge',
  templateUrl: './excel-merge.component.html',
  styleUrls: ['./excel-merge.component.scss']
})
export class ExcelMergeComponent {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  mergedFileUrl: string | null = null;
  selectedFiles: string[] = [];

  constructor(private excelMergeService: ExcelMergeService) { }

  onFileChange(event: any): void {
    const files: File[] = Array.from(event.target.files);
    this.selectedFiles = files.map(file => file.name);

    this.excelMergeService.mergeExcelFiles(files)
      .then(mergedBlob => {
        this.mergedFileUrl = URL.createObjectURL(mergedBlob);
      })
      .catch(error => console.error('Error merging files:', error));
  }

  downloadMergedFile(): void {
    if (this.mergedFileUrl) {
      const a = document.createElement('a');
      a.href = this.mergedFileUrl;
      a.download = 'merged_output.xlsx';
      a.click();
      this.clearFileInput();
    }
  }

  clearFileInput(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
      this.mergedFileUrl = '';
      this.selectedFiles = [];
    }
  }
}
