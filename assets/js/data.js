var TYPES = {
  R: {
    name: "Realistic",
    color: "#C0392B",
    definition: "practical, hands-on work with tools, machines, real materials, and physical problem-solving",
    sub: ["Hands-On Execution", "Mechanical Aptitude", "Outdoor Orientation", "Technical Problem-Solving"]
  },
  I: {
    name: "Investigative",
    color: "#1A5276",
    definition: "research, analysis, ideas, evidence, and mentally challenging problem-solving",
    sub: ["Analytical Thinking", "Research Drive", "Systematic Inquiry", "Intellectual Curiosity"]
  },
  A: {
    name: "Artistic",
    color: "#7D3C98",
    definition: "creativity, self-expression, design, originality, and flexible work without rigid rules",
    sub: ["Creative Expression", "Aesthetic Sensitivity", "Originality", "Unstructured Thinking"]
  },
  S: {
    name: "Social",
    color: "#1E8449",
    definition: "helping, teaching, coaching, supporting, and developing other people",
    sub: ["Helping Orientation", "Empathic Engagement", "Teaching Drive", "Collaborative Spirit"]
  },
  E: {
    name: "Enterprising",
    color: "#D35400",
    definition: "leading, influencing, persuading, selling, managing, and making business decisions",
    sub: ["Leadership Drive", "Persuasive Communication", "Risk Tolerance", "Strategic Vision"]
  },
  C: {
    name: "Conventional",
    color: "#2471A3",
    definition: "organized, accurate, structured work with data, standards, rules, and clear procedures",
    sub: ["Detail Orientation", "Process Adherence", "Data Management", "Organizational Structure"]
  }
};

var SUB_DESC = {
  "Hands-On Execution": "Preference for tangible tasks, physical output, and work that produces a visible result.",
  "Mechanical Aptitude": "Interest in tools, equipment, machines, technical systems, and how things physically work.",
  "Outdoor Orientation": "Energy from field work, site-based work, movement, and less desk-bound environments.",
  "Technical Problem-Solving": "Comfort diagnosing, fixing, and improving practical systems or equipment.",

  "Analytical Thinking": "Preference for breaking problems down, evaluating evidence, and finding logical patterns.",
  "Research Drive": "Interest in gathering information deeply before making conclusions or recommendations.",
  "Systematic Inquiry": "Comfort using structured methods, hypotheses, tests, and careful investigation.",
  "Intellectual Curiosity": "Natural pull toward ideas, learning, complexity, and deeper understanding.",

  "Creative Expression": "Motivation to create original work through writing, design, media, art, or concepts.",
  "Aesthetic Sensitivity": "Attention to form, design, beauty, tone, and the emotional quality of presentation.",
  "Originality": "Drive to challenge ordinary solutions and produce ideas that feel fresh or different.",
  "Unstructured Thinking": "Comfort working through ambiguity, open-ended problems, and flexible methods.",

  "Helping Orientation": "Satisfaction from improving someone else's situation, experience, or capability.",
  "Empathic Engagement": "Ability and desire to notice people's emotions, needs, and interpersonal signals.",
  "Teaching Drive": "Interest in explaining, training, mentoring, and helping others build competence.",
  "Collaborative Spirit": "Preference for shared goals, team dialogue, and working through people.",

  "Leadership Drive": "Interest in directing effort, organizing people, and taking responsibility for outcomes.",
  "Persuasive Communication": "Energy from influencing, presenting, advocating, selling, or gaining buy-in.",
  "Risk Tolerance": "Comfort with uncertainty, competition, visibility, and bold decisions.",
  "Strategic Vision": "Interest in big-picture direction, growth opportunities, and future positioning.",

  "Detail Orientation": "Satisfaction from precision, accuracy, checking, and getting the small things right.",
  "Process Adherence": "Preference for documented steps, rules, quality controls, and reliable routines.",
  "Data Management": "Interest in organizing, maintaining, and improving structured information systems.",
  "Organizational Structure": "Preference for clear roles, timelines, expectations, accountability, and order."
};

var SCALE_OPTIONS = [
  { label: "Strongly Like", value: 5 },
  { label: "Like", value: 4 },
  { label: "Neutral", value: 3 },
  { label: "Dislike", value: 2 },
  { label: "Strongly Dislike", value: 1 }
];

