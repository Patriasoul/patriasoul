/* PatriaSoul – Vjera: centralni podaci */
export const VJERA_SEKCIJE = [
{id:'evandelje',title:'Evanđelje',icon:'✝',description:'Dnevna riječ Evanđelja i prostor za kratko razmatranje.',href:'evandelje.html',tags:['evanđelje','isus','riječ']},
{id:'svetac-dana',title:'Svetac dana',icon:'✦',description:'Upoznaj svece, blaženike i svjedoke vjere kroz povijest Crkve.',href:'svetac-dana.html',tags:['sveci','blaženici','svjedoci vjere']},
{id:'molitve',title:'Molitve',icon:'🙏',description:'Tradicionalne i prigodne molitve za svakodnevni život.',href:'molitve.html',tags:['molitva','kršćanstvo','duhovnost']},
{id:'krunica',title:'Krunica',icon:'📿',description:'Vodič kroz molitvu svete krunice i njezina otajstva.',href:'krunica.html',tags:['krunica','marija','molitva']},
{id:'blagdani',title:'Blagdani',icon:'🕊',description:'Liturgijski blagdani i važni dani katoličke godine.',href:'blagdani.html',tags:['liturgija','blagdani','crkvena godina']},
{id:'biblija',title:'Biblija',icon:'📖',description:'Knjige Svetoga pisma, poznati odlomci i pomoć za čitanje Biblije.',href:'biblija.html',tags:['biblija','sveto pismo','stari zavjet','novi zavjet']}
];

export const VJERA_ISTAKNUTO={title:'Ja sam svjetlost svijeta.',text:'Tko ide za mnom, neće hodati u tami, nego će imati svjetlost života.',reference:'Ivan 8,12',author:'Isus Krist'};
export const VJERA_MISLI=[
{id:'svjetlost-svijeta',text:'Ja sam svjetlost svijeta. Tko ide za mnom, neće hodati u tami, nego će imati svjetlost života.',reference:'Ivan 8,12',tags:['isus','svjetlost','nada']},
{id:'ne-bojte-se',text:'Ne bojte se.',reference:'usp. Mt 28,10',tags:['hrabrost','nada','vjera']},
{id:'ljubite-jedni-druge',text:'Ljubite jedni druge kao što sam ja vas ljubio.',reference:'Ivan 15,12',tags:['ljubav','isus','zajedništvo']}
];
export const VJERA_KATEGORIJE=['Isus Krist','Biblija','Molitva','Marija','Sveci','Sakramenti','Liturgija','Crkvena povijest','Katolička baština','Kršćanska svakodnevica'];

/* Dnevni sloj. Ključ je ISO datum; renderer može ga koristiti bez mijenjanja stranica. */
export const VJERA_DNEVNO={
 '2026-09-03':{date:'3. rujna 2026.',saint:'Sv. Grgur Veliki, papa i crkveni naučitelj',celebration:'Spomendan',gospel:'Lk 5,1-11',gospelTitle:'Oni ostaviše sve i pođoše za njim',firstReading:'1Kor 3,18-23',reflection:'Isus poziva Petra da se ne boji i da krene u dublje. Današnji dan podsjeća da vjera traži povjerenje i spremnost na korak naprijed.',source:'Hrvatska katolička mreža — Liturgija dana'}
};

