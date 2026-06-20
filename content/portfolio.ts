import { writingNotes } from "./notes/writing";

export const identity = {
  name: "Bhakti Chokshi",
  title: "Data Engineer II",
  email: "chokshibhakti13@gmail.com",
  resume: "/Bhakti_Chokshi_Resume.pdf",
  tagline: "a diary-desk mosaic",
  centerNote: "A mosaic of things I have liked, practiced, studied, or cared about.",
  thesis: "A non-scrollable desk page: diary entries, artifacts, and a living graph of interests."
};

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bhakti-chokshi/" },
  { label: "GitHub", href: "https://github.com/bhaktichokshi" },
  { label: "Instagram", href: "https://www.instagram.com/bhaktichokshi/" },
  { label: "Duolingo", href: "https://www.duolingo.com/profile/bhakti.chokshi" },
  { label: "Resume", href: identity.resume }
];

export const centerEntry = {
  eyebrow: "diary note",
  title: "A mosaic",
  body:
    "I journal because thinking needs somewhere to land. This page is built like that: not a funnel, not a pitch, but a desk of notes, artifacts, and interests that have shaped me."
};

export const deskArtifacts = [
  {
    id: "terminal",
    title: "terminal",
    body: "data systems, pipelines, logs, late-night clarity",
    variant: "terminal"
  },
  {
    id: "journal",
    title: "journal",
    body: "where I think when thoughts are louder than code",
    variant: "journal"
  },
  {
    id: "palette",
    title: "palette",
    body: "proof that not everything needs a measurable output",
    variant: "palette"
  }
];

export const interestNodes = [
  {
    id: "engineering",
    label: "Engineering",
    color: "#b9d9ee",
    body:
      "The practical part of my brain: data pipelines, identity systems, observability, and making things reliable enough that other people can stop worrying about them."
  },
  {
    id: "writing",
    label: "Writing",
    color: "#ffd99b",
    body:
      "Thinking out loud, just slower. I write because sometimes I do not know what I believe until I see the sentence fail or survive on the page.",
    entries: writingNotes
  },
  {
    id: "art",
    label: "Art",
    color: "#ffc7d8",
    body:
      "The part that refuses to optimize. Diary sketches, color, texture, and making something because it felt like it needed to exist."
  },
  {
    id: "psychology",
    label: "Psychology",
    color: "#e3c8f1",
    body:
      "I keep returning to behavior: attention, friction, emotional loops, why people ignore dashboards, why systems change people, and why people resist systems."
  },
  {
    id: "karate",
    label: "Karate",
    color: "#ffb49c",
    body:
      "Practice outside language. Repetition, timing, posture, patience, and the kind of discipline that cannot be faked in a document."
  },
  {
    id: "math",
    label: "Math",
    color: "#c7e8b8",
    body:
      "The cleanest language I know for structure. Proofs and code both have that same feeling: line by line, the fog becomes less foggy."
  },
  {
    id: "reading",
    label: "Reading",
    color: "#d7d1ff",
    body:
      "The slow input layer. Books, essays, internet rabbit holes, notes abandoned halfway through, and the private vocabulary they leave behind."
  },
  {
    id: "finance",
    label: "Finance",
    color: "#fff0a8",
    body:
      "Money as behavior, incentives, risk, restraint, spreadsheets, and the surprisingly emotional work of making vague things legible."
  },
  {
    id: "cooking",
    label: "Cooking",
    color: "#ffc58f",
    body:
      "The domestic lab: heat, timing, memory, improvisation, and a recipe treated more like a hypothesis than a command."
  },
  {
    id: "management",
    label: "Management",
    color: "#bfe9dd",
    body:
      "People systems: clarity, handoffs, ownership, meeting culture, and the strange truth that empathy is often an architecture problem."
  }
] as const;
