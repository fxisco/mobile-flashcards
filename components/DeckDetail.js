import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, gray, black } from '../utils/colors';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Deck Detail'
    }
  };
  render() {
    const { deck } = this.props;
    const { questions } = deck;
    const { deckId } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subTitle}>{`Cards: ${questions.length}`}</Text>
        </View>
        <View style={styles.actionsContainer}>
          {questions.length > 0 &&
            <TouchableOpacity
              style={styles.startQuizButton}
              onPress={() => this.props.navigation.navigate('Quiz', { deckId })}
            >
              <Text style={styles.startQuizButtonText}>Start Quiz</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity
            style={styles.addCardButton}
            onPress={() => this.props.navigation.navigate('AddCard', { deckId })}
          >
            <Text style={styles.addCardButtonText}>Add Card</Text>
          </TouchableOpacity>
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
  title: {
    textAlign: 'center',
    fontSize: 30,
    textAlignVertical: 'bottom'
  },
  subTitle: {
    textAlign: 'center',
    color: gray
  },
  actionsContainer: {
    flex: 1
  },
  startQuizButton: {
    backgroundColor: black,
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 30
  },
  startQuizButtonText: {
    color: white,
    textAlign: 'center'
  },
  addCardButton: {
    backgroundColor: white,
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    borderColor: black,
    borderWidth: 2,
  },
  addCardButtonText: {
    color: black,
    textAlign: 'center'
  },
});

function mapStateToProps ({ decks }, props) {
  return {
    deck: decks[props.navigation.state.params.deckId]
  }
}

export default connect(
  mapStateToProps
)(DeckDetail);
