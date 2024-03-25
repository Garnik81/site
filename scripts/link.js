document.addEventListener("DOMContentLoaded", function() {
    // Получаем все пункты меню
    var menuItems = document.querySelectorAll(".menu-element a");

    // Добавляем обработчик события клика для каждого пункта меню
    menuItems.forEach(function(item) {
        item.addEventListener("click", function(event) {
            // Отменяем стандартное действие ссылки
            event.preventDefault();

            // Получаем идентификатор якоря, к которому нужно прокрутить
            var targetId = item.getAttribute("href");

            // Находим элемент, к которому нужно прокрутить страницу
            var targetElement = document.querySelector(targetId);

            // Проверяем, что элемент найден
            if (targetElement) {
                // Выполняем плавную прокрутку к элементу
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start" // Прокрутка начинается вверху элемента
                });
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    var menuItems = document.querySelectorAll(".menu-element a");

    // Функция для удаления класса активности у всех пунктов меню
    function removeActiveClass() {
        menuItems.forEach(function(item) {
            item.classList.remove("active");
        });
    }

    menuItems.forEach(function(item) {
        item.addEventListener("click", function(event) {
            event.preventDefault();

            var targetId = item.getAttribute("href");
            var targetElement = document.querySelector(targetId);

            if (targetElement) {
                removeActiveClass(); // Удаляем класс активности у всех пунктов меню
                item.classList.add("active"); // Добавляем класс активности к текущему пункту меню

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});
