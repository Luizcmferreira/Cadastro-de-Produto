import { Alert, Button, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import React, {useState} from "react";
import { criarUsuario } from "../service/UsuariosService";

export default function CadastroScreen() {
    const [usuario, setUsuario] = useState("");
    const [ cpf, setCpf] = useState ("");
    const [ email, setEmail] = useState ("");
    const [descricao, setDescricao] = useState("");

    const handlerCadastro = async() =>{
      if (usuario==="" || cpf==="" || email==="" || descricao===""){
        Platform.OS ==="web"
        ? window.alert("Por favor, preencha todos os campos.")
        :Alert.alert("Erro!", "Por favor, preencha todos os campos.");
        return;
      }

      
    

    const novo = {
      usuario,
      cpf,
      email,
      descricao,
    };

    try{
      const id = await criarUsuario(novo);
      Platform.OS ==="web"
      ? window.alert("Usuário cadastrado com sucesso!")
      :Alert.alert("Sucesso!", "Usuário cadastrado com sucesso!");
  
      setUsuario("");
      setCpf("");
      setEmail("");
      setDescricao("");

    }catch(error){
      console.error("Erro ao cadastrar usuário: ",error);
      Platform.OS ==="web"
      ? window.alert("Erro ao cadastrar o usuário, Tente novamente.")
      :Alert.alert("Erro", "Erro ao cadastrar o usuário, Tente novamente.");
    }
  
  
   
  };
    return (

      <View style={styles.container}>
        <Text style={styles.styleText}>Nome do Usuário</Text>
        <TextInput 
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Digite o nome do usuário"
        />

        <Text style={styles.styleText}>CPF</Text>
        <TextInput 
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        placeholder="Digite o CPF do usuário"
        />

        <Text style={styles.styleText}>Email</Text>
        <TextInput 
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite o email do usuário"
        />

        <Text style={styles.styleText}>Descrição</Text>
        <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Detalhes do Usuário" 
        multiline
        />

      

        <Button title="Cadastrar" onPress={handlerCadastro}/>
      
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f0f0f0",
    },
    styleText: {
      fontSize: 18,
      marginBottom: 5,
      marginTop: 15,
    },

    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      paddingHorizontal: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
})