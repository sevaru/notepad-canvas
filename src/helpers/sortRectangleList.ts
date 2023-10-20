import { Rectangle } from "../models/classRectangle";
export function sortRectangleList(rectangleList: Rectangle[], id: number) {
  // const indexToFind = rectangleList.findIndex((obj) => obj.id === id);
  // if (indexToFind === -1) {
  //   return rectangleList;
  // }
  // const lastIndex = rectangleList.length - 1;
  // const temp = rectangleList[lastIndex];
  // rectangleList[lastIndex] = rectangleList[indexToFind];
  // rectangleList[indexToFind] = temp;
  // return rectangleList;
  // Находим индекс элемента с заданным id
  // const indexToFind = rectangleList.findIndex((obj) => obj.id === id);
  // if (indexToFind === -1 || indexToFind === 0) {
  //   return rectangleList;
  // }
  // const temp = rectangleList[0];
  // rectangleList[0] = rectangleList[indexToFind];
  // rectangleList[indexToFind] = temp;
  // return rectangleList;
  // Находим индекс элемента с заданным id
  const indexToFind = rectangleList.findIndex((obj) => obj.id === id);

  // Если элемент с таким id не найден или уже является первым элементом, ничего не делаем
  if (indexToFind === -1 || indexToFind === 0) {
    return rectangleList;
  }

  // Сохраняем найденный элемент
  const foundElement = rectangleList[indexToFind];

  // Сдвигаем все элементы массива вперед на одну позицию
  for (let i = indexToFind; i > 0; i--) {
    rectangleList[i] = rectangleList[i - 1];
  }

  // Перемещаем последний элемент в начало
  rectangleList[0] = rectangleList[rectangleList.length - 1];

  // Восстанавливаем найденный элемент на своём новом месте
  rectangleList[1] = foundElement;

  return rectangleList;
}
