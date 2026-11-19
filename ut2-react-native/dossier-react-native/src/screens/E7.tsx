import { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

type Props = { nombre: string; style?: StyleProp<ViewStyle> };

function Caja({ nombre, style }: Props) {
    const [valorFlex, setValorFlex] = useState(1);

    return (
        <View style={[styles.caja, { flex: valorFlex }, style]}>
            <Text style={styles.texto}>{nombre}</Text>
            <Text style={styles.texto}>{valorFlex}</Text>

            <View style={styles.botones}>
                <TouchableOpacity style={styles.boton} onPress={() => setValorFlex(n => Math.max(0, n - 1))}>
                    <Text style={styles.textoBoton}>-</Text>
                </TouchableOpacity>
                <TouchableHighlight style={styles.boton} underlayColor="#ddd" onPress={() => setValorFlex(n => n + 1)}>
                    <Text style={styles.textoBoton}>+</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default function PrincipalScreen() {
    return (
        <View style={styles.contenedorPrincipal}>
            <Text style={styles.titulo}>Contenedor Principal</Text>

            <View style={styles.escenario}>
                <Caja nombre="Caja A"
                      style={{ backgroundColor: '#c3601c', borderRadius: 20, borderWidth: 8}}
                />

                <Caja
                    nombre="Caja B"
                    style={{ backgroundColor: '#1c56a1', borderWidth: 2 }}
                />

                <Caja
                    nombre="Caja C"
                    style={{ backgroundColor: '#4f1764', borderWidth: 2}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#a39f9f',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'yellow',
        textAlign: 'center',
        marginBottom: 15,
    },
    escenario: {
        flex: 1,
        backgroundColor: '#cfcbcb',
        padding: 15,
        gap: 15,
    },
    caja: {
        width: 100,
        height: 100,
        backgroundColor: '#4aec1d',
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    botones: {
        flexDirection: 'row',
        gap: 5,
        marginTop: 5,
    },
    boton: {
        backgroundColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
    },
    textoBoton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
