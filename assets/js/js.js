const fullText = "Ray Douglas Barreto de Oliveira";
const el = document.querySelector(".name");
let i = 0, deleting = false;

function tick() {
  if (!deleting) {
    el.textContent = fullText.slice(0, ++i);
    if (i === fullText.length) return setTimeout(() => { deleting = true; tick(); }, 1800);
  } else {
    el.textContent = fullText.slice(0, --i);
    if (i === 0) return setTimeout(() => { deleting = false; tick(); }, 400);
  }
  setTimeout(tick, deleting ? 45 : 90);
}

tick();


// cards
function typeText(el, segments, speed, onDone) {
  el.innerHTML = '<span class="cursor"></span>';
  const cursor = el.querySelector('.cursor');

  const nodes = [];
  segments.forEach(seg => {
    const node = seg.bold
      ? document.createElement('strong')
      : document.createTextNode('');
    el.insertBefore(node, cursor);
    nodes.push({ node, seg });
  });

  let segIdx = 0, charIdx = 0;

  function type() {
    if (segIdx >= nodes.length) { if (onDone) onDone(); return; }
    const { node, seg } = nodes[segIdx];
    if (charIdx < seg.text.length) {
      if (seg.bold) node.textContent = seg.text.slice(0, charIdx + 1);
      else node.nodeValue += seg.text[charIdx];
      charIdx++;
      setTimeout(type, speed);
    } else {
      segIdx++; charIdx = 0;
      setTimeout(type, speed * 2);
    }
  }
  setTimeout(type, 400);
}



const p1 = document.querySelector('#formacao ul li:nth-child(1) p');
const p2 = document.querySelector('#formacao ul li:nth-child(2) p');

typeText(p1, [
  { text: 'Técnico em Informática - ', bold: false },
  { text: 'COMPLETO', bold: true }
], 45, () => {
  typeText(p2, [
    { text: 'Graduando em Análise e Desenvolvimento de Sistemas - ', bold: false },
    { text: 'CURSANDO', bold: true }
  ], 35);
});