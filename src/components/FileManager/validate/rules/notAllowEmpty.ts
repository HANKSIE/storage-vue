const notAllowEmptyRule = ( val: string ): boolean|string => {
    return val.trim().length > 0 || "此欄位必填";
};

export default notAllowEmptyRule;