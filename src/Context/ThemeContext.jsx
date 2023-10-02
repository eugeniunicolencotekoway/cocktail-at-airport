import React from 'react';


export const previousThemeStorageKey = '_theme';
const previousTheme = localStorage.getItem(previousThemeStorageKey) || 'primary';

export const defaultThemeValue = { color: previousTheme, changeTheme: (color) => {} };
export const ThemeContext = React.createContext(defaultThemeValue);

