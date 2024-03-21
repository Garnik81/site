document.addEventListener("DOMContentLoaded", function() {
    var leftContainer = document.querySelector('.partners-wrapper .left');
    var rightBlock = document.querySelector('.partners-wrapper .right');
    var partnersInfo;

    // Извлекаем ссылку на JSON-файл из атрибута data-json-url
    var langSwitcher = document.getElementById('lang');

    // Функция для обработки события переключения языка
    function handleLanguageToggle() {
        var defaultJsonUrl = leftContainer.querySelector('.partners-list__element').dataset.jsonUrl;
        var jsonUrl2 = leftContainer.querySelector('.partners-list__element').dataset.jsonUrlEn;
        var jsonUrl = langSwitcher.checked ? defaultJsonUrl : jsonUrl2;
        fetchData(jsonUrl);
    }

    // Функция для получения данных из JSON
    function fetchData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                partnersInfo = data;
                updatePartnerInfo(); // Вызываем функцию обновления информации о партнере после загрузки данных
            })
            .catch(error => console.error('Ошибка:', error));
    }

    // Функция для обновления информации о партнере
    function updatePartnerInfo() {
        var activePartner = leftContainer.querySelector('.partners-list__element.active');
        if (activePartner) {
            var partnerName = activePartner.querySelector('.partners-list__title').innerText;
            var partnerInfo = partnersInfo.partners.find(partner => partner.name === partnerName);

            if (partnerInfo) {
                var partnerHTML = "<div class='partner-card__title'><img src='" + partnerInfo.image + "' alt='" + partnerName + "' class='partner-card__image' /><span class='partner-card__name'>" + partnerName + "</span></div><p class='partner-card__description'>" + partnerInfo.description + "</p>";
                rightBlock.innerHTML = partnerHTML;
            } else {
                console.error("Информация о партнере не найдена");
            }
        }
    }

    // Обработчик события переключения языка
    langSwitcher.addEventListener('change', handleLanguageToggle);

    // Инициализация данных при загрузке страницы
    handleLanguageToggle();

    // Обработчик клика на блок .partners-list__element
    leftContainer.addEventListener('click', function(event) {
        var targetElement = event.target.closest('.partners-list__element');
        if (targetElement && targetElement.classList.contains('partners-list__element')) {
            leftContainer.querySelectorAll('.partners-list__element').forEach(function(element) {
                element.classList.remove('active');
            });
            targetElement.classList.add('active');
            updatePartnerInfo(); // Вызываем функцию обновления информации о партнере после клика на блок
        }
    });
});
