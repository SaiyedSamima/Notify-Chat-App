import {create} from 'zustand';


export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "dark",
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({theme});
    }

}));

// import { create } from 'zustand';

// export const useThemeStore = create((set) => ({
//     theme: 'light', // Default theme
//     setTheme: (newTheme) => set({ theme: newTheme }),
// }));