document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector('.contact-us__form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию
        
        // Получаем значения из полей формы
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // Получаем текущую дату и время
        const currentDate = new Date();
        const day = currentDate.getDate() < 10 ? '0' + currentDate.getDate() : currentDate.getDate();
        const month = (currentDate.getMonth() + 1) < 10 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
        const formattedDate = `${day}.${month}.${currentDate.getFullYear()}`;

        // Форматирование времени с ведущими нулями
        const hours = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours();
        const minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes();
        const formattedTime = `${hours}:${minutes}`;
        
        // Формируем текст сообщения для отправки в телеграм
        const telegramMessage = `Питання з сайту%0AДата: ${formattedDate}%0AЧас: ${formattedTime}%0AИм'я: ${name}%0AEmail: ${email}%0AНомер телефону: ${phone}%0AПитання: ${message}`;
        
        // Адрес вашего телеграм бота и chat_id для каждого получателя
        const telegramBotUrl = 'https://api.telegram.org/bot6638929989:AAGCNKPZTurimEku2mcKRqLdSjlDgeLC32E/sendMessage';
        const chatIds = [336342827, 448453489]; // Замените chat_id1, chat_id2, chat_id3 на фактические chat_id
        
        // Отправка сообщения каждому chat_id
        chatIds.forEach(chat_id => {
            const urlWithChatId = `${telegramBotUrl}?chat_id=${chat_id}&text=${telegramMessage}`;
            
            // Отправляем запрос к API телеграм
            fetch(urlWithChatId)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    // Здесь можно добавить дополнительные действия после успешной отправки сообщения
                })
                .catch(error => {
                    console.error('There has been a problem with your fetch operation:', error);
                    // Здесь можно добавить дополнительные действия при возникновении ошибки отправки сообщения
                });
        });

        // Здесь можно добавить дополнительные действия после отправки сообщений, например, очистить поля формы или вывести сообщение об успешной отправке
        alert('Сообщения успешно отправлены!');
    });
});
