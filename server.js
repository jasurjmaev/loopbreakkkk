// LOOPBREAK — bot + Mini App serveri. Faqat Node 18+, paket o'rnatish shart emas.
const http=require('http'),fs=require('fs'),crypto=require('crypto'),path=require('path');
const {BOT_TOKEN:T,WEBAPP_URL:WU,ANTHROPIC_API_KEY:AK,PORT=3000}=process.env,ADMIN=process.env.ADMIN||'@wxs_z',AID=String(process.env.ADMIN_ID||'').trim(),isAdm=id=>!!AID&&String(id)===AID;
const DBF=process.env.DB_FILE||'db.json';
let db={u:{},s:{},r:{}};try{db=JSON.parse(fs.readFileSync(DBF))}catch{}
const initDb=()=>{db.u=db.u||{};db.s=db.s||{};db.r=db.r||{};db.cfg=Object.assign({maint:'',coinMul:1,timeMul:1,daily:25,prices:{},lr:''},db.cfg||{});for(const k of['st','cs','ks'])db[k]=db[k]||{};db.co=db.co||{e:0,s:0};for(const k of['err','alog','pay'])db[k]=db[k]||[];db.pa=db.pa||0;db.hf=db.hf||{};db.dm=db.dm||{};db.du=db.du||{};db.cp=db.cp||[];db.dn=db.dn||[];db.ss=db.ss||{id:'',t:'',pts:{}};db.hist=db.hist||[];db.fb=db.fb||[];db.fbm=db.fbm||{};db.mk=db.mk||[];db.mp=db.mp||{};db.disp=db.disp||[];db.wd=db.wd||{day:0,v:{a:0,b:0},by:{},hist:[],eff:{mul:1,pm:1,txt:''}};db.bc=db.bc||null};initDb();
let tm,dirty=0,lastBk=0;const save=()=>{dirty=1;clearTimeout(tm);tm=setTimeout(()=>fs.writeFile(DBF,JSON.stringify(db),()=>{}),400)};
const dk=t=>new Date(t).toISOString().slice(0,10),elog=(k,m)=>{db.err.unshift({t:Date.now(),k,m:String(m).slice(0,220)});if(db.err.length>100)db.err.length=100},alog=a=>{db.alog.unshift({t:Date.now(),a});if(db.alog.length>200)db.alog.length=200};
process.on('uncaughtException',e=>elog('crash',e.stack||e.message));process.on('unhandledRejection',e=>elog('crash',e&&e.message||e));
process.on('SIGTERM',async()=>{try{fs.writeFileSync(DBF,JSON.stringify(db))}catch{}try{if(dirty)await Promise.race([sendBackup(),new Promise(r=>setTimeout(r,8000))])}catch{}process.exit(0)});
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
G.dial=(r,d)=>{const k=Math.min(3+(d>>2),5),n=Math.min(4+d,16),s=Array.from({length:k},()=>ri(r,0,9)),c=[`0) Disklar boshida: ${s.join(' ')} (0 dan 9 gacha, 9 dan keyin yana 0)`];
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
G.maze=(r,d)=>{const n=Math.min(5+(d>>1),10);for(let t=0;t<900;t++){const g=Array.from({length:n},()=>Array.from({length:n},()=>r()<.32?1:0));g[0][0]=0;g[n-1][n-1]=0;
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
const DA=["ko'zoynak taqadi","chap qo'lli","soqolli","qora palto kiyadi","tamaki chekadi","qo'lida yara izi"];
G.dos=(r,d)=>{const n=Math.min(4+(d>>2),7),nm=NM.slice(0,n),L=d>=8?3:2,nc=Math.min(5+(d>>3),7);
 for(let k=0;k<4000;k++){const A=nm.map(()=>DA.map(()=>r()<.5)),t=ri(r,0,n-1),cl=[],li=new Set();while(li.size<L)li.add(ri(r,0,nc-1));
  for(let i=0;i<nc;i++){const a=ri(r,0,5),tv=A[t][a];cl.push({a,v:li.has(i)?!tv:tv})}
  const sol=[];for(let x=0;x<n;x++)if(cl.filter(c=>c.v!==A[x][c.a]).length===L)sol.push(x);
  if(sol.length===1)return{c:[`📁 QORA PAPKA: ${nc} ta dalil. Aniq ${L} tasi YOLG'ON.`,...cl.map((c,i)=>`Dalil ${i+1}: aybdor ${DA[c.a]}${c.v?'':' EMAS'}.`),`👥 Gumondorlar:\n${nm.map((x,i)=>`${x}: ${DA.map((a,j)=>(A[i][j]?'✔ ':'✘ ')+a).join(', ')}`).join('\n')}`],q:'Aybdor kim? (ism)',a:nm[t],h:`Ism "${nm[t][0]}" harfi bilan boshlanadi`}}
 return G.liar(r,d)};
const SY=['🔺','🟦','⚪','🟢'];
G.wt=(r,d)=>{const m=d>=8?4:3,R=d>=8?10:15;
 for(let k=0;k<500;k++){const w=Array.from({length:m},()=>ri(r,1,9)),E=Array.from({length:m},()=>w.map(()=>ri(r,0,2))),Y=w.map(()=>ri(r,0,2)),val=e=>e.reduce((a,c,i)=>a+c*w[i],0);
  if(E.some(e=>!e.some(x=>x))||!Y.some(x=>x))continue;let cnt=0;const sv=Array(m).fill(1);
  const rec=i=>{if(cnt>1)return;if(i===m){if(E.every(e=>e.reduce((a,c,j)=>a+c*sv[j],0)===val(e)))cnt++;return}for(let x=1;x<=R;x++){sv[i]=x;rec(i+1)}};rec(0);
  const tx=e=>e.map((c,i)=>c?SY[i].repeat(c):'').filter(Boolean).join(' + ');
  if(cnt===1)return{c:[...E.map(e=>tx(e)+' = '+val(e)),`Har belgi — 1 dan ${R} gacha bo'lgan butun og'irlik.`],q:`${tx(Y)} = ?`,a:String(val(Y)),h:`Javob ${val(Y)%2?'toq':'juft'} son`}}
 return G.seq(r,d)};
const WD=['dushanba','seshanba','chorshanba','payshanba','juma','shanba','yakshanba'];
G.cal=(r,d)=>{const k=Math.min(2+(d>>2),5),t0=ri(r,0,6),ev=EV.slice(0,k+1);let off=-ri(r,2,20+d*8);const c=[`Bugun ${WD[t0]}.`,`"${ev[0]}" bugundan ${-off} kun OLDIN bo'lgan.`];
 for(let i=1;i<=k;i++){const x=ri(r,3,30+d*10),s=r()<.5?-1:1;off+=s*x;c.push(`"${ev[i]}" — "${ev[i-1]}" dan ${x} kun ${s>0?'KEYIN':'OLDIN'}.`)}
 const a=WD[(((t0+off)%7)+7)%7];return{c,q:`"${ev[k]}" qaysi hafta kuni bo'lgan?`,a,h:`Hafta kuni "${a[0]}" harfi bilan boshlanadi`}};
G.bot=(r,d)=>{const n=Math.min(5+d,16),D=[[0,1],[1,0],[0,-1],[-1,0]],HN=['Shimol','Sharq','Janub',"G'arb"],c=["Robot (0,0) nuqtada, Shimolga qaragan. Shimol = +y, Sharq = +x."];let x=0,y=0,h=0;
 for(let i=1;i<=n;i++){const t=ri(r,0,3);if(t===0||t===3){const k=ri(r,1,3+(d>>1)),sg=t===0?1:-1;x+=D[h][0]*k*sg;y+=D[h][1]*k*sg;c.push(`${i}) ${t===0?'Oldinga':'Orqaga'} ${k} qadam`)}else if(t===1){h=(h+1)%4;c.push(`${i}) O'ngga buriling`)}else{h=(h+3)%4;c.push(`${i}) Chapga buriling`)}}
 return{c,q:'Oxirgi nuqta koordinatalari? (x,y — masalan 2,-3)',a:`${x},${y}`,h:`Robot oxirida ${HN[h]}ga qaragan`}};
G.rec=(r,d)=>{const n=Math.min(4+(d>>2),8),it=Array.from({length:n},()=>({w:ri(r,2,9),v:ri(r,3,20)})),cap=Math.floor(it.reduce((a,x)=>a+x.w,0)*.5);let best=0;
 for(let m=0;m<1<<n;m++){let w=0,v=0;for(let i=0;i<n;i++)if(m>>i&1){w+=it[i].w;v+=it[i].v}if(w<=cap&&v>best)best=v}
 return{c:[`Sumka sig'imi: ${cap} kg.`,...it.map((x,i)=>`${String.fromCharCode(65+i)}: og'irligi ${x.w} kg, qiymati ${x.v}`),"Har buyumdan bittadan bor."],q:"Sumkaga sig'adigan buyumlarning eng katta jami qiymati?",a:String(best),h:`Javob ${best>40?'40 dan katta':'40 dan oshmaydi'}`}};
G.chk=(r,d)=>{const k=Math.min(4+(d>>3),6),ok=ri(r,0,k-1),cs=[];
 for(let i=0;i<k;i++){const dg=Array.from({length:6},()=>ri(r,0,9)),sm=dg.slice(0,5).reduce((a,x,j)=>a+x*(j+1),0)%10;if(i===ok)dg[5]=sm;else{let c;do c=ri(r,0,9);while(c===sm);dg[5]=c}cs.push(dg)}
 return{c:["Kod qoidasi: oxirgi raqam = (1-raqam×1 + 2-raqam×2 + 3-raqam×3 + 4-raqam×4 + 5-raqam×5) yig'indisining oxirgi raqami.",...cs.map((x,i)=>`Signal ${i+1}: ${x.join('')}`)],q:"Qoidaga mos keladigan yagona signalning barcha raqamlari yig'indisi?",a:String(cs[ok].reduce((a,x)=>a+x,0)),h:`Haqiqiy signal ${ok+1}-raqamli`}};
G.mat=(r,d)=>{const K=d>=10?5:3;for(let t=0;t<500;t++){const a=ri(r,-K+1,K),b=ri(r,-K+1,K);if(!a&&!b)continue;const R=Array.from({length:3},()=>{const x=ri(r,1,9),y=ri(r,1,9);return[x,y,a*x+b*y]});let cnt=0;
  for(let p=-K;p<=K;p++)for(let q=-K;q<=K;q++)if(R.slice(0,2).every(w=>p*w[0]+q*w[1]===w[2]))cnt++;if(cnt!==1)continue;
  return{c:["Jadvalning har qatori bir xil qoida bilan tuzilgan (3-son 1- va 2-sondan hosil bo'ladi).",...R.map((w,i)=>i<2?`${i+1}-qator: ${w[0]}, ${w[1]}, ${w[2]}`:`3-qator: ${w[0]}, ${w[1]}, ?`)],q:'Savol belgisi o\'rnidagi son?',a:String(R[2][2]),h:`Javob ${Math.abs(R[2][2])%2?'toq':'juft'}`}}
 return G.seq(r,d)};
G.tz=(r,d)=>{const n=Math.min(3+(d>>3),5),nm=['Alfa','Beta','Gamma','Delta','Omega'].slice(0,n);
 for(let t=0;t<500;t++){const of=nm.map(()=>ri(r,-6,9)),lt=nm.map(()=>ri(r,0,1439)),u=lt.map((x,i)=>x-of[i]*60),sr=[...u].sort((a,b)=>a-b);if(sr[0]===sr[1])continue;const hard=d>=10,e=u.indexOf(sr[0]);
  return{c:[...nm.map((x,i)=>`${x} laboratoriyasi: UTC${of[i]>=0?'+':''}${of[i]}, mahalliy vaqt ${fmt(lt[i])}`),"Hamma hodisa bir sanada, mahalliy vaqt bilan qayd etilgan."],q:hard?"Eng birinchi va eng oxirgi voqea orasidagi farq necha daqiqa?":"Eng birinchi sodir bo'lgan voqea qaysi laboratoriyada? (nom)",a:hard?String(sr[sr.length-1]-sr[0]):nm[e],h:`Birinchi harf: ${nm[e][0]}`}}
 return G.cal(r,d)};
G.prm=(r,d)=>{const n=Math.min(5+(d>>2),9),p=[...Array(n).keys()].sort(()=>r()-.5),x=ri(r,1,n),k=ri(r,12,40+d*3);let c=x;for(let i=0;i<k;i++)c=p[c-1]+1;
 return{c:[`🔁 Almashtirish: ${p.map((v,i)=>`${i+1}→${v+1}`).join(', ')}`,"Har qadamda son o'zi ko'rsatilgan songa o'tadi."],q:`${x} dan boshlab ${k} marta qo'llansa, qaysi son chiqadi?`,a:String(c),h:`Javob ${c%2?'toq':'juft'} son`}};
G.swt=(r,d)=>{const n=Math.min(6+(d>>2),12),m=Math.min(4+(d>>1),14),L=Array(n).fill(0),c=[`💡 ${n} ta lampa yonma-yon, hammasi o'chiq (0). Tugma bosilganda shu lampa va uning qo'shnilari almashadi (0↔1).`];
 for(let i=1;i<=m;i++){const k=ri(r,0,n-1);for(const j of[k-1,k,k+1])if(j>=0&&j<n)L[j]^=1;c.push(`${i}) ${k+1}-tugma bosildi`)}
 return{c,q:`Oxirida lampalar holati? (${n} ta raqam, masalan 1${'0'.repeat(n-1)})`,a:L.join(''),h:`Yonib turgan lampalar: ${L.reduce((a,b)=>a+b,0)} ta`}};
G.gate=(r,d)=>{const V=['A','B','C','D'],dep=Math.min(2+(d>>3),4),mk=k=>{if(k===0)return{v:ri(r,0,3)};const t=ri(r,0,3);if(t===3)return{o:'NOT',a:mk(k-1)};return{o:['AND','OR','XOR'][t],a:mk(k-1),b:mk(k-1)}};
 const T=mk(dep),ev=(t,m)=>t.v!==undefined?m[t.v]:t.o==='NOT'?1-ev(t.a,m):t.o==='AND'?ev(t.a,m)&ev(t.b,m):t.o==='OR'?ev(t.a,m)|ev(t.b,m):ev(t.a,m)^ev(t.b,m),str=t=>t.v!==undefined?V[t.v]:t.o==='NOT'?`NOT ${str(t.a)}`:`(${str(t.a)} ${t.o} ${str(t.b)})`;
 let cnt=0;for(let i=0;i<16;i++)if(ev(T,[i&1,i>>1&1,i>>2&1,i>>3&1]))cnt++;
 return{c:[`⚙️ Sxema: ${str(T)}`,"A, B, C, D — kirishlar (0 yoki 1). AND — ikkalasi 1; OR — kamida bittasi 1; XOR — faqat bittasi 1; NOT — teskarisi."],q:"16 ta kirish kombinatsiyasidan nechtasida natija 1 bo'ladi?",a:String(cnt),h:`Javob ${cnt%2?'toq':'juft'} son`}};
G.cry=(r,d)=>{for(let t=0;t<200;t++){const a=ri(r,10,99),b=ri(r,10,99),S=a+b,used=[...new Set([...(''+a+b+S)])];if(used.length<5||used.length>7)continue;
 const lt=['A','B','C','D','E','F','G'].slice(0,used.length).sort(()=>r()-.5),mp={},tr={};used.forEach((x,i)=>{mp[x]=lt[i];tr[lt[i]]=+x});
 const enc=n=>[...(''+n)].map(c=>mp[c]).join(''),ea=enc(a),eb=enc(b),es=enc(S),Ls=[...new Set(ea+eb+es)];
 const cnt=fx=>{let c=0;const asg={...fx},ud=new Set(Object.values(fx)),rest=Ls.filter(l=>!(l in fx)),val=q=>[...q].reduce((x,ch)=>x*10+asg[ch],0);
  const rec=i=>{if(c>1)return;if(i===rest.length){if(asg[ea[0]]&&asg[eb[0]]&&asg[es[0]]&&val(ea)+val(eb)===val(es))c++;return}for(let x=0;x<10;x++){if(ud.has(x))continue;ud.add(x);asg[rest[i]]=x;rec(i+1);ud.delete(x)}};rec(0);return c};
 const fx={},ord=[...Ls].sort(()=>r()-.5);let ok=0;for(const l of ord){if(cnt(fx)===1){ok=1;break}fx[l]=tr[l]}if(!ok)continue;const q=ord.find(l=>!(l in fx));if(!q)continue;
 return{c:[`🔠 ${ea} + ${eb} = ${es}`,Object.keys(fx).length?`Ma'lum: ${Object.entries(fx).map(([l,v])=>`${l}=${v}`).join(', ')}`:"Ma'lum harflar yo'q.","Har xil harf — har xil raqam. Sonlarning birinchi raqami 0 bo'lmaydi."],q:`«${q}» harfi qaysi raqam?`,a:String(tr[q]),h:`«${q}» — ${tr[q]%2?'toq':'juft'} raqam`}}
 return G.prm(r,d)};
G.kn=(r,d)=>{const n=Math.min(5+(d>>2),9),NMS=['Batareya','Kabel','Fonar','Radio','Dori','Xarita','Suv','Lenta','Kalit'],it=Array.from({length:n},(_,i)=>({n:NMS[i],w:ri(r,2,9),v:ri(r,3,20)})),Wc=Math.floor(it.reduce((a,x)=>a+x.w,0)*(.4+r()*.15)),dp=Array(Wc+1).fill(0);
 for(const x of it)for(let c=Wc;c>=x.w;c--)dp[c]=Math.max(dp[c],dp[c-x.w]+x.v);
 return{c:[`🎒 Sumka sig'imi: ${Wc} kg.`,...it.map(x=>`${x.n}: ${x.w} kg, qiymati ${x.v}`),"Har buyumdan bittadan bor. Sumkaga sig'adigan buyumlarning eng katta umumiy qiymatini toping."],q:'Eng katta umumiy qiymat?',a:String(dp[Wc]),h:`Javob ${dp[Wc]%2?'toq':'juft'} son`}};
const OC=['KOK','QIZIL','SARIQ','YASHIL'],OC2=["ko'k",'qizil','sariq','yashil'];
G.op=(r,d)=>{const n=Math.min(4+(d>>2),6),nm=NM.slice(0,n);for(let k=0;k<600;k++){const S=nm.map(()=>({c:ri(r,0,3),f:ri(r,1,3)})),t=ri(r,0,n-1);
 if(S.filter(x=>x.c===S[t].c&&x.f===S[t].f).length>1||S.filter(x=>x.c===S[t].c).length<2||S.filter(x=>x.f===S[t].f).length<2)continue;
 const sh=ri(r,1,12),enc=[...OC[S[t].c]].map(ch=>String.fromCharCode((ch.charCodeAt(0)-65+sh)%26+65)).join('');
 return{c:[`📟 KOD: ${enc}. Kalit: har harf ${sh} qadam oldinga surilgan. Natija — gumondorning kiyim rangi.`,`📹 KAMERA: gumondor ${S[t].f}-qavatda ko'rilgan.`,`📋 GUMONDORLAR:\n${nm.map((x,i)=>`${x}: ${OC2[S[i].c]} kiyim, ${S[i].f}-qavat`).join('\n')}`],q:'Gumondor kim? (ism)',a:nm[t],h:`Ism "${nm[t][0]}" harfi bilan boshlanadi`}}
 return G.liar(r,d)};
const PL={1:['bin','cipher','seq','lock'],2:['morse','book','maze','morse','book','maze'],3:['liar','roles','order','liar','roles','order'],4:['mind','dial','eq','mind','dial','eq','mind'],5:['timeline','clock','lcm','timeline','clock','lcm','timeline','lcm'],6:['vig','evid','sudo','vig','sudo','evid','sudo','vig','evid'],7:['roles','mind','vig','sudo','dial','lcm','evid','maze','order','evid'],8:['evid','sudo','mind','vig','dial','evall'],9:['sudo','roles','mind','order','vig','maze','dial','lcm','evid','eq','clock'],10:['dos','bot','cal','wt','evid','mind','vig','evall'],11:['dos','wt','cal','bot','dos','wt','cal','bot','evid','dos'],12:['dos','roles','sudo','mind','vig','dial','wt','cal','bot','order','dos','evall'],13:['chk','mat','bot','rec','cal','wt','dos'],14:['tz','dos','mat','rec','chk','cal','bot','wt'],15:['rec','tz','dial','maze','chk','mat','order','roles','mind'],16:['chk','dos','roles','mat','tz','rec','vig','sudo','cal','evid'],17:['dos','chk','mat','tz','rec','sudo','mind','vig','dial','roles','wt','evall'],18:['swt','prm','cal','kn','gate','swt','evid'],19:['gate','cry','prm','swt','dos','chk','mat','evid'],20:['cry','gate','prm','swt','tz','rec','mat','dos','chk','evall'],21:['cry','gate','prm','swt','mind','dos','sudo','tz','chk','rec','cry','evid'],22:['cry','gate','prm','swt','dos','mat','tz','chk','rec','sudo','mind','vig','dial','cry','gate','evall']};
const TT=['','Qoldiq izlar','Yopiq kutubxona','Ikki guvoh','Yopiq seyf','Soat sinovi','Xiyonat soyasi','Laboratoriya','Maxfiy yakun','Soya laboratoriyasi',"Qo'ng'iroq",'Qora papka','Abadiy sikl','Oxirgi bekat','Nol laboratoriyasi','Jim shahar','Qarama-qarshi signal','Halqaning yuragi',"Yo'qolgan kunlar",'Soya arxivi',"Ko'zgu shahri",'Teskari soat','Oxirgi halqa'];
const S=['',"Tun. Siz tashlandiq xarobaga yetib keldingiz, devorlarda yangi izlar bor.","Yopiq kutubxona. Changli javonlar orasida kimdir shoshilib nimadir yashirgan.","Ikki guvoh bir-biriga zid gapiryapti. Kim haqiqatni aytyapti?","Yopiq seyf xonasi: raqamlar, disklar va yoshlar sirini ochish kerak.","Barcha tizimlar bir vaqtda ishga tushdi. Har daqiqa muhim.","Jamoa ichida kimdir sirni sotgan. Dalillar bir-biriga zid.","Laboratoriyaning yopiq qismi. Oldingi boblardagi dalillar endi kerak bo'ladi.","Maxfiy yakun. Hamma dalil va qarorlar hal qiladi.","Soya laboratoriyasi: eng chuqur qatlam, eng qiyin jumboqlar.","Qo'ng'iroq. Hamma narsa shu yerda hal bo'ladi.","Qora papka: ichidagi dalillarning bir qismi yolg'on. Haqiqatni toping.","Abadiy sikl. Oxirgi sinov: hamma narsa qaytadi.","Oxirgi bekat: noma'lum stansiyada uyg'onasiz. Soat ishlamaydi, chiqish eshigi yopiq.","Nol laboratoriyasi: stansiya tasodifiy emas, bu yerda vaqt bilan bog'liq tajriba o'tkazilgan.","Jim shahar: shahar bo'sh ko'rinadi, ammo ayrim tizimlar hali ishlayapti.","Qarama-qarshi signal: buyruqlar bir-biriga zid, kimga ishonishni o'zingiz hal qilasiz.","Halqaning yuragi: avvalgi boblardagi dalillar, buyumlar va qarorlar bir joyda kerak bo'ladi.","Yo'qolgan kunlar: stansiya jurnalida sanalar aralashgan. Hafta kunlari, lampalar va almashtirishlar tartibini tiklang.","Soya arxivi: hujjatlar shifrlangan, mantiqiy eshiklar yo'lni to'sadi.","Ko'zgu shahri: hamma narsa teskari ko'rinadi. Raqamli shifrlar va almashtirishlar.","Teskari soat: vaqt orqaga ketmoqda. Eng murakkab sxemalar boshlandi.","Oxirgi halqa: hamma yo'llar shu yerda tugaydi. Hammasi hal bo'ladi."];
const KD={prm:'Almashtirish zanjiri.',swt:'Lampa paneli.',gate:'Mantiqiy sxema.',cry:'Raqamli shifr (kriptarifm).',rec:'Resurslarni taqsimlash.',chk:'Qarama-qarshi signallar.',mat:'Jadval qoidasi.',tz:'Laboratoriya vaqt zonalari.',dos:`QORA PAPKA: dalillarning bir qismi yolg'on!`,wt:`Og'irlik belgilari.`,cal:'Kalendar jurnali.',bot:`Robot yo'li.`,op:"JAMOAVIY OPERATSIYA: kod, kamera va gumondorlar ma'lumoti turli odamlarda. Gaplashib kelishing!",morse:'Morze signallari.',book:'Kitob shifri.',maze:'Labirint xaritasi.',roles:'Guvohlar: kim rostgo\'y, kim yolg\'onchi?',eq:'Yoshlar jumbog\'i.',clock:'Buzuq soat.',lcm:'Soqchilar navbati.',sudo:'Seyf paneli.',mind:'Qulf paneli: oldingi urinishlar izlari qolgan.',order:'Kirish jurnali: kim qachon kirgani.',dial:'Mexanik disklar.',vig:'Kalitli shifr.',bin:'Binar chiroqlar.',cipher:'Shifrlangan yozuv.',seq:'Eshik paneli.',lock:'Raqamli qulf.',liar:"So'roq: guvohlardan biri yolg'on gapiryapti.",timeline:'Kuzatuv jurnali.',evid:'Dalillar arxivi.',evall:'Yakuniy mexanizm.'};
// ---------- AI (ixtiyoriy): faqat sahna matnini yozadi, javoblarni server tekshiradi ----------
async function ai(p){if(!AK)return'';try{const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'x-api-key':AK,'anthropic-version':'2023-06-01','content-type':'application/json'},body:JSON.stringify({model:process.env.AI_MODEL||'claude-haiku-5-5',max_tokens:220,messages:[{role:'user',content:p}]}),signal:AbortSignal.timeout(8000)});const j=await r.json();const t=(j.content?.[0]?.text||'').trim();if(!t){console.log('AI xato:',JSON.stringify(j.error||j).slice(0,200));elog('ai',JSON.stringify(j.error||j))}return t}catch(e){console.log('AI xato:',e.message);elog('ai',e.message);return''}}
// ---------- O'yin mantiqi ----------
const prem=u=>u.prem>Date.now(),ow=s=>db.u[s.m[0]];
const mk=(m,ch,ev,n)=>({m,n,ch,step:0,seed:Math.random()*1e9|0,en:100,ev:Object.fromEntries(Object.entries(ev).filter(([k])=>+k<ch)),fl:{ally:0,hid:m.some(id=>db.u[id]&&db.u[id].own&&db.u[id].own.includes('key'))?1:0},st:'puz',v:1,fh:0,msg:'',chat:[]});
async function enter(s){const kind=KS(s)[s.step],d=Math.max(1,Math.min(s.ch+(s.step>>1)+(s.n===1?((s.rc||0)>=4?1:0)-((s.er||0)>=3?1:0):0),24)),p=G[kind](rng(s.seed+s.ch*97+s.step*13+(s.rs||0)*1009),d,s.ev,s.prev);s.att=0;
 let tw=0;if((d>=3&&s.step>=2&&(!s.race&&Math.random()<.2+.03*Math.max(0,s.ch-8)))||(s.fx&&s.step===0)){s.fx=0;tw=1;p.q+=' ⚠️ DIQQAT: javobni TESKARI (oxiridan boshlab) yozing!';p.a=[...String(p.a)].reverse().join('');p.h="Avval javobni toping, so'ng teskari yozing. "+p.h}
 const base=`${S[s.ch]} ${KD[kind]}`+(s.step===0&&s.dc?` ${s.dc}`:'');
 const t=await ai(`Detektiv o'yin muallifi sifatida o'zbek tilida 2 gapdan iborat qisqa sahna yoz. Bob: "${TT[s.ch]}". Vaziyat: ${KD[kind]} Ittifoqchilar: ${s.fl.ally}, yashirilgan dalillar: ${s.fl.hid}. Faqat atmosfera: hech qanday raqam, javob yoki yechim yozma.`);
 let sv='',td=0;if(s.ch>=9&&s.step>=1&&(!s.race&&Math.random()<Math.min(.5,.1+.03*(s.ch-8)))){if(Math.random()<.5){sv='noise';const f=String(p.a)[0];let g;do g=/\d/.test(f)?String(Math.floor(Math.random()*10)):String.fromCharCode(65+Math.floor(Math.random()*26));while(g.toUpperCase()===f.toUpperCase());p.c=[...p.c,`⚠️ Shovqin (ishonchsiz manba): javob «${g}» bilan boshlanadi.`]}else{sv='timer';td=Date.now()+(45+d*5)*1000}}
 s.cur={c:p.c,q:p.q,a:p.a,h:p.h,story:t||base,ai:!!t,tw,sv,td,hinted:0};s.st='puz';s.v++}
