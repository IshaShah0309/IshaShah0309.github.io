/**
 * The Work volume.
 *
 * Each chapter holds a run of projects, and each project is set out the same
 * way, the need behind it, the role in making it, the outcome, the tools, and
 * the samples. Every part is optional: a project can lead with a video, with a
 * pair of sheets side by side, or with a portrait sheet; it can open with an
 * overview instead of a stated need; and it can drop the samples section when
 * the headline piece is the whole of the work.
 *
 * All copy here is Isha's own.
 */

export type Sample = {
  src: string;
  caption: string;
};

export type Project = {
  id: string;
  title: string;
  /** Where it was made. */
  org: string;

  /** The headline piece. `covers` shows two sheets side by side. */
  cover?: string;
  covers?: string[];
  coverCaptions?: string[];
  coverVideo?: string;
  /** Portrait sheets get a 3:4 mount rather than 16:9. */
  coverPortrait?: boolean;

  /** Use `overview` where the work is a collection rather than one brief. */
  need?: string;
  overview?: string;
  role: string[];
  outcome?: string;
  tools: string[];

  samples: Sample[];
  /** Drop the samples section entirely, the cover is the whole of it. */
  hideSamples?: boolean;
  samplesLabel?: string;
  samplePortrait?: boolean;
  sampleColumns?: 2 | 3;
  /** What the empty mounts should say while the artwork is outstanding. */
  placeholderCaptions?: string[];
};

export type Chapter = {
  id: string;
  roman: string;
  title: string;
  audience: string;
  role: string;
  summary: string;
  /** The plate shown on the book page. */
  cover?: string;
  projects: Project[];
};

const GROW = "Grow Financial";
const UCF = "University of Central Florida";

