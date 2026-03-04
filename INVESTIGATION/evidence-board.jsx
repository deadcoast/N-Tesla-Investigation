import { useState } from "react";

const THREADS = {
  financial: { label: "FINANCIAL STRANGULATION", color: "#c0392b", icon: "₿" },
  reputational: { label: "REPUTATIONAL ARCHITECTURE", color: "#e67e22", icon: "◈" },
  technical: { label: "TECHNICAL DISMISSAL", color: "#f39c12", icon: "⚙" },
  surveillance: { label: "NETWORK CAPTURE", color: "#8e44ad", icon: "◉" },
  erasure: { label: "POSTHUMOUS ERASURE", color: "#2980b9", icon: "▲" },
};

const TIMELINE = [
  { year: 1895, label: "Wardenclyffe funded", thread: "financial" },
  { year: 1902, label: "Morgan withdraws", thread: "financial" },
  { year: 1904, label: "Marconi wins radio patent", thread: "reputational" },
  { year: 1917, label: "Wardenclyffe demolished", thread: "erasure" },
  { year: 1926, label: "Royalties surrendered", thread: "financial" },
  { year: 1934, label: "Tesla nearly destitute", thread: "financial" },
  { year: 1935, label: "Amtorg contract signed", thread: "surveillance" },
  { year: 1938, label: "British teleforce rejected", thread: "technical" },
  { year: 1942, label: "Spanel meets Fitzgerald", thread: "surveillance" },
  { year: 1943, label: "DEATH / SEIZURE", thread: "erasure", major: true },
  { year: 1943, label: "Marconi patent restored", thread: "reputational", note: "6 months after death" },
  { year: 1945, label: "Wright Field request denied", thread: "erasure" },
  { year: 1946, label: "Rath resigns", thread: "erasure" },
  { year: 1951, label: "Papers shipped to Belgrade?", thread: "erasure" },
  { year: 1957, label: "File still active", thread: "surveillance" },
  { year: 1983, label: "Papers lost — classified", thread: "erasure" },
];

