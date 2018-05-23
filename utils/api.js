import { AsyncStorage } from 'react-native';

export const APP_STORAGE_KEY = 'FlashCards:decks';

export function fetchDecksResults () {
  return AsyncStorage.getItem(APP_STORAGE_KEY)
    .then((data) => JSON.parse(data));
}

export function submitDeck (key, deck) {
  return AsyncStorage.mergeItem(APP_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}
