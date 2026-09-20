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