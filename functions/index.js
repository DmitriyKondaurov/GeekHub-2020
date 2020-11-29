document.querySelectorAll('input[name], #formula, #condition').forEach(function (input) {
    input.addEventListener('keyup', function () {
        let data = {};

        document.querySelectorAll('input[name]').forEach(function (input) {
            data[input.name] = Number(input.value);
        });

        const formula = document.querySelector('#formula');
        let result = document.querySelector('#result');
        const condition = document.querySelector('#condition');

        try {
            const calculator = new Function('cells', 'with (cells) { return ' + formula.value + ';}');
            result.value = calculator(data);
            result.style.backgroundColor = '#fff';
        }

        catch (error) {
            result.value = '#ERROR';
            result.style.backgroundColor = '#d7a8a8';
            console.error(error.message);
        }

        try {
            const marker = new Function('conditions, result, formula, data', ' { return ' + condition.value + ';}');
            condition.style.backgroundColor = '#fff';

            if (marker(condition, result, formula, data)) {
                result.style.backgroundColor = '#b6d7a8';
            }
        }
        catch (error) {
            condition.style.backgroundColor = '#d7a8a8';
            console.error(error.message);
        }
    });
});