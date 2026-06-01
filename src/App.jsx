import { useState } from "react";

const C = {
  bg:"#0a0608",surface:"#150e12",card:"#1e1318",
  border:"#3d1f2e",accent:"#c0392b",gold:"#c9a84c",
  text:"#f0e6e9",muted:"#8a7078",deep:"#6b1f35",soft:"#e8c870",
};
const s = {
  app:{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"Georgia,serif",display:"flex",flexDirection:"column",maxWidth:480,margin:"0 auto"},
  header:{textAlign:"center",padding:"24px 20px 14px",borderBottom:"1px solid #3d1f2e",background:"linear-gradient(180deg,#1a0a12 0%,#0a0608 100%)"},
  title:{fontSize:22,fontWeight:"normal",letterSpacing:4,color:C.gold,margin:0,textTransform:"uppercase"},
  sub:{fontSize:11,color:C.muted,letterSpacing:3,marginTop:4,textTransform:"uppercase"},
  content:{flex:1,overflowY:"auto",padding:"20px 16px 40px"},
  btn:{background:"linear-gradient(135deg,#c0392b,#6b1f35)",border:"none",color:C.text,padding:"14px 28px",borderRadius:2,fontSize:13,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",width:"100%",fontFamily:"Georgia,serif"},
  btnG:{background:"linear-gradient(135deg,#c9a84c,#8a6020)",border:"none",color:"#0a0608",padding:"14px 28px",borderRadius:2,fontSize:13,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",width:"100%",fontFamily:"Georgia,serif",fontWeight:"bold"},
  btnO:{background:"none",border:"1px solid #3d1f2e",color:C.muted,padding:"12px 20px",borderRadius:2,fontSize:12,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",width:"100%"},
  label:{fontSize:11,letterSpacing:3,color:C.gold,textTransform:"uppercase",marginBottom:14,marginTop:0},
  box:{background:"#0f0609",border:"1px solid #6b1f35",borderRadius:4,padding:20,marginTop:16,lineHeight:1.8,fontSize:15},
  chip:(sel)=>({display:"inline-block",padding:"8px 14px",margin:"4px",borderRadius:2,fontSize:12,letterSpacing:1,cursor:"pointer",border:"1px solid "+(sel?C.gold:C.border),background:sel?"rgba(201,168,76,0.15)":"none",color:sel?C.gold:C.muted,userSelect:"none"}),
  orn:{textAlign:"center",color:C.deep,fontSize:14,letterSpacing:8,margin:"12px 0"},
};
const rnd=(arr)=>arr[Math.floor(Math.random()*arr.length)];

// CONTENT
const DARES={
  Foreplay:{items:["Spend 15 full minutes on your partner's body using only your mouth -- no hands. Work slowly from neck down, teasing every sensitive spot before moving lower.","Take turns giving each other a full-body oil massage, paying attention to inner thighs and lower back. The receiver cannot touch back until told.","Blindfold your partner and use your tongue and fingertips to trace patterns across their body. They guess where you will touch next.","Kiss from your partner's ankle all the way up their inner leg, pausing just before the top -- then switch legs and repeat.","Use an ice cube to trace your partner's body, following immediately with your warm mouth. Start at the collarbone and work downward.","Spend 10 minutes giving your partner oral pleasure with no expectation of anything in return. Focus entirely on their reactions."],spontaneous:true},
  Fantasy:{items:["Take turns describing your most explicit fantasy in vivid detail while the other listens and touches themselves. No acting yet -- just words and watching.","Act out a forbidden office scenario -- one of you is the boss, the other a new employee staying late. Build tension before anything physical.","Describe your fantasy threesome scenario in detail. Who, what, where. No judgment -- just honesty and arousal.","Play out a scenario where one of you has been caught doing something naughty and must accept whatever consequence the other decides.","Take turns narrating an explicit story out loud, each adding one sentence at a time, building to the most intense ending you can imagine."],spontaneous:false},
  Roleplay:{items:["Stranger pickup: one of you plays someone who has never done anything like this before. The other seduces them from scratch, slowly and deliberately.","Doctor and patient: one gives a thorough examination while maintaining professional tone -- until they cannot anymore.","You are both at a party pretending you are not together. Sneak off to a private room and stay as quiet as possible.","Film scene: you are shooting an adult scene together. One directs, the other performs, following every instruction exactly.","Spy and interrogator: the spy will not give up information. The interrogator uses only pleasure to extract it."],spontaneous:false},
  Toys:{items:["Use a vibrator on your partner while they are restrained with hands above their head. They cannot move until you decide they have had enough.","Use a toy on your partner while maintaining eye contact the entire time. Neither of you can look away.","Edge your partner with a toy three times before allowing release. Each time, back off completely and wait 60 seconds.","One of you wears a remote-controlled toy in a semi-public place for 30 minutes while the other holds the remote.","Take turns using a toy on each other while describing exactly what you want the other to do next."],spontaneous:true},
  Sensory:{items:["Blindfold your partner and introduce five different sensations -- temperature, texture, pressure, breath, and taste -- without telling them what is coming.","Use a silk scarf to loosely restrain your partner's wrists, then explore their body with your mouth for as long as you want.","Trace your partner's body with a feather, alternating with firm fingertip pressure. Watch which makes them react more.","Give your partner a scalp and neck massage in complete silence for 10 minutes, then let it evolve wherever it goes.","Feed each other deliberately sensual foods with no hands -- only mouths."],spontaneous:true},
  "Power Play":{items:["The dominant partner writes three rules for the evening. The submissive must follow all three without negotiation.","The submissive partner must ask permission for everything they want tonight. The dominant decides yes or no for each request.","The dominant partner controls all movement and pace. The submissive cannot initiate or change anything without being told.","Practice light restraint with a tie or scarf. The restrained partner must stay completely still or the session pauses.","Establish a word that means slow down and one that means more. Communicate only through those words and body language all evening."],spontaneous:true},
  Outdoor:{items:["Find a private outdoor spot after dark. The challenge: do not make a sound, no matter what happens.","Park somewhere with minimal risk of being seen. Start with kissing and let tension decide how far it goes.","Take a late-night walk and find a secluded spot. One partner chooses the location, the other chooses what happens there.","Back seat of the car somewhere quiet. Pretend you are teenagers with nowhere else to go.","Hotel balcony after midnight -- keep things subtle but do not hold back entirely. The risk is part of it."],spontaneous:true},
};

const MOODS=["Slow and sensual","Rough and intense","Roleplay scenario","Oral focus","Toy play","Blindfolded","Dominant","Submissive","Quickie","Extended session","Outdoor / risky","Massage first","Dirty talk","Mirror / visual","Fantasy scenario","Temperature play"];

const MOOD_CONTENT={
  "Slow and sensual+Oral focus":"Start with a long slow massage -- no rush, no agenda. When your partner is completely relaxed, begin oral pleasure with the same unhurried energy. The goal is to make them feel worshipped for as long as you can sustain it.",
  "Rough and intense+Dominant":"No warm-up tonight. The dominant partner takes immediate control -- direct, commanding, deliberate. Set the pace, choose the position, decide when things escalate. Make your partner feel completely claimed.",
  "Blindfolded+Toy play":"Blindfold the receiving partner first. Then introduce a toy without warning -- let them experience every sensation without visual distraction. Switch control of the toy as the evening builds.",
  "Fantasy scenario+Dirty talk":"Choose a fantasy scenario together then narrate it explicitly as you act it out. Words matter as much as touch tonight. Be specific and do not hold back.",
  "Quickie+Rough and intense":"You have 10 minutes and nothing to prove. Skip the foreplay, go straight to what you both want most, and finish with everything you have got. Sometimes the urgency is the whole point.",
  "Extended session+Massage first":"Clear the whole evening. Start with a full 20-minute massage -- oil, music, no agenda. Let arousal build naturally then spend the rest of the night taking turns indulging every request.",
  "Outdoor / risky+Quickie":"Find somewhere you probably should not be doing this. The risk is the foreplay. Keep it fast, keep it quiet, and carry the memory home.",
  "Mirror / visual+Dirty talk":"Position yourselves where you can both watch. Narrate what you are watching in explicit detail. Eye contact through the reflection, words describing every movement.",
  "Submissive+Oral focus":"The submissive partner's only role tonight is to receive oral pleasure exactly as the dominant partner chooses to give it. No directing, no rushing. Complete surrender.",
  "Temperature play+Blindfolded":"Blindfold your partner then alternate ice and warmth across their body -- ice cube followed by warm mouth, over and over. Start at the neck and work downward.",
  "Dominant+Rough and intense":"Full intensity from the start. The dominant partner controls pace, position, and duration. No gradual build -- make it clear from the first moment who is leading tonight.",
  "Roleplay scenario+Fantasy scenario":"Each describe one fantasy scenario. Pick the one that excites both of you most, assign roles, and commit to character fully until someone breaks.",
};

function buildBridge(p1, p2) {
  const overlap = p1.filter(m => p2.includes(m));
  if (overlap.length > 0) {
    const key = Object.keys(MOOD_CONTENT).find(k => overlap.some(m => k.includes(m)));
    if (key) return { type:"overlap", items:overlap, text:MOOD_CONTENT[key] };
    return { type:"overlap", items:overlap, text:"Tonight is built around what you both want: "+overlap.join(", ")+". Start slow, stay present, and let these shared desires guide every decision." };
  }
  // Smart bridge -- reference both partners' actual picks
  const p1primary = p1[0] || "";
  const p2primary = p2[0] || "";
  const bridges = {
    "Slow and sensual": "wants a slow unhurried pace",
    "Rough and intense": "wants full intensity",
    "Roleplay scenario": "wants a scenario to act out",
    "Oral focus": "wants oral as the priority",
    "Toy play": "wants toys involved",
    "Blindfolded": "wants sensory removal",
    "Dominant": "wants to lead tonight",
    "Submissive": "wants to surrender control",
    "Quickie": "wants urgency and speed",
    "Extended session": "wants the whole evening",
    "Outdoor / risky": "wants a location with some risk",
    "Massage first": "needs a physical warm-up first",
    "Dirty talk": "wants words as part of the act",
    "Mirror / visual": "wants to watch",
    "Fantasy scenario": "wants a scenario or story",
    "Temperature play": "wants temperature contrast",
  };
  const d1 = bridges[p1primary] || "has different desires";
  const d2 = bridges[p2primary] || "has different desires";
  const text = "One of you "+d1+" and the other "+d2+". Rather than compromising, try this: honour one desire completely first, then reset and honour the other. Decide now who goes first by whoever feels most ready to give tonight.";
  return { type:"bridge", items:[], text };
}

const WILD_CARDS=["Set a 20-minute timer. One partner does exactly what the other instructs for the entire duration -- position, pace, location, everything. When it ends, switch completely.","No hands allowed for either of you. Everything that happens tonight must be accomplished using only mouths, bodies, and movement.","Write one explicit thing you have never asked for on a piece of paper. Swap. No discussion -- just do it.","Every light off, phone face-down, complete darkness. Navigate entirely by touch for as long as you can sustain it.","One partner sits still and cannot participate physically for 15 minutes. The other does everything -- all movement, all initiation. Then reverse.","Pick a room in your home you have never used. Tonight it is the only room that exists.","One of you narrates the entire encounter as if describing it to someone else -- explicit, detailed, present tense. The other listens while it happens to them.","Edge each other simultaneously for as long as you both can hold it. First one to break sets the rules for the rest of the night.","Choose a word. Every time one of you says it, switch position immediately -- no matter what you are doing.","Recreate the best sexual experience you have had together -- as close to identical as memory allows. Then improve on it.","Take turns making one specific, explicit request. The other must say yes or offer an equally explicit alternative. No vague answers.","Both write down what you want most tonight without showing each other. Open at the same time. Do both."];

const DATE_PLANS={
  "Romantic warmup+At home":{phase1:{title:"Set the Scene",body:"Dim every light and light candles. Put on music with no lyrics. Pour drinks. Neither of you checks your phone from this point. You are creating a container for the evening."},phase2:{title:"Build the Tension",body:"Give each other a 15-minute back massage -- no agenda, just contact. Then lie facing each other and describe one thing you find intensely attractive about the other right now. Do not rush past this part."},phase3:{title:"Let It Evolve",body:"Start with long slow kissing. Remove one item of clothing at a time. Spend deliberate time on foreplay before anything more -- your goal is to make your partner feel completely wanted before the evening peaks."}},
  "Sensual build+At home":{phase1:{title:"Massage and Surrender",body:"One partner lies face-down while the other gives a full back and leg oil massage. The receiver's only job is to feel. No reciprocation expected yet. Take 20 minutes."},phase2:{title:"Oral Focus",body:"The partner who gave the massage now receives extended oral pleasure -- as long as the giver wants to give it. No rushing, no directing. The giver sets every variable: pace, pressure, duration."},phase3:{title:"Full Intensity",body:"Transition into whatever position allows the deepest connection. Slow at first, building to full intensity. Maintain eye contact as long as possible."}},
  "Full evening+Hotel room":{phase1:{title:"Arrival and Anticipation",body:"Order room service or bring a bottle. Sit on the bed and take 10 minutes to talk about what you want tonight. Be specific and a little bold. The honesty before anything happens is its own form of foreplay."},phase2:{title:"Exploration",body:"Use the unfamiliar setting. The bathroom, the chair, the window. Try one position or scenario you would not attempt at home. The hotel exists outside your normal rules."},phase3:{title:"Peak and Recovery",body:"Save the bed for last. Let it all release without restraint. Finish with room service, a bath together, or simply lying close and talking about what you both want to do again."}},
  "All night+At home":{phase1:{title:"Hours One and Two -- Slow Burn",body:"No penetration in the first two hours. Everything else is available -- oral, massage, toys, roleplay, sensory play. Tease to the edge repeatedly. Every time one of you gets close, back off completely for two minutes."},phase2:{title:"Hours Three and Four -- Release and Reset",body:"Allow the first release -- whoever needs it most goes first. Then reset: water, a short break, back to building. The second round is always slower, deeper, more deliberate."},phase3:{title:"Final Hour -- No Agenda",body:"By now you know exactly what the other needs. Stop thinking and just respond. Let the evening finish when it finishes -- not by the clock."}},
  "Romantic warmup+Hotel room":{phase1:{title:"Check In, Switch Off",body:"The moment the door closes, phones go face-down and stay there. Pour drinks, decide on lighting together. Take five minutes just to stand together and decompress from getting here."},phase2:{title:"Slow Hands",body:"Undress each other slowly -- one item at a time, no rushing. Between each item pause for 30 seconds of kissing or touch. By the time you are both undressed you should already be fully present and wanting."},phase3:{title:"The Main Event",body:"Use every surface at least once. Take turns leading. Finish in whichever position feels most intimate -- not necessarily the most intense, but the one where you feel most connected."}},
  "Full evening+Surprise me":{phase1:{title:"The Setup",body:"One partner plans the entire evening secretly and reveals each element one at a time. The other must accept every element without question. Surprise is the foreplay."},phase2:{title:"The Middle",body:"The planning partner introduces one thing the other has mentioned wanting but never experienced. Knowing their partner remembered and acted on it is deeply arousing."},phase3:{title:"The Finish",body:"The planning partner surrenders control completely at the end. After orchestrating everything, they become entirely receptive -- whatever their partner wants, however they want it."}},
};

const POSITIONS=[
  {name:"Lotus",intensity:"Intimate",who:"Equal",desc:"Sit facing each other with legs intertwined and wrapped around. Move together slowly from the hips. Extremely intimate -- full body contact chest to chest. Maintain eye contact. Not about speed or depth; entirely about closeness and rhythm."},
  {name:"Missionary",intensity:"Classic",who:"Equal",desc:"Receiving partner lies on back, the other lies on top facing them. Full body contact, easy kissing, good eye contact. The top partner controls pace and angle. Placing a pillow under the receiving partner's hips dramatically changes the angle and depth."},
  {name:"Cowgirl",intensity:"Moderate",who:"Partner on top",desc:"Receiving partner straddles and faces their partner who is lying down. Full control over depth, pace, and angle. Leaning forward increases stimulation. Leaning back changes depth entirely. The partner below can use hands freely."},
  {name:"Reverse Cowgirl",intensity:"Moderate",who:"Partner on top",desc:"Same as cowgirl but facing away. The partner on top controls everything while the partner below gets a completely different view. Less eye contact but more intense for many people."},
  {name:"Doggy Style",intensity:"Intense",who:"Behind partner",desc:"Receiving partner on hands and knees, the other enters from behind. Deepest penetration of most common positions. The behind partner controls pace entirely. Reaching around to add manual stimulation significantly increases intensity for the receiver."},
  {name:"Spooning",intensity:"Gentle",who:"Behind partner",desc:"Both lying on their sides facing the same direction. Entry from behind while both remain horizontal. Deeply intimate and physically comfortable for extended sessions. Good for slow build or morning encounters."},
  {name:"Edge of Bed",intensity:"Moderate",who:"Standing partner",desc:"Receiving partner lies at the very edge of the bed with hips at the edge. The other partner stands. Allows full control of angle and depth. Gravity works in your favour. The receiving partner can pull the other closer with their legs."},
  {name:"Standing",intensity:"Intense",who:"Both",desc:"Both partners standing, one entering from behind or with the receiving partner against a wall. Requires some height compatibility. Exceptionally good against a wall for the friction and physical energy involved."},
  {name:"Face to Face Standing",intensity:"Intense",who:"Both",desc:"The receiving partner wraps their legs around the other while being held or supported against a wall or surface. Requires physical effort from the supporting partner. Extremely intimate with full eye contact and kissing available throughout."},
  {name:"Flat Doggy",intensity:"Deep",who:"Behind partner",desc:"Like doggy but the receiving partner lies completely flat on their stomach with legs together. The entering partner lies on top from behind. Changes the angle significantly -- tighter and deeper than standard doggy for most people."},
  {name:"The Chair",intensity:"Moderate",who:"Partner on top",desc:"One partner sits in a chair or on the edge of the bed. The other sits in their lap facing away or toward them. Facing away gives full view and the top partner full control. Facing toward allows kissing and eye contact."},
  {name:"The Pretzel",intensity:"Deep",who:"Side entry",desc:"Receiving partner lies on their side. The entering partner kneels and straddles the lower leg while the upper leg goes over their hip. Allows deep entry at an unusual angle. Good balance of intimacy and intensity."},
  {name:"Standing Split",intensity:"Flexible",who:"Standing partner",desc:"Receiving partner stands and bends forward with hands on a surface. Requires flexibility but allows very deep entry and a powerful angle. The standing partner has full range of motion."},
  {name:"Lap Dance",intensity:"Intimate",who:"Partner on top",desc:"Seated partner on a chair. The other sits in their lap facing toward them with feet on the floor rather than wrapping around. The sitting-on-top partner does all the movement -- grinding rather than bouncing. Slower and more controlled than cowgirl."},
  {name:"The Bridge",intensity:"Advanced",who:"Arching partner",desc:"One partner lies on their back and arches up into a bridge position supported on hands and feet. The other kneels or stands to enter. Requires core and arm strength but creates a completely unique angle."},
  {name:"Scissoring",intensity:"Intimate",who:"Both",desc:"Both partners lie on their sides facing each other with legs interlocked. Allows entry at a sideways angle. Extremely intimate with full eye and hand contact. Slow and rhythmic by nature -- good for extended low-intensity sessions."},
  {name:"Reverse Spoon",intensity:"Gentle",who:"Behind partner",desc:"Like spooning but the receiving partner faces away and arches back slightly. Entry from behind with more depth than regular spooning. Good for slow morning sessions or when one partner wants to feel surrounded."},
  {name:"The Throne",intensity:"Moderate",who:"Partner on top",desc:"One partner sits cross-legged on the bed or floor. The other straddles and faces them, wrapping legs around. Similar to Lotus but with one partner bearing most of the weight. Allows deep slow movement and full body contact."},
  {name:"Standing Rear",intensity:"Intense",who:"Behind partner",desc:"Receiving partner bends over a surface -- bed, table, counter. The other enters from behind while standing. Combines the depth of doggy with the standing partner's full range of motion. Firm hold on the hips amplifies intensity significantly."},
  {name:"The Butterfly",intensity:"Deep",who:"Standing partner",desc:"Receiving partner lies at the edge of the bed with hips raised on a pillow. The other stands and enters at a downward angle. The angle creates deep penetration with a different sensation than most standing positions. The receiver's legs can rest on the standing partner's shoulders."},
];

const KINK_QUESTIONS=[
  {q:"How do you feel about being blindfolded?",key:"blindfold"},
  {q:"How do you feel about being physically restrained?",key:"restraint"},
  {q:"How do you feel about taking a dominant role?",key:"dominant"},
  {q:"How do you feel about taking a submissive role?",key:"submissive"},
  {q:"How do you feel about roleplay and scenarios?",key:"roleplay"},
  {q:"How do you feel about incorporating toys?",key:"toys"},
  {q:"How do you feel about outdoor or semi-public encounters?",key:"outdoor"},
  {q:"How do you feel about dirty talk during sex?",key:"dirtytalk"},
  {q:"How do you feel about temperature play (ice, wax, heat)?",key:"temperature"},
  {q:"How do you feel about extended sessions lasting several hours?",key:"extended"},
];
const KINK_LABELS=["No","Maybe","Yes"];
const KINK_SUGGESTIONS={blindfold:"Try it light first -- use a sleep mask rather than a proper blindfold. One partner wears it during foreplay only. See how removing sight changes what you feel.",restraint:"Start with hands above the head held loosely by one partner rather than tied. The submitting partner keeps them there voluntarily. Notice if the dynamic shifts.",dominant:"The dominant partner makes three small decisions tonight -- where you start, what happens first, and when things escalate. Nothing extreme. Just practice the dynamic in a low-stakes way.",submissive:"The submissive partner asks before changing position or initiating anything for one round only. One question, one answer, then proceed. See if the structure adds anything.",roleplay:"Pick the tamest scenario -- stranger meeting, or one of you visiting the other's city. Stay in character for five minutes before breaking. Lower the barrier to entry.",toys:"Introduce one toy during foreplay rather than as a main event. Use it briefly then put it aside. Removes the pressure of making it the centrepiece.",outdoor:"Start with a balcony or garden after dark if available -- no actual exposure, just the outside air. See if the context alone changes anything.",dirtytalk:"One partner narrates one specific thing they want in detail before anything happens. Just words, no action yet. A single sentence is enough to start.",temperature:"One ice cube on the back of the neck before anything else starts. Nothing more unless it lands well. Low commitment, clear signal of whether it works for both of you.",extended:"No penetration for the first 30 minutes of your next encounter -- everything else available. Removes the rush. See if slowing the pace changes the quality of what follows."};

const MAYBE_IDEAS={blindfold:"Try it light first -- use a sleep mask rather than a proper blindfold. One partner wears it during foreplay only, no pressure to continue. Just see how removing sight changes what you feel.",restraint:"Start with hands above the head held loosely by one partner rather than tied. No hardware needed. The submitting partner keeps them there voluntarily. Notice if the dynamic shifts.",dominant:"The dominant partner makes three small decisions tonight -- where you start, what happens first, and when things escalate. Nothing extreme. Just practice the dynamic in a low-stakes way.",submissive:"The submissive partner asks before changing position or initiating anything for one round only. One question, one answer, then proceed. See if the structure adds anything.",roleplay:"Pick the tamest scenario on your list -- stranger meeting, or one of you visiting the other's city. Stay in character for five minutes before breaking. Lower the barrier to entry.",toys:"Introduce one toy during foreplay rather than as a main event. Use it briefly then put it aside and continue without it. Removes the pressure of making it the centrepiece.",outdoor:"Start with a balcony or garden after dark if available -- no actual exposure, just the outside air and mild openness. See if the context alone changes anything.",dirtytalk:"One partner narrates one specific thing they want in detail before anything happens. Just words, no action yet. Single sentence is enough to start. Build from there.",temperature:"One ice cube on the back of the neck before anything else starts. Nothing more unless it lands well. Low commitment, clear signal of whether it works for both of you.",extended:"No penetration for the first 30 minutes of your next encounter -- everything else available. Removes the rush. See if slowing the pace changes the quality of what follows."};

const HOT_OR_NOT_ITEMS=["Blindfolds","Restraints","Roleplay","Dirty talk","Outdoor sex","Toys","Dominant or submissive","Temperature play","Public risk","Massage before sex","Mirror or visual play","Extended foreplay","Edging","Oral as the main event","Quickies","Rough and intense","Soft and slow","Shower sex","Fantasy scenarios","Morning sex","Sensory deprivation","Wax play","Voyeurism","Exhibitionism","Lap dance","Mutual touch simultaneously","Taking turns completely","Silence throughout","Narrating out loud","Switching who leads"];

const HOT_OR_NOT_IDEAS={"Blindfolds":"One partner blindfolded completely. The other explores freely for 15 minutes -- no guidance allowed from the blindfolded partner.","Restraints":"Wrists loosely bound with a scarf or tie. The restrained partner stays completely still. The other has total freedom of movement and pace.","Roleplay":"Strangers meeting for the first time. One of you is visiting. Build the tension through conversation before anything physical.","Dirty talk":"One partner narrates everything happening in explicit present tense throughout. The other responds in kind. Words become part of the act.","Outdoor sex":"Somewhere with mild risk after dark. Keep quiet. The awareness of possibly being discovered is the point.","Toys":"Introduce one toy mid-session after warming up without it. Let it escalate what is already happening rather than leading with it.","Dominant or submissive":"The dominant partner sets three explicit rules before anything starts. The submissive follows all three or negotiates exactly one change.","Temperature play":"Ice cube followed immediately by warm mouth from neck downward. Alternate slowly until your partner cannot stay still.","Public risk":"A restaurant or bar beforehand with deliberate tension-building -- whispered intentions in public spaces before you are somewhere private.","Massage before sex":"Full back and leg massage with oil before anything else. No agenda for the first 20 minutes. Let arousal build without chasing it.","Mirror or visual play":"Position where you can both watch. Maintain eye contact through the reflection. Narrate what you are seeing.","Extended foreplay":"Nothing beyond foreplay for the first 45 minutes regardless of how much you want to progress. Build until you cannot wait any longer.","Edging":"Three rounds of edging before release is allowed. Each time one partner gets close, back off completely. Wait 90 seconds. Repeat.","Oral as the main event":"Oral only for the entire first round. No penetration regardless of how much either of you wants it. Switch who receives after.","Quickies":"10 minutes maximum. Set a timer. Everything must finish before it ends. The urgency is the entire point.","Rough and intense":"No gradual build. Full intensity from the start. The dominant partner controls everything -- pace, position, depth, duration.","Soft and slow":"Nothing faster than slow throughout the entire encounter. If either partner speeds up instinctively, pause and reset to slow.","Shower sex":"Warm shower together starting non-sexually. Let the environment and proximity decide when it escalates.","Fantasy scenarios":"Each describe one explicit fantasy. Pick the one that excites both of you most. Commit to acting it out fully.","Morning sex":"Alarm off, phone face-down, no talking first. Just body language and physical closeness until things develop naturally.","Sensory deprivation":"Blindfold plus earplugs or white noise. Two senses removed. Every remaining sensation is amplified significantly.","Wax play":"Low-temperature candle dripped from 30cm above. Start on the back and shoulders. The anticipation between drops matters as much as the sensation.","Voyeurism":"One partner watches the other touch themselves completely before joining. No touching allowed until told.","Exhibitionism":"Hotel curtains open slightly at night. Internal awareness of possible visibility without actual exposure -- the concept rather than the reality.","Lap dance":"One partner seated in a chair. The other performs for them without being touched for 5 minutes before any contact is allowed.","Mutual touch simultaneously":"Both touching each other simultaneously throughout. Nothing sequential -- all parallel. Requires coordination and communication.","Taking turns completely":"One partner gives everything for 20 minutes -- the other only receives. Then complete reversal. Nothing simultaneous.","Silence throughout":"Complete silence from both partners for the entire encounter. No words, no sounds if possible. Communication through touch and movement only.","Narrating out loud":"One partner narrates everything in explicit detail as if describing it to an audience. Maintain narrative throughout.","Switching who leads":"Whoever usually leads must follow tonight. Whoever usually follows must lead. Exchange signals every 10 minutes."};

const SENSATION_ITEMS=["Deep kissing","Neck kissing","Ear kissing","Shoulder massage","Back massage","Inner thigh touch","Scalp massage","Chest touch","Stomach kissing","Hip touching","Light scratching","Hair pulling","Biting (light)","Biting (firm)","Spanking","Oral -- giving","Oral -- receiving","Fingertip tracing","Breath on skin","Ice on skin","Warm mouth after ice","Feather touch","Firm grip","Full body weight","Restraint (wrists)","Restraint (legs)","Blindfold","Vibration","Simultaneous touch"];

const SENSATION_PHRASES={
  "Scalp massage":"fingers moving slowly through your hair, pressing into your scalp until everything else goes quiet",
  "Shoulder massage":"hands on your shoulders — firm and unhurried, working out whatever the day left behind",
  "Back massage":"palms following the full length of your back, all the way down, not rushing toward anything",
  "Deep kissing":"mouth finding yours — the kind of kissing that has nowhere else to be",
  "Neck kissing":"lips at your neck, warm breath before anything else, then mouth, then the edge of teeth",
  "Ear kissing":"breath close at your ear — felt before it's heard",
  "Chest touch":"hands moving across your chest, slow and open-palmed, taking their time",
  "Stomach kissing":"mouth tracing down your stomach, pausing where you least expect it",
  "Hip touching":"hands settling on your hips with full intent — not touching, gripping",
  "Inner thigh touch":"fingers tracing slowly inward along your thigh, stopping just before where you want them",
  "Light scratching":"fingernails dragging lightly down your back — just enough to feel, just enough to want more",
  "Firm grip":"hands gripping with intention — wherever you respond most",
  "Hair pulling":"fingers winding into your hair and pulling back slowly — deliberate, not urgent",
  "Biting (light)":"teeth grazing your shoulder, your neck, leaving warmth behind",
  "Biting (firm)":"teeth pressing in — enough to make you catch your breath, not enough to stop",
  "Spanking":"a firm hand exactly where you want it, sharp and then gone, then again",
  "Oral -- giving":"mouth moving lower, taking as long as it takes, giving everything that was promised",
  "Oral -- receiving":"receiving exactly what was promised — nothing rushed, nothing held back",
  "Fingertip tracing":"fingertips tracing patterns across you — arms, ribs, the backs of your knees",
  "Breath on skin":"warm breath moving across your skin before anything touches — the anticipation is the point",
  "Ice on skin":"the shock of ice tracing your collarbone, your spine — every nerve suddenly present",
  "Warm mouth after ice":"cold followed immediately by warm mouth, the contrast sending everything sideways",
  "Feather touch":"the lightest possible contact — barely there and completely impossible to ignore",
  "Restraint (wrists)":"wrists held above your head — not by force, by agreement, which is the more powerful version",
  "Restraint (legs)":"legs held in place while everything else continues and you cannot change a thing",
  "Blindfold":"sight taken away, everything that remains sharpened past the point of thinking clearly",
  "Vibration":"vibration exactly where you want it, sustained past the point of composure",
  "Simultaneous touch":"both of us giving and receiving at once — nothing sequential, all of it at the same time",
  "Full body weight":"full weight settling over you, grounding everything, nowhere to go and no reason to want to",
};

function buildSensationStory(seq){
  if(!seq.length)return"";
  const phrase=item=>SENSATION_PHRASES[item]||item.toLowerCase();
  const cut1=Math.ceil(seq.length*0.33);
  const cut2=cut1+Math.ceil(seq.length*0.40);
  const early=seq.slice(0,cut1);
  const mid=seq.slice(cut1,cut2);
  const late=seq.slice(cut2);
  const parts=[];
  if(early.length===1){
    parts.push("Tonight starts with "+phrase(early[0])+". Nothing else yet. Just that.");
  } else {
    const last=early[early.length-1];
    parts.push("Tonight starts with "+early.slice(0,-1).map(phrase).join(", then ")+" — and then "+phrase(last)+". Nothing else yet.");
  }
  if(mid.length>0){
    parts.push("Once you're there: "+mid.map(phrase).join(". Then ")+". Each one building on the last.");
  }
  if(late.length>0){
    parts.push("By the end — "+late.map(phrase).join(". ")+". All of it yours.");
  } else if(parts.length){
    parts[parts.length-1]=parts[parts.length-1].replace(/\.$/,"")+". All of it yours.";
  }
  return parts.join("\n\n");
}

const SENSATION_ESCALATION=[
  ["Scalp massage","Shoulder massage","Back massage"],
  ["Deep kissing","Neck kissing","Ear kissing"],
  ["Fingertip tracing","Feather touch","Breath on skin"],
  ["Chest touch","Stomach kissing","Hip touching","Inner thigh touch"],
  ["Light scratching","Firm grip","Hair pulling","Biting (light)","Biting (firm)"],
  ["Ice on skin","Warm mouth after ice"],
  ["Restraint (wrists)","Restraint (legs)","Blindfold"],
  ["Oral -- giving","Oral -- receiving","Vibration","Simultaneous touch"],
  ["Spanking"],
];

function buildSensationSequence(matches) {
  const seq = [];
  SENSATION_ESCALATION.forEach(group => {
    const hits = group.filter(item => matches.includes(item));
    hits.forEach(h => seq.push(h));
  });
  const remaining = matches.filter(m => !seq.includes(m));
  return [...seq, ...remaining];
}

const POISON_PAIRS=[
  ["Take complete control for the next 20 minutes -- every decision is yours","Surrender complete control for the next 20 minutes -- follow every instruction"],
  ["Oral only for the next round -- no penetration regardless of how much you want it","Full intensity immediately -- skip straight to what you both want most right now"],
  ["Blindfold your partner and explore freely for 15 minutes -- they cannot touch back","Be blindfolded and completely at your partner's mercy for 15 minutes"],
  ["Describe your most explicit fantasy out loud in full detail before anything physical happens","Act out a fantasy scenario without discussing it first -- choose and begin"],
  ["Slow and deliberate -- nothing rushed for the entire first hour","One intense quickie -- 10 minutes maximum then a full reset and slow build"],
  ["Toys only for the first round -- hands and mouths to finish","Hands and mouths only tonight -- no toys regardless of what is available"],
  ["You go first -- receive everything before you give anything","Give everything first -- your partner's pleasure before your own"],
  ["Change position every two minutes for 20 minutes -- no repeats","Stay in one position for 20 minutes straight -- no matter how much you want to switch"],
];

const FRONT_ZONES=[
  {id:"head",label:"Head & Hair",cx:50,cy:8,rx:7,ry:8},
  {id:"neck",label:"Neck",cx:50,cy:18,rx:4,ry:3},
  {id:"chest",label:"Chest",cx:50,cy:29,rx:10,ry:7},
  {id:"stomach",label:"Stomach",cx:50,cy:40,rx:8,ry:5},
  {id:"hips",label:"Hips",cx:50,cy:50,rx:10,ry:5},
  {id:"inner_thigh",label:"Inner Thighs",cx:50,cy:62,rx:8,ry:5},
  {id:"legs",label:"Legs",cx:50,cy:75,rx:7,ry:6},
  {id:"feet",label:"Feet",cx:50,cy:87,rx:6,ry:4},
];
const BACK_ZONES=[
  {id:"head_b",label:"Head & Neck",cx:50,cy:8,rx:7,ry:8},
  {id:"shoulders",label:"Shoulders",cx:50,cy:20,rx:12,ry:5},
  {id:"upper_back",label:"Upper Back",cx:50,cy:30,rx:9,ry:6},
  {id:"lower_back",label:"Lower Back",cx:50,cy:41,rx:8,ry:5},
  {id:"glutes",label:"Glutes",cx:50,cy:51,rx:10,ry:6},
  {id:"back_thigh",label:"Back of Thighs",cx:50,cy:63,rx:8,ry:5},
  {id:"calves",label:"Calves",cx:50,cy:75,rx:6,ry:6},
  {id:"feet_b",label:"Feet",cx:50,cy:87,rx:6,ry:4},
];
const ZONE_TIPS={head:"Run fingers through their hair slowly from root to tip. Scalp massage before anything else.",neck:"Start with breath on the neck before lips. Linger here longer than feels necessary -- it builds anticipation for everything that follows.",chest:"Slow open-palm pressure across the chest first. Then fingertips. Then mouth. Take your time with each transition.",stomach:"Kiss from the navel upward then back down. Stop just short of where they want you to go.",hips:"Firm hands on the hips -- grip rather than touch. Use this to guide movement when things escalate.",inner_thigh:"Start on the outer thigh and move inward over several minutes. The destination matters less than the journey toward it.",legs:"Long strokes from ankle to hip with flat palms before anything more focused. Wakes up the whole body.",feet:"A genuine foot massage before anything else resets the nervous system and signals the whole body to relax.",head_b:"Slow scalp pressure from the temples back. Move to the base of the skull with firm thumb pressure.",shoulders:"Firm pressure on the shoulders and upper back releases physical tension that blocks arousal. Spend more time here than you think you need to.",upper_back:"Full palm from lower back up to the shoulders. Then fingertips down the spine. Then lips between the shoulder blades.",lower_back:"Firm thumbs on either side of the spine at the lower back. Slow downward pressure. One of the most tension-holding areas in the body.",glutes:"Firm full-palm pressure. Often overlooked as a massage zone but deeply connected to overall physical release.",back_thigh:"Long strokes from knee to glute with increasing pressure. Switch between flat palm and fingertips.",calves:"Firm grip from ankle upward. Often tense from daily activity -- releasing this has a full-body effect.",feet_b:"Thumb pressure on the arch of the foot. Work from heel to toe slowly. Underestimated impact on full-body relaxation."};

// SPIN THE WHEEL
const CATS=Object.keys(DARES);
const INTENSITY_LEVELS=["Soft","Medium","Explicit"];
const INTENSITY_POOL={
  Soft:["Foreplay","Sensory"],
  Medium:["Foreplay","Sensory","Toys","Outdoor","Roleplay"],
  Explicit:["Foreplay","Sensory","Toys","Outdoor","Roleplay","Fantasy","Power Play"],
};

function SpinWheel(){
  const[sel,setSel]=useState([]);
  const[intensity,setIntensity]=useState("Medium");
  const[result,setResult]=useState(null);
  const[spinning,setSpinning]=useState(false);
  const toggle=(c)=>{setSel(p=>p.includes(c)?p.filter(x=>x!==c):[...p,c]);setResult(null);};
  const spin=()=>{
    if(!sel.length)return;
    setSpinning(true);setResult(null);
    setTimeout(()=>{
      const cat=rnd(sel);
      const dare=rnd(DARES[cat].items);
      const spontaneous=DARES[cat].spontaneous;
      setResult({dare,cat,spontaneous});
      setSpinning(false);
    },600);
  };
  return(
    <div>
      <p style={s.label}>Intensity</p>
      <div style={{marginBottom:16}}>
        {INTENSITY_LEVELS.map(l=>(
          <span key={l} style={s.chip(intensity===l)} onClick={()=>{setIntensity(l);setSel([]);setResult(null);}}>{l}</span>
        ))}
      </div>
      <p style={s.label}>Categories</p>
      <div style={{marginBottom:20}}>
        {(INTENSITY_POOL[intensity]||CATS).map(c=>(
          <span key={c} style={s.chip(sel.includes(c))} onClick={()=>toggle(c)}>{c}</span>
        ))}
      </div>
      <button style={{...s.btn,opacity:!sel.length?0.4:1,transform:spinning?"scale(0.97)":"scale(1)",transition:"all 0.2s"}} onClick={spin} disabled={!sel.length||spinning}>
        {spinning?"Spinning...":"Spin the Wheel"}
      </button>
      {result&&(
        <>
          <div style={s.box}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{...s.label,margin:0,fontSize:10,color:C.gold}}>{result.cat}</span>
              <span style={{fontSize:10,letterSpacing:1,padding:"3px 10px",borderRadius:2,border:"1px solid "+(result.spontaneous?"#4a7c4a":"#7c4a4a"),color:result.spontaneous?"#7ec87e":"#c87e7e",textTransform:"uppercase"}}>
                {result.spontaneous?"Spontaneous":"Needs Setup"}
              </span>
            </div>
            <div style={s.orn}>✦ ✦ ✦</div>
            {result.dare}
            <div style={s.orn}>✦ ✦ ✦</div>
          </div>
          <button style={{...s.btnO,marginTop:12}} onClick={spin}>Spin Again</button>
        </>
      )}
    </div>
  );
}

// MOOD MATCHER
function MoodMatcher(){
  const[phase,setPhase]=useState("p1");
  const[p1,setP1]=useState([]);
  const[p2,setP2]=useState([]);
  const[result,setResult]=useState(null);
  const cur=phase==="p1"?p1:p2;
  const setCur=phase==="p1"?setP1:setP2;
  const toggle=(m)=>setCur(p=>p.includes(m)?p.filter(x=>x!==m):[...p,m]);
  const lockIn=()=>{if(phase==="p1"){setPhase("p2");return;}setResult(buildBridge(p1,p2));setPhase("reveal");};
  const reset=()=>{setPhase("p1");setP1([]);setP2([]);setResult(null);};
  if(phase==="reveal"&&result)return(
    <div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>
        {[["Partner 1",p1],["Partner 2",p2]].map(([label,picks])=>(
          <div key={label} style={{background:C.card,border:"1px solid #3d1f2e",borderRadius:4,padding:14}}>
            <p style={{...s.label,marginBottom:10,fontSize:10}}>{label}</p>
            {picks.length?picks.map(m=><div key={m} style={{fontSize:12,color:C.text,padding:"4px 0",borderBottom:"1px solid #3d1f2e"}}>{m}</div>):<div style={{fontSize:12,color:C.muted}}>Nothing selected</div>}
          </div>
        ))}
      </div>
      {result.type==="overlap"?(
        <><p style={{...s.label,color:C.gold}}>You Both Want</p><div style={{marginBottom:12}}>{result.items.map(m=><span key={m} style={{...s.chip(true),cursor:"default"}}>{m}</span>)}</div></>
      ):(
        <p style={{...s.label,color:"#e07050"}}>Different Desires -- Here is Your Bridge</p>
      )}
      <div style={s.box}><div style={s.orn}>✦ ✦ ✦</div>{result.text}<div style={s.orn}>✦ ✦ ✦</div></div>
      <button style={{...s.btnO,marginTop:16}} onClick={reset}>Play Again</button>
    </div>
  );
  return(
    <div>
      <div style={{background:C.card,border:"1px solid #3d1f2e",borderRadius:4,padding:20,marginBottom:16}}>
        <p style={{...s.label,marginBottom:4}}>{phase==="p1"?"Partner 1":"Partner 2"}</p>
        <p style={{color:C.muted,fontSize:12,margin:"0 0 16px",letterSpacing:1}}>{phase==="p1"?"Select your desires then hand the phone over.":"Select your desires -- both picks will be revealed."}</p>
        <div>{MOODS.map(m=><span key={m} style={s.chip(cur.includes(m))} onClick={()=>toggle(m)}>{m}</span>)}</div>
      </div>
      <button style={{...s.btnG,opacity:!cur.length?0.4:1}} onClick={lockIn} disabled={!cur.length}>{phase==="p1"?"Lock In + Pass Phone":"Reveal"}</button>
    </div>
  );
}

// DATE NIGHT
const INTENSITIES=["Romantic warmup","Sensual build","Full evening","All night"];
const SETTINGS=["At home","Hotel room","Outdoor / risky","Surprise me"];
function DateNight(){
  const[intensity,setIntensity]=useState("");
  const[setting,setSetting]=useState("");
  const[plan,setPlan]=useState(null);
  const generate=()=>{
    const key=intensity+"+"+setting;
    const found=DATE_PLANS[key];
    if(found){setPlan(found);return;}
    const fb=Object.keys(DATE_PLANS).find(k=>k.startsWith(intensity));
    setPlan(fb?DATE_PLANS[fb]:Object.values(DATE_PLANS)[0]);
  };
  return(
    <div>
      <p style={s.label}>Intensity</p>
      <div style={{marginBottom:20}}>{INTENSITIES.map(i=><span key={i} style={s.chip(intensity===i)} onClick={()=>{setIntensity(i);setPlan(null);}}>{i}</span>)}</div>
      <p style={s.label}>Setting</p>
      <div style={{marginBottom:20}}>{SETTINGS.map(st=><span key={st} style={s.chip(setting===st)} onClick={()=>{setSetting(st);setPlan(null);}}>{st}</span>)}</div>
      <button style={{...s.btn,opacity:(!intensity||!setting)?0.4:1}} onClick={generate} disabled={!intensity||!setting}>Plan Our Night</button>
      {plan&&(
        <div style={{marginTop:16}}>
          {[plan.phase1,plan.phase2,plan.phase3].map((ph,i)=>(
            <div key={i} style={{...s.box,marginTop:i===0?16:12}}>
              <p style={{...s.label,color:C.gold,marginBottom:8}}>Phase {i+1} -- {ph.title}</p>
              {ph.body}
            </div>
          ))}
          <button style={{...s.btnO,marginTop:12}} onClick={generate}>Generate Another</button>
        </div>
      )}
    </div>
  );
}

// WILD CARD
function WildCard(){
  const[result,setResult]=useState("");
  const[vis,setVis]=useState(false);
  const draw=()=>{setVis(false);setTimeout(()=>{setResult(rnd(WILD_CARDS));setVis(true);},300);};
  return(
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:48,color:C.deep,margin:"20px 0"}}>✦</div>
      <p style={{color:C.muted,fontSize:13,letterSpacing:2,textTransform:"uppercase",marginBottom:32}}>One tap. No thinking. Just do it.</p>
      <button style={s.btnG} onClick={draw}>Draw Wild Card</button>
      {result&&(
        <>
          <div style={{...s.box,textAlign:"left",opacity:vis?1:0,transform:vis?"scale(1)":"scale(0.97)",transition:"all 0.3s"}}>
            <div style={s.orn}>✦ ✦ ✦</div>{result}<div style={s.orn}>✦ ✦ ✦</div>
          </div>
          <button style={{...s.btnO,marginTop:12}} onClick={draw}>Draw Again</button>
        </>
      )}
    </div>
  );
}

