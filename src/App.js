import { useState, useEffect, useRef } from "react";

const plan = [
  { day: 1, week: 1, phase: "Foundation", subject: "English", topic: "Grammar Basics", subtitle: "Parts of Speech & Sentence Structure", tasks: ["Revise Nouns, Pronouns, Adjectives, Verbs", "Practice 20 fill-in-the-blank grammar questions", "Note common errors in usage"], hours: "2h", weight: "HIGH", weightTopics: ["Subject-Verb Agreement", "Parts of Speech", "Sentence Formation"], tip: "5–8 questions every year. Master this first." },
  { day: 2, week: 1, phase: "Foundation", subject: "English", topic: "Tenses & Voice", subtitle: "Active / Passive", tasks: ["Learn all 12 tense forms with examples", "Convert 15 Active sentences to Passive", "Attempt a 10-question tense quiz"], hours: "2h", weight: "HIGH", weightTopics: ["Tense Errors", "Active-Passive Conversion", "Verb Forms"], tip: "Frequently tested in error spotting & fill-in-the-blanks." },
  { day: 3, week: 1, phase: "Foundation", subject: "GK", topic: "Indian History I", subtitle: "Ancient & Medieval India", tasks: ["Study major dynasties (Maurya, Gupta, Mughal)", "Note key rulers and their contributions", "Attempt 15 MCQs on ancient history"], hours: "2.5h", weight: "HIGH", weightTopics: ["Maurya Empire", "Gupta Period", "Mughal Dynasty", "Delhi Sultanate"], tip: "10–12 history questions appear in every CDS paper." },
  { day: 4, week: 1, phase: "Foundation", subject: "GK", topic: "Indian History II", subtitle: "Modern India & Freedom Struggle", tasks: ["1857 revolt, INC formation, Gandhi era", "Key events: Non-Cooperation, Quit India", "Practice 15 MCQs"], hours: "2.5h", weight: "CRITICAL", weightTopics: ["Gandhi Movements", "1857 Revolt", "INC Sessions", "Important Acts"], tip: "Highest weightage in History. Never skip this." },
  { day: 5, week: 1, phase: "Foundation", subject: "English", topic: "Vocabulary", subtitle: "Synonyms, Antonyms & Word Power", tasks: ["Learn 30 high-frequency words", "Practice synonym/antonym exercises", "Use flashcards or sticky notes"], hours: "2h", weight: "MEDIUM", weightTopics: ["Synonyms", "Antonyms", "One-word Substitution"], tip: "4–6 direct vocab questions per paper." },
  { day: 6, week: 1, phase: "Foundation", subject: "GK", topic: "Indian Geography", subtitle: "Physical Features of India", tasks: ["Rivers, mountains, plains of India", "Climate zones and vegetation", "Attempt 15 MCQs on physical geography"], hours: "2.5h", weight: "HIGH", weightTopics: ["Rivers & Tributaries", "Mountain Ranges", "Soils & Climate", "National Parks"], tip: "Geography = 8–10 questions per paper. Rivers most tested." },
  { day: 7, week: 1, phase: "Foundation", subject: "Revision", topic: "Weekly Debrief", subtitle: "Revision + Mock Test", tasks: ["Revise all Week 1 topics", "Attempt 30-question mixed mock test", "Identify weak areas and note them"], hours: "3h", weight: "MEDIUM", weightTopics: ["Mock Test Analysis", "Weak Area Identification"], tip: "Track your score today. It's your baseline." },
  { day: 8, week: 2, phase: "Building", subject: "English", topic: "Comprehension", subtitle: "Reading Passages", tasks: ["Read 2 passages and answer questions", "Focus on inference and tone-based questions", "Time yourself (10 mins per passage)"], hours: "2h", weight: "CRITICAL", weightTopics: ["Reading Comprehension", "Inference Questions", "Tone & Theme", "Vocabulary in Context"], tip: "25–30 marks from comprehension alone. Practice daily." },
  { day: 9, week: 2, phase: "Building", subject: "GK", topic: "Indian Polity", subtitle: "Constitution & Fundamental Rights", tasks: ["Preamble, Fundamental Rights, DPSP", "President, PM, Parliament roles", "Practice 15 polity MCQs"], hours: "2.5h", weight: "CRITICAL", weightTopics: ["Fundamental Rights", "DPSP", "Parliament Structure", "Constitutional Articles"], tip: "Polity = 10–15 questions every CDS paper. Must-do." },
  { day: 10, week: 2, phase: "Building", subject: "English", topic: "Error Spotting", subtitle: "Sentence Correction", tasks: ["Learn common grammatical errors", "Practice 20 error-spotting questions", "Focus on subject-verb agreement"], hours: "2h", weight: "HIGH", weightTopics: ["Subject-Verb Errors", "Pronoun Errors", "Preposition Misuse", "Article Errors"], tip: "10–12 error spotting questions in every CDS English paper." },
  { day: 11, week: 2, phase: "Building", subject: "GK", topic: "Indian Economy", subtitle: "GDP, Budget & Policy Basics", tasks: ["GDP, inflation, budget terminology", "Five Year Plans & NITI Aayog", "Attempt 15 economy MCQs"], hours: "2.5h", weight: "HIGH", weightTopics: ["Budget Terms", "Inflation & GDP", "NITI Aayog", "Banking Basics"], tip: "5–8 economy questions. Focus on terminology & recent policy." },
  { day: 12, week: 2, phase: "Building", subject: "English", topic: "Sentence Ordering", subtitle: "Jumbled Paragraphs", tasks: ["Practice 20 sentence-ordering questions", "Learn transition words & connectors", "Focus on logical flow"], hours: "2h", weight: "MEDIUM", weightTopics: ["Paragraph Coherence", "Transition Words", "Logical Sequencing"], tip: "3–5 questions per paper. Easy marks if practiced regularly." },
  { day: 13, week: 2, phase: "Building", subject: "GK", topic: "World Geography", subtitle: "Continents, Oceans & Environment", tasks: ["Continents, oceans, important countries", "Climate change basics, national parks", "Practice 15 MCQs"], hours: "2.5h", weight: "MEDIUM", weightTopics: ["World Capitals", "Oceans & Straits", "Climate Zones", "Environmental Treaties"], tip: "4–6 questions. Focus on straits, capitals & treaties." },
  { day: 14, week: 2, phase: "Building", subject: "Revision", topic: "Weekly Debrief", subtitle: "Revision + Mock Test", tasks: ["Revise all Week 2 topics", "Attempt 40-question mixed mock test", "Review errors and re-study weak areas"], hours: "3h", weight: "MEDIUM", weightTopics: ["Mock Test Analysis", "Error Log Review"], tip: "Compare with Week 1 score. You should see improvement." },
  { day: 15, week: 3, phase: "Acceleration", subject: "English", topic: "Idioms & Phrases", subtitle: "One-word Substitutions", tasks: ["Learn 25 common idioms & phrases", "Practice 20 one-word substitution questions", "Make a mini-dictionary"], hours: "2h", weight: "HIGH", weightTopics: ["Common Idioms", "Phrasal Verbs", "One-word Substitutions"], tip: "6–8 direct questions. Memorise top-50 CDS idiom list." },
  { day: 16, week: 3, phase: "Acceleration", subject: "GK", topic: "Science — Physics & Chemistry", subtitle: "Laws, Reactions & Concepts", tasks: ["Laws of motion, optics, electricity basics", "Acids, bases, salts, chemical reactions", "Practice 15 science MCQs"], hours: "2.5h", weight: "HIGH", weightTopics: ["Newton's Laws", "Optics & Sound", "Acid-Base Reactions", "Periodic Table Basics"], tip: "Science = 15–20 questions total. Physics & Chemistry combined." },
  { day: 17, week: 3, phase: "Acceleration", subject: "English", topic: "Articles & Prepositions", subtitle: "Conjunctions & Usage Rules", tasks: ["Rules of articles (a, an, the)", "Common preposition errors", "Attempt 20 practice questions"], hours: "2h", weight: "MEDIUM", weightTopics: ["Article Rules", "Preposition Usage", "Conjunction Types"], tip: "4–5 questions appear in error spotting & fill-in-the-blanks." },
  { day: 18, week: 3, phase: "Acceleration", subject: "GK", topic: "Science — Biology", subtitle: "Human Body & Health", tasks: ["Human body systems, diseases, vitamins", "Important scientific inventions", "Attempt 15 biology MCQs"], hours: "2.5h", weight: "HIGH", weightTopics: ["Human Body Systems", "Diseases & Vitamins", "Cell Biology", "Nutrition"], tip: "Biology alone gives 8–10 questions. Diseases are most tested." },
  { day: 19, week: 3, phase: "Acceleration", subject: "English", topic: "Cloze Test", subtitle: "Fill in the Blanks", tasks: ["Practice 2 full cloze test passages", "Learn vocabulary in context", "Revise most common fill-in-the-blank traps"], hours: "2h", weight: "HIGH", weightTopics: ["Contextual Vocabulary", "Grammar in Context", "Cloze Passages"], tip: "10–15 marks from cloze tests. Accuracy matters here." },
  { day: 20, week: 3, phase: "Acceleration", subject: "GK", topic: "Current Affairs", subtitle: "Last 6 Months Briefing", tasks: ["Sports, awards, appointments, summits", "Defence & national security news", "Attempt 20 current affairs MCQs"], hours: "2.5h", weight: "CRITICAL", weightTopics: ["Defence News", "Awards & Appointments", "Sports Results", "Summits & Treaties"], tip: "15–20 current affairs questions every paper. Read daily news." },
  { day: 21, week: 3, phase: "Acceleration", subject: "Revision", topic: "Weekly Debrief", subtitle: "Full Mock Test", tasks: ["Take a full-length 60-question mock test", "Analyse score and weak zones", "Revise notes for all Week 3 topics"], hours: "3.5h", weight: "MEDIUM", weightTopics: ["Mock Test Analysis", "Speed & Accuracy Check"], tip: "You should be hitting 65–70% accuracy by now." },
  { day: 22, week: 4, phase: "Final Push", subject: "English", topic: "Reported Speech", subtitle: "Direct & Indirect Narration", tasks: ["Rules for converting reported speech", "Practice 20 narration change questions", "Focus on tense shift rules"], hours: "2h", weight: "MEDIUM", weightTopics: ["Narration Rules", "Tense Backshift", "Reporting Verbs"], tip: "4–5 questions. Easy scoring if rules are memorised." },
  { day: 23, week: 4, phase: "Final Push", subject: "GK", topic: "Defence & Military GK", subtitle: "Indian Armed Forces & Wars", tasks: ["Indian Army ranks, regiments, history", "Important wars involving India", "UPSC CDS-specific defence MCQs"], hours: "2.5h", weight: "CRITICAL", weightTopics: ["Indian Army Structure", "India-Pakistan Wars", "Defence Exercises", "Military Awards"], tip: "CDS-specific topic. Expect 8–10 questions every paper." },
  { day: 24, week: 4, phase: "Final Push", subject: "English", topic: "Speed Drill", subtitle: "Comprehension + Vocabulary", tasks: ["3 comprehension passages in 30 minutes", "Revise all vocabulary flashcards", "Attempt 20 vocabulary MCQs"], hours: "2.5h", weight: "HIGH", weightTopics: ["Speed Reading", "Inference & Conclusion", "Contextual Vocabulary"], tip: "Build speed today. CDS English is time-pressured." },
  { day: 25, week: 4, phase: "Final Push", subject: "GK", topic: "Science & Technology", subtitle: "Space, IT & Modern Tech", tasks: ["ISRO missions, satellites, recent launches", "IT, AI, biotech developments in India", "Attempt 15 science & tech MCQs"], hours: "2.5h", weight: "HIGH", weightTopics: ["ISRO Missions", "Defence Technology", "Recent Scientific Discoveries", "IT & AI Policy"], tip: "5–8 questions. ISRO & defence tech are most frequently asked." },
  { day: 26, week: 4, phase: "Final Push", subject: "English", topic: "English Sprint", subtitle: "Full Grammar Revision", tasks: ["Revise all grammar rules in one sheet", "Attempt 40 English MCQs in 30 minutes", "Re-read all noted weak areas"], hours: "3h", weight: "HIGH", weightTopics: ["All Grammar Rules", "Error Spotting Sprint", "Vocabulary Revision"], tip: "Final grammar sweep. Focus only on your weak areas." },
  { day: 27, week: 4, phase: "Final Push", subject: "GK", topic: "GK Sprint", subtitle: "History · Polity · Economy Revision", tasks: ["Revise history, polity, economy notes", "Attempt 40 GK MCQs in 30 minutes", "Revise current affairs notes"], hours: "3h", weight: "HIGH", weightTopics: ["High-Weightage History", "Polity Articles", "Economy Terms", "Current Affairs"], tip: "Last GK push. Only revise — no new topics today." },
  { day: 28, week: 4, phase: "Final Push", subject: "Both", topic: "Mock Battle I", subtitle: "Full-Length Timed Test", tasks: ["100-question mock test under timed conditions", "Analyse each wrong answer carefully", "Note patterns in mistakes"], hours: "4h", weight: "CRITICAL", weightTopics: ["Full Syllabus", "Speed & Accuracy", "Exam Simulation"], tip: "Simulate real exam conditions. No phone, no breaks." },
  { day: 29, week: 4, phase: "Final Push", subject: "Both", topic: "Mock Battle II", subtitle: "Final Full-Length Test", tasks: ["Another 100-question mock test", "Focus on speed and accuracy balance", "Final revision of notes"], hours: "4h", weight: "CRITICAL", weightTopics: ["Weak Areas from Day 28", "Time Management", "Accuracy Over Speed"], tip: "Fix Day 28 mistakes. This is your final dress rehearsal." },
  { day: 30, week: 4, phase: "Final Push", subject: "Both", topic: "Mission Ready", subtitle: "Exam Day Preparation", tasks: ["Light revision only – no new topics", "Re-read key formula/rules sheets", "Rest well, stay confident & focused!"], hours: "1h", weight: "MEDIUM", weightTopics: ["Quick Formula Sheet", "Confidence Building", "Rest & Recovery"], tip: "Sleep by 10 PM. You are ready. Trust the process. 🪖" },
];

