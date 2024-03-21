const langSwitcherTranslations = document.getElementById('lang');

langSwitcherTranslations.addEventListener('change', function(event) {
  const selectedLanguage = event.target.checked ? 'ukrainian' : 'english'; // Определяем выбранный язык
  const translationFile = event.target.getAttribute('data-translate-file'); // Получаем путь к файлу переводов

  // Загружаем JSON файл с переводами
  fetch(translationFile)
      .then(response => response.json())
      .then(translations => {
          // Находим все элементы, которые нужно перевести
          const elementsToTranslate = document.querySelectorAll('[data-translate-key]');

          // Проходим по каждому элементу и заменяем его текст на перевод
          elementsToTranslate.forEach(element => {
              const translationKey = element.getAttribute('data-translate-key'); // Получаем ключ для перевода
              const translation = translations[translationKey][selectedLanguage]; // Получаем перевод для выбранного языка
              element.textContent = translation; // Заменяем текст элемента на перевод
          });

          // Находим все элементы с атрибутом placeholder-translate-key и заменяем их placeholder
          const placeholdersToTranslate = document.querySelectorAll('[placeholder-translate-key]');
          placeholdersToTranslate.forEach(element => {
              const placeholderTranslationKey = element.getAttribute('placeholder-translate-key'); // Получаем ключ для перевода placeholder
              const placeholderTranslation = translations[placeholderTranslationKey][selectedLanguage]; // Получаем перевод placeholder
              element.setAttribute('placeholder', placeholderTranslation); // Заменяем placeholder на перевод
          });
      })
      .catch(error => {
          console.error("Ошибка загрузки JSON файла:", error);
      });
});

// Инициируем загрузку JSON файла при загрузке страницы
langSwitcherTranslations.dispatchEvent(new Event('change'));
