import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PrincipalScreen() {
    const [colores, setColores] = useState<string[]>([]);
    const [direccion, setDireccion] = useState<'row' | 'column'>('row');
    const [envoltura, setEnvoltura] = useState<'wrap' | 'nowrap'>('nowrap');

    const agregarCirculo = () => {
        const r = Math.min(255, Math.floor(Math.random() * 256));
        const g = Math.min(255, Math.floor(Math.random() * 256));
        const b = Math.min(255, Math.floor(Math.random() * 256));

        setColores([...colores, `rgb(${r}, ${g}, ${b})`]);
    };

    return (
        <View style={styles.contenedorPrincipal}>
            <Text style={styles.titulo}>Círculos Dinámicos</Text>

            <View style={styles.controles}>
                <TouchableOpacity
                    style={[styles.boton, { backgroundColor: '#27ae60' }]}
                    onPress={agregarCirculo}
                >
                    <Text style={styles.textoBoton}>+ Añadir Círculo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.boton, { backgroundColor: '#2980b9' }]}
                    onPress={() => setEnvoltura(prev => (prev === 'nowrap' ? 'wrap' : 'nowrap'))}
                >
                    <Text style={styles.textoBoton}>Wrap: {envoltura}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.boton, { backgroundColor: '#8e44ad' }]}
                    onPress={() => setDireccion(prev => (prev === 'row' ? 'column' : 'row'))}
                >
                    <Text style={styles.textoBoton}>Dirección: {direccion}</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.escenario, { flexDirection: direccion, flexWrap: envoltura }]}>
                {colores.map((color, index) => (
                    <View
                        key={index}
                        style={[styles.circulo, { backgroundColor: color }]}
                    >
                        <Text style={styles.textoCirculo}>C{index + 1}</Text>
                    </View>
                ))}
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
    controles: {
        gap: 8,
        marginBottom: 15,
    },
    boton: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
    },
    textoBoton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    escenario: {
        flex: 1,
        backgroundColor: '#cfcbcb',
        padding: 15,
        gap: 8,
        overflow: 'hidden'
    },
    circulo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoCirculo: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textShadowColor: 'black',
        textShadowRadius: 3,
    },
});
