import React from 'react'
import {StyleSheet, Dimensions, Text, View} from 'react-native'

const ItemLibro = (props) => (
    <View style={styles.cardView}>
        <Text style ={{textTransform: 'uppercase', fontWeight:'bold'}}>
            {props.id_sucursal}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    cardView: {
        backgroundColor: 'white',
        borderRadius:20,
        marginVertical:5,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
});

export default ItemLibro;