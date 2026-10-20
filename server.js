// LOOPBREAK — bot + Mini App serveri. Faqat Node 18+, paket o'rnatish shart emas.
const http=require('http'),fs=require('fs'),crypto=require('crypto'),path=require('path');
const {BOT_TOKEN:T,WEBAPP_URL:WU,ANTHROPIC_API_KEY:AK,PORT=3000}=process.env,ADMIN=process.env.ADMIN||'@wxs_z';
const DBF=process.env.DB_FILE||'db.json';
let db={u:{},s:{},r:{}};try{db=JSON.parse(fs.readFileSync(DBF))}catch{}
let tm;const save=()=>{clearTimeout(tm);tm=setTimeout(()=>fs.writeFile(DBF,JSON.stringify(db),()=>{}),400)};
const tg=(m,b)=>fetch(`https://api.telegram.org/bot${T}/${m}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)}).then(r=>r.json()).catch(()=>({}));
const rng=s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
const ri=(r,a,b)=>a+Math.floor(r()*(b-a+1)),pick=(r,a)=>a[Math.floor(r()*a.length)];
const norm=s=>String(s??'').toLowerCase().replace(/\s+/g,'').replace(/[‘’`ʻʼ]/g,"'").replace(/\./g,':');
const f2=n=>String(n).padStart(2,'0'),fmt=t=>{t=((t%1440)+1440)%1440;return f2(t/60|0)+':'+f2(t%60)};
const W=['KALIT','DARYO','MASHAL','KOPRIK','SOYA','LABIRINT','ZANJIR','QULF','OYNA','XARITA','SHAMOL','TUMAN','XIYONAT','ARXIV'];
const NM=['Anvar','Bobur','Dilnoza','Eldor','Farida','Gulnora','Hasan'];
const EV=["signal yoqildi","kamera o'chdi","eshik ochildi","generator to'xtadi","sirena jim bo'ldi","lift to'xtadi","chiroq o'chdi"];
// ---------- Jumboq generatorlari: {c:ma'lumotlar, q:savol, a:javob, h:maslahat} ----------
const G={};
G.cipher=(r,d)=>{const w=pick(r,W.filter(x=>x.length<=4+d)),s=ri(r,2,24),alt=d>=5,rev=d>=3;
 const sh=(c,k)=>String.fromCharCode((c.charCodeAt(0)-65+k+52)%26+65);
 let t=[...w].map((c,i)=>sh(c,alt&&i%2?-s:s)).join('');if(rev)t=[...t].reverse().join('');
 const c=[`Topilgan yozuv: ${t}`,`Kalit: har bir harf alifboda ${s} qadam oldinga surilgan${alt?`, faqat juft o'rindagi (2,4,6...) harflar ${s} qadam ORQAGA`:''}.`];
 if(rev)c.push("Yozuv oxiridan boshlab teskari yozilgan.");
 return{c,q:"Yashirin so'z qanday?",a:w,h:`So'z "${w[0]}" harfi bilan boshlanadi`}};
G.liar=(r,d)=>{const n=Math.min(3+Math.ceil(d/2),7),L=d>=5?2:1,nm=NM.slice(0,n);
 for(let k=0;k<4000;k++){const S=nm.map((_,i)=>({i,j:ri(r,0,n-1),neg:r()<.4}));const sol=[];
  for(let t=0;t<n;t++){const lies=S.filter(s=>s.neg?t===s.j:t!==s.j).length;if(lies===L)sol.push(t)}
  if(sol.length===1)return{c:S.map(s=>`${nm[s.i]}: "${s.neg?nm[s.j]+' emas':"O'g'ri — "+nm[s.j]}"`),q:`Aniq ${L} kishi yolg'on gapirmoqda. O'g'ri kim? (ism)`,a:nm[sol[0]],h:`Ism "${nm[sol[0]][0]}" harfi bilan boshlanadi`}}
 return G.cipher(r,d)};
G.lock=(r,d)=>{const k=Math.min(3+(d>>1),6),D=[],c=[];
 for(let i=0;i<k;i++){const t=ri(r,0,i&&d>=3?3:2);let x,s;
  if(t==0){const a=ri(r,2,9),b=ri(r,2,9);x=a*b%10;s=`${a} × ${b} natijasining oxirgi raqami`}
  else if(t==1){const a=ri(r,10,99),b=ri(r,10,99);x=(a+b)%10;s=`${a} + ${b} yig'indisining oxirgi raqami`}
  else if(t==2){const a=ri(r,50,99),b=ri(r,1,49);x=(a-b)%10;s=`${a} − ${b} ayirmasining oxirgi raqami`}
  else{const j=ri(r,0,i-1),n=ri(r,1,9);x=(D[j]+n)%10;s=`${j+1}-raqam + ${n} yig'indisining oxirgi raqami`}
  D.push(x);c.push(`${i+1}-raqam: ${s}`)}
 const rv=d>=6;if(rv)c.push("Qulf kodi TESKARI tartibda (oxirgi raqamdan boshlab) kiritiladi.");
 const a=(rv?[...D].reverse():D).join('');return{c,q:`${k} xonali qulf kodi?`,a,h:`Kod ${a[0]} raqami bilan boshlanadi`}};
const SF=[(a,b)=>i=>a+b*i,(a,b)=>i=>a*b**i,(a,b,c)=>i=>i*i+c%9,(a,b,c)=>i=>i%2?c-(i>>1)*b:a+(i>>1)*b,(a,b)=>{const x=[a,b];for(let i=2;i<12;i++)x[i]=x[i-1]+x[i-2];return i=>x[i]},(a,b)=>i=>a+b*i*(i+1)/2];
G.seq=(r,d)=>{const lo=Math.max(0,Math.min(d,6)-3),hi=Math.min(d+1,5),k=ri(r,lo,hi),a=ri(r,1,9),b=ri(r,2,4),c=ri(r,30,60),f=SF[k](a,b,c);
 const idx=d>=6?7:6,sh=[0,1,2,3,4,5].map(f);
 return{c:[`Eshik paneli chiroqlari ketma-ket: ${sh.join(', ')}`],q:`${idx+1}-qiymat nechta?`,a:String(f(idx)),h:"Qo'shni sonlar orasidagi farqlarga e'tibor bering"}};
G.timeline=(r,d)=>{const k=Math.min(2+(d>>1),7),T0=ri(r,1200,1380),t=[T0],c=[`Soat ${fmt(T0)} da ${EV[0]}.`];
 for(let i=1;i<k;i++){const x=ri(r,3,20+d*3),s=r()<.5?-1:1,ref=d>=4?ri(r,0,i-1):i-1;t[i]=t[ref]+s*x;
  c.push(`"${EV[i]}" — "${EV[ref]}" dan ${x} daqiqa ${s>0?'keyin':'oldin'}.`)}
 return{c,q:`"${EV[k-1]}" soat nechada? (SS:DD)`,a:fmt(t[k-1]),h:`Boshlang'ich vaqt ${fmt(T0)}`}};
G.evid=(r,d,ev)=>{const es=Object.entries(ev).sort(()=>r()-.5);while(es.length<3)es.push(['?',{n:ri(r,10,99),w:pick(r,W)}]);
 const[[a,A],[b,B],[c,C]]=es,v=ri(r,0,1),nm=(k,x,t)=>k==='?'?`zaxira dalil (raqam ${x.n}, so'z ${x.w})`:`${k}-bob dalilining ${t}`;
 return{c:["Kod yig'ib olingan dalillardan tuziladi (Dalillar ro'yxati).","Natija probelsiz, bir qatorda yoziladi."],
  q:v?`${nm(a,A,'raqami')} va ${nm(b,B,'raqami')} ayirmasi (modul), so'ng ${nm(c,C,"so'zining dastlabki 2 harfi")}.`:`${nm(a,A,'raqami')} + ${nm(b,B,'raqami')}, so'ng ${nm(c,C,"so'zidagi harflar soni")}.`,
  a:v?`${Math.abs(A.n-B.n)}${C.w.slice(0,2)}`:`${A.n+B.n}${C.w.length}`,h:"Dalillar ro'yxatini diqqat bilan tekshiring"}};
G.evall=(r,d,ev)=>{const v=Object.values(ev),s=v.reduce((x,y)=>x+y.n,0);return{c:["Mexanizm barcha topilgan dalillarni talab qiladi."],q:`Barcha ${v.length} dalilning RAQAMLARI yig'indisi?`,a:String(s),h:"Har bir bobdan bitta raqam bor"}};
const perms=a=>a.length<2?[a]:a.flatMap((x,i)=>perms([...a.slice(0,i),...a.slice(i+1)]).map(p=>[x,...p]));
const kp=(k,u=[])=>k?[0,1,2,3,4,5,6,7,8,9].filter(x=>!u.includes(x)).flatMap(x=>kp(k-1,[...u,x]).map(p=>[x,...p])):[[]];
const KP={},sc=(g,s)=>{let a=0,b=0;g.forEach((x,i)=>{if(s[i]===x)a++;else if(s.includes(x))b++});return a*10+b};
G.mind=(r,d)=>{const k=d>=6?5:d>=3?4:3,ALL=KP[k]||=kp(k),S=pick(r,ALL),c=[];let C=ALL;
 for(let t=0;t<80&&C.length>1;t++){const g=pick(r,ALL),v=sc(g,S),N=C.filter(x=>sc(g,x)===v);if(N.length<C.length){C=N;c.push(`${g.join('')} → ${Math.floor(v/10)} ta raqam o'z joyida, ${v%10} ta raqam bor, lekin joyi noto'g'ri`)}}
 return{c,q:`${k} xonali maxfiy kod? (raqamlar takrorlanmaydi)`,a:S.join(''),h:`Kod ${S[0]} raqami bilan boshlanadi`}};
G.order=(r,d)=>{const n=Math.min(4+(d>>1),7),nm=NM.slice(0,n),T=[...nm].sort(()=>r()-.5);let C=perms(nm);const c=[];
 for(let t=0;t<200&&C.length>1;t++){const i=ri(r,0,n-2),j=ri(r,i+1,n-1),ty=ri(r,0,4);let f,s;
  if(ty==0){s=`${T[i]} ${T[j]} dan oldin kirdi`;f=o=>o.indexOf(T[i])<o.indexOf(T[j])}
  else if(ty==1){s=`${T[i]} dan keyin darhol ${T[i+1]} kirdi`;f=o=>o.indexOf(T[i+1])===o.indexOf(T[i])+1}
  else if(ty==2){const x=T[ri(r,1,n-1)];s=`${x} birinchi kirmadi`;f=o=>o[0]!==x}
  else if(ty==3){const x=T[ri(r,0,n-2)];s=`${x} oxirgi kirmadi`;f=o=>o[n-1]!==x}
  else{const p=ri(r,0,n-1);s=`${T[p]} ${p%2?'juft':'toq'} o'rinda kirdi (1-o'rin = birinchi)`;f=o=>o.indexOf(T[p])===p?true:false}
  if(ty==4){const p=T.findIndex((_,q)=>s.startsWith(T[q]));const pp=T.indexOf(s.split(' ')[0]);f=o=>(o.indexOf(s.split(' ')[0])+1)%2===(pp%2?0:1)}
  const N=C.filter(f);if(N.length<C.length&&N.length>0){C=N;c.push(s+'.')}}
 return{c,q:"Xonaga kirish tartibi? Ismlarning bosh harflarini birinchi kirgandan boshlab yozing (masalan ABD).",a:T.map(x=>x[0]).join(''),h:`Birinchi kirgan: ${T[0]}`}};
G.dial=(r,d)=>{const k=Math.min(3+(d>>2),5),n=Math.min(4+d,12),s=Array.from({length:k},()=>ri(r,0,9)),c=[`0) Disklar boshida: ${s.join(' ')} (0 dan 9 gacha, 9 dan keyin yana 0)`];
 for(let i=1;i<=n;i++){const t=ri(r,0,3),a=ri(r,0,k-1);let b=ri(r,0,k-1);if(b===a)b=(a+1)%k;
  if(t==0){const x=ri(r,1,9);s[a]=(s[a]+x)%10;c.push(`${i}) ${a+1}-diskni ${x} ga oldinga buring`)}
  else if(t==1){s[a]=(s[a]+s[b])%10;c.push(`${i}) ${a+1}-diskka ${b+1}-disk qiymatini qo'shing`)}
  else if(t==2){[s[a],s[b]]=[s[b],s[a]];c.push(`${i}) ${a+1}- va ${b+1}-disklar o'rnini almashtiring`)}
  else{s[a]=s[a]*2%10;c.push(`${i}) ${a+1}-disk qiymatini 2 ga ko'paytiring (oxirgi raqami qoladi)`)}}
 return{c,q:`Amallar tartib bilan bajarilgach disklar qanday holatda? (${k} raqam)`,a:s.join(''),h:`Birinchi disk: ${s[0]}`}};
G.vig=(r,d,ev,prev)=>{const es=Object.entries(ev).filter(([,v])=>v.w.length>=3);let key,src='';
 if(prev&&/^[A-Za-z]{3,8}$/.test(prev)&&r()<.5){key=prev.toUpperCase();src='oldingi qadam javobi'}
 else if(es.length&&r()<.7){const[e,v]=pick(r,es);key=v.w;src=`${e}-bob dalilining so'zi`}
 else key=pick(r,W.filter(x=>x.length<=5));
 const w=pick(r,W.filter(x=>x.length>=5)),t=[...w].map((c,i)=>String.fromCharCode((c.charCodeAt(0)-65+key.charCodeAt(i%key.length)-64)%26+65)).join('');
 return{c:[`Shifrlangan yozuv: ${t}`,`Kalit so'z: ${src?src+' (eslang yoki dalillarni tekshiring)':key}`,"Qoida: har harf kalit so'zning mos harfi qadar oldinga surilgan (A=1, B=2, C=3...). Kalit so'z harflari takrorlanib boradi."],q:"Yashirin so'z qanday?",a:w,h:`So'z "${w[0]}" harfi bilan boshlanadi`}};
G.bin=(r,d)=>{const w=pick(r,W.filter(x=>x.length<=5+d)),c=[...w].map(ch=>(ch.charCodeAt(0)-64).toString(2).padStart(5,'0').replace(/1/g,'●').replace(/0/g,'○'));
 return{c:[`Chiroqlar (● yonib turibdi, ○ o'chiq): ${c.join('  ')}`,"Har bir beshlik — ikkilik (binar) son. Son alifbodagi o'rin: A=1, B=2, C=3 ..."],q:"Yashirin so'z?",a:w,h:`So'z "${w[0]}" harfi bilan boshlanadi`}};
const MC={A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..'};
G.morse=(r,d)=>{const w=pick(r,W.filter(x=>x.length<=4+d)),rv=d>=4,t=[...w].map(c=>MC[c]);if(rv)t.reverse();
 return{c:[`Signal: ${t.join(' / ')}`,'Morze jadvali: '+Object.entries(MC).map(([k,v])=>k+' '+v).join(', '),...(rv?["Signal oxiridan boshlab yozilgan (oxirgi harf birinchi keladi)."]:[])],q:"Yashirin so'z?",a:w,h:`So'z "${w[0]}" harfi bilan boshlanadi`}};
const BW=['qalam','daryo','soya','kitob','tosh','mashal','kalit','xarita','yulduz','shamol','temir','oyna','tuman','eshik','zanjir','qum','toj','archa','laylak','bozor','kamar','lampa','xanjar','savat'];
G.book=(r,d)=>{for(let t=0;t<200;t++){const w=pick(r,W.filter(x=>x.length<=4+d)),ws=[...BW].sort(()=>r()-.5).slice(0,8+d),co=[];let ok=1;
 for(const ch of w){const c=[];ws.forEach((x,i)=>[...x].forEach((y,p)=>{if(y.toUpperCase()===ch)c.push([i,p])}));if(!c.length){ok=0;break}co.push(pick(r,c))}
 if(ok)return{c:[`Kitob sahifasidagi so'zlar: ${ws.map((x,i)=>`${i+1}) ${x}`).join('  ')}`,`Koordinatalar (so'z raqami, harf o'rni): ${co.map(([i,p])=>`(${i+1}, ${p+1})`).join(' ')}`,"Har koordinata bitta harfni beradi. Harflar ketma-ket yashirin so'zni hosil qiladi."],q:"Yashirin so'z?",a:w,h:`So'z "${w[0]}" harfi bilan boshlanadi`}}
 return G.morse(r,d)};
G.maze=(r,d)=>{const n=Math.min(5+(d>>1),8);for(let t=0;t<900;t++){const g=Array.from({length:n},()=>Array.from({length:n},()=>r()<.32?1:0));g[0][0]=0;g[n-1][n-1]=0;
 const D=Array.from({length:n},()=>Array(n).fill(-1));D[0][0]=0;const q=[[0,0]];
 while(q.length){const[y,x]=q.shift();for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const Y=y+a,X=x+b;if(Y>=0&&X>=0&&Y<n&&X<n&&!g[Y][X]&&D[Y][X]<0){D[Y][X]=D[y][x]+1;q.push([Y,X])}}}
 const L=D[n-1][n-1];
 if(L>0&&(L>=2*n-2+2*(d>>1)||t>800))return{c:["Labirint xaritasi:\n"+g.map((row,y)=>row.map((v,x)=>y==0&&x==0?'🟩':y==n-1&&x==n-1?'🟥':v?'⬛':'⬜').join('')).join('\n'),"🟩 — boshlanish, 🟥 — chiqish, ⬛ — devor. Faqat yuqori, past, chap, o'ng tomonga yuriladi (diagonal emas)."],q:"Yashil katakdan qizil katakkacha eng qisqa yo'l necha qadam?",a:String(L),h:`Yo'l ${L>10?"10 qadamdan ko'p":"10 qadamdan oshmaydi"}`}}
 return G.morse(r,d)};
