export const initialFamilies = [
  {
    id: "GJ-2026-00124",
    head: "રાકેશભાઈ પટેલ",
    address: "સેક્ટર 21, ગાંધીનગર, ગુજરાત",
    district: "ગાંધીનગર",
    members: [
      { id: "M001", name: "રાકેશભાઈ પટેલ", age: 45, relation: "પરિવારના મુખ્ય સભ્ય", status: "verified" },
      { id: "M002", name: "મીનાબેન પટેલ", age: 42, relation: "પત્ની", status: "verified" },
      { id: "M003", name: "રાહુલ પટેલ", age: 18, relation: "પુત્ર", status: "verified" },
      { id: "M004", name: "રિયાબેન પટેલ", age: 14, relation: "પુત્રી", status: "verified" },
      { id: "M005", name: "કાવ્યા પટેલ", age: 8, relation: "પુત્રી", status: "pending" }
    ],
    income: 210000,
    housing: "કાચું રહેઠાણ",
    verified: true
  },
  {
    id: "GJ-2026-00218",
    head: "હસમુખભાઈ દેસાઈ",
    address: "કલોલ, ગાંધીનગર, ગુજરાત",
    district: "ગાંધીનગર",
    members: [
      { id: "M011", name: "હસમુખભાઈ દેસાઈ", age: 52, relation: "પરિવારના મુખ્ય સભ્ય", status: "verified" },
      { id: "M012", name: "જશોદાબેન દેસાઈ", age: 48, relation: "પત્ની", status: "verified" },
      { id: "M013", name: "મયુર દેસાઈ", age: 22, relation: "પુત્ર", status: "verified" }
    ],
    income: 340000,
    housing: "પાકું રહેઠાણ",
    verified: false
  },
  {
    id: "GJ-2026-00307",
    head: "સવિતાબેન રાઠોડ",
    address: "દહેગામ, ગાંધીનગર, ગુજરાત",
    district: "ગાંધીનગર",
    members: [
      { id: "M021", name: "સવિતાબેન રાઠોડ", age: 64, relation: "પરિવારના મુખ્ય સભ્ય", status: "verified" },
      { id: "M022", name: "કિરણ રાઠોડ", age: 31, relation: "પુત્ર", status: "verified" }
    ],
    income: 145000,
    housing: "પાકું રહેઠાણ",
    verified: true
  }
];

export const schemes = [
  {
    id: "pmay",
    name: "પ્રધાનમંત્રી આવાસ યોજના",
    short: "પાત્ર પરિવારને આવાસ સહાય માટેની યોજના.",
    eligible: f => f.income <= 250000 && f.housing !== "પાકું રહેઠાણ",
    reason: "પરિવારની આવક પાત્રતા મર્યાદામાં છે અને રહેઠાણ સંબંધિત માપદંડ પૂર્ણ થાય છે.",
    docs: ["આવક પ્રમાણપત્ર", "રહેઠાણ પુરાવો", "ઓળખ પુરાવો"]
  },
  {
    id: "scholarship",
    name: "પોસ્ટ મેટ્રિક શિષ્યવૃત્તિ",
    short: "પાત્ર વિદ્યાર્થીઓ માટે શિક્ષણ સહાય.",
    eligible: f => f.members.some(m => m.age >= 16 && m.age <= 25),
    reason: "પરિવારમાં ઉચ્ચતર અભ્યાસની ઉંમરનો સભ્ય ઉપલબ્ધ છે.",
    docs: ["આવક પ્રમાણપત્ર", "શૈક્ષણિક પ્રમાણપત્ર", "બેંક વિગતો"]
  },
  {
    id: "senior",
    name: "વૃદ્ધ સહાય યોજના",
    short: "પાત્ર વરિષ્ઠ નાગરિક માટે સહાય.",
    eligible: f => f.members.some(m => m.age >= 60),
    reason: "પરિવારમાં 60 વર્ષથી વધુ ઉંમરના સભ્ય છે.",
    docs: ["ઉંમરનો પુરાવો", "આવક પ્રમાણપત્ર", "બેંક વિગતો"]
  }
];

export const seedApplications = [
  {
    id: "APP-2026-00031",
    familyId: "GJ-2026-00218",
    schemeId: "scholarship",
    applicant: "મયુર દેસાઈ",
    status: "under_review",
    submitted: "18 સપ્ટેમ્બર 2026"
  }
];

export const getInitialApplications = () => {
  const saved = localStorage.getItem("pravi-applications");
  return saved ? JSON.parse(saved) : seedApplications;
};