export const vjeraQuiz=[
{id:'vj-001',category:'Isus Krist',question:'U kojem je gradu Isus rođen?',options:['Betlehem','Nazaret','Jeruzalem','Kafarnaum'],answer:'Betlehem',explanation:'Evanđelja po Mateju i Luki navode Betlehem kao mjesto Isusova rođenja.',source:'Mt 2,1; Lk 2,4-7',difficulty:'easy'},
{id:'vj-002',category:'Biblija',question:'Koliko Evanđelja nalazimo u Novom zavjetu?',options:['4','3','5','7'],answer:'4',explanation:'Četiri kanonska Evanđelja su po Mateju, Marku, Luki i Ivanu.',source:'Novi zavjet',difficulty:'easy'},
{id:'vj-003',category:'Molitva',question:'Kako počinje molitva Očenaš?',options:['Oče naš, koji jesi na nebesima','Zdravo Marijo, milosti puna','Vjerujem u Boga','Slava Ocu i Sinu'],answer:'Oče naš, koji jesi na nebesima',explanation:'Očenaš je molitva koju Isus uči svoje učenike u Evanđelju.',source:'Mt 6,9; Lk 11,2',difficulty:'easy'},
{id:'vj-004',category:'Isus Krist',question:'Koliko je apostola Isus izabrao?',options:['12','10','7','40'],answer:'12',explanation:'Isus je izabrao Dvanaestoricu apostola.',source:'Mk 3,13-19; Lk 6,13-16',difficulty:'easy'},
{id:'vj-005',category:'Marija',question:'Kako se zove Isusova majka?',options:['Marija','Elizabeta','Marta','Ana'],answer:'Marija',explanation:'Evanđelja Mariju navode kao Isusovu majku.',source:'Mt 1,16; Lk 1,30-31',difficulty:'easy'},
{id:'vj-006',category:'Biblija',question:'Koja je prva knjiga Biblije?',options:['Postanak','Izlazak','Psalmi','Izaija'],answer:'Postanak',explanation:'Postanak je prva knjiga Staroga zavjeta.',source:'Post 1,1',difficulty:'easy'},
{id:'vj-007',category:'Biblija',question:'Koja je posljednja knjiga Novoga zavjeta?',options:['Otkrivenje','Djela apostolska','Poslanica Rimljanima','Hebrejima'],answer:'Otkrivenje',explanation:'Otkrivenje je posljednja knjiga Novoga zavjeta.',source:'Otk 1,1',difficulty:'medium'},
{id:'vj-008',category:'Sakramenti',question:'Koliko Katolička Crkva priznaje sakramenata?',options:['7','5','6','10'],answer:'7',explanation:'Krštenje, potvrda, euharistija, pokora, bolesničko pomazanje, sveti red i ženidba.',source:'Katekizam Katoličke Crkve, 1210',difficulty:'easy'},
{id:'vj-009',category:'Liturgija',question:'Koji se sakrament smatra izvorom i vrhuncem kršćanskoga života?',options:['Euharistija','Krštenje','Potvrda','Sveti red'],answer:'Euharistija',explanation:'Euharistija je prema Katekizmu izvor i vrhunac svega kršćanskog života.',source:'Katekizam Katoličke Crkve, 1324',difficulty:'medium'},
{id:'vj-010',category:'Isus Krist',question:'Gdje je Isus kršten?',options:['Na rijeci Jordanu','Na Galilejskom jezeru','U Jeruzalemu','Na Maslinskoj gori'],answer:'Na rijeci Jordanu',explanation:'Isusa je krstio Ivan na Jordanu.',source:'Mt 3,13-17; Mk 1,9-11',difficulty:'easy'},
{id:'vj-011',category:'Molitva',question:'Koja je molitva poznata kao marijanska molitva koja počinje riječima „Zdravo, Marijo“?',options:['Zdravomarija','Očenaš','Vjerovanje','Salve Regina'],answer:'Zdravomarija',explanation:'Zdravomarija je jedna od najpoznatijih kršćanskih molitava upućenih Mariji.',source:'Lk 1,28.42',difficulty:'easy'},
{id:'vj-012',category:'Isus Krist',question:'Koji je apostol zanijekao Isusa tri puta?',options:['Petar','Ivan','Andrija','Toma'],answer:'Petar',explanation:'Petar je tri puta zanijekao da poznaje Isusa prije njegova raspeća.',source:'Mt 26,69-75',difficulty:'easy'}
];
export function getVjeraSekcija(id){return VJERA_SEKCIJE.find(item=>item.id===id)||null}
export function getVjeraPitanje(id){return vjeraQuiz.find(item=>item.id===id)||null}
export function getVjeraPitanjaByCategory(category){const v=String(category||'').trim().toLowerCase();return v?vjeraQuiz.filter(item=>item.category.toLowerCase()===v):[...vjeraQuiz]}
export function searchVjera(term){const v=String(term||'').trim().toLowerCase();return v?VJERA_SEKCIJE.filter(item=>[item.id,item.title,item.description,...item.tags].join(' ').toLowerCase().includes(v)):[...VJERA_SEKCIJE]}
export function getVjeraDnevno(date=new Date()){const key=new Date(date).toISOString().slice(0,10);return VJERA_DNEVNO[key]||null}
export function validateVjeraQuiz(){const ids=new Set(),errors=[];vjeraQuiz.forEach(item=>{if(!item.id||ids.has(item.id))errors.push(`Neispravan ili dupliciran ID: ${item.id}`);ids.add(item.id);if(!Array.isArray(item.options)||item.options.length!==4)errors.push(`${item.id}: pitanje mora imati točno 4 opcije.`);if(!item.options?.includes(item.answer))errors.push(`${item.id}: točan odgovor nije među ponuđenim opcijama.`)});return{valid:errors.length===0,total:vjeraQuiz.length,errors}}
export const PATRIA_VJERA={sections:VJERA_SEKCIJE,featured:VJERA_ISTAKNUTO,thoughts:VJERA_MISLI,categories:VJERA_KATEGORIJE,daily:VJERA_DNEVNO,quiz:vjeraQuiz};
if(typeof window!=='undefined'){window.PATRIA_VJERA=PATRIA_VJERA;window.PATRIA_VJERA_QUIZ=vjeraQuiz}
export default PATRIA_VJERA;