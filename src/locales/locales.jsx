export const APP_LOCALES = [
  {
    serviceName: "ru",
    displayName: "RU",
    shortName: "RU",
  },
  {
    serviceName: "en",
    displayName: "EN",
    shortName: "EN",
  },
  {
    serviceName: "kk",
    displayName: "KZ",
    shortName: "KZ",
  },
]

export const APP_TRANSLATIONS = {
  ru: {
    // General
    message: "Добро пожаловать!",
    buyButton: "В корзину",
    confirmButton: "Подтвердить",
    addToCartButton: "Добавить в корзину",
    notAvailableButton: "Нет в наличии",

    // productDetails
    productDetailsItemNumber: "Артикул",
    productDetailsProducer: "Производитель",
    productDetailsDescription: "Описание",
    productDetailsAvailable: "В наличии",
    productDetailsNotAvailable: "Нет в наличии",
    productDetails404: "Такой страницы нет. Возвращаюсь на главную страницу",

    // reviews
    reviewAddFeedback: "Напишите свой отзыв",
    reviewAddComment: "Введите комментарий",
    reviewAddReviewButton: "Добавить отзыв",
    reviewRecentFeedbacks: "Последние отзывы",
    reviewExistingFeedback: "Спасибо, что оставили отзыв!",

    // filterSection
    filterAllBrands: "Все марки",
    filterAllModels: "Все модели",
    filterAllGenerations: "Все поколения",

    // contactDetails
    contactsPhone: "Введите номер телефона",
    contactsDetails: "Контактные данные",
    contactsLastName: "Фамилия",
    contactsFirstName: "Имя",
    contactsPatronym: "Отчество",
    contactsEmail: "Электронная почта",
    contactsPassword: "Пароль",
    contactsRepeatPassword: "Повторите пароль",
    contactsOptional: "(Необязательно)",

    // deliveryDetails
    deliveryDetails: "Доставка",
    deliveryRegion: "Область",
    deliveryCity: "Город или поселок",
    deliveryStreet: "Улица",
    deliveryHouse: "Дом",
    deliveryApartment: "Квартира",

    // orderComplete
    orderCompleteNotification: "Заказ успешно создан",
    orderCompleteOrderNumber: "Номер Вашего заказа:",
    orderCompleteSeeProfile: "Список Ваших заказов указан в личном кабинете",
    orderCompleteProfile: "Перейти в личный кабинет",

    // footer
    footerContacts: "Астана: +7 775 000 77 49",

    // addProductModal
    addProductAddingToCart: "Добавление товара в корзину",
    addProductContinueShopping: "Продолжить покупки",

    // logInModal
    loginInvalidEmail: "Неверно введена почта",
    loginInvalidPassword: "Неверно введен пароль",
    loginSignIn: "Вход в учетную запись",
    loginEmail: "Электронная почта",
    loginPassword: "Пароль",
    loginSignInButton: "Войти в учетную запись",
    loginNoProfile: "Нет учетной записи?",
    loginSignUp: "Войти",

    // signUpModal
    signUpCreate: "Создание учетной записи",
    signUpFirstName: "Имя",
    signUpLastName: "Фамилия",
    signUpEmail: "Электронная почта",
    signUpPassword: "Пароль",
    signUpRepeatPassword: "Повторите пароль",
    signUpProfileExists: "Есть учетная запись?",
    signUpSignIn: "Зарегистрироваться",

    // pageNavigation
    pageNavBack: "Назад",
    pageNavForward: "Вперед",

    // productsGrid
    productsGridNotAvailable: "Таких товаров не существует",

    // UserProfile
    profileMyAccount: "Личный кабинет",
    profileMyOrders: "Мои заказы",
    profileOrderNo: "Номер заказа",
    profileProduct: "Наименование товара",
    profileQuantity: "Количество",
    profilePrice: "Стоимость",
    profileDate: "Дата заказа",
    profileNoOrders: "У Вас еще нет заказов.",
    profileAddProducts: "Добавить товары",

    // checkBox
    checkBoxAvailable: "В наличии",

    // cartPage
    cartPageHeader: "Оформление заказа",

    // cartItems
    cartItemsCart: "Корзина",
    cartItemsItem: "Наименование товара",
    cartItemsQuantity: "Количество",
    cartItemsPrice: "Цена",
    cartItemsItemNo: "Артикул:",
    cartItemsRemoveItem: "Удалить из корзины",
    cartItemsTotalPrice: "Итого к оплате:",
    cartItemsEmpty: "Ваша корзина пуста.",
    cartItemsAddItems: "Добавить товары",
    cartItemsConfirmButton: "Продолжить",

    // cartRoute
    cartRouteCart: "Корзина",
    cartRouteContacts: "Контакты",
    cartRouteDelivery: "Доставка",
    cartRouteComplete: "Завершение",
  },

  en: {
    message: "Welcome!",
    buyButton: "Add to cart",
    confirmButton: "Confirm",
    addToCartButton: "Add to cart",
    notAvailableButton: "Out of stock",

    productDetailsItemNumber: "Item number:",
    productDetailsProducer: "Producer:",
    productDetailsDescription: "Description:",
    productDetailsAvailable: "Available",
    productDetailsNotAvailable: "Not available",
    productDetails404: "This page does not exist. Returning to the home page",

    reviewAddFeedback: "Feedback",
    reviewAddComment: "Write your comment",
    reviewAddReviewButton: "Add review",
    reviewRecentFeedbacks: "Recent feedbacks",
    reviewExistingFeedback: "Thank you for your feedback!",

    filterAllBrands: "All brands",
    filterAllModels: "All models",
    filterAllGenerations: "All generations",

    contactsPhone: "Enter your phone number",
    contactsDetails: "Contact details",
    contactsLastName: "Last name",
    contactsFirstName: "First name",
    contactsPatronym: "Patronym",
    contactsEmail: "Email",
    contactsPassword: "Password",
    contactsRepeatPassword: "Confirm password",
    contactsOptional: "(Optional)",

    deliveryDetails: "Delivery details",
    deliveryRegion: "Region",
    deliveryCity: "City or village",
    deliveryStreet: "Street",
    deliveryHouse: "Building",
    deliveryApartment: "Apartment",

    orderCompleteNotification: "Your order has been completed",
    orderCompleteOrderNumber: "Your order number is ",
    orderCompleteSeeProfile: "See your orders in your profile",
    orderCompleteProfile: "My account",

    footerContacts: "Astana: +7 775 000 77 49",

    addProductAddingToCart: "Adding an item to cart",
    addProductContinueShopping: "Continue shopping",

    loginInvalidEmail: "Incorrect email",
    loginInvalidPassword: "Incorrect password",
    loginSignIn: "Sign in to your account",
    loginEmail: "Email",
    loginPassword: "Password",
    loginSignInButton: "Sign in",
    loginNoProfile: "No account?",
    loginSignUp: "Sign in",

    signUpCreate: "Creating a new account",
    signUpFirstName: "First name",
    signUpLastName: "Last name",
    signUpEmail: "Email",
    signUpPassword: "Password",
    signUpRepeatPassword: "Confirm password",
    signUpProfileExists: "Have an account?",
    signUpSignIn: "Sign up",

    pageNavBack: "Back",
    pageNavForward: "Forward",

    productsGridNotAvailable: "No items available",

    profileMyAccount: "My account",
    profileMyOrders: "My orders",
    profileOrderNo: "Order No.",
    profileProduct: "Item",
    profileQuantity: "Quantity",
    profilePrice: "Price",
    profileDate: "Order date",
    profileNoOrders: "You don't have any orders.",
    profileAddProducts: "Add items",

    checkBoxAvailable: "Available",

    cartPageHeader: "Order placement",

    cartItemsCart: "My Cart",
    cartItemsItem: "Item",
    cartItemsQuantity: "Quantity",
    cartItemsPrice: "Price",
    cartItemsItemNo: "Item No:",
    cartItemsRemoveItem: "Remove",
    cartItemsTotalPrice: "Total price:",
    cartItemsEmpty: "The cart is empty.",
    cartItemsAddItems: "Add items",
    cartItemsConfirmButton: "Confirm",

    cartRouteCart: "Cart",
    cartRouteContacts: "Contacts",
    cartRouteDelivery: "Delivery",
    cartRouteComplete: "Final",
  },

  kk: {
    message: "Қош келдіңіздер!",
    buyButton: "Сатып алу",
    confirmButton: "Растау",
    addToCartButton: "Тауарды себетке қосу",
    notAvailableButton: "Қоймада жоқ",

    productDetailsItemNumber: "Тауар нөмірі:",
    productDetailsProducer: "Өндіруші:",
    productDetailsDescription: "Сипаттама:",
    productDetailsAvailable: "Қол жетімді",
    productDetailsNotAvailable: "Қол жетімсіз",
    productDetails404: "Бұл бет жоқ. Негізгі бетке қайта оралу",

    reviewAddFeedback: "Пікіріңізді жазыңыз",
    reviewAddComment: "Пікір енгізіңіз",
    reviewAddReviewButton: "Қосу",
    reviewRecentFeedbacks: "Соңғы пікірлер",
    reviewExistingFeedback: "Пікіріңіз үшін рахмет!",

    filterAllBrands: "Барлық маркалар",
    filterAllModels: "Барлық модельдер",
    filterAllGenerations: "Барлық ұрпақтар",

    contactsPhone: "Телефон нөміріңізді енгізіңіз",
    contactsDetails: "Байланыс деректері",
    contactsLastName: "Тегі",
    contactsFirstName: "Аты",
    contactsPatronym: "Әкесінің аты",
    contactsEmail: "Электрондық пошта",
    contactsPassword: "Құпия сөз",
    contactsRepeatPassword: "Құпия сөзді қайта енгізіңіз",
    contactsOptional: "(Міндетті емес)",

    deliveryDetails: "Жеткізу",
    deliveryRegion: "Аймақ",
    deliveryCity: "Қала немесе ауыл",
    deliveryStreet: "Көше",
    deliveryHouse: "Үй",
    deliveryApartment: "Пәтер",

    orderCompleteNotification: "Тапсырыс сәтті құрылды",
    orderCompleteOrderNumber: "Сіздің тапсырыс нөміріңіз:",
    orderCompleteSeeProfile: "Сіздің тапсырыстарыңыздың тізімі жеке кабинетте көрсетілген",
    orderCompleteProfile: "Жеке кабинетке өту",

    footerContacts: "Астана: +7 775 000 77 49",

    addProductAddingToCart: "Тауарды себетке қосу",
    addProductContinueShopping: "Сатып алуды жалғастыру",

    loginInvalidEmail: "Дұрыс емес электрондық пошта",
    loginInvalidPassword: "Қате құпия сөз",
    loginSignIn: "Есептік жазбаға кіру",
    loginEmail: "Электрондық пошта",
    loginPassword: "Құпия сөз",
    loginSignInButton: "Есептік жазбаға кіру",
    loginNoProfile: "Есептік жазбаңыз жоқ па?",
    loginSignUp: "Кіру",

    signUpCreate: "Есептік жазба жасау",
    signUpFirstName: "Аты",
    signUpLastName: "Тегі",
    signUpEmail: "Электрондық пошта",
    signUpPassword: "Құпия сөз",
    signUpRepeatPassword: "Құпия сөзді қайталаңыз",
    signUpProfileExists: "Есептік жазбаңыз бар ма?",
    signUpSignIn: "Тіркелу",

    pageNavBack: "Артқа",
    pageNavForward: "Алға",

    productsGridNotAvailable: "Тауарлар жоқ",

    profileMyAccount: "Жеке кабинет",
    profileMyOrders: "Менің тапсырыстарым",
    profileOrderNo: "Тапсырыс нөмірі",
    profileProduct: "Тауар атауы",
    profileQuantity: "Саны",
    profilePrice: "Бағасы",
    profileDate: "Тапсырыс күні",
    profileNoOrders: "Сізде әлі тапсырыстар жоқ.",
    profileAddProducts: "Тауарлар қосу",

    checkBoxAvailable: "Қол жетімді",

    cartPageHeader: "Тапсырыс беру",

    cartItemsCart: "Себет",
    cartItemsItem: "Тауар атауы",
    cartItemsQuantity: "Саны",
    cartItemsPrice: "Бағасы",
    cartItemsItemNo: "Артикул:",
    cartItemsRemoveItem: "Себеттен жою",
    cartItemsTotalPrice: "Жалпы төлеу сомасы:",
    cartItemsEmpty: "Сіздің себетіңіз бос.",
    cartItemsAddItems: "Тауарлар қосу",
    cartItemsConfirmButton: "Жалғастыру",

    cartRouteCart: "Себет",
    cartRouteContacts: "Байланыс деректері",
    cartRouteDelivery: "Жеткізу",
    cartRouteComplete: "Аяқтау",
  },
}

// t('ru', 'reviews.mess')

export function translate(language, translationKey) {
  return APP_TRANSLATIONS[language][translationKey]
}
