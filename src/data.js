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

export const demoUsers = [
  {
    id: "citizen-demo",
    name: "રાકેશભાઈ પટેલ",
    mobile: "9876543210",
    email: "rakesh.patel@demo.com",
    password: "Citizen@123",
    role: "citizen",
    familyId: "GJ-2026-00124",
    createdAt: "15 જાન્યુઆરી 2026"
  },
  {
    id: "officer-taluka-demo",
    officerId: "OFF-GJ-GNR-0101",
    name: "શ્રી વિજયકુમાર પંડ્યા",
    email: "officer@gujarat.gov.in",
    mobile: "9426001122",
    password: "Officer@123",
    role: "officer",
    officerRole: "verification_officer",
    department: "મહેસૂલ અને સામાજિક ન્યાય વિભાગ",
    designation: "તાલુકા ચકાસણી અધિકારી (Verification Officer)",
    office: "તાલુકા સેવા સદન, ગાંધીનગર",
    jurisdiction: {
      district: "ગાંધીનગર",
      taluka: "ગાંધીનગર"
    },
    permissions: ["verify_family", "review_application", "request_info", "view_families", "view_eligible_unserved"],
    createdAt: "1 જાન્યુઆરી 2026"
  },
  {
    id: "officer-district-demo",
    officerId: "OFF-GJ-GNR-0001",
    name: "શ્રીમતી અનીતાબેન જોશી",
    email: "district.officer@gujarat.gov.in",
    mobile: "9426003344",
    password: "Officer@123",
    role: "officer",
    officerRole: "district_officer",
    department: "પંચાયત અને ગ્રામ વિકાસ વિભાગ",
    designation: "જિલ્લા પંચાયત કલ્યાણ અધિકારી (District Officer)",
    office: "જિલ્લા સેવા સદન, ગાંધીનગર",
    jurisdiction: {
      district: "ગાંધીનગર",
      taluka: "સમગ્ર જિલ્લો"
    },
    permissions: ["verify_family", "review_application", "approve_application", "reject_application", "request_info", "view_reports", "view_families", "view_eligible_unserved"],
    createdAt: "1 જાન્યુઆરી 2026"
  }
];

export function initializeDemoData() {
  if (!localStorage.getItem("pravi-families")) localStorage.setItem("pravi-families", JSON.stringify(initialFamilies));
  if (!localStorage.getItem("pravi-applications")) localStorage.setItem("pravi-applications", JSON.stringify(seedApplications));
  
  // Ensure demo users have full structured officer attributes
  const existingUsers = JSON.parse(localStorage.getItem("pravi-users") || "null");
  if (!existingUsers || !existingUsers.some(u => u.officerId)) {
    localStorage.setItem("pravi-users", JSON.stringify(demoUsers));
  }
}

export function getUserByIdentifier(identifier) {
  const users = JSON.parse(localStorage.getItem("pravi-users") || "[]");
  return users.find(user => user.mobile === identifier || user.email === identifier);
}

export function loginUser(identifier, password, expectedRole = null) {
  const user = getUserByIdentifier(identifier);
  if (!user || user.password !== password) {
    return { error: "પ્રવેશ વિગતો ખોટી છે. કૃપા કરીને તપાસો." };
  }

  if (expectedRole && user.role !== expectedRole) {
    if (expectedRole === "citizen" && user.role === "officer") {
      return {
        error: "આ ખાતું સરકારી અધિકારી ખાતું છે. કૃપા કરીને સત્તાવાર અધિકારી પોર્ટલ /officer/login દ્વારા પ્રવેશ કરો.",
        code: "OFFICER_IN_CITIZEN_PORTAL"
      };
    }
    if (expectedRole === "officer" && user.role === "citizen") {
      return {
        error: "આ પોર્ટલ માત્ર સત્તાવાર સરકારી કર્મચારીઓ માટે છે. નાગરિક પ્રવેશ માટે /login નો ઉપયોગ કરો.",
        code: "CITIZEN_IN_OFFICER_PORTAL"
      };
    }
  }

  const session = {
    id: user.id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
    familyId: user.familyId || "",
    officerId: user.officerId || "",
    officerRole: user.officerRole || "",
    department: user.department || "",
    designation: user.designation || "",
    office: user.office || "",
    jurisdiction: user.jurisdiction || null,
    permissions: user.permissions || [],
    createdAt: user.createdAt || new Date().toLocaleDateString("gu-IN")
  };

  localStorage.setItem("currentUser", JSON.stringify(session));
  return session;
}

export function hasPermission(user, perm) {
  if (!user || user.role !== "officer") return false;
  return Array.isArray(user.permissions) && user.permissions.includes(perm);
}

export function getOfficerJurisdiction(user) {
  if (!user || !user.jurisdiction) return "ગાંધીનગર જિલ્લો";
  return `${user.jurisdiction.district} (${user.jurisdiction.taluka})`;
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}

