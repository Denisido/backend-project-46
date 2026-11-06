# Вычислитель отличий (JS)

[![hexlet-check](https://github.com/Denisido/backend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Denisido/backend-project-46/actions)

[![Node CI](https://github.com/Denisido/backend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/Denisido/backend-project-46/actions/workflows/nodejs.yml)

Узнаете, как создавать cli приложения, парсить и форматировать данные в json, yaml. Научитесь проектировать архитектуру приложений. А также писать unit-тесты.

Учебный проект Хекслета: https://ru.hexlet.io/programs/backend
Как это должно работать: https://asciinema.org/a/Pe6QypnLEmFWssNAjCOJN1iii

## Стек

- JavaScript

## Установка

```bash
git clone https://github.com/Denisido/backend-project-46.git
cd backend-project-46
npm ci
npm link
```

## Использование

Сравнение вложенных JSON-файлов (stylish по умолчанию):

```bash
gendiff __fixtures__/file1-nested.json __fixtures__/file2-nested.json
```

Вывод в формате plain:

```bash
gendiff --format plain __fixtures__/file1-nested.json __fixtures__/file2-nested.json
```

Вывод в формате JSON:

```bash
gendiff --format json __fixtures__/file1-nested.json __fixtures__/file2-nested.json
```

Сравнение YAML-файлов:

```bash
gendiff __fixtures__/file1-nested.yml __fixtures__/file2-nested.yml
```

### Демонстрация работы

**Сравнение JSON-файлов**

[![asciicast](https://asciinema.org/a/AcoFwsmpq6COE7fx.svg)](https://asciinema.org/a/AcoFwsmpq6COE7fx)

**Сравнение YAML-файлов**

[![asciicast](https://asciinema.org/a/GghqpKboCxicqbwy.svg)](https://asciinema.org/a/GghqpKboCxicqbwy)

**Рекурсивное сравнение JSON и YAML**

[![asciicast](https://asciinema.org/a/jN3axEdqikbu1faN.svg)](https://asciinema.org/a/jN3axEdqikbu1faN)

**Плоский формат (plain)**

[![asciicast](https://asciinema.org/a/48sNDSl1UyrPYzak.svg)](https://asciinema.org/a/48sNDSl1UyrPYzak)

**Вывод в формате JSON**

[![asciicast](https://asciinema.org/a/0Un9SP41GrlV84my.svg)](https://asciinema.org/a/0Un9SP41GrlV84my)

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