G.roles=(r,d)=>{const n=Math.min(3+(d>>1),7),nm=NM.slice(0,n);
 for(let k=0;k<3000;k++){const T=nm.map(()=>r()<.5),a=ri(r,0,n-1),S=nm.map((_,i)=>{if(i===a)return{i,t:2,j:0};let j=ri(r,0,n-2);if(j>=i)j++;return{i,j,t:T[j]===T[i]?0:1}});let cnt=0;
  for(let m=0;m<1<<n;m++){const H=nm.map((_,i)=>!!(m>>i&1));if(S.every(s=>H[s.i]===(s.t===2?T[a]:s.t===0?H[s.j]:!H[s.j])))cnt++}
  if(cnt===1)return{c:["Ma'lum: kecha yong'in CHIQQAN edi.","Rostgo'y doim rost, yolg'onchi doim yolg'on gapiradi.",...S.map(s=>s.t===2?`${nm[s.i]}: "Kecha yong'in ${T[a]?'chiqqan':'chiqmagan'} edi."`:`${nm[s.i]}: "${nm[s.j]} — ${s.t?"yolg'onchi":"rostgo'y"}."`)],q:`Hammaning rolini ismlar tartibida yozing: R (rostgo'y) yoki Y (yolg'onchi), masalan ${'RYRYRYR'.slice(0,n)}. Tartib: ${nm.join(', ')}`,a:T.map(x=>x?'R':'Y').join(''),h:`${nm[0]} — ${T[0]?"rostgo'y":"yolg'onchi"}`}}
 return G.liar(r,d)};
