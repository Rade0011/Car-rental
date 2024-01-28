const CAR_MESSAGE = {
    CAR_CREATED: 'Автомобиль успешно создан',
    CAR_CHANGE: 'Информация об автомобиле успешно обновлена',
    CAR_DELETE: 'Автомобиль успешно удален',    
};

const USER_MESSAGE = {
    USER_CREATED: 'Пользователь успешно добавлен',
    USER_CHANGE: 'Данные о пользователе успешно обновлены',
    USER_DELETE: 'Пользователь успешно удален',
};

const RENT_MESSAGE = {
    RENT_CREATED: 'Автомобиль в аренду успешно взят!',
    RENT_DELETED: 'Аренда автомобиля отменена',
};

const ERROR_MESSAGE = {
    E_USER_CREATED: 'Не удалось добавить пользователя',
    E_USER_CHANGE: 'Не удалось обновить данные о пользователе',
    E_USER_DELETE: 'Не удалось удалить пользователя',
    E_CAR_CREATED: 'Не удалось добавить автомобиль',
    E_CAR_CHANGE: 'Не удалось обновить информацию об автомобиле',
    E_CAR_DELETE:'Не удалось удалить автомобиль',
    E_RENT_CREATED: 'Не удалось взять автомобиль в аренду',
    E_RENT_DELETED: 'Не удалось отменить аренду',
    E_RENT_STATUS: 'Не удалось обновить статус аренды',
    E_AUTHORIZATION: 'Ошибка авторизации',
    E_NOT_ENOUGH_AUTH: 'Не достаточно прав',
    E_SERVER: 'Ошибка на сервере',
    E_VERIFIED: 'Вы не прошли верификацию',
    E_CLOSEAUTO: 'Автомобиль занят',
    E_DATA: 'Неверно указана дата',
    E_CARAVAILIBLE: 'Машина на эти даты занята'
};

const ROLES = {
    DEFAULT: 'user',
    ADMIN: 'admin',
};

module.exports = { CAR_MESSAGE, USER_MESSAGE, RENT_MESSAGE, ERROR_MESSAGE, ROLES};