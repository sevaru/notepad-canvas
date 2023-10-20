import { Rectangle } from "../models/classRectangle";
export function sortRectangleList(rectangleList: Rectangle[], id: number) {
  // Находим индекс элемента с заданным id
  const indexToFind = rectangleList.findIndex((obj) => obj.id === id);

  // Если элемент с таким id не найден или он уже является последним элементом, ничего не делаем
  if (indexToFind === -1 || indexToFind === rectangleList.length - 1) {
    return rectangleList;
  }

  // Сохраняем найденный элемент
  const foundElement = rectangleList[indexToFind];

  // Сдвигаем все элементы перед найденным элементом на одну позицию назад
  for (let i = indexToFind; i < rectangleList.length - 1; i++) {
    rectangleList[i] = rectangleList[i + 1];
  }

  // Помещаем найденный элемент в конец массива
  rectangleList[rectangleList.length - 1] = foundElement;

  return rectangleList;
}
