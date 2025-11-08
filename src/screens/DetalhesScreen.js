import { StyleSheet, Text, View, 
  ScrollView, Platform, Alert, Button,ActivityIndicator, TextInput } from "react-native";
import React, {useEffect, useState} from "react";

import {doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {db} from "../service/firebaseConnections";


export default function DetalhesScreen({route, navigation}) {
  const {idusuario} = route.params;
 
  const [usuario, setUsuario] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const carregarUsuario = async() =>{
      try{
        const docRef = doc(db, "usuario", idusuario);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()){
          const data = docSnap.data();
          
          setNome(data.usuario);
          setDescricao(data.descricao);
        } else {
          Alert.alert("Erro", "Usuário não cadastrado!");
          navigation.goBack();
        }
      } catch (error) {
          console.error("Erro ao buscar usuário: ", error);
          Alert.alert("Erro", "Não foi possível buscar o usuário.");
      } finally {
          setLoading(false);
      }

        
    };
    carregarUsuario();
  }, []);

  const handleAtualizar = async () => {
    if (!nome || !descricao) {
      Platform.OS === "web"
          ? window.alert("Preencha todos os campos antes de atualizar!")
          : Alert.alert("Aviso", "Preencha todos os campos antes de atualizar!")
      return;
    }
  
    try {
      const usuarioRef = doc(db, "usuário", idusuario);
      await updateDoc(usuarioRef, {
        nome,
        preco: parseFloat(preco),
        descricao,
      });
        Platform.OS === "web"  
            ? window.alert("Usuário atualizado com sucesso!")
            : Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
      setEditando(false);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
       Platform.OS === "web"
            ? window.alert("Não foi possível atualizar o usuário.")
            : Alert.alert("Erro", "Não foi possível atualizar o usuário.");
    }
  };

  const handlerExcluir = async ( ) => {
    if (Platform.OS === "web") {
      const confirmar = window.confirm("Deseja realmente excluir este usuário?");
      if (!confirmar) return;
    
      try{
        const produtoRef = doc(db, "usuário", idusuario);
        await deleteDoc (usuarioRef);
        alert("Usuário excluído com sucesso!");
        navigation.goBack();
      }catch(error) {
          console.error("Erro ao deletar: ", error);
          Alert.alert("Não foi possível excluir o usuário. ");
        }
    } else {
        Alert.alert("Confirmação", "Deseja realmente excluir este usuário?", [
          {text: "Cancelar", style: "cancel"},
            {
              text: "Excluir",
              style: "destructive",
            onPress: async() =>{
              try {
              const usuarioRef = doc(db, "usuário", idusuario);
              await deleteDoc(usuarioRef);
              Alert.alert("Excluído", "Usuário removido com sucesso!");
              navigation.goBack();
            } catch (error){
              console.error("Erro ao deletar:", error);
              Alert.alert("Erro", "Não foi possível deletar o usuário.");
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