G.eq=(r,d)=>{const m=d>=5?4:3,nm=NM.slice(0,m),v=nm.map(()=>ri(r,6,60)),df=(a,b)=>{const x=v[a]-v[b];return x?`${nm[a]} ${nm[b]} dan ${Math.abs(x)} yosh ${x>0?'katta':'kichik'}`:`${nm[a]} va ${nm[b]} tengdosh`};
 const c=[df(0,1)+'.',`${nm[1]} va ${nm[2]} yoshlari yig'indisi ${v[1]+v[2]}.`];if(m===4)c.push(`${nm[2]} va ${nm[3]} yoshlari yig'indisi ${v[2]+v[3]}.`);c.push(`Hammasining yoshlari yig'indisi ${v.reduce((x,y)=>x+y)}.`);
 return{c,q:`${nm[0]} va ${nm[m-1]} yoshlari yig'indisi nechchi?`,a:String(v[0]+v[m-1]),h:`${nm[1]} ${v[1]} yoshda emas, ${v[1]%2?'toq':'juft'} yoshda`}};
G.clock=(r,d)=>{const m=ri(r,2+(d>>1),9),k=ri(r,2,12),T0=ri(r,0,1439),lag=d>=5&&r()<.5,sh=k*(60+(lag?-m:m));
 return{c:[`Buzuq soat har haqiqiy soatda ${m} daqiqa ${lag?'ORQADA qoladi':'OLDINGA ketadi'}.`,`Soat ${fmt(T0)} da to'g'ri vaqtga qo'yilgan.`,`Hozir buzuq soat ${fmt(T0+sh)} ni ko'rsatmoqda.`],q:"Haqiqiy vaqt hozir nechada? (SS:DD)",a:fmt(T0+k*60),h:`Haqiqatda ${k} soat o'tgan`}};