var TYPE_SUGGESTIONS = {
  R: {
    training: "Technical labs, equipment training, field safety, troubleshooting methods.",
    projects: "Prototype fixes, field inspections, process improvement, tool or system optimization.",
    coaching: "Work with a technical mentor who can sharpen diagnosis and execution.",
    career: "Operations, engineering support, technical service, skilled trades, facilities, field-based roles."
  },
  I: {
    training: "Research methods, data analysis, critical thinking, experimentation, technical writing.",
    projects: "Root-cause analysis, vendor comparison, process research, metrics investigation.",
    coaching: "Partner with an analytical mentor who challenges assumptions and evidence quality.",
    career: "Analytics, research, engineering, strategy, science, technical consulting, investigation-heavy roles."
  },
  A: {
    training: "Design thinking, communication design, storytelling, creative tools, UX basics.",
    projects: "Campaign concepts, content design, experience redesign, visual or written communication.",
    coaching: "Work with a creative reviewer who gives feedback without over-structuring the work.",
    career: "Marketing, design, content, communications, media, product experience, creative strategy."
  },
  S: {
    training: "Coaching skills, facilitation, conflict resolution, instructional design, emotional intelligence.",
    projects: "Mentoring programs, onboarding support, training delivery, employee experience improvements.",
    coaching: "Partner with a people leader who helps balance support with boundaries.",
    career: "HR, learning and development, education, counseling, customer success, community roles."
  },
  E: {
    training: "Leadership, negotiation, sales, executive communication, business strategy.",
    projects: "Lead initiatives, pitch improvements, manage stakeholders, own growth or change efforts.",
    coaching: "Work with a leader who can sharpen influence, prioritization, and decision discipline.",
    career: "Management, sales, entrepreneurship, business development, politics, executive-track roles."
  },
  C: {
    training: "Project management, compliance, data governance, Excel/reporting, audit methods.",
    projects: "Build dashboards, standard operating procedures, tracking systems, quality-control processes.",
    coaching: "Partner with an operations or compliance mentor who values precision and scalability.",
    career: "Finance, accounting, operations, compliance, HR operations, IT administration, office management."
  }
};

var QUESTION_BANK = [];

function addLikert(type, sd, style, q) {
  QUESTION_BANK.push({
    mode: "likert",
    type: type,
    sd: sd,
    style: style,
    q: q
  });
}

function addForced(q, opts) {
  QUESTION_BANK.push({
    mode: "forced",
    style: "Forced Choice",
    q: q,
    opts: opts
  });
}

/* Realistic */
addLikert("R", "Hands-On Execution", "Activity Preference", "Rate how appealing this activity is: assembling, repairing, or calibrating physical equipment until it works correctly.");
addLikert("R", "Mechanical Aptitude", "Activity Preference", "Rate how appealing this activity is: taking apart a malfunctioning tool or device to understand what went wrong.");
addLikert("R", "Outdoor Orientation", "Activity Preference", "Rate how appealing this work setting is: spending much of the day at field sites, job sites, or physical work areas instead of at a desk.");
addLikert("R", "Technical Problem-Solving", "Situational Judgment", "A piece of equipment stops working during a critical task. Rate how natural it would feel to inspect it directly and test practical fixes.");
addLikert("R", "Hands-On Execution", "Situational Judgment", "A process feels physically inefficient. Rate how likely you are to build or prototype a tangible improvement before writing a formal proposal.");
addLikert("R", "Mechanical Aptitude", "Situational Judgment", "A colleague says a machine sounds different than usual. Rate how likely you are to investigate the mechanical cause yourself.");
addLikert("R", "Outdoor Orientation", "Activity Preference", "Rate how appealing this role is: moving between work sites, inspecting conditions, and solving practical problems in changing environments.");
addLikert("R", "Technical Problem-Solving", "Activity Preference", "Rate how appealing this task is: diagnosing a practical failure, testing possible causes, and fixing the issue with your hands.");

/* Investigative */
addLikert("I", "Analytical Thinking", "Activity Preference", "Rate how appealing this activity is: breaking a complex problem into parts and analyzing each piece before recommending a solution.");
addLikert("I", "Research Drive", "Activity Preference", "Rate how appealing this task is: spending several hours researching a topic deeply before forming an opinion.");
addLikert("I", "Systematic Inquiry", "Situational Judgment", "Customer retention drops unexpectedly. Rate how likely you are to build hypotheses, gather data, and test possible explanations.");
addLikert("I", "Intellectual Curiosity", "Activity Preference", "Rate how appealing this activity is: learning about complex ideas beyond your immediate job requirements simply because they interest you.");
addLikert("I", "Analytical Thinking", "Situational Judgment", "A recommendation sounds convincing but has a logical gap. Rate how likely you are to question the assumption and look for evidence.");
addLikert("I", "Research Drive", "Situational Judgment", "Before choosing between two vendors, rate how natural it would feel to compare evidence, reviews, risks, and measurable criteria.");
addLikert("I", "Systematic Inquiry", "Activity Preference", "Rate how appealing this learning style is: building a foundation first, then moving step-by-step into more complex material.");
addLikert("I", "Intellectual Curiosity", "Activity Preference", "Rate how appealing this project is: exploring an emerging topic with no immediate payoff, just to understand it better.");