const subjStyle = {
  English:  { color: "#a8d060", bg: "rgba(168,208,96,0.1)",  border: "rgba(168,208,96,0.3)",  icon: "📖" },
  GK:       { color: "#f0c040", bg: "rgba(240,192,64,0.1)",  border: "rgba(240,192,64,0.3)",  icon: "🌐" },
  Revision: { color: "#f08050", bg: "rgba(240,128,80,0.1)",  border: "rgba(240,128,80,0.3)",  icon: "🎯" },
  Both:     { color: "#80c8f0", bg: "rgba(128,200,240,0.1)", border: "rgba(128,200,240,0.3)", icon: "⚔️" },
};

const weightStyle = {
  CRITICAL: { color: "#ff4444", bg: "rgba(255,68,68,0.15)",  border: "rgba(255,68,68,0.5)",  label: "🔥 CRITICAL" },
  HIGH:     { color: "#f0c040", bg: "rgba(240,192,64,0.12)", border: "rgba(240,192,64,0.45)", label: "⚡ HIGH WEIGHTAGE" },
  MEDIUM:   { color: "#a8d060", bg: "rgba(168,208,96,0.1)",  border: "rgba(168,208,96,0.35)", label: "✓ MEDIUM" },
};

const weekMeta = {
  1: { name: "FOUNDATION",   color: "#a8d060", icon: "🪖", desc: "Build the base. No shortcuts." },
  2: { name: "BUILDING",     color: "#f0c040", icon: "🛡️", desc: "Reinforce every position." },
  3: { name: "ACCELERATION", color: "#f08050", icon: "💥", desc: "Push the pace. Go harder." },
  4: { name: "FINAL PUSH",   color: "#ff5050", icon: "🚩", desc: "Storm the objective. Win." },
};

