const sourceJson = `{
  "event": {
    "title": "Ночь в музее",
    "date": "15 ноября, 18:30",
    "place": "Музей космонавтики, проспект Мира, 111",
    "description": "Вечерняя программа с выставкой и экскурсиями",
    "meeting": "Сбор: 18:30. Начало: 19:00."
  },
  "services": [
    { "id": "guide", "title": "  Экскурсия с гидом  ", "price": 500 },
    { "id": "audio", "title": "Аудиогид", "price": 350 },
    { "id": "catalog", "title": "Каталог выставки", "price": 250 }
  ]
}`;

let data = null;

try {
  data = JSON.parse(sourceJson);
} catch (e) {
  data = null;
}

const eventTitle = document.querySelector('#event-title');
const showProgram = document.querySelector('#show-program');
const program = document.querySelector('#program');
const form = document.querySelector('#service-form');
const guideCheckbox = document.querySelector('#guide');
const audioCheckbox = document.querySelector('#audio');
const catalogCheckbox = document.querySelector('#catalog');
const choiceError = document.querySelector('#choice-error');
const dataError = document.querySelector('#data-error');
const result = document.querySelector('#result');
const reportJson = document.querySelector('#report-json');

function buildReport(services, guideChecked, audioChecked, catalogChecked) {
  const items = services
    .filter((service) => {
      if (service.id === 'guide') return guideChecked;
      if (service.id === 'audio') return audioChecked;
      if (service.id === 'catalog') return catalogChecked;
      return false;
    })
    .map(({ title, price }) => ({ title: title.trim(), price }));

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return {
    count: items.length,
    total: total,
    items: items
  };
}

if (data) {
  form.hidden = false;

  showProgram.addEventListener('click', () => {
    program.hidden = false;
    program.innerHTML = data.event.meeting;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const guideChecked = guideCheckbox.checked;
    const audioChecked = audioCheckbox.checked;
    const catalogChecked = catalogCheckbox.checked;

    const report = buildReport(data.services, guideChecked, audioChecked, catalogChecked);

    if (report.count === 0) {
      choiceError.hidden = false;
      result.hidden = true;
      reportJson.hidden = true;
      return;
    }

    choiceError.hidden = true;

    let html = 'Выбрано услуг: ' + report.count + '<br>Итого: ' + report.total + ' руб.';
    report.items.forEach((item) => {
      html += '<br>' + item.title;
    });
    result.innerHTML = html;
    result.hidden = false;

    const jsonString = JSON.stringify(report);
    JSON.parse(jsonString);
    reportJson.textContent = jsonString;
    reportJson.hidden = false;
  });
} else {
  dataError.hidden = false;
  form.hidden = true;
}