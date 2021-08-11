const filenameRule = ( val: string ): boolean|string => {
    return !val.match(/[/\\?%*:|"<>]/) || "檔名不可包含 /,\\,?,%,*,:,|,\",<,>"
};

export default filenameRule;