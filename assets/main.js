'use strict'

// Взята версія 'Пласту'
let dict = {
    'а' : '.-',
    'б' : '-...',
    'ц' : '-.-.',
    'д' : '-..',
    'е' : '.',
    'ф' : '..-.',
    'ґ' : '--.',
    'г' : '....',
    'і' : '..',
    'й' : '.---',
    'к' : '-.-',
    'л' : '.-..',
    'м' : '--',
    'н' : '-.',
    'о' : '---',
    'п' : '.--.',
    'ш' : '--.-',
    'р' : '.-.',
    'с' : '...',
    'т' : '-',
    'у' : '..-',
    'ж' : '...-',
    'в' : '.--',
    'ь' : '-..-',
    'и' : '-.--',
    'з' : '--..',
    'є' : '..-..',
    'ч' : '---.',
    'х' : '----',
    'ю' : '..--',
    'я' : '.-.-',
    'ї' : '.---.',
    'щ' : '--.--',

    '1' : '.----',
    '2' : '..---',
    '3' : '...--',
    '4' : '....-',
    '5' : '.....',
    '6' : '-....',
    '7' : '--...',
    '8' : '---..',
    '9' : '----.',
    '10' : '-----',

    '.' : '......',
    ',' : '.-.-.-',
    '/' : '-..-.',
    '?' : '..--..',
    '!' : '--..--',
    ':' : '---...',
    ';' : '-.-.-.',
    '(' : '-.--.-',
    ')' : '-.--.-',
    '\'' : '.----.',
    '-' : '-....-',
    '—' : '-....-',
    '"' : '.-..-.',
    ' ' : '-...-',
    '@' : '.--.-.',
    '$' : '...-..-',
}

window.onload = () => {
    const langField   = document.getElementById('lang'),
          murseField  = document.getElementById('murse'),
          startButton = document.getElementById('start'); 

    startButton.onclick = () => {
        const inputText = langField.value;

        let morse = translateLangToMorse(inputText);
        let murse = translateMorseToMurse(morse);

        murseField.value = murse.join('');
    }

    function translateLangToMorse(text) {
        return text.split('').map(elem => {
            return elem = elem in dict ? dict[elem] : ''; 
        });
    }

    function translateMorseToMurse(morseText) {
        const murseDict = {
            '.' : 'няв',
            '-' : 'мур'
        };

        return morseText.map(elem => {
            const morseSilence = '-...-';
            const murseSilence = '   ';

            if (elem === morseSilence) {
                return murseSilence;
            }

            let newElem = elem.split('').map( elem=> {
                return (elem in murseDict ? 
                    murseDict[elem] : '') + ' '
            }).join('');

            return newElem + ' ';
        });
    }
}
