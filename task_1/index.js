import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

// Функция decoded принимает три аргумента: 
// 1.объект для декодирования  - encoded
// 2.объект-словарь с переводом значений - translations
// 3.массив ключей-исключений из объекда для декодирования - exceptions
function decoded(encoded, translations, exceptions = []) {
    // по условию подходящие ключи должны иметь суффикс id.
    // создаем объект регулярное выражение с заданным шаблоном.
    const regex = /id$/i;

    // возвращаем новый массив, который будет результатом
    // преобразований элементов исходного.
    return encoded.map((encodedElem) => {
        // Создаем цикл и проходимся по каждому свойству объекта - элемента массива (encodedElem).
        // Получаем ключ и значение.
        for (const [key, value] of Object.entries(encodedElem)) {
            // Проверяем, что массив с исключениями не содержит очередной ключ, иначе помещаем его в exception
            const exception = exceptions.find(e => e === key);

            // Если это не исключение, подходит под шаблон и его значение определено
            // тогда присваиваем свойству рассматриваемого объекта с очередным ключом
            // значение из словаря, в качестве ключа отправляем ему значение свойства объекта.
            if (!exception && regex.test(key) && value !== null) encodedElem[key] = translations[value];
        }
        return encodedElem;
    })
}

// Создаем константу - массив с исключениями.
const EXCEPTIONS = ['groupId', 'service', 'formatSize','ca'];

console.log(decoded(encoded, translations, EXCEPTIONS));
