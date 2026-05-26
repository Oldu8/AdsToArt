# Локальное тестирование

## 1. Сборка

```bash
npm install       # только если node_modules нет
npm run build     # собрать в build/
```

## 2. Загрузить в Chrome

1. Открыть `chrome://extensions`
2. Включить **Developer mode** (переключатель справа вверху)
3. Нажать **Load unpacked** → выбрать **корневую папку проекта** (`adsToArt/`), не `build/`
   > `manifest.json` лежит в корне и сам ссылается на `build/` внутри

## 3. После изменений

| Что изменил | Что сделать |
|---|---|
| Только JS/CSS контент-скрипт | `npm run build` → кнопка **⟳** на карточке расширения |
| `manifest.json` (permissions, DNR rules) | `npm run build` → **Remove** расширение → **Load unpacked** заново |
| Popup (`popup.html`, `popup.js`) | `npm run build` → закрыть и открыть попап |

## 4. Проверка работы

- **Инлайн-реклама заменяется картинкой**: открыть любой новостной сайт
- **DNR-блокировка работает**: DevTools → Network → фильтр `blocked` — должны быть запросы к `pagead2.googlesyndication.com`, `doubleclick.net` и т.д.
- **Модальная реклама скрывается**: сайт с попап-рекламой — попап должен исчезнуть без замены картинкой
- **Вайтлист работает**: добавить текущий сайт в вайтлист → перезагрузить страницу → реклама не трогается

## 5. Отладка

```
DevTools → Console  — ошибки контент-скрипта
DevTools → Application → Storage → Extension storage — saved settings
chrome://extensions → Errors — ошибки service worker / manifest
```
