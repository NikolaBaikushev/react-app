export enum LocalStorageKeys {
    THEME = 'theme',
    USER = 'user',
    FAVOURITE_QUOTES = 'favQuotes'
}

export const setLocalStorageItem = (key: LocalStorageKeys, value: any) => {
    localStorage.setItem(key, value);
}

export const getLocalStorageItem = (key: LocalStorageKeys) => {
    return localStorage.getItem(key)
}

export const deleteLocalStorageItem = (key: LocalStorageKeys) => {
    localStorage.removeItem(key)
}