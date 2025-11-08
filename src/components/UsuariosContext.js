import React, { createContext,useState} from 'react';

export const UsuariosContext = createContext();

export const ProdutosProvider= ({children}) => {
    const [listaUsuarios, setListaDeUsuarios]= useState([]);

    const adicionarUsuario =(usuario) =>{
        setListaDeUsuarios((prev) => [...prev, usuario]);
    };

    return (
        <ProdutosContext.Provider value={{listaDeUsuarios, adicionarUsuario}}>
            {children}
        </ProdutosContext.Provider>
    );
};