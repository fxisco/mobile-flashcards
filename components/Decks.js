import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { black, white, gray } from '../utils/colors';
import { connect } from 'react-redux';

class Decks extends Component {
  render() {
    const { decks }  = this.props;

    return (
      <ScrollView style={{ flex: 1, backgroundColor: white }}>
        <View>
          {Object.keys(decks).map((deckId) => {
            const deck = this.props.decks[deckId];

            return (
              <TouchableOpacity key={deckId} style={styles.deck} onPress={() => this.props.navigation.navigate(
                'DeckDetail',
                { deckId, title: deck.title }
              )}>
                  <Text style={styles.deckTitle}>{deck.title}</Text>
                  <Text style={styles.deckDescription}>Cards: {deck.questions.length}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  deck: {
    borderColor: black,
    flex: 1,
    padding: 10,
    borderWidth: 0.5
  },
  deckTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  deckDescription: {
    textAlign: 'center',
    color: gray
  }
});

function mapStateToProps ({ decks }) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(Decks);