const COILS = [
  {
    id: "financial",
    title: "COIL I — FINANCIAL STRANGULATION",
    color: "#c0392b",
    classification: "PATTERN CONFIRMED",
    items: [
      { text: "JP Morgan funds Wardenclyffe 1900, withdraws 1902", type: "fact", weight: "high" },
      { text: "Standard IP capture pattern: fund → own → abandon", type: "pattern", weight: "high" },
      { text: "Tesla surrenders $12M in Westinghouse royalties", type: "fact", weight: "critical" },
      { text: "Was royalty cancellation truly voluntary or coerced?", type: "question", weight: "high" },
      { text: "Czechoslovak gov't pays $500/month subsistence — barely survival", type: "fact", weight: "medium" },
      { text: "Kosanovich received $1,250/month from Yugoslav gov't", type: "fact", weight: "medium" },
      { text: "Tesla kept poor enough to survive, not enough to complete work", type: "pattern", weight: "critical" },
      { text: "MOTIVE: Wireless power destroys utility industry's entire business model", type: "motive", weight: "critical" },
    ],
    missed: "The Westinghouse royalty story is told as noble self-sacrifice. But $12M surrendered = mechanism of permanent poverty. Who benefited from framing this as heroism rather than examining whether it was coerced?",
    nextLayer: "Westinghouse corporate archive, Pittsburgh. Morgan Papers, Pierpont Morgan Library. Utility industry lobbying records 1910-1940.",
  },
  {
    id: "reputational",
    title: "COIL II — REPUTATIONAL ARCHITECTURE",
    color: "#e67e22",
    classification: "PATTERN CONFIRMED",
    items: [
      { text: '"Very eccentric if not mentally deranged" — hotel managers, Jan 8 1943 teletype', type: "fact", weight: "critical" },
      { text: "This language entered federal files THE NIGHT OF HIS DEATH before any investigation", type: "pattern", weight: "critical" },
      { text: "Tesla listed on American Slav Congress National Board — Communist-org association", type: "fact", weight: "high" },
      { text: "Amtorg contract ($25,000 paid) in federal files = Soviet agent framing available on demand", type: "fact", weight: "critical" },
      { text: "Czechoslovak pension = Axis-adjacent funding frame (never activated, but held)", type: "pattern", weight: "high" },
      { text: '"Pigeon feeder" / eccentric myth solidified posthumously when he couldn\'t refute it', type: "pattern", weight: "medium" },
      { text: "Marconi radio patent RESTORED TO TESLA — June 1943. Tesla died January 1943.", type: "fact", weight: "critical" },
      { text: "Supreme Court ruled in Tesla's favor the same year his papers were seized. He never knew.", type: "pattern", weight: "critical" },
    ],
    missed: "The Marconi patent restoration in June 1943 has been treated as a legal footnote. It was the vindication Tesla spent decades fighting for, issued 6 months after his death, the same year as the seizure. The timing inverts the 'failed inventor' narrative entirely — and was buried.",
    nextLayer: "Marconi patent litigation records NARA. Who funded Marconi's patent defense? Utility industry contributions to Marconi patent fight.",
  },
  {
    id: "technical",
    title: "COIL III — TECHNICAL DISMISSAL",
    color: "#f39c12",
    classification: "DOCUMENTED — INTERNAL CONTRADICTION",
    items: [
      { text: 'Trump: "past fifteen years... speculative, philosophical, promotional" — covers 1928-1943', type: "fact", weight: "critical" },
      { text: "1928-1943 = EXACTLY the period of Amtorg contract, British offers, teleforce development", type: "pattern", weight: "critical" },
      { text: "Trump dismissal in SAME document that abstracts $25,000 Amtorg teleforce contract", type: "pattern", weight: "critical" },
      { text: "Hotel basement trunks (10 years untouched) explicitly NOT examined", type: "fact", weight: "high" },
      { text: "Governor Clinton Hotel safe deposit box (working model, $10,000+) NOT examined", type: "fact", weight: "high" },
      { text: "Evaluation completed in 3 days — sufficient for dismissal, insufficient for discovery", type: "pattern", weight: "high" },
      { text: "Trump was Division 14 NDRC — radar. Not directed energy. Not Tesla's field.", type: "fact", weight: "medium" },
      { text: "British government 1936-1938 teleforce negotiation (4 letters, 1 reply) — never publicly disclosed", type: "fact", weight: "high" },
      { text: "US, UK, Soviet, Yugoslav ALL rejected teleforce simultaneously — statistical anomaly", type: "pattern", weight: "critical" },
    ],
    missed: "Every major government Tesla approached about teleforce rejected or stalled him during the same 1934-1943 window. The probability that this represents independent technical judgment rather than coordinated suppression requires calculation. One rejection is plausible. Five simultaneous rejections from adversarial powers is a pattern.",
    nextLayer: "Trump's NDRC Division 14 records. British Foreign Office files on Tesla teleforce negotiations 1936-1938 (UK National Archives, Kew). Yugoslav government-in-exile correspondence.",
  },
  {
    id: "surveillance",
    title: "COIL IV — NETWORK CAPTURE",
    color: "#8e44ad",
    classification: "OPERATIONAL — CONFIRMED",
    items: [
      { text: "Kosanovich: FBI file, surveillance, investigated as espionage agent", type: "fact", weight: "high" },
      { text: "Fitzgerald: Army surveillance, blocked from commission, career controlled by Spanel", type: "fact", weight: "high" },
      { text: "Spanel: Multiple informants, Communist allegations, libel suit, Senate communications suppressed", type: "fact", weight: "high" },
      { text: "American Slav Congress: 40+ informants, nationwide surveillance apparatus", type: "fact", weight: "medium" },
      { text: "Margaret Storm: 1957 newsletter triggers FBI report — 14 years after death", type: "fact", weight: "medium" },
      { text: "Adamic: Connecting node for entire network. Died August 1951. Ruled suicide.", type: "fact", weight: "high" },
      { text: "Kosanovich meets confirmed Soviet spy Silvermaster, Dec 11 1946 — Tesla papers still in US storage", type: "fact", weight: "critical" },
      { text: "Anyone who pushed Tesla's legacy got surveillance apparatus turned on them", type: "pattern", weight: "critical" },
      { text: "Network contamination: link anyone to Communist org or Soviet contact to delegitimize them", type: "pattern", weight: "critical" },
    ],
    missed: "Louis Adamic died August 4, 1951 — 5 months before Tesla's effects were shipped to Belgrade, 10 months after Kosanovich's ambassadorship ended. Adamic was the connective tissue between Kosanovich, Yugoslav relief networks, and American Slavic intellectual life. His death eliminated the primary witness who could have spoken to what Kosanovich knew about the papers.",
    nextLayer: "Adamic death investigation records (NJ State). Adamic Papers, Princeton Mudd Library. Venona intercepts for Kosanovich-Silvermaster meeting. Adamic-Kosanovich correspondence.",
  },
  {
    id: "erasure",
    title: "COIL V — POSTHUMOUS ERASURE",
    color: "#2980b9",
    classification: "ACTIVE — UNRESOLVED",
    items: [
      { text: "Navy microfilmed ALL papers — confirmed Nichols-Tolson private memo 1951", type: "fact", weight: "critical" },
      { text: "Public narrative: FBI not involved. Internal: Navy got everything.", type: "pattern", weight: "critical" },
      { text: "Hotel basement trunks (10 years, untouched) — never examined, fate unknown", type: "fact", weight: "critical" },
      { text: "30 barrels/bundles (pre-1934 warehouse) — status unresolved in all inventories", type: "fact", weight: "high" },
      { text: "80 trunks (Tesla to Fitzgerald) → 75 (Oct 1945) → 60 shipped Belgrade (1951)", type: "fact", weight: "high" },
      { text: "Working model, Governor Clinton Hotel safe deposit — never recovered in any record", type: "fact", weight: "critical" },
      { text: "1983 classified memo: papers reportedly OAPC → WPAFB Equipment Lab (now closed)", type: "fact", weight: "critical" },
      { text: "1983: US government cannot locate papers 40 years after seizure", type: "fact", weight: "critical" },
      { text: "Edison Medal: missing from safe 1943-1951 transit. Never found.", type: "fact", weight: "medium" },
    ],
    missed: "The 1943 Supreme Court radio patent restoration is the legal proof that the 'failed inventor' framing was false. The timing of the APC seizure (January 1943) and the patent restoration (June 1943) in the same year suggests the legal victory was known to be imminent — and the seizure may have been timed to capture the papers before Tesla's vindication could fuel public interest in his work.",
    nextLayer: "NARA RG131 (OAPC) for original Amtorg contract and hotel basement trunk inventory. NARA RG340 (Air Force) for WPAFB Equipment Lab successor. Venona program records for complete Kosanovich intelligence picture.",
  },
];

