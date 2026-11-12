# Dossier de React Native con Expo y Android Studio

## Crear y ejecutar un proyecto Expo

En primer lugar se creó el proyecto con los siguientes comandos;

```bash
npx create-expo-app@latest dossier-react-native --template default
cd dossier-react-native
code .
npx expo start
```

Tras esto se empezó con la práctica número 1.

### Práctica 1. Hola mundo

En esta práctica se creó una pantalla que muestre un Hola mundo en nuestro emulador, se utilizó el siguiente código base:

```tsx
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.pantalla}>
      <Text>¡Hola mundo! Soy ...</Text>
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
```

El resultado fue el siguiente:

![](imagenes/1.png)

### Práctica 2. Contador con dos botones

En la práctica 2 se realizo mediante el siguiente código base una app con dos botones que incrementan o decrementan un contador.

```tsx
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function ContadorScreen() {
  const [contador, setContador] = useState(0);
  return (
    <View style={styles.caja}>
      <Text>Contador: {contador}</Text>
      <Button title="Incrementar" onPress={() => setContador(n => n + 1)} />
    </View>
  );
}
const styles = StyleSheet.create({
  caja: { alignItems: 'center', borderWidth: 2, padding: 20 },
});
```

```tsx
const styles = StyleSheet.create({
  contenedorCircular: {
    backgroundColor: 'rgba(191, 186, 221, 0.54)',
    borderRadius: 100,
    padding: 20,
  },
});
```
El resultado fue el siguiente:

![](imagenes/2.png)
![](imagenes/2_1.png)