import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { white, gray, black } from '../utils/colors';

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  };

  handleInputTextChange = (text, key) => {
    this.setState({
      [key]: text
    })
  };

  render() {
    const { answer, question } = this.state;
    console.log(answer, question);

    return (
      <View style={styles.container}>
        <View style={styles.questionContainer}>
          <Text style={styles.label}>Question</Text>
          <TextInput
            style={styles.textInput}
            value={question}
            onChangeText={(text) => this.handleInputTextChange(text, 'question')}
          />
          <Text style={styles.label}>Answer</Text>
          <TextInput
            style={styles.textInput}
            value={answer}
            onChangeText={(text) => this.handleInputTextChange(text, 'answer')}
          />
        </View>
        <View style={styles.answerContainer}>
          {question && answer &&
            <TouchableOpacity style={styles.AddCardButton}>
              <Text style={styles.AddCardButtonText}>Add Card</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  answerContainer: {
    flex: 1,
    'justifyContent': 'flex-start',
  },
  label: {
    textAlign: 'center',
    paddingBottom: 10
  },
  textInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 30
  },
  AddCardButton: {
    backgroundColor: black,
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 30
  },
  AddCardButtonText: {
    color: white,
    textAlign: 'center'
  },
});

export default AddCard;
