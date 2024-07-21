import { View, Text, Switch, SafeAreaView, StyleSheet, StatusBar, TouchableWithoutFeedback , TouchableOpacity, FlatList, Dimensions, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-element-dropdown';
import { Check } from 'react-native-feather';



import Colors from '../../components/Colors';
import data from './categories.json';
import { getCategory } from '../../redux/actions/transactionAction';  
import randomHexColorCode from '../../utils/colorCode';
  
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
  
const categories = data.categories;




  const Item = ({ icon, label, subCategories, navigation, isSelected, allCategories }) => {

    const [toggle, setToggle] = useState(false);
    const [selected, setSelected] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
      setSelected(allCategories);
    }, [allCategories])
    const onChangeCategory = (category) => {
      dispatch(getCategory(category));
      navigation.goBack();
    }

    const selectedCategoriesHandler = () => {
      navigation.goBack();

    }
    return (
      <View>
      <TouchableOpacity style={styles.item} onPress={() => setToggle(!toggle)}>
      <View style={[styles.icon, isSelected && { marginLeft: 20 }]}>
        <Icon name={icon} size={28} color={randomHexColorCode() }/>
      </View>
      <Text style={styles.title}>{label}</Text>
      <View style={[styles.itemOption, isSelected && { left: 8 }]} >
        <Icon name={toggle ? `chevron-up` : `chevron-down`} size={24} color={Colors.text.body }/>
      </View>
      { isSelected && 
      <TouchableOpacity  style={styles.selection} onPress={() => setSelected(!selected)} activeOpacity={1}>
        <Icon name={selected ? `checkbox-marked` : `checkbox-blank-outline`} size={24} color={selected ? `#a3ffbd` : `#ccc`} />
      </TouchableOpacity>
     }
    </TouchableOpacity>
     {toggle && (
      <SafeAreaView style={styles.subContainer}> 
        {
          subCategories.map((item, index) => (
            <TouchableOpacity style={[styles.item, styles.subItem]} key={item.value} disabled={isSelected} onPress={() => onChangeCategory(item)}>
              <View style={styles.icon}>
                <Icon name={item.icon} size={28} color={randomHexColorCode() }/>
              </View>
              <Text style={styles.title}>{item.label}</Text>
              { isSelected && 

              <TouchableOpacity  style={styles.selection} onPress={() => setSelected(!selected)} activeOpacity={1}>
                <Icon name={selected ? `checkbox-marked` : `checkbox-blank-outline`} size={24} color={selected ? `#a3ffbd` : `#ccc`} />
              </TouchableOpacity>
              }
            </TouchableOpacity>
          ))
        }
      </SafeAreaView>
    )}
      </View>
  );
}

  
  const Categories = ({navigation, route}) => {
    const { edit } = route.params;
    const [isEnabled, setIsEnabled] = useState(false);

    const submitCategoriesHandler = () => {
      console.log('done!!')
    }

    React.useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Pressable onPress={submitCategoriesHandler }>
            <Check width={24} height={24} stroke={Colors.text.title}/>
          </Pressable>
        ),
      });
    }, [navigation]);


    const toggleSwitch = () => {
      setIsEnabled(previousState => !previousState)
    };


    const renderItem = ({ item }) => <Item  key={item.label} icon={item.icon} label={item.label} subCategories={item.sub} navigation={navigation} isSelected={edit} allCategories={isEnabled}/>;

    return (
    <SafeAreaView style={styles.container}>
      {
        edit && 
      <View style={styles.allCategoriesOption}>
        <Text style={styles.text}>All Categories</Text>
        <View style={styles.switchButton}>

          <Switch
          trackColor={{false: '#6f7072', true: '#4aff74'}}
          thumbColor={isEnabled ? 'white' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        </View>
      </View>
      }

      <FlatList
        data={categories}
        keyExtractor={(item, index) => index}
        renderItem={renderItem}></FlatList>
    </SafeAreaView>
    )
  }
  
  export default Categories;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // paddingTop: StatusBar.currentHeight,
      marginHorizontal: 0,
    },
    allCategoriesOption: {
      backgroundColor: 'white',
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      // justifyContent: 'space-between',
      position: 'relative',
      alignItems: 'center'
    },
    text: {
      fontSize: 18,
    },
    switchButton: {
      position: 'absolute',
      right: 4,
    },
    item: {
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginTop: 1,
      flexDirection: 'row',
      alignItem: 'center',
    },
    subItem: {
      paddingLeft: 40,
      paddingVertical: 8,
    },
    itemOption: {
      alignSelf: 'center',
      position: 'absolute',
      right: 12,
      top: 20
    },
    selection: {
      alignSelf: 'center',
      position: 'absolute',
      right: 12,
      top: 20
    },
    subContainer: {
      alignItem: 'center',
    }
    ,
    title: {
      fontSize: 18,
      lineHeight: 36,
      marginLeft: 16,
    },
  
    icon: {
      width: 40,
      height: 40,
      // backgroundColor: Colors.icon.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6
      // backgroundColor: 'red'
    },
    dropdownIcon: {
        width: 20,
        height: 20,
    },
    dropdown: {
      width: '100%',
      height: 50,
      // borderColor: 'gray',
      // borderWidth: 0.5,
      // borderRadius: 8,
      paddingHorizontal: 8,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });