import React, { useEffect } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native'
import { useQuery } from 'react-query';
import PersonListItem from '../Person/PersonListItem';
import { getPersonsByBusinessId } from '../../network/api'
import { Divider, List, Provider, Dialog, Paragraph, Portal, Button, FAB } from 'react-native-paper';

function BusinessDetail({ navigation, route }) {
    const { businessId, name } = route.params;
    console.log('business detail: ', route.params)

    const { data, status, refetch} = useQuery(['persons',businessId], ()=>getPersonsByBusinessId(businessId), {enabled:false})

    useEffect(()=>{
        refetch();
    })


    return (<>
        <Text style={styles.personsTitle}>Persons</Text>
        {status === 'loading' && (<Text>Loading...</Text>)}
        {status === 'error' && (<Text>Could not load Persons</Text>)}
        {status === 'success' && (
            data.data.persons.length>0?(<FlatList
                data={data.data.persons}
                renderItem={(item) => <PersonListItem {...item} />}
            />):(<Text>This company does not have Persons</Text>)
        )}
        <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => navigation.navigate('Add Person',{businessId})}
                />
    </>);
}

const styles = StyleSheet.create({
    personsTitle: {
        margin: 10,
        fontSize: 20,
        fontWeight: 'bold'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
})

export default BusinessDetail;