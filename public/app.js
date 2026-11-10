const list = document.getElementById('paintingList');
const form = document.getElementById('paintingForm');
const placeholder = document.getElementById('placeholder');

const FIELDS = ['Title', 'YearOfWork', 'Medium', 'Width', 'Height', 'Cost', 'MSRP',
  'AccessionNumber', 'CopyrightText', 'MuseumLink', 'WikiLink', 'Excerpt', 'Description'];

fetch('/api/paintings')
  .then((response) => response.json())
  .then((paintings) => {
    console.log(paintings);
    paintings.forEach(addPaintingToList);
  });

function addPaintingToList(painting) {
  const item = document.createElement('div');
  item.className = 'painting-item';

  const img = document.createElement('img');
  img.src = 'art/works/square-medium/' + painting.ImageFileName + '.jpg';
  img.alt = painting.Title;
  img.addEventListener('error', () => {
    img.src = 'static/images/default.svg';
  }, { once: true });

  const link = document.createElement('a');
  link.href = '#';
  link.className = 'button';
  link.textContent = painting.Title;
  
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showForm(painting);
  });

  item.append(img, link);
  list.append(item);
}

function showForm(painting) {
  placeholder.hidden = true;
  form.hidden = false;

  form.action = '/api/paintings/' + painting.PaintingID;
  document.getElementById('paintingIdText').textContent = painting.PaintingID;

  FIELDS.forEach((name) => {
    const value = painting[name] ?? '';
    form.elements[name].value = value;
    form.elements[name].defaultValue = value;
  });
}