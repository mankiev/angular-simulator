export class Collection <T> {
constructor(
  private source: "memory" | "localStorage",
  private storageKey: string,
  private items: T[] = []
) {
  
  if (source === "localStorage") {
    // Если ключа нет в localStorage, сохраняем начальный массив
    if (localStorage.getItem(this.storageKey) === null) {
      this.saveToStorage(this.items);
    }
  }
}
  
  // Получаем массив из localStorage по ключу коллекции.
  private getFromStorage(): T[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || "[]");
  }
  
  // Сохраняем массив в localStorage по ключу коллекции.
  private saveToStorage(items: T[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
  
  // Проверяем что индекс является целым числом и находится в пределах массива.
  private isValidIndex(index: number): boolean {
    return(
      index < this.getAll().length &&
      Number.isInteger(index) &&
      index >= 0
    )
  }

  getAll(): T[] {
    if (this.source === "memory") {
      return [...this.items]; // Возвращаем копию массива, чтобы не было доступа к оригиналу извне
    }
    
    return this.getFromStorage();
  }
  
  getOne(index: number): T | undefined {
    if (!this.isValidIndex(index)) {
      return
    }
    
    if (this.source === "memory") {
      return this.items[index];
    }
    
    return this.getFromStorage()[index];
  }
  
  clearAll(): void {
    if (this.source === "memory") {
      this.items = [];
    } else {
      this.saveToStorage([]);
    }
  }
  
  deleteOne(index: number): void {
    if (!this.isValidIndex(index)) {
      return
    }
    
    if (this.source === "memory") {
      this.items.splice(index, 1); // Удаляем один элемент по полученному индексу.
    } else {
      const response = this.getFromStorage();
      response.splice(index, 1);
      this.saveToStorage(response);
    }
  }
  
  // Заменяем элемент по указанному индексу.
  replaceOne(index: number, item: T): void {
    if(!this.isValidIndex(index)) {
      return
    }
    
    if (this.source === "memory") {
      this.items[index] = item;
    } else {
      const response = this.getFromStorage();
      response[index] = item;
      this.saveToStorage(response);
    }
  }

}