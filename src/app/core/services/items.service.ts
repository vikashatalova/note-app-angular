import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

interface NoteItems {
    id: string,
    title?: string | null,
    description?: string | null,
    categories: {
        category: {
            name?: string | null,
            color?: string | null,
            isActive?: boolean | undefined
        }
    },
    isFavorite?: boolean | undefined
}

@Injectable({
    providedIn: 'root',
})
export class NotesService {

    public allNotes?: NoteItems[];
    public copyNoteItems?: NoteItems[];

    
    private filteredNotesSubject = new BehaviorSubject<any[]>([]);
    filteredNotes$ = this.filteredNotesSubject.asObservable();

    constructor(
        private _lcStorage: LocalStorageService
    ) {}

    /**
     * Получение всех записей
     * @returns значение или null
     */
    getNoteItems() {
        return this._lcStorage.get('buttonItems');
    }

    /**
     * Получение удаленных записей
     * @returns значение или null
     */
    getDeletedNoteItems() {
        return this._lcStorage.get('deletedItems');
    }

    /**
     * Получение избранных записей
     * @returns значение или null
     */
    getFavoriteNoteItems() {
        return this._lcStorage.get('favoriteItems');
    }

    /**
     * Сохранение новой записи
     * @param item значение
     */
    saveNewNote(item: any) {
        this._lcStorage.set('buttonItems', item);
    }

    /**
     * Поиск записи по ее названию
     * @param query значение
     */
    searchAllNotes(query: string) {
        this.allNotes = this.getNoteItems();
        let filteredNotes;

        if (query) {
            filteredNotes =  this.allNotes!
                .filter((el) => el.title!.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        } else {
            filteredNotes = this.allNotes;
        }
        
        this.filteredNotesSubject.next(filteredNotes || []);
    }

    searchDeletedNotes(query: string) {
        const deletedNotes = this.getDeletedNoteItems();
        let filteredNotes;

        if (query) {
            filteredNotes = deletedNotes
                .filter((el: any) => el.title!.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        } else {
            filteredNotes = deletedNotes;
        }
        
        this.filteredNotesSubject.next(filteredNotes || []);
    }

    searchNotes(query: string, key: string) {
        console.log('Запуск поиска с ключом:', key, 'и запросом:', query);
        
        const allNotes = this.getNoteItems();
        const deletedNotes = this.getDeletedNoteItems();
        const favoriteNotes = this.getFavoriteNoteItems();
        let filteredNotes;

        if (key === 'buttonItems' || key === '') {
            filteredNotes = query
            ? allNotes.filter((el: any) => el.title!.toLowerCase().includes(query.toLowerCase()))
            : allNotes;
        console.log('Фильтрация по всем записям');
        } else if (key === 'deletedItems' || key === '') {
            filteredNotes = query
            ? deletedNotes.filter((el: any) => el.title!.toLowerCase().includes(query.toLowerCase()))
            : deletedNotes;
        console.log('Фильтрация по удаленным записям');
        } else if (key === 'favoriteItems' || key === '') {
            filteredNotes = query
            ? favoriteNotes.filter((el: any) => el.title!.toLowerCase().includes(query.toLowerCase()))
            : favoriteNotes;
        console.log('Фильтрация по избранным записям');
        }

        console.log('Отправка отфильтрованных данных:', filteredNotes);
        this.filteredNotesSubject.next(filteredNotes || []);
    }

    filteredNoteItems(notes: any, query: string) {
        let filteredNotes;

        if (notes) {
            filteredNotes = notes
                .filter((el: any) => el.title!.toLowerCase().indexOf(query.toLowerCase()) >= 0)
        } else {
            filteredNotes = notes;
        }
    }
}