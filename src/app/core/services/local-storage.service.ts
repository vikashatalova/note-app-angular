import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {

    /**
     * Установить значение в localStorage
     * @param key ключ: string
     * @param value значение: any
     */

    public set (key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    /**
     * Получение значения
     * @param key ключ: string
     * @returns значение или null, если ключ не найден
     */
    public get(key: string): any {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }

    /**
     * Удаление значения из localStrorage
     * @param key ключ: string
     */
    public remove(key: string): void {
        localStorage.removeItem(key);
    }

    /**
     * Проверка существует ли значение в localStrorage
     * @param key ключ: string
     * @returns true, если ключ есть, false в противном случае
     */
    public has(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }

    /**
     * DANGER!, очистка localStrorage
     */
    public clear(): void {
        localStorage.clear();
    }
}