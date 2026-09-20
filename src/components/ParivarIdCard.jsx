import React from "react";
import { NationalEmblem } from "./NationalEmblem";
import { CheckCircle2, MapPin, Printer, QrCode, ShieldCheck, X } from "lucide-react";

export function ParivarIdCard({ family, user, onClose }) {
  if (!family) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div
        className="modalCard"
        style={{ maxWidth: "680px" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modalHead" style={{ background: "var(--navy)", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <NationalEmblem size={28} />
            <h2 style={{ color: "#fff", fontSize: "17px" }}>
              ગુજરાત સરકાર · ડિજિટલ પરિવાર ઓળખ પત્ર
            </h2>
          </div>
          <button className="modalClose" onClick={onClose} style={{ color: "#fff" }}>
            <X size={20} />
          </button>
        </div>

        <div className="modalBody" style={{ padding: "20px" }}>
          {/* Printable Card Container */}
          <div className="parivarDigitalCard" id="printable-parivar-card">
            {/* Top Official Banner with Tricolor strip */}
            <div className="cardTricolorStrip">
              <span style={{ background: "#ff671f" }}></span>
              <span style={{ background: "#ffffff" }}></span>
              <span style={{ background: "#046a38" }}></span>
            </div>

            <div className="cardHeader">
              <NationalEmblem size={44} />
              <div className="cardGovText">
                <h3>ગુજરાત સરકાર | GOVERNMENT OF GUJARAT</h3>
                <h4>ડિજિટલ પરિવાર ઓળખ પ્રમાણપત્ર (PARIVAR ID CARD)</h4>
                <p>પંચાયત, ગ્રામ ગૃહનિર્માણ અને ગ્રામ વિકાસ વિભાગ</p>
              </div>
              <div className="cardQrCode">
                <QrCode size={46} color="var(--navy)" />
                <small>GJ-VERIFIED</small>
              </div>
            </div>

            <div className="cardBody">
              <div className="cardMainInfo">
                <div className="cardIdBadge">
                  <span>પરિવાર ઓળખ સંખ્યા (Family ID)</span>
                  <strong>{family.id}</strong>
                </div>

                <div className="cardGrid">
                  <div>
                    <span>પરિવારના મુખ્ય સભ્ય:</span>
                    <strong>{family.head}</strong>
                  </div>
                  <div>
                    <span>ચકાસણી સ્થિતિ:</span>
                    <strong style={{ color: "var(--green)" }}>
                      ✓ સત્તાવાર ચકાસાયેલ (UIDAI e-KYC)
                    </strong>
                  </div>
                  <div>
                    <span>જિલ્લો:</span>
                    <strong>{family.district}</strong>
                  </div>
                  <div>
                    <span>તાલુકો / ગામ:</span>
                    <strong>{family.taluka || "ગાંધીનગર"} / {family.village || "સેક્ટર 21"}</strong>
                  </div>
                  <div>
                    <span>કુલ સભ્યોની સંખ્યા:</span>
                    <strong>{family.members.length} સભ્યો</strong>
                  </div>
                  <div>
                    <span>રહેઠાણ સરનામું:</span>
                    <strong>{family.address}</strong>
                  </div>
                </div>
              </div>

              {/* Members Mini Table */}
              <div className="cardMembersList">
                <span className="cardSectionTitle">પરિવારના નોંધાયેલ સભ્યો:</span>
                <div className="cardMembersChips">
                  {family.members.map((m, idx) => (
                    <div className="cardMemberChip" key={m.id || idx}>
                      <strong>{m.name}</strong> ({m.relation}, {m.age}વર્ષ)
                      <span className="memberVerifiedCheck">✓</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Security Marks */}
              <div className="cardFooter">
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <ShieldCheck size={16} color="var(--green)" />
                  <span>ડિજિટલી પ્રમાણિત સત્તાવાર સરકારી રેકોર્ડ</span>
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>
                  તારીખ: {family.kycDate || new Date().toLocaleDateString("gu-IN")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modalFoot" style={{ justifyContent: "space-between" }}>
          <span style={{ fontSize: "12px", color: "var(--muted)" }}>
            આ કાર્ડ તમામ સરકારી કલ્યાણકારી યોજનાઓ માટે માન્ય છે.
          </span>
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="button" className="secondary" onClick={onClose}>
              બંધ કરો
            </button>
            <button type="button" className="primary" onClick={handlePrint}>
              <Printer size={16} /> પ્રિન્ટ / ડાઉનલોડ (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParivarIdCard;