const MISSED = [
  {
    title: "THE MARCONI TIMING",
    text: "Tesla's radio patent was restored by the Supreme Court in June 1943 — six months after his death. This vindication was the legal conclusion of a 39-year fight. The APC seized his papers in January 1943. Tesla was legally vindicated the same year he died and his work was seized. He never knew. History treats this as coincidence.",
    weight: "CRITICAL OVERSIGHT",
  },
  {
    title: "THE SIMULTANEOUS REJECTIONS",
    text: "Tesla offered teleforce to: the United States government (declined), the British government (rejected 1938), the Soviet government (paid $25,000 then ignored), the Yugoslav government (subsidized but never funded development). All four governments — including two who were active adversaries — declined simultaneously between 1934-1943. This is not independent assessment. This is coordination.",
    weight: "STATISTICAL ANOMALY",
  },
  {
    title: "THE POVERTY MECHANICS",
    text: "$500/month from Czechoslovakia. $12M in Westinghouse royalties surrendered. Wardenclyffe funding withdrawn. Three separate mechanisms converged to ensure Tesla remained at survival level — too poor to complete work, too subsistence-funded to die. Who benefits from an inventor who is alive but unable to build?",
    weight: "STRUCTURAL PATTERN",
  },
  {
    title: "THE ECCENTRIC MANUFACTURING",
    text: "'Very eccentric if not mentally deranged' — this language appeared in the FBI file on January 8, 1943, sourced from hotel management, the same night Tesla died. It was entered into the federal record before any investigation. The 'pigeon feeder' myth, the 'deranged recluse' narrative — all solidified posthumously, when he could not refute them.",
    weight: "NARRATIVE CONSTRUCTION",
  },
  {
    title: "THE FRAMING WEAPON",
    text: "The Amtorg contract ($25,000, teleforce specs, signed 1935) is documented in federal files. The ASC membership is documented in federal files. The Czechoslovak pension is documented in federal files. None of these were used against Tesla in his lifetime — but all are available as posthumous contamination. Anyone who investigates and gets too close can be associated with 'a man who took Soviet money and attended Communist meetings.'",
    weight: "PRESERVED FRAME",
  },
  {
    title: "THE ADAMIC ELIMINATION",
    text: "Louis Adamic was the connective tissue between Tesla's Yugoslav-American network, Kosanovich, the relief organizations, and American intellectual circles. He died August 4, 1951 — ruled suicide. Five months before the Tesla effects were shipped to Belgrade. Ten months after Kosanovich's ambassadorship ended. The timing removes the primary witness at the moment when accounting for the papers' disposition would have been possible.",
    weight: "SUSPICIOUS TIMING",
  },
];

