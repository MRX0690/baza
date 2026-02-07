const select=document.getElementById('zabieg');
const entriesBox=document.getElementById('entries');

for(let i=1;i<=30;i++){
  const opt=document.createElement('option');
  opt.value=i;
  opt.textContent="Zabieg "+i;
  select.appendChild(opt);
}

function loadEntries(){
  entriesBox.innerHTML="";
  const all=JSON.parse(localStorage.getItem("zapisy")||"{}");
  const zabieg=select.value;
  const list=all[zabieg]||[];
  list.forEach((name,i)=>{
    const div=document.createElement("div");
    div.className="entry";
    div.textContent=`${i+1}. ${name}`;
    entriesBox.appendChild(div);
  });
}

function addEntry(){
  const zabieg=select.value;
  const name=document.getElementById('name').value.trim();
  if(!name) return alert("Podaj imię i nazwisko!");
  let all=JSON.parse(localStorage.getItem("zapisy")||"{}");
  if(!all[zabieg]) all[zabieg]=[];
  if(all[zabieg].length>=10) return alert("Limit 10 osób!");
  all[zabieg].push(name);
  localStorage.setItem("zapisy",JSON.stringify(all));
  document.getElementById('name').value="";
  loadEntries();
}

select.addEventListener("change",loadEntries);
loadEntries();
