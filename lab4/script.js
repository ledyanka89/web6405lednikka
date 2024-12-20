document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("filter-form");
    const sigmaInput = document.getElementById("sigma");
    const imageInput = document.getElementById("image-upload");
    const sigmaError = document.getElementById("sigma-error");
    const imageError = document.getElementById("image-error");

    // Функция проверки значения σ
    function validateSigma() {
        const sigmaValue = parseFloat(sigmaInput.value);
        if (isNaN(sigmaValue) || sigmaValue <= 0) {
            sigmaError.textContent = "Введите положительное число для σ.";
            sigmaError.classList.add("active");
            return false;
        } else {
            sigmaError.textContent = "";
            sigmaError.classList.remove("active");
            return true;
        }
    }

    // Функция проверки загрузки изображения
    function validateImage() {
        if (!imageInput.files || imageInput.files.length === 0) {
            imageError.textContent = "Выберите изображение для фильтрации.";
            imageError.classList.add("active");
            return false;
        } else {
            imageError.textContent = "";
            imageError.classList.remove("active");
            return true;
        }
    }

    // Обработчики событий для полей формы
    sigmaInput.addEventListener("input", validateSigma);
    imageInput.addEventListener("change", validateImage);

    // Обработка отправки формы
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const isSigmaValid = validateSigma();
        const isImageValid = validateImage();

        // Проверяем валидацию
        if (!isSigmaValid || !isImageValid) {
            alert("Пожалуйста, исправьте ошибки перед отправкой формы.");
            return;
        }

        // Создаем FormData и JSON данные для отправки
        const formData = new FormData(form);
        const sigmaValue = parseFloat(sigmaInput.value);
        const imageFile = imageInput.files[0];

        const data = {
            sigma: sigmaValue,
            image: imageFile.name // Только имя файла для примера
        };

        fetch("http://localhost:8000/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                console.log("Успешная отправка:", result);
                alert(result.response || "Фильтрация успешно выполнена!");
                form.reset();
            })
            .catch(error => {
                console.error("Ошибка при отправке:", error);
                alert("Не удалось отправить данные. Пожалуйста, попробуйте снова.");
            });
    });
});
