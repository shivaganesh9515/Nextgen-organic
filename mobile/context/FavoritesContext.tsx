import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '@/constants/mocks'; // Or your Product type definition
import { Alert } from 'react-native';

type FavoritesContextType = {
    favorites: Product[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (id: string) => void;
    isFavorite: (id: string) => boolean;
    toggleFavorite: (product: Product) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Product[]>([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const stored = await AsyncStorage.getItem('favorites');
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (e) {
            console.error("Failed to load favorites", e);
        }
    };

    const saveFavorites = async (newFavorites: Product[]) => {
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
        } catch (e) {
            console.error("Failed to save favorites", e);
        }
    };

    const addToFavorites = (product: Product) => {
        setFavorites(prev => {
            const newState = [...prev, product];
            saveFavorites(newState);
            return newState;
        });
    };

    const removeFromFavorites = (id: string) => {
        setFavorites(prev => {
            const newState = prev.filter(p => p.id !== id);
            saveFavorites(newState);
            return newState;
        });
    };

    const isFavorite = (id: string) => {
        return favorites.some(p => p.id === id);
    };

    const toggleFavorite = (product: Product) => {
        if (isFavorite(product.id)) {
            removeFromFavorites(product.id);
        } else {
            addToFavorites(product);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
