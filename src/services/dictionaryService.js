import http from "./httpService";
import { apiUrl } from "../config.json";

const dictionaryEndpoint = apiUrl + "dictionaries/";

function dictionaryUrl(id) {
  return `${dictionaryEndpoint}/${id}`;
}

export async function getDictionaries() {
  return http.get(dictionaryEndpoint);
}

export function postDictionary(dictionary) {
  const body = { ...dictionary };
  return http.post(dictionaryEndpoint, body);
}

export async function putDictionary(dictionary) {
  return http.put(dictionaryUrl(dictionary.id), dictionary);
}

export function deleteDictionary(id) {
  return http.delete(dictionaryUrl(id));
}