export function registerUser(form) {
  const users = JSON.parse(localStorage.getItem("pravi-users") || "[]");
  if (users.some(user => user.mobile === form.mobile || (form.email && user.email === form.email))) {
    throw new Error("આ મોબાઇલ અથવા ઈમેલથી ખાતું પહેલેથી છે.");
  }
  const familyId = `GJ-2026-${String(Date.now()).slice(-5)}`;
  const family = {
    id: familyId,
    head: form.head || form.name,
    address: form.address,
    district: form.district,
    taluka: form.taluka,
    village: form.village,
    income: Number(form.income) || 0,
    housing: form.housing,
    verified: false,
    members: [
      {
        id: `${familyId}-001`,
        name: form.head || form.name,
        age: 35,
        relation: "પરિવારના મુખ્ય સભ્ય",
        gender: "પુરુષ",
        status: "pending"
      },
      ...(form.members || "")
        .split(",")
        .map((name, index) =>
          name.trim()
            ? {
                id: `${familyId}-${String(index + 2).padStart(3, "0")}`,
                name: name.trim(),
                age: 18,
                relation: "પરિવારના સભ્ય",
                gender: "-",
                status: "pending"
              }
            : null
        )
        .filter(Boolean)
    ]
  };
  const user = {
    id: `citizen-${Date.now()}`,
    name: form.name,
    mobile: form.mobile,
    email: form.email,
    password: form.password,
    role: "citizen",
    familyId,
    createdAt: new Date().toLocaleDateString("gu-IN")
  };
  localStorage.setItem("pravi-users", JSON.stringify([...users, user]));
  localStorage.setItem("pravi-families", JSON.stringify([...getFamilies(), family]));
  loginUser(form.mobile, form.password, "citizen");
  return { familyId };
}
export const getApplicationsByFamilyId = familyId => getApplications().filter(a => a.familyId === familyId);

export function createApplication({ familyId, schemeId, applicant, memberId = "", documents = [], declaration = true }) {
  const apps = getApplications();
  const id = `APP-2026-${String(Date.now()).slice(-5)}`;
  const date = new Date().toLocaleDateString("gu-IN");
  const application = {
    id,
    familyId,
    schemeId,
    applicant,
    memberId,
    documents: documents.length > 0 ? documents : [
      { name: "ઓળખ પુરાવો", status: "ચકાસાયેલ", fileName: "identity_proof.pdf" },
      { name: "આવક પ્રમાણપત્ર", status: "ચકાસાયેલ", fileName: "income_cert.pdf" },
      { name: "રહેઠાણ પુરાવો", status: "ચકાસાયેલ", fileName: "address_proof.pdf" }
    ],
    declaration: !!declaration,
    status: "submitted",
    submitted: date,
    updated: date,
    history: [{ status: "submitted", date, remarks: "અરજી સફળતાપૂર્વક સબમિટ થઈ." }]
  };
  localStorage.setItem("pravi-applications", JSON.stringify([...apps, application]));
  refreshStorage();
  return application;
}

export function updateApplicationStatus(id, status, remarks = "") {
  const date = new Date().toLocaleDateString("gu-IN");
  const defaultRemarks = {
    under_review: "દસ્તાવેજ ચકાસણી અને અધિકારી સમીક્ષા હેઠળ.",
    approved: "અરજી પાત્ર જણાયેલ છે અને મંજૂર કરવામાં આવી છે.",
    rejected: "અરજી માપદંડ પૂર્ણ ન કરવાને કારણે નામંજૂર કરવામાં આવી છે.",
    pending: "અરજી માટે વધારાની માહિતી અથવા પુરાવા જરૂરી છે."
  };
  const note = remarks || defaultRemarks[status] || "સ્થિતિ અપડેટ કરવામાં આવી.";
  const apps = getApplications().map(app =>
    app.id === id
      ? {
          ...app,
          status,
          updated: date,
          remarks: note,
          history: [...(app.history || []), { status, date, remarks: note }]
        }
      : app
  );
  localStorage.setItem("pravi-applications", JSON.stringify(apps));
  refreshStorage();
}

export function addFamilyMember(familyId, member) {
  const families = getFamilies();
  const family = families.find(f => f.id === familyId);
  if (!family) throw new Error("પરિવાર મળ્યો નથી.");
  const memberId = `${familyId}-${String(Date.now()).slice(-3)}`;
  const newMember = {
    id: memberId,
    name: member.name,
    relation: member.relation || "પરિવારના સભ્ય",
    age: Number(member.age) || 18,
    gender: member.gender || "પુરુષ",
    status: "pending"
  };
  const updatedFamilies = families.map(f =>
    f.id === familyId ? { ...f, members: [...f.members, newMember] } : f
  );
  localStorage.setItem("pravi-families", JSON.stringify(updatedFamilies));
  refreshStorage();
  return newMember;
}

