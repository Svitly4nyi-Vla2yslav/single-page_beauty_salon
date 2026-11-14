# single-page_beauty_salon

Односторінковий сайт сучасної beauty-студії в Німеччині. Застосунок побудований на React, TypeScript і Vite; інтерфейс використовує локалізацію, анімовану hero-секцію, прайс, відгуки, FAQ, форму бронювання та контактний блок.

## Локальний запуск

```bash
npm install
npm run dev
```

Vite виведе локальну адресу застосунку. Перед публікацією перевірте production-збірку:

```bash
npm run build
npm run preview
```

`build` виконує TypeScript project build, а потім збирає статичні файли Vite.

## Структура застосунку

- `src/sections` збирає великі блоки односторінкового макета;
- `src/components` містить навігацію, SEO, cookie consent, lightbox і hero-компоненти;
- `src/data` зберігає статичні дані сайту та конфігурацію бронювання;
- `src/hooks` інкапсулює scroll-reveal і підтримку `prefers-reduced-motion`.

Локалізацію ініціалізує `src/i18n.ts`, а `src/App.tsx` складає секції в остаточному порядку. Анімації враховують системне налаштування зменшення руху; для ручної перевірки хук також розпізнає query-параметри `?motion=off` і `?motion=on`.
