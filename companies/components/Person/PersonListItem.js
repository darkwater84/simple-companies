import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Paragraph, Card, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'

function PersonListItem({ item }) {
    console.log('Person item:', item)
    return (<Card style={styles.card}>
        <Card.Title title={item.name} subtitle={item.role} />
        <Card.Content>
            <Paragraph>{item.email}</Paragraph>
            <Paragraph>{item.phone}</Paragraph>
        </Card.Content>
        <Card.Actions>
            <Button>Delete</Button>
            <Button>Edit</Button>
        </Card.Actions>
    </Card>
    );
}


const styles = StyleSheet.create({
    card: {
        margin: 10
    }
})

export default PersonListItem;