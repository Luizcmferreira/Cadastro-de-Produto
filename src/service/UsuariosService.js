import{
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    query,
    orderBy,
    onSnapshot,
    updateDoc,
    deleteDoc,
    serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebaseConnections";

const produtosCollection = collection(db,'produtos')


//Criar produto
export const criarUsuario = async (usuario) => {
    const payload ={
        nome: usuario.nome,
        cpf: usuario.cpf,
        decricao: usuario.cpf,
        createdAt: serverTimestamp()
    };
    const ref = await addDoc(usuariosCollection,payload);
    return ref.id;
}

// ler todos
export const subscribeUsuarios = (callback) => {

    const q = query(usuariosCollection, orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
        const itens = snapshot.docs.map((d) => ({id: d.id, ...d.data()}));
        callback(itens);
    });

};

//ler todos
export const obterUsuarios = async () => {
    const snap = await getDocs (usuariosCollection);
    return snap.docs.map((d) => ({id: d,id, ...d.data()}));

};

//ler um por id
export const obterUsuariosPorId = async (id) => {
    const docRef = doc(db, "produtos", id);
    const d = await getDoc(docRef);
    if (!d.exists()) return null;
    return {id: d,id, ...d.data()};
};

//atualizar 
export const atualizarUsuario = async (id, dados) => {
    const docRef= doc(db, "produtos", id);
    await updateDoc(docRef, { ...dados, updateAt: serverTimestamp()});
};

//deletar
export const deletarProduto = async (id) => {
    const docRef = doc(db, "produtos", id);
    await deleteDoc(docRef);
};






