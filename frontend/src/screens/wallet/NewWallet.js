import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import celebrate from "../../../assets/images/celebrate_icon.png";
import PrimaryButton from "../../components/PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { createWallet } from "../../redux/actions/walletAction";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  button: {
    marginTop: 30,
  },
  text: {
    fontSize: 24,
    color: "#559BE6",
    textAlign: "center",
    marginBottom: 20,
  },
  box_input: {
    width: screenWidth * 0.8,
    height: 60,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
});

const NewWallet = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Ensure state.auth is present in store
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  console.log(user._id);

  const handleCreateWallet = () => {
    if (!name || !balance) {
      Alert.alert("Validation Error", "Please enter both name and balance");
      return;
    }

    dispatch(createWallet(user._id, name, parseFloat(balance), "private")) // 'default' is the wallet type, can be changed if needed
      .then(() => {
        navigation.navigate("MyWallet");
      })
      .catch((error) => {
        Alert.alert("Error", "Failed to create wallet. Please try again.");
        console.error(error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ alignItems: "center" }}>
          <Image style={styles.image} source={celebrate} />
        </View>
        <Text style={styles.text}>Create your financial wallet</Text>
        <View style={styles.box_input}>
          <Image
            style={{ width: 24, height: 24 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2506/2506858.png",
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.box_input}>
          <Image
            style={{ width: 24, height: 24 }}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2474/2474450.png",
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Balance"
            value={balance}
            onChangeText={setBalance}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.button}>
          <PrimaryButton title="Create" onPress={handleCreateWallet} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewWallet;
