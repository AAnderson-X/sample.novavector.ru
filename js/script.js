// WHATSAPP
//
// function sendToWhatsApp(e) {
//   e.preventDefault();
//
//   let name = document.getElementById("name").value;
//   let phone = document.getElementById("phone").value;
//   let message = document.getElementById("message").value;
//
//   let text = `Новая заявка:%0AИмя: ${name}%0AТелефон: ${phone}%0AУслуга: ${message}`;
//
//   let url = `https://wa.me/79624944722?text=${text}`;
//
//   window.open(url, "_blank");
// }

// TELEGRAM

// const TOKEN = "ENTER TOKEN";
// const CHAT_ID = "ENTER CHAT ID";
// const url = `ССЫЛКА ИЗ GOOGLE`;
//
// document.getElementById('tg-form').addEventListener('submit', function(e) {
//   e.preventDefault();
//
//   // Формируем текст сообщения
//   let text = `<b>🔥 Новая заявка с сайта!</b>\n\n`;
//   text += `<b>👤 Имя:</b> ${this.name.value}\n`;
//   text += `<b>📞 Телефон:</b> ${this.phone.value}\n`;
//   text += `<b>📝 Сообщение:</b> ${this.message.value || 'Пусто'}`; // Если текста нет, напишет "Пусто"
//
//   fetch(URI_API, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       chat_id: CHAT_ID,
//       parse_mode: 'html',
//       text: text
//     })
//   })
//     .then(res => {
//       if(res.ok) {
//         // 1. Находим форму и блок успеха
//         const form = document.getElementById('tg-form');
//         const successBox = document.getElementById('success-message');
//
//         // 2. Скрываем форму (она больше не нужна)
//         form.style.display = 'none';
//
//         // 3. Показываем сообщение об успехе
//         successBox.style.display = 'block';
//
//         // 4. Очищаем форму на всякий случай
//         this.reset();
//       } else {
//         alert('Ошибка при отправке. Попробуйте снова.');
//       }
//     })
//     .catch(err => alert('Техническая ошибка. Проверьте интернет.'));
// });

// NEW TG

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('tg-form');
  const phoneInput = document.getElementById('phone');

  //  ССЫЛКЫ ТУТ:
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwMd6lV2d_rc22_igC-mMcD1Az9v5LiFSGRUPgiKplcJvGaa8eRwO6_Kw7ZShklqsbHPQ/exec";

  // 1. НАСТРОЙКА МАСКИ ТЕЛЕФОНА
  if (phoneInput) {
    const maskOptions = {
      mask: '+{7} (000) 000-00-00',
      lazy: false // маска видна сразу
    };
    IMask(phoneInput, maskOptions);
  }

  // 2. ОБРАБОТКА ОТПРАВКИ ФОРМЫ
  if (form) {
    form.addEventListener('submit', function(e) {
      // Это критически важно, чтобы страница не перезагружалась
      e.preventDefault();

      // Это останавливает любые другие скрытые обработчики, если они остались
      e.stopImmediatePropagation();

      // Блокируем кнопку, чтобы нельзя было нажать 2 раза
      const submitBtn = this.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "Отправка..."; // Визуальный фидбек
      }

      const formData = {
        name: this.name.value,
        phone: this.phone.value,
        message: this.message.value || 'Пусто'
      };

      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(() => {
          // Успешная отправка
          const successBox = document.getElementById('success-message');
          form.style.display = 'none';
          if (successBox) successBox.style.display = 'block';

          this.reset(); // Очищаем поля
        })
        .catch(err => {
          // Ошибка (например, нет интернета)
          console.error('Ошибка отправки:', err);
          alert('Ошибка при отправке. Пожалуйста, попробуйте еще раз.');

          // Возвращаем кнопку в рабочее состояние
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = "Отправить";
          }
        });
    });
  } else {
    console.error("Критическая ошибка: Форма с id='tg-form' не найдена на странице!");
  }
});

function openWA() {
  window.open("https://wa.me/79999999999?text=Здравствуйте!", "_blank");
}

function openTG() {
  window.open("https://t.me/username", "_blank");
}










