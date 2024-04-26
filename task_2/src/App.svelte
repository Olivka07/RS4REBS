<script lang="ts">
  import { CURRENCIES, type TypeCurrency } from './consts/index'
  import CurrencyPicker from './lib/CurrencyPicker.svelte'
  import CurrencyInput from './lib/CurrencyInput.svelte'
  import { type CurrencyInfo } from './types/index'


  

  // объект 'o', который хранит информацию, полученную с сервера
  // о валюте, находящейся слева или справа в теге select
  let o:  CurrencyInfo;

  // Содержит значение левого select
  let leftCurrency: TypeCurrency = CURRENCIES[0];
  // Содержит значение правого select
  let rightCurrency: TypeCurrency = CURRENCIES[0];

  // переменная, которая изменяется при пользовательском вводе в левый input и отвечает за номинал
  let leftNominal: number = 0;
  // переменная, которая изменяется при пользовательском вводе в правый input и отвечает за номинал
  let rightNominal: number = 0;

  // Переменная, которая содержит значение свойства value для левого input - фактический номинал
  let ln: number = 0;
  // функция вызывается при изменении пользовательского ввода в левый input
  $: changedNominal(leftNominal, 'left');

  // Переменная, которая содержит значение свойства value для правого input - фактический номинал
  let rn: number = 0;
  // функция вызывается при изменении пользовательского ввода в правый input
  $: changedNominal(rightNominal, 'right');




  // Делаем запрос на сервер только при изменении валюты
  $: getInfoCurrency(rightCurrency, 'right'); // При изменении правой валюты
  $: getInfoCurrency(leftCurrency, 'left'); // При изменении левой валюты
  

  // Функция, которая отрабатывает при изменении пользовательского ввода в input
  function changedNominal(nominal: number, side: 'left' | 'right') {
    // Проверка, что объект 'o' существует, иначе падает warning TypeError
    // при инициализации приложения.
    if (o) {

      // Проверка на то, какой именно input был изменен. 
      // Фактическому значению присваиваем измененненое значение затронутого input.
      // А фактическое значение другого input вычисляется в зависимости от того, что
      // содержит объект 'o'.
      if (side === 'left') {
        ln = nominal;
        rn = o.base_code === leftCurrency ? nominal * o.rates[rightCurrency] : nominal * 1/o.rates[leftCurrency];
      } else {
        rn = nominal;
        ln = o.base_code === rightCurrency ? nominal * o.rates[leftCurrency] : nominal * 1/o.rates[rightCurrency];
      }
    }
  }

  
  

  // Получаем с серверного API информацию об измененной валюте
  async function getInfoCurrency(changedCurrency: TypeCurrency = CURRENCIES[0], side: 'left' | 'right' = 'left') {
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${changedCurrency}`);
      if (res.ok) {
        o = await res.json();
        // Если была изменена левая валюта, то перерасчёт для правого input
        if (side === 'left') {
          rn = o.rates[rightCurrency] * ln;
        } else {
          // Если была изменена правая валюта, то перерасчёт для левого input
          ln = o.rates[leftCurrency] * rn;
        }
      } else {
        throw new Error('some problem');
      }
    } catch (e) {
      throw e;
    }
  }

  // При инициализации приложения получаем объект 'o'
  getInfoCurrency()


  // Функции-хэндлеры для изменения значений
  // в дочерних компонентах

  function changeLeftCurrencyHandler(e: Event) {
    const target = e.target as HTMLSelectElement;
    leftCurrency = (target.value as TypeCurrency);
  }

  function changeRightCurrencyHandler(e: Event) {
    const target = e.target as HTMLSelectElement;
    rightCurrency = (target.value as TypeCurrency);
  }

  function changeLeftNominalHandler(e: Event) {
      const target = e.target as HTMLInputElement;
      leftNominal = (Number(target.value));
  }

  function changeRightNominalHandler(e: Event) {
      const target = e.target as HTMLInputElement;
      rightNominal = (Number(target.value));
  }



  
</script>

<main>
  

  <div class="card">
    <CurrencyPicker value={leftCurrency} handler={changeLeftCurrencyHandler} />
    <CurrencyInput value={ln} handler={changeLeftNominalHandler}/>
  </div>

  <span class="arrows">&#8596;</span>

  <div class="card">
    <CurrencyPicker value={rightCurrency} handler={changeRightCurrencyHandler} />
    <CurrencyInput value={rn} handler={changeRightNominalHandler}/> 
  </div>
  
</main>

<style>
  .card {
    display: inline-block;
  }
  .arrows {
    display: inline-block;
    font-size: xx-large;
    margin: 0px 20px;
  }
</style>
