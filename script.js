
let jegyek = [];
let selectedGrade = null;

const tantargySelect = document.getElementById('tantargy');
const addBtn = document.getElementById('add-btn');
const gradesList = document.getElementById('grades-list');
const averageDisplay = document.getElementById('average');
const countDisplay = document.getElementById('count');
const gradeButtons = document.querySelectorAll('.grade-btn');

gradeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    gradeButtons.forEach(b => b.classList.remove('selected'));
    e.target.classList.add('selected');
    selectedGrade = parseInt(e.target.dataset.grade);
  });
});

addBtn.addEventListener('click', () => {
  const tantargy = tantargySelect.value;
  
  if (!tantargy) {
    alert('Válassz tantárgyat!');
    return;
  }
  
  if (selectedGrade === null) {
    alert('Válassz jegyet!');
    return;
  }
  
  const datum = new Date().toISOString().split('T')[0];
  jegyek = [...jegyek, { tantargy, jegy: selectedGrade, datum }];
  
  tantargySelect.value = '';
  selectedGrade = null;
  gradeButtons.forEach(b => b.classList.remove('selected'));
  
  megjelenit();
});

function megjelenit() {
  gradesList.innerHTML = jegyek
    .map((item, index) => `
      <li>
        <span>${item.tantargy} - ${item.jegy}</span>
        <small>${item.datum}</small>
        <button onclick="torol(${index})">X</button>
      </li>
    `)
    .join('');
  
  atlagSzamit();
}

function atlagSzamit() {
  if (jegyek.length === 0) {
    averageDisplay.textContent = '0';
    countDisplay.textContent = '0';
    return;
  }
  
  const osszeg = jegyek.reduce((sum, item) => sum + item.jegy, 0);
  const atlag = (osszeg / jegyek.length).toFixed(2);
  
  averageDisplay.textContent = atlag;
  countDisplay.textContent = jegyek.length;
}

function torol(index) {
  jegyek = jegyek.filter((_, i) => i !== index);
  megjelenit();
}
