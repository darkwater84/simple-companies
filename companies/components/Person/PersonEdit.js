import React, { useCallback, useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useQuery } from 'react-query';
import { addPersonToBusiness, editPersonById } from '../../network/api';
import moment from 'moment';
import { Text, TouchableOpacity } from 'react-native';

function PersonEdit({ navigation, route }) {

    const [personName, setPersonName] = useState("")
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [joinDate, setJoinDate] = useState(new Date())
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const { businessId, personId } = route.params;

    console.log('using business id: '.businessId)

    const { data, status, refetch } = useQuery(['personAdd', {
        businessId: businessId,
        personId: personId,
        email: email,
        name: personName,
        phone: phone,
        role: role,
        join_date: moment(joinDate).format('YYYY-MM-DD')
    }], () => editPersonById({
        businessId: businessId,
        personId: personId,
        email: email,
        name: personName,
        phone: phone,
        role: role,
        join_date: moment(joinDate).format('YYYY-MM-DD')
    }), { enabled: false })

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || new Date();
        setShowDateTimePicker(false);
        setJoinDate(currentDate);
    };

    const submitPerson = useCallback(() => {
        refetch();

    })

    return (<>
        <TextInput
            label="Person Name"
            value={personName}
            onChangeText={personName => setPersonName(personName)}
        />
        <TextInput
            label="Role"
            value={role}
            onChangeText={role => setRole(role)}
        />
        <TextInput
            label="Email"
            value={email}
            onChangeText={email => setEmail(email)}
        />
        <TextInput
            label="Phone"
            value={phone}
            onChangeText={phone => setPhone(phone)}
        />
        <TouchableOpacity
            onPress={() => setShowDateTimePicker(true)}
        >
            <Text>{joinDate.toDateString()} </Text>

        </TouchableOpacity>
        {showDateTimePicker && (
            <DateTimePicker
                testID="dateTimePicker"
                value={joinDate}
                is24Hour={true}
                display="default"
                onChange={onChange}
            />
        )}

        <Button onPress={() => submitPerson()}>Submit</Button>
        {status === 'success' && <Text>Data sent</Text>}
        {status === 'error' && <Text>Something failed</Text>, console.log('error', data)}
    </>);

}

export default PersonEdit;