const NEXT_LAYERS = [
  { target: "Pierpont Morgan Library", content: "Morgan-Tesla correspondence 1900-1905. What did Morgan say when he withdrew Wardenclyffe funding? What did he know?", priority: "HIGH" },
  { target: "Westinghouse Corporate Archive", content: "The royalty cancellation documents. Was it Tesla's free act or was it negotiated under duress? Who witnessed it?", priority: "HIGH" },
  { target: "UK National Archives (Kew)", content: "British Foreign Office files on Tesla's 1936-1938 teleforce proposals. Four letters sent. One polite rejection received. What happened in between?", priority: "HIGH" },
  { target: "Princeton Mudd Library", content: "Louis Adamic Papers. His correspondence with Kosanovich, Fitzgerald, Tesla-adjacent figures. His notes on the Belgrade shipment timeline.", priority: "HIGH" },
  { target: "NARA RG131 (OAPC)", content: "Original signed Amtorg contract. Hotel basement trunk inventory. Complete Tesla estate accounting.", priority: "CRITICAL" },
  { target: "NARA RG340 (Air Force)", content: "WPAFB Equipment Lab organizational history. What became of it? Where did its records go?", priority: "CRITICAL" },
  { target: "Marconi Patent Litigation Records", content: "Who funded the 39-year fight against Tesla's radio patent? Utility industry contributions? Edison interests?", priority: "MEDIUM" },
  { target: "Venona Program / NSA", content: "Kosanovich-Silvermaster December 1946 meeting. What do the intercepts say? Was Tesla's estate discussed?", priority: "HIGH" },
];

const typeColors = {
  fact: "#a8d8a8",
  pattern: "#f4d03f",
  question: "#aed6f1",
  motive: "#f1948a",
};

