import React, { createContext,useState} from 'react';

export const ProdutosContext = createContext();

export const ProdutosProvider= ({children}) => {
    const [listaDeProdutos, setListaDeProdutos]= useState([]);

    const adicionarProduto =(produto) =>{
        setListaDeProdutos((prev) => [...prev, produto]);
    };

    return (
        <ProdutosContext.Provider value={{listaDeProdutos, adicionarProduto}}>
            {children}
        </ProdutosContext.Provider>
    );
};