const gcd=(a,b)=>b?gcd(b,a%b):a;
G.lcm=(r,d)=>{const n=d>=5?3:2,P=[4,6,8,9,10,12,14,15].sort(()=>r()-.5).slice(0,n),T0=ri(r,1200,1380),k=d>=3?ri(r,2,3):1,L=P.reduce((a,b)=>a*b/gcd(a,b));
 return{c:[...P.map((p,i)=>`${i+1}-soqchi har ${p} daqiqada o'tadi.`),`Hammasi ${fmt(T0)} da birga o'tdi.`],q:`Hammasi ${k}-marta (shu vaqtdan keyin) qachon birga o'tadi? (SS:DD, yarim tundan keyin 00:00 dan sanaladi)`,a:fmt(T0+k*L),h:`Oraliq ${L} daqiqa`}};
const sdc=(g,lim=2)=>{const i=g.indexOf(0);if(i<0)return 1;let c=0;const y=i>>2,x=i&3;for(let v=1;v<=4&&c<lim;v++){let ok=true;for(let k=0;k<4;k++)if(g[y*4+k]===v||g[k*4+x]===v)ok=false;const by=y&2,bx=x&2;for(let a=0;a<2;a++)for(let b=0;b<2;b++)if(g[(by+a)*4+bx+b]===v)ok=false;if(ok){g[i]=v;c+=sdc(g,lim-c);g[i]=0}}return c};
G.sudo=(r,d)=>{const pm=[1,2,3,4].sort(()=>r()-.5);let g=[1,2,3,4,3,4,1,2,2,1,4,3,4,3,2,1].map(v=>pm[v-1]);
 const rw=[...[0,1].sort(()=>r()-.5),...[2,3].sort(()=>r()-.5)],cl=[...[0,1].sort(()=>r()-.5),...[2,3].sort(()=>r()-.5)];
 const o=g;g=o.map((_,i)=>o[rw[i>>2]*4+cl[i&3]]);const SOL=[...g],keep=d>=5?4:8;
 for(const i of [...Array(16).keys()].sort(()=>r()-.5)){if(g.filter(x=>x).length<=keep)break;const v=g[i];g[i]=0;if(sdc([...g])!==1)g[i]=v}
 const DG=['⬜','1️⃣','2️⃣','3️⃣','4️⃣'],q=ri(r,0,3);
 return{c:["Seyf paneli (4×4):\n"+[0,1,2,3].map(y=>g.slice(y*4,y*4+4).map(v=>DG[v]).join('')).join('\n'),"Qoida: har qator, har ustun va har 2×2 qism (to'rt burchak) 1,2,3,4 raqamlarini bir martadan o'z ichiga olsin. ⬜ — bo'sh katak."],q:`Panel to'ldirilgach ${q+1}-qator raqamlari (probelsiz, chapdan o'ngga)?`,a:SOL.slice(q*4,q*4+4).join(''),h:`Qatorning birinchi raqami ${SOL[q*4]}`}};
const PL={1:['bin','cipher','seq','lock'],2:['morse','book','maze','morse','book','maze'],3:['liar','roles','order','liar','roles','order'],4:['mind','dial','eq','mind','dial','eq','mind'],5:['timeline','clock','lcm','timeline','clock','lcm','timeline','lcm'],6:['vig','evid','sudo','vig','sudo','evid','sudo','vig','evid'],7:['roles','mind','vig','sudo','dial','lcm','evid','maze','order','evid'],8:['evid','sudo','mind','vig','dial','evall'],9:['sudo','roles','mind','order','vig','maze','dial','lcm','evid','eq','clock'],10:['evid','mind','roles','sudo','vig','order','dial','evall']};
const TT=['','Qoldiq izlar','Yopiq kutubxona','Ikki guvoh','Yopiq seyf','Soat sinovi','Xiyonat soyasi','Laboratoriya','Maxfiy yakun','Soya laboratoriyasi',"Oxirgi qo'ng'iroq"];
const S=['',"Tun. Siz tashlandiq xarobaga yetib keldingiz, devorlarda yangi izlar bor.","Yopiq kutubxona. Changli javonlar orasida kimdir shoshilib nimadir yashirgan.","Ikki guvoh bir-biriga zid gapiryapti. Kim haqiqatni aytyapti?","Yopiq seyf xonasi: raqamlar, disklar va yoshlar sirini ochish kerak.","Barcha tizimlar bir vaqtda ishga tushdi. Har daqiqa muhim.","Jamoa ichida kimdir sirni sotgan. Dalillar bir-biriga zid.","Laboratoriyaning yopiq qismi. Oldingi boblardagi dalillar endi kerak bo'ladi.","Maxfiy yakun. Hamma dalil va qarorlar hal qiladi.","Soya laboratoriyasi: eng chuqur qatlam, eng qiyin jumboqlar.","Oxirgi qo'ng'iroq. Hamma narsa shu yerda hal bo'ladi."];
const KD={morse:'Morze signallari.',book:'Kitob shifri.',maze:'Labirint xaritasi.',roles:'Guvohlar: kim rostgo\'y, kim yolg\'onchi?',eq:'Yoshlar jumbog\'i.',clock:'Buzuq soat.',lcm:'Soqchilar navbati.',sudo:'Seyf paneli.',mind:'Qulf paneli: oldingi urinishlar izlari qolgan.',order:'Kirish jurnali: kim qachon kirgani.',dial:'Mexanik disklar.',vig:'Kalitli shifr.',bin:'Binar chiroqlar.',cipher:'Shifrlangan yozuv.',seq:'Eshik paneli.',lock:'Raqamli qulf.',liar:"So'roq: guvohlardan biri yolg'on gapiryapti.",timeline:'Kuzatuv jurnali.',evid:'Dalillar arxivi.',evall:'Yakuniy mexanizm.'};
// ---------- AI (ixtiyoriy): faqat sahna matnini yozadi, javoblarni server tekshiradi ----------
async function ai(p){if(!AK)return'';try{const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'x-api-key':AK,'anthropic-version':'2023-06-01','content-type':'application/json'},body:JSON.stringify({model:process.env.AI_MODEL||'claude-haiku-5-5',max_tokens:220,messages:[{role:'user',content:p}]}),signal:AbortSignal.timeout(8000)});const j=await r.json();const t=(j.content?.[0]?.text||'').trim();if(!t)console.log('AI xato:',JSON.stringify(j.error||j).slice(0,200));return t}catch(e){console.log('AI xato:',e.message);return''}}
// ---------- O'yin mantiqi ----------
const prem=u=>u.prem>Date.now(),ow=s=>db.u[s.m[0]];
const mk=(m,ch,ev,n)=>({m,n,ch,step:0,seed:Math.random()*1e9|0,en:100,ev:Object.fromEntries(Object.entries(ev).filter(([k])=>+k<ch)),fl:{ally:0,hid:m.some(id=>db.u[id]&&db.u[id].own&&db.u[id].own.includes('key'))?1:0},st:'puz',v:1,fh:0,msg:'',chat:[]});
async function enter(s){const kind=KS(s)[s.step],d=Math.min(s.ch+(s.step>>1),9),p=G[kind](rng(s.seed+s.ch*97+s.step*13),d,s.ev,s.prev);s.att=0;
 let tw=0;if(d>=3&&s.step>=2&&Math.random()<.2){tw=1;p.q+=' ⚠️ DIQQAT: javobni TESKARI (oxiridan boshlab) yozing!';p.a=[...String(p.a)].reverse().join('');p.h="Avval javobni toping, so'ng teskari yozing. "+p.h}
 const base=`${S[s.ch]} ${KD[kind]}`;
 const t=await ai(`Detektiv o'yin muallifi sifatida o'zbek tilida 2 gapdan iborat qisqa sahna yoz. Bob: "${TT[s.ch]}". Vaziyat: ${KD[kind]} Ittifoqchilar: ${s.fl.ally}, yashirilgan dalillar: ${s.fl.hid}. Faqat atmosfera: hech qanday raqam, javob yoki yechim yozma.`);
 s.cur={c:p.c,q:p.q,a:p.a,h:p.h,story:t||base,ai:!!t,tw,hinted:0};s.st='puz';s.v++}