export const getInitialFamilies = () => {
  const saved = localStorage.getItem("pravi-families");
  return saved ? JSON.parse(saved) : initialFamilies;
};

export const getFamilies = () => JSON.parse(localStorage.getItem("pravi-families") || "null") || initialFamilies;
export const getApplications = () => JSON.parse(localStorage.getItem("pravi-applications") || "null") || seedApplications;
export const getCurrentUser = () => JSON.parse(localStorage.getItem("currentUser") || "null");
export const getFamilyById = id => getFamilies().find(family => family.id === id);
const demoUsers = [
  { id: "citizen-demo", name: "રાકેશભાઈ પટેલ", mobile: "9876543210", email: "", password: "Citizen@123", role: "citizen", familyId: "GJ-2026-00124" },
  { id: "officer-demo", name: "અધિકારી મહોદય", email: "officer@gujarat.gov.in", password: "Officer@123", role: "officer", department: "ગુજરાત સરકાર" }
];
export function initializeDemoData() {
  if (!localStorage.getItem("pravi-families")) localStorage.setItem("pravi-families", JSON.stringify(initialFamilies));
  if (!localStorage.getItem("pravi-applications")) localStorage.setItem("pravi-applications", JSON.stringify(seedApplications));
  if (!localStorage.getItem("pravi-users")) localStorage.setItem("pravi-users", JSON.stringify(demoUsers));
}
export function getUserByIdentifier(identifier) { return JSON.parse(localStorage.getItem("pravi-users") || "[]").find(user => user.mobile === identifier || user.email === identifier); }
export function loginUser(identifier, password) {
  const user = getUserByIdentifier(identifier);
  if (!user || user.password !== password) return null;
  const session = { id: user.id, name: user.name, email: user.email, mobile: user.mobile, role: user.role, familyId: user.familyId };
  localStorage.setItem("currentUser", JSON.stringify(session));
  return session;
}
export function logoutUser() { localStorage.removeItem("currentUser"); }
export function registerUser(form) {
  const users = JSON.parse(localStorage.getItem("pravi-users") || "[]");
  if (users.some(user => user.mobile === form.mobile || (form.email && user.email === form.email))) throw new Error("આ મોબાઇલ અથવા ઈમેલથી ખાતું પહેલેથી છે.");
  const familyId = `GJ-2026-${String(Date.now()).slice(-5)}`;
  const family = { id: familyId, head: form.head || form.name, address: form.address, district: form.district, taluka: form.taluka, village: form.village, income: Number(form.income) || 0, housing: form.housing, verified: false, members: [{ id: `${familyId}-001`, name: form.head || form.name, age: 35, relation: "પરિવારના મુખ્ય સભ્ય", gender: "-", status: "pending" }, ...(form.members || "").split(",").map((name, index) => name.trim() ? ({ id: `${familyId}-${String(index + 2).padStart(3, "0")}`, name: name.trim(), age: 18, relation: "પરિવારના સભ્ય", gender: "-", status: "pending" }) : null).filter(Boolean)] };
  const user = { id: `citizen-${Date.now()}`, name: form.name, mobile: form.mobile, email: form.email, password: form.password, role: "citizen", familyId };
  localStorage.setItem("pravi-users", JSON.stringify([...users, user]));
  localStorage.setItem("pravi-families", JSON.stringify([...getFamilies(), family]));
  loginUser(form.mobile, form.password);
  return { familyId };
}
export function createApplication({ familyId, schemeId, applicant, documents = [] }) {
  const apps = getApplications(); const id = `APP-2026-${String(Date.now()).slice(-5)}`; const date = new Date().toLocaleDateString("gu-IN");
  const application = { id, familyId, schemeId, applicant, documents, status: "submitted", submitted: date, updated: date, history: [{ status: "submitted", date }] };
  localStorage.setItem("pravi-applications", JSON.stringify([...apps, application])); refreshStorage(); return application;
}
export function updateApplicationStatus(id, status) {
  const date = new Date().toLocaleDateString("gu-IN");
  const apps = getApplications().map(app => app.id === id ? { ...app, status, updated: date, history: [...(app.history || []), { status, date }] } : app);
  localStorage.setItem("pravi-applications", JSON.stringify(apps)); refreshStorage();
}
export function updateFamilyVerification(id, status) {
  const families = getFamilies().map(family => family.id === id ? { ...family, verified: status === "verified", verificationStatus: status, members: family.members.map(member => ({ ...member, status: status === "verified" ? "verified" : member.status })) } : family);
  localStorage.setItem("pravi-families", JSON.stringify(families)); refreshStorage();
}
function refreshStorage() { window.dispatchEvent(new Event("pravi-data")); }