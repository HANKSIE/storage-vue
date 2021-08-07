class Token {
    private tokenName: string;

    constructor(tokenName: string){
        this.tokenName = tokenName;
    }

    get value(): string|null{
        return localStorage.getItem(this.tokenName);
    }

    remove(): void{
        localStorage.removeItem(this.tokenName);
    }

    set(token: string): void{
        localStorage.setItem(this.tokenName, token);
    }
}

export default Token;