async function chap(s){const a=[...PL[s.ch]],last=a.pop(),r=rng(s.seed+s.ch*31);a.sort(()=>r()-.5);(s.pl||={})[s.ch]=[...a,last];
 s.step=0;s.er=0;s.sh=0;s.dl=Date.now()+(15+a.length*6)*6e4;s.fh=Math.min(s.fl.ally,2);s.en=Math.max(s.en,40);
 if(s.n>1){const o=[0,1,2,3,4].sort(()=>r()-.5);s.rl={};s.m.forEach((id,i)=>s.rl[id]=o[i%5])}
 s.log=s.log||[];await enter(s)}
async function hurt(s){if(s.en<=0){s.en=60;s.seed=Math.random()*1e9|0;s.msg="💀 Energiya tugadi. Bob yangi jumboqlar bilan qayta boshlandi.";await chap(s)}}
function fin(s){const ok=Date.now()<=s.dl,r=rng(s.seed+s.ch);if(ok)s.ev[s.ch]={n:ri(r,10,99),w:pick(r,W)};
 for(const id of s.m){const u=db.u[id];if(!u)continue;u.ev={...u.ev,...s.ev};if(!u.done.includes(s.ch))u.done.push(s.ch);u.max=Math.max(u.max,Math.min(s.ch+1,10));u.cnt++;if(s.n>1)u.tw++;if(!s.er)u.clean++;if(s.ch>=7&&s.n>1)u.hardteam++;ach(u)}
 s.cl=s.m[Math.floor(Math.random()*s.m.length)];(s.log=s.log||[]).push(`${s.ch}-bob yakunlandi${ok?': dalil topildi':": dalil yo'qoldi"}`);
 s.msg=ok?"🗝 Bob yakunlandi, yangi dalil topildi!":"⏳ Vaqt o'tib ketdi — dalil yo'qoldi.";s.st='choice'}
function endg(s){s.st='end';s.end=s.ch>=8?(s.fl.ally>=3?'true':'secret'):'good';for(const id of s.m){const u=db.u[id];if(!u)continue;if(!u.end.includes(s.end))u.end.push(s.end);u.games++;pay(u,15,"O'yin yakuni bonusi");ach(u)}s.v++}
async function nxt(s){if(s.ch===8||s.ch>=10||(s.ch===7&&Object.keys(s.ev).length<7))return endg(s);s.ch++;if(s.ch>=9&&!prem(ow(s))){s.st='lock';s.v++;return}await chap(s)}
const view=(s,uid)=>{const i=Math.max(0,s.m.indexOf(uid)),c=s.cur||{},u=db.u[uid]||{inv:{}},K=KS(s),ro=s.rl&&s.rl[uid];
 let cl=(c.c||[]).filter((_,j)=>j%s.n===i);if(s.n>1&&ro!==undefined&&ro===KR[K[s.step]]&&c.h)cl=[...cl,`🔎 ${ROLES[ro]} ma'lumoti: ${c.h}`];
 return{k:s.st,ch:s.ch,t:TT[s.ch],step:s.step+1,tot:K.length,story:c.story,clues:cl,role:s.n>1?`${i+1}/${s.n}`:'',rn:s.n>1&&ro!==undefined?ROLES[ro]:'',n:s.n,q:c.q,en:s.en,ev:s.ev,hint:c.hinted?c.h:'',fh:s.fh,dl:s.dl,v:s.v,msg:s.msg,fl:s.fl,end:s.end,ai:c.ai?1:0,tw:c.tw?1:0,coins:u.coins||0,cn:(s.cn||{})[uid]||0,cl:(s.cl===uid||!s.m.includes(s.cl))?1:0,cln:s.cl&&db.u[s.cl]?nn(db.u[s.cl]):'',log:(s.log||[]).slice(-8),chat:(s.chat||[]).slice(-40),hi:u.inv.hint||0}};
const ses=(u,b)=>{const s=db.s[b.room?'r'+String(b.room).toUpperCase():'s'+u.id];if(!s||!s.m.includes(u.id))throw new Error("O'yin topilmadi");return s};
const DEF=()=>({coins:0,hist:[],inv:{},own:[],eq:{},nick:'',ok:0,bad:0,games:0,streak:0,days:[],ach:[],cnt:0,tw:0,clean:0,hardteam:0,dy:{d:0,ok:0,att:0}});
const U=x=>{const u=db.u[x.id]||={id:x.id,max:1,done:[],ev:{},end:[],prem:0,room:null};const D=DEF();for(const k in D)if(!(k in u))u[k]=D[k];u.name=(x.first_name||"O'yinchi").slice(0,20);
 const t=new Date().toISOString().slice(0,10);if(!u.days.includes(t)){u.days.push(t);if(u.days.length>400)u.days.shift()}return u};
