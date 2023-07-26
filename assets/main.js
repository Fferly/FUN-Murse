'use strict'

const morseSilence = '-...-';
const murseSilence = '   ';

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

        if (inputText === '') {
            alert('Спершу введіть текст =><=')
            return;
        }

        let morse = translateLangToMorse(inputText);
        let murse = translateMorseToMurse(morse);

        murseField.value = murse.join('').trim();

        createAndPlaySound(murse);
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

    function createAndPlaySound(murse) {
        let soundsSources = [];
        let index = 0;

        for (let i = 0; i < murse.length; i++) {
            if (murse[i] === ' ') {
                continue;
            }

            if (murse[i] === murseSilence) {
                soundsSources.push({
                    src: 'assets/mp3/mute.mp3',
                    duration: 500
                });
                continue;
            }

            let arr = murse[i].trim().split(' ');

            for (let j = 0; j < arr.length; j++) {
                switch(arr[j]) {
                    case 'няв':
                        soundsSources.push({
                            src: 'assets/mp3/meow.mp3',
                            duration: 700
                        });
                        break;
                    case 'мур':
                        soundsSources.push({
                            src: 'assets/mp3/purr.mp3',
                            duration: 1200
                        });
                        break;
                }
            }
        }

        const bgRecord = new Howl({
            src: ['assets/mp3/bg.mp3'],
            loop: true,
        });

        bgRecord.play();

        (function playRecord() {
           

            const record = new Howl({
                src: [soundsSources[index].src],
                
                onend: () => {
                    setTimeout(playRecord, soundsSources[index].duration);
                    index++;
                }
            });
            record.play();
        })();
    }
}
