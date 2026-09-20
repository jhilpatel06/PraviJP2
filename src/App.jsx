import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search, Menu, X, ChevronRight, FileText, Users, ShieldCheck,
  ClipboardCheck, Building2, ArrowRight, CheckCircle2, Clock3,
  AlertCircle, Home as HomeIcon, LogIn, Landmark, Phone, Mail
} from "lucide-react";
import { getInitialApplications, getInitialFamilies, schemes } from "./data";

const fmt = n => new Intl.NumberFormat("en-IN").format(n);

function statusLabel(s) {
  return {
    verified: "ચકાસાયેલ",
    pending: "ચકાસણી બાકી",
    under_review: "ચકાસણી હેઠળ",
    approved: "મંજૂર",
    rejected: "નામંજૂર",
    draft: "મસૌદો"
  }[s] || s;
}

function Status({ status }) {
  const icon = status === "verified" || status === "approved" ? <CheckCircle2 size={15}/> :
    status === "pending" || status === "under_review" ? <Clock3 size={15}/> :
    <AlertCircle size={15}/>;
  return <span className={`status ${status}`}>{icon}{statusLabel(status)}</span>;
}

function GovernmentHeader({ officer=false }) {
  const [open, setOpen] = useState(false);
  return <header>
    <div className="topline">
      <div className="container topinner">
        <span>ગુજરાત સરકાર</span>
        <span>સત્તાવાર ડિજિટલ સેવા</span>
      </div>
    </div>
    <div className="brandbar">
      <div className="container brandinner">
        <Link to={officer ? "/?portal=officer" : "/"} className="brand">
          <div className="emblem">ગુજરાત<br/><small>સરકાર</small></div>
          <div>
            <div className="brandtitle">પરિવાર ઓળખ સંખ્યા</div>
            <div className="brandsub">Family ID Citizen Service</div>
          </div>
        </Link>
        <button className="mobileMenu" onClick={() => setOpen(!open)} aria-label="menu">{open ? <X/> : <Menu/>}</button>
        <nav className={open ? "nav open" : "nav"}>
          {officer ? <>
            <a href="#dashboard">ડેશબોર્ડ</a>
            <a href="#families">પરિવાર રજિસ્ટર</a>
            <a href="#verification">ચકાસણી</a>
            <a href="#applications">અરજીઓ</a>
            <Link className="portalSwitch" to="/">નાગરિક પોર્ટલ</Link>
          </> : <>
            <Link to="/">મુખ્ય પૃષ્ઠ</Link>
            <a href="#family">પરિવારની માહિતી</a>
            <a href="#schemes">યોગ્ય યોજનાઓ</a>
            <a href="#applications">મારી અરજીઓ</a>
            <a href="#help">મદદ</a>
            <Link className="portalSwitch" to="/?portal=officer">અધિકારી પોર્ટલ</Link>
          </>}
        </nav>
      </div>
    </div>
  </header>;
}

function Footer() {
  return <footer>
    <div className="container footergrid">
      <div><div className="footerbrand">ગુજરાત સરકાર</div><p>પરિવાર ઓળખ સંખ્યા સેવા</p></div>
      <div><strong>મહત્વપૂર્ણ લિંક્સ</strong><a href="#help">મદદ અને માર્ગદર્શન</a><a href="#help">ગોપનીયતા નીતિ</a><a href="#help">સુલભતા</a></div>
      <div><strong>સંપર્ક</strong><span><Phone size={14}/> હેલ્પલાઇન: 1800-000-0000</span><span><Mail size={14}/> support@gujarat.gov.in</span></div>
    </div>
    <div className="footerbottom">© 2026 ગુજરાત સરકાર. આ પ્રદર્શન માટેનું ડેમો પોર્ટલ છે.</div>
  </footer>;
}

