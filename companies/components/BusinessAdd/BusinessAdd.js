import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { createBusiness } from '../../network/api';
import { useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/core';

function BusinessAdd() {

    const [businessName, setBusinessName] = useState("")
    const navigation = useNavigation()

    const { data, status, refetch } = useQuery(['bussinesAdd', businessName], () => createBusiness(businessName), { enabled: false })

    const create = useCallback(() => {
        refetch();
    })

    return (<>
        <TextInput
            label="Business Name"
            value={businessName}
            onChangeText={businessName => setBusinessName(businessName)}
        />

        <Button onPress={() => create()}>Create Business</Button>
        {status==='success'&& navigation.goBack() }
    </>);
}

export default BusinessAdd;