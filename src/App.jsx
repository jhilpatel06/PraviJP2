import React, { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  Award,
  Building,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileCheck,
  FileText,
  Home,
  Key,
  Lock,
  LogOut,
  MapPin,
  Menu,
  Plus,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Upload,
  User,
  UserCheck,
  UserPlus,
  Users,
  X
} from "lucide-react";
import {
  addFamilyMember,
  createApplication,
  demoUsers,
  getApplications,
  getApplicationsByFamilyId,
  getCurrentUser,
  getFamilies,
  getFamilyById,
  getOfficerJurisdiction,
  hasPermission,
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

const permissionLabels = {
  verify_family: "પરિવાર ચકાસણી અધિકાર",
  review_application: "અરજી સમીક્ષા અધિકાર",
  approve_application: "યોજના મંજૂરી અધિકાર",
  reject_application: "અરજી નામંજૂરી અધિકાર",
  request_info: "વધારાની માહિતી વિનંતી અધિકાર",
  view_reports: "વહીવટી અહેવાલ અધિકાર",
  view_families: "પરિવાર 360° શોધ અધિકાર",
  view_eligible_unserved: "પ્રો-એક્ટિવ પાત્રતા લિસ્ટ અધિકાર"
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
        ["પાત્ર પરિવાર", "/officer/eligible-families"],
        ["અધિકારી પ્રોફાઇલ", "/officer/profile"]
      ]
    : user
    ? [
        ["ડેશબોર્ડ", "/citizen"],
        ["મારું પરિવાર", "/citizen/family"],
        ["પરિવારના સભ્યો", "/citizen/members"],
        ["સરકારી યોજનાઓ", "/citizen/schemes"],
        ["મારી અરજીઓ", "/citizen/applications"],
        ["દસ્તાવેજો / ચકાસણી", "/citizen/verification"],
        ["પ્રોફાઇલ", "/citizen/profile"]
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
          <span>ગુજરાત સરકાર · ડિજિટલ સેવા પોર્ટલ</span>
          <span>{officer ? "અધિકૃત સરકારી કર્મચારી પ્રવેશ ક્ષેત્ર" : "સત્તાવાર નાગરિક સેવા"}</span>
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
              <div className="brandsub">
                Parivar ID {officer ? "· સરકારી અધિકારી પોર્ટલ" : "· સત્તાવાર પોર્ટલ"}
              </div>
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
                  window.location.href = officer ? "/officer/login" : "/";
                }}
              >
                બહાર નીકળો <LogOut size={14} />
              </button>
            ) : (
              <>
                <Link className="portalSwitch" to="/login">
                  નાગરિક પ્રવેશ
                </Link>
                <Link className="primary smallButton" to="/register">
                  પરિવાર નોંધણી કરો
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
          <p style={{ fontSize: "12px", color: "#8a9ba8", marginTop: "8px" }}>
            તમામ નાગરિકો માટે સમાન ડિજિટલ ઓળખ અને સરકારી કલ્યાણકારી યોજનાઓનું સીધું વિતરણ.
          </p>
        </div>
        <div>
          <strong>મહત્વપૂર્ણ લિંક્સ</strong>
          <Link to="/">મુખ્ય પૃષ્ઠ</Link>
          <Link to="/#family">પરિવાર ઓળખ શું છે?</Link>
          <Link to="/#schemes">સરકારી યોજનાઓ</Link>
          <Link to="/login">નાગરિક પ્રવેશ</Link>
          <Link to="/register">નવા પરિવારની નોંધણી</Link>
          <Link to="/officer/login" style={{ color: "var(--orange)", marginTop: "12px" }}>
            સરકારી અધિકારી પ્રવેશ (Official Login)
          </Link>
        </div>
        <div>
          <strong>મદદ અને સંપર્ક</strong>
          <span>હેલ્પલાઇન: 1800-233-5500 (ટોલ ફ્રી)</span>
          <span>parivarid-support@gujarat.gov.in</span>
          <span>ગાંધીનગર, ગુજરાત</span>
        </div>
      </div>
      <div className="footerbottom">© 2026 ગુજરાત સરકાર. સત્તાવાર પરિવાર ઓળખ સેવા પોર્ટલ.</div>
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
                  નાગરિક પ્રવેશ <ArrowRight size={17} />
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

/**
 * Dedicated Citizen Login Component (/login)
 * Strictly for citizens. Explicitly blocks officer accounts and redirects them to the officer portal.
 */
function CitizenLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: "9876543210", password: "Citizen@123" });
  const [error, setError] = useState("");

  const submit = event => {
    event.preventDefault();
    setError("");
    const res = loginUser(form.identifier, form.password, "citizen");
    if (res.error) {
      return setError(res.error);
    }
    navigate("/citizen");
  };

  return (
    <div className="app">
      <Header />
      <main className="authPage container">
        <div className="authGrid">
          <section className="authCard">
            <div className="eyebrow">સુરક્ષિત નાગરિક પોર્ટલ</div>
            <h1>નાગરિક પ્રવેશ</h1>
            <p className="muted">
              તમારા પરિવારની ઓળખ, સભ્યો અને સરકારી યોજનાઓની માહિતી માટે પ્રવેશ કરો.
            </p>

            <form onSubmit={submit}>
              <label>
                મોબાઇલ નંબર અથવા ઈમેલ
                <input
                  required
                  value={form.identifier}
                  onChange={e => setForm({ ...form, identifier: e.target.value })}
                  placeholder="9876543210"
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
                પ્રવેશ કરો <ArrowRight size={16} />
              </button>
            </form>

            <div className="authLinks">
              <span>નવો પરિવાર છે?</span>
              <Link to="/register">નવો પરિવાર નોંધણી કરો</Link>
            </div>

            <div className="govAuthNotice">
              <Lock size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong>સરકારી અધિકારીઓ માટે:</strong>
                <p style={{ margin: "2px 0 0 0" }}>
                  આ પ્રવેશ માત્ર નાગરિકો માટે છે. સરકારી વહીવટી પ્રવેશ માટે{" "}
                  <Link to="/officer/login" style={{ color: "var(--navy)", fontWeight: 700, textDecoration: "underline" }}>
                    અધિકારી પોર્ટલ પર જાઓ
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          <section className="officerLogin">
            <div className="featureIcon">
              <UserCheck size={28} />
            </div>
            <h2>નાગરિક ડેમો પ્રવેશ</h2>
            <p>પૂર્વનિર્ધારિત નાગરિક ઓળખ ખાતા દ્વારા તુરંત લોગિન કરો:</p>
            <div style={{ margin: "14px 0" }}>
              <button
                type="button"
                className="secondary"
                style={{ width: "100%", textAlign: "left", display: "block" }}
                onClick={() => setForm({ identifier: "9876543210", password: "Citizen@123" })}
              >
                <strong>રાકેશભાઈ પટેલ</strong>
                <br />
                <small>મોબાઇલ: 9876543210 / પાસવર્ડ: Citizen@123</small>
                <br />
                <small style={{ color: "var(--blue)" }}>Family ID: GJ-2026-00124</small>
              </button>
            </div>
            <small>નોંધ: નોંધણી કર્યા પછી આપ આપના નવા બનાવેલા ખાતાથી પણ લોગિન કરી શકો છો.</small>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/**
 * Dedicated Government Officer Login Component (/officer/login)
 * Strictly for authorized government personnel. Blocks citizen accounts.
 */
function OfficerLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: "officer@gujarat.gov.in", password: "Officer@123" });
  const [error, setError] = useState("");

  const submit = event => {
    event.preventDefault();
    setError("");
    const res = loginUser(form.identifier, form.password, "officer");
    if (res.error) {
      return setError(res.error);
    }
    navigate("/officer");
  };

  return (
    <div className="app">
      <Header officer />
      <main className="authPage container">
        <div className="authGrid">
          <section className="authCard" style={{ borderTop: "4px solid var(--navy)" }}>
            <div className="eyebrow" style={{ color: "var(--orange)" }}>
              ગુજરાત સરકાર · સત્તાવાર ઇન્ટ્રાનેટ
            </div>
            <h1>સરકારી અધિકારી પ્રવેશ</h1>
            <p className="muted">
              પરિવાર રેકોર્ડ ચકાસણી, દસ્તાવેજ પ્રમાણીકરણ અને સરકારી યોજના અરજી સમીક્ષા માટે અધિકૃત
              પ્રવેશ.
            </p>

            <form onSubmit={submit}>
              <label>
                સત્તાવાર સરકારી ઈમેલ (@gujarat.gov.in)
                <input
                  required
                  type="email"
                  value={form.identifier}
                  onChange={e => setForm({ ...form, identifier: e.target.value })}
                  placeholder="officer@gujarat.gov.in"
                />
              </label>
              <label>
                સુરક્ષિત પાસવર્ડ
                <input
                  required
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
              </label>
              {error && <div className="error">{error}</div>}
              <button className="primary" type="submit">
                અધિકારી પ્રમાણીકરણ <ArrowRight size={16} />
              </button>
            </form>

            <div className="authLinks">
              <span>સરકારી વહીવટી અધિકારક્ષેત્ર</span>
              <Link to="/login" style={{ color: "var(--muted)" }}>
                નાગરિક પ્રવેશ પર પાછા જાઓ
              </Link>
            </div>
          </section>

          <section className="officerLogin" style={{ background: "#edf2f7", border: "1px solid #cbd5e1" }}>
            <div className="featureIcon" style={{ color: "var(--navy)" }}>
              <Shield size={28} />
            </div>
            <h2>અધિકૃત ડેમો હોદ્દાઓ</h2>
            <p>વહીવટી સ્તર અનુસાર અધિકારક્ષેત્ર પસંદ કરો:</p>
            <div style={{ margin: "14px 0", display: "grid", gap: "10px" }}>
              <button
                type="button"
                className="secondary"
                style={{ textAlign: "left", display: "block" }}
                onClick={() =>
                  setForm({ identifier: "officer@gujarat.gov.in", password: "Officer@123" })
                }
              >
                <strong>તાલુકા ચકાસણી અધિકારી</strong>
                <br />
                <small>શ્રી વિજયકુમાર પંડ્યા · ગાંધીનગર તાલુકો</small>
                <br />
                <small style={{ color: "var(--blue)" }}>officer@gujarat.gov.in</small>
              </button>

              <button
                type="button"
                className="secondary"
                style={{ textAlign: "left", display: "block" }}
                onClick={() =>
                  setForm({
                    identifier: "district.officer@gujarat.gov.in",
                    password: "Officer@123"
                  })
                }
              >
                <strong>જિલ્લા પંચાયત કલ્યાણ અધિકારી</strong>
                <br />
                <small>શ્રીમતી અનીતાબેન જોશી · સમગ્ર જિલ્લો</small>
                <br />
                <small style={{ color: "var(--blue)" }}>district.officer@gujarat.gov.in</small>
              </button>
            </div>
            <small style={{ color: "#475466" }}>
              પાસવર્ડ: <strong>Officer@123</strong> (તમામ ડેમો અધિકારીઓ માટે)
            </small>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

/**
 * Public Citizen Registration Component (/register)
 * Strictly for citizens. No government account creation option exists.
 */
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
              આ Family ID દ્વારા આપ આપના પરિવારની વિગતો ચકાસી શકશો, સભ્યો ઉમેરી શકશો અને સરકારી
              યોજનાઓ માટે અરજી કરી શકશો.
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
          <div className="eyebrow">નાગરિક સેવા પોર્ટલ</div>
          <h1>નવો પરિવાર નોંધણી કરો</h1>
          <p className="muted">
            ગુજરાત સરકાર દ્વારા પારિવારિક ઓળખ માટે સત્તાવાર નોંધણી પત્રક. આધાર નંબર જેવી
            સંવેદનશીલ માહિતી જરૂરી નથી.
          </p>
          <form onSubmit={submit}>
            <div className="formSection">
              <h2>નાગરિક ખાતાની માહિતી</h2>
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
              <h2>પરિવારની રહેઠાણ અને આર્થિક માહિતી</h2>
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
                  label="સંપૂર્ણ સરનામું"
                  name="address"
                  value={form.address}
                  onChange={change}
                  required
                />
                <Field
                  label="અન્ય પરિવાર સભ્યો (અલ્પવિરામથી)"
                  name="members"
                  value={form.members}
                  onChange={change}
                  placeholder="દા.ત. મીનાબેન, રાહુલ, રિયા"
                />
              </div>
            </div>
            {error && <div className="error">{error}</div>}
            <button className="primary" type="submit">
              પરિવાર નોંધણી પૂર્ણ કરો અને Family ID મેળવો <ArrowRight size={16} />
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
  if (!user) return <Navigate to={role === "officer" ? "/officer/login" : "/login"} replace />;
  return user.role === role ? (
    children
  ) : (
    <Navigate to={user.role === "officer" ? "/officer" : "/citizen"} replace />
  );
}

