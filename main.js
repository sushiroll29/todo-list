(()=>{"use strict";function t(t,e){const n=document.createElement("label");return n.setAttribute("label",t),n.textContent=e,n}function e(t,e,n,d){const o=document.createElement("input");return o.setAttribute("type",t),o.setAttribute("id",e),o.setAttribute("placeholder",n),1===d?o.setAttribute("required",""):o.removeAttribute("required"),o}let n=[];const d=(t,e,n,d)=>({title:t,description:e,dueDate:n,priority:d});function o(t){n.push(t)}const i=d("a","b","c","d"),r=d("x","y","z","w");document.querySelector(".new-task-btn").addEventListener("click",(()=>{document.querySelector("#new-task-form")||function(){const n=document.querySelector(".new-task-container"),d=document.createElement("div");d.classList.add("popup"),d.id="new-task-form",n.appendChild(d);const o=document.createElement("form");o.classList.add("form"),o.id="form",o.action="",d.appendChild(o),o.appendChild(t("title","Title")),o.appendChild(e("text","task-title","Name your task",1)),o.appendChild(t("description","Description")),o.appendChild(e("text","task-description","Describe your task","")),o.appendChild(t("date","Due date")),o.appendChild(e("date","task-duedate","",""));const i=document.createElement("fieldset");o.appendChild(i);const r=document.createElement("legend");r.textContent="Priority",i.appendChild(r);const c=document.createElement("div");c.setAttribute("id","priority-content"),i.appendChild(c);const a=["Low","Medium","High"];for(let e=0;e<a.length;e++){const n=document.createElement("input");n.setAttribute("type","radio"),n.setAttribute("id",`priority-${a[e].toLowerCase()}`),n.setAttribute("value",`${a[e].toLowerCase()}`),n.setAttribute("name","task-priority"),c.appendChild(n),c.appendChild(t(`priority-${a[e].toLowerCase()}`,`${a[e]}`))}const s=document.createElement("div");s.classList.add("form-button"),o.appendChild(s);const u=document.createElement("button");u.setAttribute("type","submit"),u.setAttribute("id","submit-btn"),u.textContent="Add",s.appendChild(u),o.addEventListener("submit",(t=>function(t){t.preventDefault();const e=document.querySelector("#task-title").value,n=document.querySelector("#task-description").value,d=document.querySelector("#task-duedate").value,o=document.querySelector('input[name="task-priority"]:checked').value;(function(){const t=document.querySelector("#form");document.querySelectorAll('input[type="text"]').forEach((t=>t.value="")),t.style.display="none"})(),console.log(e,n,d,o)}(t)))}()})),o(i),o(r),n.forEach((t=>{!function(t){const e=document.querySelector(".container"),n=document.createElement("div");n.classList.add("task-card");const d=document.createElement("p");d.classList.add("task-card-title"),d.textContent=`Task: ${t.title}`;const o=document.createElement("p");o.classList.add("task-card-description"),o.textContent=`Description: ${t.description}`;const i=document.createElement("p");i.classList.add("task-card-date"),i.textContent=`Due date: ${t.dueDate}`;const r=document.createElement("p");r.classList.add("task-card-priority"),r.textContent=`Priority: ${t.priority}`,n.append(d,o,i,r),e.appendChild(n)}(t)}))})();