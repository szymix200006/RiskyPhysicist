import { ComponentRef, Injectable, Type, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  attach<T>(component: Type<T>, viewContainerRef: ViewContainerRef, inputs: {name: string, value: any}[]): ComponentRef<T> {
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(component);
    for(let input of inputs) {
      const componentRefInstance = componentRef.instance as {[key: string]: any}
      componentRefInstance[input.name] = input.value;
    }
    return componentRef;
  }

  detach(viewContainerRef: ViewContainerRef): void {
    viewContainerRef.clear();
  }
  
  constructor() { }
}
