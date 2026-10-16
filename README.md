# GREEN-API Chat
Клиент для интеграции с [GREEN-API](https://green-api.com/) Telegram.
- Прототипом для интерейфса была веб версия MAX, были перенесены токены для цветов, шрифтов, отступов, border-radius
- При запуске нужно ввести `idInstance`, `apiTokenInstance` (можно получить в личном кабинете GREEN-API), опционально можно указать поддомен для API URL (числовое значение, по умолчанию 4100)
- Данные хранятся в `sessionStorage` для безопасности, при закрытии вкладки удаляются
- Новый чат добавляется по номеру телефона (`checkAccount`)
- Для получения сообщения используется поллинг `recieveNotification`, после получения уведомелния вызывается `deleteNotification`
- Сообщение отправляется вызовом `sendMessage`
- Работает поиск по чатам

## Запуск
Для запуска должен быть установлена node и npm
### 1. Клонирование репозитория
```bash
git clone https://github.com/andrewgul/green-api-chat.git
cd green-api-chat
```
### 2. Установка зависимостей
```bash
npm install
```
### 3. Запуск dev сервера
```bash
npm run dev
```
## Стек
- React 19
- TypeScript
- Vite,
- Tailwind 4
- Zustand
- React Router.