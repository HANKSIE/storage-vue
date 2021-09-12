class LocalStorageWrapper {
    private key: string;

    constructor(key: string){
        this.key = key;
    }

    get value(): string|null{
        return localStorage.getItem(this.key);
    }

    remove(): void{
        localStorage.removeItem(this.key);
    }

    set(token: string): void{
        localStorage.setItem(this.key, token);
    }
}

export default LocalStorageWrapper;