import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import DefaultText from "./DefaultText";

const ProductItem = (props) => {
  return (
    <View style={{ ...styles.productItem, ...props.style }}>
      <TouchableOpacity onPress={props.onSelectProduct}>
        <View>
          <View style={{ ...styles.productRow, ...styles.productHeader }}>
            <ImageBackground
              source={{ uri: props.image }}
              style={styles.backgroundImage}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...styles.productRow, ...styles.productDetail }}>
            <DefaultText style={styles.price}>
              {props.price.toFixed(2)}€
            </DefaultText>
            <DefaultText style={styles.description} numberOfLines={1}>
              {props.description}
            </DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  price: {
    marginRight: 10,
    fontFamily: "open-sans-bold",
  },
  description: {
    marginRight: 40,
  },
  productItem: {
    flex: 1,
    height: 200,
    // width: "100%",
    backgroundColor: "#ccc",
    borderRadius: 15,
    overflow: "hidden",
    margin: 10,
  },
  productRow: {
    flexDirection: "row",
  },
  productHeader: {
    height: "85%",
  },
  productDetail: {
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
  },
  titleContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default ProductItem;