/* Artistic */
addLikert("A", "Creative Expression", "Activity Preference", "Rate how appealing this activity is: writing, designing, illustrating, composing, or producing something original.");
addLikert("A", "Aesthetic Sensitivity", "Activity Preference", "Rate how much you enjoy improving the look, tone, layout, or emotional feel of a document, space, product, or message.");
addLikert("A", "Originality", "Situational Judgment", "A team asks for a campaign idea. Rate how likely you are to push for a fresh concept instead of repeating what competitors already do.");
addLikert("A", "Unstructured Thinking", "Activity Preference", "Rate how appealing this work style is: open-ended projects where you can define the approach as you go.");
addLikert("A", "Creative Expression", "Activity Preference", "Rate how appealing this task is: turning a basic idea into a story, visual, design, script, or creative concept.");
addLikert("A", "Aesthetic Sensitivity", "Situational Judgment", "A report is accurate but visually chaotic. Rate how likely you are to improve the formatting because presentation affects meaning.");
addLikert("A", "Originality", "Activity Preference", "Rate how appealing this problem-solving approach is: generating unconventional ideas before narrowing down to practical options.");
addLikert("A", "Unstructured Thinking", "Situational Judgment", "A project has no clear process yet. Rate how comfortable you are starting anyway and shaping the work as it develops.");

/* Social */
addLikert("S", "Helping Orientation", "Activity Preference", "Rate how appealing this work is: directly helping someone improve their situation, confidence, or capability.");
addLikert("S", "Empathic Engagement", "Situational Judgment", "A team member becomes withdrawn during a stressful week. Rate how likely you are to check in privately and understand what is happening.");
addLikert("S", "Teaching Drive", "Activity Preference", "Rate how appealing this activity is: explaining a difficult concept until another person finally understands it.");
addLikert("S", "Collaborative Spirit", "Activity Preference", "Rate how appealing this work style is: solving complex challenges by pooling strengths with a close team.");
addLikert("S", "Helping Orientation", "Situational Judgment", "A colleague is struggling with a task you know well. Rate how natural it would feel to offer practical help without being asked.");
addLikert("S", "Empathic Engagement", "Activity Preference", "Rate how often you enjoy noticing group mood, interpersonal tension, or unspoken needs and responding thoughtfully.");
addLikert("S", "Teaching Drive", "Situational Judgment", "A junior employee keeps making the same mistake. Rate how likely you are to coach them step-by-step instead of simply correcting the work.");
addLikert("S", "Collaborative Spirit", "Activity Preference", "Rate how appealing this environment is: regular discussion, shared decisions, and group accountability for outcomes.");

/* Enterprising */
addLikert("E", "Leadership Drive", "Activity Preference", "Rate how appealing this responsibility is: coordinating people, setting direction, and being accountable for results.");
addLikert("E", "Persuasive Communication", "Situational Judgment", "You believe the current strategy is wrong. Rate how likely you are to build a strong case and actively advocate for a different direction.");
addLikert("E", "Risk Tolerance", "Activity Preference", "Rate how appealing this environment is: high visibility, competitive pressure, and decisions with uncertain outcomes.");
addLikert("E", "Strategic Vision", "Activity Preference", "Rate how appealing this task is: identifying future opportunities and deciding where a team or business should go next.");
addLikert("E", "Leadership Drive", "Situational Judgment", "A project lacks direction. Rate how likely you are to step forward, organize the group, and clarify the next move.");
addLikert("E", "Persuasive Communication", "Activity Preference", "Rate how appealing this activity is: presenting a product, idea, or vision to a skeptical audience and winning support.");
addLikert("E", "Risk Tolerance", "Situational Judgment", "A high-reward project needs a champion, but success is uncertain. Rate how willing you are to take the lead.");
addLikert("E", "Strategic Vision", "Situational Judgment", "Your team is focused on daily tasks. Rate how likely you are to redirect attention to long-term opportunities, growth, and positioning.");

