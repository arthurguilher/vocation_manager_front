import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-child',
    template: `<button (click) = "valueChanged()">Click me</button>`
})
export class AppChildComponent{
    
    @Output() valueChange = new EventEmitter();
    counter = 0;
    
    valueChanged(){
        this.counter = this.counter + 1;
        this.valueChange.emit(this.counter);
    }
}