function CitizenApp() {
  const [families, setFamilies] = useState(getInitialFamilies);
  const [apps, setApps] = useState(getInitialApplications);
  const [page, setPage] = useState("home");
  const [selectedScheme, setSelectedScheme] = useState(null);
  const family = families[0];

  useEffect(() => localStorage.setItem("pravi-families", JSON.stringify(families)), [families]);
  useEffect(() => localStorage.setItem("pravi-applications", JSON.stringify(apps)), [apps]);

  const familySchemes = useMemo(() => schemes.map(s => ({
    ...s,
    eligible: s.eligible(family)
  })), [family]);

  const apply = scheme => {
    const existing = apps.find(a => a.familyId === family.id && a.schemeId === scheme.id);
    if (existing) { setPage("applications"); return; }
    const id = `APP-2026-${String(apps.length + 42).padStart(5,"0")}`;
    setApps([...apps, { id, familyId: family.id, schemeId: scheme.id, applicant: family.head, status: "under_review", submitted: "આજે" }]);
    setSelectedScheme(scheme.id);
    setPage("applications");
  };

  const navPage = p => { setPage(p); window.scrollTo({top:0, behavior:"smooth"}); };

  return <div className="app">
    <GovernmentHeader/>
    {page === "home" && <CitizenHome family={family} onFamily={() => navPage("family")} onSchemes={() => navPage("schemes")} />}
    {page === "family" && <FamilyPage family={family} onSchemes={() => navPage("schemes")} />}
    {page === "schemes" && <SchemesPage family={family} apps={apps} schemes={familySchemes} onApply={apply} />}
    {page === "applications" && <ApplicationsPage family={family} apps={apps} />}
    <div id="help"></div>
    <Footer/>
  </div>;
}

function CitizenHome({family,onFamily,onSchemes}) {
  return <main>
    <section className="hero">
      <div className="container heroGrid">
        <div>
          <div className="eyebrow">ગુજરાત સરકારની ડિજિટલ સેવા</div>
          <h1>એક પરિવાર,<br/><span>એક ઓળખ.</span></h1>
          <p className="lead">પરિવાર ઓળખ સંખ્યા દ્વારા તમારા પરિવારની માહિતી, સરકારી યોજનાઓની પાત્રતા અને અરજીઓ એક જ સ્થળે વ્યવસ્થિત રીતે જુઓ.</p>
          <div className="actions"><button className="primary" onClick={onFamily}>પરિવારની માહિતી જુઓ <ArrowRight size={17}/></button><button className="secondary" onClick={onSchemes}>યોગ્ય યોજનાઓ</button></div>
        </div>
        <div className="servicePanel">
          <div className="panelHead"><Landmark size={19}/> પરિવાર ઓળખ સેવા</div>
          <div className="familyid">GJ-2026-00124</div>
          <div className="smallmuted">ડેમો પરિવાર ઓળખ સંખ્યા</div>
          <div className="panelrow"><span>પરિવારના સભ્યો</span><strong>5</strong></div>
          <div className="panelrow"><span>ચકાસણી</span><Status status="verified"/></div>
          <button className="linkbutton" onClick={onFamily}>પરિવારની સંપૂર્ણ માહિતી <ChevronRight size={16}/></button>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="sectiontitle"><div><div className="eyebrow">સેવાની મુખ્ય સુવિધાઓ</div><h2>પરિવાર સંબંધિત સેવાઓ એક જ સ્થળે</h2></div></div>
        <div className="featuregrid">
          <Feature icon={<Users/>} title="પરિવારની માહિતી" text="પરિવારના સભ્યો અને ચકાસણીની સ્થિતિ જુઓ." onClick={onFamily}/>
          <Feature icon={<ShieldCheck/>} title="યોજનાની પાત્રતા" text="તમારી માહિતીના આધારે યોગ્ય યોજનાઓ ઓળખો." onClick={onSchemes}/>
          <Feature icon={<ClipboardCheck/>} title="અરજીની સ્થિતિ" text="સરકારી યોજનાઓ માટેની અરજીઓની સ્થિતિ જુઓ." onClick={() => {}}/>
        </div>
      </div>
    </section>
    <section className="infoBand">
      <div className="container process"><div><div className="eyebrow">કઈ રીતે કાર્ય કરે છે?</div><h2>સરળ અને પારદર્શક પ્રક્રિયા</h2></div><div className="steps"><Step n="01" title="પરિવારની માહિતી" text="એકત્રિત અને ચકાસાયેલ પરિવાર રેકોર્ડ."/><Step n="02" title="પાત્રતા તપાસ" text="ઉપલબ્ધ માહિતી પરથી યોજનાઓની તપાસ."/><Step n="03" title="અરજી અને ચકાસણી" text="અરજી સબમિટ કરી સ્થિતિ ટ્રેક કરો."/></div></div>
    </section>
  </main>;
}
function Feature({icon,title,text,onClick}) { return <button className="feature" onClick={onClick}><div className="featureIcon">{icon}</div><h3>{title}</h3><p>{text}</p><span>વધુ જુઓ <ChevronRight size={15}/></span></button>; }
function Step({n,title,text}) { return <div className="step"><b>{n}</b><div><strong>{title}</strong><p>{text}</p></div></div>; }

