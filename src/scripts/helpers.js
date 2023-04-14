export function getRandomItem(list) {
  let randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

export function sortByEpisodeNumber(list) {
  const sortedList = list.sort((a, b) => {
    return a.number - b.number;
  });
  return sortedList;
}

export function sortNumbers(list) {
  const sortedList = list.sort((a, b) => {
    return a - b;
  });
  return sortedList;
}
