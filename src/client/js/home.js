const yeoroBtn = document.querySelector('#vanishing-journey');
const chuChuIsland = document.querySelector('#chu-chu-island');
const lachelein = document.querySelector('#lachelein');
const arcana = document.querySelector('#arcana');
const morass = document.querySelector('#morass');
const esfera = document.querySelector('#esfera');
const cernium = document.querySelector('#cernium');
const burningCernium = document.querySelector('#burning-cernium');
const hotelArcs = document.querySelector('#hotel-arcs');
const odium = document.querySelector('#odium');

const yeoroSwitch = () => {
  yeoroBtn.classList.toggle('home-container__quest--gray');
};

const chuChuSwitch = () => {
  chuChuIsland.classList.toggle('home-container__quest--gray');
};

const lacheleinSwitch = () => {
  lachelein.classList.toggle('home-container__quest--gray');
};

const arcanaSwitch = () => {
  arcana.classList.toggle('home-container__quest--gray');
};

const morassSwitch = () => {
  morass.classList.toggle('home-container__quest--gray');
};

const esferaSwitch = () => {
  esfera.classList.toggle('home-container__quest--gray');
};

const cerniumSwitch = () => {
  cernium.classList.toggle('home-container__quest--gray');
};

const burningCerniumSwitch = () => {
  burningCernium.classList.toggle('home-container__quest--gray');
};

const hotelArcsSwitch = () => {
  hotelArcs.classList.toggle('home-container__quest--gray');
};

const odiumSwitch = () => {
  odium.classList.toggle('home-container__quest--gray');
};

yeoroBtn.addEventListener('click', yeoroSwitch);
chuChuIsland.addEventListener('click', chuChuSwitch);
lachelein.addEventListener('click', lacheleinSwitch);
arcana.addEventListener('click', arcanaSwitch);
morass.addEventListener('click', morassSwitch);
esfera.addEventListener('click', esferaSwitch);
cernium.addEventListener('click', cerniumSwitch);
burningCernium.addEventListener('click', burningCerniumSwitch);
hotelArcs.addEventListener('click', hotelArcsSwitch);
odium.addEventListener('click', odiumSwitch);
