import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Switch } from 'react-native';
import more_vertical from '../../../assets/images/icons/more_vertical.png';
import Panh from '../../../assets/images/avatars/Panh.jpg'
import BachKhoa from '../../../assets/images/avatars/BachKhoa.jpg'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text_container: {
        width: screenWidth * 0.9,
        height: screenHeight * 0.1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    group_member_text: {
        display: 'flex',
        width: screenWidth * 0.9,
        height: screenHeight * 0.05,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20 
    },
    user_infor_container: {
        width: screenWidth * 0.9,
        height: screenHeight * 0.1,
        backgroundColor: 'white',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    user_avatar_container: {
        width: screenWidth * 0.2,
        height: screenHeight * 0.1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    user_avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'blue',
    },
    user_text: {
        width: screenWidth * 0.4,
        height: screenHeight * 0.1,
        display: 'flex',
        justifyContent: 'center',
    },
    user_role_container: {
        width: screenWidth * 0.3,
        height: screenHeight * 0.1,
        display: 'flex',
        justifyContent: 'center',
    },
    pagination:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    currentPage_container:{
        width: 30,
        height: 30,
        backgroundColor: '#4993e4',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 15,
    },
    pageNumber_container:{
        width: 30,
        height: 30,
        // backgroundColor: 'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 15,
    },
    currentPage: {
        color: 'white',
    },
    pageNumber: {
        // Add any styling for the page number here
    },
    transaction_setting:{
        width: screenWidth * 0.9, 
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
    },
    transaction_text:{
        fontSize: 20,
    },
    transaction_toggle:{

    }
});

const FamilyGroup = ({ navigation }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };
    const membersPerPage = 4;
    const members = [
        {   
            name: 'Alex1', 
            email: 'alex@gmail.com',
            avatar: Panh 
        },
        { 
            name: 'Alex2', 
            email: 'alex@gmail.com',
            avatar: BachKhoa 
        },
        { 
            name: 'Alex3', 
            email: 'alex@gmail.com',
            avatar: BachKhoa 
        },
        { 
            name: 'Alex4', 
            email: 'alex@gmail.com',
            avatar: BachKhoa 
        },
        { 
            name: 'Alex5', 
            email: 'alex@gmail.com',
            avatar: Panh 
        },
        { 
            name: 'Alex6', 
            email: 'alex@gmail.com',
            avatar: Panh
        },
        { 
            name: 'Alex7', 
            email: 'alex@gmail.com',
            avatar: Panh
        },
        { 
            name: 'Alex8', 
            email: 'alex@gmail.com',
            avatar: Panh
        },
        { 
            name: 'Alex9', 
            email: 'alex@gmail.com',
            avatar: Panh
        },
        { 
            name: 'Alex10', 
            email: 'alex@gmail.com',
            avatar: Panh
        },
        { 
            name: 'Alex11', 
            email: 'alex@gmail.com',
            avatar: Panh
        },
        { 
            name: 'Alex12', 
            email: 'alex@gmail.com',
            avatar: Panh
        },
        { 
            name: 'Alex13', 
            email: 'alex@gmail.com',
            avatar: Panh
        },
        { 
            name: 'Alex14', 
            email: 'alex@gmail.com',
            avatar: Panh
        },
        { 
            name: 'Alex15', 
            email: 'alex@gmail.com',
            avatar: Panh
        },
        { 
            name: 'Alex16', 
            email: 'alex@gmail.com',
            avatar: Panh
        },
        { 
            name: 'Alex17', 
            email: 'alex@gmail.com',
            avatar: Panh
        },
    ];

    const totalMembers = members.length;
    const totalPages = Math.ceil(totalMembers / membersPerPage);

    const handleNextPage = () => {
        setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
    };

    const generatePageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    const startIndex = (currentPage - 1) * membersPerPage;
    const endIndex = startIndex + membersPerPage;
    const displayedMembers = members.slice(startIndex, endIndex);

    return (
        <View style={styles.container}>
            <View style={styles.text_container}>
                <Text style={{ fontSize: 36, fontWeight: 'bold' }}>Family Group</Text>
            </View>
            <View style={styles.group_member_text}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Group members ({totalMembers}/{20})</Text>
                <TouchableOpacity>
                    <Image source={more_vertical} style={{ width: 20, height: 30 }} />
                </TouchableOpacity>
            </View>
            <View style={{width:screenWidth*0.9,height:screenHeight*0.46}}>
                {displayedMembers.map((item, index) => (
                    <TouchableOpacity style={styles.user_infor_container} key={index}>
                        <View style={styles.user_avatar_container}>
                            <Image style={styles.user_avatar} source={item.avatar} />
                        </View>
                        <View style={styles.user_text}>
                            <Text>{item.name}</Text>
                            <Text>{item.email}</Text>
                        </View>
                        <View style={styles.user_role_container}>
                            <Text>Group creator</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.pagination}>
                <TouchableOpacity onPress={handlePrevPage} style={{marginRight:10}}>
                    <Text>{`<`} Previous</Text>
                </TouchableOpacity>
                {generatePageNumbers().map((page) => (
                    <TouchableOpacity 
                        key={page} 
                        onPress={() => setCurrentPage(page)}
                        style={currentPage === page ? styles.currentPage_container : styles.pageNumber_container}
                    >
                        <Text style={currentPage === page ? styles.currentPage : styles.pageNumber}>{page}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={handleNextPage} style={{marginLeft:10}}>
                    <Text>Next {`>`}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.transaction_setting}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Transactions       
                </Text>
                <View style={{
                            display:'flex', 
                            flexDirection:'row', 
                            justifyContent:'space-between', 
                            alignItems:'center',
                            width: screenWidth * 0.9,
                            
                        }}>
                    <Text style={{fontSize:13, color:'#7D8895'}}>
                        Request for approval when adding a new transaction.
                    </Text>
                    <Switch 
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                    {/* <Text>{isEnabled ? 'Enabled' : 'Disabled'}</Text> */}

                </View>
            </View>
        </View>
    );
};

export default FamilyGroup;