function Portal({ officer = false }) {
  const user = getCurrentUser();

  return (
    <div className={`portal ${officer ? "officerPortal" : "citizenPortal"}`}>
      <Header officer={officer} />
      <div className="portalBody">
        <aside className="sidebar">
          <div className="sideLabel">
            {officer ? (
              <div>
                <div>અધિકારી વહીવટી પોર્ટલ</div>
                <div style={{ fontSize: "11px", color: "#cbd5e1", marginTop: "3px", fontWeight: "normal" }}>
                  {user.designation || "સરકારી અધિકારી"}
                </div>
              </div>
            ) : (
              <div>
                <div>નાગરિક સેવા પોર્ટલ</div>
                <div style={{ fontSize: "11px", color: "#cbd5e1", marginTop: "3px", fontWeight: "normal" }}>
                  Family ID: {user.familyId}
                </div>
              </div>
            )}
          </div>
          {(officer
            ? [
                ["ડેશબોર્ડ", "/officer"],
                ["પરિવાર શોધ (360°)", "/officer/families"],
                ["ચકાસણી લિસ્ટ", "/officer/verification"],
                ["અરજી વ્યવસ્થાપન", "/officer/applications"],
                ["પાત્ર પરિવારો", "/officer/eligible-families"],
                ["અધિકારી પ્રોફાઇલ", "/officer/profile"]
              ]
            : [
                ["ડેશબોર્ડ", "/citizen"],
                ["મારું પરિવાર", "/citizen/family"],
                ["પરિવારના સભ્યો", "/citizen/members"],
                ["સરકારી યોજનાઓ", "/citizen/schemes"],
                ["મારી અરજીઓ", "/citizen/applications"],
                ["દસ્તાવેજો / ચકાસણી", "/citizen/verification"],
                ["નાગરિક પ્રોફાઇલ", "/citizen/profile"]
              ]
          ).map(([label, path]) => (
            <Link key={path} to={path}>
              <Home size={16} /> {label}
            </Link>
          ))}
          <button
            onClick={() => {
              logoutUser();
              window.location.href = officer ? "/officer/login" : "/";
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
      <Route path="profile" element={<CitizenProfilePage />} />
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
      <Route path="profile" element={<OfficerProfilePage />} />
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
    <div className="profileItem">
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
        <Info label="સભ્યોની સંખ્યા" value={`${family.members.length} સભ્યો`} />
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

/**
 * Dedicated Citizen Profile Page (/citizen/profile)
 * Contains personal info, Family ID, family info, verification status, active applications, documents, and history.
 */
function CitizenProfilePage() {
  const user = getCurrentUser();
  const family = getFamilyById(user.familyId);
  const apps = getApplicationsByFamilyId(user.familyId);

  return (
    <Page title="નાગરિક પ્રોફાઇલ" intro="તમારી વ્યક્તિગત અને પારિવારિક ઓળખની સત્તાવાર માહિતી.">
      {/* 1. Personal & Contact Information */}
      <div className="profileSection">
        <div className="profileSectionHead">
          <h2>વ્યક્તિગત અને સંપર્ક માહિતી</h2>
          <span className="status verified">
            <User size={14} /> નાગરિક ખાતું
          </span>
        </div>
        <div className="profileBody">
          <div className="profileGrid">
            <Info label="પૂરું નામ" value={user.name} />
            <Info label="મોબાઇલ નંબર" value={user.mobile || "-"} />
            <Info label="ઈમેલ એડ્રેસ" value={user.email || "-"} />
            <Info label="નોંધણી તારીખ" value={user.createdAt || "2026"} />
            <Info label="ઓળખ પ્રમાણીકરણ" value="સત્તાવાર ડિજિટલ રેકોર્ડ" />
            <Info label="ખાતા પ્રકાર" value="પરિવાર મુખ્ય / સભ્ય" />
          </div>
        </div>
      </div>

      {/* 2. Family ID & Residence Information */}
      {family && (
        <div className="profileSection">
          <div className="profileSectionHead">
            <h2>પરિવાર ઓળખ (Family ID) વિગતો</h2>
            <Status value={family.verified ? "verified" : "pending"} />
          </div>
          <div className="profileBody">
            <div className="profileGrid">
              <Info label="પરિવાર ઓળખ સંખ્યા" value={family.id} />
              <Info label="પરિવારના મુખ્ય સભ્ય" value={family.head} />
              <Info label="કુલ સભ્યોની સંખ્યા" value={`${family.members.length} સભ્યો`} />
              <Info label="જિલ્લો" value={family.district} />
              <Info label="તાલુકો" value={family.taluka || "ગાંધીનગર"} />
              <Info label="ગામ / શહેર" value={family.village || "ગાંધીનગર"} />
              <Info label="વાર્ષિક કૌટુંબિક આવક" value={`₹ ${money(family.income)}`} />
              <Info label="રહેઠાણનો પ્રકાર" value={family.housing} />
              <Info label="સરનામું" value={family.address} />
            </div>
          </div>
        </div>
      )}

      {/* 3. Family Members Record */}
      {family && (
        <div className="profileSection">
          <div className="profileSectionHead">
            <h2>નોંધાયેલ પરિવાર સભ્યો ({family.members.length})</h2>
            <Link className="secondary smallButton" to="/citizen/members">
              સભ્યો વ્યવસ્થાપન
            </Link>
          </div>
          <div className="tablewrap" style={{ border: 0 }}>
            <table>
              <thead>
                <tr>
                  <th>સભ્યનું નામ</th>
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
        </div>
      )}

      {/* 4. Active Applications & Service History */}
      <div className="profileSection">
        <div className="profileSectionHead">
          <h2>સરકારી સેવાઓ અને અરજી ઇતિહાસ ({apps.length})</h2>
          <Link className="secondary smallButton" to="/citizen/applications">
            તમામ અરજીઓ જુઓ
          </Link>
        </div>
        {apps.length ? (
          <div className="tablewrap" style={{ border: 0 }}>
            <table>
              <thead>
                <tr>
                  <th>અરજી ID</th>
                  <th>યોજનાનું નામ</th>
                  <th>અરજદાર</th>
                  <th>સબમિટ તારીખ</th>
                  <th>સ્થિતિ</th>
                </tr>
              </thead>
              <tbody>
                {apps.map(a => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="profileBody">
            <p className="muted">હજુ સુધી કોઈ યોજના માટે અરજી કરેલ નથી.</p>
          </div>
        )}
      </div>
    </Page>
  );
}

/**
 * Dedicated Government Officer Profile Page (/officer/profile)
 * Contains official ID, name, email, department, designation, office location, jurisdiction, and assigned permissions.
 * Never exposes citizen info.
 */
function OfficerProfilePage() {
  const user = getCurrentUser();

  return (
    <Page title="સરકારી અધિકારી પ્રોફાઇલ" intro="અધિકૃત વહીવટી ઓળખ, હોદ્દો, અધિકારક્ષેત્ર અને સોંપાયેલ પરવાનગીઓ.">
      {/* 1. Official Credentials */}
      <div className="profileSection" style={{ borderTop: "4px solid var(--navy)" }}>
        <div className="profileSectionHead">
          <h2>અધિકૃત સરકારી ઓળખ (Official Credentials)</h2>
          <span className="status verified">
            <ShieldCheck size={14} /> વહીવટી ખાતું સક્રિય
          </span>
        </div>
        <div className="profileBody">
          <div className="profileGrid">
            <Info label="અધિકારીનું નામ" value={user.name} />
            <Info label="સત્તાવાર સરકારી ID" value={user.officerId || "OFF-GJ-GNR-0101"} />
            <Info label="સત્તાવાર ઈમેલ" value={user.email} />
            <Info label="સત્તાવાર મોબાઇલ" value={user.mobile || "9426001122"} />
            <Info label="વહીવટી હોદ્દો (Designation)" value={user.designation || "તાલુકા ચકાસણી અધિકારી"} />
            <Info label="સરકારી વિભાગ (Department)" value={user.department || "મહેસૂલ અને સામાજિક ન્યાય વિભાગ"} />
          </div>
        </div>
      </div>

      {/* 2. Office & Jurisdiction */}
      <div className="profileSection">
        <div className="profileSectionHead">
          <h2>કચેરી સ્થળ અને વહીવટી અધિકારક્ષેત્ર (Jurisdiction)</h2>
          <span className="jurisdictionBadge" style={{ color: "var(--navy)", background: "#edf2f7", borderColor: "#cbd5e1" }}>
            <MapPin size={14} /> અધિકૃત ક્ષેત્ર
          </span>
        </div>
        <div className="profileBody">
          <div className="profileGrid">
            <Info label="સત્તાવાર કચેરી" value={user.office || "તાલુકા સેવા સદન, ગાંધીનગર"} />
            <Info label="વહીવટી જિલ્લો" value={user.jurisdiction?.district || "ગાંધીનગર"} />
            <Info label="વહીવટી તાલુકો / વિસ્તાર" value={user.jurisdiction?.taluka || "ગાંધીનગર"} />
            <Info label="અધિકાર સ્તર (Authority Level)" value={user.officerRole === "district_officer" ? "જિલ્લા સ્તરીય મંજૂરકર્તા" : "તાલુકા સ્તરીય ચકાસણીકર્તા"} />
            <Info label="પોસ્ટિંગ તારીખ" value={user.createdAt || "1 જાન્યુઆરી 2026"} />
            <Info label="સેવા સંવર્ગ" value="ગુજરાત વહીવટી સેવા (GAS/Cadre)" />
          </div>
        </div>
      </div>

      {/* 3. Roles & System Permissions */}
      <div className="profileSection">
        <div className="profileSectionHead">
          <h2>સિસ્ટમ પરવાનગીઓ અને વિશેષાધિકારો (Role & Permissions)</h2>
          <span style={{ fontSize: "12px", color: "var(--muted)" }}>
            ભૂમિકા: <strong>{user.officerRole || "verification_officer"}</strong>
          </span>
        </div>
        <div className="profileBody">
          <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#475466" }}>
            આ વહીવટી ખાતાને પોર્ટલ પર નીચે મુજબની કામગીરી કરવાની કાયદેસર સત્તા આપવામાં આવી છે:
          </p>
          <div className="permissionsGrid">
            {(user.permissions || [
              "verify_family",
              "review_application",
              "request_info",
              "view_families"
            ]).map(perm => (
              <div className="permissionBadge" key={perm}>
                <Key size={14} />
                <span>{permissionLabels[perm] || perm}</span>
              </div>
            ))}
          </div>

          <div className="govAuthNotice">
            <Lock size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
            <div>
              <strong>સુરક્ષા અને ઓડિટ નીતિ:</strong>
              <p style={{ margin: "2px 0 0 0" }}>
                આ એક અધિકૃત સરકારી વહીવટી ખાતું છે. તમારા દ્વારા લેવામાં આવતી તમામ ચકાસણી અને મંજૂરી
                કાર્યવાહી ડિજિટલ ગુજરાત ઓડિટ લોગમાં સુરક્ષિત રીતે નોંધાય છે.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

function OfficerDashboard() {
  const user = getCurrentUser();
  const families = getFamilies();
  const apps = getApplications();

  return (
    <Page
      title="વહીવટી ડેશબોર્ડ"
      intro="પરિવાર ઓળખ, ચકાસણી અને સરકારી યોજના અરજીઓનું સત્તાવાર સંચાલન."
    >
      {/* Official Jurisdiction Banner */}
      <div className="jurisdictionBanner">
        <div>
          <div className="jurisdictionTitle">
            {user.name} · {user.designation}
          </div>
          <div className="jurisdictionSub">
            વિભાગ: {user.department} · કચેરી: {user.office}
          </div>
        </div>
        <div className="jurisdictionBadge">
          <MapPin size={14} /> વહીવટી ક્ષેત્ર: {getOfficerJurisdiction(user)}
        </div>
      </div>

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
        <Metric label="કુલ અરજીઓ" value={apps.length} icon={<FileText />} />
        <Metric
          label="મંજૂર અરજીઓ"
          value={apps.filter(a => a.status === "approved").length}
          icon={<CheckCircle2 />}
        />
      </div>

      <div className="portalGrid">
        <section className="panel">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h2>તાજેતરની અરજીઓ</h2>
            <Link className="secondary smallButton" to="/officer/applications">
              બધી અરજીઓ જુઓ
            </Link>
          </div>
          {apps.slice(-5).reverse().map(a => (
            <div className="workrow" key={a.id}>
              <div>
                <Link to="/officer/applications" style={{ color: "var(--navy)", fontWeight: 700 }}>
                  {a.id}
                </Link>
                <span>Family ID: {a.familyId} · અરજદાર: {a.applicant}</span>
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
  const user = getCurrentUser();
  const [, redraw] = useState(0);
  const [filter, setFilter] = useState("all");
  const [activeApp, setActiveApp] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [actionType, setActionType] = useState("");

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
  "નાગરિક પ્રવેશ": "Citizen Login",
  "સરકારી અધિકારી પ્રવેશ": "Government Officer Login",
  "નોંધણી કરો": "Register",
  "પરિવાર નોંધણી કરો": "Register Family",
  "નવો પરિવાર નોંધણી કરો": "Register New Family",
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
  "નાગરિક પ્રોફાઇલ": "Citizen Profile",
  "સરકારી અધિકારી પ્રોફાઇલ": "Government Officer Profile",
  "અધિકારી પ્રોફાઇલ": "Officer Profile",
  "બહાર નીકળો": "Logout",
  "પરિવાર શોધ": "Find Families",
  "પરિવાર શોધ (360°)": "Family 360° Search",
  "ચકાસણી": "Verification",
  "ચકાસણી લિસ્ટ": "Verification List",
  "અરજીઓ": "Applications",
  "અરજી વ્યવસ્થાપન": "Application Management",
  "પાત્ર પરિવાર": "Eligible Families",
  "પાત્ર પરિવારો": "Eligible Families",
  "ગુજરાત સરકારની ડિજિટલ સેવા": "Government of Gujarat digital service",
  "ગુજરાતના પરિવારો માટે એકીકૃત ડિજિટલ ઓળખ અને સરકારી સેવાઓ સુધી સરળ પહોંચ.":
    "A unified digital identity and easier access to government services for Gujarat families.",
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
  "સુરક્ષિત નાગરિક પોર્ટલ": "Secure Citizen Portal",
  "સુરક્ષિત ઓળખ પોર્ટલ": "Secure identity portal",
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
  "વ્યક્તિગત અને સંપર્ક માહિતી": "Personal & Contact Information",
  "પરિવાર ઓળખ (Family ID) વિગતો": "Family ID Details",
  "નોંધાયેલ પરિવાર સભ્યો": "Registered Family Members",
  "સરકારી સેવાઓ અને અરજી ઇતિહાસ": "Government Services & Application History",
  "અધિકૃત સરકારી ઓળખ (Official Credentials)": "Official Government Credentials",
  "કચેરી સ્થળ અને વહીવટી અધિકારક્ષેત્ર (Jurisdiction)": "Office Location & Jurisdiction",
  "સિસ્ટમ પરવાનગીઓ અને વિશેષાધિકારો (Role & Permissions)": "System Permissions & Roles"
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
        {/* Dedicated Citizen Login */}
        <Route path="/login" element={<CitizenLogin />} />
        {/* Dedicated Government Officer Login */}
        <Route path="/officer/login" element={<OfficerLogin />} />
        {/* Strictly Citizen Registration */}
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        {/* Citizen Protected Portal */}
        <Route
          path="/citizen/*"
          element={
            <Guard role="citizen">
              <Portal />
            </Guard>
          }
        />
        {/* Government Officer Protected Portal */}
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
