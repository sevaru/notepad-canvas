import { Rectangle } from "../models/classRectangle";
export function sortRectangleList(rectangleList: Rectangle[], id: number) {
  // Находим индекс элемента с заданным id
  const indexToFind = rectangleList.findIndex((obj) => obj.id === id);

  // Если элемент с таким id не найден, ничего не делаем
  if (indexToFind === -1) {
    return rectangleList;
  }

  // Сохраняем найденный элемент
  const foundElement = rectangleList[indexToFind];

  // Сдвигаем все элементы массива вперед на одну позицию
  for (let i = indexToFind; i < rectangleList.length - 1; i++) {
    rectangleList[i] = rectangleList[i + 1];
  }

  // Помещаем найденный элемент на последнее место
  rectangleList[rectangleList.length - 1] = foundElement;

  return rectangleList;
}
