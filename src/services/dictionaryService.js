import http from "./httpService";
import { apiUrl } from "../config.json";

const dictionaryEndpoint = apiUrl + "dictionaries/";

export async function getDictionaries() {
  return http.get(dictionaryEndpoint);
}
