import {createContext, useLayoutEffect, useState} from "react";
import axios from "axios";


export const AuthContext = createContext()


function AuthContextProvider(props) {

  // Пользователь (user)
  const [user, setUser] = useState(null);

  // Визуализация загрузки
  const [loading, setLoading] = useState(false);

  // Конвертация строки в объект
  const [tokenInfo, setTokenInfo] = useState(JSON.parse(localStorage.getItem("tokenInfo")));

  // Общее количество товаров в корзины для изменения иконки
  const [totalCount, setTotalCount] = useState(null);


  // Выполняется раньше других useEffect
  useLayoutEffect(function() {

    // Если токен действителен и его время жизни больше, чем текущее
    if (tokenInfo && tokenInfo.expiresIn > new Date().getTime()) {

      // Для выполнения запроса с авторизацией, необходимо в сам запрос подставить токен доступа access token,
      // выданный сервером при помощи заголовка Authorization.

      // Заголовки
      axios.defaults.headers.common["Authorization"] = "Bearer " + tokenInfo.accessToken

      axios
        .post("https://frost.runtime.kz/api/auth/user")

        .then(function(response) {
          console.log(response.data)
          setUser(response.data)
        })
    }
  }, [tokenInfo])


  // Функция для авторизации пользователя (signIn)
  function signIn(username, password) {

    // Устанавливаем состояние загрузки <Spinner/> до начала запроса axios
    setLoading(true);

    // username - Имя пользователя (в нашем случае email)
    // password - Пароль пользователя (в нашем случае password)

    axios
      .post("https://frost.runtime.kz/api/auth/token", {
        username: username,
        password: password,
      })

      .then(function(response) {
        setLoading(false);
        // setUser(username);

        const tokenInfo = {
          // Сохранение токена в accessToken
          accessToken: response.data.access_token,

          // Срок действия до этой даты (https://www.unixtimestamp.com)
          expiresIn: new Date().getTime() + (response.data.expires_in * 1000),
        }

        // JSON.stringify() конвентируем объект в строку
        localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));
        console.log(tokenInfo);
        setTokenInfo(tokenInfo);

      })

      .catch(function(error) {
        console.log(error);
      })

  }


  // Функция для выхода пользователя (signOut)
  function signOut() {
    setUser(null);
    localStorage.removeItem('tokenInfo');
  }


  return (

    <AuthContext.Provider value={[user, signIn, signOut, loading, tokenInfo, totalCount, setTotalCount]}>
      {props.children}
    </AuthContext.Provider>

  )
}


export default AuthContextProvider;