export function updateFamilyVerification(id, status) {
  const families = getFamilies().map(family =>
    family.id === id
      ? {
          ...family,
          verified: status === "verified",
          verificationStatus: status,
          members: family.members.map(member => ({
            ...member,
            status: status === "verified" ? "verified" : member.status
          }))
        }
      : family
  );
  localStorage.setItem("pravi-families", JSON.stringify(families));
  refreshStorage();
}

export function verifyFamilyMember(familyId, memberId, status = "verified") {
  const families = getFamilies().map(family => {
    if (family.id !== familyId) return family;
    const updatedMembers = family.members.map(m =>
      m.id === memberId ? { ...m, status } : m
    );
    // If all members are verified and family wasn't, can keep family verified
    return { ...family, members: updatedMembers };
  });
  localStorage.setItem("pravi-families", JSON.stringify(families));
  refreshStorage();
}

export function deleteFamilyMember(familyId, memberId) {
  const families = getFamilies().map(family => {
    if (family.id !== familyId) return family;
    return {
      ...family,
      members: family.members.filter(m => m.id !== memberId)
    };
  });
  localStorage.setItem("pravi-families", JSON.stringify(families));
  refreshStorage();
}

export function updateFamilyMember(familyId, memberId, updatedData) {
  const families = getFamilies().map(family => {
    if (family.id !== familyId) return family;
    return {
      ...family,
      members: family.members.map(m =>
        m.id === memberId ? { ...m, ...updatedData } : m
      )
    };
  });
  localStorage.setItem("pravi-families", JSON.stringify(families));
  refreshStorage();
}

export function verifyFamilyKyc(familyId, kycDetails = {}) {
  const date = new Date().toLocaleDateString("gu-IN");
  const families = getFamilies().map(family => {
    if (family.id !== familyId) return family;
    return {
      ...family,
      verified: true,
      verificationStatus: "verified",
      kycVerified: true,
      kycDate: date,
      aadhaarMasked: kycDetails.aadhaarMasked || "XXXX-XXXX-4892",
      members: family.members.map(m => ({ ...m, status: "verified" })),
      verificationNotes: "UIDAI e-KYC ઓનલાઇન OTP દ્વારા પ્રમાણિત"
    };
  });
  localStorage.setItem("pravi-families", JSON.stringify(families));

  // If current logged-in user belongs to this family, update user session
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.familyId === familyId) {
    const updatedUser = {
      ...currentUser,
      isKycVerified: true,
      kycDate: date
    };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  }

  refreshStorage();
}

export function updateFamilyDetails(familyId, details) {
  const families = getFamilies().map(family => {
    if (family.id !== familyId) return family;
    return {
      ...family,
      ...details,
      income: details.income !== undefined ? Number(details.income) : family.income
    };
  });
  localStorage.setItem("pravi-families", JSON.stringify(families));
  refreshStorage();
}

export function updateUserProfile(userId, profileData) {
  const users = JSON.parse(localStorage.getItem("pravi-users") || "[]");
  const updatedUsers = users.map(u => (u.id === userId ? { ...u, ...profileData } : u));
  localStorage.setItem("pravi-users", JSON.stringify(updatedUsers));

  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    const newSession = { ...currentUser, ...profileData };
    localStorage.setItem("currentUser", JSON.stringify(newSession));
  }

  // If head name or mobile changed, update corresponding family
  if (currentUser?.familyId && (profileData.name || profileData.address)) {
    const families = getFamilies().map(f => {
      if (f.id !== currentUser.familyId) return f;
      return {
        ...f,
        head: profileData.name || f.head,
        address: profileData.address || f.address,
        district: profileData.district || f.district
      };
    });
    localStorage.setItem("pravi-families", JSON.stringify(families));
  }

  refreshStorage();
}

export function verifyDocument(familyId, docName, status = "ચકાસાયેલ") {
  const families = getFamilies().map(f => {
    if (f.id !== familyId) return f;
    const documents = f.documents || [
      { name: "રહેઠાણ પુરાવો", status: "બાકી" },
      { name: "આવક પ્રમાણપત્ર રેકોર્ડ", status: "બાકી" },
      { name: "પરિવાર સભ્ય ઓળખ", status: "બાકી" },
      { name: "રેશન કાર્ડ / આધાર", status: "બાકી" }
    ];
    const updatedDocs = documents.map(d =>
      d.name === docName ? { ...d, status, verifiedAt: new Date().toLocaleDateString("gu-IN") } : d
    );
    return { ...f, documents: updatedDocs };
  });
  localStorage.setItem("pravi-families", JSON.stringify(families));
  refreshStorage();
}

export function refreshStorage() {
  window.dispatchEvent(new Event("pravi-data"));
  window.dispatchEvent(new Event("storage"));
}