async function chap(s){(db.cs[s.ch]||={st:0,dn:0,er:0}).st++;const a=[...PL[s.ch]],last=a.pop(),r=rng(s.seed+s.ch*31);a.sort(()=>r()-.5);(s.pl||={})[s.ch]=[...a,last];
 s.step=0;s.er=0;s.sh=0;s.t0=Date.now();s.hu=0;s.dl=Date.now()+(15+a.length*6)*6e4*(db.cfg.timeMul||1);s.fh=Math.min(s.fl.ally,2);s.en=Math.max(s.en,40);if(s.ch>=3&&Math.random()<.3){const e=Math.floor(Math.random()*4);let t;if(e===0){s.en=Math.max(20,s.en-15);t='🚨 Kutilmagan voqea: kuchlanish tushdi (−15 energiya).'}else if(e===1){s.dl=Date.now()+(s.dl-Date.now())*.8;t='🚨 Kutilmagan voqea: soat tezlashdi (vaqt −20%).'}else if(e===2){s.fh++;t='🍀 Kutilmagan omad: bepul maslahat topildi.'}else{s.fx=1;t="🚨 Kutilmagan voqea: signal buzildi, birinchi jumboqda qoida o'zgaradi!"}s.msg=(s.msg?s.msg+' ':'')+t;(s.log=s.log||[]).push(t)}
 if(s.n>1){const o=[0,1,2,3,4].sort(()=>r()-.5);s.rl={};s.m.forEach((id,i)=>s.rl[id]=o[i%5])}
 s.log=s.log||[];await enter(s)}
async function hurt(s){if(s.en<=0){s.en=60;s.seed=Math.random()*1e9|0;s.msg="💀 Energiya tugadi. Bob yangi jumboqlar bilan qayta boshlandi.";await chap(s)}}
function fin(s){(db.cs[s.ch]||={st:0,dn:0,er:0}).dn++;const ok=Date.now()<=s.dl,r=rng(s.seed+s.ch);if(ok)s.ev[s.ch]={n:ri(r,10,99),w:pick(r,W)};if(!db.hf[s.ch])db.hf[s.ch]={p:s.m.map(id=>nn(db.u[id]||{name:'?'})).join(', '),t:Date.now(),team:s.n>1?1:0};
 for(const id of s.m){const u=db.u[id];if(!u)continue;u.ev={...u.ev,...s.ev};if(!u.done.includes(s.ch))u.done.push(s.ch);u.max=Math.max(u.max,Math.min(s.ch+1,22));u.rp=u.rp||[];u.rp.unshift({ch:s.ch,er:s.er||0,min:Math.round((Date.now()-s.t0)/6e4),hu:s.hu||0,ev:ok?1:0,team:s.n>1?1:0,c:''});if(u.rp.length>8)u.rp.length=8;ssp(u,10);feed(u,`${s.ch}-bobni tugatdi`);chron(u,`${s.ch}-bob yakunlandi${ok?' (dalil topildi)':" (dalil yo'qoldi)"}`);unkgen(u,s,ok);u.cnt++;if(s.n>1)u.tw++;if(!s.er){u.clean++;u.inv.dec=(u.inv.dec||0)+1}if(ok&&!u.col.includes(COLS[s.ch]))u.col.push(COLS[s.ch]);if(s.fl.hid>0&&!s.er){pay(u,40,'🗝 Maxfiy xona');u.col.push('⭐ '+COLS[s.ch]+' (noyob)');u.secret++}if(s.ch>=7&&s.n>1)u.hardteam++;ach(u)}
 s.cl=s.m[Math.floor(Math.random()*s.m.length)];(s.log=s.log||[]).push(`${s.ch}-bob yakunlandi${ok?': dalil topildi':": dalil yo'qoldi"}`);
 s.msg=ok?"🗝 Bob yakunlandi, yangi dalil topildi!":"⏳ Vaqt o'tib ketdi — dalil yo'qoldi.";if(s.fl.hid>0&&!s.er)s.msg+=' 🗝 Maxfiy xona ochildi: +40 🪙 va noyob hujjat!';if(!s.er)s.msg+=' 🧩 Xatosiz bob: Shifr ochish vositasi oldingiz.';s.st='choice'}
