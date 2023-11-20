import { Dimensions, StyleSheet, Switch, Text, View } from 'react-native'
import React,{useState} from 'react'
import Notification from './Notification';
import App from './../../App';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    box_infor:{
        width: screenWidth,
        height: screenHeight*0.07,
        backgroundColor: 'white',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
})

const SettingsNotification = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const [isEnabled3, setIsEnabled3] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
    };
    const toggleSwitch2 = () => {
        setIsEnabled2((previousState) => !previousState);
    };
    const toggleSwitch3 = () => {
        setIsEnabled3((previousState) => !previousState);
    };
    return (
        <View style={styles.container}>
            <View style={{marginTop:80}}>
                <View style={styles.box_infor}>
                    <Text style={{marginLeft:20}}>Push Notifications</Text>
                    <Text style={{marginRight:20}}>Disabled {`>`}</Text>
                </View>
                <View style={{...styles.box_infor,backgroundColor:'#efefef'}}>
                    <Text style={{marginLeft:20, color:'#7D8895'}}>In-App Notification</Text>
                </View>
                <View style={styles.box_infor}>
                    <Text style={{marginLeft:20}}>Unconfirmed records</Text>
                    <Switch
                        style={{marginRight:20}}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={{...styles.box_infor,backgroundColor:'#efefef'}}>
                    <Text style={{marginLeft:20, color:'#7D8895'}}>
                        Turns on in-app notifications to remind you about your unconfirmed records from the past week
                    </Text>
                </View>
                <View style={styles.box_infor}>
                    <Text style={{marginLeft:20}}>Budgets</Text>
                    <Switch
                        style={{marginRight:20}}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled2 ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch2}
                        value={isEnabled2}
                    />
                </View>
                <View style={{...styles.box_infor,backgroundColor:'#efefef'}}>
                    <Text style={{marginLeft:20, color:'#7D8895'}}>
                        Turns on in-app notifications for all your budgets
                    </Text>
                </View>
                <View style={styles.box_infor}>
                    <Text style={{marginLeft:20}}>Planned Payments</Text>
                    <Switch
                        style={{marginRight:20}}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled3 ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch3}
                        value={isEnabled3}
                    />
                </View>
                <View style={{...styles.box_infor,backgroundColor:'#efefef'}}>
                    <Text style={{marginLeft:20, color:'#7D8895'}}>
                        Turns on in-app notifications for all your planned payments
                    </Text>
                </View>
            </View>
        </View>
  )
}

export default SettingsNotification