function FamilyPage({family,onSchemes}) {
  return <main className="container page">
    <div className="breadcrumb">મુખ્ય પૃષ્ઠ <ChevronRight size={14}/> પરિવારની માહિતી</div>
    <div className="pagehead"><div><div className="eyebrow">પરિવાર રેકોર્ડ</div><h1>પરિવારની માહિતી</h1><p>તમારા પરિવાર સાથે જોડાયેલી મુખ્ય માહિતી અને સભ્યોની ચકાસણી સ્થિતિ.</p></div><Status status="verified"/></div>
    <section className="identitybox">
      <div><span>પરિવાર ઓળખ સંખ્યા</span><strong>{family.id}</strong></div>
      <div><span>પરિવારના મુખ્ય સભ્ય</span><strong>{family.head}</strong></div>
      <div><span>કુલ સભ્યો</span><strong>{family.members.length}</strong></div>
      <div><span>સરનામું</span><strong>{family.address}</strong></div>
    </section>
    <div className="sectiontitle compact"><div><h2>પરિવારના સભ્યો</h2><p>સભ્યની ઓળખ અને ચકાસણી સ્થિતિ.</p></div></div>
    <div className="tablewrap"><table><thead><tr><th>નામ</th><th>ઉંમર</th><th>સંબંધ</th><th>ચકાસણી</th></tr></thead><tbody>{family.members.map(m=><tr key={m.id}><td><strong>{m.name}</strong></td><td>{m.age}</td><td>{m.relation}</td><td><Status status={m.status}/></td></tr>)}</tbody></table></div>
    <div className="notice"><AlertCircle size={18}/><div><strong>એક સભ્યની ચકાસણી બાકી છે.</strong><p>કાવ્યા પટેલ માટે જરૂરી માહિતીની ચકાસણી પ્રક્રિયા પૂર્ણ કરવાની બાકી છે.</p></div></div>
    <div className="pageActions"><button className="primary" onClick={onSchemes}>યોગ્ય યોજનાઓ જુઓ <ArrowRight size={17}/></button></div>
  </main>;
}

function SchemesPage({family,apps,schemes,onApply}) {
  return <main className="container page">
    <div className="breadcrumb">મુખ્ય પૃષ્ઠ <ChevronRight size={14}/> યોગ્ય યોજનાઓ</div>
    <div className="pagehead"><div><div className="eyebrow">પાત્રતા સેવા</div><h1>તમારા પરિવાર માટે યોગ્ય યોજનાઓ</h1><p>તમારી પરિવારની માહિતીના આધારે ઉપલબ્ધ યોજનાઓની પાત્રતા દર્શાવવામાં આવી છે.</p></div></div>
    <div className="schemeList">{schemes.map(s=>{
      const app=apps.find(a=>a.familyId===family.id&&a.schemeId===s.id);
      return <article className="scheme" key={s.id}>
        <div className="schemeTop"><div><h2>{s.name}</h2><p>{s.short}</p></div><Status status={app ? app.status : s.eligible ? "verified" : "rejected"}/></div>
        <div className="reason"><strong>{app ? "અરજીની સ્થિતિ" : s.eligible ? "પાત્રતા માટેનું કારણ" : "પાત્ર ન હોવાનું કારણ"}</strong><p>{app ? `અરજી ${app.id} હાલમાં ${statusLabel(app.status)} છે.` : s.reason}</p></div>
        <div className="docline"><FileText size={16}/><span>જરૂરી દસ્તાવેજો: {s.docs.join(" • ")}</span></div>
        <div className="schemeAction">{app ? <button className="secondary" disabled>અરજી સબમિટ થઈ ગઈ</button> : s.eligible ? <button className="primary" onClick={()=>onApply(s)}>અરજી કરો <ArrowRight size={16}/></button> : <button className="secondary" disabled>હાલ પાત્ર નથી</button>}</div>
      </article>;
    })}</div>
  </main>;
}

