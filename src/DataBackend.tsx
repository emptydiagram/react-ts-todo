export interface DataBackend {
    get(key: string): string | null;
    set(key: string, value: string): void;
}

export class LocalStorageBackend implements DataBackend {
    get(key: string): string | null {
        return localStorage.getItem(key);
    }

    set(key: string, value: string) {
        localStorage.setItem(key, value);
    }

}