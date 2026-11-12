/*
// Práctica 1. Hola mundo

import { StyleSheet, Text, View } from 'react-native';


export default function Index() {
  return (
      <View style={styles.pantalla}>
        <Text>¡Hola mundo! Soy Nau</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    alignItems: 'center',
    backgroundColor: 'lightpink',
    flex: 1,
    justifyContent: 'center',
  },
});
 */

// Práctica 2. Contador con dos botones

import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ContadorScreen() {
    const [contador, setContador] = useState(0);
    return (
        <View style={styles.contenedorCircular}>
            <Text>Contador: {contador}</Text>
            <Button title="Incrementar" onPress={() => setContador(n => n + 1)} />
            <Button title="Decrementar" onPress={() => setContador(n => n - 1)} />
        </View>
    );
}

const styles = StyleSheet.create({
    contenedorCircular: {
        alignItems: 'center',
        borderWidth: 2,
        backgroundColor: 'rgba(191, 186, 221, 0.54)',
        borderRadius: 100,
        padding: 20,
        borderColor: 'green',

    },
});