const DURATIONS = { focus: 25*60, short: 5*60, long: 15*60 };
const fmt = s => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
const fmtStudy = s => { const h=Math.floor(s/3600),m=Math.floor((s%3600)/60); return h>0?`${h}h ${m}m`:m>0?`${m}m ${s%60}s`:`${s}s`; };

const camoBg = `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='120' height='120' fill='%23111a08'/%3E%3Cellipse cx='30' cy='25' rx='22' ry='14' fill='%23182210' opacity='0.9'/%3E%3Cellipse cx='85' cy='15' rx='18' ry='12' fill='%23141e0a' opacity='0.8'/%3E%3Cellipse cx='60' cy='55' rx='25' ry='16' fill='%23192308' opacity='0.7'/%3E%3Cellipse cx='10' cy='70' rx='20' ry='13' fill='%231a2410' opacity='0.8'/%3E%3Cellipse cx='100' cy='65' rx='18' ry='14' fill='%23161e0c' opacity='0.7'/%3E%3Cellipse cx='45' cy='95' rx='24' ry='15' fill='%23182210' opacity='0.8'/%3E%3Cellipse cx='95' cy='100' rx='20' ry='12' fill='%231c2612' opacity='0.7'/%3E%3C/svg%3E")`;

// Load persisted timer state from localStorage
function loadState() {
  try { return JSON.parse(localStorage.getItem("cds_timer") || "{}"); }
  catch { return {}; }
}
function saveState(data) {
  try { localStorage.setItem("cds_timer", JSON.stringify(data)); } catch {}
}
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}
function loadDailyStats() {
  try {
    const raw = JSON.parse(localStorage.getItem("cds_daily") || "{}");
    // If saved date is today return it, otherwise start fresh
    if (raw.date === todayKey()) return raw;
    return { date: todayKey(), focus: 0, breakTime: 0 };
  } catch { return { date: todayKey(), focus: 0, breakTime: 0 }; }
}
function saveDailyStats(focus, breakTime) {
  try { localStorage.setItem("cds_daily", JSON.stringify({ date: todayKey(), focus, breakTime })); } catch {}
}

