import { AsyncStorage } from 'react-native';

export const APP_STORAGE_KEY = 'FlashCards:decks';

export function fetchDecksResults () {
  return AsyncStorage.getItem(APP_STORAGE_KEY)
    .then((data) => {
      return JSON.parse(data)
    });
}

export function submitDeck (key, deck) {
  return AsyncStorage.mergeItem(APP_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function reset () {
  return AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify({}));
}

export function submitCard (deckId, card) {
  return AsyncStorage.getItem(APP_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);

      AsyncStorage.setItem(APP_STORAGE_KEY, JSON.stringify({
        ...data,
        [deckId]: {
          ...data[deckId],
          questions: [
            ...data[deckId].questions,
            card
          ]
        }
      }));
    })
}
