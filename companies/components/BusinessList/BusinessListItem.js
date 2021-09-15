import React, {useContext} from 'react';
import { Text, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Divider, List } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'


function BusinessListItem({ item }) {

    
    const navigation = useNavigation();
    return (<>

        <List.Item
            style={styles.itemContainer}
            title={
                item
                    .name
                    .split(' ')
                    .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
                    .join(' ')
            }
            left={
                props => <List.Icon {...props} icon={() => <AntDesign name="areachart" size={30} />
                } />
            }
            onPress={() => navigation.navigate("Business Detail", item)

            }
        />

        <Divider />
    </>);
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        backgroundColor:'#DEDEDE',
        margin: 10,
        borderRadius: 6
    },
    deleteAction: {
        textAlign: 'center',
        backgroundColor: '#CC5555',
        margin: 5,
        padding: 5
    }
})

export default BusinessListItem;