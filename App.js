import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import DetalhesScreen from './src/screens/DetalhesScreen'; 


const Stack = createNativeStackNavigator();
export default function App() {

  return (
    
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name = 'Home' component={HomeScreen}/>
        <Stack.Screen name = 'Cadastro' component={CadastroScreen}/>
        <Stack.Screen name='Detalhes' component={DetalhesScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
