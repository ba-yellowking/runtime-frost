// Все начинается с useModal
import {useState} from "react";

function useModal() {

  // Хук для запоминания состояния открытости
  const [isOpen, setIsOpen] = useState(false);

  // Функция для открытия окна
  function open() {
    setIsOpen(true);
  }

  // Функция для закрытия окна
  function close() {
    setIsOpen(false);
  }

  // Возвращает массив с тремя элементами
  return [isOpen, open, close]
}

export default useModal;