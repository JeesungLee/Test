'use strict';
const state = { chapters: [] };
const input = document.getElementById('q');
const list = document.getElementById('list');
const count = document.getElementById('count');
const empty = document.getElementById('empty');
const error = document.getElementById('error');
const clear = document.getElementById('clear');
function strongMarkup(text) {
  // Only the **bold** notation in our local report data is interpreted as formatting.
  // All original content is inserted as text nodes rather than HTML.
  const fragment = document.createDocumentFragment();
  String(text).split(/(\*\*[^*]+\*\*)/g).forEach(part => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const strong = document.createElement('strong');
      strong.textContent = part.slice(2, -2);
      fragment.append(strong);
    } else { fragment.append(document.createTextNode(part)); }
  });
  return fragment;
}
function render() {
  const keyword = input.value.trim().toLocaleLowerCase('ko');
  const matching = state.chapters.filter(c => !keyword || `${c.제목} ${c.본문}`.toLocaleLowerCase('ko').includes(keyword));
  list.replaceChildren();
  for (const chapter of matching) {
    const card = document.createElement('article');card.className='card';
    const top=document.createElement('div');top.className='card-top';
    const label=document.createElement('span');label.className='label';label.textContent=`제 ${chapter.장} 장`;top.append(label);
    const title=document.createElement('h3');title.textContent=chapter.제목;
    const body=document.createElement('div');body.className='body';body.append(strongMarkup(chapter.본문));
    card.append(top,title,body);list.append(card);
  }
  count.textContent=`${matching.length}건 / 전체 ${state.chapters.length}건`;
  empty.hidden = matching.length !== 0;
  clear.hidden = !input.value;
}
async function load() {
  error.hidden=true;empty.hidden=true;
  count.textContent='불러오는 중…';
  try {
    const response = await fetch('./장데이터.json', {cache:'no-cache'});
    if (!response.ok) throw new Error('HTTP '+response.status);
    const json = await response.json();
    if (!Array.isArray(json) || !json.every(x=>x && typeof x.장==='string' && typeof x.제목==='string' && typeof x.본문==='string')) throw new Error('Invalid data');
    state.chapters=json;
    render();
  } catch(e) { console.error(e);state.chapters=[];list.replaceChildren();count.textContent='읽기 실패';error.hidden=false; }
}
input.addEventListener('input',render);
clear.addEventListener('click',()=>{input.value='';render();input.focus()});
document.getElementById('retry').addEventListener('click',load);
load();