function FocusTimer({ onClose }) {
  const saved = loadState();
  const [mode, setMode] = useState(saved.mode || "focus");
  const [timeLeft, setTimeLeft] = useState(saved.timeLeft ?? DURATIONS[saved.mode || "focus"]);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(saved.sessions || 0);
  const [totalFocus, setTotalFocus] = useState(saved.totalFocus || 0);   // all-time
  const [totalBreak, setTotalBreak] = useState(saved.totalBreak || 0);   // all-time
  const daily = loadDailyStats();
  const [dailyFocus, setDailyFocus] = useState(daily.focus || 0);        // today only
  const [dailyBreak, setDailyBreak] = useState(daily.breakTime || 0);    // today only
  // savedTimes holds the paused timeLeft for EACH mode independently
  // e.g. { focus: 18*60+42, short: 5*60, long: 15*60 }
  const [savedTimes, setSavedTimes] = useState(
    saved.savedTimes || { focus: DURATIONS.focus, short: DURATIONS.short, long: DURATIONS.long }
  );
  const tRef = useRef(); const sRef = useRef();

  const total = DURATIONS[mode];
  const pct = ((total - timeLeft) / total) * 100;
  const r = 75; const circ = 2 * Math.PI * r;
  const modeColor = { focus: "#a8d060", short: "#f0c040", long: "#80c8f0" }[mode];
  const modeLabel = { focus: "MISSION", short: "RECON", long: "DEBRIEF" }[mode];

  // Persist everything to localStorage
  useEffect(() => {
    saveState({ mode, timeLeft, sessions, totalFocus, totalBreak, savedTimes });
  }, [mode, timeLeft, sessions, totalFocus, totalBreak, savedTimes]);

  // Persist daily stats separately (survives timer reset)
  useEffect(() => {
    saveDailyStats(dailyFocus, dailyBreak);
  }, [dailyFocus, dailyBreak]);

  useEffect(() => {
    if (running) {
      tRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(tRef.current);
            clearInterval(sRef.current);
            setRunning(false);
            if (mode === "focus") setSessions(s => s + 1);
            // Reset that mode's saved time back to full after completing
            setSavedTimes(prev => ({ ...prev, [mode]: DURATIONS[mode] }));
            return 0;
          }
          return t - 1;
        });
      }, 1000);
      sRef.current = setInterval(() => {
        if (mode === "focus") { setTotalFocus(s => s + 1); setDailyFocus(s => s + 1); }
        else { setTotalBreak(s => s + 1); setDailyBreak(s => s + 1); }
      }, 1000);
    } else {
      clearInterval(tRef.current);
      clearInterval(sRef.current);
      // When paused, snapshot current timeLeft into savedTimes for this mode
      setSavedTimes(prev => ({ ...prev, [mode]: timeLeft }));
    }
    return () => { clearInterval(tRef.current); clearInterval(sRef.current); };
  }, [running, mode]);

  // When switching modes: pause current, restore the saved time for the target mode
  const switchMode = m => {
    setRunning(false);
    // Save current position before switching
    setSavedTimes(prev => ({ ...prev, [mode]: timeLeft }));
    setMode(m);
    // Restore exactly where that mode was last left — or full duration if untouched
    setTimeLeft(savedTimes[m] ?? DURATIONS[m]);
  };

  const clearAll = () => {
    // Reset timer countdown & session count — but keep daily study total intact
    setSessions(0); setTotalFocus(0); setTotalBreak(0);
    setMode("focus"); setTimeLeft(DURATIONS.focus); setRunning(false);
    setSavedTimes({ focus: DURATIONS.focus, short: DURATIONS.short, long: DURATIONS.long });
    saveState({});
    // dailyFocus & dailyBreak are intentionally NOT reset here
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(4,8,2,0.95)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
      <div style={{width:"min(420px,100%)",background:"linear-gradient(145deg,#0d1a08,#111e0a)",border:"2px solid rgba(168,208,96,0.35)",borderRadius:"4px",padding:"clamp(1.2rem,4vw,2rem)",position:"relative",boxShadow:"0 0 60px rgba(0,0,0,0.8)"}}>
        {["tl","tr","bl","br"].map(p=>(
          <div key={p} style={{position:"absolute",[p[0]==="t"?"top":"bottom"]:"0",[p[1]==="l"?"left":"right"]:"0",width:"16px",height:"16px",borderTop:p[0]==="t"?"2px solid #a8d060":undefined,borderBottom:p[0]==="b"?"2px solid #a8d060":undefined,borderLeft:p[1]==="l"?"2px solid #a8d060":undefined,borderRight:p[1]==="r"?"2px solid #a8d060":undefined}}/>
        ))}
        <button onClick={()=>{ clearAll(); onClose(); }} style={{position:"absolute",top:"0.8rem",right:"0.8rem",background:"rgba(168,208,96,0.1)",border:"1px solid rgba(168,208,96,0.3)",color:"#a8d060",fontSize:"0.9rem",width:"28px",height:"28px",cursor:"pointer",lineHeight:1,borderRadius:"2px"}}>✕</button>

        <div style={{textAlign:"center",marginBottom:"1.2rem"}}>
          <div style={{fontSize:"clamp(0.88rem,2.2vw,1rem)",letterSpacing:"0.35em",color:"#a8d060",textTransform:"uppercase"}}>⚔ COMBAT FOCUS MODE ⚔</div>
        </div>

        <div style={{display:"flex",gap:"0.4rem",justifyContent:"center",marginBottom:"1.5rem",flexWrap:"wrap"}}>
          {[["focus","MISSION"],["short","RECON"],["long","DEBRIEF"]].map(([m,label])=>(
            <button key={m} onClick={()=>switchMode(m)} style={{padding:"0.35rem clamp(0.5rem,2vw,0.85rem)",border:`1px solid ${mode===m?modeColor+"90":"rgba(168,208,96,0.15)"}`,background:mode===m?modeColor+"22":"transparent",color:mode===m?modeColor:"#4a6030",fontSize:"clamp(0.88rem,2.2vw,1rem)",letterSpacing:"0.1em",cursor:"pointer",fontFamily:"'Courier New',monospace",borderRadius:"2px",transition:"all 0.2s"}}>
              {label}
            </button>
          ))}
        </div>

        <div style={{position:"relative",width:"clamp(160px,50vw,190px)",height:"clamp(160px,50vw,190px)",margin:"0 auto 1.5rem"}}>
          <svg width="100%" height="100%" viewBox="0 0 190 190" style={{transform:"rotate(-90deg)"}}>
            <circle cx="95" cy="95" r={r} fill="none" stroke="rgba(168,208,96,0.08)" strokeWidth="10"/>
            <circle cx="95" cy="95" r={r} fill="none" stroke={modeColor} strokeWidth="10"
              strokeDasharray={circ} strokeDashoffset={circ-(pct/100)*circ} strokeLinecap="butt"
              style={{transition:"stroke-dashoffset 0.9s linear, stroke 0.3s", filter:`drop-shadow(0 0 8px ${modeColor})`}}/>
          </svg>
          <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{fontSize:"clamp(2.5rem,9vw,3.4rem)",fontWeight:"bold",color:"#e8f0d0",fontFamily:"'Courier New',monospace",letterSpacing:"0.04em",textShadow:`0 0 20px ${modeColor}70`}}>{fmt(timeLeft)}</div>
            <div style={{fontSize:"clamp(0.82rem,2vw,0.9rem)",color:modeColor,letterSpacing:"0.2em",textTransform:"uppercase",marginTop:"0.2rem"}}>{modeLabel}</div>
          </div>
        </div>

        {/* Paused banner — shows when timer is mid-session but stopped */}
        {!running && timeLeft < DURATIONS[mode] && timeLeft > 0 && (
          <div style={{textAlign:"center",marginBottom:"0.7rem",padding:"0.45rem 0.8rem",border:"1px solid rgba(240,192,64,0.5)",background:"rgba(240,192,64,0.08)",borderRadius:"2px"}}>
            <span style={{fontSize:"clamp(0.72rem,2vw,0.82rem)",color:"#f0c040",letterSpacing:"0.15em",textTransform:"uppercase"}}>
              ⏸ PAUSED — {fmt(timeLeft)} remaining · tap RESUME to continue
            </span>
          </div>
        )}

        <div style={{display:"flex",gap:"0.6rem",justifyContent:"center",marginBottom:"1.4rem",flexWrap:"wrap"}}>
          <button onClick={()=>{setTimeLeft(DURATIONS[mode]);setRunning(false);}} style={{padding:"0.5rem clamp(0.7rem,3vw,1rem)",border:"1px solid rgba(168,208,96,0.25)",background:"rgba(168,208,96,0.05)",color:"#b0d070",fontSize:"clamp(0.7rem,2.5vw,0.8rem)",cursor:"pointer",letterSpacing:"0.1em",fontFamily:"'Courier New',monospace",borderRadius:"2px"}}>↺ RESET</button>
          <button onClick={()=>setRunning(r=>!r)}
            style={{padding:"0.5rem clamp(1rem,4vw,2rem)",border:`2px solid ${modeColor}`,
              background: running ? "transparent" : (!running && timeLeft < DURATIONS[mode] && timeLeft > 0) ? modeColor+"40" : modeColor+"25",
              color:modeColor,fontSize:"clamp(0.78rem,2.5vw,0.9rem)",fontWeight:"bold",cursor:"pointer",
              letterSpacing:"0.12em",fontFamily:"'Courier New',monospace",borderRadius:"2px",
              boxShadow:running?"none":`0 0 18px ${modeColor}40`,transition:"all 0.2s"}}>
            {running ? "⏸ PAUSE" : (!running && timeLeft < DURATIONS[mode] && timeLeft > 0) ? "▶ RESUME" : "▶ DEPLOY"}
          </button>
        </div>

        {/* Stats — 4 boxes */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0.6rem",marginBottom:"0.6rem"}}>
          {[
            ["🎖️", sessions,           "MISSIONS DONE",  "#a8d060", "rgba(168,208,96,0.08)"],
            ["🔥", fmtStudy(totalFocus),"TOTAL FOCUS",    "#a8d060", "rgba(168,208,96,0.08)"],
            ["☕", fmtStudy(totalBreak),"TOTAL BREAK",    "#f0c040", "rgba(240,192,64,0.08)"],
            ["📅", `${Math.floor(dailyFocus/3600)}h ${Math.floor((dailyFocus%3600)/60)}m ${dailyFocus%60}s`, "TODAY'S STUDY", "#80c8f0", "rgba(128,200,240,0.08)"],
          ].map(([icon,val,label,col,bg])=>(
            <div key={label} style={{background:bg,border:`1px solid ${col}30`,borderRadius:"2px",padding:"clamp(0.5rem,2vw,0.75rem)",textAlign:"center"}}>
              <div style={{fontSize:"0.85rem",marginBottom:"0.1rem"}}>{icon}</div>
              <div style={{fontSize:"clamp(1.2rem,3.5vw,1.6rem)",fontWeight:"bold",color:col,fontFamily:"'Courier New',monospace",lineHeight:1.1}}>{val}</div>
              <div style={{fontSize:"clamp(0.62rem,1.8vw,0.72rem)",color:"#8ab860",letterSpacing:"0.1em",textTransform:"uppercase",marginTop:"0.15rem"}}>{label}</div>
            </div>
          ))}
        </div>

        {/* Saved indicator + clear button */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"0.4rem"}}>
          <div style={{fontSize:"clamp(0.62rem,1.8vw,0.72rem)",color: (!running && timeLeft < DURATIONS[mode] && timeLeft > 0) ? "#f0c040" : "#5a8040",letterSpacing:"0.1em",transition:"color 0.3s"}}>
            {(!running && timeLeft < DURATIONS[mode] && timeLeft > 0)
              ? "💾 SESSION SAVED — close & reopen anytime"
              : "✅ AUTO-SAVED — progress never lost"}
          </div>
          <button onClick={clearAll} style={{fontSize:"clamp(0.6rem,1.8vw,0.7rem)",color:"#884040",border:"1px solid rgba(200,60,60,0.3)",background:"rgba(200,60,60,0.06)",padding:"0.2rem 0.5rem",cursor:"pointer",letterSpacing:"0.1em",fontFamily:"'Courier New',monospace",borderRadius:"2px"}}>
            🗑 CLEAR ALL
          </button>
        </div>
        <div style={{textAlign:"center",marginTop:"0.4rem",fontSize:"clamp(0.72rem,2vw,0.82rem)",color:"#7aaa48",letterSpacing:"0.06em"}}>25m mission → 5m recon → ×4 → 15m debrief</div>
      </div>
    </div>
  );
}

