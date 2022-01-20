document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-test');
    const resultSection = document.getElementById('result');
    const syndrome = document.getElementById('syndrome');

    let score = 0;
    let bmi = 0;
    let age = 0;

    const getBMIResults = () => {
        const weight = parseFloat(document.getElementById('weight-user').value);
        const height = parseFloat(document.getElementById('height-user').value) * 0.01;
        bmi = calculateBMI(height, weight);

        resultSection.style.display = 'block';
        resultSection.querySelector('#index-weight strong').textContent = bmi;

        if (bmi >= 35) score++;
    };

    const getQuizResults = () => {
        const checkedQuizBtns = [
            ...document.querySelectorAll('[data-quiz]'),
        ].filter((item) => item.checked);

        checkedQuizBtns.forEach((item) => {
            score += parseInt(item.dataset.quiz);
        });
    };

    const getAgeResults = () => {
        age = parseInt(document.getElementById('age-user').value);

        if (age >= 50) score++;
    };

    const submitHandler = (event) => {
        score = 0;
        event.preventDefault();

        getBMIResults();
        getQuizResults();
        getAgeResults();

        if (score >= 0 && score <= 2) {
            syndrome.innerHTML = "Низкий риск наличия синдрома обструктивного апноэ сна";
            syndrome.style.color = '#00798a';
        }
        if (score >= 3 && score <= 4) {
            syndrome.innerHTML = "Средний риск наличия синдрома обструктивного апноэ сна";
            syndrome.style.color = '#ff9f16';
        }

        if (score >= 5 && score <= 8) {
            syndrome.innerHTML = "Высокий риск наличия синдрома обструктивного апноэ сна";
            syndrome.style.color = '#ff0000';
        }
        window.scrollBy({ top: 400, behavior: 'smooth' });
    };

    form.addEventListener('submit', submitHandler);
});

function calculateBMI(height, weight) {
    return (weight / height / height).toFixed(0);
}