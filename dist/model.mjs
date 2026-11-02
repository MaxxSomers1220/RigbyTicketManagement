export const STATUSES=['New','In progress','Waiting','Resolved'];
export const PRIORITIES=['Low','Normal','High','Urgent'];
export function validateData(d){
 if(!d||d.version!==1||!Array.isArray(d.projects)||!Array.isArray(d.tickets)||!d.projects.length)throw Error('Choose a Project Desk backup with at least one project.');
 const ids=new Set();for(const p of d.projects){if(typeof p.id!=='string'||ids.has(p.id)||typeof p.name!=='string'||!p.name.trim()||!/^#[0-9a-f]{6}$/i.test(p.color))throw Error('Invalid project data.');ids.add(p.id);}
 const tickets=new Set();for(const t of d.tickets){if(!Number.isSafeInteger(t.id)||t.id<1||tickets.has(t.id)||!ids.has(t.project)||typeof t.title!=='string'||!t.title.trim()||!STATUSES.includes(t.status)||!PRIORITIES.includes(t.priority)||typeof t.description!=='string'||typeof t.due!=='string'||(t.due&&!/^\d{4}-\d{2}-\d{2}$/.test(t.due))||!Number.isFinite(Date.parse(t.created))||!Number.isFinite(Date.parse(t.updated))||!Array.isArray(t.checks)||!Array.isArray(t.history))throw Error('Invalid ticket data.');tickets.add(t.id);for(const c of t.checks)if(typeof c.text!=='string'||typeof c.done!=='boolean')throw Error('Invalid checklist.');for(const h of t.history)if(typeof h.text!=='string'||!Number.isFinite(Date.parse(h.at)))throw Error('Invalid activity history.');}
 return d;
}
export function localDate(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function isOverdue(t,today=localDate()){return !!t.due&&t.due<today&&t.status!=='Resolved';}
export function selectTickets(data,{scope='all',project='',search='',status='',priority=''}={}){const q=search.trim().toLowerCase();return data.tickets.filter(t=>(!project||t.project===project)&&(scope!=='done'||t.status==='Resolved')&&(scope!=='focus'||(t.status!=='Resolved'&&(t.status==='In progress'||['High','Urgent'].includes(t.priority)||!!t.due&&t.due<=localDate())))&&(!status||t.status===status)&&(!priority||t.priority===priority)&&(!q||`${t.id} ${t.title} ${t.description}`.toLowerCase().includes(q))).sort((a,b)=>(a.status==='Resolved')-(b.status==='Resolved')||PRIORITIES.indexOf(b.priority)-PRIORITIES.indexOf(a.priority)||b.updated.localeCompare(a.updated));}
export function nextId(data){return Math.max(0,...data.tickets.map(t=>t.id))+1;}