function endg(s){s.st='end';(db.st[dk(Date.now())]||={gs:0,ge:0}).ge++;s.end=s.ch>=8?(s.fl.ally>=3?'true':'secret'):'good';for(const id of s.m){const u=db.u[id];if(!u)continue;if(!u.end.includes(s.end))u.end.push(s.end);u.games++;pay(u,15,"O'yin yakuni bonusi");ach(u)}s.v++}
async function nxt(s){if(s.ch===8||s.ch>=22||(s.ch===7&&Object.keys(s.ev).length<7))return endg(s);s.ch++;if(s.ch>=21&&!prem(ow(s))){s.st='lock';s.v++;return}await chap(s)}
const view=(s,uid)=>{const i=Math.max(0,s.m.indexOf(uid)),c=s.cur||{},u=db.u[uid]||{inv:{}},K=KS(s),ro=s.rl&&s.rl[uid];
 let cl=(c.c||[]).filter((_,j)=>j%s.n===i);if(s.n>1&&ro!==undefined&&ro===KR[K[s.step]]&&c.h)cl=[...cl,`🔎 ${ROLES[ro]} ma'lumoti: ${c.h}`];
 if(s.n>1&&(K[s.step]==='op'||K[s.step]==='dos'))for(const id of s.m)if(id!==uid&&((u.tr||{})[id]||0)>=3){const jj=s.m.indexOf(id);cl=[...cl,...(c.c||[]).filter((_,j)=>j%s.n===jj).map(x=>'🤝 '+x)]}
 return{k:s.st,ch:s.ch,t:TT[s.ch],step:s.step+1,tot:K.length,story:c.story,clues:cl,role:s.n>1?`${i+1}/${s.n}`:'',rn:s.n>1&&ro!==undefined?ROLES[ro]:'',n:s.n,q:c.q,en:s.en,ev:s.ev,hint:c.hinted?c.h:'',fh:s.fh,dl:s.dl,v:s.v,msg:s.msg,fl:s.fl,end:s.end,ai:c.ai?1:0,tw:c.tw?1:0,coins:u.coins||0,cn:(s.cn||{})[uid]||0,cl:(s.cl===uid||!s.m.includes(s.cl))?1:0,kd:K[s.step],xh:c.xh||'',sv:c.sv||'',race:s.race?s.race.t:'',lk:Math.max(0,(s.lk||0)-Date.now()),td:c.td||0,now:Date.now(),call:CT[s.ch]||null,inv:u.inv,mem:s.m.map(id=>({id,n:db.u[id]?nn(db.u[id]):'?',rl:s.rl&&s.rl[id]!==undefined?ROLES[s.rl[id]]:'',on:db.u[id]?onl(db.u[id]):false,tr:(u.tr||{})[id]||0})),cln:s.cl&&db.u[s.cl]?nn(db.u[s.cl]):'',log:(s.log||[]).slice(-8),chat:(s.chat||[]).slice(-40),hi:u.inv.hint||0}};
const ses=(u,b)=>{const s=db.s[b.room?skey(String(b.room).toUpperCase(),u.id):'s'+u.id];if(!s||!s.m.includes(u.id))E("O'yin topilmadi");s.gap=Date.now()-(s.ts||Date.now());s.ts=Date.now();return s};
const DEF=()=>({coins:0,hist:[],inv:{},own:[],eq:{},nick:'',ok:0,bad:0,games:0,streak:0,days:[],ach:[],cnt:0,tw:0,clean:0,hardteam:0,bs:0,gs:0,src:'',ban:0,fr:{},rd:{},ti:[],hide:0,rp:[],tr:{},chr:[],unk:[],unkd:0,fd:[],mute:0,dq:{d:0,c:{ok:0,qk:0,du:0},cl:[]},dw:0,dl:0,cls:0,cld:{d:0,n:0},cq:null,col:[],qs:null,qd:{d:0,runs:0,best:0},qbest:0,qk:0,secret:0,dy:{d:0,ok:0,att:0}});
const U=x=>{const u=db.u[x.id]||={id:x.id,max:1,done:[],ev:{},end:[],prem:0,room:null};const D=DEF();for(const k in D)if(!(k in u))u[k]=D[k];u.name=(x.first_name||"O'yinchi").slice(0,20);u.last=Date.now();if(!u.first)u.first=Date.now();if(x.username)u.un=x.username;
 const t=new Date().toISOString().slice(0,10);if(!u.days.includes(t)){u.days.push(t);if(u.days.length>400)u.days.shift()}return u};
const QW=['KALIT','DARYO','MASHAL','SOYA','TUMAN','ZANJIR'];
const qk=r=>{const t=ri(r,0,4);if(t===0){const a=ri(r,2,30),b=ri(r,2,9),c=ri(r,2,9);return{q:`${a} + ${b} × ${c} = ?`,a:String(a+b*c)}}
 if(t===1){const a=ri(r,1,20),d=ri(r,2,9);return{q:`${[0,1,2,3].map(i=>a+d*i).join(', ')}, ?`,a:String(a+4*d)}}
 if(t===2){const w=pick(r,QW),c=pick(r,[...w]);return{q:`${w} so'zida «${c}» harfi necha marta?`,a:String([...w].filter(x=>x===c).length)}}
 if(t===3){const a=ri(r,1,9)*20,p=pick(r,[10,25,50]);return{q:`${a} ning ${p}% i?`,a:String(a*p/100)}}
 const a=ri(r,12,99),b=ri(r,12,99);return{q:`${a} × ${b} ning oxirgi raqami?`,a:String(a*b%10)}};
const qv=u=>{const z=u.qs;return{q:z.T[z.i].q,i:z.i,ok:z.ok,st:z.st,score:z.score,left:Math.max(0,6e4-(Date.now()-z.t0)-z.pen)}};
const qf=u=>{const z=u.qs;z.end=1;const left=Math.max(0,6e4-(Date.now()-z.t0)-z.pen);if(z.i>=10)z.score+=Math.floor(left/10000);let c=0;
 if(u.qd.runs<3){c=Math.min(30,z.score);if(c)pay(u,c,'Tezkor sinov')}u.qd.runs++;if(z.score>u.qd.best)u.qd.best=z.score;if(z.score>u.qbest)u.qbest=z.score;u.qk+=z.ok;ssp(u,Math.floor(z.score/2));dqf(u).c.qk=Math.max(dqf(u).c.qk,z.score);
 if(z.ms>=8)u.inv.kkey=(u.inv.kkey||0)+1;ach(u);return{end:1,score:z.score,ok:z.ok,ms:z.ms,coins:c,key:z.ms>=8?1:0,best:u.qd.best,gbest:u.qbest,runs:u.qd.runs}};
const dash=()=>{const L=Object.values(db.u),now=Date.now(),day=n=>dk(now-n*864e5),cnt=n=>{const S=new Set(Array.from({length:n},(_,i)=>day(i)));return L.filter(u=>u.days.some(d=>S.has(d))).length};
 const ss=Object.values(db.s).filter(s=>s.st!=='end'&&s.m.some(id=>db.u[id]&&now-(db.u[id].last||0)<3e5)),nw=n=>L.filter(u=>u.first&&now-u.first<n*864e5).length;
 const series=Array.from({length:14},(_,i)=>{const d=day(13-i),x=db.st[d]||{};return{d:d.slice(5),act:L.filter(u=>u.days.includes(d)).length,nw:L.filter(u=>u.first&&dk(u.first)===d).length,gs:x.gs||0,ge:x.ge||0}});
 const F=[['Botni /start qilgan',L.filter(u=>u.bs).length],['Mini App ochgan',L.length],["O'yinni boshlagan",L.filter(u=>u.gs>0).length],...[1,2,3,4,5,6,7,8].map(n=>[`${n}-bobni tugatgan`,L.filter(u=>u.done.includes(n)).length]),['Boshqa kuni qaytgan',L.filter(u=>u.days.length>=2).length]];
 const SR={};L.forEach(u=>{const k=u.src||"(to'g'ridan)",o=SR[k]||={s:k,n:0,p:0,r:0};o.n++;if(u.gs>0)o.p++;if(u.days.length>=2)o.r++});
 const top=[...L].sort((a,b)=>b.coins-a.coins).slice(0,10).map(u=>({id:u.id,n:nn(u),c:u.coins}));
 return{total:L.length,dau:cnt(1),wau:cnt(7),mau:cnt(30),act:L.filter(u=>now-(u.last||0)<3e5).length,sg:ss.filter(s=>s.n===1).length,tg:ss.filter(s=>s.n>1).length,nw1:nw(1),nw7:nw(7),nw30:nw(30),series,F,
  ch:Object.entries(db.cs).map(([n,x])=>({n:+n,...x})).sort((a,b)=>a.n-b.n),ks:Object.entries(db.ks).map(([k,x])=>({k,...x})).sort((a,b)=>(b.ok+b.bad)-(a.ok+a.bad)),src:Object.values(SR).sort((a,b)=>b.n-a.n).slice(0,10),
  coins:{circ:L.reduce((a,u)=>a+u.coins,0),e:db.co.e,s:db.co.s,top},pay:{n:db.pay.length,stars:db.pay.reduce((a,p)=>a+p.a,0),prem:L.filter(u=>u.prem>now).length,fail:Math.max(0,db.pa-db.pay.length)},
  tech:{bk:db.cfg.bkt||0,up:Math.floor(process.uptime()),mem:Math.round(process.memoryUsage().rss/1048576),db:JSON.stringify(db).length,maint:db.cfg.maint,bc:db.bc},cfg:db.cfg,cp:db.cp.slice(0,15).map(x=>({id:x.id,n:x.n,w:x.w,h:x.h})),fb:db.fb.slice(0,30),disp:db.disp.filter(x=>x.st==='new').slice(0,20),err:db.err.slice(0,30),alog:db.alog.slice(0,40),shop:IT.map(i=>({id:i.id,n:i.n,p:db.cfg.prices[i.id]||i.p}))}};
const report=()=>{const d=dash(),t=d.series[13],e24=db.err.filter(e=>Date.now()-e.t<864e5).length,w=d.ch.filter(c=>c.st>=5).map(c=>({n:c.n,r:c.dn/c.st})).sort((a,b)=>a.r-b.r)[0];
 return`📊 <b>LOOPBREAK — kunlik hisobot</b>\n\nYangi foydalanuvchilar: <b>+${d.nw1}</b>\nFaol (bugun): <b>${d.dau}</b>\nBoshlangan / tugatilgan o'yinlar: <b>${t.gs} / ${t.ge}</b>\nJami foydalanuvchilar: <b>${d.total}</b>\nXatolar (24 soat): <b>${e24}</b>\n\n💡 `+(w&&w.r<.5?`Tavsiya: ${w.n}-bobni yakunlash ko'rsatkichi ${Math.round(w.r*100)}%. Shu bobning qiyinligi va ishlashini tekshiring.`:"Tavsiya uchun hali yetarli ma'lumot yo'q (kamida 5 ta boshlangan bob kerak).")};
async function sendBackup(){if(!AID)return false;try{const f=new FormData();f.append('chat_id',AID);f.append('disable_notification','true');f.append('caption','💾 LOOPBREAK zaxira: '+new Date().toISOString().slice(0,16).replace('T',' ')+' UTC. O\'chirmang: server qayta ishga tushsa baza shu yerdan tiklanadi.');f.append('document',new Blob([JSON.stringify(db)],{type:'application/json'}),'loopbreak-backup.json');
 const r=await fetch(`https://api.telegram.org/bot${T}/sendDocument`,{method:'POST',body:f}).then(r=>r.json());if(!r.ok){elog('backup',r.description||'sendDocument xato');return false}
 const id=r.result.message_id;await tg('pinChatMessage',{chat_id:AID,message_id:id,disable_notification:true});const old=db.cfg.bkm;if(old&&old!==id)await tg('deleteMessage',{chat_id:AID,message_id:old});db.cfg.bkm=id;db.cfg.bkt=Date.now();dirty=0;lastBk=Date.now();return true}catch(e){elog('backup',e.message);return false}}
async function restore(){if(!AID)return false;try{const c=await tg('getChat',{chat_id:AID}),d=c.result&&c.result.pinned_message&&c.result.pinned_message.document;if(!d)return false;
 const f=await tg('getFile',{file_id:d.file_id});if(!f.ok)return false;const j=await fetch(`https://api.telegram.org/file/bot${T}/${f.result.file_path}`).then(r=>r.json());if(!j||typeof j.u!=='object')return false;db=j;return true}catch(e){console.log('Tiklash xato:',e.message);return false}}
function jobs(){if(!AID)return;if(Date.now()-(db.cfg.ls||0)>36e5){db.cfg.ls=Date.now();tg('sendMessage',{chat_id:AID,text:'🟢 LOOPBREAK ishga tushdi'})}let la=0;
 setInterval(()=>{const n=db.err.filter(e=>Date.now()-e.t<6e5).length;if(n>=10&&Date.now()-la>36e5){la=Date.now();tg('sendMessage',{chat_id:AID,text:`⚠️ Oxirgi 10 daqiqada ${n} ta xato. Mini App → Admin → Jurnal bo'limini tekshiring.`})}},6e4);
 setInterval(()=>{const k=dk(Date.now());if(new Date().getUTCHours()===4&&db.cfg.lr!==k){db.cfg.lr=k;save();tg('sendMessage',{chat_id:AID,text:report(),parse_mode:'HTML'})}},6e5);
 setInterval(()=>{if(dirty&&Date.now()-lastBk>18e5)sendBackup()},3e5);setInterval(()=>fetch(WU+'/health').catch(()=>{}),6e5)}
const fix=x=>{const D=DEF();for(const k in D)if(!(k in x))x[k]=D[k];return x},gx=id=>db.u[id]?fix(db.u[id]):null;
const onl=x=>!x.hide&&Date.now()-(x.last||0)<3e5,dmk=(a,b)=>a<b?a+'_'+b:b+'_'+a;
const ntf=(id,text)=>{const t=db.u[id];if(!t||!t.bs)return;tg('sendMessage',{chat_id:id,text,reply_markup:{inline_keyboard:[[{text:"🎮 LOOPBREAK ni ochish",web_app:{url:WU}}]]}})};
const pub=x=>({id:x.id,n:nn(x),on:onl(x),title:(x.ach||[]).includes('legend')?'🎖️ Afsonaviy tergovchi':'',lvl:Math.floor((x.ok||0)/10)+1});
const QD=[{id:'ok',t:"5 ta to'g'ri javob (boblarda)",n:5,r:15},{id:'qk',t:'Tezkor sinovda 10 ball',n:10,r:20},{id:'du',t:"Do'st bilan duel o'ynash",n:1,r:25}];
const dqf=u=>{if(u.dq.d!==dayN())u.dq={d:dayN(),c:{ok:0,qk:0,du:0},cl:[]};return u.dq};
const feed=(u,txt)=>{for(const[id,st]of Object.entries(u.fr||{})){if(st!=='f')continue;const x=db.u[id];if(!x||x.mute)continue;(x.fd=x.fd||[]).unshift({t:Date.now(),txt:`${nn(u)} ${txt}`});if(x.fd.length>30)x.fd.length=30}};
const DUK=['cipher','mind','order','roles','sudo','dial','lcm','vig','maze','eq','clock','book','cal','bot','wt','dos'];
const MKI={lamp:'🔦 Fonar',dec:'🧩 Shifr vositasi',kkey:'🗝️ Kalit',hint:'💡 Ishora',shield:'🛡️ Himoya'};
const base=i=>{const it=IT.find(x=>x.id===i);return db.cfg.prices[i]||(it?it.p:100)};
const moffers=()=>{const td=dayN(),ids=Object.keys(MKI),r=rng(td*31+7),a=ids[Math.floor(r()*ids.length)];let b;do b=ids[Math.floor(r()*ids.length)];while(b===a);return[a,b].map(i=>({item:i,n:MKI[i],p:Math.max(10,Math.round(base(i)*(.65+r()*.1)))}))};
const WE=[{t:"Shahar chiroqlari o'chdi.",a:"Generatorni ishga tushirish (+10% tanga)",b:"Qorong'ulikdan foydalanish (+25% tanga, xato jazosi ×1.5)"},{t:"Arxivda yong'in boshlandi.",a:"Yong'inni o'chirish (+10% tanga)",b:"Hujjatlarni olib chiqish (+25% tanga, xato jazosi ×1.5)"},{t:"Chekkada sirli signal paydo bo'ldi.",a:"Signalni o'chirish (+10% tanga)",b:"Signalni kuzatish (+25% tanga, xato jazosi ×1.5)"},{t:"Soqchilar almashdi.",a:"Navbatchilikni kuchaytirish (+10% tanga)",b:"Bo'shliqdan foydalanish (+25% tanga, xato jazosi ×1.5)"},{t:"Ko'prik yopildi.",a:"Ko'prikni tuzatish (+10% tanga)",b:"Aylanma yo'ldan borish (+25% tanga, xato jazosi ×1.5)"},{t:"Noma'lum yuk keldi.",a:"Yukni topshirish (+10% tanga)",b:"Yukni ochish (+25% tanga, xato jazosi ×1.5)"},{t:"Metroda blackout.",a:"Elektrni qaytarish (+10% tanga)",b:"Tunnelga kirish (+25% tanga, xato jazosi ×1.5)"}];
const wdUpdate=()=>{const w=db.wd,td=dayN();if(w.day===td)return;if(w.day){const ev=WE[w.day%WE.length],n=w.v.a+w.v.b,c=w.v.b>w.v.a?'b':'a';w.eff=n?{mul:c==='b'?1.25:1.1,pm:c==='b'?1.5:1,txt:`${ev.t} Jamoa tanlovi: ${c==='b'?ev.b:ev.a}`}:{mul:1,pm:1,txt:''};w.hist.unshift({d:w.day,txt:`${ev.t} → ${n?(c==='b'?ev.b:ev.a):'ovoz yo\'q'}`});if(w.hist.length>7)w.hist.length=7}w.day=td;w.v={a:0,b:0};w.by={}};
const wdm=()=>{wdUpdate();return db.wd.eff.mul||1},wdp=()=>{wdUpdate();return db.wd.eff.pm||1};
const uw=u=>{const L=W.filter(x=>x.length>=5&&x.length<=8);return L[u.id%L.length]};
const unkgen=(u,s,ok)=>{const w=uw(u),ch=s.ch;if(ch>w.length||u.unk.some(m=>m.ch===ch))return;const ev=s.ev[ch],n=ev?ev.n:null,f=s.fl,r=rng((u.id%1e6)+ch*7+s.seed);
 const mood=f.ally>0?"Yordam bergan odam seni yodda tutadi.":f.hid>0?"Yashirgan narsang ko'zdan chetda emas.":!s.er?"Xatosiz yurding, bu ko'zga tashlanadi.":"Yo'ling og'ir bo'ldi, ammo o'tding.";
 const mm=(num,l,fk)=>({ch,fake:fk,txt:`«${mood}» Dalil raqami: ${num==null?"yo'q":num}. ${ch}-harf: «${l}».`}),msgs=[mm(n,w[ch-1],0)];
 if(r()<.6){let l;do l=String.fromCharCode(65+ri(r,0,25));while(l===w[ch-1]);const d=ri(r,1,9);msgs.push(mm(n==null?ri(r,10,99):(n+d>99?n-d:n+d),l,1))}
 msgs.sort(()=>r()-.5);u.unk.push(...msgs);if(u.unk.length>40)u.unk.splice(0,u.unk.length-40)};
