import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useQuery } from 'react-query';
import BusinessListItem from './BusinessListItem';
import BusinessListItemSwipe from './BusinessListItemSwipe';
import { deleteBusinessById, getBusinessList } from '../../network/api'
import { SwipeListView } from 'react-native-swipe-list-view';
import useBusiness from '../../hooks/useBusiness';
import { Divider, List, Provider, Dialog, Paragraph, Portal, Button, FAB } from 'react-native-paper';
import BusinessContext from '../../context/BusinessContext';




function BusinessList({ navigation }) {
    const { data, status, refetch } = useQuery('business', getBusinessList, { enabled: false })

    useEffect(() => {
        refetch();
    })


    const [visible, setVisible] = React.useState(false);
    const [businessData, setBusinessData] = useState({
        deleteDialog: {
            visible: false,
            businessId: null,
        }
    })

    const { data: deleteData, status: deleteStatus, refetch: deleteRefetch } = useQuery(['businessDelete', businessData.deleteDialog.businessId], () => deleteBusinessById(businessData.deleteDialog.businessId), { enabled: false })
    const hideDialog = () => setVisible(false);

    const containerStyle = { backgroundColor: 'white', padding: 20, zIndex: 20, elevation: 20 };

    const deleteBusiness = useCallback(async () => {
        console.log('Deleting');
        console.log('Business data: ', businessData)
        const businessId = businessData.deleteDialog.businessId;
        deleteRefetch();
        refetch();
        hideDialog();

    }
    )



    return (
        <>
            <BusinessContext.Provider value={{
                deleteDialog: {
                    visible: false,
                    businessId: null,
                }, setVisible, setBusinessData
            }}>
                {status === 'loading' && (<Text>Loading...</Text>)}
                {status === 'error' && (<Text>Could not load Companies</Text>)}
                {status === 'success' && (

                    <>
                        {data.data.businesses.length > 0 ? null : <Text>There are no Businesses</Text>}
                        <SwipeListView
                            useFlatList={true}
                            data={data.data.businesses}
                            renderItem={(rowData, rowMap) => <BusinessListItem {...rowData} />}
                            renderHiddenItem={(rowData, rowMap) => <BusinessListItemSwipe {...rowData} />}
                            leftOpenValue={0}
                            rightOpenValue={-150}
                            keyExtractor={item => item.businessId}
                            onRefresh={() => refetch()}
                            refreshing={false}
                            disableRightSwipe={true}
                            friction={20}
                            rightOpenValue={-50}
                            stopRightSwipe={-100}
                        />

                    </>
                )}

                <Provider>
                    <Portal>
                        <Dialog visible={visible} contentContainerStyle={containerStyle}>
                            <Dialog.Title>Delete Business</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>Are you sure to want to delete the Business?</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={hideDialog}>No</Button>
                                <Button onPress={deleteBusiness}>Yes</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </Provider>
                <FAB
                    style={styles.fab}
                    small
                    icon="plus"
                    onPress={() => navigation.navigate('Add Business')}
                />
            </BusinessContext.Provider>
        </>
    );
}

const styles = StyleSheet.create({
    rowBack: {
        flex: 1,
        backgroundColor: '#FF0000',
        color: '#000000',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    touchable: {
        flex: 1
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default BusinessList;