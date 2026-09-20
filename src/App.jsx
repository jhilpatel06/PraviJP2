import React, { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileCheck,
  FileText,
  Home,
  LogOut,
  Menu,
  Plus,
  Search,
  ShieldCheck,
  Upload,
  UserPlus,
  Users,
  X
} from "lucide-react";
import {
  addFamilyMember,
  createApplication,
  getApplications,
  getApplicationsByFamilyId,
  getCurrentUser,
  getFamilies,
  getFamilyById,
  initializeDemoData,
  loginUser,
  logoutUser,
  registerUser,
  schemes,
  updateApplicationStatus,
  updateFamilyVerification
} from "./data";

const statusNames = {
  verified: "ચકાસાયેલ",
  pending: "ચકાસણી બાકી",
  submitted: "સબમિટ થઈ",
  under_review: "ચકાસણી હેઠળ",
  approved: "મંજૂર",
  rejected: "નામંજૂર"
};

const money = value => new Intl.NumberFormat("en-IN").format(value);

function Status({ value }) {
  return (
    <span className={`status ${value}`}>
      <CheckCircle2 size={14} />
      {statusNames[value] || value}
    </span>
  );
}

function Header({ officer = false }) {
  const [open, setOpen] = useState(false);
  const user = getCurrentUser();

  const links = officer
    ? [
        ["ડેશબોર્ડ", "/officer"],
        ["પરિવાર શોધ", "/officer/families"],
        ["ચકાસણી", "/officer/verification"],
        ["અરજીઓ", "/officer/applications"],
        ["પાત્ર પરિવાર", "/officer/eligible-families"]
      ]
    : user
    ? [
        ["ડેશબોર્ડ", "/citizen"],
        ["મારું પરિવાર", "/citizen/family"],
        ["સભ્યો", "/citizen/members"],
        ["યોજનાઓ", "/citizen/schemes"],
        ["મારી અરજીઓ", "/citizen/applications"],
        ["ચકાસણી", "/citizen/verification"]
      ]
    : [
        ["હોમ", "/"],
        ["પરિવાર ઓળખ સંખ્યા", "/#family"],
        ["કેવી રીતે કાર્ય કરે છે", "/#howitworks"],
        ["સેવાઓ", "/#services"],
        ["યોજનાઓ", "/#schemes"],
        ["પ્રશ્નો (FAQ)", "/#faq"],
        ["સંપર્ક", "/#contact"]
      ];

  return (
    <>
      <div className="topline">
        <div className="container topinner">
          <span>ગુજરાત સરકાર</span>
          <span>સત્તાવાર ડિજિટલ સેવા</span>
        </div>
      </div>
      <header className="brandbar">
        <div className="container brandinner">
          <Link className="brand" to={officer ? "/officer" : user ? "/citizen" : "/"}>
            <div className="emblem">
              ગુજરાત
              <br />
              <small>સરકાર</small>
            </div>
            <div>
              <div className="brandtitle">પરિવાર ઓળખ સંખ્યા</div>
              <div className="brandsub">Parivar ID {officer && "· અધિકારી પોર્ટલ"}</div>
            </div>
          </Link>
          <button className="mobileMenu" onClick={() => setOpen(!open)} aria-label="મેનુ">
            {open ? <X /> : <Menu />}
          </button>
          <nav className={open ? "nav open" : "nav"}>
            {links.map(([label, href]) => (
              <Link key={href} to={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            {user ? (
              <button
                className="linkbutton navlogout"
                onClick={() => {
                  logoutUser();
                  window.location.href = "/";
                }}
              >
                બહાર નીકળો <LogOut size={14} />
              </button>
            ) : (
              <>
                <Link className="portalSwitch" to="/login">
                  પ્રવેશ કરો
                </Link>
                <Link className="primary smallButton" to="/register">
                  નોંધણી કરો
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footergrid">
        <div>
          <div className="footerbrand">ગુજરાત સરકાર</div>
          <p>પરિવાર ઓળખ સંખ્યા સેવા · ડિજિટલ ગુજરાત મિશન</p>
        </div>
        <div>
          <strong>મહત્વપૂર્ણ લિંક્સ</strong>
          <Link to="/">મુખ્ય પૃષ્ઠ</Link>
          <Link to="/#family">પરિવાર ઓળખ શું છે?</Link>
          <Link to="/#schemes">સરકારી યોજનાઓ</Link>
          <Link to="/login">પ્રવેશ કરો</Link>
          <Link to="/register">નોંધણી કરો</Link>
        </div>
        <div>
          <strong>મદદ અને સંપર્ક</strong>
          <span>હેલ્પલાઇન: 1800-233-5500 (ટોલ ફ્રી)</span>
          <span>parivarid-support@gujarat.gov.in</span>
          <span>ગાંધીનગર, ગુજરાત</span>
        </div>
      </div>
      <div className="footerbottom">© 2026 ગુજરાત સરકાર. સત્તાવાર પરિવાર ઓળખ સેવા ડેમો પોર્ટલ.</div>
    </footer>
  );
}

function PublicHome() {
  const [faqOpen, setFaqOpen] = useState(0);

  const faqs = [
    {
      q: "પરિવાર ઓળખ સંખ્યા (Parivar ID) શું છે?",
      a: "પરિવાર ઓળખ સંખ્યા એ ગુજરાત સરકાર દ્વારા પરિવારોને આપવામાં આવતો એક અનન્ય (Unique) ડિજિટલ ઓળખ ક્રમાંક છે, જે પરિવારના સભ્યો, આવક, રહેઠાણ અને સરકારી યોજનાઓની પાત્રતાને એક જ વિશ્વસનીય રેકોર્ડ સાથે જોડે છે."
    },
    {
      q: "આ પોર્ટલ પર નોંધણી માટે કઈ વિગતો જરૂરી છે?",
      a: "પરિવારના મુખ્ય સભ્યનું નામ, મોબાઇલ નંબર, રહેઠાણનું સરનામું, અંદાજિત વાર્ષિક આવક, રહેઠાણનો પ્રકાર અને પરિવારના સભ્યોની પ્રાથમિક વિગતો. આધાર નંબર જેવી સંવેદનશીલ વિગતો નોંધણી માટે ફરજિયાત નથી."
    },
    {
      q: "સરકારી યોજનાઓ માટે પાત્રતા કઈ રીતે નક્કી થાય છે?",
      a: "તમારા પરિવારના અધિકૃત રેકોર્ડ (જેવા કે વાર્ષિક આવક, રહેઠાણનો પ્રકાર, સભ્યોની ઉંમર વગેરે) ના આધારે સિસ્ટમ આપમેળે યોજનાઓ માટેની પાત્રતાનું મૂલ્યાંકન કરે છે અને અરજી કરવાની મંજૂરી આપે છે."
    },
    {
      q: "અરજી કર્યા પછી તેની સ્થિતિ કઈ રીતે જાણી શકાય?",
      a: "નાગરિક પોર્ટલમાં 'મારી અરજીઓ' વિભાગમાં જઈને અરજીની પ્રગતિ (સબમિટ, દસ્તાવેજ ચકાસણી, અધિકારી સમીક્ષા, મંજૂર/નામંજૂર) લાઈવ ટાઈમલાઈન દ્વારા પારદર્શક રીતે ટ્રેક કરી શકાય છે."
    }
  ];

  return (
    <div className="app">
      <Header />
      <main>
        <section className="hero">
          <div className="container heroGrid">
            <div>
              <div className="eyebrow">ગુજરાત સરકારની ડિજિટલ સેવા</div>
              <h1>પરિવાર ઓળખ સંખ્યા</h1>
              <p className="lead">
                ગુજરાતના પરિવારો માટે એકીકૃત ડિજિટલ ઓળખ અને સરકારી સેવાઓ સુધી સરળ પહોંચ.
              </p>
              <div className="actions">
                <Link className="primary" to="/login">
                  પ્રવેશ કરો <ArrowRight size={17} />
                </Link>
                <Link className="secondary" to="/register">
                  નવો પરિવાર નોંધણી કરો
                </Link>
              </div>
            </div>
            <div className="servicePanel">
              <div className="panelHead">
                <ShieldCheck size={19} /> વિશ્વસનીય પરિવાર રેકોર્ડ
              </div>
              <div className="familyid">GJ-2026-XXXXX</div>
              <div className="smallmuted">નોંધણી પછી મળતી અનન્ય પરિવાર ઓળખ સંખ્યા</div>
              <div className="panelrow">
                <span>સરળ પ્રક્રિયા</span>
                <strong>4 પગલાં</strong>
              </div>
              <div className="panelrow">
                <span>સરકારી યોજનાઓ</span>
                <strong>એક જ સ્થળે</strong>
              </div>
              <div className="panelrow">
                <span>અધિકારી ચકાસણી</span>
                <strong>ડિજિટલ મંજૂરી</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: About Parivar ID */}
        <section className="section" id="family">
          <div className="container">
            <div className="sectiontitle">
              <div>
                <div className="eyebrow">પરિવાર ઓળખ સંખ્યા શું છે?</div>
                <h2>પરિવાર અને સેવાઓ વચ્ચેનું એકીકૃત જોડાણ</h2>
                <p>
                  પરિવાર ઓળખ સંખ્યા પરિવાર સ્તરની ડિજિટલ ઓળખ છે, જે પરિવારની માહિતી, પાત્ર સરકારી
                  યોજનાઓ અને અરજીની સ્થિતિને એક જ સુરક્ષિત રેકોર્ડ સાથે જોડે છે.
                </p>
              </div>
            </div>
            <div className="featuregrid">
              <Feature
                icon={<Users />}
                title="પરિવારની વિગતો"
                text="પરિવારના સભ્યો, મુખ્ય સભ્ય અને રહેઠાણની વિગતો એક જ રેકોર્ડમાં."
              />
              <Feature
                icon={<ShieldCheck />}
                title="યોજના પાત્રતા"
                text="તમારી માહિતી અને માપદંડ અનુસાર પાત્ર સહાય આપોઆપ જાણો."
              />
              <Feature
                icon={<FileText />}
                title="અરજી અને નિર્ણય ટ્રેકિંગ"
                text="અરજી સબમિટ થયા પછી અધિકારીના નિર્ણય સુધી લાઈવ ટ્રેક કરો."
              />
            </div>
          </div>
        </section>

        {/* Section 2: How it works / Services */}
        <section className="infoBand" id="howitworks">
          <div className="container process">
            <div>
              <div className="eyebrow">તે કેવી રીતે કાર્ય કરે છે?</div>
              <h2>ચાર પગલાંમાં સંપૂર્ણ સેવા</h2>
              <p style={{ marginTop: "12px", color: "var(--muted)", fontSize: "14px" }}>
                સરકારી કચેરીઓના ધક્કા ખાધા વગર પારદર્શક ડિજિટલ પ્રક્રિયા.
              </p>
            </div>
            <div className="steps">
              <Step
                n="01"
                title="પરિવારની નોંધણી"
                desc="પરિવારની મૂળભૂત વિગતો અને સભ્યોની માહિતી સાથે Family ID મેળવો."
              />
              <Step
                n="02"
                title="પરિવારની ચકાસણી"
                desc="સંબંધિત સરકારી અધિકારી દ્વારા પરિવાર રેકોર્ડની ઓનલાઇન ચકાસણી."
              />
              <Step
                n="03"
                title="યોજનાઓ માટે પાત્રતા"
                desc="તમારા પરિવારના આધારે ઉપલબ્ધ સરકારી યોજનાઓ માટે યોગ્યતા જુઓ."
              />
              <Step
                n="04"
                title="અરજી અને લાભની સ્થિતિ"
                desc="સરળ અરજી પ્રક્રિયા, દસ્તાવેજ સમીક્ષા અને સીધો નિર્ણય ટ્રેકિંગ."
              />
            </div>
          </div>
        </section>

        {/* Section 3: Available Schemes */}
        <section className="section" id="schemes">
          <div className="container">
            <div className="sectiontitle">
              <div>
                <div className="eyebrow">ઉપલબ્ધ સરકારી યોજનાઓ</div>
                <h2>તમારા પરિવાર માટેની સંભવિત સહાય</h2>
                <p>પાત્રતા ધરાવતા પરિવારોને સીધો લાભ આપવા માટે રચાયેલ કલ્યાણકારી યોજનાઓ.</p>
              </div>
            </div>
            <div className="schemeList compactList">
              {schemes.map(s => (
                <article className="scheme" key={s.id}>
                  <h3>{s.name}</h3>
                  <p>{s.short}</p>
                  <div style={{ marginTop: "12px", fontSize: "12px", color: "var(--navy)" }}>
                    <strong>જરૂરી દસ્તાવેજો:</strong> {s.docs.join(", ")}
                  </div>
                  <div style={{ marginTop: "16px" }}>
                    <Link className="secondary smallButton" to="/login">
                      પાત્રતા જાણવા પ્રવેશ કરો
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: FAQ */}
        <section className="section" id="faq" style={{ background: "#f8fafc", borderTop: "1px solid var(--line)" }}>
          <div className="container">
            <div className="sectiontitle">
              <div>
                <div className="eyebrow">વારંવાર પૂછાતા પ્રશ્નો</div>
                <h2>સામાન્ય પ્રશ્નોત્તરી (FAQ)</h2>
                <p>પરિવાર ઓળખ સંખ્યા અને સરકારી યોજનાઓ વિશે સામાન્ય માહિતી.</p>
              </div>
            </div>
            <div className="faqGrid">
              {faqs.map((item, idx) => (
                <div className="faqCard" key={idx}>
                  <div className="faqQuestion" onClick={() => setFaqOpen(faqOpen === idx ? -1 : idx)}>
                    <span>{item.q}</span>
                    {faqOpen === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                  {faqOpen === idx && <div className="faqAnswer">{item.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Help & Contact */}
        <section className="section" id="contact">
          <div className="container">
            <div className="sectiontitle">
              <div>
                <div className="eyebrow">મદદ અને સંપર્ક</div>
                <h2>સહાયતા કેન્દ્ર અને હેલ્પલાઇન</h2>
                <p>કોઈપણ પ્રશ્ન અથવા તકનીકી સહાય માટે અમારો સંપર્ક કરો.</p>
              </div>
            </div>
            <div className="contactGrid">
              <div className="contactCard">
                <div className="featureIcon">
                  <ShieldCheck size={28} />
                </div>
                <h3>ટોલ ફ્રી હેલ્પલાઇન</h3>
                <p>સોમવારથી શનિવાર (સવારે 9 થી સાંજે 6)</p>
                <strong>1800-233-5500</strong>
              </div>
              <div className="contactCard">
                <div className="featureIcon">
                  <FileText size={28} />
                </div>
                <h3>ઈમેલ સહાયતા</h3>
                <p>24 થી 48 કલાકમાં સત્તાવાર જવાબ</p>
                <strong>parivarid-support@gujarat.gov.in</strong>
              </div>
              <div className="contactCard">
                <div className="featureIcon">
                  <Home size={28} />
                </div>
                <h3>સ્થાનિક સેવા કેન્દ્ર</h3>
                <p>નજીકના તાલુકા સેવા સદન અથવા ઈ-ગ્રામ પંચાયત કેન્દ્રની મુલાકાત લો.</p>
                <strong>જન સેવા કેન્દ્ર (JSK)</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="featureIcon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function Step({ n, title, desc }) {
  return (
    <div className="step">
      <b>{n}</b>
      <div>
        <strong>{title}</strong>
        {desc && <p>{desc}</p>}
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label>
      {label}
      <input {...props} />
    </label>
  );
}

function Login() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("citizen");
  const [form, setForm] = useState({ identifier: "9876543210", password: "Citizen@123" });
  const [error, setError] = useState("");

  const switchTab = role => {
    setTab(role);
    setError("");
    if (role === "citizen") {
      setForm({ identifier: "9876543210", password: "Citizen@123" });
    } else {
      setForm({ identifier: "officer@gujarat.gov.in", password: "Officer@123" });
    }
  };

  const submit = event => {
    event.preventDefault();
    setError("");
    const user = loginUser(form.identifier, form.password);
    if (!user) {
      return setError(
        tab === "officer"
          ? "અધિકારી પ્રવેશ વિગતો ખોટી છે. ડેમો: officer@gujarat.gov.in / Officer@123"
          : "નાગરિક પ્રવેશ વિગતો ખોટી છે. ડેમો: 9876543210 / Citizen@123"
      );
    }
    if (tab === "officer" && user.role !== "officer") {
      logoutUser();
      return setError("આ ખાતું અધિકારી ખાતું નથી.");
    }
    navigate(user.role === "officer" ? "/officer" : "/citizen");
  };

  return (
    <div className="app">
      <Header />
      <main className="authPage container">
        <div className="authGrid">
          <section className="authCard">
            <div className="eyebrow">સુરક્ષિત ઓળખ પોર્ટલ</div>
            <h1>{tab === "officer" ? "અધિકારી પ્રવેશ" : "નાગરિક પ્રવેશ"}</h1>
            <p className="muted">
              {tab === "officer"
                ? "ચકાસણી અને અરજી વ્યવસ્થાપન માટે સરકારી અધિકારી પ્રવેશ."
                : "તમારા પરિવારની ઓળખ અને સરકારી સેવાઓ માટે પ્રવેશ કરો."}
            </p>

            <div className="filterbar" style={{ marginTop: "14px", marginBottom: "18px" }}>
              <button
                type="button"
                className={tab === "citizen" ? "active" : ""}
                onClick={() => switchTab("citizen")}
              >
                નાગરિક પ્રવેશ
              </button>
              <button
                type="button"
                className={tab === "officer" ? "active" : ""}
                onClick={() => switchTab("officer")}
              >
                સરકારી અધિકારી પ્રવેશ
              </button>
            </div>

            <form onSubmit={submit}>
              <label>
                {tab === "officer" ? "અધિકારી ઈમેલ" : "મોબાઇલ નંબર / ઈમેલ"}
                <input
                  required
                  value={form.identifier}
                  onChange={e => setForm({ ...form, identifier: e.target.value })}
                />
              </label>
              <label>
                પાસવર્ડ
                <input
                  required
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
              </label>
              {error && <div className="error">{error}</div>}
              <button className="primary" type="submit">
                {tab === "officer" ? "અધિકારી પ્રવેશ કરો" : "પ્રવેશ કરો"} <ArrowRight size={16} />
              </button>
            </form>

            <div className="authLinks">
              <span>સુરક્ષિત સત્તાવાર પોર્ટલ</span>
              {tab === "citizen" && <Link to="/register">નવું ખાતું બનાવો (નોંધણી કરો)</Link>}
            </div>
          </section>

          <section className="officerLogin">
            <div className="featureIcon">
              <ShieldCheck size={28} />
            </div>
            <h2>હેકાથોન ડેમો પ્રવેશ</h2>
            <p>પૂર્વનિર્ધારિત ઓળખ ખાતા દ્વારા તુરંત કાર્યપદ્ધતિ ચકાસો:</p>
            <div style={{ margin: "14px 0", display: "grid", gap: "10px" }}>
              <button
                type="button"
                className="secondary"
                onClick={() => switchTab("citizen")}
              >
                ડેમો નાગરિક: 9876543210
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => switchTab("officer")}
              >
                ડેમો અધિકારી: officer@gujarat.gov.in
              </button>
            </div>
            <small>
              નાગરિક પાસવર્ડ: <strong>Citizen@123</strong>
              <br />
              અધિકારી પાસવર્ડ: <strong>Officer@123</strong>
            </small>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Register() {
  const navigate = useNavigate();
  const [done, setDone] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirm: "",
    head: "",
    income: "",
    housing: "કાચું રહેઠાણ",
    district: "ગાંધીનગર",
    taluka: "ગાંધીનગર",
    village: "સેક્ટર 21",
    address: "",
    members: ""
  });

  const change = event => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = event => {
    event.preventDefault();
    if (form.password !== form.confirm) return setError("પાસવર્ડ એકસરખા હોવા જોઈએ.");
    try {
      const res = registerUser(form);
      setDone(res.familyId);
    } catch (e) {
      setError(e.message);
    }
  };

  if (done) {
    return (
      <div className="app">
        <Header />
        <main className="authPage container">
          <section className="successCard">
            <CheckCircle2 size={46} />
            <div className="eyebrow">નોંધણી સફળ</div>
            <h1>તમારો પરિવાર રેકોર્ડ તૈયાર છે</h1>
            <p>તમારી પરિવાર ઓળખ સંખ્યા (Family ID):</p>
            <strong className="generatedId">{done}</strong>
            <p className="muted" style={{ marginBottom: "24px" }}>
              આ Family ID દ્વારા આપ સરકારી યોજનાઓ જોઈ શકશો અને અરજી કરી શકશો.
            </p>
            <div className="actions">
              <button className="primary" onClick={() => navigate("/citizen")}>
                પરિવાર ડેશબોર્ડ પર જાઓ <ArrowRight size={16} />
              </button>
              <Link className="secondary" to="/">
                હોમ પર પાછા જાઓ
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <main className="authPage container">
        <section className="formCard">
          <div className="eyebrow">નાગરિક નોંધણી</div>
          <h1>નવો પરિવાર નોંધણી કરો</h1>
          <p className="muted">આધાર નંબર જેવી સંવેદનશીલ માહિતી જરૂરી નથી. તમામ વિગતો ગોપનીય રહેશે.</p>
          <form onSubmit={submit}>
            <div className="formSection">
              <h2>ખાતાની માહિતી</h2>
              <div className="formGrid">
                <Field label="પૂરું નામ" name="name" value={form.name} onChange={change} required />
                <Field
                  label="મોબાઇલ નંબર"
                  name="mobile"
                  value={form.mobile}
                  onChange={change}
                  required
                />
                <Field
                  label="ઈમેલ (વૈકલ્પિક)"
                  name="email"
                  value={form.email}
                  onChange={change}
                />
                <Field
                  label="પાસવર્ડ"
                  name="password"
                  value={form.password}
                  onChange={change}
                  type="password"
                  required
                />
                <Field
                  label="પાસવર્ડ પુષ્ટિ"
                  name="confirm"
                  value={form.confirm}
                  onChange={change}
                  type="password"
                  required
                />
              </div>
            </div>

            <div className="formSection">
              <h2>પરિવારની માહિતી</h2>
              <div className="formGrid">
                <Field
                  label="પરિવારના મુખ્ય સભ્ય"
                  name="head"
                  value={form.head || form.name}
                  onChange={change}
                  required
                />
                <Field
                  label="અંદાજિત વાર્ષિક આવક (₹)"
                  name="income"
                  value={form.income}
                  onChange={change}
                  type="number"
                  placeholder="દા.ત. 180000"
                  required
                />
                <Field
                  label="જિલ્લો"
                  name="district"
                  value={form.district}
                  onChange={change}
                  required
                />
                <Field
                  label="તાલુકો"
                  name="taluka"
                  value={form.taluka}
                  onChange={change}
                  required
                />
                <Field
                  label="ગામ / શહેર"
                  name="village"
                  value={form.village}
                  onChange={change}
                  required
                />
                <label>
                  રહેઠાણનો પ્રકાર
                  <select name="housing" value={form.housing} onChange={change}>
                    <option value="કાચું રહેઠાણ">કાચું રહેઠાણ</option>
                    <option value="પાકું રહેઠાણ">પાકું રહેઠાણ</option>
                  </select>
                </label>
                <Field
                  label="સરનામું"
                  name="address"
                  value={form.address}
                  onChange={change}
                  required
                />
                <Field
                  label="અન્ય સભ્યોના નામ (અલ્પવિરામથી)"
                  name="members"
                  value={form.members}
                  onChange={change}
                  placeholder="દા.ત. મીનાબેન, રાહુલ, રિયા"
                />
              </div>
            </div>
            {error && <div className="error">{error}</div>}
            <button className="primary" type="submit">
              પરિવાર નોંધણી પૂર્ણ કરો <ArrowRight size={16} />
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Guard({ role, children }) {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  return user.role === role ? (
    children
  ) : (
    <Navigate to={user.role === "officer" ? "/officer" : "/citizen"} replace />
  );
}

function Portal({ officer = false }) {
  return (
    <div className={`portal ${officer ? "officerPortal" : "citizenPortal"}`}>
      <Header officer={officer} />
      <div className="portalBody">
        <aside className="sidebar">
          <div className="sideLabel">{officer ? "અધિકારી પોર્ટલ" : "નાગરિક પોર્ટલ"}</div>
          {(officer
            ? [
                ["ડેશબોર્ડ", "/officer"],
                ["પરિવાર શોધ", "/officer/families"],
                ["ચકાસણી", "/officer/verification"],
                ["અરજીઓ", "/officer/applications"],
                ["પાત્ર પરિવાર", "/officer/eligible-families"],
                ["પ્રોફાઇલ", "/officer/profile"]
              ]
            : [
                ["ડેશબોર્ડ", "/citizen"],
                ["મારું પરિવાર", "/citizen/family"],
                ["પરિવારના સભ્યો", "/citizen/members"],
                ["સરકારી યોજનાઓ", "/citizen/schemes"],
                ["મારી અરજીઓ", "/citizen/applications"],
                ["દસ્તાવેજો / ચકાસણી", "/citizen/verification"],
                ["પ્રોફાઇલ", "/citizen/profile"]
              ]
          ).map(([label, path]) => (
            <Link key={path} to={path}>
              <Home size={16} /> {label}
            </Link>
          ))}
          <button
            onClick={() => {
              logoutUser();
              window.location.href = "/";
            }}
          >
            <LogOut size={16} /> બહાર નીકળો
          </button>
        </aside>
        <main className="portalMain">{officer ? <OfficerRoutes /> : <CitizenRoutes />}</main>
      </div>
    </div>
  );
}

function CitizenRoutes() {
  return (
    <Routes>
      <Route index element={<CitizenDashboard />} />
      <Route path="family" element={<FamilyPage />} />
      <Route path="members" element={<FamilyPage membersOnly />} />
      <Route path="schemes" element={<SchemesPage />} />
      <Route path="applications" element={<ApplicationsPage />} />
      <Route path="verification" element={<CitizenVerificationPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Routes>
  );
}

function OfficerRoutes() {
  return (
    <Routes>
      <Route index element={<OfficerDashboard />} />
      <Route path="families" element={<OfficerFamilies />} />
      <Route path="families/:familyId" element={<OfficerFamily />} />
      <Route path="verification" element={<OfficerFamilies pendingOnly />} />
      <Route path="applications" element={<OfficerApplications />} />
      <Route path="eligible-families" element={<EligibleFamilies />} />
      <Route path="profile" element={<ProfilePage />} />
    </Routes>
  );
}

function Page({ title, intro, children }) {
  return (
    <>
      <div className="pagehead">
        <div>
          <div className="eyebrow">ગુજરાત સરકાર · પરિવાર ઓળખ સેવા</div>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </div>
      {children}
    </>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function CitizenDashboard() {
  const family = getFamilyById(getCurrentUser().familyId);
  if (!family) return <div className="empty">પરિવાર રેકોર્ડ ઉપલબ્ધ નથી.</div>;
  const apps = getApplications().filter(a => a.familyId === family.id);

  return (
    <Page
      title="મારું ડેશબોર્ડ"
      intro="તમારા પરિવારની ઓળખ, યોજનાઓ અને અરજીઓની સંક્ષિપ્ત માહિતી."
    >
      <div className="identitybox">
        <Info label="પરિવાર ઓળખ સંખ્યા" value={family.id} />
        <Info label="ચકાસણી" value={<Status value={family.verified ? "verified" : "pending"} />} />
        <Info label="સભ્યોની સંખ્યા" value={family.members.length} />
        <Info label="મુખ્ય સભ્ય" value={family.head} />
      </div>
      <div className="portalGrid">
        <section className="panel">
          <h2>પરિવારની વિગતો</h2>
          <p>{family.address}</p>
          <p>
            જિલ્લો: <strong>{family.district}</strong>
          </p>
          <p>
            વાર્ષિક આવક: <strong>₹ {money(family.income)}</strong>
          </p>
          <p>
            રહેઠાણ: <strong>{family.housing}</strong>
          </p>
          <div style={{ marginTop: "16px" }}>
            <Link className="secondary smallButton" to="/citizen/family">
              સંપૂર્ણ વિગતો જુઓ
            </Link>
          </div>
        </section>
        <section className="panel">
          <h2>મારી અરજીઓ</h2>
          {apps.length ? (
            apps.map(a => (
              <div className="workrow" key={a.id}>
                <div>
                  <strong>{a.id}</strong>
                  <span>{schemes.find(s => s.id === a.schemeId)?.name || a.schemeId}</span>
                </div>
                <Status value={a.status} />
              </div>
            ))
          ) : (
            <p className="muted">હાલ કોઈ અરજી કરેલ નથી.</p>
          )}
          <div style={{ marginTop: "16px" }}>
            <Link className="secondary smallButton" to="/citizen/schemes">
              યોજનાઓ જુઓ અને અરજી કરો
            </Link>
          </div>
        </section>
      </div>
    </Page>
  );
}

function FamilyPage({ membersOnly = false }) {
  const [redrawKey, setRedraw] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [memberForm, setMemberForm] = useState({
    name: "",
    relation: "પુત્ર",
    age: "",
    gender: "પુરુષ"
  });
  const [error, setError] = useState("");

  const family = getFamilyById(getCurrentUser().familyId);
  if (!family) return <div className="empty">પરિવાર રેકોર્ડ મળ્યો નથી.</div>;

  const handleAddMember = e => {
    e.preventDefault();
    setError("");
    if (!memberForm.name.trim()) return setError("કૃપા કરીને સભ્યનું નામ દાખલ કરો.");
    if (!memberForm.age || Number(memberForm.age) <= 0) return setError("માન્ય ઉંમર દાખલ કરો.");
    try {
      addFamilyMember(family.id, memberForm);
      setShowModal(false);
      setMemberForm({ name: "", relation: "પુત્ર", age: "", gender: "પુરુષ" });
      setRedraw(v => v + 1);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Page
      title={membersOnly ? "પરિવારના સભ્યો" : "મારું પરિવાર"}
      intro="પરિવારની વિગતો અને સભ્યોની ચકાસણી સ્થિતિ."
    >
      {!membersOnly && (
        <div className="identitybox">
          <Info label="Family ID" value={family.id} />
          <Info label="મુખ્ય સભ્ય" value={family.head} />
          <Info label="જિલ્લો" value={family.district} />
          <Info label="આવક" value={`₹ ${money(family.income)}`} />
          <Info label="સરનામું" value={family.address} />
          <Info label="રહેઠાણ" value={family.housing} />
        </div>
      )}

      <section className="sectionInner">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h2>પરિવારના સભ્યો ({family.members.length})</h2>
          <button className="primary smallButton" onClick={() => setShowModal(true)}>
            <UserPlus size={15} /> નવો સભ્ય ઉમેરો
          </button>
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>નામ</th>
                <th>સંબંધ</th>
                <th>ઉંમર</th>
                <th>લિંગ</th>
                <th>ચકાસણી સ્થિતિ</th>
              </tr>
            </thead>
            <tbody>
              {family.members.map(m => (
                <tr key={m.id}>
                  <td>
                    <strong>{m.name}</strong>
                  </td>
                  <td>{m.relation}</td>
                  <td>{m.age} વર્ષ</td>
                  <td>{m.gender || "-"}</td>
                  <td>
                    <Status value={m.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Member Modal */}
      {showModal && (
        <div className="modalOverlay">
          <div className="modalCard">
            <div className="modalHead">
              <h2>પરિવારમાં નવો સભ્ય ઉમેરો</h2>
              <button className="modalClose" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddMember}>
              <div className="modalBody">
                <label>
                  સભ્યનું પૂરું નામ
                  <input
                    required
                    value={memberForm.name}
                    onChange={e => setMemberForm({ ...memberForm, name: e.target.value })}
                    placeholder="દા.ત. આનંદ પટેલ"
                  />
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <label>
                    સંબંધ
                    <select
                      value={memberForm.relation}
                      onChange={e => setMemberForm({ ...memberForm, relation: e.target.value })}
                    >
                      <option value="પત્ની">પત્ની</option>
                      <option value="પુત્ર">પુત્ર</option>
                      <option value="પુત્રી">પુત્રી</option>
                      <option value="પિતા">પિતા</option>
                      <option value="માતા">માતા</option>
                      <option value="ભાઈ">ભાઈ</option>
                      <option value="બહેન">બહેન</option>
                      <option value="અન્ય સભ્ય">અન્ય સભ્ય</option>
                    </select>
                  </label>
                  <label>
                    ઉંમર (વર્ષ)
                    <input
                      required
                      type="number"
                      value={memberForm.age}
                      onChange={e => setMemberForm({ ...memberForm, age: e.target.value })}
                      placeholder="દા.ત. 19"
                    />
                  </label>
                </div>
                <label>
                  લિંગ
                  <select
                    value={memberForm.gender}
                    onChange={e => setMemberForm({ ...memberForm, gender: e.target.value })}
                  >
                    <option value="પુરુષ">પુરુષ</option>
                    <option value="સ્ત્રી">સ્ત્રી</option>
                    <option value="અન્ય">અન્ય</option>
                  </select>
                </label>
                {error && <div className="error">{error}</div>}
              </div>
              <div className="modalFoot">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setShowModal(false)}
                >
                  રદ કરો
                </button>
                <button type="submit" className="primary">
                  સભ્ય સેવ કરો
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Page>
  );
}

function CitizenVerificationPage() {
  const family = getFamilyById(getCurrentUser().familyId);
  if (!family) return <div className="empty">પરિવાર રેકોર્ડ મળ્યો નથી.</div>;

  return (
    <Page
      title="દસ્તાવેજો અને ચકાસણી સ્થિતિ"
      intro="તમારા પરિવાર અને સભ્યોની સત્તાવાર વહીવટી ચકાસણી સ્થિતિ."
    >
      <div className="identitybox" style={{ marginBottom: "24px" }}>
        <Info label="Family ID" value={family.id} />
        <Info label="સમગ્ર પરિવાર ચકાસણી" value={<Status value={family.verified ? "verified" : "pending"} />} />
        <Info label="જિલ્લો" value={family.district} />
        <Info label="મુખ્ય સભ્ય" value={family.head} />
      </div>

      <div className="portalGrid">
        <section className="panel">
          <h2>ચકાસણી વિગતો</h2>
          <div style={{ display: "grid", gap: "14px", marginTop: "16px" }}>
            <div className="docUploadItem">
              <div>
                <strong>રહેઠાણ પુરાવો</strong>
                <p style={{ margin: "2px 0", fontSize: "12px", color: "var(--muted)" }}>
                  {family.address} ({family.housing})
                </p>
              </div>
              <Status value={family.verified ? "verified" : "pending"} />
            </div>

            <div className="docUploadItem">
              <div>
                <strong>આવક પ્રમાણપત્ર રેકોર્ડ</strong>
                <p style={{ margin: "2px 0", fontSize: "12px", color: "var(--muted)" }}>
                  વાર્ષિક આવક ₹ {money(family.income)}
                </p>
              </div>
              <Status value={family.verified ? "verified" : "pending"} />
            </div>

            <div className="docUploadItem">
              <div>
                <strong>પરિવાર સભ્ય ઓળખ</strong>
                <p style={{ margin: "2px 0", fontSize: "12px", color: "var(--muted)" }}>
                  કુલ {family.members.length} સભ્યો નોંધાયેલ
                </p>
              </div>
              <Status value={family.verified ? "verified" : "pending"} />
            </div>
          </div>
        </section>

        <section className="panel">
          <h2>અધિકારી પ્રક્રિયા નોંધ</h2>
          <p style={{ fontSize: "14px", color: "#475466", lineHeight: "1.6" }}>
            {family.verified
              ? "તમારા પરિવારના તમામ રેકોર્ડ સંબંધિત તાલુકા/જિલ્લા વહીવટી તંત્ર દ્વારા ચકાસાયેલ છે. આપ તમામ પાત્ર સરકારી યોજનાઓ માટે સીધા અરજી કરી શકો છો."
              : "તમારો પરિવાર રેકોર્ડ હાલ સંબંધિત તાલુકા અધિકારી દ્વારા ચકાસણી હેઠળ છે. ચકાસણી પૂર્ણ થતા આપને પોર્ટલ પર અપડેટ જોવા મળશે."}
          </p>
          <div className="notice" style={{ marginTop: "20px" }}>
            <ShieldCheck size={20} />
            <p>
              ચકાસણીમાં કોઈ ભૂલ જણાય તો નજીકના તાલુકા સેવા સદન ખાતે સંપર્ક કરી સુધારો કરાવી શકો છો.
            </p>
          </div>
        </section>
      </div>
    </Page>
  );
}

function SchemesPage() {
  const [, redraw] = useState(0);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [applicantMember, setApplicantMember] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [declaration, setDeclaration] = useState(false);
  const [error, setError] = useState("");

  const family = getFamilyById(getCurrentUser().familyId);
  const apps = getApplications();

  const openApplyModal = scheme => {
    setSelectedScheme(scheme);
    setApplicantMember(family.head);
    // Initialize required docs
    const initDocs = {};
    scheme.docs.forEach(doc => {
      initDocs[doc] = { status: "ચકાસાયેલ", fileName: `${doc.replace(/\s+/g, "_")}.pdf` };
    });
    setUploadedDocs(initDocs);
    setDeclaration(false);
    setError("");
  };

  const handleApplySubmit = e => {
    e.preventDefault();
    if (!declaration) {
      return setError("કૃપા કરીને નિયમોની ખાતરી આપતું ચેકબોક્સ પસંદ કરો.");
    }

    const docsArray = Object.entries(uploadedDocs).map(([name, val]) => ({
      name,
      fileName: val.fileName,
      status: val.status
    }));

    createApplication({
      familyId: family.id,
      schemeId: selectedScheme.id,
      applicant: applicantMember || family.head,
      documents: docsArray,
      declaration: true
    });

    setSelectedScheme(null);
    redraw(v => v + 1);
  };

  const toggleDoc = docName => {
    setUploadedDocs(prev => ({
      ...prev,
      [docName]: prev[docName]
        ? { ...prev[docName], status: prev[docName].status === "ચકાસાયેલ" ? "બાકી" : "ચકાસાયેલ" }
        : { status: "ચકાસાયેલ", fileName: `${docName}.pdf` }
    }));
  };

  return (
    <Page
      title="સરકારી યોજનાઓ"
      intro="પાત્રતા કારણો, જરૂરી દસ્તાવેજો અને અરજીની સ્થિતિ જુઓ."
    >
      <div className="schemeList">
        {schemes.map(s => {
          const eligible = s.eligible(family);
          const app = apps.find(a => a.familyId === family.id && a.schemeId === s.id);
          return (
            <article className="scheme" key={s.id}>
              <div className="schemeTop">
                <div>
                  <h2>{s.name}</h2>
                  <p>{s.short}</p>
                </div>
                <Status value={app?.status || (eligible ? "verified" : "rejected")} />
              </div>
              <div className="reason">
                <strong>પાત્રતા કારણો</strong>
                <p>{eligible ? `✓ ${s.reason}` : `✕ ${s.reason}`}</p>
              </div>
              <div className="docline">
                <FileText size={16} /> જરૂરી દસ્તાવેજો: {s.docs.join(" • ")}
              </div>
              <div className="schemeAction">
                {app ? (
                  <Link className="secondary" to="/citizen/applications">
                    અરજીની સ્થિતિ જુઓ ({statusNames[app.status] || app.status})
                  </Link>
                ) : eligible ? (
                  <button className="primary" onClick={() => openApplyModal(s)}>
                    અરજી કરો <ArrowRight size={16} />
                  </button>
                ) : (
                  <button className="secondary" disabled>
                    હાલ પાત્ર નથી
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Application Modal */}
      {selectedScheme && (
        <div className="modalOverlay">
          <div className="modalCard">
            <div className="modalHead">
              <h2>યોજના અરજી પત્રક — {selectedScheme.name}</h2>
              <button className="modalClose" onClick={() => setSelectedScheme(null)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleApplySubmit}>
              <div className="modalBody">
                <div className="notice" style={{ margin: "0 0 14px 0" }}>
                  <ShieldCheck size={20} />
                  <div>
                    <strong>પાત્રતા ચકાસણી પૂર્ણ થયેલ છે</strong>
                    <p>{selectedScheme.reason}</p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <Info label="Family ID" value={family.id} />
                  <label>
                    અરજદાર સભ્ય પસંદ કરો
                    <select
                      value={applicantMember}
                      onChange={e => setApplicantMember(e.target.value)}
                    >
                      {family.members.map(m => (
                        <option key={m.id} value={m.name}>
                          {m.name} ({m.relation})
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div>
                  <label style={{ marginBottom: "8px" }}>જરૂરી દસ્તાવેજો (Family ID દ્વારા ચકાસાયેલ)</label>
                  <div className="docUploadList">
                    {selectedScheme.docs.map(doc => {
                      const docInfo = uploadedDocs[doc];
                      const isAttached = docInfo?.status === "ચકાસાયેલ";
                      return (
                        <div className="docUploadItem" key={doc}>
                          <div>
                            <strong>{doc}</strong>
                            <p style={{ margin: "2px 0", fontSize: "11px", color: "var(--muted)" }}>
                              {docInfo?.fileName || `${doc}.pdf`}
                            </p>
                          </div>
                          <button
                            type="button"
                            className={isAttached ? "docUploaded" : "docUploadBtn"}
                            onClick={() => toggleDoc(doc)}
                          >
                            {isAttached ? (
                              <>
                                <FileCheck size={16} /> ચકાસાયેલ
                              </>
                            ) : (
                              <>
                                <Upload size={14} /> અપલોડ કરો
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="declarationBox">
                  <input
                    type="checkbox"
                    id="decl"
                    checked={declaration}
                    onChange={e => setDeclaration(e.target.checked)}
                  />
                  <label htmlFor="decl" style={{ cursor: "pointer", fontWeight: "normal" }}>
                    હું ખાતરી આપું છું કે ઉપર આપેલી તમામ માહિતી સાચી છે અને સરકારી નિયમો અનુસાર મારો
                    પરિવાર આ યોજના માટે પાત્રતા ધરાવે છે.
                  </label>
                </div>

                {error && <div className="error">{error}</div>}
              </div>
              <div className="modalFoot">
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setSelectedScheme(null)}
                >
                  રદ કરો
                </button>
                <button type="submit" className="primary">
                  અરજી સબમિટ કરો <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Page>
  );
}

function ApplicationsPage() {
  const family = getFamilyById(getCurrentUser().familyId);
  if (!family) return <div className="empty">પરિવાર રેકોર્ડ મળ્યો નથી.</div>;
  const apps = getApplications().filter(a => a.familyId === family.id);

  return (
    <Page title="મારી અરજીઓ" intro="અરજીઓની સ્થિતિ, સમયરેખા અને અધિકારી સમીક્ષા નોંધ.">
      {apps.length ? (
        apps.map(a => {
          const schemeName = schemes.find(s => s.id === a.schemeId)?.name || a.schemeId;
          const isSubmitted = a.status === "submitted";
          const isUnderReview = a.status === "under_review";
          const isApproved = a.status === "approved";
          const isRejected = a.status === "rejected";

          return (
            <article className="application" key={a.id}>
              <div className="apphead">
                <div>
                  <span className="muted">{a.id}</span>
                  <h2>{schemeName}</h2>
                </div>
                <Status value={a.status} />
              </div>

              <div className="appmeta">
                <span>
                  Family ID: <strong>{a.familyId}</strong>
                </span>
                <span>
                  અરજદાર: <strong>{a.applicant}</strong>
                </span>
                <span>
                  સબમિટ તારીખ: <strong>{a.submitted}</strong>
                </span>
                <span>
                  છેલ્લું અપડેટ: <strong>{a.updated || a.submitted}</strong>
                </span>
              </div>

              {/* 4-Step Lifecycle Timeline */}
              <div className="timeline four-steps">
                <div className="done">
                  <i>✓</i>
                  <span>અરજી સબમિટ</span>
                </div>
                <div className={!isSubmitted ? "done" : "active"}>
                  <i>{isSubmitted ? "2" : "✓"}</i>
                  <span>દસ્તાવેજ ચકાસણી</span>
                </div>
                <div className={isApproved || isRejected ? "done" : isUnderReview ? "active" : ""}>
                  <i>{isApproved || isRejected ? "✓" : "3"}</i>
                  <span>અધિકારી સમીક્ષા</span>
                </div>
                <div className={isApproved || isRejected ? "done" : ""}>
                  <i>{isApproved ? "✓" : isRejected ? "✕" : "4"}</i>
                  <span>{isRejected ? "નામંજૂર" : "મંજૂર"}</span>
                </div>
              </div>

              {/* Remarks / Officer Note if available */}
              {a.remarks && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "12px 16px",
                    borderRadius: "3px",
                    background: isApproved ? "var(--greenbg)" : isRejected ? "var(--redbg)" : "#f8fafc",
                    border: `1px solid ${isApproved ? "#cbe5d3" : isRejected ? "#efc9c9" : "var(--line)"}`
                  }}
                >
                  <strong style={{ fontSize: "12px", color: isApproved ? "var(--green)" : isRejected ? "var(--red)" : "var(--navy)" }}>
                    અધિકારી નોંધ:
                  </strong>
                  <p style={{ margin: "3px 0 0 0", fontSize: "13px" }}>{a.remarks}</p>
                </div>
              )}

              {/* Attached Documents Checklist */}
              {a.documents && a.documents.length > 0 && (
                <div style={{ marginTop: "18px", borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
                  <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 700 }}>
                    જોડાયેલા દસ્તાવેજો:
                  </span>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "8px" }}>
                    {a.documents.map((d, i) => (
                      <span
                        key={i}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          fontSize: "12px",
                          background: "#f3f5f8",
                          padding: "4px 8px",
                          borderRadius: "3px"
                        }}
                      >
                        <FileCheck size={14} color="var(--green)" /> {d.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* History trail */}
              {a.history && a.history.length > 0 && (
                <div style={{ marginTop: "18px", borderTop: "1px solid var(--line)", paddingTop: "14px" }}>
                  <span style={{ fontSize: "12px", color: "var(--muted)", fontWeight: 700 }}>
                    અરજી ઇતિહાસ (Audit Trail):
                  </span>
                  <div className="historyTrail">
                    {a.history.map((h, i) => (
                      <div className="historyStep" key={i}>
                        <strong>{statusNames[h.status] || h.status}</strong>
                        <span className="historyDate">{h.date}</span>
                        {h.remarks && <div className="historyRemarks">{h.remarks}</div>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })
      ) : (
        <div className="empty">હાલ કોઈ અરજી ઉપલબ્ધ નથી.</div>
      )}
    </Page>
  );
}

function ProfilePage() {
  const user = getCurrentUser();
  return (
    <Page title="પ્રોફાઇલ" intro="તમારા ખાતાની અધિકૃત માહિતી.">
      <section className="panel profile">
        <Info label="નામ" value={user.name} />
        <Info label="મોબાઇલ" value={user.mobile || "-"} />
        <Info label="ઈમેલ" value={user.email || "-"} />
        <Info label="હોદ્દો / ભૂમિકા" value={user.role === "officer" ? "સરકારી અધિકારી" : "નાગરિક"} />
        <Info label="Family ID" value={user.familyId || "અધિકારી પોર્ટલ"} />
        <Info label="ખાતા પ્રકાર" value="સત્તાવાર ડેમો સત્ર" />
      </section>
    </Page>
  );
}

function OfficerDashboard() {
  const families = getFamilies();
  const apps = getApplications();

  return (
    <Page
      title="વહીવટી ડેશબોર્ડ"
      intro="પરિવાર ઓળખ, ચકાસણી અને અરજીઓનું સંચાલન."
    >
      <div className="metricgrid">
        <Metric label="કુલ પરિવાર" value={families.length} icon={<Users />} />
        <Metric
          label="ચકાસાયેલ"
          value={families.filter(f => f.verified).length}
          icon={<ShieldCheck />}
        />
        <Metric
          label="ચકાસણી બાકી"
          value={families.filter(f => !f.verified).length}
          icon={<Search />}
        />
        <Metric label="અરજીઓ" value={apps.length} icon={<FileText />} />
        <Metric
          label="મંજૂર"
          value={apps.filter(a => a.status === "approved").length}
          icon={<CheckCircle2 />}
        />
      </div>

      <div className="portalGrid">
        <section className="panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h2>તાજેતરની અરજીઓ</h2>
            <Link className="secondary smallButton" to="/officer/applications">
              બધી અરજીઓ
            </Link>
          </div>
          {apps.slice(-5).reverse().map(a => (
            <div className="workrow" key={a.id}>
              <div>
                <Link to="/officer/applications" style={{ color: "var(--navy)", fontWeight: 700 }}>
                  {a.id}
                </Link>
                <span>Family ID: {a.familyId}</span>
              </div>
              <Status value={a.status} />
            </div>
          ))}
        </section>

        <section className="panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h2>ચકાસણી માટે બાકી પરિવાર</h2>
            <Link className="secondary smallButton" to="/officer/verification">
              ચકાસણી લિસ્ટ
            </Link>
          </div>
          {families.filter(f => !f.verified).length ? (
            families
              .filter(f => !f.verified)
              .map(f => (
                <div className="workrow" key={f.id}>
                  <div>
                    <strong>{f.id}</strong>
                    <span>{f.head} ({f.district})</span>
                  </div>
                  <Link className="tablebutton" to={`/officer/families/${f.id}`}>
                    જુઓ અને ચકાસો
                  </Link>
                </div>
              ))
          ) : (
            <p className="muted">ચકાસણી માટે કોઈ પરિવાર બાકી નથી.</p>
          )}
        </section>
      </div>
    </Page>
  );
}

function Metric({ label, value, icon }) {
  return (
    <div className="metric">
      <div className="metricIcon">{icon}</div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function OfficerFamilies({ pendingOnly = false }) {
  const [query, setQuery] = useState("");
  const list = getFamilies()
    .filter(f => !pendingOnly || !f.verified)
    .filter(
      f =>
        !query ||
        `${f.id} ${f.head} ${f.district} ${f.address}`.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <Page
      title={pendingOnly ? "ચકાસણી માટે બાકી પરિવાર" : "પરિવાર શોધ (Family 360°)"}
      intro="Family ID, મુખ્ય સભ્યનું નામ અથવા જિલ્લા દ્વારા શોધો."
    >
      <div className="searchbox">
        <Search size={18} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Family ID (GJ-2026-...) અથવા નામ અથવા જિલ્લો શોધો"
        />
      </div>
      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>Family ID</th>
              <th>મુખ્ય સભ્ય</th>
              <th>જિલ્લો</th>
              <th>સભ્યો</th>
              <th>સ્થિતિ</th>
              <th>કાર્યવાહી</th>
            </tr>
          </thead>
          <tbody>
            {list.map(f => (
              <tr key={f.id}>
                <td>
                  <strong>{f.id}</strong>
                </td>
                <td>{f.head}</td>
                <td>{f.district}</td>
                <td>{f.members.length}</td>
                <td>
                  <Status value={f.verified ? "verified" : "pending"} />
                </td>
                <td>
                  <Link className="tablebutton" to={`/officer/families/${f.id}`}>
                    જુઓ & ચકાસો
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}

function OfficerFamily() {
  const { familyId } = useParams();
  const [, redraw] = useState(0);
  const family = getFamilyById(familyId);
  const familyApps = getApplicationsByFamilyId(familyId);

  if (!family) return <div className="empty">પરિવાર રેકોર્ડ મળ્યો નથી.</div>;

  const verify = status => {
    updateFamilyVerification(family.id, status);
    redraw(value => value + 1);
  };

  return (
    <Page
      title="પરિવાર 360° સત્તાવાર રેકોર્ડ"
      intro="સંપૂર્ણ પરિવાર રેકોર્ડ, સભ્યો અને ચકાસણી કાર્યવાહી."
    >
      <div className="record">
        <div className="recordhead">
          <div>
            <span className="muted">Family ID</span>
            <h2>{family.id}</h2>
            <p>
              {family.head} · {family.address}, {family.district}
            </p>
          </div>
          <Status value={family.verified ? "verified" : "pending"} />
        </div>

        <div className="recordGrid">
          <Info label="સભ્યો" value={family.members.length} />
          <Info label="વાર્ષિક આવક" value={`₹ ${money(family.income)}`} />
          <Info label="રહેઠાણ પ્રકાર" value={family.housing} />
          <Info label="જિલ્લો" value={family.district} />
        </div>

        <h3>પરિવારના સભ્યો ({family.members.length})</h3>
        <div className="tablewrap" style={{ marginBottom: "24px" }}>
          <table>
            <thead>
              <tr>
                <th>નામ</th>
                <th>ઉંમર</th>
                <th>સંબંધ</th>
                <th>લિંગ</th>
                <th>ચકાસણી સ્થિતિ</th>
              </tr>
            </thead>
            <tbody>
              {family.members.map(m => (
                <tr key={m.id}>
                  <td>
                    <strong>{m.name}</strong>
                  </td>
                  <td>{m.age} વર્ષ</td>
                  <td>{m.relation}</td>
                  <td>{m.gender || "-"}</td>
                  <td>
                    <Status value={m.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cross-referenced Applications for this Family */}
        <h3>આ પરિવારની અરજીઓ ({familyApps.length})</h3>
        {familyApps.length ? (
          <div className="tablewrap" style={{ marginBottom: "24px" }}>
            <table>
              <thead>
                <tr>
                  <th>અરજી ID</th>
                  <th>યોજના</th>
                  <th>અરજદાર</th>
                  <th>સબમિટ તારીખ</th>
                  <th>સ્થિતિ</th>
                  <th>કાર્ય</th>
                </tr>
              </thead>
              <tbody>
                {familyApps.map(a => (
                  <tr key={a.id}>
                    <td>
                      <strong>{a.id}</strong>
                    </td>
                    <td>{schemes.find(s => s.id === a.schemeId)?.name || a.schemeId}</td>
                    <td>{a.applicant}</td>
                    <td>{a.submitted}</td>
                    <td>
                      <Status value={a.status} />
                    </td>
                    <td>
                      <Link className="tablebutton" to="/officer/applications">
                        સમીક્ષા કરો
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="muted" style={{ marginBottom: "24px" }}>
            આ પરિવાર દ્વારા હજુ સુધી કોઈ યોજના માટે અરજી કરવામાં આવી નથી.
          </p>
        )}

        <div className="recordActions">
          <button className="warningButton" onClick={() => verify("pending")}>
            વધુ માહિતી જરૂરી
          </button>
          <button className="dangerButton" onClick={() => verify("rejected")}>
            ચકાસણી નકારી કાઢો
          </button>
          <button className="successButton" onClick={() => verify("verified")}>
            ચકાસણી મંજૂર કરો
          </button>
        </div>
      </div>
    </Page>
  );
}

function OfficerApplications() {
  const [, redraw] = useState(0);
  const [filter, setFilter] = useState("all");
  const [activeApp, setActiveApp] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [actionType, setActionType] = useState(""); // "reject" | "info"

  const apps = getApplications().filter(a => filter === "all" || a.status === filter);

  const act = (id, status, note = "") => {
    updateApplicationStatus(id, status, note);
    setActiveApp(null);
    setRemarks("");
    setActionType("");
    redraw(value => value + 1);
  };

  const handleActionSubmit = e => {
    e.preventDefault();
    if (actionType === "reject") {
      act(activeApp.id, "rejected", remarks || "અરજી યોગ્ય માપદંડ પૂર્ણ ન કરતી હોવાથી નામંજૂર.");
    } else if (actionType === "info") {
      act(activeApp.id, "under_review", remarks || "વધારાના દસ્તાવેજો / સ્પષ્ટતા જરૂરી છે.");
    }
  };

  return (
    <Page
      title="અરજી વ્યવસ્થાપન"
      intro="અરજીઓની સમીક્ષા, દસ્તાવેજ ચકાસણી, મંજૂરી અને નામંજૂરીનું સંચાલન."
    >
      <div className="filterbar">
        {[
          ["all", "બધી"],
          ["submitted", "સબમિટ"],
          ["under_review", "ચકાસણી હેઠળ"],
          ["approved", "મંજૂર"],
          ["rejected", "નામંજૂર"]
        ].map(([key, label]) => (
          <button
            className={filter === key ? "active" : ""}
            key={key}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>અરજી ID</th>
              <th>Family ID</th>
              <th>અરજદાર</th>
              <th>યોજના</th>
              <th>તારીખ</th>
              <th>સ્થિતિ</th>
              <th>કાર્યવાહી</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(a => (
              <tr key={a.id}>
                <td>
                  <strong>{a.id}</strong>
                </td>
                <td>
                  <Link to={`/officer/families/${a.familyId}`} style={{ color: "var(--blue)" }}>
                    {a.familyId}
                  </Link>
                </td>
                <td>{a.applicant}</td>
                <td>{schemes.find(s => s.id === a.schemeId)?.name}</td>
                <td>{a.submitted}</td>
                <td>
                  <Status value={a.status} />
                </td>
                <td>
                  <button className="tablebutton" onClick={() => { setActiveApp(a); setRemarks(""); setActionType(""); }}>
                    સમીક્ષા કરો
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {activeApp && (
        <div className="modalOverlay">
          <div className="modalCard">
            <div className="modalHead">
              <h2>અરજી સમીક્ષા — {activeApp.id}</h2>
              <button className="modalClose" onClick={() => setActiveApp(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modalBody">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <Info label="અરજી ID" value={activeApp.id} />
                <Info
                  label="Family ID"
                  value={
                    <Link to={`/officer/families/${activeApp.familyId}`} style={{ color: "var(--blue)" }}>
                      {activeApp.familyId}
                    </Link>
                  }
                />
                <Info label="અરજદાર" value={activeApp.applicant} />
                <Info label="યોજના" value={schemes.find(s => s.id === activeApp.schemeId)?.name} />
                <Info label="સબમિટ તારીખ" value={activeApp.submitted} />
                <Info label="હાલની સ્થિતિ" value={<Status value={activeApp.status} />} />
              </div>

              {activeApp.remarks && (
                <div className="historyRemarks">
                  <strong>હાલની નોંધ:</strong> {activeApp.remarks}
                </div>
              )}

              {/* Documents Checklist */}
              <div>
                <label style={{ marginBottom: "8px" }}>જોડાયેલા દસ્તાવેજો:</label>
                <div className="docUploadList">
                  {activeApp.documents && activeApp.documents.length > 0 ? (
                    activeApp.documents.map((doc, idx) => (
                      <div className="docUploadItem" key={idx}>
                        <div>
                          <strong>{doc.name}</strong>
                          <p style={{ margin: "2px 0", fontSize: "11px", color: "var(--muted)" }}>
                            {doc.fileName || "document.pdf"}
                          </p>
                        </div>
                        <span className="docUploaded">
                          <CheckCircle2 size={16} /> માન્ય
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="muted">કોઈ દસ્તાવેજ જોડાયેલ નથી.</p>
                  )}
                </div>
              </div>

              {/* Action specific prompt if Reject or Request Info selected */}
              {actionType && (
                <form onSubmit={handleActionSubmit} style={{ marginTop: "14px" }}>
                  <label>
                    {actionType === "reject" ? "નામંજૂર કરવાનું કારણ:" : "જરૂરી માહિતી / નોંધ:"}
                    <textarea
                      required
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid var(--line)",
                        fontFamily: "inherit"
                      }}
                      value={remarks}
                      onChange={e => setRemarks(e.target.value)}
                      placeholder={
                        actionType === "reject"
                          ? "દા.ત. આવક મર્યાદા કરતાં વધુ છે."
                          : "દા.ત. નવું આવક પ્રમાણપત્ર અપલોડ કરો."
                      }
                    />
                  </label>
                  <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <button
                      type="submit"
                      className={actionType === "reject" ? "dangerButton" : "warningButton"}
                    >
                      {actionType === "reject" ? "અરજી નામંજૂર કરો" : "માહિતીની વિનંતી મોકલો"}
                    </button>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => setActionType("")}
                    >
                      પાછા જાઓ
                    </button>
                  </div>
                </form>
              )}
            </div>

            {!actionType && (
              <div className="modalFoot">
                {activeApp.status === "submitted" && (
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => act(activeApp.id, "under_review", "ચકાસણી પ્રક્રિયા શરૂ કરવામાં આવી.")}
                  >
                    ચકાસણી શરૂ કરો
                  </button>
                )}
                <button
                  type="button"
                  className="warningButton"
                  onClick={() => setActionType("info")}
                >
                  વધુ માહિતી જરૂરી
                </button>
                <button
                  type="button"
                  className="dangerButton"
                  onClick={() => setActionType("reject")}
                >
                  નામંજૂર કરો
                </button>
                <button
                  type="button"
                  className="successButton"
                  onClick={() => act(activeApp.id, "approved", "પાત્રતા માપદંડ પૂર્ણ થતા અરજી મંજૂર કરવામાં આવી છે.")}
                >
                  મંજૂર કરો
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Page>
  );
}

function EligibleFamilies() {
  const list = getFamilies().filter(
    f => schemes.some(s => s.eligible(f)) && !getApplications().some(a => a.familyId === f.id)
  );

  return (
    <Page
      title="પાત્ર પરંતુ લાભ ન મેળવનાર પરિવારો"
      intro="યોજના માટે પાત્રતા ધરાવતા પરંતુ હજુ સુધી અરજી ન કરેલા પરિવારોનું પ્રો-એક્ટિવ લિસ્ટ."
    >
      <div className="tablewrap">
        <table>
          <thead>
            <tr>
              <th>Family ID</th>
              <th>મુખ્ય સભ્ય</th>
              <th>જિલ્લો</th>
              <th>પાત્ર યોજનાઓ</th>
              <th>કાર્યવાહી</th>
            </tr>
          </thead>
          <tbody>
            {list.map(f => (
              <tr key={f.id}>
                <td>
                  <strong>{f.id}</strong>
                </td>
                <td>{f.head}</td>
                <td>{f.district}</td>
                <td>{schemes.filter(s => s.eligible(f)).map(s => s.name).join(" • ")}</td>
                <td>
                  <Link className="tablebutton" to={`/officer/families/${f.id}`}>
                    પરિવાર રેકોર્ડ જુઓ
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}

const englishCopy = {
  "ગુજરાત સરકાર": "Government of Gujarat",
  "સત્તાવાર ડિજિટલ સેવા": "Official digital service",
  "પરિવાર ઓળખ સંખ્યા": "Parivar ID",
  "પ્રવેશ કરો": "Login",
  "નોંધણી કરો": "Register",
  "હોમ": "Home",
  "કેવી રીતે કાર્ય કરે છે": "How it Works",
  "યોજનાઓ": "Schemes",
  "સેવાઓ": "Services",
  "પ્રશ્નો (FAQ)": "FAQ",
  "સંપર્ક": "Contact",
  "મદદ": "Help",
  "નાગરિક પોર્ટલ": "Citizen Portal",
  "અધિકારી પોર્ટલ": "Officer Portal",
  "ડેશબોર્ડ": "Dashboard",
  "મારું પરિવાર": "My Family",
  "પરિવારના સભ્યો": "Family Members",
  "સભ્યો": "Members",
  "સરકારી યોજનાઓ": "Government Schemes",
  "મારી અરજીઓ": "My Applications",
  "દસ્તાવેજો / ચકાસણી": "Verification & Docs",
  "પ્રોફાઇલ": "Profile",
  "બહાર નીકળો": "Logout",
  "પરિવાર શોધ": "Find Families",
  "ચકાસણી": "Verification",
  "અરજીઓ": "Applications",
  "પાત્ર પરિવાર": "Eligible Families",
  "ગુજરાત સરકારની ડિજિટલ સેવા": "Government of Gujarat digital service",
  "ગુજરાતના પરિવારો માટે એકીકૃત ડિજિટલ ઓળખ અને સરકારી સેવાઓ સુધી સરળ પહોંચ.":
    "A unified digital identity and easier access to government services for Gujarat families.",
  "નવો પરિવાર નોંધણી કરો": "Register a new family",
  "વિશ્વસનીય પરિવાર રેકોર્ડ": "Trusted family record",
  "નોંધણી પછી મળતી પરિવાર ઓળખ સંખ્યા": "Family ID issued after registration",
  "સરળ પ્રક્રિયા": "Simple process",
  "4 પગલાં": "4 steps",
  "એક જ સ્થળે": "In one place",
  "અધિકારી ચકાસણી": "Officer verification",
  "ડિજિટલ મંજૂરી": "Digital approval",
  "પરિવાર ઓળખ સંખ્યા શું છે?": "What is a Parivar ID?",
  "પરિવાર અને સેવાઓ વચ્ચેનું એકીકૃત જોડાણ": "One connection between families and services",
  "પરિવાર ઓળખ સંખ્યા પરિવાર સ્તરની ડિજિટલ ઓળખ છે, જે પરિવારની માહિતી, પાત્ર સરકારી યોજનાઓ અને અરજીની સ્થિતિને એક જ સુરક્ષિત રેકોર્ડ સાથે જોડે છે.":
    "A Parivar ID connects family information, eligible schemes, and application status in one secure record.",
  "પરિવારની વિગતો": "Family details",
  "યોજના પાત્રતા": "Scheme eligibility",
  "અરજીની સ્થિતિ": "Application status",
  "ચાર પગલાંમાં સેવા": "Service in four steps",
  "તે કેવી રીતે કાર્ય કરે છે?": "How does it work?",
  "ચાર પગલાંમાં સંપૂર્ણ સેવા": "Complete service in four steps",
  "પરિવારની નોંધણી": "Family registration",
  "પરિવારની ચકાસણી": "Family verification",
  "યોજનાઓ માટે પાત્રતા": "Scheme eligibility",
  "અરજી અને લાભની સ્થિતિ": "Application and benefit status",
  "ઉપલબ્ધ સરકારી યોજનાઓ": "Available government schemes",
  "તમારા પરિવાર માટેની સંભવિત સહાય": "Potential support for your family",
  "વારંવાર પૂછાતા પ્રશ્નો": "Frequently Asked Questions",
  "સામાન્ય પ્રશ્નોત્તરી (FAQ)": "General FAQ",
  "મદદ અને સંપર્ક": "Help and Contact",
  "સહાયતા કેન્દ્ર અને હેલ્પલાઇન": "Support Center & Helpline",
  "ટોલ ફ્રી હેલ્પલાઇન": "Toll-Free Helpline",
  "ઈમેલ સહાયતા": "Email Support",
  "સ્થાનિક સેવા કેન્દ્ર": "Local Service Center",
  "સુરક્ષિત સેવા": "Secure service",
  "સુરક્ષિત ઓળખ પોર્ટલ": "Secure identity portal",
  "નાગરિક પ્રવેશ": "Citizen Login",
  "સરકારી અધિકારી પ્રવેશ": "Government Officer Login",
  "અધિકારી પ્રવેશ": "Officer Login",
  "નાગરિક નોંધણી": "Citizen Registration",
  "ખાતાની માહિતી": "Account information",
  "પૂરું નામ": "Full name",
  "મોબાઇલ નંબર": "Mobile number",
  "પાસવર્ડ": "Password",
  "પાસવર્ડ પુષ્ટિ": "Confirm password",
  "પરિવારની માહિતી": "Family information",
  "પરિવારના મુખ્ય સભ્ય": "Family head",
  "અંદાજિત વાર્ષિક આવક": "Estimated annual income",
  "જિલ્લો": "District",
  "તાલુકો": "Taluka",
  "ગામ / શહેર": "Village / city",
  "રહેઠાણનો પ્રકાર": "Housing type",
  "સરનામું": "Address",
  "નોંધણી સફળ": "Registration successful",
  "તમારો પરિવાર રેકોર્ડ તૈયાર છે": "Your family record is ready",
  "તમારી પરિવાર ઓળખ સંખ્યા (Family ID):": "Your Family ID:",
  "પરિવાર ડેશબોર્ડ પર જાઓ": "Go to Family Dashboard",
  "હોમ પર પાછા જાઓ": "Back to Home",
  "મારું ડેશબોર્ડ": "My Dashboard",
  "ચકાસાયેલ": "Verified",
  "ચકાસણી બાકી": "Verification pending",
  "સબમિટ થઈ": "Submitted",
  "ચકાસણી હેઠળ": "Under review",
  "મંજૂર": "Approved",
  "નામંજૂર": "Rejected",
  "અરજી કરો": "Apply",
  "હાલ પાત્ર નથી": "Not currently eligible",
  "અરજીની સ્થિતિ જુઓ": "View application status",
  "નવો સભ્ય ઉમેરો": "Add New Member",
  "સભ્ય સેવ કરો": "Save Member",
  "રદ કરો": "Cancel",
  "અરજી સબમિટ કરો": "Submit Application",
  "સમીક્ષા કરો": "Review",
  "મંજૂર કરો": "Approve",
  "નામંજૂર કરો": "Reject",
  "વધુ માહિતી જરૂરી": "Request More Info",
  "ચકાસણી શરૂ કરો": "Start Review",
  "ચકાસણી મંજૂર કરો": "Approve Verification",
  "ચકાસણી નકારી કાઢો": "Reject Verification",
  "પાત્ર પરંતુ લાભ ન મેળવનાર પરિવારો": "Eligible but unserved families",
  "વહીવટી ડેશબોર્ડ": "Administrative Dashboard",
  "પરિવાર 360° સત્તાવાર રેકોર્ડ": "Official Family 360° Record",
  "અરજી વ્યવસ્થાપન": "Application Management"
};

function LanguageControl() {
  const [language, setLanguage] = useState(() => localStorage.getItem("pravi-language") || "gu");

  useEffect(() => {
    const onChange = () => setLanguage(localStorage.getItem("pravi-language") || "gu");
    window.addEventListener("pravi-language", onChange);
    return () => window.removeEventListener("pravi-language", onChange);
  }, []);

  const choose = value => {
    localStorage.setItem("pravi-language", value);
    window.dispatchEvent(new Event("pravi-language"));
  };

  return (
    <div className="languageControl" aria-label="Language selector">
      <button className={language === "gu" ? "active" : ""} onClick={() => choose("gu")}>
        ગુજરાતી
      </button>
      <button className={language === "en" ? "active" : ""} onClick={() => choose("en")}>
        English
      </button>
    </div>
  );
}

function LanguageTranslator() {
  useEffect(() => {
    const original = new WeakMap();
    const translate = node => {
      if (node.nodeType === Node.TEXT_NODE && node.parentElement?.closest("script,style")) return;
      if (node.nodeType === Node.TEXT_NODE) {
        if (!original.has(node)) original.set(node, node.nodeValue);
        const source = original.get(node);
        const language = localStorage.getItem("pravi-language") || "gu";
        const text = source.trim();
        const replacement = language === "en" ? englishCopy[text] || text : source;
        if (node.nodeValue !== replacement) {
          node.nodeValue = source.match(/^\s*/)[0] + replacement + source.match(/\s*$/)[0];
        }
        return;
      }
      node.childNodes.forEach(translate);
    };

    const apply = () => translate(document.body);
    apply();

    const observer = new MutationObserver(records =>
      records.forEach(record => {
        if (record.type === "childList") record.addedNodes.forEach(translate);
      })
    );
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("pravi-language", apply);
    return () => {
      observer.disconnect();
      window.removeEventListener("pravi-language", apply);
    };
  }, []);

  return null;
}

function Logout() {
  useEffect(() => logoutUser(), []);
  return <Navigate to="/" replace />;
}

function App() {
  initializeDemoData();

  return (
    <>
      <LanguageTranslator />
      <LanguageControl />
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/officer/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/citizen/*"
          element={
            <Guard role="citizen">
              <Portal />
            </Guard>
          }
        />
        <Route
          path="/officer/*"
          element={
            <Guard role="officer">
              <Portal officer />
            </Guard>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