// MAYBE CARD
function MaybeCard({kinkKey}){
  const[open,setOpen]=useState(false);
  const label=kinkKey.charAt(0).toUpperCase()+kinkKey.slice(1);
  return(
    <div onClick={()=>setOpen(o=>!o)} style={{background:C.card,border:"1px solid #e07050",borderRadius:4,padding:16,marginBottom:10,cursor:"pointer"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:13,color:"#e07050",letterSpacing:1}}>{label}</span>
        <span style={{color:"#e07050",fontSize:16}}>{open?"-":"+"}</span>
      </div>
      {open&&<p style={{fontSize:13,color:C.text,margin:"12px 0 0",lineHeight:1.7}}>{MAYBE_IDEAS[kinkKey]||"Talk about what specifically appeals and what feels like too much. Find the version of this that works for both of you."}</p>}
    </div>
  );
}

// KINK QUIZ
function KinkQuiz(){
  const[phase,setPhase]=useState("p1");
  const[p1ans,setP1ans]=useState({});
  const[p2ans,setP2ans]=useState({});
  const[reveal,setReveal]=useState(false);
  const ans=phase==="p1"?p1ans:p2ans;
  const setAns=phase==="p1"?setP1ans:setP2ans;
  const answered=Object.keys(ans).length;
  const lockIn=()=>{if(phase==="p1"){setPhase("p2");}else{setReveal(true);}};
  const reset=()=>{setPhase("p1");setP1ans({});setP2ans({});setReveal(false);};
  if(reveal){
    const matches=KINK_QUESTIONS.filter(q=>p1ans[q.key]==="Yes"&&p2ans[q.key]==="Yes").map(q=>q.key);
    const maybes=KINK_QUESTIONS.filter(q=>(p1ans[q.key]==="Maybe"||p2ans[q.key]==="Maybe")&&(p1ans[q.key]!=="No"&&p2ans[q.key]!=="No")).map(q=>q.key);
    return(
      <div>
        {matches.length>0?(
          <>
            <p style={{...s.label,color:C.gold}}>Both Yes</p>
            <div style={{marginBottom:12}}>{matches.map(k=><span key={k} style={{...s.chip(true),cursor:"default"}}>{k}</span>)}</div>
            <div style={s.box}><div style={s.orn}>✦ ✦ ✦</div>{KINK_SUGGESTIONS[matches[0]]||"You have strong alignment. Pick any shared interest and build an evening around it."}<div style={s.orn}>✦ ✦ ✦</div></div>
          </>
        ):(
          <div style={s.box}><p style={{color:C.muted,margin:0,textAlign:"center"}}>No exact matches this round. Check the Worth Discussing section below.</p></div>
        )}
        {maybes.length>0&&(
          <>
            <p style={{...s.label,color:"#e07050",marginTop:20}}>Worth Discussing</p>
            <p style={{color:C.muted,fontSize:12,marginBottom:12,letterSpacing:1}}>Tap any to get an idea</p>
            <div>{maybes.map(k=><MaybeCard key={k} kinkKey={k}/>)}</div>
          </>
        )}
        <button style={{...s.btnO,marginTop:16}} onClick={reset}>Retake Quiz</button>
      </div>
    );
  }
  return(
    <div>
      <div style={{background:C.card,border:"1px solid #3d1f2e",borderRadius:4,padding:20,marginBottom:16}}>
        <p style={{...s.label,marginBottom:4}}>{phase==="p1"?"Partner 1":"Partner 2"}</p>
        <p style={{color:C.muted,fontSize:12,margin:"0 0 20px",letterSpacing:1}}>{answered} of {KINK_QUESTIONS.length} answered{phase==="p1"?" -- then hand the phone over":""}</p>
        {KINK_QUESTIONS.map(q=>(
          <div key={q.key} style={{marginBottom:16}}>
            <p style={{fontSize:13,margin:"0 0 8px",color:C.text}}>{q.q}</p>
            <div style={{display:"flex",gap:8}}>
              {KINK_LABELS.map(l=>{
                const sel=ans[q.key]===l;
                const col=l==="Yes"?C.gold:l==="Maybe"?"#e07050":"#888";
                return(
                  <button key={l} onClick={()=>setAns(p=>({...p,[q.key]:l}))} style={{flex:1,padding:"8px 4px",borderRadius:2,border:"1px solid "+(sel?col:C.border),background:sel?"rgba(100,100,100,0.2)":"none",color:sel?col:C.muted,fontSize:12,cursor:"pointer",fontFamily:"Georgia,serif"}}>
                    {l}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <button style={{...s.btnG,opacity:answered<KINK_QUESTIONS.length?0.4:1}} onClick={lockIn} disabled={answered<KINK_QUESTIONS.length}>
        {phase==="p1"?"Lock In + Pass Phone":"Reveal Compatibility"}
      </button>
    </div>
  );
}

// POSITION GUIDE
const POS_ANIM_STYLE = `
  @keyframes pos-breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
  @keyframes pos-bob { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-5px)} }
  @keyframes pos-sway { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(4deg)} }
  @keyframes pos-pulse { 0%,100%{opacity:0.65} 50%{opacity:1} }
  .pA { transform-box:fill-box; transform-origin:center; animation:pos-breathe 2.8s ease-in-out infinite; }
  .pB { transform-box:fill-box; transform-origin:center; animation:pos-breathe 2.8s ease-in-out 1s infinite; }
  .pA-bob { transform-box:fill-box; transform-origin:center; animation:pos-bob 2.2s ease-in-out infinite; }
  .pB-pulse { transform-box:fill-box; transform-origin:center; animation:pos-pulse 2.5s ease-in-out infinite; }
  .pA-sway { transform-box:fill-box; transform-origin:center; animation:pos-sway 3s ease-in-out infinite; }
`;
const cA="#c9a84c", cB="#8a3555";
function getDiagramType(pos){
  if(["Standing","Face to Face Standing"].includes(pos.name))return"standing";
  if(["Edge of Bed","Butterfly","The Bridge","Standing Split"].includes(pos.name))return"edge";
  if(["Lotus","The Throne"].includes(pos.name))return"sitting";
  if(["Cowgirl","Reverse Cowgirl","Lap Dance","The Chair"].includes(pos.name))return"ontop";
  if(pos.who==="Behind partner")return"behind";
  return"lying";
}
function PositionDiagram({position}){
  const type=getDiagramType(position);
  const sv={width:"100%",height:130,display:"block"};
  const wrap={background:"#0f0609",borderRadius:4,marginBottom:16,overflow:"hidden",border:"1px solid #3d1f2e"};
  const diagrams={
    lying:(
      <svg viewBox="0 0 140 90" style={sv}>
        <g className="pB"><ellipse cx="65" cy="60" rx="32" ry="9" fill={cB} opacity="0.8"/><circle cx="98" cy="60" r="7" fill={cB} opacity="0.9"/></g>
        <g className="pA"><ellipse cx="62" cy="44" rx="28" ry="8" fill={cA} opacity="0.8"/><circle cx="91" cy="44" r="6" fill={cA} opacity="0.9"/></g>
      </svg>
    ),
    sitting:(
      <svg viewBox="0 0 140 100" style={sv}>
        <g className="pA-sway"><ellipse cx="43" cy="66" rx="12" ry="22" fill={cA} opacity="0.8"/><circle cx="43" cy="38" r="8" fill={cA} opacity="0.9"/></g>
        <g className="pB-pulse"><ellipse cx="97" cy="66" rx="12" ry="22" fill={cB} opacity="0.8"/><circle cx="97" cy="38" r="8" fill={cB} opacity="0.9"/></g>
      </svg>
    ),
    ontop:(
      <svg viewBox="0 0 140 100" style={sv}>
        <g className="pB"><ellipse cx="60" cy="76" rx="32" ry="9" fill={cB} opacity="0.8"/><circle cx="93" cy="76" r="7" fill={cB} opacity="0.9"/></g>
        <g className="pA-bob"><ellipse cx="62" cy="52" rx="9" ry="20" fill={cA} opacity="0.8"/><circle cx="62" cy="28" r="7" fill={cA} opacity="0.9"/></g>
      </svg>
    ),
    behind:(
      <svg viewBox="0 0 140 90" style={sv}>
        <g className="pA"><ellipse cx="55" cy="46" rx="28" ry="7" fill={cA} opacity="0.8"/><circle cx="84" cy="46" r="5" fill={cA} opacity="0.9"/></g>
        <g className="pB"><ellipse cx="62" cy="60" rx="30" ry="8" fill={cB} opacity="0.8"/><circle cx="93" cy="60" r="6" fill={cB} opacity="0.9"/></g>
      </svg>
    ),
    edge:(
      <svg viewBox="0 0 140 100" style={sv}>
        <g className="pB"><ellipse cx="50" cy="72" rx="32" ry="8" fill={cB} opacity="0.8"/><circle cx="18" cy="72" r="7" fill={cB} opacity="0.9"/></g>
        <g className="pA-bob"><ellipse cx="106" cy="58" rx="8" ry="24" fill={cA} opacity="0.8"/><circle cx="106" cy="28" r="7" fill={cA} opacity="0.9"/></g>
      </svg>
    ),
    standing:(
      <svg viewBox="0 0 140 100" style={sv}>
        <g className="pA-sway"><ellipse cx="55" cy="63" rx="8" ry="24" fill={cA} opacity="0.8"/><circle cx="55" cy="32" r="8" fill={cA} opacity="0.9"/></g>
        <g className="pB-pulse"><ellipse cx="85" cy="63" rx="8" ry="24" fill={cB} opacity="0.8"/><circle cx="85" cy="32" r="8" fill={cB} opacity="0.9"/></g>
      </svg>
    ),
  };
  return(
    <>
      <style>{POS_ANIM_STYLE}</style>
      <div style={wrap}>{diagrams[type]||diagrams.lying}</div>
    </>
  );
}

function PositionGuide(){
  const[filter,setFilter]=useState("All");
  const[selected,setSelected]=useState(null);
  const intensities=["All",...new Set(POSITIONS.map(p=>p.intensity))];
  const filtered=filter==="All"?POSITIONS:POSITIONS.filter(p=>p.intensity===filter);
  if(selected)return(
    <div>
      <button style={{...s.btnO,marginBottom:16,width:"auto",padding:"8px 16px"}} onClick={()=>setSelected(null)}>Back</button>
      <PositionDiagram position={selected}/>
      <div style={{background:C.card,border:"1px solid #3d1f2e",borderRadius:4,padding:20}}>
        <h2 style={{...s.label,fontSize:16,letterSpacing:2,marginBottom:4}}>{selected.name}</h2>
        <div style={{display:"flex",gap:8,marginBottom:16}}>
          <span style={{...s.chip(false),cursor:"default",fontSize:10}}>{selected.intensity}</span>
          <span style={{...s.chip(false),cursor:"default",fontSize:10}}>{selected.who}</span>
        </div>
        <p style={{lineHeight:1.8,fontSize:15,color:C.text,margin:0}}>{selected.desc}</p>
      </div>
      <button style={{...s.btnO,marginTop:12}} onClick={()=>setSelected(POSITIONS[Math.floor(Math.random()*POSITIONS.length)])}>Random Position</button>
    </div>
  );
  return(
    <div>
      <p style={s.label}>Position Guide</p>
      <div style={{marginBottom:16}}>{intensities.map(i=><span key={i} style={s.chip(filter===i)} onClick={()=>setFilter(i)}>{i}</span>)}</div>
      {filtered.map(p=>(
        <div key={p.name} onClick={()=>setSelected(p)} style={{background:C.card,border:"1px solid #3d1f2e",borderRadius:4,padding:16,marginBottom:10,cursor:"pointer"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:15,color:C.text}}>{p.name}</span>
            <div style={{display:"flex",gap:6}}>
              <span style={{fontSize:10,color:C.muted,border:"1px solid #3d1f2e",borderRadius:2,padding:"2px 8px"}}>{p.intensity}</span>
              <span style={{fontSize:10,color:C.gold}}>&#8250;</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// BODY MAP
function BodyMap(){
  const[phase,setPhase]=useState("mark");
  const[side,setSide]=useState("front");
  const[frontMarked,setFrontMarked]=useState([]);
  const[backMarked,setBackMarked]=useState([]);
  const[revealed,setRevealed]=useState(false);
  const zones=side==="front"?FRONT_ZONES:BACK_ZONES;
  const marked=side==="front"?frontMarked:backMarked;
  const setMarked=side==="front"?setFrontMarked:setBackMarked;
  const allMarked=[...frontMarked,...backMarked];
  const toggle=(id)=>setMarked(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
  if(revealed){
    const suggestions=allMarked.map(id=>{
      const zone=[...FRONT_ZONES,...BACK_ZONES].find(z=>z.id===id);
      return{id,label:zone?zone.label:id,tip:ZONE_TIPS[id]||"Explore this zone slowly before moving on."};
    });
    return(
      <div>
        <p style={s.label}>They Want You Here</p>
        {suggestions.length===0&&<div style={s.box}><p style={{color:C.muted,margin:0,textAlign:"center"}}>No zones selected.</p></div>}
        {suggestions.map(sg=>(
          <div key={sg.id} style={{background:C.card,border:"1px solid #3d1f2e",borderRadius:4,padding:16,marginBottom:10}}>
            <p style={{...s.label,marginBottom:8,fontSize:12}}>{sg.label}</p>
            <p style={{fontSize:14,lineHeight:1.7,color:C.text,margin:0}}>{sg.tip}</p>
          </div>
        ))}
        <button style={{...s.btnO,marginTop:8}} onClick={()=>{setFrontMarked([]);setBackMarked([]);setPhase("mark");setRevealed(false);}}>Reset</button>
      </div>
    );
  }
  if(phase==="hand")return(
    <div style={{textAlign:"center",paddingTop:40}}>
      <div style={{fontSize:48,marginBottom:24}}>&#128241;</div>
      <p style={{fontSize:15,lineHeight:1.8,color:C.text,marginBottom:32}}>Hand the phone to your partner.<br/>They will see exactly where you want to be touched.</p>
      <button style={s.btnG} onClick={()=>setRevealed(true)}>I Have the Phone</button>
    </div>
  );
  return(
    <div>
      <p style={s.label}>Tap Where You Want to Be Touched</p>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {["front","back"].map(sd=>(
          <span key={sd} style={{...s.chip(side===sd),textTransform:"capitalize"}} onClick={()=>setSide(sd)}>{sd}</span>
        ))}
      </div>
      <p style={{color:C.muted,fontSize:12,marginBottom:16,letterSpacing:1}}>{allMarked.length} zone{allMarked.length!==1?"s":""} selected total</p>
      <div style={{position:"relative",width:"100%",paddingBottom:"110%",marginBottom:16}}>
        <svg viewBox="0 0 100 110" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}>
          {side==="front"?(
            <>
              <ellipse cx="50" cy="8" rx="7" ry="8" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <rect x="44" y="15" width="12" height="5" rx="2" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <rect x="34" y="19" width="32" height="14" rx="4" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <rect x="36" y="32" width="28" height="20" rx="3" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <rect x="36" y="51" width="28" height="12" rx="3" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <rect x="37" y="62" width="11" height="26" rx="3" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <rect x="52" y="62" width="11" height="26" rx="3" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <ellipse cx="42" cy="90" rx="5" ry="4" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <ellipse cx="58" cy="90" rx="5" ry="4" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
            </>
          ):(
            <>
              <ellipse cx="50" cy="8" rx="7" ry="8" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <rect x="34" y="15" width="32" height="8" rx="3" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <rect x="36" y="22" width="28" height="14" rx="3" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <rect x="36" y="35" width="28" height="12" rx="3" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <rect x="35" y="46" width="30" height="12" rx="3" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <rect x="37" y="57" width="11" height="26" rx="3" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <rect x="52" y="57" width="11" height="26" rx="3" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <ellipse cx="42" cy="85" rx="5" ry="4" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
              <ellipse cx="58" cy="85" rx="5" ry="4" fill={C.card} stroke={C.border} strokeWidth="0.5"/>
            </>
          )}
          {zones.map(z=>(
            <ellipse key={z.id} cx={z.cx} cy={z.cy} rx={z.rx} ry={z.ry}
              fill={marked.includes(z.id)?"rgba(201,168,76,0.45)":"rgba(201,168,76,0.07)"}
              stroke={marked.includes(z.id)?C.gold:C.border}
              strokeWidth="0.8" onClick={()=>toggle(z.id)} style={{cursor:"pointer"}}/>
          ))}
        </svg>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:20}}>
        {zones.map(z=><span key={z.id} style={s.chip(marked.includes(z.id))} onClick={()=>toggle(z.id)}>{z.label}</span>)}
      </div>
      <button style={{...s.btnG,opacity:!allMarked.length?0.4:1}} disabled={!allMarked.length} onClick={()=>setPhase("hand")}>
        Done -- Hand Phone Over
      </button>
    </div>
  );
}

// HOT OR NOT
function HotOrNot(){
  const[phase,setPhase]=useState("p1");
  const[p1votes,setP1votes]=useState({});
  const[p2votes,setP2votes]=useState({});
  const[matches,setMatches]=useState([]);
  const[usedIdxs,setUsedIdxs]=useState([]);
  const[currentIdea,setCurrentIdea]=useState(null);
  const votes=phase==="p1"?p1votes:p2votes;
  const setVotes=phase==="p1"?setP1votes:setP2votes;
  const answered=Object.keys(votes).length;
  const vote=(item,val)=>setVotes(p=>{const n={...p};if(n[item]===val)delete n[item];else n[item]=val;return n;});
  const lockIn=()=>{
    if(phase==="p1"){setPhase("p2");return;}
    const m=HOT_OR_NOT_ITEMS.filter(i=>p1votes[i]==="hot"&&p2votes[i]==="hot");
    setMatches(m);setPhase("reveal");
    if(m.length>0){setCurrentIdea(m[0]);setUsedIdxs([0]);}
  };
  const nextIdea=()=>{
    if(!matches.length)return;
    const allIdxs=matches.map((_,i)=>i);
    const pool=usedIdxs.length>=matches.length?allIdxs:allIdxs.filter(i=>!usedIdxs.includes(i));
    const idx=rnd(pool);
    setCurrentIdea(matches[idx]);
    setUsedIdxs(p=>p.length>=matches.length?[idx]:[...p,idx]);
  };
  const reset=()=>{setPhase("p1");setP1votes({});setP2votes({});setMatches([]);setUsedIdxs([]);setCurrentIdea(null);};
  if(phase==="reveal")return(
    <div>
      <p style={s.label}>Your Matches</p>
      <div style={{background:C.card,border:"1px solid #3d1f2e",borderRadius:4,padding:"12px 16px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{color:C.muted,fontSize:12,letterSpacing:1}}>Matched</span>
        <span style={{color:C.gold,fontSize:20,fontWeight:"normal"}}>{matches.length} <span style={{fontSize:12,color:C.muted}}>of {HOT_OR_NOT_ITEMS.length}</span></span>
      </div>
      {!matches.length?(
        <div style={s.box}><p style={{color:C.muted,margin:0,textAlign:"center"}}>No exact matches this time.<br/><span style={{fontSize:12}}>Try again -- you might surprise each other.</span></p></div>
      ):(
        <>
          <div style={{marginBottom:16}}>{matches.map(m=><span key={m} style={{...s.chip(true),cursor:"default"}}>{m}</span>)}</div>
          {currentIdea&&(
            <>
              <p style={{...s.label,marginTop:8}}>Tonight's Idea</p>
              <div style={s.box}>
                <div style={s.orn}>✦ ✦ ✦</div>
                {HOT_OR_NOT_IDEAS[currentIdea]||"Explore "+currentIdea+" together tonight."}
                <div style={s.orn}>✦ ✦ ✦</div>
              </div>
              <button style={{...s.btnO,marginTop:12}} onClick={nextIdea}>Another Idea</button>
            </>
          )}
        </>
      )}
      <button style={{...s.btnO,marginTop:12}} onClick={reset}>Retake</button>
    </div>
  );
  return(
    <div>
      <div style={{background:C.card,border:"1px solid #3d1f2e",borderRadius:4,padding:20,marginBottom:16}}>
        <p style={{...s.label,marginBottom:4}}>{phase==="p1"?"Partner 1":"Partner 2"}</p>
        <p style={{color:C.muted,fontSize:12,margin:"0 0 16px",letterSpacing:1}}>
          {answered} of {HOT_OR_NOT_ITEMS.length} rated
          {phase==="p1"?" -- hand phone over after":""}
        </p>
        {HOT_OR_NOT_ITEMS.map(item=>{
          const isHot=votes[item]==="hot";
          const isMaybe=votes[item]==="maybe";
          const isNot=votes[item]==="not";
          const base={padding:"6px 10px",borderRadius:2,fontSize:11,cursor:"pointer",fontFamily:"Georgia,serif"};
          return(
            <div key={item} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #3d1f2e"}}>
              <span style={{fontSize:13,color:C.text,flex:1,paddingRight:8}}>{item}</span>
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>vote(item,"hot")} style={{...base,border:"1px solid "+(isHot?C.gold:C.border),background:isHot?"rgba(201,168,76,0.2)":"none",color:isHot?C.gold:C.muted}}>Hot</button>
                <button onClick={()=>vote(item,"maybe")} style={{...base,border:"1px solid "+(isMaybe?"#e07050":C.border),background:isMaybe?"rgba(224,112,80,0.2)":"none",color:isMaybe?"#e07050":C.muted}}>Maybe</button>
                <button onClick={()=>vote(item,"not")} style={{...base,border:"1px solid "+(isNot?"#888":C.border),background:isNot?"rgba(136,136,136,0.15)":"none",color:isNot?"#aaa":C.muted}}>Not</button>
              </div>
            </div>
          );
        })}
      </div>
      <button style={{...s.btnG,opacity:answered<HOT_OR_NOT_ITEMS.length?0.4:1}} onClick={lockIn} disabled={answered<HOT_OR_NOT_ITEMS.length}>
        {phase==="p1"?"Lock In + Pass Phone":"Reveal Matches"}
      </button>
    </div>
  );
}

// SENSATION MENU
function SensationMenu(){
  const[selected,setSelected]=useState([]);
  const[story,setStory]=useState("");
  const[generated,setGenerated]=useState(false);
  const[copied,setCopied]=useState(false);
  const toggle=(i)=>setSelected(p=>p.includes(i)?p.filter(x=>x!==i):[...p,i]);
  const generate=()=>{
    const seq=buildSensationSequence(selected);
    setStory(buildSensationStory(seq));
    setGenerated(true);
  };
  const reset=()=>{setSelected([]);setStory("");setGenerated(false);setCopied(false);};
  const copyStory=()=>{
    const text="A note for tonight\n\n"+story+"\n\n— Apres Minuit";
    navigator.clipboard.writeText(text).then(()=>{
      setCopied(true);setTimeout(()=>setCopied(false),2500);
    });
  };
  if(generated)return(
    <div>
      <p style={s.label}>A Note for Tonight</p>
      <div style={s.box}>
        <div style={s.orn}>✦ ✦ ✦</div>
        {story.split("\n\n").map((para,i)=>(
          <p key={i} style={{margin:"0 0 16px",color:C.text,lineHeight:1.9,fontSize:14}}>{para}</p>
        ))}
        <div style={s.orn}>✦ ✦ ✦</div>
      </div>
      <button style={{...s.btnG,marginTop:16}} onClick={copyStory}>
        {copied?"Copied ✓":"Copy to Send"}
      </button>
      <p style={{color:C.muted,fontSize:11,textAlign:"center",marginTop:8,letterSpacing:1,lineHeight:1.6}}>
        Paste into a text or email to set the mood
      </p>
      <button style={{...s.btnO,marginTop:12}} onClick={reset}>Start Over</button>
    </div>
  );
  return(
    <div>
      <div style={{background:C.card,border:"1px solid #3d1f2e",borderRadius:4,padding:20,marginBottom:16}}>
        <p style={{...s.label,marginBottom:4}}>What are you in the mood for?</p>
        <p style={{color:C.muted,fontSize:12,margin:"0 0 16px",letterSpacing:1}}>
          Select what you want tonight. We'll turn it into a story your partner can read before you begin.
        </p>
        <div>{SENSATION_ITEMS.map(i=><span key={i} style={s.chip(selected.includes(i))} onClick={()=>toggle(i)}>{i}</span>)}</div>
      </div>
      <p style={{color:C.muted,fontSize:11,textAlign:"center",marginBottom:12,letterSpacing:1}}>{selected.length} selected</p>
      <button style={{...s.btnG,opacity:!selected.length?0.4:1}} onClick={generate} disabled={!selected.length}>
        Write the Note
      </button>
    </div>
  );
}

// PICK YOUR POISON
function PickYourPoison(){
  const[pair,setPair]=useState(null);
  const[chosen,setChosen]=useState(null);
  const draw=()=>{setPair(rnd(POISON_PAIRS));setChosen(null);};
  return(
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:48,color:C.deep,margin:"20px 0"}}>&#9879;</div>
      <p style={{color:C.muted,fontSize:13,letterSpacing:2,textTransform:"uppercase",marginBottom:32}}>Two options. You must choose one.</p>
      <button style={s.btn} onClick={draw}>Draw Two Options</button>
      {pair&&!chosen&&(
        <div style={{marginTop:20}}>
          {pair.map((option,i)=>(
            <div key={i} onClick={()=>setChosen(i)} style={{background:C.card,border:"1px solid #3d1f2e",borderRadius:4,padding:20,marginBottom:12,cursor:"pointer",textAlign:"left",lineHeight:1.7,fontSize:14,color:C.text}}>
              <span style={{color:C.gold,letterSpacing:2,fontSize:11,textTransform:"uppercase",display:"block",marginBottom:8}}>Option {i===0?"A":"B"}</span>
              {option}
            </div>
          ))}
        </div>
      )}
      {chosen!==null&&(
        <>
          <div style={{...s.box,textAlign:"left",marginTop:20}}>
            <div style={s.orn}>✦ ✦ ✦</div>
            <p style={{...s.label,marginBottom:8}}>You Chose</p>
            {pair[chosen]}
            <div style={s.orn}>✦ ✦ ✦</div>
          </div>
          <button style={{...s.btnO,marginTop:12}} onClick={draw}>Draw Again</button>
        </>
      )}
    </div>
  );
}

// DICE MODE
const DICE_CATS=Object.keys(DARES);
function DiceMode(){
  const[rolling,setRolling]=useState(false);
  const[result,setResult]=useState(null);
  const[d1,setD1]=useState(null);
  const[d2,setD2]=useState(null);
  const[committed,setCommitted]=useState(false);
  const FACES=["","&#9856;","&#9857;","&#9858;","&#9859;","&#9860;","&#9861;"];
  const roll=()=>{
    setRolling(true);setResult(null);setCommitted(false);
    let count=0;
    const interval=setInterval(()=>{
      setD1(Math.floor(Math.random()*6)+1);
      setD2(Math.floor(Math.random()*6)+1);
      count++;
      if(count>8){
        clearInterval(interval);
        const cat=rnd(DICE_CATS);
        const dare=rnd(DARES[cat].items);
        const spontaneous=DARES[cat].spontaneous;
        setResult({cat,dare,spontaneous});
        setRolling(false);
      }
    },100);
  };
  return(
    <div style={{textAlign:"center"}}>
      <p style={{color:C.muted,fontSize:13,letterSpacing:2,textTransform:"uppercase",marginBottom:32}}>Roll to discover your dare</p>
      <div style={{display:"flex",justifyContent:"center",gap:24,marginBottom:32}}>
        {[d1,d2].map((d,i)=>(
          <div key={i} style={{fontSize:64,color:d?C.gold:C.border,transition:"all 0.1s",filter:rolling?"blur(1px)":"none"}} dangerouslySetInnerHTML={{__html:d?FACES[d]:FACES[1]}}/>
        ))}
      </div>
      {result&&!rolling&&!committed&&(
        <>
          <div style={{...s.box,textAlign:"left",marginTop:0}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
              <span style={{...s.label,margin:0,fontSize:10}}>{result.cat}</span>
              <span style={{fontSize:10,letterSpacing:1,padding:"3px 10px",borderRadius:2,border:"1px solid "+(result.spontaneous?"#4a7c4a":"#7c4a4a"),color:result.spontaneous?"#7ec87e":"#c87e7e",textTransform:"uppercase"}}>
                {result.spontaneous?"Spontaneous":"Needs Setup"}
              </span>
            </div>
            <div style={s.orn}>✦ ✦ ✦</div>
            {result.dare}
            <div style={s.orn}>✦ ✦ ✦</div>
          </div>
          <button style={{...s.btnG,marginTop:12}} onClick={()=>setCommitted(true)}>Commit to This</button>
          <button style={{...s.btnO,marginTop:10}} onClick={roll}>Roll Again</button>
        </>
      )}
      {committed&&(
        <>
          <div style={{...s.box,textAlign:"left",border:"1px solid "+C.gold}}>
            <p style={{...s.label,color:C.gold,marginBottom:8}}>Committed</p>
            {result.dare}
          </div>
          <button style={{...s.btnO,marginTop:12}} onClick={()=>{setCommitted(false);setResult(null);setD1(null);setD2(null);}}>New Roll</button>
        </>
      )}
      {!result&&!rolling&&(
        <button style={{...s.btnG,maxWidth:240,margin:"0 auto"}} onClick={roll}>Roll the Dice</button>
      )}
      {rolling&&(
        <button style={{...s.btnG,maxWidth:240,margin:"0 auto",opacity:0.6}} disabled>Rolling...</button>
      )}
    </div>
  );
}


// STORY MODE
const COUPLES = [
  {id:"sam_jordan",names:["Sam","Jordan"],title:"Sam & Jordan",background:"Married 8 years, two kids, sex life has gotten routine. Sam is more reserved and needs structure to feel comfortable initiating. Jordan is the adventurous one who has been quietly hoping for more. They rarely talk explicitly about what they want.",dynamic:"vanilla-curious",tone_bias:"tender"},
  {id:"alex_riley",names:["Alex","Riley"],title:"Alex & Riley",background:"Together 2 years, no kids, already sexually adventurous and communicative. Alex is naturally dominant, Riley switches depending on mood. Both get bored easily and are always looking for the next level.",dynamic:"experienced",tone_bias:"intense"},
  {id:"marcus_priya",names:["Marcus","Priya"],title:"Marcus & Priya",background:"Married 3 years, conservative backgrounds but privately curious. Priya is anxious about explicit content but genuinely wants more novelty. Marcus wants to introduce new things without making Priya feel pressured.",dynamic:"cautious-curious",tone_bias:"sensual"},
  {id:"chris_taylor",names:["Chris","Taylor"],title:"Chris & Taylor",background:"Together 5 years, time-poor, good sex life but stuck in patterns. Chris occasionally has performance anxiety. Taylor is playful and creative. They communicate well but rarely explicitly about desire.",dynamic:"comfortable-rut",tone_bias:"playful"},
];



const STORY_TEMPLATES = {
  tender: [(n1,n2,act)=>n1+" had been nervous about opening the app. It felt too exposed, too deliberate. But "+n2+" had set the phone down between them like a peace offering, and somehow that made it easier. When the "+act+" came up, "+n1+" read it twice before looking up. "+n2+" was already watching, patient as always, the edge of a smile giving them away.||PARA||They started slowly, the way "+n1+" always needed -- a long pause before anything happened, the kind where the room got quieter and the space between them got smaller. "+n2+" did not rush it. That was the thing "+n1+" never quite knew how to ask for out loud.||PARA||By the time it was over, "+n1+" was laughing a little, breathless in the way that only happened when something unexpected worked exactly right. "+n2+" pressed their forehead against "+n1+" and said nothing. Some things do not need words. Tonight was one of them.",(n1,n2,act)=>"The "+act+" suggestion sat on the screen for almost a full minute before either of them moved. "+n1+" had been half-expecting "+n2+" to laugh it off. Instead, "+n2+" stood up and held out a hand.||PARA||What followed was careful at first -- hands finding familiar places, then unfamiliar ones. "+n1+" said something quiet that "+n2+" had not heard before, and it changed the whole temperature of the room.||PARA||Later, wrapped together in the dark, "+n2+" admitted they had been wanting to suggest something like that for months. They just had not known how to say it. The app stayed open on the bedside table. They were not done with it yet."],
  intense: [(n1,n2,act)=>n1+" did not bother reading the "+act+" card aloud. They just turned the screen so "+n2+" could see it and raised an eyebrow. "+n2+" locked the bedroom door.||PARA||There was no preamble. "+n1+" had learned early on that "+n2+" found slow build-up romantic in theory and maddening in practice. What "+n2+" actually wanted was to feel completely claimed, immediately, without apology. "+n1+" was very good at this.||PARA||An hour later, "+n2+" lay flat staring at the ceiling with the specific expression of someone whose brain had temporarily stopped working. Then: Roll again.",(n1,n2,act)=>"The "+act+" was not the hardest option in the deck. "+n1+" had seen harder. But the way "+n2+" reacted -- the particular stillness, the controlled breath -- told "+n1+" everything they needed to know.||PARA||You actually want to do this, "+n1+" said. Not a question.||PARA||"+n2+" said nothing, which was the loudest answer they had. What followed was one of those sessions that reset something. Afterward they argued companionably about whose idea it had really been. Both of them knew it had been "+n2+" all along."],
  sensual: [(n1,n2,act)=>n2+" had suggested the app mostly as a joke. "+n1+" had agreed mostly out of curiosity. Neither of them expected to make it past the first card.||PARA||The "+act+" suggestion landed somewhere between alarming and intriguing, which was new territory. "+n1+" read it out loud carefully, with respect for what it might require. "+n2+" listened. Then said: We can just try the first part.||PARA||The first part was enough. It opened something that had been waiting patiently for exactly this kind of accidental invitation. They did not finish the dare exactly as written. They found their own version, which was better. Most things are.",(n1,n2,act)=>"They almost put the phone away twice. The "+act+" was the card that stopped them. Simple enough to feel possible. Interesting enough to feel like something.||PARA||"+n2+" set the phone face-down on the nightstand, and "+n1+" took that as the answer.||PARA||It was slow, and a little tentative, and at one point they both started laughing at the same time for no particular reason, which somehow made everything easier. Afterward "+n2+" said it had been one of the nicest evenings in a long time. "+n1+" agreed, then started planning which module to open next."],
  playful: [(n1,n2,act)=>"The "+act+" dare was "+n2+" fault. "+n1+" would like that on record.||PARA||"+n2+" had drawn the card with the expression of someone who had won something, and "+n1+" had recognised that expression. That was the deal they had: when one of them got genuinely excited about something, the other showed up for it.||PARA||The execution was not flawless. There was a moment where "+n1+" completely lost the thread and had to restart, which "+n2+" found significantly funnier than the situation warranted. But by the end "+n1+" had to concede: "+n2+" had been right. The card had delivered.",(n1,n2,act)=>n1+" read the "+act+" card in a voice that suggested they were reading from a legal document. "+n2+" was already pulling "+n1+" off the couch.||PARA||"+n2+" made everything feel less serious than it actually was. "+n1+" stopped overthinking somewhere around the ten-minute mark, which was faster than usual, and everything after that happened without the internal commentary that normally accompanied it.||PARA||They ended up on the floor. Neither of them remembered quite how. "+n2+" said eventually: We should charge the phone. A pause. The app. I meant the app. "+n1+" was already laughing."],
  awkward: [(n1,n2,act)=>"The "+act+" looked straightforward on screen. In practice it required a level of spatial awareness that neither "+n1+" nor "+n2+" had accounted for.||PARA||There was a collision early on that produced a sound usually associated with contact sports. "+n2+" said I am fine in the tone of someone who was not entirely fine. "+n1+" suggested they recalibrate. The second attempt was considerably more successful, if less dignified than either of them had imagined.||PARA||Later, "+n1+" updated their mental model of what adventurous meant in practice. It meant committing to something even when the middle part was ridiculous. The end part, at least, was not ridiculous at all.",(n1,n2,act)=>"In theory, the "+act+" was an excellent idea. In practice it assumed a level of coordination that "+n1+" and "+n2+" discovered they did not possess.||PARA||The first attempt ended in a negotiation. The second ended in genuine laughter. The third ended correctly, which surprised both of them enough that they stopped and looked at each other with the mutual recognition of people who have successfully assembled furniture that defeated them twice.||PARA||It was not the evening either of them had planned. It was considerably better."],
};

const EXPLICIT_TEMPLATES = {
  tender:[(n1,n2,act)=>n1+" pulled "+n2+" close the moment the "+act+" card came up, fingers sliding into "+n2+" hair before either of them said a word. The slow start "+n1+" always needed happened anyway -- mouths finding each other, hands moving with the deliberate unhurried patience of two people who had learned exactly where the other came undone.||PARA||"+n2+" pressed "+n1+" back against the bed and stayed there, mouth tracing down the neck and chest in a way that made "+n1+" exhale sharply and stop pretending to be composed. "+n2+" took their time. That was the thing about "+n2+" -- they never rushed what "+n1+" needed, even when "+n1+" couldn't ask directly. By the time "+n2+" moved lower, "+n1+" was already half-incoherent.||PARA||"+n1+" came quietly, fingers gripping "+n2+" hair, back arching off the bed. "+n2+" stayed exactly where they were until "+n1+" stopped shaking. Then they moved up and pressed their forehead against "+n1+", both of them breathing hard. "+n1+" laughed a little -- that specific breathless laugh that only happened when something had worked better than expected. "+n2+" already knew what it meant."],
  intense:[(n1,n2,act)=>n1+" had "+n2+" against the wall within thirty seconds of the "+act+" card appearing on screen. "+n2+" didn't resist -- that specific kind of not-resisting that meant the opposite of reluctance.||PARA||"+n1+" moved with full intention: hands gripping hips hard enough to leave marks, mouth at "+n2+" throat, pace set from the start at exactly the intensity "+n2+" had been asking for all week without saying it out loud. "+n2+" made sounds that "+n1+" catalogued carefully for future use. When "+n1+" reached around and added a hand to what was already happening, "+n2+" stopped being able to stay quiet.||PARA||"+n2+" came with their face buried against "+n1+" neck, whole body shaking. "+n1+" followed immediately after, grip tightening. They stayed exactly like that for almost a minute. Then "+n2+" said: Roll again. "+n1+" was already reaching for the phone."],
  sensual:[(n1,n2,act)=>"The "+act+" started with "+n2+" hands on "+n1+" shoulders, working out the tension "+n1+" always carried there. It wasn't technically sexual yet. It didn't stay that way.||PARA||By the time "+n2+" mouth reached "+n1+" spine, "+n1+" had stopped pretending to be relaxed and was simply being exactly as responsive as the situation warranted. "+n2+" took it all the way down. Slowly. With the patience of someone who understood that the journey was the point. When "+n2+" finally turned "+n1+" over and moved between their legs, "+n1+" was already so far along it didn't take long at all.||PARA||"+n1+" came softly, with "+n2+" name barely audible, hands gripping the sheets. "+n2+" watched with the expression of someone who had exactly what they wanted. Then they moved up, and "+n1+" pulled them close, and they stayed like that for a long time without finding any reason to move."],
  playful:[(n1,n2,act)=>"The "+act+" dare did not survive first contact with "+n2+" interpretation of it. "+n1+" had barely finished reading when "+n2+" had them pinned to the couch with the focused energy of someone who had been waiting for an excuse.||PARA||It started as playful -- "+n2+" laughing while "+n1+" tried to object on procedural grounds -- and then stopped being playful about four minutes in when "+n2+" did something specific with their mouth that "+n1+" had not encountered before and could not immediately find words for. "+n1+" stopped objecting. "+n2+" stopped laughing. The room got significantly quieter.||PARA||"+n1+" came faster than intended and made a sound that "+n2+" stored away with obvious satisfaction. When "+n1+" had recovered, they said: That was not in the dare description. "+n2+": Consider it a bonus feature. "+n1+" reached for the phone to spin again."],
  awkward:[(n1,n2,act)=>"The "+act+" had been going well, technically speaking, until the moment it very much was not. "+n1+" had been positioned with some confidence. "+n2+" had been responding encouragingly. Then something shifted and there was a noise that neither of them could categorise and "+n2+" said I am fine in the specific tone that meant they were recalibrating.||PARA||They recalibrated. The second attempt was significantly better -- "+n1+" finding the angle that worked, "+n2+" making sounds that were no longer ambiguous. "+n2+" came first, unexpectedly, gripping "+n1+" arm. "+n1+" followed shortly after.||PARA||They lay together in successful completion of something that had started inauspiciously. "+n2+": That was good. "+n1+": The second half was good. "+n2+": Very good. A pause. "+n1+": We are never speaking of the first part. "+n2+": Agreed."],
};
const STORY_ACTIVITIES = ["Spin the Wheel dare -- Foreplay","Spin the Wheel dare -- Power Play","Spin the Wheel dare -- Sensory","Spin the Wheel dare -- Outdoor","Mood Matcher reveal","Wild Card draw","Hot or Not reveal","Body Map reveal","Pick Your Poison","Kink Quiz reveal","Dice Mode roll","Sensation Menu sequence","Date Night -- Romantic Warmup plan","Date Night -- All Night plan","Position Guide -- The Pretzel","Position Guide -- The Bridge","Position Guide -- Lotus","Position Guide -- The Chair"];


function StoryMode() {
  const [story, setStory] = useState(null);
  const [explicit, setExplicit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [couple, setCouple] = useState(null);
  const [activity, setActivity] = useState(null);
  const [tab, setTab] = useState("recount");

  const generate = () => {
    setLoading(true);
    setStory(null);
    setExplicit(null);
    setTab("recount");
    setTimeout(() => {
      const c = rnd(COUPLES);
      const a = rnd(STORY_ACTIVITIES);
      const tone = c.tone_bias;
      const useAwkward = Math.random() < 0.28;
      const pool = useAwkward ? STORY_TEMPLATES.awkward : (STORY_TEMPLATES[tone] || STORY_TEMPLATES.playful);
      const explicitPool = useAwkward ? EXPLICIT_TEMPLATES.awkward : (EXPLICIT_TEMPLATES[tone] || EXPLICIT_TEMPLATES.playful);
      const storyIdx = Math.floor(Math.random() * pool.length);
      const explicitIdx = Math.floor(Math.random() * explicitPool.length);
      setCouple(c);
      setActivity(a);
      setStory(pool[storyIdx](c.names[0], c.names[1], a));
      setExplicit(explicitPool[explicitIdx](c.names[0], c.names[1], a));
      setLoading(false);
    }, 900);
  };

  const activeStory = tab === "recount" ? story : explicit;

  return (
    <div>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:36,color:C.deep,margin:"12px 0"}}>&#128214;</div>
        <p style={{color:C.muted,fontSize:12,letterSpacing:2,textTransform:"uppercase",margin:0}}>A night in someone else's story</p>
      </div>
      <button style={s.btnG} onClick={generate} disabled={loading}>
        {loading ? "Writing..." : story ? "New Story" : "Generate a Story"}
      </button>
      {loading && (
        <div style={{textAlign:"center",padding:32,color:C.muted,fontSize:12,letterSpacing:2,textTransform:"uppercase"}}>
          Setting the scene...
        </div>
      )}
      {story && couple && !loading && (
        <div style={{marginTop:20}}>
          <div style={{background:C.card,border:"1px solid #3d1f2e",borderRadius:4,padding:16,marginBottom:16}}>
            <p style={{...s.label,marginBottom:6}}>{couple.title}</p>
            <p style={{color:C.muted,fontSize:12,lineHeight:1.6,margin:"0 0 12px"}}>{couple.background}</p>
            <span style={{fontSize:10,letterSpacing:1,padding:"3px 10px",borderRadius:2,border:"1px solid #3d1f2e",color:C.gold,textTransform:"uppercase"}}>{activity}</span>
          </div>
          <div style={{display:"flex",marginBottom:0,borderBottom:"1px solid #3d1f2e"}}>
            {[["recount","The Recount"],["explicit","The Explicit Cut"]].map(([id,label])=>(
              <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"10px 8px",background:"none",border:"none",borderBottom:"2px solid "+(tab===id?C.gold:"transparent"),color:tab===id?C.gold:C.muted,fontSize:11,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",fontFamily:"Georgia,serif",transition:"all 0.2s"}}>
                {label}
              </button>
            ))}
          </div>
          <div style={{...s.box,fontSize:14,lineHeight:1.9,borderTop:"none",borderRadius:"0 0 4px 4px",marginTop:0}}>
            <div style={s.orn}>✦ ✦ ✦</div>
            {activeStory && activeStory.split("||PARA||").map((para,i) => (
              <p key={i} style={{margin:"0 0 16px",color:C.text}}>{para}</p>
            ))}
            <div style={s.orn}>✦ ✦ ✦</div>
          </div>
          <button style={{...s.btnO,marginTop:12}} onClick={generate}>Another Story</button>
        </div>
      )}
    </div>
  );
}

const MODULES = [
  { id:"spin",      label:"Spin the Wheel",   icon:"&#9733;",  sub:"Random dare",           component:SpinWheel },
  { id:"mood",      label:"Mood Matcher",      icon:"&#10084;", sub:"Align desires",         component:MoodMatcher },
  { id:"date",      label:"Date Night",        icon:"&#127863;",sub:"Plan the evening",      component:DateNight },
  { id:"wild",      label:"Wild Card",         icon:"&#10024;", sub:"One tap, no thinking",  component:WildCard },
  { id:"kink",      label:"Kink Quiz",         icon:"&#128274;",sub:"Discover overlap",      component:KinkQuiz },
  { id:"positions", label:"Position Guide",    icon:"&#9836;",  sub:"20 positions",          component:PositionGuide },
  { id:"bodymap",   label:"Body Map",          icon:"&#128100;",sub:"Show where",            component:BodyMap },
  { id:"hotornot",  label:"Hot or Not",        icon:"&#128293;",sub:"Rate together",         component:HotOrNot },
  { id:"sensation", label:"Sensation Menu",    icon:"&#127774;",sub:"Write the mood",        component:SensationMenu },
  { id:"poison",    label:"Pick Your Poison",  icon:"&#9879;",  sub:"Two options, choose",   component:PickYourPoison },
  { id:"dice",      label:"Dice Mode",         icon:"&#9856;",  sub:"Roll for a dare",       component:DiceMode },
  { id:"story",     label:"Story Mode",        icon:"&#128214;",sub:"A night retold",        component:StoryMode },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const active = MODULES.find(m => m.id === screen);

  if (screen !== "home" && active) {
    const Component = active.component;
    return (
      <div style={s.app}>
        <header style={s.header}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <button onClick={() => setScreen("home")} style={{background:"none",border:"none",color:C.muted,fontSize:20,cursor:"pointer",padding:"0 4px",lineHeight:1}}>&#8592;</button>
            <div style={{flex:1,textAlign:"center"}}>
              <p style={{...s.title,fontSize:16}}>{active.label}</p>
            </div>
            <div style={{width:28}}/>
          </div>
        </header>
        <div style={s.content}>
          <Component />
        </div>
      </div>
    );
  }

  return (
    <div style={s.app}>
      <header style={s.header}>
        <p style={s.title}>Apres Minuit</p>
        <p style={s.sub}>For Two</p>
      </header>
      <div style={s.content}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginTop:4}}>
          {MODULES.map(m => (
            <div key={m.id} onClick={() => setScreen(m.id)} style={{background:C.card,border:"1px solid "+C.border,borderRadius:4,padding:"20px 14px",cursor:"pointer",textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:8,color:C.gold}} dangerouslySetInnerHTML={{__html:m.icon}}/>
              <p style={{fontSize:12,letterSpacing:1,color:C.text,margin:"0 0 4px",textTransform:"uppercase"}}>{m.label}</p>
              <p style={{fontSize:10,letterSpacing:1,color:C.muted,margin:0}}>{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