/* Conventional */
addLikert("C", "Detail Orientation", "Activity Preference", "Rate how appealing this task is: auditing a complex report until every error, mismatch, or missing detail is corrected.");
addLikert("C", "Process Adherence", "Situational Judgment", "A team wants to skip a quality-control step to save time. Rate how likely you are to defend the process and prevent unnecessary risk.");
addLikert("C", "Data Management", "Activity Preference", "Rate how appealing this activity is: organizing, categorizing, cleaning, and maintaining structured information.");
addLikert("C", "Organizational Structure", "Activity Preference", "Rate how appealing this work environment is: clear tasks, timelines, roles, expectations, and decision rules.");
addLikert("C", "Detail Orientation", "Situational Judgment", "You notice small inaccuracies in an important file. Rate how likely you are to fix them before moving on.");
addLikert("C", "Process Adherence", "Activity Preference", "Rate how appealing this work style is: following documented steps that make quality, fairness, and repeatability easier.");
addLikert("C", "Data Management", "Situational Judgment", "A team's tracking system is inconsistent. Rate how likely you are to build a cleaner system with standard fields and rules.");
addLikert("C", "Organizational Structure", "Situational Judgment", "A new project begins with unclear ownership. Rate how likely you are to create a plan, timeline, and responsibility map.");

/* Forced Choice */
addForced("A new cross-functional project opens. Which role would you naturally choose first?", [
  { type: "R", sd: "Hands-On Execution", text: "Build or test the practical solution." },
  { type: "I", sd: "Analytical Thinking", text: "Investigate the problem and compare evidence." },
  { type: "A", sd: "Creative Expression", text: "Shape the concept, story, or visual direction." },
  { type: "S", sd: "Collaborative Spirit", text: "Coordinate people and keep collaboration healthy." },
  { type: "E", sd: "Leadership Drive", text: "Lead the project and drive decisions." },
  { type: "C", sd: "Organizational Structure", text: "Create the plan, tracker, and process structure." }
]);

addForced("Which task would you pick if all had the same pay and recognition?", [
  { type: "R", sd: "Mechanical Aptitude", text: "Repairing or optimizing equipment." },
  { type: "I", sd: "Research Drive", text: "Researching a complex issue." },
  { type: "A", sd: "Originality", text: "Creating a new design or concept." },
  { type: "S", sd: "Helping Orientation", text: "Helping someone solve a personal or work challenge." },
  { type: "E", sd: "Persuasive Communication", text: "Pitching a proposal to win support." },
  { type: "C", sd: "Data Management", text: "Cleaning and organizing a large data set." }
]);

addForced("A team is stuck. What contribution feels most useful from you?", [
  { type: "R", sd: "Technical Problem-Solving", text: "Test what physically works and remove the practical blocker." },
  { type: "I", sd: "Systematic Inquiry", text: "Find the root cause through structured analysis." },
  { type: "A", sd: "Unstructured Thinking", text: "Reframe the problem in a completely different way." },
  { type: "S", sd: "Empathic Engagement", text: "Surface the people issues slowing the team down." },
  { type: "E", sd: "Strategic Vision", text: "Reset the direction and focus on the highest-value outcome." },
  { type: "C", sd: "Process Adherence", text: "Clarify the steps, rules, and decision path." }
]);

addForced("Which learning experience would you choose for a full-day workshop?", [
  { type: "R", sd: "Hands-On Execution", text: "Hands-on technical lab or field simulation." },
  { type: "I", sd: "Intellectual Curiosity", text: "Deep-dive research and problem analysis." },
  { type: "A", sd: "Aesthetic Sensitivity", text: "Design, storytelling, or creative production." },
  { type: "S", sd: "Teaching Drive", text: "Coaching, facilitation, or mentoring practice." },
  { type: "E", sd: "Leadership Drive", text: "Leadership, negotiation, or business strategy." },
  { type: "C", sd: "Detail Orientation", text: "Compliance, reporting accuracy, or process improvement." }
]);

addForced("Which workplace problem would you most want to solve?", [
  { type: "R", sd: "Technical Problem-Solving", text: "Equipment, tools, or physical workflow issues." },
  { type: "I", sd: "Analytical Thinking", text: "A confusing pattern that needs evidence and logic." },
  { type: "A", sd: "Creative Expression", text: "A dull message, design, or experience that needs life." },
  { type: "S", sd: "Helping Orientation", text: "A person or team that needs support and development." },
  { type: "E", sd: "Strategic Vision", text: "A missed business opportunity or weak market position." },
  { type: "C", sd: "Organizational Structure", text: "A messy process with unclear ownership and standards." }
]);

