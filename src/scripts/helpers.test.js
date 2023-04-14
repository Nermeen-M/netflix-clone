import { getRandomItem, sortByEpisodeNumber, sortNumbers } from "./helpers.js";

describe("getRandomItem", () => {
  test("should return a random item from the list", () => {
    //Arrange
    const list = [1, 2, 3, 4, 5];

    //Act
    const result = getRandomItem(list);

    //Assert
    expect(list).toContain(result);
  });
});

describe("sortByEpisodeNumber", () => {
  test("should sort the list by episode number", () => {
    //Arrange
    const list = [
      { number: 4 },
      { number: 2 },
      { number: 1 },
      { number: 5 },
      { number: 3 },
    ];

    //Act
    const result = sortByEpisodeNumber(list);

    //Assert
    const expected = [
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 4 },
      { number: 5 },
    ];
    expect(result).toEqual(expected);
  });
});

describe("sortNumbers", () => {
  test("should sort the list of numbers in ascending order", () => {
    //Arrange
    const list = [4, 2, 1, 5, 3];

    //Act
    const result = sortNumbers(list);
    const expected = [1, 2, 3, 4, 5];

    //Assert
    expect(result).toEqual(expected);
  });
});