function ApplicationsPage({family,apps}) {
  const familyApps=apps.filter(a=>a.familyId===family.id);
  return <main className="container page">
    <div className="breadcrumb">મુખ્ય પૃષ્ઠ <ChevronRight size={14}/> મારી અરજીઓ</div>
    <div className="pagehead"><div><div className="eyebrow">અરજી સેવા</div><h1>મારી અરજીઓ</h1><p>તમારી પરિવાર ઓળખ સાથે જોડાયેલી યોજનાઓની અરજીઓ અને તેમની સ્થિતિ.</p></div></div>
    {familyApps.length===0 ? <div className="empty">હાલ કોઈ અરજી ઉપલબ્ધ નથી.</div> : familyApps.map(a=>{
      const s=schemes.find(x=>x.id===a.schemeId);
      return <article className="application" key={a.id}>
        <div className="apphead"><div><span className="muted">{a.id}</span><h2>{s?.name}</h2></div><Status status={a.status}/></div>
        <div className="appmeta"><span>અરજદાર: <strong>{a.applicant}</strong></span><span>સબમિટ તારીખ: <strong>{a.submitted}</strong></span></div>
        <div className="timeline"><div className="done"><i>✓</i><span>અરજી સબમિટ</span></div><div className={a.status==="under_review"?"active":a.status==="approved"?"done":""}><i>{a.status==="approved"?"✓":"2"}</i><span>ચકાસણી</span></div><div className={a.status==="approved"?"done":""}><i>{a.status==="approved"?"✓":"3"}</i><span>મંજૂરી</span></div></div>
      </article>
    })}
  </main>;
}

function OfficerApp() {
  const [families,setFamilies]=useState(getInitialFamilies);
  const [apps,setApps]=useState(getInitialApplications);
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState(null);
  const [tab,setTab]=useState("dashboard");
  useEffect(()=>localStorage.setItem("pravi-families",JSON.stringify(families)),[families]);
  useEffect(()=>localStorage.setItem("pravi-applications",JSON.stringify(apps)),[apps]);
  const pending=families.filter(f=>!f.verified || f.members.some(m=>m.status==="pending"));
  const eligibleUnserved=families.filter(f=>schemes.some(s=>s.eligible(f)) && !apps.some(a=>a.familyId===f.id));
  const find=()=>setSelected(families.find(f=>f.id.toLowerCase()===query.trim().toLowerCase())||families.find(f=>f.head.includes(query.trim()))||null);
  const verify=()=>{
    if(!selected)return;
    const updated={...selected,verified:true,members:selected.members.map(m=>({...m,status:"verified"}))};
    setFamilies(families.map(f=>f.id===selected.id?updated:f));
    setSelected(updated);
  };
  const approve=(id)=>{
    setApps(apps.map(a=>a.id===id?{...a,status:"approved"}:a));
  };
  return <div className="app">
    <GovernmentHeader officer/>
    <main className="container officer">
      <div className="officerIntro"><div><div className="eyebrow">અધિકારી સેવા</div><h1>વહીવટી ડેશબોર્ડ</h1><p>પરિવાર ઓળખ, ચકાસણી અને યોજનાની અરજીઓનું સંચાલન.</p></div><div className="officerTag"><Building2 size={17}/> ગાંધીનગર જિલ્લો</div></div>
      {tab==="dashboard" && <OfficerDashboard pending={pending} eligible={eligibleUnserved} apps={apps} onFamily={()=>setTab("families")} onApplications={()=>setTab("applications")} />}
      {tab==="families" && <OfficerFamilies families={families} query={query} setQuery={setQuery} find={find} selected={selected} setSelected={setSelected} verify={verify} onBack={()=>setTab("dashboard")}/>}
      {tab==="applications" && <OfficerApplications apps={apps} families={families} approve={approve} onBack={()=>setTab("dashboard")}/>}
      {tab==="verification" && <OfficerFamilies families={families} query={query} setQuery={setQuery} find={find} selected={selected} setSelected={setSelected} verify={verify} onBack={()=>setTab("dashboard")}/>}
    </main>
    <Footer/>
    <div className="officerTabs"><button className={tab==="dashboard"?"active":""} onClick={()=>setTab("dashboard")}>ડેશબોર્ડ</button><button className={tab==="families"||tab==="verification"?"active":""} onClick={()=>setTab("families")}>પરિવાર રજિસ્ટર</button><button className={tab==="applications"?"active":""} onClick={()=>setTab("applications")}>અરજીઓ</button></div>
  </div>;
}