const nn=u=>u.nick||u.name,pay=(u,n,w)=>{u.coins+=n;u.hist.unshift({t:Date.now(),n,w});if(u.hist.length>40)u.hist.length=40};
const AC=[['first','Birinchi qadam','1-bobni tugatish',20,u=>u.done.includes(1)],['sharp',"O'tkir zehn","Ketma-ket 5 ta to'g'ri javob",30,u=>u.streak>=5],['hero','Jamoa qahramoni','Jamoa bilan bobni yakunlash',50,u=>u.tw>0],['truth','Yashirin haqiqat','Yashirin yoki haqiqiy yakunni ochish',100,u=>u.end.some(e=>e!=='good')],['ten','Chempion','10 ta bobni tugatish',60,u=>u.cnt>=10],['three','Uch yakun','3 xil yakunni ochish',80,u=>u.end.length>=3],['week','7 kun',"7 kun o'ynash",70,u=>u.days.length>=7],['clean','Xatosiz bob','Bobni birorta xatosiz tugatish',40,u=>u.clean>0],['hard','Eng qiyin bob','7-bobni jamoa bilan yengish',80,u=>u.hardteam>0]];
const ach=u=>{for(const a of AC)if(!u.ach.includes(a[0])&&a[4](u)){u.ach.push(a[0]);pay(u,a[3],'🏆 '+a[1])}};
const IT=[{id:'crown',n:'👑 Chat toji',p:100,k:'own',d:"Chatda ismingiz oldida toj"},{id:'e_wolf',n:"🐺 Bo'ri",p:40,k:'emo',v:'🐺',d:'Chat emojisi'},{id:'e_skull',n:'💀 Bosh suyagi',p:40,k:'emo',v:'💀',d:'Chat emojisi'},{id:'e_det',n:'🕵️ Detektiv',p:40,k:'emo',v:'🕵️',d:'Chat emojisi'},{id:'e_fire',n:'🔥 Olov',p:40,k:'emo',v:'🔥',d:'Chat emojisi'},
{id:'t_det',n:'DETECTIVE laqabi',p:150,k:'title',v:'DETECTIVE',d:'Chatda ism yonida'},{id:'t_sh',n:'SHADOW laqabi',p:150,k:'title',v:'SHADOW',d:'Chatda ism yonida'},{id:'t_ls',n:'LAST SURVIVOR laqabi',p:250,k:'title',v:'LAST SURVIVOR',d:'Chatda ism yonida'},
{id:'n_gold',n:'Oltin nik',p:120,k:'nick',v:'gold',d:'Nikingiz oltin rangda'},{id:'n_neon',n:'Neon nik',p:120,k:'nick',v:'neon',d:'Nikingiz neon rangda'},{id:'frame',n:'✨ Neon avatar ramkasi',p:200,k:'frame',v:'frm',d:'Profilda yorqin ramka'},
{id:'hint',n:"🔍 Qo'shimcha ishora",p:250,k:'cons',d:"1 ta bepul maslahat (javobni ochmaydi)"},{id:'shield',n:'🛡️ Bir martalik himoya',p:300,k:'cons',d:"Bitta xatoning energiya jazosini yo'qotadi"},
{id:'badge',n:'🏅 Afsonaviy belgi',p:400,k:'own',d:'Profil va chatda maxsus belgi'},{id:'key',n:'🗝️ Maxsus imkoniyat',p:600,k:'own',d:"Har o'yinni 1 ta yashirin dalil bilan boshlaysiz"}];
const pre=u=>(u.own.includes('badge')?'🏅':'')+(u.own.includes('crown')?'👑':'')+(u.eq.emoji||'')+(u.eq.title?` [${u.eq.title}]`:'');
const ROLES=['🕵️ Detektiv','🔐 Haker','👁️ Kuzatuvchi',"🧭 Yo'lboshchi",'🛡️ Himoyachi'],KR={liar:0,roles:0,order:0,evid:0,evall:0,cipher:1,bin:1,morse:1,book:1,vig:1,lock:1,dial:1,mind:1,maze:2,sudo:2,timeline:3,clock:3,lcm:3,seq:3,eq:3};
const KS=s=>(s.pl&&s.pl[s.ch])||PL[s.ch];
const DK=['cipher','mind','order','roles','sudo','dial','lcm','vig','maze','eq','clock','book'],dayN=()=>Math.floor(Date.now()/864e5);
const dgen=()=>{const n=dayN(),k=DK[n%DK.length];return{k,p:G[k](rng(n*7919+13),4+(n%5),{},'')}};
const dyc=u=>{if(u.dy.d!==dayN())u.dy={d:dayN(),ok:0,att:0};return u.dy};
const E=m=>{throw new Error(m)};
const H={
 me:u=>{ach(u);return{id:u.id,name:nn(u),tg:u.name,nick:u.nick,max:u.max,done:u.done,ev:u.ev,end:u.end,prem:u.prem,coins:u.coins,hist:u.hist.slice(0,25),own:u.own,eq:u.eq,inv:u.inv,ok:u.ok,bad:u.bad,games:u.games,days:u.days.length,cnt:u.cnt,items:IT,acs:AC.map(a=>({id:a[0],t:a[1],d:a[2],c:a[3],done:u.ach.includes(a[0])})),room:db.r[u.room]?u.room:null,solo:!!(db.s['s'+u.id]&&db.s['s'+u.id].st!=='end'),ch:TT.map((t,n)=>({n,t,lock:n>=9&&!prem(u),open:n<=u.max})).slice(1)}},
 solo:async(u,b)=>{const n=+b.ch;if(!(n>=1&&n<=10))E('Bunday bob yo\'q');if(n>u.max)E('Bu bob hali yopiq');if(n>=9&&!prem(u))E("Bu bob Premium uchun. Botda 💎 Premium bo'limiga kiring.");const s=db.s['s'+u.id]=mk([u.id],n,u.ev,1);await chap(s);return view(s,u.id)},
 state:async(u,b)=>{const s=db.s[b.room?'r'+String(b.room).toUpperCase():'s'+u.id];if(!s||!s.m.includes(u.id))return{k:'none'};if(s.st==='lock'&&prem(ow(s))){s.msg='💎 Premium faol!';await chap(s)}return view(s,u.id)},
 answer:async(u,b)=>{const s=ses(u,b);if(s.st!=='puz')return view(s,u.id);
  if(s.lk>Date.now())E(`Ko'p xato qildingiz. ${Math.ceil((s.lk-Date.now())/1000)} soniya o'ylab ko'ring.`);
  if(norm(b.a)===norm(s.cur.a)){const c=2+3*s.ch;pay(u,c,`${s.ch}-bob: to'g'ri javob`);(s.cn=s.cn||{})[u.id]=(s.cn[u.id]||0)+c;u.ok++;u.streak++;ach(u);s.msg=`✅ ${nn(u)} to'g'ri topdi! +${c} 🪙`;s.prev=s.cur.a;s.att=0;s.lk=0;s.step++;if(s.step>=KS(s).length)fin(s);else await enter(s)}
  else{u.bad++;u.streak=0;s.er=(s.er||0)+1;s.att=(s.att||0)+1;if(s.att>=3)s.lk=Date.now()+3e4*(s.att-2);let c=10+2*s.ch,sh='';
   if(u.inv.shield>0){u.inv.shield--;c=0;sh=' 🛡️ Himoya ishladi.'}else if(s.n>1&&!s.sh&&s.m.some(id=>s.rl&&s.rl[id]===4)){s.sh=1;c=0;sh=' 🛡️ Himoyachi jamoani himoya qildi.'}
   s.en-=c;s.msg=`❌ ${nn(u)}: noto'g'ri. −${c} energiya.${sh}${s.att>=3?' Kutish jazosi.':''}`;await hurt(s)}
  s.v++;return view(s,u.id)},
 hint:async(u,b)=>{const s=ses(u,b);if(s.st!=='puz'||s.cur.hinted)return view(s,u.id);if(s.fh>0)s.fh--;else if(u.inv.hint>0)u.inv.hint--;else s.en-=15;s.cur.hinted=1;s.msg='💡 Maslahat ochildi.';await hurt(s);s.v++;return view(s,u.id)},
 chat:async(u,b)=>{const s=ses(u,b),t=String(b.t||'').trim().slice(0,300);if(t){(s.chat=s.chat||[]).push({id:u.id,n:nn(u),t,p:pre(u),nc:u.eq.nick||''});if(s.chat.length>100)s.chat.shift();s.v++}return view(s,u.id)},
 choice:async(u,b)=>{const s=ses(u,b);if(s.st!=='choice')return view(s,u.id);if(s.n>1&&s.m.includes(s.cl)&&s.cl!==u.id)E(`Qaror qo'ng'iroq olgan o'yinchida: ${nn(db.u[s.cl])}`);
  if(b.c==='a'){s.fl.ally++;s.en=Math.min(100,s.en+30);s.msg="🤝 Jamoani qutqardingiz: ittifoqchi paydo bo'ldi (+30 energiya).";(s.log=s.log||[]).push('🤝 Jamoa qutqarildi')}
  else{s.fl.hid++;s.en=Math.max(10,s.en-20);s.msg='🕵️ Haqiqatni tanladingiz (−20 energiya). Yashirin dalil sizda.';(s.log=s.log||[]).push('🕵️ Haqiqat tanlandi')}
  await nxt(s);s.v++;return view(s,u.id)},
 buy:(u,b)=>{const it=IT.find(x=>x.id===b.id);if(!it)E('Buyum topilmadi');if(u.coins<it.p)E(`Tanga yetmaydi: ${it.p} 🪙 kerak`);
  if(it.k==='cons')u.inv[it.id]=(u.inv[it.id]||0)+1;else{if(u.own.includes(it.id))E('Bu buyumni allaqachon olgansiz');u.own.push(it.id);if(it.v)u.eq[it.k==='emo'?'emoji':it.k]=it.v}
  pay(u,-it.p,`Xarid: ${it.n}`);return H.me(u)},
 equip:(u,b)=>{const it=IT.find(x=>x.id===b.id);if(!it||!it.v||!u.own.includes(it.id))E('Avval sotib oling');const k=it.k==='emo'?'emoji':it.k;if(u.eq[k]===it.v)delete u.eq[k];else u.eq[k]=it.v;return H.me(u)},
 nick:(u,b)=>{const n=String(b.n||'').trim();if(!/^[A-Za-z0-9_]{3,16}$/.test(n))E("Nik 3–16 belgi bo'lsin: lotin harf, raqam yoki _");if(/(admin|fuck|shit|bitch|sikaman|qotoq|jinni|loopbreak)/i.test(n))E("Bu nikdan foydalanib bo'lmaydi");
  if(Object.values(db.u).some(x=>x.id!==u.id&&(x.nick||'').toLowerCase()===n.toLowerCase()))E('Bu nik band');u.nick=n;return H.me(u)},
 daily:u=>{const g=dgen(),t=dyc(u);return{c:g.p.c,q:g.p.q,ok:t.ok,att:t.att,max:5}},
 dailyans:(u,b)=>{const g=dgen(),t=dyc(u);if(t.ok)E('Bugun bajarilgan');if(t.att>=5)E('Bugungi urinishlar tugadi');if(norm(b.a)===norm(g.p.a)){t.ok=1;pay(u,25,'Kun jumboqi');return{r:'ok'}}t.att++;return{r:'bad'}},
 rcreate:(u,b)=>{if(db.r[u.room])E('Avval joriy xonadan chiqing');const size=Math.min(6,Math.max(2,+b.size||2));let c;do c=Math.random().toString(36).slice(2,7).toUpperCase();while(db.r[c]);
  db.r[c]={code:c,name:String(b.name||'Jamoa').trim().slice(0,24)||'Jamoa',size,owner:u.id,mem:[{id:u.id,name:u.name,ready:false}],started:0};u.room=c;return db.r[c]},
 rjoin:(u,b)=>{const r=db.r[String(b.code||'').trim().toUpperCase()];if(!r)E('Xona topilmadi');if(r.mem.some(m=>m.id===u.id)){u.room=r.code;return r}
  if(r.started)E("O'yin allaqachon boshlangan");if(r.mem.length>=r.size)E("Xona to'lgan");if(db.r[u.room])E('Avval joriy xonadan chiqing');
  r.mem.push({id:u.id,name:u.name,ready:false});u.room=r.code;return r},
 room:(u,b)=>{const r=db.r[String(b.code).toUpperCase()];if(!r||!r.mem.some(m=>m.id===u.id))E('Xona topilmadi');return r},
 rready:(u,b)=>{const r=H.room(u,b);if(r.started)return r;const m=r.mem.find(m=>m.id===u.id);m.ready=!m.ready;return r},
 rstart:async(u,b)=>{const r=H.room(u,b);if(r.owner!==u.id)E('Faqat xona egasi boshlay oladi');if(r.started)return r;
  if(r.mem.length<r.size)E('Xona hali to\'lmagan');if(r.mem.some(m=>!m.ready))E('Hamma tayyor emas');
  const o=db.u[r.owner];let ch=Math.min(o.max,10);if(ch>=9&&!prem(o))ch=8;r.started=1;
  const s=db.s['r'+r.code]=mk(r.mem.map(m=>m.id),ch,o.ev,r.size);await chap(s);return r},
 rleave:(u,b)=>{const r=db.r[String(b.code).toUpperCase()];u.room=null;if(!r)return{ok:1};
  r.mem=r.mem.filter(m=>m.id!==u.id);
  if(r.started){const s=db.s['r'+r.code];if(s){s.m=s.m.filter(x=>x!==u.id);s.n=Math.max(1,s.m.length);if(!s.m.length)delete db.s['r'+r.code];else{(s.chat=s.chat||[]).push({id:0,n:'⚙️',t:`${nn(u)} jamoani tark etdi`,p:'',nc:''});(s.log=s.log||[]).push(`${nn(u)} tark etdi`);s.v++}}
   if(r.owner===u.id&&r.mem.length)r.owner=r.mem[0].id}
  if(!r.mem.length||(!r.started&&r.owner===u.id)){r.mem.forEach(m=>{if(db.u[m.id])db.u[m.id].room=null});delete db.r[r.code];delete db.s['r'+r.code]}
 return{ok:1}}
};
// ---------- Telegram tekshiruvi ----------
function auth(h){const p=new URLSearchParams(h||'');const hash=p.get('hash');if(!hash)return null;p.delete('hash');
 const s=[...p].sort(([a],[b])=>a<b?-1:1).map(([k,v])=>k+'='+v).join('\n');
 const k=crypto.createHmac('sha256','WebAppData').update(T).digest(),c=crypto.createHmac('sha256',k).update(s).digest('hex');
 if(c!==hash||Date.now()/1000-Number(p.get('auth_date'))>604800)return null;try{return JSON.parse(p.get('user'))}catch{return null}}
