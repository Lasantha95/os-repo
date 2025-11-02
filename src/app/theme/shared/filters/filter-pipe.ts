import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform<T>(items: T[], searchText: string, fieldName?: keyof T): T[] {
    if (!items) return [];
    if (!searchText) return items;

    const lower = searchText.toLowerCase();

    return items.filter(item => {
      if (Array.isArray(fieldName)) {
        return fieldName.some(field => String(item[field] ?? '').toLowerCase().includes(lower));
      }
      if (fieldName) {
        const value = String(item[fieldName] ?? '').toLowerCase();
        return value.includes(lower);
      }
      return JSON.stringify(item).toLowerCase().includes(lower);
    });
  }

}