const duelEnd=z=>{const A=z.r[z.a],B=z.r[z.b];let w='d';if(A.ok&&B.ok)w=A.ms<B.ms?'a':B.ms<A.ms?'b':'d';else if(A.ok)w='a';else if(B.ok)w='b';z.st='done';z.w=w;z.t=Date.now();
 const ua=db.u[z.a],ub=db.u[z.b],wu=w==='a'?ua:w==='b'?ub:null,lu=w==='a'?ub:w==='b'?ua:null;
 for(const[u,r]of[[ua,A],[ub,B]]){if(!u)continue;dqf(u).c.du++;const fast=r.ok&&r.ms<1500;if(w==='d'){if(r.ok&&!fast)pay(u,5,'⚔️ Duel: durang')}else if(u===wu){u.dw=(u.dw||0)+1;if(!fast)pay(u,20,"⚔️ Duel g'alabasi");else alog(`⚠️ Duelda shubhali tezlik: ${nn(u)}`);if(lu)feed(u,`duelda ${nn(lu)} ustidan g'alaba qozondi ⚔️`)}else u.dl=(u.dl||0)+1}
 for(const[id,c]of Object.entries(z.pr)){const u=db.u[id];if(u&&c===w)pay(u,5,"👁️ Taxmin to'g'ri chiqdi")}
 return w==='d'?'Duel durang bilan tugadi':`G'olib: ${nn(db.u[w==='a'?z.a:z.b]||{name:'?'})}`};
const chron=(u,t)=>{u.chr=u.chr||[];u.chr.unshift({t:Date.now(),x:t});if(u.chr.length>60)u.chr.length=60};
const RC=[{id:'prism',n:'🔮 Prizma',need:{lamp:1,dec:1,kkey:1}},{id:'hint',n:'💡 Ishora',need:{lamp:1,kkey:1}},{id:'shield',n:'🛡️ Himoya',need:{hint:2}},{id:'dec',n:'🧩 Shifr vositasi',need:{lamp:2}},{id:'kkey',n:'🗝️ Kalit',need:{dec:1,lamp:1}}];
const CT={13:{q:"Eshik yopiq, signal o'chmoqda. Nimani tanlaysan?",a:"Jamoani oldinga o'tkazish (ittifoqchi, +30 energiya, 🔦)",b:"Stansiya jurnalini olib chiqish (yashirin dalil, −20 energiya)"},14:{q:"Laboratoriyada ikkita tajriba yozuvi bir-biriga zid. Qaysi birini saqlaysan?",a:"Jamoa xavfsizligini saqlash (ittifoqchi)",b:"Haqiqiy yozuvni yashirincha nusxalash (yashirin dalil)"},15:{q:"Shahar ikki yo'lga bo'linadi: xavfsiz yo'l yoki kalit saqlangan yo'l.",a:"Xavfsiz yo'l (jamoani qutqarish)",b:"Kalit yo'li (haqiqatni bilish)"},16:{q:"Ikki buyruq bir-biriga zid. Kimga ishonasan?",a:"Jamoa ovoziga ishonish (ittifoqchi)",b:"Dalillarga ishonish (yashirin dalil)"},17:{q:"Halqaning yuragi: oxirgi qaror. Jamoani saqlaysanmi yoki haqiqatni ochasanmi?",a:"Jamoani saqlash",b:"Haqiqatni ochish"}};
Object.assign(CT,{18:{q:'Sanalar aralashib ketdi. Qaysi daftarni saqlaysan?',a:'Jamoa daftarini saqlash (ittifoqchi)',b:'Yashirin sahifani nusxalash (yashirin dalil)'},19:{q:'Arxiv eshigida ikki kalit bor.',a:'Umumiy kalit (jamoani qutqarish)',b:"Soya kaliti (haqiqatni bilish)"},20:{q:"Ko'zgudagi aks sizni chaqiryapti.",a:'Jamoaga qaytish (ittifoqchi)',b:"Aksga ergashish (yashirin dalil)"},21:{q:'Soat orqaga yurmoqda. Vaqtni to\'xtatasanmi yoki o\'tganini ko\'rasanmi?',a:"Vaqtni to'xtatish (jamoani saqlash)",b:"O'tmishni ko'rish (haqiqat)"},22:{q:'Oxirgi halqa: hammasini yopasanmi yoki ochasanmi?',a:'Halqani yopish (jamoa)',b:'Halqani ochish (haqiqat)'}});
const skey=(code,uid)=>{const r=db.r[code];return r&&r.mode==='two'&&r.tm&&r.tm[uid]?'r'+code+r.tm[uid]:'r'+code};
function raceEnd(s){const r=db.r[s.race.code]||{},res=r.res=r.res||{},t=s.race.t,ot=t==='A'?'B':'A';s.st='end';s.end='race';s.v++;
 if(!res.w){res.w=t;for(const id of s.m){const u=db.u[id];if(u){pay(u,20,"🏁 Poyga g'alabasi");u.games++;chron(u,`${s.ch}-bobda jamoa poygasida g'alaba qozondi`)}}s.msg=`🏆 ${t} jamoasi (siz) birinchi tugatdi! +20 🪙`;const o=db.s['r'+s.race.code+ot];if(o&&o.st!=='end'){o.msg=`⚡ ${t} jamoasi bobni tugatdi! Shoshiling!`;o.v++}}
 else{for(const id of s.m){const u=db.u[id];if(u){pay(u,5,'🏁 Poyga ishtiroki');u.games++}}s.msg=`🏁 ${res.w} jamoasi sizdan oldin tugatdi. +5 🪙`}}
