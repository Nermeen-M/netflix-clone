export function getRandomItem(list) {
  let randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}
