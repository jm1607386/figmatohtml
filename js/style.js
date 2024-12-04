const music1 = document.getElementById('music_1');
const music2 = document.getElementById('music_2');
const music3 = document.getElementById('music_3');
const music4 = document.getElementById('music_4');
const music5 = document.getElementById('music_5');

const radioButton1 = document.getElementById('radioButton3');
const radioButton2 = document.getElementById('radioButton4');
const radioButton3 = document.getElementById('radioButton5');
const radioButton4 = document.getElementById('radioButton6');
const radioButton5 = document.getElementById('radioButton7');

const sound1 = document.getElementById('sound_1');
const sound2 = document.getElementById('sound_2');
const sound3 = document.getElementById('sound_3');
const sound4 = document.getElementById('sound_4');
const sound5 = document.getElementById('sound_5');

const path1 = sound1.querySelector('path');
const path2 = sound2.querySelector('path');
const path3 = sound3.querySelector('path');
const path4 = sound4.querySelector('path');
const path5 = sound5.querySelector('path');




radioButton1.addEventListener('click', () => {
    path1.setAttribute('fill', 'white');
    path2.setAttribute('fill', '#5d5d5d');
    path3.setAttribute('fill', '#5d5d5d');
    path4.setAttribute('fill', '#5d5d5d');
    path5.setAttribute('fill', '#5d5d5d');
    music1.classList.remove('hidden');
    music2.classList.add('hidden');
    music3.classList.add('hidden');
    music4.classList.add('hidden');
    music5.classList.add('hidden');
});

radioButton2.addEventListener('click', () => {
    path2.setAttribute('fill', 'white');
    path1.setAttribute('fill', '#5d5d5d');
    path3.setAttribute('fill', '#5d5d5d');
    path4.setAttribute('fill', '#5d5d5d');
    path5.setAttribute('fill', '#5d5d5d');
    music2.classList.remove('hidden');
    music1.classList.add('hidden');
    music3.classList.add('hidden');
    music4.classList.add('hidden');
    music5.classList.add('hidden');
});

radioButton3.addEventListener('click', () => {
    path3.setAttribute('fill', 'white');
    path2.setAttribute('fill', '#5d5d5d');
    path1.setAttribute('fill', '#5d5d5d');
    path4.setAttribute('fill', '#5d5d5d');
    path5.setAttribute('fill', '#5d5d5d');
    music3.classList.remove('hidden');
    music1.classList.add('hidden');
    music2.classList.add('hidden');
    music4.classList.add('hidden');
    music5.classList.add('hidden');
});

radioButton4.addEventListener('click', () => {
    path4.setAttribute('fill', 'white');
    path2.setAttribute('fill', '#5d5d5d');
    path3.setAttribute('fill', '#5d5d5d');
    path1.setAttribute('fill', '#5d5d5d');
    path5.setAttribute('fill', '#5d5d5d');
    music4.classList.remove('hidden');
    music1.classList.add('hidden');
    music2.classList.add('hidden');
    music3.classList.add('hidden');
    music5.classList.add('hidden');
});

radioButton5.addEventListener('click', () => {
    path5.setAttribute('fill', 'white');
    path2.setAttribute('fill', '#5d5d5d');
    path3.setAttribute('fill', '#5d5d5d');
    path4.setAttribute('fill', '#5d5d5d');
    path1.setAttribute('fill', '#5d5d5d');
    music5.classList.remove('hidden');
    music1.classList.add('hidden');
    music3.classList.add('hidden');
    music4.classList.add('hidden');
    music2.classList.add('hidden');
});