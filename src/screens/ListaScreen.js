import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { subscribeProdutos } from "../service/ProdutosService";

export default function ListaScreen() {
    const navigation = useNavigation();
    const [produtos, setProdutos] = useState([]);
    const[loading, setLoading] = useState(true);

 useEffect(() => {
    const unsubscribe = subscribeProdutos((itens) =>{
    setProdutos(itens);
    setLoading(false);
 }, (err) => {
    console.error(err);
    setLoading(false);

 });
 return () => unsubscribe();

 }, []);

    const renderItem = ({item}) => (
        <TouchableOpacity style={styles.itemContainer}
            onPress={() => {navigation.navigate('Detalhes', {idproduto:item.id});}}
            >
            <Text style={styles.produto}>Produto: {item.nome}</Text>
            <Text style={styles.precoproduto}>Preço: R$ {item.preco.toFixed(2)}</Text>
            <Text style={styles.produto}>Descrição: {item.descricao}</Text>

        </TouchableOpacity>
    );

    if (loading) return <ActivityIndicator style={{flex:1}} size= "large"/>;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Meus Produtos</Text>

        {produtos.length > 0 ? (
            <FlatList
            data={produtos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            />
        ) : (
            <Text style={styles.mDataTex}> Nenhum produto cadastrado!</Text>
        
        )}
    
      </View>
    );

}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      padding: 10,
      backgroundColor: '#f0f0f0'
    },
    title:{
      fontWeight:'bold',
      marginBottom: 25,
      textAlign: 'center'
    },
    produto:{
      fontSize: 12,
      fontWeight: 'bold'
    },
    itemContainer:{
      padding: 15,
      backgroundColor: '#f9f9f9',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
    },
    precoproduto:{
      fontSize: 12,
      color: '#555',
      marginTop: 5
    },

    mData: {
      textAlign: 'center',
      fontSize: 16,
      color: 'black',
      marginTop: 50
    },
 })

