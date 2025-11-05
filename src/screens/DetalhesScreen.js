import { StyleSheet, Text, View, 
  ScrollView, Platform, Alert, Button,ActivityIndicator, TextInput } from "react-native";
import React, {useEffect, useState} from "react";

import {doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {db} from "../service/firebaseConnections";


export default function DetalhesScreen({route, navigation}) {
  const {idproduto} = route.params;
 
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const carregarProduto = async() =>{
      try{
        const docRef = doc(db, "produtos", idproduto);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
          const data = docSnap.data();
          
          setProduto(data);
          setNome(data.nome);
          setPreco(String(data.preco));
          setDescricao(data.descricao);
        } else {
          Alert.alert("Erro", "Produto não encontrado!");
          navigation.goBack();
        }
      } catch (error) {
          console.error("Erro ao carregar produto: ", error);
          Alert.alert("Erro", "Não foi possível carregar o produto.");
      } finally {
          setLoading(false);
      }

        
    };
    carregarProduto();
  }, []);

  const handleAtualizar = async () => {
    if (!nome || !preco || !descricao) {
      Platform.OS === "web"
          ? window.alert("Preencha todos os campos antes de atualizar!")
          : Alert.alert("Aviso", "Preencha todos os campos antes de atualizar!")
      return;
    }
  
    try {
      const produtoRef = doc(db, "produtos", idproduto);
      await updateDoc(produtoRef, {
        nome,
        preco: parseFloat(preco),
        descricao,
      });
        Platform.OS === "web"  
            ? window.alert("Produto atualizado com sucesso!")
            : Alert.alert("Sucesso", "Produto atualizado com sucesso!");
      setEditando(false);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
       Platform.OS === "web"
            ? window.alert("Não foi possível atualizar o produto.")
            : Alert.alert("Erro", "Não foi possível atualizar o produto.");
    }
  };

  const handlerExcluir = async ( ) => {
    if (Platform.OS === "web") {
      const confirmar = window.confirm("Deseja realmente excluir este produto?");
      if (!confirmar) return;
    
      try{
        const produtoRef = doc(db, "produtos", idproduto);
        await deleteDoc (produtoRef);
        alert("Produto excluído com sucesso!");
        navigation.goBack();
      }catch(error) {
          console.error("Erro ao deletar: ", error);
          Alert.alert("Não foi possível excluir o produto. ");
        }
    } else {
        Alert.alert("Confirmação", "Deseja realmente excluir este produto?", [
          {text: "Cancelar", style: "cancel"},
            {
              text: "Excluir",
              style: "destructive",
            onPress: async() =>{
              try {
              const produtoRef = doc(db, "produtos", idproduto);
              await deleteDoc(produtoRef);
              Alert.alert("Excluído", "Produto removido com sucesso!");
              navigation.goBack();
            } catch (error){
              console.error("Erro ao deletar:", error);
              Alert.alert("Erro", "Não foi possível deletar o produto.");
            }
        
            },
          },
        ]);
    }
  
  };
  
    if (loading) { 
      return <ActivityIndicator style={{ flex: 1 }} size= "large"/>;
    } 

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Detalhes do Produto</Text>

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          editable={editando}
        />

        <Text style={styles.label}>Preço:</Text>
        <TextInput
          style={styles.input}
          value={preco}
          onChangeText={setPreco}
          editable={editando}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={[styles.input, {height: 100}]}
          value={descricao}
          onChangeText={setDescricao}
          editable={editando}
          multiline
        /> 

        <View style={styles.botoes}>
          {!editando ? (
            <Button title="Editar" onPress={() => setEditando(true)} />
          ) : (   
            <Button title="Salvar Alterações" onPress={handleAtualizar}/>
          )}
        </View>

        <View style={styles.botoes}>
          <Button title="Excluir Produto" color="red" onPress={handlerExcluir}/>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title:{
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginTop: 10,
  },
  botoes: {
    marginTop: 10,
  },
});