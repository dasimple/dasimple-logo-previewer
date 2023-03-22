import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  inputForm = this.fb.nonNullable.group({
    dShowMask: false,
    dSize: 128,
    dStroke: 12,
    aShowMask: false,
    aSize: 128,
    aStroke: 12,
    aOffset: 50,
    aPercentage: 75,
    showGeometry: false
  });

  get showMaskOfD() {
    return this.inputForm.controls.dShowMask.value;
  }

  get sizeOfD() {
    return this.inputForm.controls.dSize.value;
  }

  get strokeOfD() {
    return this.inputForm.controls.dStroke.value;
  }

  get areaOfD() {
    return Math.pow(this.sizeOfD, 2);
  }

  get showMaskOfA() {
    return this.inputForm.controls.aShowMask.value;
  }

  get sizeOfA() {
    return this.inputForm.controls.aSize.value;
  }

  get heightOfA() {
    return this.sizeOfA / Math.sqrt(2);
  }

  get maxBarWidthOfA() {
    return this.heightOfA * 2 - this.strokeOfA * Math.sqrt(2)
  }

  get maxBarOffsetOfA() {
    return this.sizeOfA / 2 + this.strokeOfA * (0.5 - 1 / Math.sqrt(2));
  }

  get strokeOfA() {
    return this.inputForm.controls.aStroke.value;
  }

  get offsetOfA() {
    return this.sizeOfD * this.inputForm.controls.aOffset.value / 100;
  }

  get percentageOfA() {
    return this.inputForm.controls.aPercentage.value / 100;
  }

  get areaOfA() {
    return Math.pow(this.sizeOfA, 2) / 2;
  }

  get sizeOfCanvas() {
    return this.offsetOfA + this.sizeOfA;
  }

  get centerOfMass() {
    return (this.sizeOfD / 2 * this.areaOfD + (this.offsetOfA + this.sizeOfA / 3) * this.areaOfA) / (this.areaOfD + this.areaOfA);
  }

  get showGeometry() {
    return this.inputForm.controls.showGeometry.value;
  }

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.inputForm.controls.dSize.valueChanges.subscribe(value => {
      this.inputForm.controls.aSize.setValue(value);
    });
    this.inputForm.controls.dStroke.valueChanges.subscribe(value => {
      this.inputForm.controls.aStroke.setValue(value);
    });
    this.loadInput();
    this.inputForm.valueChanges.subscribe(input => this.saveInput(input));
  }

  private loadInput() {
    const value = window.localStorage.getItem('dasimpleLogo') || '';
    try {
      const input = JSON.parse(value);
      this.inputForm.patchValue(input);
    } catch (e) {

    }
  }

  private saveInput(input: any) {
    const value = JSON.stringify(input);
    window.localStorage.setItem('dasimpleLogo', value);
  }
}
