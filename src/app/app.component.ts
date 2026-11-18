import "./training"
import { Component } from '@angular/core';
import { Colors } from '../enums/Color';
import { Collection } from "./collection";


@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {
    console.log(this.checkColors("rgb(255, 0, 0)"))
    this.saveLastVisit()
    this.saveCountVisit()
    console.log(this.users.getAll())
    console.log(this.users.getOne(0))
    this.users.replaceOne(0, "Islam")
    console.log(this.users.getAll())
    console.log(this.price.getAll())
    console.log(this.price.getOne(1))
    this.price.deleteOne(2)
  }
  
// №1
logoTitle: string = "румтибет";

// №2
checkColors(color: string) {
  return Object.values(Colors).includes(color as Colors)
}

// №3
saveLastVisit() {
  localStorage.setItem('lastVisit', new Date().toISOString())
}

// №4
saveCountVisit() {
  const visit = Number(localStorage.getItem('countVisit'));
  localStorage.setItem('countVisit', String(visit + 1))
}

// №5
users = new Collection("memory", "", ["Ali", "Ahmed", "Said"]);
price = new Collection("localStorage", "price", [200, 400, 500])
}

