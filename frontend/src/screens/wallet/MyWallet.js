import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ScrollViewComponent,
  StatusBar,
  SafeAreaView,
} from "react-native";
import BottomBar from "../../components/BottomBar";
import * as Icon from "react-native-feather";
import Toolbar from "../../components/Toolbar";
import Colors from "../../components/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getAllWallets } from "../../redux/actions/walletAction";
import moment from "moment"; // Import moment

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    overflow: "scroll",
    paddingTop: StatusBar.currentHeight,
  },
  balance_form: {
    width: screenWidth * 0.95,
    height: screenHeight * 0.1,
    marginTop: -5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  individual_form: {
    width: screenWidth * 0.95,
    // height: screenHeight * 0.3,
    display: "flex",
    flexDirection: "column",
  },
  group_form: {
    width: screenWidth * 0.95,
    // height: screenHeight * 0.3,
    display: "flex",
    flexDirection: "column",
    paddingBottom: 60,
  },
  item: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 7,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: Colors.icon?.backgroundColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    // backgroundColor: 'red'
  },
  details: {
    width: "82%",
    marginLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  description: {
    width: "60%",
    justifyContent: "center",
    paddingBottom: 4,
  },
  title: {
    lineHeight: 30,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text?.title,
  },
  balance: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.text?.body,
  },
  createAt: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.text?.body,
    marginVertical: 2,
  },

  amount: {
    width: "auto",
    fontWeight: "400",
    fontSize: 18,
    color: Colors.text?.danger,
  },
});

const MyWallet = ({ navigation }) => {
  const wallets = useSelector((state) => state.wallet.wallets) || [];
  const user = useSelector((state) => state.auth.user);
  const [balance, setBalance] = useState(0);
  const dispatch = useDispatch();
  // Chuyển đổi thời gian từ UTC sang giờ Việt Nam
  const formatDate = (dateString) => {
    return moment(dateString).utcOffset("+07:00").format("DD/MM/YYYY");
  };
  const handlePress = (walletId) => {
    navigation.navigate("Home", { walletId });
  };
  const formatBalance = (amount) => {
    return amount.toLocaleString("vi-VN");
  };
  useEffect(() => {
    dispatch(getAllWallets(user._id));
  }, [dispatch]);

  useEffect(() => {
    const totalBalance = wallets.reduce(
      (total, wallet) => total + parseFloat(wallet.balance),
      0
    );
    setBalance(totalBalance);
  }, [wallets]);
  console.log(wallets);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.balance_form}>
          <Text style={{ fontSize: 30, marginTop: 5 }}>
            Tổng số dư:{" "}
            <Text style={{ color: "#50C474", fontSize: 30 }}>
              {formatBalance(balance)} ₫
            </Text>
          </Text>
        </View>
        <View style={styles.individual_form}>
          <Text style={{ fontSize: 20, color: "#7D8895" }}>INDIVIDUAL</Text>
          {wallets.map((wallet) => (
            <TouchableOpacity
              key={wallet._id}
              style={styles.item}
              onPress={() => handlePress(wallet._id)}
            >
              <View style={styles.icon}>
                <Icon.DollarSign
                  width={24}
                  height={24}
                  stroke={Colors.icon.default}
                />
              </View>
              <View style={styles.details}>
                <View style={styles.description}>
                  <Text style={styles.title}>{wallet.name}</Text>
                  <Text style={styles.balance}>
                    Balance: {wallet.balance} đ
                  </Text>
                  <Text style={styles.createAt}>
                    CreatedAt: {formatDate(wallet.createAt)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.icon, { backgroundColor: "white" }]}
                >
                  <Icon.Edit
                    width={24}
                    height={24}
                    stroke={Colors.icon.default}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.group_form}>
          <Text style={{ fontSize: 20, color: "#7D8895" }}>GROUPS</Text>
          <View style={styles.item}>
            <View style={styles.icon}>
              <Icon.Home width={24} height={24} stroke={Colors.icon.default} />
            </View>
            <View style={styles.details}>
              <View style={styles.description}>
                <Text style={styles.title}>Family </Text>
                <Text style={styles.balance}>Balance: 100.000 đ</Text>

                <Text style={styles.createAt}>CreatedAt: 21/02/2023</Text>
              </View>

              <TouchableOpacity
                style={[styles.icon, { backgroundColor: "white" }]}
              >
                <Icon.Edit
                  width={24}
                  height={24}
                  stroke={Colors.icon.default}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.icon}>
              <Icon.Github
                width={24}
                height={24}
                stroke={Colors.icon.default}
              />
            </View>
            <View style={styles.details}>
              <View style={styles.description}>
                <Text style={styles.title}>KH01 </Text>
                <Text style={styles.balance}>Balance: 100.000 đ</Text>

                <Text style={styles.createAt}>CreatedAt: 21/02/2023</Text>
              </View>

              <TouchableOpacity
                style={[styles.icon, { backgroundColor: "white" }]}
              >
                <Icon.Edit
                  width={24}
                  height={24}
                  stroke={Colors.icon.default}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <Toolbar navigation={navigation} />
    </SafeAreaView>
  );
};

export default MyWallet;