addForced("Which compliment would feel most meaningful to receive?", [
  { type: "R", sd: "Mechanical Aptitude", text: "You can fix or build almost anything." },
  { type: "I", sd: "Research Drive", text: "You always find the facts others miss." },
  { type: "A", sd: "Originality", text: "Your ideas feel fresh and different." },
  { type: "S", sd: "Empathic Engagement", text: "You make people feel understood and supported." },
  { type: "E", sd: "Persuasive Communication", text: "You know how to influence people and move things forward." },
  { type: "C", sd: "Detail Orientation", text: "You make work accurate, clean, and reliable." }
]);

addForced("If given one month for a self-directed project, what would you build or complete?", [
  { type: "R", sd: "Hands-On Execution", text: "A physical prototype, repair, or working model." },
  { type: "I", sd: "Systematic Inquiry", text: "A research report with tested conclusions." },
  { type: "A", sd: "Creative Expression", text: "A creative portfolio piece, video, story, or design." },
  { type: "S", sd: "Teaching Drive", text: "A training session or mentoring program." },
  { type: "E", sd: "Strategic Vision", text: "A business plan, pitch, or growth proposal." },
  { type: "C", sd: "Data Management", text: "A dashboard, tracker, database, or organized system." }
]);

addForced("In a crisis, what is your most natural first focus?", [
  { type: "R", sd: "Technical Problem-Solving", text: "Fix the immediate practical issue." },
  { type: "I", sd: "Analytical Thinking", text: "Understand what is really causing it." },
  { type: "A", sd: "Unstructured Thinking", text: "Find an unconventional workaround." },
  { type: "S", sd: "Collaborative Spirit", text: "Support the people affected and coordinate help." },
  { type: "E", sd: "Leadership Drive", text: "Take charge and make fast decisions." },
  { type: "C", sd: "Process Adherence", text: "Stabilize the situation with clear steps and controls." }
]);

addForced("Which type of project result would make you proudest?", [
  { type: "R", sd: "Hands-On Execution", text: "A working product or physical solution." },
  { type: "I", sd: "Intellectual Curiosity", text: "A clear answer to a difficult question." },
  { type: "A", sd: "Aesthetic Sensitivity", text: "A memorable experience, design, or creative output." },
  { type: "S", sd: "Helping Orientation", text: "Visible growth in another person or group." },
  { type: "E", sd: "Risk Tolerance", text: "A bold win that required courage and influence." },
  { type: "C", sd: "Organizational Structure", text: "A reliable system that prevents future mistakes." }
]);

addForced("Which environment sounds most energizing?", [
  { type: "R", sd: "Outdoor Orientation", text: "Field, shop, site, or lab environment." },
  { type: "I", sd: "Research Drive", text: "Research center, analytics team, or strategy lab." },
  { type: "A", sd: "Creative Expression", text: "Studio, media room, design team, or writing space." },
  { type: "S", sd: "Collaborative Spirit", text: "Learning, coaching, care, or community environment." },
  { type: "E", sd: "Leadership Drive", text: "Sales, startup, management, or executive environment." },
  { type: "C", sd: "Process Adherence", text: "Operations, finance, compliance, or records environment." }
]);

addForced("What kind of responsibility would you take on first?", [
  { type: "R", sd: "Technical Problem-Solving", text: "Maintain practical systems and solve technical failures." },
  { type: "I", sd: "Systematic Inquiry", text: "Study the issue and produce evidence-based recommendations." },
  { type: "A", sd: "Originality", text: "Generate new concepts and make the work distinctive." },
  { type: "S", sd: "Teaching Drive", text: "Train others and improve team capability." },
  { type: "E", sd: "Persuasive Communication", text: "Represent the idea and persuade stakeholders." },
  { type: "C", sd: "Data Management", text: "Control documents, data, timelines, and reporting." }
]);

addForced("When choosing a future role, which feature matters most?", [
  { type: "R", sd: "Hands-On Execution", text: "Practical, active work with tangible results." },
  { type: "I", sd: "Intellectual Curiosity", text: "Complex problems that require thinking and learning." },
  { type: "A", sd: "Unstructured Thinking", text: "Freedom to create and avoid rigid rules." },
  { type: "S", sd: "Helping Orientation", text: "A clear human impact through service or development." },
  { type: "E", sd: "Strategic Vision", text: "Influence, leadership, growth, and decision-making." },
  { type: "C", sd: "Organizational Structure", text: "Stability, order, accuracy, and defined expectations." }
]);

if (QUESTION_BANK.length !== 60) {
  console.error("QUESTION_BANK should be 60. Current count:", QUESTION_BANK.length);
}
