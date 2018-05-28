import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import {
  black,
  green,
  gray,
  red,
  white,
} from '../utils/colors';

import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers';

const Questionnaire = ({ index, questions, onShowAnswer, onAnswerQuestion ,showAnswer }) => {
  const currentQuestion = questions[index];
  const answerTitle = showAnswer ? `Show Question` : 'Show answer';
  const answer = currentQuestion.answer;
  const header = showAnswer ? `${answer}` : currentQuestion.question;

  return (
    <View style={styles.container}>
      <Text>{`${index +  1} / ${questions.length}`}</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.title}>{header}</Text>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={onShowAnswer}
        >
          <Text style={styles.showAnswerText}>{answerTitle}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.answerContainer}>
        <TouchableOpacity
          onPress={onAnswerQuestion.bind(null, true)}
          style={styles.answerButtonTrue}
        >
          <Text style={styles.answerButtonText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.answerButtonFalse}
          onPress={onAnswerQuestion.bind(null, false)}
        >
          <Text style={styles.answerButtonText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Results = ({ correctAnswers, questionsCount, onRetry, onBack }) => {
  const hasGoodPunctuation = correctAnswers >= questionsCount / 2;
  const header = hasGoodPunctuation ? 'Excellent Job!' : 'You can do it better';
  const punctuationStyle = hasGoodPunctuation ? styles.excellentPunctuation : styles.badPunctuation;

  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <Text style={[styles.title, punctuationStyle]}>{header}</Text>
      <Text style={styles.title}>{`${correctAnswers} / ${questionsCount}`}</Text>
      <TouchableOpacity
        style={[styles.answerButtonTrue, { marginTop: 30 }]}
        onPress={onRetry}
      >
        <Text style={styles.answerButtonText}>Retry</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.answerButtonFalse, { marginTop: 30 }]}
        onPress={onBack}
      >
        <Text style={styles.answerButtonText}>Go Back to Deck</Text>
      </TouchableOpacity>
    </View>
  );
};

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz',
      headerLeft: null
    }
  };

  state = {
    showAnswer: false,
    index: 0,
    correctAnswers: 0
  };

  componentWillUpdate = (nextProps, nextState) => {
    const { deck } = this.props;
    const { questions } = deck;

    if (nextState.index === questions.length) {
      clearLocalNotification()
        .then(setLocalNotification);
    }
  };

  handlePunctuation = (isCorrect) => {
    const { correctAnswers, index } = this.state;
    const update = {
      index: index + 1
    };

    if (isCorrect) {
      update['correctAnswers'] = correctAnswers + 1
    }

    this.setState(update);
  };

  handleRetry = () => {
    this.setState({
      showAnswer: false,
      index: 0,
      correctAnswers: 0
    });
  };

  handleOnBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { deck } = this.props;
    const { questions } = deck;
    const { correctAnswers, index, showAnswer } = this.state;
    const showQuestionnaire = index < questions.length;

    return (
      showQuestionnaire ?
      <Questionnaire
        index={index}
        questions={questions}
        onAnswerQuestion={this.handlePunctuation}
        onShowAnswer={() => { this.setState({ showAnswer: !showAnswer }); }}
        showAnswer={showAnswer} /> :
      <Results
        correctAnswers={correctAnswers}
        questionsCount={questions.length}
        onBack={this.handleOnBack}
        onRetry={this.handleRetry}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  showAnswerText: {
    textAlign: 'center',
    color: red
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  answerContainer: {
    flex: 1,
    'justifyContent': 'flex-start',
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
  answerButtonTrue: {
    backgroundColor: green,
    borderWidth: 1,
    marginBottom: 30,
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  answerButtonFalse: {
    backgroundColor: red,
    borderWidth: 1,
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  answerButtonText: {
    color: white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  excellentPunctuation: {
    color: green
  },
  badPunctuation: {
    color: red
  }
});

function mapStateToProps ({ decks }, props) {
  return {
    deck: decks[props.navigation.state.params.deckId]
  }
}

export default connect(mapStateToProps)(Quiz);
