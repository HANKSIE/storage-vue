const validate = (...results: (string|boolean)[]): boolean => {
    for(let i=0; i < results.length; i++){
        const result = results[i];
        if(typeof result === "string" || result === false){
            return false;
        }
    }
    return true;
}
    
export default validate;