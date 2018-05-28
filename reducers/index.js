import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from '../actions';

const initialState = {
  decks: {
  //   React: {
  //     title: 'React',
  //     questions: [
  //       {
  //         question: 'What is React?',
  //         answer: 'A library for managing user interfaces'
  //       },
  //       {
  //         question: 'Where do you make Ajax requests in React?',
  //         answer: 'The componentDidMount lifecycle event'
  //       }
  //     ]
  //   },
  //   JavaScript: {
  //     title: 'JavaScript',
  //     questions: [
  //       {
  //         question: 'What is a closure?',
  //         answer: 'The combination of a function and the lexical environment within which that function was declared.'
  //       }
  //     ]
  //   }
  },
};

function cards (state = initialState, action) {
  switch (action.type) {
    case ADD_DECK: {
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.id]: {
            ...action.deck
          }
        }
      }
    }
    case RECEIVE_DECKS: {
      return {
        ...state,
        decks: {
          ...action.decks
        }
      }
    }
    case ADD_CARD:  {
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deckId]: {
            ...state.decks[action.deckId],
            questions: [
              ...state.decks[action.deckId].questions,
              action.card
            ]
          }
        }
      }
    }
    default :
      return state
  }
}

export default cards
