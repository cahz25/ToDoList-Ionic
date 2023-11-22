import { Component, ViewChild } from '@angular/core';
import { IonModal, ItemReorderEventDetail } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ToDoItem } from '../entities/toDoItem';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal: IonModal | undefined;
  
  public reorderDisabled: boolean = true;
  public toDoList: Array<ToDoItem> = [];
  public newToDoItem = '';


  constructor() {}

  public handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    console.log('Before complete', this.toDoList);
    this.toDoList = ev.detail.complete(this.toDoList);
    console.log('After complete', this.toDoList);
  }

  public toggleReorder() {
    this.reorderDisabled = !this.reorderDisabled;
  }

  public trackItems(index: number, item: ToDoItem) {
    return `${item.label}-${item.label}`;
  }

  public cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  public confirm() {
    this.modal?.dismiss(this.newToDoItem, 'confirm');
  }

  public onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm' && this.newToDoItem) {
      const newItem = this._createToDoItem(this.newToDoItem);
      this.toDoList.push(newItem);
      this.newToDoItem = '';
    }
  }

  public toggleCompleted(index: number) {
    this.toDoList[index].completed = !this.toDoList[index].completed;
  }

  public removeItem(index: number) {
    this.toDoList.splice(index, 1);
  }

  private _createToDoItem(label: string): ToDoItem {
    return {
      label,
      completed: false,
      id: this.toDoList.length
    }
  }

}
