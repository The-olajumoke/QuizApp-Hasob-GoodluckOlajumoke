export default function spreadTime(seconds){
  return new Date(seconds * 1000).toISOString().substr(11, 8);
}
