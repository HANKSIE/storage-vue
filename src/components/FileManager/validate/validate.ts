const validate = (result: string|boolean) => !!result && typeof result !== "string";
export default validate;