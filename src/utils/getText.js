/* eslint-disable no-unreachable */
export const getText = (singularText, pluralText, numberOfState) => {
  switch (numberOfState) {
    case 0:
      return `${numberOfState} ${singularText}`;
      break;

    case 1:
      return `${numberOfState} ${singularText}`;
      break;
    case 2:
      return `${numberOfState} ${pluralText}`;
      break;

    default:
      return `${numberOfState} ${pluralText}`;
      break;
  }
};