export default function CoiledLiesBoard() {
  const [activeCoil, setActiveCoil] = useState(null);
  const [activeTab, setActiveTab] = useState("coils");

  const coil = activeCoil ? COILS.find(c => c.id === activeCoil) : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a08",
      backgroundImage: `
        radial-gradient(circle at 20% 20%, rgba(139,0,0,0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(25,25,112,0.05) 0%, transparent 50%),
        url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.01'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
      `,
      fontFamily: "'Courier New', Courier, monospace",
      color: "#e8e0d0",
      padding: "0",
    }}>
      {/* HEADER */}
      <div style={{
        borderBottom: "2px solid #c0392b",
        padding: "24px 32px 20px",
        background: "rgba(0,0,0,0.6)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(192,57,43,0.03) 2px, rgba(192,57,43,0.03) 4px)",
          pointerEvents: "none",
        }} />
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, color: "#c0392b", marginBottom: 6 }}>
              WARDENCLYFFE INVESTIGATION — CASE FILE 100-2237 — ACTIVE
            </div>
            <h1 style={{
              fontSize: 36,
              fontWeight: 900,
              letterSpacing: 2,
              margin: 0,
              fontFamily: "'Courier New', monospace",
              color: "#fff",
              textShadow: "0 0 40px rgba(192,57,43,0.4)",
            }}>
              COILED LIES
            </h1>
            <div style={{ fontSize: 14, color: "#c0a060", letterSpacing: 3, marginTop: 4 }}>
              THE TRAGIC FRAMING OF NIKOLA TESLA
            </div>
          </div>
          <div style={{
            textAlign: "right",
            fontSize: 10,
            color: "#666",
            lineHeight: 2,
          }}>
            <div style={{ color: "#c0392b", fontWeight: "bold" }}>⬛ FIVE COILS IDENTIFIED</div>
            <div>20 ACTIVE LEADS</div>
            <div>27 OPEN QUESTIONS</div>
            <div>SOURCES: FBI 100-2237 (3 parts)</div>
            <div>PERIOD: 1895 — 1983</div>
          </div>
        </div>

        {/* TIMELINE */}
        <div style={{ marginTop: 20, overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", minWidth: 800, gap: 0, position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "#333" }} />
            {TIMELINE.map((t, i) => (
              <div key={i} style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                zIndex: 2,
              }}>
                <div style={{
                  width: t.major ? 12 : 7,
                  height: t.major ? 12 : 7,
                  borderRadius: "50%",
                  background: t.major ? "#c0392b" : THREADS[t.thread]?.color || "#555",
                  border: t.major ? "2px solid #ff6b6b" : "none",
                  boxShadow: t.major ? "0 0 12px rgba(192,57,43,0.8)" : "none",
                  marginBottom: 4,
                }} />
                <div style={{
                  fontSize: t.major ? 11 : 9,
                  color: t.major ? "#c0392b" : "#888",
                  textAlign: "center",
                  fontWeight: t.major ? "bold" : "normal",
                  maxWidth: 60,
                  lineHeight: 1.2,
                }}>
                  <div>{t.year}</div>
                  <div style={{ fontSize: 8, opacity: 0.8 }}>{t.note || ""}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", borderBottom: "1px solid #222", background: "rgba(0,0,0,0.4)" }}>
        {[
          { id: "coils", label: "THE FIVE COILS" },
          { id: "missed", label: "WHAT HISTORY MISSED" },
          { id: "next", label: "NEXT INVESTIGATION LAYER" },
          { id: "synthesis", label: "THE LARGER PICTURE" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "12px 20px",
            background: activeTab === tab.id ? "rgba(192,57,43,0.15)" : "transparent",
            border: "none",
            borderBottom: activeTab === tab.id ? "2px solid #c0392b" : "2px solid transparent",
            color: activeTab === tab.id ? "#e8e0d0" : "#666",
            cursor: "pointer",
            fontSize: 11,
            letterSpacing: 2,
            fontFamily: "'Courier New', monospace",
            transition: "all 0.2s",
          }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "24px 32px" }}>

        {/* COILS TAB */}
        {activeTab === "coils" && (
          <div>
            <div style={{ fontSize: 11, color: "#666", letterSpacing: 2, marginBottom: 20 }}>
              SELECT A COIL TO EXPAND — EACH COIL IS A STRAND OF THE FRAMING ARCHITECTURE
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
              {COILS.map(coil => (
                <div key={coil.id}
                  onClick={() => setActiveCoil(activeCoil === coil.id ? null : coil.id)}
                  style={{
                    border: `1px solid ${activeCoil === coil.id ? coil.color : "#333"}`,
                    borderTop: `3px solid ${coil.color}`,
                    padding: "16px 12px",
                    cursor: "pointer",
                    background: activeCoil === coil.id ? `rgba(${hexToRgb(coil.color)},0.08)` : "rgba(255,255,255,0.02)",
                    transition: "all 0.2s",
                    position: "relative",
                  }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: coil.color, marginBottom: 8 }}>
                    {coil.classification}
                  </div>
                  <div style={{ fontSize: 11, lineHeight: 1.4, color: "#e8e0d0", fontWeight: "bold" }}>
                    {coil.title}
                  </div>
                  <div style={{ fontSize: 10, color: "#666", marginTop: 8 }}>
                    {coil.items.length} evidence items ▼
                  </div>
                </div>
              ))}
            </div>

            {coil && (
              <div style={{
                border: `1px solid ${coil.color}`,
                background: `rgba(${hexToRgb(coil.color)},0.05)`,
                padding: 24,
                animation: "fadeIn 0.2s ease",
              }}>
                <h2 style={{ color: coil.color, margin: "0 0 16px", fontSize: 16, letterSpacing: 2 }}>
                  {coil.title}
                </h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 24 }}>
                  {coil.items.map((item, i) => (
                    <div key={i} style={{
                      background: "rgba(0,0,0,0.4)",
                      borderLeft: `3px solid ${typeColors[item.type] || "#555"}`,
                      padding: "8px 12px",
                      fontSize: 11,
                      lineHeight: 1.5,
                      color: item.weight === "critical" ? "#fff" : item.weight === "high" ? "#ddd" : "#aaa",
                      position: "relative",
                    }}>
                      {item.weight === "critical" && (
                        <span style={{ color: "#c0392b", fontSize: 9, display: "block", marginBottom: 2, letterSpacing: 1 }}>
                          ◆ CRITICAL
                        </span>
                      )}
                      {item.text}
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div style={{ background: "rgba(0,0,0,0.4)", padding: 16, border: "1px solid #333" }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: "#e67e22", marginBottom: 8 }}>
                      WHAT HISTORY MISSED
                    </div>
                    <div style={{ fontSize: 11, lineHeight: 1.7, color: "#ccc" }}>
                      {coil.missed}
                    </div>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.4)", padding: 16, border: "1px solid #333" }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: "#2980b9", marginBottom: 8 }}>
                      NEXT INVESTIGATION LAYER
                    </div>
                    <div style={{ fontSize: 11, lineHeight: 1.7, color: "#ccc" }}>
                      {coil.nextLayer}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Legend */}
            <div style={{ display: "flex", gap: 16, marginTop: 20, flexWrap: "wrap" }}>
              {Object.entries(typeColors).map(([type, color]) => (
                <div key={type} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 12, height: 12, background: color, opacity: 0.8 }} />
                  <span style={{ fontSize: 10, color: "#888", letterSpacing: 1, textTransform: "uppercase" }}>{type}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MISSED TAB */}
        {activeTab === "missed" && (
          <div>
            <div style={{ fontSize: 11, color: "#666", letterSpacing: 2, marginBottom: 20 }}>
              EVIDENCE THAT EXISTS BUT HAS BEEN OVERLOOKED, FRAMED AS FOOTNOTE, OR DELIBERATELY BURIED
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {MISSED.map((item, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid #333",
                  borderLeft: "3px solid #e67e22",
                  padding: 20,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "flex-start" }}>
                    <div style={{ fontSize: 12, fontWeight: "bold", color: "#e8e0d0", letterSpacing: 1 }}>
                      {item.title}
                    </div>
                    <div style={{
                      fontSize: 8,
                      letterSpacing: 1,
                      padding: "2px 6px",
                      background: "rgba(230,126,34,0.2)",
                      color: "#e67e22",
                      whiteSpace: "nowrap",
                      marginLeft: 8,
                    }}>
                      {item.weight}
                    </div>
                  </div>
                  <div style={{ fontSize: 11, lineHeight: 1.8, color: "#bbb" }}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NEXT LAYER TAB */}
        {activeTab === "next" && (
          <div>
            <div style={{ fontSize: 11, color: "#666", letterSpacing: 2, marginBottom: 20 }}>
              ARCHIVE TARGETS BEYOND THE FBI VAULT — THE UNEXPLORED RECORD
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {NEXT_LAYERS.map((item, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${item.priority === "CRITICAL" ? "#c0392b" : item.priority === "HIGH" ? "#e67e22" : "#555"}`,
                  padding: 20,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: "bold", color: "#e8e0d0" }}>
                      {item.target}
                    </div>
                    <div style={{
                      fontSize: 8,
                      letterSpacing: 1,
                      padding: "2px 8px",
                      background: item.priority === "CRITICAL" ? "rgba(192,57,43,0.3)" : "rgba(230,126,34,0.2)",
                      color: item.priority === "CRITICAL" ? "#ff6b6b" : "#e67e22",
                    }}>
                      {item.priority}
                    </div>
                  </div>
                  <div style={{ fontSize: 11, lineHeight: 1.8, color: "#bbb" }}>
                    {item.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SYNTHESIS TAB */}
        {activeTab === "synthesis" && (
          <div>
            <div style={{ fontSize: 11, color: "#666", letterSpacing: 2, marginBottom: 20 }}>
              THE ARCHITECTURE OF THE FRAME — HOW THE COILS WORK TOGETHER
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
              <div>
                <div style={{
                  background: "rgba(192,57,43,0.08)",
                  border: "1px solid #c0392b",
                  padding: 24,
                  marginBottom: 16,
                }}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#c0392b", marginBottom: 12 }}>
                    THE CENTRAL THESIS
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 2, color: "#e8e0d0", margin: 0 }}>
                    Tesla was not merely suppressed. He was <strong style={{ color: "#fff" }}>framed</strong>. The framing is architectural: five interlocking coils designed so that each one reinforces the others. Pull on any single thread and you encounter the others wound around it. This is why 80 years of inquiry has produced only fragments — the suppression mechanism is in the structure of the narrative itself.
                  </p>
                </div>

                <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #333", padding: 24, marginBottom: 16 }}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#e67e22", marginBottom: 12 }}>
                    HOW THE COILS INTERLOCK
                  </div>
                  {[
                    { from: "Financial Strangulation", to: "Reputational Architecture", how: "Poverty made him look like a failed inventor, not a suppressed one. No money = no lab = no proof." },
                    { from: "Reputational Architecture", to: "Technical Dismissal", how: "Trump's 'mentally deranged' framing in the hotel report pre-validated his 'speculative' evaluation. Circular reinforcement." },
                    { from: "Technical Dismissal", to: "Network Capture", how: "Because work was 'worthless,' anyone claiming otherwise — Fitzgerald, Spanel — could be labeled as naive or Soviet-sympathetic." },
                    { from: "Network Capture", to: "Posthumous Erasure", how: "Surveillance apparatus monitored everyone who might testify to the papers' existence or value. They were contained or discredited." },
                    { from: "Posthumous Erasure", to: "Financial Strangulation", how: "Missing papers prevent retroactive proof that the technology worked. No proof = the 'failed inventor' narrative holds forever." },
                  ].map((link, i) => (
                    <div key={i} style={{
                      display: "flex",
                      gap: 12,
                      marginBottom: 12,
                      padding: "10px 12px",
                      background: "rgba(255,255,255,0.02)",
                      borderLeft: "2px solid #555",
                    }}>
                      <div style={{ fontSize: 10, color: "#c0392b", minWidth: 160, lineHeight: 1.4 }}>
                        {link.from}<br /><span style={{ color: "#555" }}>→</span><br />{link.to}
                      </div>
                      <div style={{ fontSize: 11, color: "#aaa", lineHeight: 1.6 }}>{link.how}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #333", padding: 24 }}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#2980b9", marginBottom: 12 }}>
                    THE AUDIENCES FOR THE FRAME
                  </div>
                  {[
                    { audience: "Government investigators", frame: '"Trump evaluated it. Nothing there."' },
                    { audience: "Journalists & historians", frame: '"He was eccentric, mentally declining, feeding pigeons."' },
                    { audience: "Foreign governments claiming papers", frame: '"Kosanovich (pro-Soviet) has no legitimate claim."' },
                    { audience: "Scientists following Tesla's work", frame: '"Speculative, philosophical, promotional. Not groundbreaking."' },
                    { audience: "Anyone who pushes too hard", frame: '"Connected to Communist org. Soviet funding. Suspect."' },
                  ].map((a, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, marginBottom: 10, fontSize: 11 }}>
                      <div style={{ color: "#888", minWidth: 200 }}>{a.audience}</div>
                      <div style={{ color: "#ddd", fontStyle: "italic" }}>{a.frame}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #333", padding: 20, marginBottom: 16 }}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#8e44ad", marginBottom: 12 }}>
                    THE DIAGNOSTIC QUESTION
                  </div>
                  <p style={{ fontSize: 11, lineHeight: 1.9, color: "#ccc" }}>
                    If the technology was genuinely worthless, why was there:
                  </p>
                  <ul style={{ fontSize: 11, lineHeight: 2, color: "#ccc", paddingLeft: 16, margin: 0 }}>
                    <li>A 3-day urgency evaluation</li>
                    <li>Navy Intelligence with microfilm equipment</li>
                    <li>VP Wallace's office mobilized within hours</li>
                    <li>War Department calling FBI at 9am the next day</li>
                    <li>An active surveillance file open for 14+ years</li>
                    <li>A 1983 classified memo still hunting for the papers</li>
                    <li>Army scientists calling Tesla's death ray "the only defense against the atomic bomb"</li>
                  </ul>
                  <p style={{ fontSize: 11, lineHeight: 1.9, color: "#c0392b", marginTop: 12, fontWeight: "bold" }}>
                    The institutional behavior is not consistent with the official narrative.
                  </p>
                </div>

                <div style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #333", padding: 20, marginBottom: 16 }}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#f39c12", marginBottom: 12 }}>
                    THE AMTORG PARADOX
                  </div>
                  <p style={{ fontSize: 11, lineHeight: 1.8, color: "#ccc" }}>
                    Tesla signed a contract with Soviet intelligence infrastructure in 1935 and received $25,000. Trump found this contract, abstracted it, and dismissed the technology as "unworkable." The 1983 classified FBI memo found that Soviet directed energy programs were influenced by Tesla's work from Belgrade access. The same work that Trump called worthless influenced 40 years of Soviet weapons development.
                  </p>
                  <p style={{ fontSize: 11, lineHeight: 1.8, color: "#e67e22", marginTop: 8 }}>
                    Either Trump was wrong. Or the Soviets spent decades pursuing worthless science. One of these is true.
                  </p>
                </div>

                <div style={{ background: "rgba(192,57,43,0.08)", border: "1px solid #c0392b", padding: 20 }}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: "#c0392b", marginBottom: 12 }}>
                    THE TITLE EXPLAINED
                  </div>
                  <p style={{ fontSize: 11, lineHeight: 1.9, color: "#ccc" }}>
                    <strong style={{ color: "#fff" }}>Coiled</strong> — like the electromagnetic coil Tesla invented. Wound tight, each layer reinforcing the one beneath it. Energy stored inside, invisible from outside.
                  </p>
                  <p style={{ fontSize: 11, lineHeight: 1.9, color: "#ccc" }}>
                    <strong style={{ color: "#fff" }}>Lies</strong> — not simple falsehoods, but constructed realities. The eccentric. The Communist sympathizer. The failed inventor. The speculative thinker. Each one technically defensible. Each one functionally imprisoning.
                  </p>
                  <p style={{ fontSize: 11, lineHeight: 1.9, color: "#ccc" }}>
                    <strong style={{ color: "#fff" }}>Tragic</strong> — because Tesla knew. In his later years he knew the technology worked, he knew it was being kept from the world, and he had no mechanism to prove it. The frame was complete before his death and has held for 80 years after.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ borderTop: "1px solid #222", padding: "16px 32px", display: "flex", justifyContent: "space-between", fontSize: 10, color: "#444" }}>
        <span>WARDENCLYFFE V2 — INVESTIGATION DATABASE — 20 LEADS — 27 QUESTIONS OPEN</span>
        <span>FBI VAULT FILE 100-2237 — 3 PARTS ANALYZED — 1940-1983</span>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; }
      `}</style>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}