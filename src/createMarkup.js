export function createMarkup({ flags, name }) {
  return `<li class="country-list__item">
      <img
        class="country-list__flag"
        src="${flags.svg}"
        width="30px"
        height="20px"
      />
      <p class="country-list__name">${name.official}</p>
    </li>`;
}

export function createFullMarkup({ flags, name, capital, population, languages }) {
    const langStr = Object.values(languages).join(',');
    return `<div class = "country-info"> 
    <ul class="country-list">
     <li class="country-list__item">
      <p class = "country-list__name"> ${name.official} </p>
      </li>
      <li class="country-list__item">
        <img class="country-list__flag"
        src="${flags.svg}" alt="Прапор країни" 
        width="30px"
        height="20px">
      </li>
      <li class="country-list__item">
      <p class = "country-list__capital">Столиця: ${capital} </p>
      </li>
      <li class="country-list__item">
      <p class = "country-list__population">Населення: ${population} </p>
      </li>
      <li class="country-list__item">
      <p class = "country-list__languages">Мова: ${langStr} </p>
      </li>
    </ul>
</div>`
}
