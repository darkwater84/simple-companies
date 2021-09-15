import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

function getTitle(route) {
    console.log('route: ', route)
    switch (route.name) {
        case 'Business Detail':
            let { name } = route.params;
            return name;
            break;
        default:
            return route.name;

    }

}

function NavigationBar({ navigation, back, route }) {

    return (
        <Appbar.Header>
            {back && <Appbar.BackAction onPress={navigation.goBack} />}
            <Appbar.Content title={getTitle(route)} />
        </Appbar.Header>
    );
}

export default NavigationBar;