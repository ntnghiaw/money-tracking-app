import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import TransactionForm from "../../components/TransactionForm";
import Toolbar from "../../components/Toolbar";
import { useRoute } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Records = ({ navigation }) => {
  const route = useRoute();
  const [category, setCategory] = useState({
    description: "",
    icon: "progress-question",
    label: "Select your category",
    value: "",
  });

  useEffect(() => {
    if (route.params) {
      setCategory(route.params.category);
    }
  }, [route.params]);

  const onCreateHandler = (data) => {
    setData(data);
  };
  console.log(category);
  return (
    <View style={styles.container}>
      <View>
        <TransactionForm
          navigation={navigation}
          cateGory={category}
          route={route}
          onCreate={onCreateHandler}
          type="expense"
        />
      </View>
      <Toolbar navigation={navigation} />
    </View>
  );
};

export default Records;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: screenHeight * 0.05,
    backgroundColor: "white",
    height: screenHeight * 0.9,
    borderRadius: 30,
    paddingHorizontal: screenWidth * 0.04,
  },
});