function OfficerDashboard({pending,eligible,apps,onFamily,onApplications}) {
  return <div id="dashboard">
    <div className="metricgrid">
      <Metric label="કુલ પરિવાર" value="1,24,580" icon={<Users/>}/>
      <Metric label="ચકાસાયેલ" value="1,08,420" icon={<ShieldCheck/>}/>
      <Metric label="ચકાસણી બાકી" value="12,350" icon={<Clock3/>}/>
      <Metric label="ધ્યાન જરૂરી" value="3,810" icon={<AlertCircle/>}/>
    </div>
    <div className="officerGrid">
      <section className="panel"><div className="panelTitle"><div><h2>મહત્વપૂર્ણ કાર્ય</h2><p>વધુ ધ્યાન જરૂરી હોય તેવા રેકોર્ડ.</p></div></div>
        <button className="workrow" onClick={onFamily}><div><strong>ચકાસણી માટે બાકી</strong><span>પરિવારના રેકોર્ડની ચકાસણી</span></div><b>{pending.length}</b><ChevronRight/></button>
        <button className="workrow" onClick={onFamily}><div><strong>યોગ્ય પરંતુ લાભ પ્રાપ્ત ન કરતા પરિવાર</strong><span>પાત્રતા ધરાવતા પરંતુ અરજી બાકી</span></div><b>{eligible.length}</b><ChevronRight/></button>
        <button className="workrow" onClick={onApplications}><div><strong>અરજીઓ ચકાસણી હેઠળ</strong><span>અધિકારીની કાર્યવાહી જરૂરી</span></div><b>{apps.filter(a=>a.status==="under_review").length}</b><ChevronRight/></button>
      </section>
      <section className="panel"><div className="panelTitle"><div><h2>યોજનાની સ્થિતિ</h2><p>ડેમો પોર્ટલમાં ઉપલબ્ધ સંક્ષિપ્ત માહિતી.</p></div></div>
        <div className="barrow"><span>આવાસ સહાય</span><div><i style={{width:"72%"}}></i></div><b>72%</b></div>
        <div className="barrow"><span>શિષ્યવૃત્તિ</span><div><i style={{width:"58%"}}></i></div><b>58%</b></div>
        <div className="barrow"><span>વૃદ્ધ સહાય</span><div><i style={{width:"41%"}}></i></div><b>41%</b></div>
        <div className="note">આ આંકડા પ્રદર્શન માટેના ડેમો ડેટા છે.</div>
      </section>
    </div>
    <section className="panel searchPanel"><div><h2>પરિવાર ઓળખ સંખ્યા શોધો</h2><p>કોઈ પરિવારનો સંપૂર્ણ રેકોર્ડ જોવા માટે Family ID શોધો.</p></div><button className="primary" onClick={onFamily}>પરિવાર રજિસ્ટર ખોલો <ArrowRight size={16}/></button></section>
  </div>;
}
function Metric({label,value,icon}){return <div className="metric"><div className="metricIcon">{icon}</div><div><span>{label}</span><strong>{value}</strong></div></div>}

