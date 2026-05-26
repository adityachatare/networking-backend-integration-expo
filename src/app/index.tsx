import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const IndexScreen = () => {
  useEffect(() => {
    async function pingBackend() {
      const res = await fetch("http://192.168.1.43:8081/api/v1/hello");
      const data = await res.json();
      console.log(data);
    }
  }, []);

  return (
    <View>
      <Text>IndexScreen</Text>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({});
