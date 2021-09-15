import React, { useCallback, useState } from 'react';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useQuery } from 'react-query';
import { addPersonToBusiness } from '../../network/api';
import moment from 'moment';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

function PersonAdd({ navigation, route }) {

    const [personName, setPersonName] = useState("")
    const [role, setRole] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [joinDate, setJoinDate] = useState(new Date())
    const [showDateTimePicker, setShowDateTimePicker] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);

    const { businessId } = route.params;

    const { data, status, refetch } = useQuery(['personAdd', {
        businessId: businessId,
        email: email,
        name: personName,
        phone: phone,
        role: role,
        join_date: moment(joinDate).format('YYYY-MM-DD')
    }], () => addPersonToBusiness({
        businessId: businessId,
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
            style={styles.input}
            onChangeText={personName => setPersonName(personName)}
        />
        <TextInput
            label="Role"
            value={role}
            style={styles.input}
            onChangeText={role => setRole(role)}
        />
        <TextInput
            label="Email"
            value={email}
            style={styles.input}
            onChangeText={email => setEmail(email)}
        />
        <TextInput
            label="Phone"
            value={phone}
            style={styles.input}
            onChangeText={phone => setPhone(phone)}
        />
        <TouchableOpacity
            onPress={() => setShowDateTimePicker(true)}
            style={styles.dateInput}
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
        {status === 'error' && (<Snackbar>Something failed</Snackbar>)}
        {status==='success' && navigation.goBack()}
    </>);

}

const styles = StyleSheet.create({
    input: {
        margin: 10,
    },
    dateInput:{
        margin:10,
        backgroundColor: '#CCCCCC',
        alignItems: 'center',
        padding:15
    }
})

export default PersonAdd;
