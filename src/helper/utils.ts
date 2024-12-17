export const capitalizeFirstWord = (sentence: string) => {
  const [firstWord, ...restOfWords] = sentence.toLowerCase().split(" ");

  return [
    `${firstWord[0].toUpperCase()}${firstWord.slice(1)}`,
    ...restOfWords,
  ].join(" ");
};