export default function CDSPlan() {
  const [selWeek, setSelWeek] = useState(1);
  const [completed, setCompleted] = useState(new Set());
  const [expanded, setExpanded] = useState(null);
  const [showTimer, setShowTimer] = useState(false);

  const days = plan.filter(d => d.week === selWeek);
  const done = completed.size;
  const wm = weekMeta[selWeek];
  const toggle = day => setCompleted(p => { const n = new Set(p); n.has(day)?n.delete(day):n.add(day); return n; });

  return (
    <div style={{fontFamily:"'Courier New',monospace",background:camoBg,backgroundSize:"120px 120px",minHeight:"100vh",color:"#c8d8a0"}}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        .day-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr)); gap: 1.2rem; }
        @media (max-width: 480px) { .day-grid { grid-template-columns: 1fr; } }
        .week-tabs { display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap; }
        .week-tab { padding: 0.55rem 1rem; }
        @media (max-width: 480px) { .week-tab { padding: 0.5rem 0.7rem; font-size: 0.85rem !important; letter-spacing: 0.06em !important; } }
        .header-title { font-size: clamp(2.2rem, 6vw, 3.8rem); }
        .focus-btn { font-size: clamp(0.9rem, 2.5vw, 1.05rem); }
        .weight-topics { display: flex; flex-wrap: wrap; gap: 0.35rem; }
      `}</style>

      {showTimer && <FocusTimer onClose={()=>setShowTimer(false)}/>}

      {/* ── HEADER ── */}
      <div style={{background:"linear-gradient(180deg,rgba(8,14,4,0.98),rgba(14,22,8,0.95))",borderBottom:"3px solid #a8d060",padding:"clamp(1.2rem,4vw,2rem) clamp(0.8rem,3vw,1.5rem)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)",pointerEvents:"none"}}/>
        <div style={{position:"relative",textAlign:"center"}}>
          <div style={{display:"inline-block",border:"2px solid #a8d060",padding:"0.2rem clamp(0.6rem,3vw,1.2rem)",fontSize:"clamp(0.55rem,1.8vw,0.68rem)",letterSpacing:"clamp(0.15em,1vw,0.45em)",color:"#a8d060",textTransform:"uppercase",marginBottom:"0.8rem"}}>
            ⚔ OPERATION: CDS WOMEN'S ENTRY ⚔
          </div>
          <h1 className="header-title" style={{fontWeight:"900",color:"#e8f0d0",letterSpacing:"0.08em",margin:"0.3rem 0",textTransform:"uppercase",textShadow:"0 0 30px rgba(168,208,96,0.4),3px 3px 0 rgba(0,0,0,0.6)"}}>
            30-DAY MISSION
          </h1>
          <div style={{fontSize:"clamp(0.88rem,2.2vw,1rem)",letterSpacing:"clamp(0.1em,1vw,0.3em)",color:"#a8d060",textTransform:"uppercase",marginTop:"0.3rem"}}>ENGLISH · GENERAL KNOWLEDGE · CLASSIFIED STUDY PLAN</div>

          <button onClick={()=>setShowTimer(true)} className="focus-btn" style={{marginTop:"1rem",padding:"0.55rem clamp(1rem,4vw,1.8rem)",border:"2px solid #a8d060",background:"rgba(168,208,96,0.1)",color:"#a8d060",fontFamily:"'Courier New',monospace",letterSpacing:"0.18em",cursor:"pointer",textTransform:"uppercase",boxShadow:"0 0 18px rgba(168,208,96,0.2)",transition:"all 0.2s"}}>
            ⏱ COMBAT FOCUS TIMER
          </button>

          {/* Progress */}
          <div style={{maxWidth:"520px",margin:"1.2rem auto 0",padding:"0 0.5rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:"clamp(0.88rem,2.2vw,1rem)",letterSpacing:"0.12em",color:"#a8d060",marginBottom:"0.35rem"}}>
              <span>MISSION PROGRESS</span><span>{done}/30 CLEARED</span>
            </div>
            <div style={{background:"rgba(255,255,255,0.06)",height:"10px",border:"1px solid rgba(168,208,96,0.25)"}}>
              <div style={{height:"100%",background:"linear-gradient(90deg,#5a8020,#a8d060)",width:`${(done/30)*100}%`,transition:"width 0.5s ease",boxShadow:"0 0 10px rgba(168,208,96,0.5)"}}/>
            </div>
          </div>
          <div style={{fontSize:"clamp(0.85rem,2vw,0.95rem)",color:"#8ab860",marginTop:"0.5rem",letterSpacing:"0.1em"}}>{done}/30 DAYS COMPLETED</div>
        </div>
      </div>

      {/* ── WEEK TABS ── */}
      <div className="week-tabs" style={{padding:"1rem 0.8rem",borderBottom:"1px solid rgba(168,208,96,0.1)"}}>
        {[1,2,3,4].map(w=>{
          const m=weekMeta[w]; const active=selWeek===w;
          return (
            <button key={w} onClick={()=>{setSelWeek(w);setExpanded(null);}} className="week-tab"
              style={{border:`2px solid ${active?m.color:"rgba(168,208,96,0.15)"}`,background:active?m.color+"18":"transparent",color:active?m.color:"#8ab860",fontSize:"clamp(0.9rem,2.2vw,1.05rem)",fontFamily:"'Courier New',monospace",letterSpacing:"0.12em",cursor:"pointer",transition:"all 0.2s",textTransform:"uppercase",boxShadow:active?`0 0 14px ${m.color}30`:"none"}}>
              {m.icon} WK{w} {m.name}
            </button>
          );
        })}
      </div>

      {/* ── WEEK BANNER ── */}
      <div style={{maxWidth:"1400px",margin:"1rem auto 0",padding:"0 clamp(1rem,4vw,3rem)"}}>
        <div style={{border:`1px solid ${wm.color}40`,background:`${wm.color}08`,padding:"clamp(0.7rem,2vw,1rem) clamp(0.8rem,3vw,1.2rem)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"0.5rem",marginBottom:"1rem"}}>
          <div>
            <div style={{fontSize:"clamp(0.85rem,2vw,0.95rem)",letterSpacing:"0.28em",color:wm.color,textTransform:"uppercase"}}>PHASE BRIEFING</div>
            <div style={{fontSize:"clamp(1.2rem,3vw,1.4rem)",fontWeight:"bold",color:"#e8f0d0",marginTop:"0.2rem",letterSpacing:"0.08em"}}>{wm.icon} WEEK {selWeek}: {wm.name}</div>
          </div>
          <div style={{fontSize:"clamp(0.92rem,2.2vw,1.05rem)",color:"#a8d060",fontStyle:"italic",letterSpacing:"0.06em"}}>"{wm.desc}"</div>
        </div>

        {/* ── WEIGHTAGE LEGEND ── */}
        <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"1rem",alignItems:"center"}}>
          <span style={{fontSize:"clamp(0.85rem,2vw,0.95rem)",letterSpacing:"0.18em",color:"#8ab860",textTransform:"uppercase"}}>PRIORITY:</span>
          {Object.entries(weightStyle).map(([key,ws])=>(
            <div key={key} style={{display:"flex",alignItems:"center",gap:"0.3rem",fontSize:"clamp(0.6rem,2vw,0.68rem)",color:ws.color,border:`1px solid ${ws.border}`,padding:"0.15rem 0.5rem",background:ws.bg,letterSpacing:"0.08em"}}>
              {ws.label}
            </div>
          ))}
        </div>

        {/* ── DAY CARDS ── */}
        <div className="day-grid" style={{paddingBottom:"2.5rem"}}>
          {days.map(d => {
            const s = subjStyle[d.subject] || subjStyle["Both"];
            const ws = weightStyle[d.weight] || weightStyle["MEDIUM"];
            const isDone = completed.has(d.day);
            const isOpen = expanded === d.day;

            return (
              <div key={d.day} style={{background:"rgba(14,20,8,0.85)",border:`2px solid ${isDone?s.color+"80":"rgba(168,208,96,0.12)"}`,position:"relative",transition:"all 0.25s",boxShadow:isDone?`0 0 20px ${s.color}20`:"none",backdropFilter:"blur(4px)"}}>

                {/* Top priority stripe */}
                <div style={{height:"4px",background:isDone?`linear-gradient(90deg,${s.color},${s.color}80)`:ws.color+"80"}}/>

                {/* Card click area */}
                <div onClick={()=>setExpanded(isOpen?null:d.day)} style={{padding:"clamp(0.8rem,3vw,1rem)",cursor:"pointer"}}>

                  {/* Row 1: Day badge + subject + hours + expand */}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"0.6rem",gap:"0.5rem"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
                      <div style={{width:"clamp(36px,10vw,44px)",height:"clamp(36px,10vw,44px)",border:`2px solid ${isDone?s.color:"rgba(168,208,96,0.3)"}`,display:"flex",alignItems:"center",justifyContent:"center",background:isDone?s.bg:"rgba(168,208,96,0.04)",flexShrink:0}}>
                        <span style={{fontSize:"clamp(0.68rem,2.5vw,0.8rem)",fontWeight:"900",color:isDone?s.color:"#a8d060"}}>{isDone?"✓":`${d.day}`}</span>
                      </div>
                      <div>
                        <div style={{display:"flex",gap:"0.35rem",alignItems:"center",flexWrap:"wrap"}}>
                          <span style={{fontSize:"clamp(0.85rem,2vw,0.95rem)",letterSpacing:"0.15em",color:s.color,border:`1px solid ${s.border}`,padding:"0.1rem 0.4rem",background:s.bg,textTransform:"uppercase"}}>{s.icon} {d.subject}</span>
                          <span style={{fontSize:"clamp(0.82rem,2vw,0.9rem)",color:ws.color,border:`1px solid ${ws.border}`,padding:"0.1rem 0.38rem",background:ws.bg,textTransform:"uppercase",letterSpacing:"0.1em"}}>{ws.label}</span>
                        </div>
                        <div style={{fontSize:"clamp(0.85rem,2vw,0.95rem)",color:"#8ab860",letterSpacing:"0.1em",marginTop:"0.2rem"}}>⏱ {d.hours} recommended</div>
                      </div>
                    </div>
                    <span style={{fontSize:"0.75rem",color:"#8ab860",display:"inline-block",transform:isOpen?"rotate(180deg)":"rotate(0)",transition:"transform 0.2s",marginTop:"0.3rem",flexShrink:0}}>▼</span>
                  </div>

                  {/* Topic */}
                  <div style={{borderLeft:`3px solid ${s.color}`,paddingLeft:"0.7rem",marginBottom:"0.8rem"}}>
                    <div style={{fontSize:"clamp(1.2rem,3.2vw,1.4rem)",fontWeight:"900",color:"#e8f0d0",letterSpacing:"0.04em",textTransform:"uppercase",lineHeight:1.2}}>{d.topic}</div>
                    <div style={{fontSize:"clamp(0.95rem,2.3vw,1.1rem)",color:"#b8d880",marginTop:"0.2rem",letterSpacing:"0.06em"}}>{d.subtitle}</div>
                  </div>

                  {/* High-weightage topics */}
                  <div style={{marginBottom:"0.8rem"}}>
                    <div style={{fontSize:"clamp(0.82rem,2vw,0.9rem)",letterSpacing:"0.2em",color:"#8ab860",textTransform:"uppercase",marginBottom:"0.4rem"}}>▸ KEY TOPICS TO COVER</div>
                    <div className="weight-topics">
                      {d.weightTopics.map((t,i)=>(
                        <span key={i} style={{fontSize:"clamp(0.85rem,2vw,0.95rem)",color:ws.color,background:ws.bg,border:`1px solid ${ws.border}`,padding:"0.18rem 0.5rem",letterSpacing:"0.06em",lineHeight:1.4}}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tip box */}
                  <div style={{background:"rgba(168,208,96,0.05)",border:"1px solid rgba(168,208,96,0.15)",padding:"0.45rem 0.65rem",marginBottom:"0.7rem"}}>
                    <span style={{fontSize:"clamp(0.85rem,2vw,0.95rem)",color:"#b0d070",letterSpacing:"0.04em",fontStyle:"italic"}}>💡 {d.tip}</span>
                  </div>

                  {/* Mark done */}
                  <button onClick={e=>{e.stopPropagation();toggle(d.day);}}
                    style={{width:"100%",padding:"0.48rem",border:`1px solid ${isDone?s.color+"80":"rgba(168,208,96,0.2)"}`,background:isDone?s.bg:"transparent",color:isDone?s.color:"#8ab860",fontSize:"clamp(0.6rem,2vw,0.7rem)",letterSpacing:"0.15em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'Courier New',monospace",transition:"all 0.2s"}}>
                    {isDone?"✓ MISSION COMPLETE":"◻ MARK AS COMPLETE"}
                  </button>
                </div>

                {/* Expanded tasks */}
                {isOpen && (
                  <div style={{borderTop:"1px solid rgba(168,208,96,0.1)",padding:"0.8rem clamp(0.8rem,3vw,1rem) 1rem",background:"rgba(0,0,0,0.25)"}}>
                    <div style={{fontSize:"clamp(0.85rem,2vw,0.95rem)",letterSpacing:"0.25em",color:"#8ab860",textTransform:"uppercase",marginBottom:"0.6rem"}}>▸ DAILY MISSION OBJECTIVES</div>
                    {d.tasks.map((t,i)=>(
                      <div key={i} style={{display:"flex",gap:"0.55rem",alignItems:"flex-start",marginBottom:"0.5rem",paddingBottom:"0.5rem",borderBottom:i<d.tasks.length-1?"1px dashed rgba(168,208,96,0.08)":"none"}}>
                        <span style={{color:s.color,fontWeight:"bold",fontSize:"clamp(0.95rem,2.3vw,1.1rem)",flexShrink:0,marginTop:"0.1rem"}}>[{i+1}]</span>
                        <span style={{fontSize:"clamp(0.72rem,2.2vw,0.85rem)",color:"#c8e098",lineHeight:1.5}}>{t}</span>
                      </div>
                    ))}
                    <button onClick={e=>{e.stopPropagation();setShowTimer(true);}}
                      style={{marginTop:"0.7rem",width:"100%",padding:"0.42rem",border:"1px solid rgba(168,208,96,0.28)",background:"rgba(168,208,96,0.07)",color:"#a8d060",fontSize:"clamp(0.6rem,2vw,0.68rem)",letterSpacing:"0.18em",textTransform:"uppercase",cursor:"pointer",fontFamily:"'Courier New',monospace"}}>
                      ⏱ LAUNCH FOCUS TIMER
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FULL FOOTER ── */}
      <footer style={{background:"linear-gradient(180deg,rgba(8,14,4,0.98),#060a04)",borderTop:"3px solid rgba(168,208,96,0.25)",marginTop:"1rem",fontFamily:"'Courier New',monospace"}}>

        {/* Top footer grid */}
        <div style={{maxWidth:"1400px",margin:"0 auto",padding:"clamp(2rem,5vw,3rem) clamp(1rem,4vw,3rem)",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,220px),1fr))",gap:"2.5rem"}}>

          {/* Brand column */}
          <div>
            <div style={{display:"inline-block",border:"2px solid rgba(168,208,96,0.5)",padding:"0.2rem 0.8rem",marginBottom:"1rem"}}>
              <span style={{fontSize:"clamp(1rem,2.5vw,1.15rem)",fontWeight:"900",letterSpacing:"0.3em",color:"#a8d060",textTransform:"uppercase"}}>⚔ CDS MISSION</span>
            </div>
            <p style={{fontSize:"clamp(0.95rem,2.3vw,1.1rem)",color:"#9ac850",lineHeight:1.8,letterSpacing:"0.04em",margin:"0 0 1rem"}}>
              A 30-day classified study plan for CDS Women's Entry aspirants. Built to help you clear English & GK with military precision.
            </p>
            <div style={{display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
              {Object.entries(subjStyle).map(([subj,s])=>(
                <div key={subj} style={{display:"flex",alignItems:"center",gap:"0.3rem",fontSize:"clamp(0.85rem,2vw,0.95rem)",color:s.color,border:`1px solid ${s.border}`,padding:"0.15rem 0.45rem",background:s.bg,letterSpacing:"0.08em"}}>
                  {s.icon} {subj}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{fontSize:"clamp(0.92rem,2.2vw,1.05rem)",letterSpacing:"0.35em",color:"#a8d060",textTransform:"uppercase",marginBottom:"1rem",paddingBottom:"0.5rem",borderBottom:"1px solid rgba(168,208,96,0.15)"}}>QUICK LINKS</div>
            {[["🪖","Week 1 – Foundation",()=>{setSelWeek(1);setExpanded(null);window.scrollTo({top:0,behavior:"smooth"});}],
              ["🛡️","Week 2 – Building",()=>{setSelWeek(2);setExpanded(null);window.scrollTo({top:0,behavior:"smooth"});}],
              ["💥","Week 3 – Acceleration",()=>{setSelWeek(3);setExpanded(null);window.scrollTo({top:0,behavior:"smooth"});}],
              ["🚩","Week 4 – Final Push",()=>{setSelWeek(4);setExpanded(null);window.scrollTo({top:0,behavior:"smooth"});}],
              ["⏱","Focus Timer",()=>setShowTimer(true)]
            ].map(([icon,label,action])=>(
              <div key={label} onClick={action} style={{display:"flex",alignItems:"center",gap:"0.5rem",padding:"0.4rem 0",cursor:"pointer",borderBottom:"1px dashed rgba(168,208,96,0.07)",transition:"color 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.color="#a8d060"}
                onMouseLeave={e=>e.currentTarget.style.color="#5a7040"}>
                <span style={{fontSize:"0.85rem"}}>{icon}</span>
                <span style={{fontSize:"clamp(0.95rem,2.3vw,1.1rem)",color:"inherit",letterSpacing:"0.06em"}}>{label}</span>
              </div>
            ))}
          </div>

          {/* Exam Info */}
          <div>
            <div style={{fontSize:"clamp(0.92rem,2.2vw,1.05rem)",letterSpacing:"0.35em",color:"#a8d060",textTransform:"uppercase",marginBottom:"1rem",paddingBottom:"0.5rem",borderBottom:"1px solid rgba(168,208,96,0.15)"}}>EXAM INTEL</div>
            {[["📋","Conducted by UPSC"],["📅","Held twice a year"],["📝","English: 100 marks"],["🌐","GK: 100 marks"],["⏳","2 hours per paper"],["🎯","0.33 negative marking"],["🔗","upsc.gov.in for official info"]
            ].map(([icon,info])=>(
              <div key={info} style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",padding:"0.35rem 0",borderBottom:"1px dashed rgba(168,208,96,0.07)"}}>
                <span style={{fontSize:"0.8rem",flexShrink:0}}>{icon}</span>
                <span style={{fontSize:"clamp(0.92rem,2.2vw,1.05rem)",color:"#9ac850",letterSpacing:"0.04em",lineHeight:1.5}}>{info}</span>
              </div>
            ))}
          </div>

          {/* Study Tips */}
          <div>
            <div style={{fontSize:"clamp(0.92rem,2.2vw,1.05rem)",letterSpacing:"0.35em",color:"#a8d060",textTransform:"uppercase",marginBottom:"1rem",paddingBottom:"0.5rem",borderBottom:"1px solid rgba(168,208,96,0.15)"}}>FIELD TIPS</div>
            {[["🌅","Study 2–3 hrs daily, same time every day"],["📰","Read newspaper 30 min daily for GK"],["📓","Maintain an error log — revisit weekly"],["🔁","Revise every 7th day without fail"],["🧪","Attempt 1 mock test per week minimum"],["😴","Sleep 7–8 hrs. Rest = better retention"]
            ].map(([icon,tip])=>(
              <div key={tip} style={{display:"flex",alignItems:"flex-start",gap:"0.5rem",padding:"0.35rem 0",borderBottom:"1px dashed rgba(168,208,96,0.07)"}}>
                <span style={{fontSize:"0.8rem",flexShrink:0}}>{icon}</span>
                <span style={{fontSize:"clamp(0.88rem,2.2vw,1rem)",color:"#9ac850",letterSpacing:"0.04em",lineHeight:1.5}}>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{maxWidth:"1400px",margin:"0 auto",padding:"0 clamp(1rem,4vw,3rem)"}}>
          <div style={{height:"1px",background:"linear-gradient(90deg,transparent,rgba(168,208,96,0.25),transparent)"}}/>
        </div>

        {/* Bottom bar */}
        <div style={{maxWidth:"1400px",margin:"0 auto",padding:"clamp(1rem,3vw,1.4rem) clamp(1rem,4vw,3rem)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.8rem"}}>
          <div style={{fontSize:"clamp(0.85rem,2vw,0.95rem)",color:"#7aaa48",letterSpacing:"0.1em"}}>
            © {new Date().getFullYear()} CDS MISSION PLAN &nbsp;·&nbsp; FOR PERSONAL STUDY USE ONLY
          </div>
          <div style={{display:"flex",gap:"1rem",flexWrap:"wrap",alignItems:"center"}}>
            {["PRIVACY POLICY","DISCLAIMER"].map(link=>(
              <span key={link} style={{fontSize:"clamp(0.75rem,2vw,0.88rem)",color:"#7aaa48",letterSpacing:"0.12em",cursor:"pointer",transition:"color 0.2s",textTransform:"uppercase"}}
                onMouseEnter={e=>e.target.style.color="#a8d060"}
                onMouseLeave={e=>e.target.style.color="#7aaa48"}>
                {link}
              </span>
            ))}
            <a href="mailto:zenertrizz@gmail.com"
              style={{fontSize:"clamp(0.75rem,2vw,0.88rem)",color:"#a8d060",letterSpacing:"0.1em",textDecoration:"none",border:"1px solid rgba(168,208,96,0.4)",padding:"0.25rem 0.75rem",background:"rgba(168,208,96,0.08)",transition:"all 0.2s",textTransform:"uppercase"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(168,208,96,0.2)";e.currentTarget.style.boxShadow="0 0 14px rgba(168,208,96,0.35)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(168,208,96,0.08)";e.currentTarget.style.boxShadow="none";}}>
              ✉ zenertrizz@gmail.com
            </a>
          </div>
          <div style={{fontSize:"clamp(0.85rem,2vw,0.95rem)",color:"#7aaa48",letterSpacing:"0.08em"}}>
            FILE REF: CDS/WE/2026 &nbsp;·&nbsp; ALL RIGHTS RESERVED
          </div>
        </div>

        {/* Final red-line bottom */}
        <div style={{height:"4px",background:"linear-gradient(90deg,transparent,rgba(168,208,96,0.4),transparent)"}}/>
      </footer>
    </div>
  );
}