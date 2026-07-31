const PHONE = "201119995518";
const classes = [
  {id:1,grade:4,track:"standard",subject:"حساب",group:"المجموعة الأساسية",icon:"∑",sessions:[["الجمعة","9:00 ص – 10:00 ص"],["الاثنين","1:30 م – 2:30 م"]],start:"2026-07-31",startText:"الجمعة 31 يوليو 2026"},
  {id:2,grade:4,track:"standard",subject:"علوم",group:"المجموعة الأساسية",icon:"⚛",sessions:[["السبت","11:00 ص – 12:00 م"],["الأربعاء","3:00 م – 4:00 م"]],start:"2026-08-01",startText:"السبت 1 أغسطس 2026"},
  {id:3,grade:5,track:"standard",subject:"حساب",group:"المجموعة الأساسية",icon:"∑",sessions:[["الجمعة","3:00 م – 4:00 م"],["الثلاثاء","1:30 م – 2:30 م"]],start:"2026-07-31",startText:"الجمعة 31 يوليو 2026"},
  {id:4,grade:5,track:"standard",subject:"علوم",group:"المجموعة الأساسية",icon:"⚛",sessions:[["السبت","3:00 م – 4:00 م"],["الثلاثاء","3:00 م – 4:00 م"]],start:"2026-08-01",startText:"السبت 1 أغسطس 2026"},
  {id:5,grade:6,track:"standard",subject:"حساب",group:"المجموعة الأساسية",icon:"∑",sessions:[["السبت","9:00 ص – 10:00 ص"],["الأربعاء","1:30 م – 2:30 م"]],start:"2026-08-01",startText:"السبت 1 أغسطس 2026"},
  {id:6,grade:6,track:"standard",subject:"علوم",group:"المجموعة الأساسية",icon:"⚛",sessions:[["الأحد","3:00 م – 4:00 م"],["الخميس","3:00 م – 4:00 م"]],start:"2026-08-02",startText:"الأحد 2 أغسطس 2026"},
  {id:7,grade:4,track:"intensive",subject:"حساب",group:"المجموعة المكثفة الأولى",icon:"∑",sessions:[["السبت","12:00 م – 1:00 م"],["الأربعاء","4:00 م – 5:00 م"]],start:"2026-08-01",startText:"السبت 1 أغسطس 2026"},
  {id:8,grade:4,track:"intensive",subject:"حساب",group:"المجموعة المكثفة الثانية",icon:"∑",sessions:[["الأحد","1:30 م – 2:30 م"],["الخميس","1:00 م – 2:00 م"]],start:"2026-08-02",startText:"الأحد 2 أغسطس 2026"},
  {id:9,grade:5,track:"intensive",subject:"حساب",group:"المجموعة المكثفة الأولى",icon:"∑",sessions:[["الجمعة","10:00 ص – 11:00 ص"],["الاثنين","4:00 م – 5:00 م"]],start:"2026-07-31",startText:"الجمعة 31 يوليو 2026"},
  {id:10,grade:5,track:"intensive",subject:"حساب",group:"المجموعة المكثفة الثانية",icon:"∑",sessions:[["السبت","4:00 م – 5:00 م"],["الثلاثاء","4:00 م – 5:00 م"]],start:"2026-08-01",startText:"السبت 1 أغسطس 2026"},
  {id:11,grade:6,track:"intensive",subject:"حساب",group:"المجموعة المكثفة الأولى",icon:"∑",sessions:[["الجمعة","4:00 م – 5:00 م"],["الاثنين","3:00 م – 4:00 م"]],start:"2026-07-31",startText:"الجمعة 31 يوليو 2026"},
  {id:12,grade:6,track:"intensive",subject:"حساب",group:"المجموعة المكثفة الثانية",icon:"∑",sessions:[["الأحد","4:00 م – 5:00 م"],["الخميس","4:00 م – 5:00 م"]],start:"2026-08-02",startText:"الأحد 2 أغسطس 2026"}
];

const gradeNames={4:"الصف الرابع الابتدائي",5:"الصف الخامس الابتدائي",6:"الصف السادس الابتدائي"};
let activeTrack="all",activeGrade="all";
const grid=document.getElementById("scheduleGrid"), emptyState=document.getElementById("emptyState");

function cardTemplate(item){
  const accent=item.subject==="علوم"?"#00a896":"#165dff";
  const soft=item.subject==="علوم"?"#dcf7f1":"#e7efff";
  return `<article class="class-card" style="--card-accent:${accent};--card-soft:${soft}">
    <div class="card-top"><div class="subject-icon">${item.icon}</div><span class="track-pill ${item.track}">${item.track==="standard"?"أساسية":"مكثفة"}</span></div>
    <h3>${item.subject} • ${gradeNames[item.grade]}</h3><div class="subtitle">${item.group}</div>
    <div class="session-list">${item.sessions.map(s=>`<div class="session"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div>
    <div class="start-date"><span>بداية الدراسة</span><strong>${item.startText}</strong></div>
    <button class="card-action" data-id="${item.id}">عرض التفاصيل والحجز</button>
  </article>`;
}
function render(){
  const filtered=classes.filter(x=>(activeTrack==="all"||x.track===activeTrack)&&(activeGrade==="all"||String(x.grade)===activeGrade));
  grid.innerHTML=filtered.map(cardTemplate).join("");
  emptyState.hidden=filtered.length>0;
  document.querySelectorAll(".card-action").forEach(b=>b.addEventListener("click",()=>openModal(Number(b.dataset.id))));
}
function bindFilters(container,kind){
  document.querySelectorAll(`#${container} button`).forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll(`#${container} button`).forEach(x=>x.classList.remove("active"));btn.classList.add("active");
    if(kind==="track")activeTrack=btn.dataset.track;else activeGrade=btn.dataset.grade;render();
  }));
}
bindFilters("trackFilters","track");bindFilters("gradeFilters","grade");

const modal=document.getElementById("bookingModal");
function openModal(id){
  const item=classes.find(x=>x.id===id);if(!item)return;
  document.getElementById("modalIcon").textContent=item.icon;
  document.getElementById("modalTitle").textContent=`${item.subject} • ${gradeNames[item.grade]}`;
  document.getElementById("modalDetails").innerHTML=`<b>${item.group}</b><br>${item.sessions.map(s=>`${s[0]}: ${s[1]}`).join("<br>")}<br><b>بداية الدراسة:</b> ${item.startText}`;
  const msg=`مساء الخير، أريد الاستفسار والحجز في ${item.subject} - ${gradeNames[item.grade]} - ${item.group}.`;
  document.getElementById("modalWhatsapp").href=`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;
  modal.showModal();
}
document.getElementById("modalClose").addEventListener("click",()=>modal.close());
modal.addEventListener("click",e=>{const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close()});

function setNextClass(){
  const now=new Date();
  const future=[...classes].sort((a,b)=>new Date(a.start)-new Date(b.start)).find(x=>new Date(`${x.start}T23:59:59`)>=now) || classes[0];
  document.getElementById("nextClassTitle").textContent=`${future.subject} • ${gradeNames[future.grade]}`;
  document.getElementById("nextClassTime").textContent=`${future.startText} — ${future.sessions[0][1]}`;
}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
document.addEventListener("mousemove",e=>{const g=document.querySelector(".cursor-glow");g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"});
document.getElementById("year").textContent=new Date().getFullYear();
render();setNextClass();
