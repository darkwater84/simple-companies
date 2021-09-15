import React from 'react';
import { Text, Animated, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Divider, List, Provider, Dialog, Paragraph, Portal } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'
import BusinessContext from '../../context/BusinessContext';
import useBusiness from '../../hooks/useBusiness';

function BusinessListItemSwipe({ item }) {

    const business = useBusiness();

    console.log('Business: ', business)

    return (<>

        <View style={styles.fullContainer}>
        <List.Item
            style={styles.itemContainer}

            right={
                props => <List.Icon {...props} icon={() => <AntDesign name="delete" size={30} onPress={() => {
                    console.log('Item: ', item)
                    business.setBusinessData({ deleteDialog: { businessId: item.businessId } })
                    business.setVisible(true)
                }} />
                } />
            }
            onPress={() => console.log('Delete')

            }
        />
        </View>
    </>);
}

const styles = StyleSheet.create({
    itemContainer: {
        width: 250,
        padding:5,
        backgroundColor: '#FF0000',
        margin: 10,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius: 6
    },
    fullContainer:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderRadius:6
    },
    deleteAction: {
        textAlign: 'center',
        margin: 5,
        padding: 5
    }
})

export default BusinessListItemSwipe;