const MON=['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentyabr','Oktyabr','Noyabr','Dekabr'];
const ssUpdate=()=>{const c=new Date().toISOString().slice(0,7),z=db.ss;if(z.id===c)return;if(z.id){const L=Object.entries(z.pts).sort((a,b)=>b[1]-a[1]);L.forEach(([id,p],i)=>{const u=db.u[id];if(!u)return;const rw=i===0?300:i===1?200:i===2?100:p>=50?50:0;if(rw)pay(u,rw,`🏆 ${z.t}`);if(i<3)u.col.push(`🏅 ${z.t} — ${i+1}-o'rin`)});db.hist.unshift({t:z.t,top:L.slice(0,3).map(([id,p])=>({n:nn(db.u[id]||{name:'?'}),p}))});if(db.hist.length>6)db.hist.length=6}db.ss={id:c,t:MON[+c.slice(5)-1]+' mavsumi',pts:{}}};
const ssp=(u,n)=>{ssUpdate();db.ss.pts[u.id]=(db.ss.pts[u.id]||0)+n};
const WK=[{k:'dos',t:'Qora papka haftaligi'},{k:'cry',t:'Kriptarifm haftaligi'},{k:'gate',t:'Mantiq eshiklari haftaligi'},{k:'maze',t:'Labirint haftaligi'},{k:'mind',t:'Maxfiy kod haftaligi'},{k:'prm',t:'Almashtirish haftaligi'},{k:'kn',t:'Sumka haftaligi'}];
const wkev=()=>{const w=Math.floor((dayN()+3)/7);return{...WK[w%WK.length],end:(w+1)*7-3}};
const CLK=['cipher','bin','morse','book','vig'],BADW=/(fuck|shit|bitch|sikaman|qotoq|jinni|nigga|porn|xuy)/i;
const cenc=(m,w,sh)=>{const A=[...w];return m==='rev'?A.reverse().join(''):m==='caesar'?A.map(c=>String.fromCharCode((c.charCodeAt(0)-65+sh)%26+65)).join(''):m==='morse'?A.map(c=>MC[c]).join(' / '):A.map(c=>(c.charCodeAt(0)-64).toString(2).padStart(5,'0').replace(/1/g,'●').replace(/0/g,'○')).join('  ')};
const cdesc=(m,sh)=>m==='rev'?'Yozuv teskari yozilgan.':m==='caesar'?`Har harf alifboda ${sh} qadam oldinga surilgan.`:m==='morse'?'Morze kodi (harflar / bilan ajratilgan).':'Binar chiroqlar: ● = 1, ○ = 0; A=1, B=2 ...';
const ROT=[{id:'r_ghost',n:'👻 Arvoh emojisi',p:60,k:'emo',v:'👻',d:'Haftalik cheklangan'},{id:'r_star',n:'⭐ Yulduz emojisi',p:60,k:'emo',v:'⭐',d:'Haftalik cheklangan'},{id:'r_moon',n:'🌙 Oy emojisi',p:60,k:'emo',v:'🌙',d:'Haftalik cheklangan'},{id:'r_gem',n:'💎 Olmos emojisi',p:80,k:'emo',v:'💎',d:'Haftalik cheklangan'},{id:'r_t1',n:'GHOST laqabi',p:180,k:'title',v:'GHOST',d:'Haftalik cheklangan'},{id:'r_t2',n:'ARCHITECT laqabi',p:180,k:'title',v:'ARCHITECT',d:'Haftalik cheklangan'},{id:'r_f2',n:'🔥 Olov ramkasi',p:260,k:'frame',v:'frm2',d:'Haftalik cheklangan'},{id:'r_n',n:'Binafsha nik',p:140,k:'nick',v:'violet',d:'Haftalik cheklangan'}];
const rotNow=()=>{const w=Math.floor((dayN()+3)/7),r=rng(w*77+5),ids=ROT.map((_,i)=>i).sort(()=>r()-.5).slice(0,4);return ROT.filter((_,i)=>ids.includes(i)).map(x=>({...x,rot:1,left:(w+1)*7-3-dayN()}))};
const adl=u=>{if(!u.ad||u.ad.d!==dayN())u.ad={d:dayN(),cr:0,sm:0,rx:0,gr:0};return u.ad};
const arr=u=>u.ar||(u.ar={cr:0,sm:0,rx:0,gr:0});
const arPay=(u,g,c,why)=>{const a=adl(u);if(a[g]>=5||c<=0)return 0;a[g]++;pay(u,c,why);return c};
const asmShow=lv=>1200+450*(3+lv),asmSeq=u=>{const q=u.asm,s=Array.from({length:3+q.lv},()=>Math.floor(Math.random()*6));q.seq=s;q.t=Date.now();return s};
const nn=u=>u.nick||u.name,pay=(u,n,w)=>{u.coins+=n;db.co[n>0?'e':'s']+=Math.abs(n);u.hist.unshift({t:Date.now(),n,w});if(u.hist.length>40)u.hist.length=40};
const AC=[['first','Birinchi qadam','1-bobni tugatish',20,u=>u.done.includes(1)],['sharp',"O'tkir zehn","Ketma-ket 5 ta to'g'ri javob",30,u=>u.streak>=5],['hero','Jamoa qahramoni','Jamoa bilan bobni yakunlash',50,u=>u.tw>0],['truth','Yashirin haqiqat','Yashirin yoki haqiqiy yakunni ochish',100,u=>u.end.some(e=>e!=='good')],['ten','Chempion','10 ta bobni tugatish',60,u=>u.cnt>=10],['three','Uch yakun','3 xil yakunni ochish',80,u=>u.end.length>=3],['week','7 kun',"7 kun o'ynash",70,u=>u.days.length>=7],['clean','Xatosiz bob','Bobni birorta xatosiz tugatish',40,u=>u.clean>0],['hard','Eng qiyin bob','7-bobni jamoa bilan yengish',80,u=>u.hardteam>0],['codeh','Kod ovchisi','Code Rush: 4 urinishda yechish',30,u=>u.ar&&u.ar.cr>0&&u.ar.cr<=4],['memo','Fotografik xotira','Shadow Memory: 8-daraja',40,u=>u.ar&&u.ar.sm>=8],['lightn','Chaqmoq','Reaction Zero: 300 ms dan tez',40,u=>u.ar&&u.ar.rx>0&&u.ar.rx<300],['labm','Shifr laboratoriyasi','25 ta laboratoriya jumboqini yechish',50,u=>(u.cls||0)>=25],['master','Shifr ustasi','30 ta tezkor javob',60,u=>u.qk>=30],['shadow','Soya detektivi','Maxfiy xona yoki yashirin yakunni ochish',90,u=>u.secret>0||u.end.includes('secret')],['legend','Afsonaviy tergovchi','8 asosiy bobni tugatish',150,u=>[1,2,3,4,5,6,7,8].every(c=>u.done.includes(c))]];
const ach=u=>{for(const a of AC)if(!u.ach.includes(a[0])&&a[4](u)){u.ach.push(a[0]);pay(u,a[3],'🏆 '+a[1]);feed(u,`«${a[1]}» yutug'ini ochdi 🏆`);chron(u,`Yutuq: ${a[1]}`)}};
const IT=[{id:'crown',n:'👑 Chat toji',p:100,k:'own',d:"Chatda ismingiz oldida toj"},{id:'e_wolf',n:"🐺 Bo'ri",p:40,k:'emo',v:'🐺',d:'Chat emojisi'},{id:'e_skull',n:'💀 Bosh suyagi',p:40,k:'emo',v:'💀',d:'Chat emojisi'},{id:'e_det',n:'🕵️ Detektiv',p:40,k:'emo',v:'🕵️',d:'Chat emojisi'},{id:'e_fire',n:'🔥 Olov',p:40,k:'emo',v:'🔥',d:'Chat emojisi'},
{id:'t_det',n:'DETECTIVE laqabi',p:150,k:'title',v:'DETECTIVE',d:'Chatda ism yonida'},{id:'t_sh',n:'SHADOW laqabi',p:150,k:'title',v:'SHADOW',d:'Chatda ism yonida'},{id:'t_ls',n:'LAST SURVIVOR laqabi',p:250,k:'title',v:'LAST SURVIVOR',d:'Chatda ism yonida'},
{id:'n_gold',n:'Oltin nik',p:120,k:'nick',v:'gold',d:'Nikingiz oltin rangda'},{id:'n_neon',n:'Neon nik',p:120,k:'nick',v:'neon',d:'Nikingiz neon rangda'},{id:'frame',n:'✨ Neon avatar ramkasi',p:200,k:'frame',v:'frm',d:'Profilda yorqin ramka'},
{id:'hint',n:"🔍 Qo'shimcha ishora",p:250,k:'cons',d:"1 ta bepul maslahat (javobni ochmaydi)"},{id:'shield',n:'🛡️ Bir martalik himoya',p:300,k:'cons',d:"Bitta xatoning energiya jazosini yo'qotadi"},
{id:'lamp',n:'🔦 Fonar',p:80,k:'cons',d:'Ko\'rinadigan jumboqlarda (labirint, sudoku, binar, tartib) javob uzunligi va birinchi belgisini ochadi'},{id:'dec',n:'🧩 Shifr ochish vositasi',p:120,k:'cons',d:'Shifrlarda (oddiy, kalitli, Morze, kitob, binar) javob uzunligi va birinchi belgisini ochadi'},{id:'kkey',n:'🗝️ Kalit',p:80,k:'cons',d:'Raqamli jumboqlarda (qulf, disk, kod, ketma-ketlik, yosh, soat) birinchi belgini ochadi'},{id:'badge',n:'🏅 Afsonaviy belgi',p:400,k:'own',d:'Profil va chatda maxsus belgi'},{id:'key',n:'🗝️ Maxsus imkoniyat',p:600,k:'own',d:"Har o'yinni 1 ta yashirin dalil bilan boshlaysiz"}];
const pre=u=>(u.don>0?'💖':'')+(u.own.includes('badge')?'🏅':'')+(u.own.includes('crown')?'👑':'')+(u.eq.emoji||'')+(u.eq.title?` [${u.eq.title}]`:'');
const COLS=['','Eski xarita parchasi','Kutubxona kartasi',"Guvoh ko'rsatmasi",'Seyf kaliti nusxasi','Buzuq soat mexanizmi','Xiyonat xati','Laboratoriya jurnali','Maxfiy yakun muhri','Soya artefakti',"Qo'ng'iroq yozuvi",'Qora papka dosyesi','Abadiy sikl muhri','Stansiya xaritasi','Tajriba qaydlari','Shahar kaliti','Signal yozuvi','Halqa yuragi','Yo\'qolgan kun daftari','Soya arxivi kaliti','Ko\'zgu parchasi','Teskari soat mexanizmi','Oxirgi halqa muhri'];
const ID={prism:{n:'🔮 Prizma',k:[],d:'Kutilmagan vaziyat'},lamp:{n:'🔦 Fonar',k:['maze','sudo','bin','order'],d:'Ko\'rinadigan jumboqlar'},dec:{n:'🧩 Shifr vositasi',k:['cipher','vig','morse','book','bin'],d:'Shifrlar'},kkey:{n:'🗝️ Kalit',k:['lock','dial','mind','seq','eq','lcm','clock','timeline'],d:'Raqamli jumboqlar'}};
const ROLES=['🕵️ Detektiv','🔐 Haker','👁️ Kuzatuvchi',"🧭 Yo'lboshchi",'🛡️ Himoyachi'],KR={prm:3,swt:2,gate:1,cry:1,rec:3,chk:1,mat:3,tz:3,dos:0,wt:3,cal:3,bot:2,op:0,liar:0,roles:0,order:0,evid:0,evall:0,cipher:1,bin:1,morse:1,book:1,vig:1,lock:1,dial:1,mind:1,maze:2,sudo:2,timeline:3,clock:3,lcm:3,seq:3,eq:3};
[3,5,7,9,15].forEach(c=>PL[c].splice(PL[c].length-1,0,'op'));
PL[9].splice(PL[9].length-1,0,'prm');PL[11].splice(PL[11].length-1,0,'swt');PL[13].splice(PL[13].length-1,0,'gate');PL[15].splice(PL[15].length-1,0,'cry');
const KS=s=>(s.pl&&s.pl[s.ch])||PL[s.ch];
const DK=['cipher','mind','order','roles','sudo','dial','lcm','vig','maze','eq','clock','book','prm','swt','gate','cry','kn','dos'],dayN=()=>Math.floor(Date.now()/864e5);
const dgen=()=>{const n=dayN(),k=DK[n%DK.length];return{k,p:G[k](rng(n*7919+13),4+(n%5),{},'')}};
const dyc=u=>{if(u.dy.d!==dayN())u.dy={d:dayN(),ok:0,att:0};return u.dy};
const E=m=>{const e=new Error(m);e.u=1;throw e};
const H={
 me:u=>{ach(u);return{id:u.id,name:nn(u),tg:u.name,nick:u.nick,max:u.max,done:u.done,ev:u.ev,end:u.end,prem:u.prem,coins:u.coins,hist:u.hist.slice(0,25),own:u.own,eq:u.eq,inv:u.inv,ok:u.ok,bad:u.bad,games:u.games,days:u.days.length,cnt:u.cnt,admin:isAdm(u.id),fr:u.fr,bs:u.bs,ar:arr(u),adl:adl(u),don:u.don||0,items:IT.concat(rotNow(),ROT.filter(x=>u.own.includes(x.id)&&!rotNow().some(y=>y.id===x.id))).map(i=>({...i,p:db.cfg.prices[i.id]||i.p})),col:u.col,qk:u.qk,qbest:u.qbest,title:u.ach.includes('legend')?'Afsonaviy tergovchi':u.ach.includes('shadow')?'Soya detektivi':u.ach.includes('master')?'Shifr ustasi':'',idefs:Object.entries(ID).map(([id,d])=>({id,n:d.n,d:d.d,k:d.k})),acs:AC.map(a=>({id:a[0],t:a[1],d:a[2],c:a[3],done:u.ach.includes(a[0])})),room:db.r[u.room]?u.room:null,solo:!!(db.s['s'+u.id]&&db.s['s'+u.id].st!=='end'),ch:TT.map((t,n)=>({n,t,lock:n>=21&&!prem(u),open:n<=u.max})).slice(1)}},
 solo:async(u,b)=>{const n=+b.ch;if(!(n>=1&&n<=22))E('Bunday bob yo\'q');if(n>u.max)E('Bu bob hali yopiq');if(u.done.includes(n))E("Bu bob yakunlangan. Yakka rejimda tugatilgan boblarga qaytib bo'lmaydi (jamoada o'ynash mumkin).");if(n>=21&&!prem(u))E("Bu bob Premium uchun. Botda 💎 Premium bo'limiga kiring.");const s=db.s['s'+u.id]=mk([u.id],n,u.ev,1);u.gs++;(db.st[dk(Date.now())]||={gs:0,ge:0}).gs++;await chap(s);return view(s,u.id)},
 state:async(u,b)=>{const s=db.s[b.room?skey(String(b.room).toUpperCase(),u.id):'s'+u.id];if(!s||!s.m.includes(u.id))return{k:'none'};const sn=s.seen||(s.seen={}),nw2=Date.now(),was=sn[u.id];sn[u.id]=nw2;if(s.st==='puz'&&was&&nw2-was>45000&&nw2-(s.rg||0)>20000){s.rs=(s.rs||0)+1;s.rg=nw2;s.msg="🔄 Siz o'yindan chiqib ketdingiz: savol yangilandi. Yangi jumboq bilan davom eting.";await enter(s)}
  if(s.st==='lock'&&prem(ow(s))){s.msg='💎 Premium faol!';await chap(s)}if(s.st==='puz'&&s.cur&&Date.now()-(s.ts||Date.now())>25000){s.seed=Math.random()*1e9|0;await enter(s);s.msg="🔄 Siz o'yindan chiqib ketgansiz: shu bosqich uchun YANGI savol berildi.";s.v++}s.ts=Date.now();return view(s,u.id)},
 answer:async(u,b)=>{const s=ses(u,b);if(s.st!=='puz')return view(s,u.id);
  if(s.gap>25000&&s.cur){s.seed=Math.random()*1e9|0;await enter(s);s.msg="🔄 Siz o'yindan chiqib ketgansiz: shu bosqich uchun YANGI savol berildi. Javobingiz hisobga olinmadi.";s.v++;return view(s,u.id)}
  if(s.cur&&s.cur.td&&Date.now()>s.cur.td){const c0=Math.round((10+2*s.ch)*wdp()),dead=s.en-c0<=0;s.en-=c0;s.seed=Math.random()*1e9|0;await hurt(s);if(!dead){await enter(s);s.msg=`⏱ Vaqt tugadi: −${c0} energiya. Yangi savol berildi.`}s.v++;return view(s,u.id)}
 (s.seen||(s.seen={}))[u.id]=Date.now();const nw_=Date.now(),at=u.at||(u.at=[]);at.push(nw_);if(at.length>6)at.shift();const fast=at.length>=5&&nw_-at[0]<6000;
  if(s.lk>Date.now())E(`Ko'p xato qildingiz. ${Math.ceil((s.lk-Date.now())/1000)} soniya o'ylab ko'ring.`);
  if(norm(b.a)===norm(s.cur.a)){(db.ks[KS(s)[s.step]]||={ok:0,bad:0}).ok++;let c=Math.max(1,Math.round((2+3*s.ch)*db.cfg.coinMul*wdm()*(KS(s)[s.step]===wkev().k?2:1)));if(fast){c=0;u.flag=(u.flag||0)+1;if(!u.fa||nw_-u.fa>36e5){u.fa=nw_;alog(`⚠️ Shubhali tezlik: ${nn(u)} (${u.id}) — tanga berilmadi`)}}if(c)pay(u,c,`${s.ch}-bob: to'g'ri javob`);(s.cn=s.cn||{})[u.id]=(s.cn[u.id]||0)+c;u.ok++;dqf(u).c.ok++;ssp(u,KS(s)[s.step]===wkev().k?2:1);u.streak++;ach(u);s.msg=`✅ ${nn(u)} to'g'ri topdi! +${c} 🪙`;s.prev=s.cur.a;s.rc=(s.rc||0)+1;s.att=0;s.lk=0;s.step++;if(s.step>=KS(s).length){fin(s);if(s.race)raceEnd(s)}else await enter(s)}
  else{(db.cs[s.ch]||={st:0,dn:0,er:0}).er++;(db.ks[KS(s)[s.step]]||={ok:0,bad:0}).bad++;u.bad++;u.streak=0;s.rc=0;s.er=(s.er||0)+1;s.att=(s.att||0)+1;if(s.att>=3)s.lk=Date.now()+3e4*(s.att-2);let c=Math.round((10+2*s.ch)*wdp()),sh='';
   if(u.inv.shield>0){u.inv.shield--;c=0;sh=' 🛡️ Himoya ishladi.'}else if(s.n>1&&!s.sh&&s.m.some(id=>s.rl&&s.rl[id]===4)){s.sh=1;c=0;sh=' 🛡️ Himoyachi jamoani himoya qildi.'}
   s.en-=c;s.msg=`❌ ${nn(u)}: noto'g'ri. −${c} energiya.${sh}${s.att>=3?' Kutish jazosi.':''}`;await hurt(s)}
  s.v++;return view(s,u.id)},
 hint:async(u,b)=>{const s=ses(u,b);if(s.st!=='puz'||s.cur.hinted)return view(s,u.id);if(s.fh>0)s.fh--;else if(u.inv.hint>0)u.inv.hint--;else s.en-=15;s.cur.hinted=1;s.hu=(s.hu||0)+1;s.msg='💡 Maslahat ochildi.';await hurt(s);s.v++;return view(s,u.id)},
 chat:async(u,b)=>{const s=ses(u,b),t=String(b.t||'').trim().slice(0,300);if(t){(s.chat=s.chat||[]).push({id:u.id,n:nn(u),t,p:pre(u),nc:u.eq.nick||''});if(s.chat.length>100)s.chat.shift();s.v++}return view(s,u.id)},
 choice:async(u,b)=>{const s=ses(u,b);if(s.st!=='choice')return view(s,u.id);if(s.n>1&&s.m.includes(s.cl)&&s.cl!==u.id)E(`Qaror qo'ng'iroq olgan o'yinchida: ${nn(db.u[s.cl])}`);
  if(b.c==='a'){s.m.forEach(id=>{const x=db.u[id];if(x)x.inv.lamp=(x.inv.lamp||0)+1});s.fl.ally++;s.en=Math.min(100,s.en+30);s.msg="🤝 Jamoani qutqardingiz: ittifoqchi paydo bo'ldi (+30 energiya), hammaga 🔦 Fonar berildi.";(s.log=s.log||[]).push('🤝 Jamoa qutqarildi')}
  else{u.inv.kkey=(u.inv.kkey||0)+1;s.fl.hid++;s.en=Math.max(10,s.en-20);s.msg='🕵️ Haqiqatni tanladingiz (−20 energiya). Yashirin dalil sizda, 🗝️ Kalit topdingiz.';(s.log=s.log||[]).push('🕵️ Haqiqat tanlandi')}
  s.m.forEach(id=>{const x=db.u[id];if(x&&x.rp&&x.rp[0]&&x.rp[0].ch===s.ch)x.rp[0].c=b.c==='a'?'a':'b';if(x)chron(x,`${s.ch}-bob qarori: ${b.c==='a'?'jamoani qutqardi':'haqiqatni tanladi'}`)});s.dc=b.c==='a'?"Qutqargan odamingiz endi yo'lni ko'rsatmoqda.":"Yashirgan dalilingiz yangi yo'lni ochdi.";await nxt(s);s.v++;return view(s,u.id)},
 f_list:u=>{const L=[],inc=[],out=[];for(const[id,st]of Object.entries(u.fr)){const x=gx(id);if(!x)continue;const m=db.dm[dmk(u.id,x.id)]||[],un=m.filter(z=>z.f===x.id&&z.t>(u.rd[id]||0)).length;
   if(st==='f')L.push({...pub(x),un,last:x.last||0});else if(st==='i')inc.push(pub(x));else if(st==='o')out.push(pub(x))}
  L.sort((a,b)=>(b.on-a.on)||b.last-a.last);return{fr:L,inc,out,ti:(u.ti||[]).filter(z=>Date.now()-z.ts<6e5&&db.r[z.code]&&!db.r[z.code].started).map(z=>({from:db.u[z.from]?nn(db.u[z.from]):'?',code:z.code})),hide:!!u.hide,mute:!!u.mute,fd:(u.fd||[]).slice(0,15)}},
 f_find:(u,b)=>{const q=String(b.q||'').trim().toLowerCase();if(q.length<2)return[];return Object.values(db.u).filter(x=>x.id!==u.id&&(x.fr||{})[u.id]!=='b'&&(String(x.id)===q||(x.nick||'').toLowerCase().includes(q))).slice(0,6).map(x=>({...pub(x),st:u.fr[x.id]||''}))},
 f_req:(u,b)=>{const x=gx(b.id);if(!x||x.id===u.id)E('Topilmadi');if(x.fr[u.id]==='b'||u.fr[x.id]==='b')E("Bu o'yinchiga so'rov yuborib bo'lmaydi");const st=u.fr[x.id];if(st==='f')E("Allaqachon do'stsiz");
  if(st==='i'){u.fr[x.id]='f';x.fr[u.id]='f';ntf(x.id,`🤝 ${nn(u)} do'stlik so'rovingizni qabul qildi!`);return{st:'f'}}
  if(st==='o')return{st:'o'};if(Object.values(u.fr).filter(v=>v==='o').length>=30)E("Juda ko'p yuborilgan so'rov bor");u.fr[x.id]='o';x.fr[u.id]='i';ntf(x.id,`👥 ${nn(u)} sizga do'stlik so'rovi yubordi. Do'stlar bo'limini oching.`);return{st:'o'}},
 f_acc:(u,b)=>{const x=gx(b.id);if(!x||u.fr[b.id]!=='i')E("So'rov topilmadi");u.fr[b.id]='f';x.fr[u.id]='f';ntf(x.id,`🤝 ${nn(u)} do'stlik so'rovingizni qabul qildi!`);return{st:'f'}},
 f_rej:(u,b)=>{const x=gx(b.id);if(u.fr[b.id]==='i'||u.fr[b.id]==='o'){delete u.fr[b.id];if(x)delete x.fr[u.id]}return{st:''}},
 f_rm:(u,b)=>{const x=gx(b.id);delete u.fr[b.id];if(x&&x.fr[u.id]!=='b')delete x.fr[u.id];return{st:''}},
 f_blk:(u,b)=>{const x=gx(b.id);if(!x)E('Topilmadi');u.fr[b.id]='b';delete x.fr[u.id];return{st:'b'}},
 f_hide:u=>{u.hide=u.hide?0:1;return{hide:u.hide}},
 f_dm:(u,b)=>{if(u.fr[b.id]!=='f')E("Faqat do'stlarga yozish mumkin");const m=db.dm[dmk(u.id,+b.id)]||[];u.rd[b.id]=Date.now();return{msgs:m.slice(-50).map(z=>({me:z.f===u.id,t:z.m,ts:z.t}))}},
 f_send:(u,b)=>{const x=gx(b.id),t=String(b.t||'').trim().slice(0,500);if(!x||u.fr[x.id]!=='f'||x.fr[u.id]!=='f')E("Faqat do'stlarga yozish mumkin");if(!t)E("Xabar bo'sh");
  if(u.lm&&Date.now()-u.lm<800)E('Juda tez yozyapsiz');u.lm=Date.now();const k=dmk(u.id,x.id),m=db.dm[k]||(db.dm[k]=[]);m.push({f:u.id,t:Date.now(),m:t});if(m.length>100)m.shift();
  if(!onl(x)&&(!x.dn||Date.now()-x.dn>6e5)){x.dn=Date.now();ntf(x.id,`💬 ${nn(u)}: ${t.slice(0,100)}`)}return{ok:1}},
 f_inv:(u,b)=>{const x=gx(b.id),r=db.r[u.room];if(!x||u.fr[x.id]!=='f')E("Faqat do'stlarni chaqirish mumkin");if(!r||r.started)E("Avval Jamoa bo'limida xona yarating (o'yin boshlanmagan bo'lsin)");if(r.mem.length>=r.size)E("Xona to'lgan");
  x.ti=(x.ti||[]).filter(z=>z.code!==r.code);x.ti.push({from:u.id,code:r.code,ts:Date.now()});ntf(x.id,`🎮 ${nn(u)} sizni jamoaga chaqirdi! Xona kodi: ${r.code}. Do'stlar bo'limidan qo'shiling.`);return{ok:1}},
 hof:()=>({first:Object.entries(db.hf).map(([n,x])=>({n:+n,...x})).sort((a,b)=>a.n-b.n),quick:Object.values(db.u).filter(x=>x.qbest>0).sort((a,b)=>b.qbest-a.qbest).slice(0,5).map(x=>({n:nn(x),s:x.qbest})),most:Object.values(db.u).filter(x=>x.cnt>0).sort((a,b)=>b.cnt-a.cnt).slice(0,5).map(x=>({n:nn(x),s:x.cnt}))}),
 rp:u=>u.rp||[],
 q_get:u=>{const q=dqf(u);return{q:QD.map(x=>({...x,c:q.c[x.id],cl:q.cl.includes(x.id)}))}},
 q_claim:(u,b)=>{const q=dqf(u),x=QD.find(z=>z.id===b.id);if(!x)E('?');if(q.cl.includes(x.id))E('Olingan');if(q.c[x.id]<x.n)E('Hali bajarilmagan');q.cl.push(x.id);pay(u,x.r,'🎯 Missiya: '+x.t);return{ok:1}},
 w_get:u=>{wdUpdate();const w=db.wd;return{ev:WE[w.day%WE.length],v:w.v,my:w.by[u.id]||'',eff:w.eff,hist:w.hist,meter:Object.values(db.cs).reduce((a,x)=>a+x.dn,0)}},
 w_vote:(u,b)=>{wdUpdate();const w=db.wd;if(w.by[u.id])E('Bugun ovoz bergansiz');if(b.c!=='a'&&b.c!=='b')E('?');w.by[u.id]=b.c;w.v[b.c]++;pay(u,3,'🌍 Dunyo ovozi');return H.w_get(u)},
 unk:u=>({len:uw(u).length,msgs:u.unk.map(m=>({ch:m.ch,txt:m.txt})),done:u.unkd}),
 unk_ans:(u,b)=>{if(u.unkd)E('Siz sirni ochgansiz');const t=u.uat&&u.uat.d===dayN()?u.uat:(u.uat={d:dayN(),n:0});if(t.n>=5)E('Bugungi urinishlar tugadi');t.n++;if(norm(b.a)!==norm(uw(u)))E("Noto'g'ri so'z");u.unkd=1;pay(u,100,"👤 Noma'lum sirni ochdingiz");u.col.push("👤 Noma'lum xabarlar sirri");feed(u,"Noma'lum sirni ochdi 👤");return{ok:1}},
 d_new:(u,b)=>{const t=String(b.txt||'').trim().slice(0,300);if(!t)E('Matn yozing');if(db.disp.filter(x=>x.u===u.id&&Date.now()-x.t<864e5).length>=3)E('Kuniga 3 ta shikoyat');db.disp.unshift({t:Date.now(),u:u.id,n:nn(u),txt:t,st:'new'});if(db.disp.length>100)db.disp.length=100;return{ok:1}},
 a_dres:(u,b)=>{const x=db.disp.find(z=>z.t===+b.t);if(!x)E('Topilmadi');x.st='done';const c=Math.trunc(+b.c)||0;if(c&&db.u[x.u])pay(db.u[x.u],c,'👑 Admin: shikoyat hal etildi');alog(`shikoyat yopildi (${x.n}) ${c?'+'+c+' tanga':''}`);return dash()},
 m_list:u=>{if(Object.keys(db.mp).length>500)db.mp={};db.mk=db.mk.filter(l=>{if(Date.now()-l.t>2592e5){const s=db.u[l.s];if(s)s.inv[l.i]=(s.inv[l.i]||0)+1;return false}return true});
  const td=dayN(),mo=u.mo&&u.mo.d===td?u.mo.i:[],L=l=>({id:l.id,item:l.i,n:MKI[l.i],p:l.p,s:nn(db.u[l.s]||{name:'?'})});
  return{offers:moffers().map(o=>({...o,done:mo.includes(o.item)})),sell:db.mk.filter(l=>l.s!==u.id).slice(-30).reverse().map(L),mine:db.mk.filter(l=>l.s===u.id).map(L),inv:u.inv,names:MKI}},
 m_offer:(u,b)=>{const o=moffers().find(x=>x.item===b.item);if(!o)E('Taklif topilmadi');const td=dayN();if(!u.mo||u.mo.d!==td)u.mo={d:td,i:[]};if(u.mo.i.includes(o.item))E('Bugun olgansiz');if(u.coins<o.p)E('Tanga yetmaydi');pay(u,-o.p,`Qora bozor: ${o.n}`);u.inv[o.item]=(u.inv[o.item]||0)+1;u.mo.i.push(o.item);return H.m_list(u)},
 m_sell:(u,b)=>{const i=b.item,p=Math.trunc(+b.p);if(!MKI[i])E('Buyum topilmadi');if(!(u.inv[i]>0))E("Sizda bu buyum yo'q");const mx=base(i)*3;if(!(p>=20&&p<=mx))E(`Narx 20 dan ${mx} gacha bo'lsin`);if(db.mk.filter(l=>l.s===u.id).length>=5)E("Eng ko'pi bilan 5 ta e'lon");u.inv[i]--;db.mk.push({id:Math.random().toString(36).slice(2,8),s:u.id,i,p,t:Date.now()});return H.m_list(u)},
 m_cancel:(u,b)=>{const k=db.mk.findIndex(l=>l.id===b.id&&l.s===u.id);if(k<0)E('Topilmadi');const l=db.mk.splice(k,1)[0];u.inv[l.i]=(u.inv[l.i]||0)+1;return H.m_list(u)},
 m_buy:(u,b)=>{const k=db.mk.findIndex(l=>l.id===b.id);if(k<0)E("E'lon topilmadi (sotilgan bo'lishi mumkin)");const l=db.mk[k];if(l.s===u.id)E("O'z e'loningizni sotib ololmaysiz");if(u.coins<l.p)E('Tanga yetmaydi');
  const key=`${l.s}_${u.id}_${dayN()}`;db.mp[key]=(db.mp[key]||0)+1;if(db.mp[key]>3){alog(`⚠️ Shubhali savdo: ${l.s} → ${u.id} kuniga ${db.mp[key]} marta`);E('Bir sherik bilan kuniga 3 ta savdo mumkin')}
  db.mk.splice(k,1);const sel=db.u[l.s];pay(u,-l.p,`Bozor xarid: ${MKI[l.i]}`);u.inv[l.i]=(u.inv[l.i]||0)+1;if(sel)pay(sel,Math.floor(l.p*.9),`Bozor sotuv: ${MKI[l.i]} (10% soliq)`);return H.m_list(u)},
 trust:async(u,b)=>{const s=ses(u,b);if(s.st!=='choice'||s.n<2)E("Ishonchni bob oxirida jamoada bildirish mumkin");const id=+b.id;if(id===u.id||!s.m.includes(id))E('?');const v=b.v>0?1:-1,key=`${u.id}>${id}:${s.ch}`;s.tv=s.tv||{};if(s.tv[key])E('Bu bob uchun baho berilgan');s.tv[key]=1;u.tr[id]=Math.max(-5,Math.min(10,(u.tr[id]||0)+v));s.v++;return view(s,u.id)},
 f_prof:(u,b)=>{const x=gx(b.id);if(!x||(x.id!==u.id&&u.fr[x.id]!=='f'))E("Profil faqat do'stlar uchun");const t=x.ok+x.bad;return{...pub(x),cnt:x.cnt,games:x.games,acc:t?Math.round(x.ok*100/t):0,ach:x.ach.length,col:x.col.length,dw:x.dw||0,dl:x.dl||0}},
 f_mute:u=>{u.mute=u.mute?0:1;return{mute:u.mute}},
 f_duel:(u,b)=>{const x=gx(b.id);if(!x||u.fr[x.id]!=='f'||x.fr[u.id]!=='f')E("Faqat do'stga duel yuborish mumkin");if(Object.values(db.du).filter(z=>z.st!=='done'&&(z.a===u.id||z.b===u.id)).length>=3)E("Faol duellar ko'p (3 tagacha)");
  const id=Math.random().toString(36).slice(2,8).toUpperCase(),seed=Math.random()*1e9|0;db.du[id]={id,a:u.id,b:x.id,seed,k:DUK[seed%DUK.length],d:4+seed%4,st:'wait',t:Date.now(),r:{},s:{},pr:{}};ntf(x.id,`⚔️ ${nn(u)} sizni duelga chaqirdi! Do'stlar bo'limida qabul qiling.`);return{id}},
 f_dacc:(u,b)=>{const z=db.du[b.id];if(!z||z.b!==u.id||z.st!=='wait')E('Duel topilmadi');z.st='run';z.t=Date.now();ntf(z.a,`⚔️ ${nn(u)} duelni qabul qildi! Do'stlar bo'limidan o'ynang.`);return{ok:1}},
 f_drej:(u,b)=>{const z=db.du[b.id];if(!z||(z.a!==u.id&&z.b!==u.id)||z.st==='done')E('Duel topilmadi');delete db.du[b.id];return{ok:1}},
 f_dpuz:(u,b)=>{const z=db.du[b.id];if(!z||z.st!=='run'||(z.a!==u.id&&z.b!==u.id))E('Duel topilmadi');if(z.r[u.id])E('Siz javob bergansiz');if(!z.s[u.id])z.s[u.id]=Date.now();const p=G[z.k](rng(z.seed),z.d,{},'');return{id:z.id,c:p.c,q:p.q}},
 f_dans:(u,b)=>{const z=db.du[b.id];if(!z||z.st!=='run'||(z.a!==u.id&&z.b!==u.id))E('Duel topilmadi');if(z.r[u.id])E('Siz javob bergansiz');if(!z.s[u.id])E('Avval jumboqni oching');
  const p=G[z.k](rng(z.seed),z.d,{},''),ms=Date.now()-z.s[u.id],ok=norm(b.a)===norm(p.a)&&ms<6e5;z.r[u.id]={ok,ms};const o=z.a===u.id?z.b:z.a;
  if(!z.r[o])return{r:ok?`Javobingiz to'g'ri (${Math.round(ms/1000)} s). Raqibni kuting.`:"Javobingiz noto'g'ri. Raqibni kuting."};return{r:duelEnd(z)}},
 f_dlist:u=>{const now=Date.now();for(const[id,z]of Object.entries(db.du))if(now-z.t>(z.st==='done'?2:1)*864e5)delete db.du[id];
  const N=id=>nn(db.u[id]||{name:'?'}),Z=Object.values(db.du);
  const mine=Z.filter(z=>z.a===u.id||z.b===u.id).sort((a,b)=>b.t-a.t).slice(0,8).map(z=>({id:z.id,o:N(z.a===u.id?z.b:z.a),st:z.st,inc:z.st==='wait'&&z.b===u.id,my:!!z.r[u.id],res:z.st==='done'?(z.w==='d'?'durang':(z.w==='a'?z.a:z.b)===u.id?"g'alaba 🏆":"mag'lubiyat"):''}));
  const spec=Z.filter(z=>z.st==='run'&&z.a!==u.id&&z.b!==u.id&&(u.fr[z.a]==='f'||u.fr[z.b]==='f')).slice(0,6).map(z=>({id:z.id,a:N(z.a),b:N(z.b),pr:z.pr[u.id]||''}));
  const pres=Z.filter(z=>z.st==='done'&&z.pr[u.id]).slice(0,5).map(z=>({a:N(z.a),b:N(z.b),w:z.w==='d'?'durang':N(z.w==='a'?z.a:z.b),ok:z.pr[u.id]===z.w}));return{mine,spec,pres}},
 f_dpred:(u,b)=>{const z=db.du[b.id];if(!z||z.st!=='run'||z.a===u.id||z.b===u.id)E('Duel topilmadi');if(!(u.fr[z.a]==='f'||u.fr[z.b]==='f'))E("Faqat do'stlaringiz duelini kuzatasiz");if(z.pr[u.id])E('Taxmin berilgan');if(b.c!=='a'&&b.c!=='b')E('?');z.pr[u.id]=b.c;return{ok:1}},
 ras:u=>{const so=db.s['s'+u.id],s=so&&so.st!=='end'?so:(db.r[u.room]&&db.s[skey(u.room,u.id)]);const sess=s&&s.m.includes(u.id)?{ch:s.ch,t:TT[s.ch],step:s.step+1,tot:KS(s).length,en:s.en,ally:s.fl.ally,hid:s.fl.hid,ev:Object.keys(s.ev).length,n:s.n,st:s.st,left:Math.max(0,Math.round((s.dl-Date.now())/6e4)),er:s.er||0,dc:s.dc||''}:null;
  return{chr:(u.chr||[]).slice(0,40),rp:u.rp||[],col:u.col,ev:u.ev,done:u.done,inv:u.inv,rc:RC.map(x=>({...x,names:Object.entries(x.need).map(([k,v])=>`${MKI[k]} ×${v}`).join(' + ')})),sess,ch:TT.map((t,n)=>({n,t})).slice(1)}},
 craft:(u,b)=>{const r=RC.find(x=>x.id===b.id);if(!r)E('?');for(const[k,v]of Object.entries(r.need))if((u.inv[k]||0)<v)E("Yetarli buyum yo'q");for(const[k,v]of Object.entries(r.need))u.inv[k]-=v;u.inv[r.id]=(u.inv[r.id]||0)+1;chron(u,`Ustaxonada ${r.n} yasadi`);return H.ras(u)},
 fb:async(u,b)=>{const t=String(b.txt||'').trim().slice(0,1000);if(!t)E('Fikrni yozing');if(db.fb.filter(x=>x.u===u.id&&Date.now()-x.t<36e5).length>=3)E("Soatiga 3 ta fikr yuborish mumkin");const id=db.fb.length?db.fb[0].id+1:1;db.fb.unshift({id,u:u.id,n:u.name,un:u.un||'',txt:t,t:Date.now(),rep:[]});if(db.fb.length>300)db.fb.length=300;
  if(AID){const r=await tg('sendMessage',{chat_id:AID,text:`💬 Fikr #${id}\n👤 ${u.name}${u.un?' (@'+u.un+')':''}\n🆔 ${u.id}\n\n${t}\n\n↩️ Javob berish uchun shu xabarga reply qiling.`});if(r.ok)db.fbm[r.result.message_id]=id}return{ok:1}},
 fb_list:u=>({l:db.fb.filter(x=>x.u===u.id).slice(0,10).map(x=>({id:x.id,txt:x.txt,t:x.t,rep:x.rep}))}),
 a_fbrep:async(u,b)=>{const f=db.fb.find(x=>x.id===+b.id);if(!f)E('Topilmadi');const t=String(b.txt||'').trim().slice(0,1000);if(!t)E('Matn yozing');f.rep.push({t:Date.now(),txt:t});alog(`fikrga javob #${f.id}`);const x=db.u[f.u];if(x&&x.bs)await tg('sendMessage',{chat_id:f.u,text:`💬 Fikringizga javob:\n\n${t}`});return dash()},
 cl_new:(u,b)=>{const lv=Math.min(5,Math.max(1,Math.trunc(+b.lv)||1)),k=CLK[Math.floor(Math.random()*CLK.length)],seed=Math.random()*1e9|0,p=G[k](rng(seed),lv*2,{},'');u.cq={k,lv,seed,t:Date.now()};const n=u.cld&&u.cld.d===dayN()?u.cld.n:0;return{k,lv,c:p.c,q:p.q,solved:u.cls||0,left:Math.max(0,10-n)}},
 cl_ans:(u,b)=>{const q=u.cq;if(!q)E('Avval jumboq oling');if(u.lm2&&Date.now()-u.lm2<1500)E('Juda tez');u.lm2=Date.now();const p=G[q.k](rng(q.seed),q.lv*2,{},'');if(norm(b.a)!==norm(p.a))return{ok:0};
  u.cq=null;u.cls=(u.cls||0)+1;if(!u.cld||u.cld.d!==dayN())u.cld={d:dayN(),n:0};let c=0;if(u.cld.n<10&&Date.now()-q.t>4000){c=q.lv;pay(u,c,'🔐 Shifr laboratoriyasi')}u.cld.n++;ach(u);return{ok:1,c,solved:u.cls}},
 cr_new:(u,b)=>{if(!u.done.length)E('Avval 1-bobni tugating');const w=String(b.w||'').toUpperCase().replace(/[^A-Z]/g,'');if(w.length<3||w.length>10)E("Maxfiy so'z 3–10 ta lotin harfi bo'lsin");const m=['rev','caesar','morse','bin'].includes(b.m)?b.m:'caesar',sh=m==='caesar'?Math.min(25,Math.max(1,Math.trunc(+b.s)||3)):0,h=String(b.h||'').trim().slice(0,60);
  if(BADW.test(w)||BADW.test(h))E("Bu so'zdan foydalanib bo'lmaydi");if(db.cp.filter(x=>x.u===u.id&&Date.now()-x.t<864e5).length>=3)E('Kuniga 3 ta jumboq yaratish mumkin');if(db.cp.filter(x=>x.u===u.id).length>=15)E("Eng ko'pi bilan 15 ta jumboq");
  const id=(db.cp[0]?db.cp[0].id:0)+1;db.cp.unshift({id,u:u.id,n:nn(u),w,m,s:sh,h,t:Date.now(),ok:[]});if(db.cp.length>300)db.cp.length=300;chron(u,`Jumboq yaratdi (#${id})`);return{id}},
 cr_list:u=>({l:db.cp.slice(0,30).map(x=>({id:x.id,n:x.n,mine:x.u===u.id,enc:cenc(x.m,x.w,x.s),d:cdesc(x.m,x.s),h:x.h,ok:x.ok.length,solved:x.ok.includes(u.id),len:x.w.length}))}),
 cr_ans:(u,b)=>{const x=db.cp.find(z=>z.id===+b.id);if(!x)E('Jumboq topilmadi');if(x.u===u.id)E("O'z jumboqingizni yechib bo'lmaydi");if(x.ok.includes(u.id))E('Yechilgan');if(u.lm3&&Date.now()-u.lm3<1500)E('Juda tez');u.lm3=Date.now();if(norm(b.a)!==norm(x.w))return{ok:0};
  x.ok.push(u.id);const t=u.crd&&u.crd.d===dayN()?u.crd:(u.crd={d:dayN(),n:0});let c=0;if(t.n<5){t.n++;c=4;pay(u,4,`🎨 Jumboq #${x.id}`)}const cr=db.u[x.u];if(cr&&x.ok.length<=10)pay(cr,2,`🎨 Jumboqingiz yechildi (#${x.id})`);return{ok:1,c}},
 cr_del:(u,b)=>{const k=db.cp.findIndex(z=>z.id===+b.id&&z.u===u.id);if(k<0)E('Topilmadi');db.cp.splice(k,1);return{ok:1}},
 a_cdel:(u,b)=>{const k=db.cp.findIndex(z=>z.id===+b.id);if(k<0)E('Topilmadi');const x=db.cp.splice(k,1)[0];alog(`jumboq #${x.id} o'chirildi (${x.n})`);return dash()},
 ss_get:u=>{ssUpdate();const z=db.ss,L=Object.entries(z.pts).sort((a,b)=>b[1]-a[1]),rk=L.findIndex(x=>+x[0]===u.id),w=wkev(),now=new Date(),end=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth()+1,1));
  return{t:z.t,left:Math.ceil((end-now)/864e5),top:L.slice(0,10).map(([id,p])=>({n:nn(db.u[id]||{name:'?'}),p})),me:z.pts[u.id]||0,rank:rk<0?0:rk+1,week:{t:w.t,k:w.k,kn:KD[w.k]||w.k,left:w.end-dayN()},hist:db.hist,rw:[300,200,100,50]}},
 pay_link:async(u,b)=>{let title,desc,payload,amount;if(b.kind==='prem'){title='LOOPBREAK Premium';desc='30 kun: 21 va 22-boblar ochiladi';payload='prem30';amount=300}
  else if(b.kind==='donate'){amount=Math.trunc(+b.amount);if(!(amount>=1&&amount<=10000))E("Miqdor 1 dan 10000 ⭐ gacha bo'lsin");const msg=String(b.msg||'').trim().slice(0,200);if(BADW.test(msg))E("Xabarda man etilgan so'z bor");const id=Math.random().toString(36).slice(2,9);db.dn.unshift({id,u:u.id,a:amount,anon:!!b.anon,msg,t:Date.now(),paid:0});if(db.dn.length>300)db.dn.length=300;title='LOOPBREAK Donat';desc="Loyihani qo'llab-quvvatlash uchun rahmat!";payload='don:'+id}else E('?');
  const r=await tg('createInvoiceLink',{title,description:desc,payload,provider_token:'',currency:'XTR',prices:[{label:title,amount}]});if(!r.ok)E("To'lov havolasi yaratilmadi. Keyinroq urinib ko'ring");return{url:r.result}},
 don_list:()=>{const P=db.dn.filter(x=>x.paid),tot={};P.forEach(x=>{if(!x.anon)tot[x.u]=(tot[x.u]||0)+x.a});return{top:Object.entries(tot).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([id,a])=>({n:nn(db.u[id]||{name:'?'}),a})),recent:P.filter(x=>x.msg).slice(0,8).map(x=>({n:x.anon?'Anonim':nn(db.u[x.u]||{name:'?'}),a:x.a,msg:x.msg}))}},
 ar_info:u=>({rec:arr(u),lim:adl(u)}),
 ar_cr_start:u=>{const d=[0,1,2,3,4,5,6,7,8,9].sort(()=>Math.random()-.5).slice(0,4).join('');u.acr={s:d,a:0,t:Date.now()};return{max:8,secs:120}},
 ar_cr_guess:(u,b)=>{const q=u.acr,g=String(b.g||'');if(!q)E("O'yin boshlanmagan");if(Date.now()-q.t>120000){u.acr=null;return{lose:1,secret:q.s,why:'Vaqt tugadi'}}if(!/^\d{4}$/.test(g)||new Set(g).size<4)E('4 ta har xil raqam kiriting');if(u.lm4&&Date.now()-u.lm4<400)E('Juda tez');u.lm4=Date.now();
  q.a++;let ex=0,mi=0;[...g].forEach((c,i)=>{if(q.s[i]===c)ex++;else if(q.s.includes(c))mi++});
  if(ex===4){u.acr=null;const c=arPay(u,'cr',Math.max(1,9-q.a),'🎮 Code Rush'),R=arr(u);if(!R.cr||q.a<R.cr)R.cr=q.a;ach(u);return{win:1,a:q.a,c,rec:R.cr}}
  if(q.a>=8){u.acr=null;return{lose:1,secret:q.s,why:'Urinishlar tugadi'}}return{ex,mi,a:q.a}},
 ar_sm_start:u=>{u.asm={lv:1};const s=asmSeq(u);return{lv:1,seq:s,show:asmShow(1)}},
 ar_sm_check:(u,b)=>{const q=u.asm;if(!q)E("O'yin boshlanmagan");const a=Array.isArray(b.a)?b.a:[],ok=a.length===q.seq.length&&a.every((x,i)=>x===q.seq[i])&&Date.now()-q.t<asmShow(q.lv)+30000;
  if(ok){q.lv++;const s=asmSeq(u);return{ok:1,lv:q.lv,seq:s,show:asmShow(q.lv)}}const done=q.lv-1;u.asm=null;const c=arPay(u,'sm',Math.min(8,done),'🎮 Shadow Memory'),R=arr(u);if(done>R.sm)R.sm=done;ach(u);return{ok:0,done,c,rec:R.sm}},
 ar_rx_arm:u=>{const q=u.arx&&Date.now()-u.arx.t0<90000?u.arx:(u.arx={r:[],t0:0});q.delay=1500+Math.floor(Math.random()*2500);q.t0=Date.now();q.armed=1;return{delay:q.delay,round:q.r.length+1}},
 ar_rx_tap:u=>{const q=u.arx;if(!q||!q.armed)E("O'yin boshlanmagan");const t=Date.now()-(q.t0+q.delay);q.armed=0;if(t<70)return{early:1,round:q.r.length+1};q.r.push(t);if(q.r.length<3)return{ms:t,round:q.r.length,next:1};
  const best=Math.min(...q.r),avg=Math.round(q.r.reduce((a,b)=>a+b,0)/3);u.arx=null;const R=arr(u);if(!R.rx||best<R.rx)R.rx=best;const c=arPay(u,'rx',best<300?4:best<400?3:best<550?2:1,'🎮 Reaction Zero');ach(u);return{ms:t,done:1,best,avg,c,rec:R.rx}},
 ar_gr_start:u=>{const k=['sudo','maze','swt'][Math.floor(Math.random()*3)],seed=Math.random()*1e9|0,p=G[k](rng(seed),4,{},'');u.agr={k,seed,t:Date.now()};return{c:p.c,q:p.q}},
 ar_gr_ans:(u,b)=>{const q=u.agr;if(!q)E("O'yin boshlanmagan");if(u.lm5&&Date.now()-u.lm5<1000)E('Juda tez');u.lm5=Date.now();const p=G[q.k](rng(q.seed),4,{},'');if(norm(b.a)!==norm(p.a))return{ok:0};
  const sec=Math.round((Date.now()-q.t)/1000);u.agr=null;const R=arr(u);if(!R.gr||sec<R.gr)R.gr=sec;const c=arPay(u,'gr',sec<45?3:sec<100?2:1,'🎮 Gridbreak');return{ok:1,sec,c,rec:R.gr}},
 ar_top:(u,b)=>{const g=['cr','sm','rx','gr'].includes(b.g)?b.g:'cr',ids=[u.id,...Object.entries(u.fr).filter(([,v])=>v==='f').map(([i])=>+i)],L=ids.map(id=>db.u[id]).filter(Boolean).map(x=>({n:nn(x),v:(x.ar||{})[g]||0,me:x.id===u.id})).filter(x=>x.v>0);L.sort((a,b)=>g==='sm'?b.v-a.v:a.v-b.v);return L.slice(0,10)},
 a_dash:()=>dash(),
 a_find:(u,b)=>{const q=String(b.q||'').trim().toLowerCase();if(!q)return[];return Object.values(db.u).filter(x=>String(x.id)===q||nn(x).toLowerCase().includes(q)||(x.name||'').toLowerCase().includes(q)).slice(0,8).map(x=>({id:x.id,n:nn(x),tg:x.name,coins:x.coins,last:x.last,first:x.first,ok:x.ok,bad:x.bad,done:x.done,games:x.games,ban:x.ban,prem:x.prem,src:x.src}))},
 a_uact:(u,b)=>{const x=db.u[b.id];if(!x)E('Topilmadi');
  if(b.act==='coins'){const n=Math.trunc(+b.n),w=String(b.why||'').trim().slice(0,80);if(!n||Math.abs(n)>100000)E("Miqdor noto'g'ri");if(!w)E('Sabab yozing');pay(x,n,'👑 Admin: '+w);alog(`tanga ${n>0?'+':''}${n} → ${nn(x)} (${x.id}): ${w}`)}
  else if(b.act==='ban'||b.act==='unban'){x.ban=b.act==='ban'?1:0;alog(`${b.act} → ${nn(x)} (${x.id})`)}else E('?');return{ok:1}},
 a_bc:async(u,b)=>{const t=String(b.text||'').trim().slice(0,3500);if(!t)E("Matn bo'sh");if(b.test){await tg('sendMessage',{chat_id:AID,text:'🧪 TEST:\n\n'+t});alog('test xabar');return{ok:1}}
  if(db.bc&&db.bc.run)E('Oldingi yuborish tugamagan');const ids=Object.values(db.u).filter(x=>!x.ban).map(x=>x.id);db.bc={run:1,total:ids.length,sent:0,fail:0,er:[],t:Date.now(),text:t.slice(0,60)};alog(`ommaviy xabar: ${ids.length} kishi`);
  (async()=>{for(const id of ids){const r=await tg('sendMessage',{chat_id:id,text:t});if(r.ok)db.bc.sent++;else{db.bc.fail++;const er=db.bc.er||(db.bc.er=[]);if(er.length<8)er.push(`${id}: ${r.description||'Telegramdan javob kelmadi'}`)}await new Promise(r=>setTimeout(r,45))}db.bc.run=0;save()})();return db.bc},
 a_cfg:(u,b)=>{const c=db.cfg,v=b.v;
  if(b.k==='maint')c.maint=String(v||'').slice(0,200);
  else if(b.k==='coinMul'||b.k==='timeMul'){const n=+v;if(!(n>=.5&&n<=5))E("0.5 dan 5 gacha bo'lsin");c[b.k]=n}
  else if(b.k==='daily'){const n=Math.trunc(+v);if(!(n>=0&&n<=500))E("0 dan 500 gacha bo'lsin");c.daily=n}
  else if(b.k==='price'){const it=IT.find(i=>i.id===b.id),n=Math.trunc(+v);if(!it||!(n>=1&&n<=10000))E("Narx noto'g'ri");c.prices[it.id]=n}
  else E('?');alog(`sozlama ${b.k}${b.id?':'+b.id:''} = ${v}`);return dash()},
 a_backup:async()=>{const ok=await sendBackup();alog('zaxira yuborildi');return{ok}},
 useitem:async(u,b)=>{const s=ses(u,b),d=ID[b.id];if(!d)E('Buyum topilmadi');if(s.st!=='puz')return view(s,u.id);if(b.id==='prism'){if(!s.cur.sv)E('Prizma faqat kutilmagan vaziyatda ishlaydi');if(!(u.inv.prism>0))E("Sizda bu buyum yo'q");u.inv.prism--;if(s.cur.sv==='noise')s.cur.c.pop();s.cur.td=0;s.cur.sv='';s.msg="🔮 Prizma ishlatildi: xavf yo'qotildi.";s.v++;return view(s,u.id)}const kind=KS(s)[s.step];if(!d.k.includes(kind))E(`${d.n} bu turdagi jumboqda ishlamaydi`);if(!(u.inv[b.id]>0))E("Sizda bu buyum yo'q");if(s.cur.xh)E('Bu jumboqda ishora allaqachon ochilgan');
  u.inv[b.id]--;const a=String(s.cur.a);s.cur.xh=`${d.n}: javob ${a.length} belgidan iborat, birinchisi «${a[0]}»`;s.msg=`${d.n} ishlatildi.`;s.v++;return view(s,u.id)},
 qinfo:u=>{const d=dayN(),q=u.qd.d===d?u.qd:{runs:0,best:0};return{best:q.best,runs:q.runs,gbest:u.qbest,top:Object.values(db.u).filter(x=>x.qd&&x.qd.d===d&&x.qd.best>0).sort((a,b)=>b.qd.best-a.qd.best).slice(0,5).map(x=>({n:nn(x),s:x.qd.best}))}},
 qstart:u=>{if(u.qd.d!==dayN())u.qd={d:dayN(),runs:0,best:0};const r=rng(Math.random()*1e9|0);u.qs={t0:Date.now(),T:Array.from({length:10},()=>qk(r)),i:0,ok:0,st:0,ms:0,score:0,pen:0,end:0};return qv(u)},
 qans:(u,b)=>{const z=u.qs;if(!z||z.end)E('Sinov boshlanmagan');let left=6e4-(Date.now()-z.t0)-z.pen;if(left<=0)return qf(u);
  if(norm(b.a)===norm(z.T[z.i].a)){z.ok++;z.st++;z.ms=Math.max(z.ms,z.st);z.score+=1+Math.floor(z.st/3)}else{z.st=0;z.pen+=5000}
  z.i++;left=6e4-(Date.now()-z.t0)-z.pen;if(z.i>=10||left<=0)return qf(u);return qv(u)},
 buy:(u,b)=>{const it=IT.concat(rotNow()).find(x=>x.id===b.id);if(!it)E('Buyum topilmadi yoki muddati tugagan');const PR=db.cfg.prices[it.id]||it.p;if(u.coins<PR)E(`Tanga yetmaydi: ${PR} 🪙 kerak`);
  if(it.k==='cons')u.inv[it.id]=(u.inv[it.id]||0)+1;else{if(u.own.includes(it.id))E('Bu buyumni allaqachon olgansiz');u.own.push(it.id);if(it.v)u.eq[it.k==='emo'?'emoji':it.k]=it.v}
  pay(u,-PR,`Xarid: ${it.n}`);return H.me(u)},
 equip:(u,b)=>{const it=IT.concat(ROT).find(x=>x.id===b.id);if(!it||!it.v||!u.own.includes(it.id))E('Avval sotib oling');const k=it.k==='emo'?'emoji':it.k;if(u.eq[k]===it.v)delete u.eq[k];else u.eq[k]=it.v;return H.me(u)},
 nick:(u,b)=>{const n=String(b.n||'').trim();if(!/^[A-Za-z0-9_]{3,16}$/.test(n))E("Nik 3–16 belgi bo'lsin: lotin harf, raqam yoki _");if(/(admin|fuck|shit|bitch|sikaman|qotoq|jinni|loopbreak)/i.test(n))E("Bu nikdan foydalanib bo'lmaydi");
  if(Object.values(db.u).some(x=>x.id!==u.id&&(x.nick||'').toLowerCase()===n.toLowerCase()))E('Bu nik band');u.nick=n;return H.me(u)},
 daily:u=>{const g=dgen(),t=dyc(u);return{c:g.p.c,q:g.p.q,ok:t.ok,att:t.att,max:5,r:db.cfg.daily}},
 dailyans:(u,b)=>{const g=dgen(),t=dyc(u);if(t.ok)E('Bugun bajarilgan');if(t.att>=5)E('Bugungi urinishlar tugadi');if(norm(b.a)===norm(g.p.a)){t.ok=1;pay(u,db.cfg.daily,'Kun jumboqi');return{r:'ok',c:db.cfg.daily}}t.att++;return{r:'bad'}},
 rcreate:(u,b)=>{if(db.r[u.room])E('Avval joriy xonadan chiqing');const size=Math.min(6,Math.max(2,+b.size||2));let c;do c=Math.random().toString(36).slice(2,7).toUpperCase();while(db.r[c]);
  db.r[c]={code:c,name:String(b.name||'Jamoa').trim().slice(0,24)||'Jamoa',size,owner:u.id,mem:[{id:u.id,name:u.name,ready:false}],started:0,mode:(b.mode==='two'&&size>=4)?'two':'one'};u.room=c;return db.r[c]},
 rjoin:(u,b)=>{const r=db.r[String(b.code||'').trim().toUpperCase()];if(!r)E('Xona topilmadi');if(r.mem.some(m=>m.id===u.id)){u.room=r.code;return r}
  if(r.started)E("O'yin allaqachon boshlangan");if(r.mem.length>=r.size)E("Xona to'lgan");if(db.r[u.room])E('Avval joriy xonadan chiqing');
  r.mem.push({id:u.id,name:u.name,ready:false});u.room=r.code;return r},
 room:(u,b)=>{const r=db.r[String(b.code).toUpperCase()];if(!r||!r.mem.some(m=>m.id===u.id))E('Xona topilmadi');return r},
 rready:(u,b)=>{const r=H.room(u,b);if(r.started)return r;const m=r.mem.find(m=>m.id===u.id);m.ready=!m.ready;return r},
 rstart:async(u,b)=>{const r=H.room(u,b);if(r.owner!==u.id)E('Faqat xona egasi boshlay oladi');if(r.started)return r;
  if(r.mem.length<r.size)E('Xona hali to\'lmagan');if(r.mem.some(m=>!m.ready))E('Hamma tayyor emas');
  const o=db.u[r.owner];let ch=Math.min(o.max,22);if(ch>=21&&!prem(o))ch=20;r.started=1;
  let s;if(r.mode==='two'&&r.mem.length>=4){const ids=r.mem.map(m=>m.id).sort(()=>Math.random()-.5),h2=Math.ceil(ids.length/2),A=ids.slice(0,h2),B=ids.slice(h2);r.tm={};A.forEach(i=>r.tm[i]='A');B.forEach(i=>r.tm[i]='B');const sA=db.s['r'+r.code+'A']=mk(A,ch,o.ev,A.length),sB=db.s['r'+r.code+'B']=mk(B,ch,o.ev,B.length);sB.seed=sA.seed;sA.race={code:r.code,t:'A'};sB.race={code:r.code,t:'B'};s=sA;await chap(sB)}else s=db.s['r'+r.code]=mk(r.mem.map(m=>m.id),ch,o.ev,r.size);r.mem.forEach(m=>{if(db.u[m.id])db.u[m.id].gs++});(db.st[dk(Date.now())]||={gs:0,ge:0}).gs++;await chap(s);return r},
 rleave:(u,b)=>{const r=db.r[String(b.code).toUpperCase()];u.room=null;if(!r)return{ok:1};
  r.mem=r.mem.filter(m=>m.id!==u.id);
  if(r.started){const sk=skey(r.code,u.id),s=db.s[sk];if(s){s.m=s.m.filter(x=>x!==u.id);s.n=Math.max(1,s.m.length);if(!s.m.length)delete db.s[sk];else{(s.chat=s.chat||[]).push({id:0,n:'⚙️',t:`${nn(u)} jamoani tark etdi`,p:'',nc:''});(s.log=s.log||[]).push(`${nn(u)} tark etdi`);s.msg=`🚪 ${nn(u)} jamoani tark etdi`;s.m.forEach(id=>ntf(id,`🚪 ${nn(u)} jamoani tark etdi. Jamoada ${s.m.length} kishi qoldi.`));s.v++}}
   if(r.owner===u.id&&r.mem.length)r.owner=r.mem[0].id}
  if(!r.mem.length||(!r.started&&r.owner===u.id)){r.mem.forEach(m=>{if(db.u[m.id])db.u[m.id].room=null});delete db.r[r.code];delete db.s['r'+r.code];delete db.s['r'+r.code+'A'];delete db.s['r'+r.code+'B']}
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
  try{const x=auth(q.headers['x-init']);if(!x)E("Telegram tasdiqlashi noto'g'ri. O'yinni bot orqali oching.");const k=q.url.slice(5),u=U(x),h=H[k];if(!h||(k.startsWith('a_')&&!isAdm(x.id)))E('?');if(!isAdm(x.id)){if(db.cfg.maint)E('🔧 Texnik ishlar: '+db.cfg.maint);if(u.ban)E('Hisobingiz cheklangan')}const j=await h(u,JSON.parse(b||'{}'));save();send(res,200,j)}catch(e){if(!e.u)elog('api',`${q.url}: ${e.message}`);send(res,400,{e:e.message})}}
 else if(q.url==='/health'){res.writeHead(200);res.end('ok')}else{res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(fs.readFileSync(path.join(__dirname,'index.html')))}});