function OfficerFamilies({families,query,setQuery,find,selected,setSelected,verify,onBack}) {
  return <section id="families">
    <div className="sectionBack" onClick={onBack}>← ડેશબોર્ડ</div>
    <div className="officerSectionHead"><div><div className="eyebrow">પરિવાર રજિસ્ટર</div><h2>પરિવાર શોધ અને ચકાસણી</h2></div></div>
    <div className="searchbox"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&find()} placeholder="Family ID અથવા પરિવારના મુખ્ય સભ્યનું નામ"/><button className="primary" onClick={find}>શોધો</button></div>
    {!selected && <div className="tablewrap"><table><thead><tr><th>Family ID</th><th>મુખ્ય સભ્ય</th><th>જિલ્લો</th><th>સભ્યો</th><th>સ્થિતિ</th><th></th></tr></thead><tbody>{families.map(f=><tr key={f.id}><td><strong>{f.id}</strong></td><td>{f.head}</td><td>{f.district}</td><td>{f.members.length}</td><td><Status status={f.verified?"verified":"pending"}/></td><td><button className="tablebutton" onClick={()=>setSelected(f)}>જુઓ</button></td></tr>)}</tbody></table></div>}
    {selected && <FamilyOfficerRecord family={selected} onVerify={verify} onBack={()=>setSelected(null)}/>}
  </section>;
}

function FamilyOfficerRecord({family,onVerify,onBack}) {
  return <div className="record">
    <div className="recordhead"><div><span className="muted">Family ID</span><h2>{family.id}</h2><p>{family.head} · {family.address}</p></div><Status status={family.verified?"verified":"pending"}/></div>
    <div className="recordGrid"><div><span>કુલ સભ્યો</span><strong>{family.members.length}</strong></div><div><span>વાર્ષિક આવક</span><strong>₹ {fmt(family.income)}</strong></div><div><span>રહેઠાણ</span><strong>{family.housing}</strong></div><div><span>ચકાસણી</span><strong>{family.verified?"પૂર્ણ":"બાકી"}</strong></div></div>
    <h3>પરિવારના સભ્યો</h3>
    <div className="tablewrap"><table><thead><tr><th>નામ</th><th>ઉંમર</th><th>સંબંધ</th><th>સ્થિતિ</th></tr></thead><tbody>{family.members.map(m=><tr key={m.id}><td>{m.name}</td><td>{m.age}</td><td>{m.relation}</td><td><Status status={m.status}/></td></tr>)}</tbody></table></div>
    <div className="recordActions"><button className="secondary" onClick={onBack}>પાછા જાઓ</button>{!family.verified&&<button className="primary" onClick={onVerify}><CheckCircle2 size={16}/> પરિવાર ચકાસો</button>}</div>
  </div>;
}

function OfficerApplications({apps,families,approve,onBack}) {
  return <section id="applications"><div className="sectionBack" onClick={onBack}>← ડેશબોર્ડ</div><div className="officerSectionHead"><div><div className="eyebrow">અરજી વ્યવસ્થાપન</div><h2>ચકાસણી હેઠળની અરજીઓ</h2></div></div>
    <div className="tablewrap"><table><thead><tr><th>અરજી ID</th><th>Family ID</th><th>અરજદાર</th><th>યોજના</th><th>સ્થિતિ</th><th>કાર્ય</th></tr></thead><tbody>{apps.map(a=>{const f=families.find(x=>x.id===a.familyId);const s=schemes.find(x=>x.id===a.schemeId);return <tr key={a.id}><td><strong>{a.id}</strong></td><td>{a.familyId}</td><td>{a.applicant}</td><td>{s?.name}</td><td><Status status={a.status}/></td><td>{a.status==="under_review"?<button className="tablebutton approve" onClick={()=>approve(a.id)}>મંજૂર કરો</button>:<span className="muted">કાર્ય પૂર્ણ</span>}</td></tr>})}</tbody></table></div>
  </section>;
}

function App() {
  const params = new URLSearchParams(useLocation().search);
  return params.get("portal")==="officer" ? <OfficerApp/> : <CitizenApp/>;
}

export default App;