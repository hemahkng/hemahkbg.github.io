import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class ExcelMergeService {

    constructor() { }

    mergeExcelFiles(files: File[]): Promise<Blob> {
        return new Promise((resolve, reject) => {
            const mergedData: any[] = [];
            let fileReadCount = 0;

            files.forEach(file => {
                const reader = new FileReader();

                reader.onload = (e: any) => {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(sheet);

                    mergedData.push(...jsonData);

                    fileReadCount++;
                    if (fileReadCount === files.length) {
                        const mergedWorkbook = XLSX.utils.book_new();
                        const mergedSheet = XLSX.utils.json_to_sheet(mergedData);
                        XLSX.utils.book_append_sheet(mergedWorkbook, mergedSheet, 'MergedData');
                        const mergedExcelString = XLSX.write(mergedWorkbook, { bookType: 'xlsx', type: 'binary' });
                        const blob = new Blob([this.s2ab(mergedExcelString)], { type: 'application/octet-stream' });
                        resolve(blob);
                    }
                };

                reader.onerror = error => reject(error);

                reader.readAsArrayBuffer(file);
            });
        });
    }

    // Helper function to convert string to ArrayBuffer
    s2ab(s: string): ArrayBuffer {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    }
}