// ---------- Bot ----------
const menu={inline_keyboard:[[{text:"🎮 O'yinni ochish",web_app:{url:WU}}],[{text:"📖 O'yin haqida",callback_data:'about'},{text:'💎 Premium',callback_data:'prem'}],[{text:'💖 Donat',callback_data:'don'},{text:'👑 Admin',url:'https://t.me/'+ADMIN.replace('@','')}]]};
const back={inline_keyboard:[[{text:'⬅️ Orqaga',callback_data:'home'}]]};
const HOME="🌀 <b>LOOPBREAK</b>\n\nJamoaviy detektiv-sarguzasht. 8 bob, har biri oldingisidan qiyinroq. Boshlash uchun pastdagi tugmani bosing.";
const ABOUT="📖 <b>LOOPBREAK 2.0 haqida</b>\n\nJamoaviy detektiv-sarguzasht: 22 bob, har biri oldingisidan qiyinroq, jumboqlar har safar yangidan tuziladi.\n\n🧩 <b>Jumboqlar:</b> shifrlar, mantiqiy sxemalar, labirint, sudoku, kriptarifm, qora papka (yolg'on dalillar) va boshqalar. Har bobning o'z turlari bor.\n👥 <b>Jamoa (2–6 kishi):</b> har kim o'z ma'lumotini ko'radi, rollar, chat, ishonch bahosi. 4, 5, 6 kishilik xonada bir jamoa bo'lib yoki ikki jamoa poygasi bo'lib o'ynash mumkin. Kimdir chiqsa, hamma xabar oladi.\n🔒 <b>Qoidalar:</b> yakka rejimda tugatilgan bobga qaytib bo'lmaydi (jamoada bu ta'sir qilmaydi). O'yindan chiqib qaytsangiz, shu bosqichning yangi savoli beriladi. Ko'p xato qilsangiz, javob yozish vaqtincha yopiladi va soniyalar sanaladi.\n⚡ <b>Kutilmagan vaziyat:</b> shovqin, taymer, teskari javob. Ustaxonada yasaladigan 🔮 Prizma yordam beradi.\n🪙 <b>LoopCoin:</b> to'g'ri javob uchun tanga. Do'kon (har hafta almashadigan cheklangan buyumlar), Qora bozor, kunlik missiyalar.\n🔭 <b>Rasadxona:</b> Sinov maydoni, Missiyalar, Hikoya arxivi, Ustaxona, Holat markazi, Xronika, Qora bozor, Tirik dunyo, Noma'lum xabarlar, Shifr laboratoriyasi, Yaratish rejimi, mavsumiy tadbirlar.\n👤 <b>Do'stlar:</b> so'rov, shaxsiy chat, jamoaga chaqirish, duel va tomosha qilish.\n🎮 <b>Mini-o'yinlar:</b> Code Rush, Shadow Memory, Reaction Zero, Gridbreak: rekordlar va do'stlar reytingi.\n💎 <b>Premium (300 ⭐ / 30 kun):</b> oxirgi ikki bob.\n💖 <b>Donat:</b> loyihani qo'llab-quvvatlash, anonim ham mumkin.\n💬 <b>Fikr bildirish:</b> Mini App ichida yozing, admin javob beradi.\n🤖 AI sahnalarni yozadi, javoblarni esa server tekshiradi.";
const PREM="💎 <b>Premium</b>\n\n21-bob (Teskari soat) va 22-bob (Oxirgi halqa) faqat Premium obunachilar uchun.\n\nNarxi: <b>300 ⭐ / 30 kun</b>";
const DON_TXT="💖 <b>Donat</b>\n\nLOOPBREAK loyihasini qo'llab-quvvatlash uchun istalgan miqdorda Stars yuborishingiz mumkin. Rahmat!\n\nAnonim yuborish va xabar yozish uchun Mini App ichidagi «Donat» bo'limidan foydalaning.";
const donInv=(chat,uid,a)=>{const id=Math.random().toString(36).slice(2,9);db.dn.unshift({id,u:uid,a,anon:false,msg:'',t:Date.now(),paid:0});save();return tg('sendInvoice',{chat_id:chat,title:'LOOPBREAK Donat',description:"Loyihani qo'llab-quvvatlash",payload:'don:'+id,provider_token:'',currency:'XTR',prices:[{label:'Donat',amount:a}]})};
const invoice=id=>tg('sendInvoice',{chat_id:id,title:'LOOPBREAK Premium',description:"30 kun: 21 va 22-boblar ochiladi",payload:'prem30',provider_token:'',currency:'XTR',prices:[{label:'Premium 30 kun',amount:300}]});
async function upd(x){
 if(x.pre_checkout_query){db.pa++;save();return tg('answerPreCheckoutQuery',{pre_checkout_query_id:x.pre_checkout_query.id,ok:true})}
 const m=x.message;if(m&&m.reply_to_message&&m.text&&isAdm(m.from.id)&&db.fbm[m.reply_to_message.message_id]){const f=db.fb.find(z=>z.id===db.fbm[m.reply_to_message.message_id]);if(f){f.rep.push({t:Date.now(),txt:m.text});alog(`fikrga javob #${f.id}`);const ok=await tg('sendMessage',{chat_id:f.u,text:`💬 Fikringizga javob:\n\n${m.text}`});save();return tg('sendMessage',{chat_id:m.chat.id,text:ok.ok?`✅ #${f.id} ga javob yuborildi`:"⚠️ Yetkazilmadi (foydalanuvchi botni /start qilmagan). Javob ilovada ko'rinadi."})}}
if(m&&m.from)U(m.from).bs=1;if(x.callback_query)U(x.callback_query.from).bs=1;if(m?.text==='/stats'&&isAdm(m.from.id))return tg('sendMessage',{chat_id:m.chat.id,text:report(),parse_mode:'HTML'});
 if(m?.successful_payment){const u=U(m.from),chg=m.successful_payment.telegram_payment_charge_id;if(db.pay.some(p=>p.id===chg))return;db.pay.push({t:Date.now(),u:u.id,a:m.successful_payment.total_amount,id:chg});const pl=m.successful_payment.invoice_payload||'';if(pl.startsWith('don:')){const d=db.dn.find(x=>x.id===pl.slice(4));if(d&&!d.paid){d.paid=1;u.don=(u.don||0)+d.a;if(!u.col.includes('💖 Homiy belgisi'))u.col.push('💖 Homiy belgisi');chron(u,`Donat: ${d.a} ⭐`);if(AID)tg('sendMessage',{chat_id:AID,text:`💖 Donat: ${d.a} ⭐\n👤 ${d.anon?'Anonim':nn(u)+' (ID '+u.id+')'}${d.msg?`\n💬 ${d.msg}`:''}`})}save();return tg('sendMessage',{chat_id:m.chat.id,text:'💖 Katta rahmat! Donatingiz qabul qilindi.',reply_markup:menu})}u.prem=Math.max(Date.now(),u.prem)+30*864e5;save();return tg('sendMessage',{chat_id:m.chat.id,text:'✅ Premium faollashdi! Mini Appni qayta oching.',reply_markup:menu})}
 if(m?.text?.startsWith('/start')){const uu=U(m.from);uu.bs=1;const sp=m.text.split(' ')[1];if(!uu.src&&sp&&sp!=='prem')uu.src=sp.slice(0,20);save();if(m.text.includes('prem')){await tg('sendMessage',{chat_id:m.chat.id,text:PREM,parse_mode:'HTML'});return invoice(m.chat.id)}
  return tg('sendMessage',{chat_id:m.chat.id,text:HOME,parse_mode:'HTML',reply_markup:menu})}
 const c=x.callback_query;if(!c)return;tg('answerCallbackQuery',{callback_query_id:c.id});
 const e=t=>tg('editMessageText',{chat_id:c.message.chat.id,message_id:c.message.message_id,text:t,parse_mode:'HTML',reply_markup:t===HOME?menu:back});
 if(c.data==='home')return e(HOME);if(c.data==='about')return e(ABOUT);
 if(c.data==='don'){await tg('sendMessage',{chat_id:c.message.chat.id,text:DON_TXT,parse_mode:'HTML',reply_markup:{inline_keyboard:[[50,100,250].map(n=>({text:`${n} ⭐`,callback_data:'dn'+n})),[500,1000].map(n=>({text:`${n} ⭐`,callback_data:'dn'+n})),[{text:"🎮 Mini App'da (anonim va xabar bilan)",web_app:{url:WU}}]]}});return}if(/^dn\d+$/.test(c.data))return donInv(c.message.chat.id,c.from.id,+c.data.slice(2));if(c.data==='adm')return e(`👑 <b>Admin</b>\n\nSavol, taklif yoki muammo bo'lsa murojaat qiling:\n${ADMIN}`);
 if(c.data==='prem'){await e(PREM);return invoice(c.message.chat.id)}}
async function poll(){await tg('deleteWebhook',{});await tg('setChatMenuButton',{menu_button:{type:'web_app',text:"O'ynash",web_app:{url:WU}}});let o=0;
 for(;;){const r=await tg('getUpdates',{offset:o,timeout:30,allowed_updates:['message','callback_query','pre_checkout_query']});
  for(const x of r.result||[]){o=x.update_id+1;try{await upd(x)}catch(e){console.error(e);elog('bot',e.message)}}if(!r.ok){elog('bot','getUpdates javob bermadi');await new Promise(r=>setTimeout(r,3000))}}}
if(require.main===module){if(!T||!WU){console.error('BOT_TOKEN va WEBAPP_URL kerak');process.exit(1)}(async()=>{if(!Object.keys(db.u).length&&await restore()){initDb();console.log('♻️ Baza Telegram zaxirasidan tiklandi:',Object.keys(db.u).length,'foydalanuvchi')}server.listen(PORT,()=>console.log('LOOPBREAK ishga tushdi:',PORT,'| AI:',AK?'kalit bor':'kalit YOQ','| Admin:',AID?'bor':'YOQ'));poll();jobs()})()}
module.exports={G,PL,auth,H,db,U,server};
