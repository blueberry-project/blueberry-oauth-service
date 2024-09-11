import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[cpfMask]'
})
export class CpfMaskDirective {

  constructor(public ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInputChange(event: any): void {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 11) {
      input = input.substring(0, 11);
    }

    const cpfParts = input.match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);

    if (cpfParts) {
      let maskedCpf = cpfParts[1];
      if (cpfParts[2]) {
        maskedCpf += '.' + cpfParts[2];
      }
      if (cpfParts[3]) {
        maskedCpf += '.' + cpfParts[3];
      }
      if (cpfParts[4]) {
        maskedCpf += '-' + cpfParts[4];
      }

      this.ngControl.control?.setValue(maskedCpf, { emitEvent: false });
    }
  }
}
