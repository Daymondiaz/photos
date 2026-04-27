import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Foto {
  id: string;
  author: string;
  download_url: string;
}

interface FavoritosContextType {
  listaFavoritos: Foto[];
  alternarFavorito: (foto: Foto) => void;
}

const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined);

export const FavoritosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [listaFavoritos, setListaFavoritos] = useState<Foto[]>([]);

  const alternarFavorito = (foto: Foto) => {
    setListaFavoritos(prev => {
      const existe = prev.find(f => f.id === foto.id);
      if (existe) {
        return prev.filter(f => f.id !== foto.id);
      } else {
        return [...prev, foto];
      }
    });
  };

  return (
    <FavoritosContext.Provider value={{ listaFavoritos, alternarFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useMisFavoritos = (): FavoritosContextType => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error('useMisFavoritos must be used within a FavoritosProvider');
  }
  return context;
};