import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { submitDeck } from '../utils/api';
import { camelize } from '../utils/helpers';
import { orange, white } from '../utils/colors';

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class DeckForm extends Component {
  state = {
    text: ''
  };

  onFormSubmit = () => {
    const id = camelize(this.state.text);
    const newDeck = {
      title: this.state.text,
      questions: []
    };

    this.props.dispatch(addDeck(id, newDeck));

    this.setState({
      text: ''
    });

    submitDeck(id, newDeck);

    this.props.navigation.navigate('Home');
  };

  render() {
    const { decks }  = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => this.setState({text})}
            value={this.state.text} style={styles.textInput}
          />
        </View>
        <View style={styles.buttonContainer}>
          {this.state.text.length > 0 && <SubmitBtn onPress={this.onFormSubmit} />}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: orange,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: orange,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  textInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5
  }
});

export default connect()(DeckForm);