const send=(res,c,j)=>{res.writeHead(c,{'Content-Type':'application/json'});res.end(JSON.stringify(j))};
const server=http.createServer(async(q,res)=>{
 if(q.method==='POST'&&q.url.startsWith('/api/')){let b='';for await(const c of q)b+=c;
  try{const x=auth(q.headers['x-init']);if(!x)E("Telegram tasdiqlashi noto'g'ri. O'yinni bot orqali oching.");const u=U(x),h=H[q.url.slice(5)];if(!h)E('?');const j=await h(u,JSON.parse(b||'{}'));save();send(res,200,j)}catch(e){send(res,400,{e:e.message})}}
 else{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(fs.readFileSync(path.join(__dirname,'index.html')))}});
// ---------- Bot ----------
const menu={inline_keyboard:[[{text:"🎮 O'yinni ochish",web_app:{url:WU}}],[{text:"📖 O'yin haqida",callback_data:'about'},{text:'💎 Premium',callback_data:'prem'}],[{text:'👑 Admin',callback_data:'adm'}]]};
const back={inline_keyboard:[[{text:'⬅️ Orqaga',callback_data:'home'}]]};
const HOME="🌀 <b>LOOPBREAK</b>\n\nJamoaviy detektiv-sarguzasht. 8 bob, har biri oldingisidan qiyinroq. Boshlash uchun pastdagi tugmani bosing.";
const ABOUT="📖 <b>LOOPBREAK haqida</b>\n\nBu oddiy savol-javob emas, haqiqiy sarguzasht: shifrlar, yolg'onchi guvohlar, vaqt jumboqlari, xiyonat va yashirin dalillar.\n\n🧩 <b>8 bob</b>: Qoldiq izlar → Yopiq kutubxona → Ikki guvoh → Soxta alibi → Soat sinovi → Xiyonat soyasi → Laboratoriya → Maxfiy yakun. Har bob yangi mexanika va yangi jumboqlar bilan, oldingisidan qiyin.\n👥 <b>Jamoa</b>: 2–6 kishi. Har bir o'yinchi faqat o'z ma'lumotini ko'radi, yechim uchun hammasini birlashtirish kerak.\n⚡ <b>Energiya, vaqt, dalillar</b>: xato energiyani kamaytiradi, vaqtida yakunlangan bob dalil beradi. Keyingi boblarda aynan shu dalillar kerak bo'ladi.\n🎭 <b>Qarorlar</b>: yordam berish yoki dalilni yashirish keyingi voqealarni va yakunni o'zgartiradi: yaxshi, yashirin va haqiqiy yakun.\n🪙 <b>LoopCoin</b>: to'g'ri javob uchun tanga oling, do'konda toj, laqab va ramkalarga almashtiring.\n🤖 <b>AI</b> sahnalarni yozadi, javoblarni esa server tekshiradi.";
const PREM="💎 <b>Premium</b>\n\n9-bob (Soya laboratoriyasi) va 10-bob (Oxirgi qo'ng'iroq) faqat Premium obunachilar uchun.\n\nNarxi: <b>250 ⭐ / 30 kun</b>";
const invoice=id=>tg('sendInvoice',{chat_id:id,title:'LOOPBREAK Premium',description:"30 kun: 9 va 10-boblar ochiladi",payload:'prem30',provider_token:'',currency:'XTR',prices:[{label:'Premium 30 kun',amount:250}]});
async function upd(x){
 if(x.pre_checkout_query)return tg('answerPreCheckoutQuery',{pre_checkout_query_id:x.pre_checkout_query.id,ok:true});
 const m=x.message;
 if(m?.successful_payment){const u=U(m.from);u.prem=Math.max(Date.now(),u.prem)+30*864e5;save();return tg('sendMessage',{chat_id:m.chat.id,text:'✅ Premium faollashdi! Mini Appni qayta oching.',reply_markup:menu})}
 if(m?.text?.startsWith('/start')){if(m.text.includes('prem')){await tg('sendMessage',{chat_id:m.chat.id,text:PREM,parse_mode:'HTML'});return invoice(m.chat.id)}
  return tg('sendMessage',{chat_id:m.chat.id,text:HOME,parse_mode:'HTML',reply_markup:menu})}
 const c=x.callback_query;if(!c)return;tg('answerCallbackQuery',{callback_query_id:c.id});
 const e=t=>tg('editMessageText',{chat_id:c.message.chat.id,message_id:c.message.message_id,text:t,parse_mode:'HTML',reply_markup:t===HOME?menu:back});
 if(c.data==='home')return e(HOME);if(c.data==='about')return e(ABOUT);
 if(c.data==='adm')return e(`👑 <b>Admin</b>\n\nSavol, taklif yoki muammo bo'lsa murojaat qiling:\n${ADMIN}`);
 if(c.data==='prem'){await e(PREM);return invoice(c.message.chat.id)}}
async function poll(){await tg('deleteWebhook',{});await tg('setChatMenuButton',{menu_button:{type:'web_app',text:"O'ynash",web_app:{url:WU}}});let o=0;
 for(;;){const r=await tg('getUpdates',{offset:o,timeout:30,allowed_updates:['message','callback_query','pre_checkout_query']});
  for(const x of r.result||[]){o=x.update_id+1;try{await upd(x)}catch(e){console.error(e)}}if(!r.ok)await new Promise(r=>setTimeout(r,3000))}}
if(require.main===module){if(!T||!WU){console.error('BOT_TOKEN va WEBAPP_URL kerak');process.exit(1)}server.listen(PORT,()=>console.log('LOOPBREAK ishga tushdi:',PORT,'| AI:',AK?'kalit bor':'kalit YOQ'));poll()}
module.exports={G,PL,auth,H,db,U};
