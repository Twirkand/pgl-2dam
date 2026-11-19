import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TipoJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type TipoAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch';

const VALORES_JUSTIFY: TipoJustify[] = [
    'flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'
];

export default function PrincipalScreen() {
    const [textoInput, setTextoInput] = useState('center');
    const [justify, setJustify] = useState<TipoJustify>('center');
    const [align, setAlign] = useState<TipoAlign>('center');

    const CambioTexto = (texto: string) => {
        setTextoInput(texto);
        const limpio = texto.trim().toLowerCase() as TipoJustify;
        if (VALORES_JUSTIFY.includes(limpio)) {
            setJustify(limpio);
        }
    };

    return (
        <SafeAreaView style={styles.contenedorPrincipal}>
            <Text style={styles.titulo}>Alineación e Imágenes</Text>

            <View style={styles.filaEstado}>
                <Text style={styles.etiqueta}>Justify: {justify}</Text>
                <Text style={styles.etiqueta}>Align: {align}</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Center, flex-start....."
                value={textoInput}
                onChangeText={CambioTexto}
                autoCapitalize="none"
            />


            <View style={styles.controles}>
                {(['flex-start', 'center', 'flex-end'] as TipoAlign[]).map((opcion) => (
                    <TouchableOpacity
                        key={opcion}
                        style={[styles.boton, align === opcion && styles.botonActivo]}
                        onPress={() => setAlign(opcion)}
                    >
                        <Text style={styles.textoBoton}>{opcion}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={[styles.escenario, { justifyContent: justify, alignItems: align }]}>
                <Image
                    source={require('../../imagenes/dani.webp')}
                    style={styles.imagen}
                />

                <Image
                    source={{ uri: 'https://www.suenosmusicales.es/wp-content/uploads/2019/10/Pepe-Viyuela-artista-book-512x512.jpg' }}
                    style={styles.imagen}
                />

                <Image
                    source={{ uri: 'https://www.guiadecadiz.com/sites/default/files/2023/AGENDA/flamenco/cigala.jpg' }}
                    style={styles.imagen}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contenedorPrincipal: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#a39f9f',
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'yellow',
        textAlign: 'center',
        marginVertical: 10,
    },
    filaEstado: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 10,
    },
    etiqueta: {
        backgroundColor: '#dc1010',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 13,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        overflow: 'hidden',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        marginBottom: 10,
        fontSize: 15,
    },
    controles: {
        gap: 8,
        marginBottom: 15,
    },
    boton: {
        width: '100%',
        backgroundColor: '#e483ff',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
    },
    botonActivo: {
        backgroundColor: '#e61492',
    },
    textoBoton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    escenario: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'nowrap',
        backgroundColor: '#cfcbcb',
        padding: 15,
        borderWidth: 2,
        borderColor: 'black',
        gap: 10
    },
    imagen: {
        width: 85,
        height: 85,
        borderRadius: 10,
    },
});
