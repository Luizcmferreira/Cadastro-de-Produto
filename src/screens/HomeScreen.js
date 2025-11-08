import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function HomeScreen({navigation}) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Aplicativo de controle de usuário para melhorar o acompanhamento.</Text>

        <TouchableOpacity
          style={styles.styleButtom}
          onPress={()=> navigation.navigate("Cadastro")}  
        >
        <Text  style={styles.buttomText}>Cadastrar Produtos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.styleButtom}
          onPress={()=> navigation.navigate("Detalhes")}  
        >
        <Text style={styles.buttomText}>Detalhes do usuário</Text>
        </TouchableOpacity>
    
      </View>
    );
  }

  const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#f0f0f0'
    },

    title:{
      fontSize: 18,
      fontWeight:'bold',
      marginTop:40,
      marginBottom: 20
    },

    styleButtom:{
      backgroundColor: '#007BFF',
      padding: 15,
      width: '80%',
      alignItems: 'center',
      marginBottom:20
    },

    buttomText:{
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold'
    }

  })