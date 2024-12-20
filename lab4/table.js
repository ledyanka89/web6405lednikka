document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#filterApplications-table tbody');


    async function fetchtable() {
        try {
            const response = await fetch('http://localhost:8000/filterApplications', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const result = await response.json();
            populateTable(result.data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            alert('Не удалось загрузить данные о моделях.');
        }
    }


    function populateTable(filterApplications) {
        tableBody.innerHTML = '';

        filterApplications.forEach(filterApplication => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = filterApplication.id;

            const nameCell = document.createElement('td');
            nameCell.textContent = filterApplication.title;

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = filterApplication.description;

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(descriptionCell);

            tableBody.appendChild(row);
        });
    }

    fetchtable();
});