export const CHAPTERS: Chapter[] = [
  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "elearning",
    roman: "Chapter I",
    title: "E-Learning & Course Design",
    audience: "Employees, students, faculty",
    role: "Instructional Designer (T&D intern)",
    summary:
      "Self-paced courses and structured learning built around objectives, designed for clarity first, then styled so the structure is visible.",
    cover: "/assets/work/covers/course-design.webp",
    projects: [
      {
        id: "intern-orientation",
        title: "New Intern Orientation + BINGO",
        org: GROW,
        need: "The existing virtual intern orientation required interns to spend most of their first day listening to presentations, with limited opportunities to interact with the content. A more engaging format was needed to help interns stay involved and remember key information throughout the day.",
        role: [
          "Redesigned the orientation experience",
          "Developed the case-file storyline and clues",
          "Created an interactive BINGO activity",
          "Added activities such as Two Truths and a Lie",
          "Supported delivery and collected participant feedback",
        ],
        outcome:
          "The redesigned orientation was delivered across three intern cycles to approximately 25 interns. Survey feedback showed high satisfaction, and the interactive activities helped interns better recall information presented throughout the day.",
        tools: ["Canva", "PowerPoint", "Microsoft 365"],
        cover: "/assets/work/new-intern-orientation/01.webp",
        samples: [
          { src: "/assets/work/new-intern-orientation/02.webp", caption: "The case brief the interns open on" },
          { src: "/assets/work/new-intern-orientation/03.webp", caption: "Two Truths and a Lie, set as lie-detection practice" },
          { src: "/assets/work/new-intern-orientation/04.webp", caption: "Great Place to Work" },
          { src: "/assets/work/new-intern-orientation/05.webp", caption: "A speaker file from the case" },
          { src: "/assets/work/new-intern-orientation/06.webp", caption: "Case wrap-up" },
          { src: "/assets/work/new-intern-orientation/07.webp", caption: "The orientation BINGO card" },
        ],
      },
      {
        id: "cats",
        title: "CATS Course",
        org: GROW,
        need: "New call center employees use Client Admin Tools and Services (CATS) and Visa Online to assist members with card-related needs, but there was no introductory course explaining what the systems were, how they were accessed, or how employees should use the supporting manuals.",
        role: [
          "Organized and simplified system information",
          "Designed the course structure and visuals",
          "Created interactive learning activities",
          "Added drag-and-drop exercises and attention checks",
          "Connected learners to supporting manuals and resources",
        ],
        outcome:
          "Created a foundational course that gives new employees an introduction to CATS and Visa Online before they begin using the systems in their day-to-day work. The course also directs learners to the manuals they will continue using after training.",
        tools: ["Canva", "iSpring", "PowerPoint", "Microsoft 365"],
        cover: "/assets/work/cats/01.webp",
        coverCaptions: ["Course opening: CATS and Visa Online for MCC team members"],
        samples: [
          { src: "/assets/work/cats/02.webp", caption: "Framing the course around a real member scenario" },
          { src: "/assets/work/cats/03.webp", caption: "Where to locate CATS, in the intranet the team uses" },
          { src: "/assets/work/cats/04.webp", caption: "What Visa Online is, split by the two needs it serves" },
        ],
      },
      {
        id: "train-the-trainer",
        title: "Train the Trainer",
        org: GROW,
        need: "New supervisors, managers, and trainers were expected to support employee learning but did not have a dedicated resource covering basic training and facilitation practices. I identified an opportunity to create something they could use when preparing to train others.",
        role: [
          "Proposed the course concept",
          "Researched training and facilitation practices",
          "Designed and developed the course",
          "Created practical examples and guidance",
          "Developed a customizable planning worksheet",
        ],
        outcome:
          "Created a new training resource that gives first-time trainers and supervisors practical guidance for preparing, delivering, and improving their own training sessions. The accompanying worksheet allows them to apply the material directly to their specific training needs.",
        tools: ["Canva", "iSpring", "PowerPoint"],
        cover: "/assets/work/train-the-trainer/01.webp",
        coverCaptions: ["Course opening: personalised and remote onboarding"],
        samples: [
          { src: "/assets/work/train-the-trainer/02.webp", caption: "The Situation-Behavior-Impact model, with example language" },
          { src: "/assets/work/train-the-trainer/03.webp", caption: "Customizable try-out worksheet" },
        ],
      },
      {
        id: "grow-history",
        title: "Grow History & Culture",
        org: GROW,
        need: "Company history and culture were covered during a two-day new-hire orientation, but the amount of information could be difficult for employees to remember when delivered primarily through presentation.",
        role: [
          "Reimagined the content as a story-based learning experience",
          "Developed the grandfather-and-grandson storyline",
          "Organized historical information into a clear sequence",
          "Created attention checks throughout the course",
          "Designed the visual learning experience",
        ],
        outcome:
          "Transformed traditional orientation content into a more memorable, story-driven learning experience that allows new employees to explore the organization's history and culture in a more engaging format.",
        tools: ["Canva", "iSpring", "PowerPoint"],
        cover: "/assets/work/grow-history/01.webp",
        coverCaptions: ["The grandfather-and-grandson storyline"],
        samples: [],
        hideSamples: true,
      },
      {
        id: "money-management",
        title: "Money Management Basics",
        org: GROW,
        need: "College students and recent graduates often encounter financial decisions for the first time without having received practical guidance on budgeting, saving, credit, and managing their money.",
        role: [
          "Researched financial topics relevant to young adults",
          "Organized the information into a short introductory course",
          "Simplified financial concepts for a student audience",
          "Connected content to practical credit union resources and benefits",
          "Designed the learning experience",
        ],
        outcome:
          "Developed a short financial-literacy resource for outreach programming that gives college students practical starting points for managing money and understanding resources available to support their financial goals.",
        tools: ["Canva", "PowerPoint"],
        cover: "/assets/work/money-management/01.webp",
        coverCaptions: ["Title: a guide for college students"],
        samples: [
          { src: "/assets/work/money-management/04.webp", caption: "Learning objectives, set before the content" },
          { src: "/assets/work/money-management/02.webp", caption: "Drag-and-drop: sorting spending into wants and needs" },
          { src: "/assets/work/money-management/03.webp", caption: "How credit scores work, broken down by weighting" },
        ],
      },
      {
        id: "assignment-hub",
        title: "Ready-to-Use Assignment Hub",
        org: UCF,
        need: "Faculty wanted to incorporate career readiness into their courses but did not always have the time or resources to develop career-focused assignments themselves.",
        role: [
          "Helped develop ready-to-use career assignments",
          "Organized materials for easy faculty access",
          "Created supporting rubrics and resources",
          "Designed materials for direct classroom use",
          "Supported the faculty-facing resource experience",
        ],
        outcome:
          "Created a plug-and-play assignment resource that allows faculty to access career-readiness assignments, grading rubrics, and supporting materials that can be incorporated into their existing courses with minimal preparation.",
        tools: ["Canva", "Microsoft 365"],
        cover: "/assets/work/assignment-hub/00-cover.webp",
        coverCaptions: ["The Assignment Hub in Canvas"],
        samples: [
          { src: "/assets/work/assignment-hub/02.webp", caption: "Professional Development Activity: overview, objectives and alignment" },
          { src: "/assets/work/assignment-hub/03.webp", caption: "Final Portfolio assignment" },
          { src: "/assets/work/assignment-hub/01.webp", caption: "Résumé feedback assignment built on VMock" },
        ],
      },
      {
        id: "cs-toolkit",
        title: "Career Services Toolkit",
        org: UCF,
        need: "Faculty members needed a simple way to understand the career services available to students and how those resources could be incorporated into courses and student development.",
        role: [
          "Organized Career Services information",
          "Created faculty-facing explanations and resources",
          "Connected services with classroom applications",
          "Designed an easy-to-navigate toolkit",
        ],
        outcome:
          "Developed a centralized faculty resource that makes Career Services programs and classroom integration opportunities easier to understand and access.",
        tools: ["Canva", "Microsoft 365"],
        cover: "/assets/work/cs-toolkit/01.webp",
        coverCaptions: ["The toolkit in Canvas"],
        samples: [],
        hideSamples: true,
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "facilitation",
    roman: "Chapter II",
    title: "Training Facilitation",
    audience: "Students, employees, faculty, leaders",
    role: "Facilitator & Designer",
    summary:
      "Sessions designed and delivered in the room, from the run of show to the last slide, and the follow-up that makes it stick.",
    cover: "/assets/work/covers/facilitation.webp",
    projects: [
      {
        id: "pd-workshop",
        title: "Professional Development Workshop",
        org: GROW,
        need: "Interns approaching the end of their internship wanted more guidance on how to transition from the internship experience into future professional opportunities, including building visibility, strengthening their résumé, and preparing for interviews.",
        role: [
          "Proposed the workshop concept",
          "Planned the two-day learning experience",
          "Developed the presentation and activities",
          "Facilitated the sessions",
          "Created supporting career-development resources",
        ],
        outcome:
          "Created and delivered a new two-day professional development workshop that helped interns reflect on their experience, strengthen their professional presence, and prepare for future job and internship opportunities.",
        tools: ["Canva", "PowerPoint", "Microsoft 365"],
        cover: "/assets/work/career-library/01.webp",
        coverCaptions: ["Workshop opening: the career library"],
        samples: [
          { src: "/assets/work/career-library/02.webp", caption: "What employers look for, split three ways" },
          { src: "/assets/work/career-library/03.webp", caption: "Reframing career advancement as visible work" },
          { src: "/assets/work/career-library/04.webp", caption: "Building visibility, with example phrasing" },
          { src: "/assets/work/career-library/05.webp", caption: "Stakeholder-mapping worksheet" },
        ],
      },
      {
        id: "working-learner",
        title: "Working Learner Presentations",
        org: UCF,
        need: "Student employees gain valuable experience through on-campus jobs, but many do not automatically recognize how those experiences connect to career readiness or the competencies employers look for after graduation.",
        role: [
          "Developed professional development training for student employees",
          "Designed presentation materials and activities",
          "Facilitated sessions requested by campus departments",
          "Created supporting professional development kits",
          "Tracked participation and program metrics",
        ],
        outcome:
          "Training reached 130+ student employees, and approximately 500 professional development kits were created to support continued learning beyond the sessions. The program helped students connect their campus employment with NACE competencies and future career preparation.",
        tools: ["Canva", "PowerPoint", "Microsoft 365"],
        cover: "/assets/work/covers/facilitation.webp",
        coverCaptions: ["Delivering a session to student employees"],
        samples: [
          { src: "/assets/work/working-learner/02.webp", caption: "Introducing the eight NACE career competencies" },
          { src: "/assets/work/working-learner/01.webp", caption: "A competency unpacked with examples from on-campus work" },
          { src: "/assets/work/working-learner/04.webp", caption: "Writing activity: Action Verb + Task + Result" },
          { src: "/assets/work/working-learner/03.webp", caption: "Live Kahoot knowledge check" },
          { src: "/assets/work/work-plus-community/01.webp", caption: "Professional development kits" },
        ],
      },
      {
        id: "work-plus-community",
        title: "Work+ Engagement Community",
        org: UCF,
        need: "Supervisors participating in Work+ needed opportunities to learn from one another and share practices they were using to strengthen career readiness for their student employees.",
        role: [
          "Supported event planning and coordination",
          "Assisted with participant communication and logistics",
          "Helped organize activities and discussion opportunities",
          "Supported the guest speaker component",
          "Assisted during event delivery",
        ],
        outcome:
          "Created a collaborative space where supervisors could exchange ideas, discuss successful practices, and learn additional ways to support student employee development across campus.",
        tools: ["Canva", "Microsoft 365"],
        coverVideo: "/assets/work/work-plus-community/community.mp4",
        samples: [],
        hideSamples: true,
      },
      {
        id: "applied-io",
        title: "Other Projects",
        org: UCF,
        overview:
          "A collection of graduate-level projects completed for hypothetical and real-world clients using Industrial-Organizational Psychology principles. Projects addressed workplace challenges involving training design, job analysis, performance appraisal, psychological testing and item development, survey design, and organizational research.",
        role: [
          "Analyzed organizational and employee needs",
          "Applied I/O psychology research and methods",
          "Developed evidence-based recommendations",
          "Designed assessments, surveys, and training solutions",
          "Prepared professional reports and client presentations",
        ],
        outcome:
          "These projects strengthened my ability to move from an organizational problem to a research-supported solution while balancing data, employee needs, practical implementation, and client communication.",
        tools: ["Microsoft 365", "Qualitative & Quantitative Research Methods"],
        samples: [],
        samplesLabel: "Samples from this collection",
        placeholderCaptions: [
          "Project sample",
          "Project sample",
          "Project sample",
        ],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "resources",
    roman: "Chapter III",
    title: "The Resource Collection",
    audience: "Students, faculty, staff, colleagues",
    role: "Facilitator & Creator",
    summary:
      "The reference shelf: guides, sites, manuals and one-pagers people keep after the session is over.",
    cover: "/assets/work/covers/resources.webp",
    projects: [
      {
        id: "faculty-guide",
        title: "Faculty Resource Guide",
        org: UCF,
        need: "Faculty members needed a concise resource explaining the programs, tools, and career-development support available through the Dixon Career Development Center.",
        role: [
          "Gathered and organized resource information",
          "Simplified content for a faculty audience",
          "Designed the guide and information structure",
          "Connected resources with practical student needs",
        ],
        outcome:
          "Created an easy-to-reference faculty guide that provides one place to understand Career Services resources and identify opportunities to connect students with additional career support.",
        tools: ["Canva", "Microsoft 365"],
        cover: "/assets/work/faculty-guide/01.webp",
        coverCaptions: ["Guide cover"],
        coverPortrait: true,
        samples: [
          { src: "/assets/work/faculty-guide/02.webp", caption: "Introduction: framing the guide as a partnership" },
        ],
      },
      {
        id: "focus-groups",
        title: "Training Focus Groups",
        org: GROW,
        need: "To improve existing training, manuals, and employee resources, the team needed a clearer understanding of what employees were actually using, what was not working, and where departments were experiencing gaps.",
        role: [
          "Supported focus-group planning",
          "Developed questions around training and resource needs",
          "Gathered employee feedback",
          "Organized and analyzed recurring themes",
          "Identified opportunities for training improvements",
        ],
        outcome:
          "Focus-group feedback provided direct employee input into training and resource decisions, helping identify gaps, recurring concerns, and opportunities to improve future materials.",
        tools: ["Microsoft 365", "Excel"],
        cover: "/assets/work/focus-groups/01.webp",
        coverCaptions: ["Training manuals focus group: opening"],
        samples: [
          { src: "/assets/work/focus-groups/02.webp", caption: "Product Knowledge focus group in session" },
        ],
      },
      {
        id: "pd-website",
        title: "Professional Development Website",
        org: UCF,
        need: "After Working Learner presentations, student employees needed one place where they could continue exploring career resources instead of relying only on information presented during the session.",
        role: [
          "Organized resources into a central landing page",
          "Selected content relevant to working learners",
          "Designed the user experience and visual layout",
          "Connected students with Career Services resources",
          "Created content specifically for student employees",
        ],
        outcome:
          "Created a centralized post-training resource that extends learning beyond the presentation and gives student employees continued access to career-development tools and personalized support.",
        tools: ["Canva", "Microsoft 365"],
        cover: "/assets/work/pd-website/01.webp",
        coverCaptions: ["Tools to thrive: the Work+ home page"],
        samples: [
          { src: "/assets/work/pd-website/02.webp", caption: "Career competencies, each linked to a LinkedIn Learning course" },
        ],
      },
      {
        id: "oncampus-flyer",
        title: "On-Campus Jobs & Internships Flyer",
        org: UCF,
        need: "Programs already existed that allowed students to connect on-campus employment and internships with academic or career-development opportunities, but there was no simple promotional resource explaining those options to students.",
        role: [
          "Gathered and simplified program information",
          "Developed student-facing messaging",
          "Designed the flyer",
          "Organized information for quick scanning",
          "Supported awareness of available opportunities",
        ],
        outcome:
          "Created a new student-facing resource that made existing programs easier to understand and gave staff a reusable tool for promoting on-campus employment and internship opportunities.",
        tools: ["Canva"],
        cover: "/assets/work/oncampus-flyer/01.webp",
        coverCaptions: ["Does my on-campus job qualify for an internship?"],
        coverPortrait: true,
        samples: [],
        hideSamples: true,
      },
      {
        id: "manuals",
        title: "Training Manuals",
        org: UCF,
        need: "Graduate course projects required technical and organizational information to be translated into professional resources that a client or stakeholder could realistically use.",
        role: [
          "Conducted research and analysis",
          "Organized technical information",
          "Developed reports, guides, and manuals",
          "Applied course concepts to workplace problems",
          "Presented findings and recommendations",
        ],
        outcome:
          "Produced a collection of client-style reports and manuals across projects involving training, assessment, job analysis, survey development, and other I/O psychology applications.",
        tools: ["Microsoft Word", "PowerPoint", "Excel"],
        samples: [],
        samplesLabel: "Samples from this collection",
        samplePortrait: true,
        placeholderCaptions: ["Pace", "Chetta", "LeNoble"],
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════════════════ */
  {
    id: "programs",
    roman: "Chapter IV",
    title: "Program & Event Support",
    audience: "Employees, students, staff, leaders",
    role: "Manager & Support",
    summary:
      "Programmes and events run end to end: the logistics, the communications, and the parts nobody sees when it goes well.",
    cover: "/assets/work/covers/events.webp",
    projects: [
      {
        id: "nsew",
        title: "National Student Employment Week",
        org: UCF,
        need: "Student employees contribute significantly to departments across campus, but there was an opportunity to create more intentional programming focused on recognizing their contributions and building a greater sense of community.",
        role: [
          "Led event planning and coordination",
          "Developed the event proposal and budget",
          "Coordinated materials and logistics",
          "Supported communications and social media promotion",
          "Managed programming from planning through implementation",
        ],
        outcome:
          "Led programming that recognized and engaged 50+ student employees while establishing a foundation for future student employee recognition efforts. The project combined event planning, budgeting, communications, and community-building into one coordinated initiative.",
        tools: ["Canva", "Microsoft 365", "Excel"],
        cover: "/assets/work/nsew/01.webp",
        coverCaptions: ["Carousel of Fun: campaign flyer"],
        coverPortrait: true,
        samples: [],
        hideSamples: true,
      },
      {
        id: "wwyl-fair",
        title: "Work Where You Learn Fair",
        org: UCF,
        need: "Students needed a more direct way to discover on-campus employment opportunities and connect with UCF departments hiring student employees.",
        role: [
          "Supported large-scale event coordination",
          "Developed participant communications and resources",
          "Assisted with employer and student logistics",
          "Created promotional and presentation materials",
          "Supported the event from preparation through day-of execution",
        ],
        outcome:
          "Helped coordinate a large campus hiring event connecting students with on-campus employment opportunities. My event work across the Work Where You Learn Fair and EXPO supported programming reaching more than 1,100 attendees, while strengthening the student-to-employment pipeline.",
        tools: ["Canva", "Microsoft 365", "Excel"],
        covers: [
          "/assets/work/wwyl-fair/01.webp",
          "/assets/work/wwyl-fair/02.webp",
        ],
        coverCaptions: [
          "Spring 2026 campaign: Navigate Your Career Journey",
          "Event recap",
        ],
        coverPortrait: true,
        samples: [],
        hideSamples: true,
      },
      {
        id: "expo",
        title: "Career EXPO",
        org: UCF,
        need: "A large-scale career fair serving thousands of students requires significant coordination to keep employer and student experiences organized throughout the event.",
        role: [
          "Supported employer registration",
          "Assisted with student registration",
          "Managed attendee lines and event flow",
          "Provided event support and troubleshooting",
          "Led tours for Faculty Fellows",
        ],
        outcome:
          "Supported the delivery of a major UCF career event serving 3,000+ students, helping maintain an organized experience for students, employers, and university partners throughout the event.",
        tools: ["Microsoft 365", "Event Registration Systems"],
        samples: [],
        placeholderCaptions: ["Coming soon", "Coming soon", "Coming soon"],
      },
      {
        id: "supervisor-foundations",
        title: "Work+ Supervisor Foundations",
        org: UCF,
        need: "Supervisors participating in Work+ needed a shared foundation for understanding the program and their role in helping student employees connect work experiences with career development.",
        role: [
          "Supported supervisor learning resources",
          "Helped organize program information",
          "Developed reference materials and supporting content",
          "Supported participation and feedback tracking",
          "Helped maintain consistent communication around Work+",
        ],
        outcome:
          "Supported a more consistent supervisor experience by providing resources and training support that helped supervisors understand Work+ and apply career-development practices with their student employees.",
        tools: ["Canva", "PowerPoint", "Microsoft 365"],
        samples: [],
        placeholderCaptions: ["Coming soon", "Coming soon", "Coming soon"],
      },
    ],
  },
];
