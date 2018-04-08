import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { white } from '../utils/colors';

class Decks extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Holaaa</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  }
});

export default Decks;
