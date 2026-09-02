export const site = {
  name: "ATS Resume Builder",
  url: "https://atsresumebuilder.co.in",
  description:
    "Create a clean, ATS-friendly A4 resume online with live preview, professional sections, certificates, projects, skills, education, experience, and PDF export.",
  email: "app.devansh@gmail.com",
  phone: "+91 9569351187"
};

export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
  image: string;
  advice: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ats-resume-guide",
    category: "Resume Tips",
    title: "How to Make an ATS-Friendly Resume",
    description:
      "Learn how to make an ATS-friendly resume with clear sections, keywords, formatting examples, common mistakes, and FAQs.",
    readTime: "7 min read",
    image: "ats-resume-guide-cover.png",
    advice: [
      "Use standard headings such as Summary, Experience, Education, Skills, and Projects. Keep important information in normal text instead of text boxes, tables, or graphics.",
      "Mirror the job description only where it is true. If a role requests stakeholder communication, explain the meeting, report, or decision you supported rather than adding the phrase without proof.",
      "Before exporting, test the document by reading it from top to bottom in under thirty seconds. A recruiter should immediately see your target role, strongest achievements, and relevant tools."
    ]
  },
  {
    slug: "resume-format-for-freshers",
    category: "Freshers Guide",
    title: "Best Resume Format for Freshers",
    description:
      "A practical guide to creating a fresher resume that is clear, ATS-friendly, and ready for campus or entry-level applications.",
    readTime: "6 min read",
    image: "resume-format-for-freshers.png",
    advice: [
      "A fresher resume should lead with education, a short objective, technical skills, projects, internships, and achievements. One page is usually enough.",
      "Projects are evidence when work experience is limited. Explain the problem, your contribution, the tools used, and the result or learning outcome.",
      "Do not fill the page with unrelated hobbies or generic soft skills. Choose coursework, certifications, hackathons, and responsibilities that connect to the role."
    ]
  },
  {
    slug: "resume-mistakes-to-avoid",
    category: "Resume Tips",
    title: "20 Resume Mistakes to Avoid",
    description:
      "Avoid the resume errors that make otherwise capable candidates harder to shortlist.",
    readTime: "8 min read",
    image: "resume-mistakes-to-avoid.png",
    advice: [
      "The most common mistake is writing responsibilities without outcomes. Replace generic wording with what you built, improved, measured, or delivered.",
      "Inconsistent dates, unexplained gaps, and contact details with typos reduce trust. Review these basics before every application.",
      "Avoid dense paragraphs, decorative icons, and generic objectives. A clear, skimmable document is easier for both people and software."
    ]
  },
  {
    slug: "resume-vs-cv",
    category: "Career Advice",
    title: "Resume vs CV: What's the Difference?",
    description:
      "Understand the real difference between a resume and CV, when to use each one, and how to prepare the right document.",
    readTime: "5 min read",
    image: "resume-vs-cv.png",
    advice: [
      "Use a resume for most private-sector job applications. It is concise, role-specific, and normally one or two pages long.",
      "A CV is more detailed and is common for academic, research, teaching, fellowship, and some international applications.",
      "Always read the employer's wording. If an application asks for a CV, provide the fuller document; if it asks for a resume, tailor a concise version."
    ]
  },
  {
    slug: "best-skills-for-a-resume-in-2026",
    category: "Resume Tips",
    title: "Best Skills for a Resume in 2026",
    description:
      "Choose skills that are relevant, verifiable, and easy for recruiters to understand.",
    readTime: "7 min read",
    image: "best-skills-for-a-resume-in-2026.png",
    advice: [
      "Select skills from the job description and your real experience. Group them into languages, tools, methods, and domain knowledge.",
      "Technical skills should be current and demonstrable. Include a project, certification, or work bullet that supports the most important ones.",
      "Soft skills work best when shown through outcomes: leading a review, explaining a decision, or coordinating a delivery."
    ]
  },
  {
    slug: "software-engineer-resume-guide",
    category: "Career Advice",
    title: "Software Engineer Resume Guide",
    description:
      "Create a software engineer resume that communicates technical depth, project impact, and practical skills.",
    readTime: "9 min read",
    image: "software-engineer-resume-guide.png",
    advice: [
      "Open with your engineering focus, core languages, and the kind of systems you have built. Then show impact through projects and employment.",
      "For each project, mention architecture, ownership, scale, testing, deployment, and measurable outcomes where available.",
      "List tools in context. Saying you reduced page load time using React code splitting is stronger than listing React separately."
    ]
  },
  {
    slug: "java-developer-resume-complete-guide",
    category: "Career Advice",
    title: "Java Developer Resume: Complete Guide",
    description:
      "Present Java projects, frameworks, and business impact with clarity.",
    readTime: "8 min read",
    image: "java-developer-resume-complete-guide.png",
    advice: [
      "Highlight Java versions, Spring or Spring Boot, APIs, databases, testing, build tools, and cloud services only when you have used them.",
      "Describe backend work in terms of endpoints, data flow, reliability, performance, and security instead of a long list of frameworks.",
      "Include testing practices such as JUnit, integration tests, or code review when they were part of your contribution."
    ]
  },
  {
    slug: "python-developer-resume-examples",
    category: "Career Advice",
    title: "Python Developer Resume Examples",
    description:
      "Turn Python projects and technical skills into a credible application story.",
    readTime: "8 min read",
    image: "python-developer-resume-examples.png",
    advice: [
      "Make the Python use case clear: automation, APIs, data analysis, machine learning, scripting, or backend development.",
      "Name relevant libraries next to the project where they were used, such as pandas for analysis or FastAPI for an API.",
      "Explain inputs, processing, output, and impact. This shows problem-solving ability beyond language familiarity."
    ]
  },
  {
    slug: "frontend-developer-resume-guide",
    category: "Career Advice",
    title: "Frontend Developer Resume Guide",
    description:
      "Showcase frontend skills, accessibility, performance, and product thinking.",
    readTime: "7 min read",
    image: "modern-resume-template.png",
    advice: [
      "Show how you build interfaces: component architecture, responsive design, accessibility, state management, testing, and performance.",
      "Use screenshots or portfolio links only as supporting material; the resume itself should explain your contribution and results.",
      "Mention measurable improvements such as faster loading, reduced support issues, better conversion, or improved accessibility."
    ]
  },
  {
    slug: "data-analyst-resume-guide",
    category: "Career Advice",
    title: "Data Analyst Resume Guide",
    description:
      "Explain your analytical process, tools, and measurable outcomes.",
    readTime: "9 min read",
    image: "best-skills-for-a-resume-in-2026.png",
    advice: [
      "State the business question before the tool. A data analyst resume is strongest when SQL, Excel, Python, Tableau, or Power BI support a decision.",
      "Explain data cleaning, analysis, dashboard design, and how stakeholders used the result.",
      "Use numbers carefully. Report the size of a dataset, time saved, accuracy improved, or outcome influenced when you can verify it."
    ]
  },
  {
    slug: "hr-interview-questions-and-answers",
    category: "Interview Tips",
    title: "HR Interview Questions and Answers",
    description:
      "Prepare authentic, structured answers for common HR interview questions.",
    readTime: "10 min read",
    image: "ats-resume-guide-cover.png",
    advice: [
      "Prepare short stories using Situation, Task, Action, and Result. The framework keeps answers focused without sounding memorized.",
      "For strengths and weaknesses, choose honest examples and explain how you use feedback or systems to improve.",
      "Research the company, role, and interviewer context so your questions and examples are relevant."
    ]
  },
  {
    slug: "top-resume-keywords-that-recruiters-notice",
    category: "ATS Tips",
    title: "Top Resume Keywords That Recruiters Notice",
    description:
      "Use job-relevant terms naturally instead of keyword stuffing.",
    readTime: "6 min read",
    image: "how-to-improve-ats-score.png",
    advice: [
      "Prioritize role title, tools, certifications, methods, and outcomes that appear repeatedly in the job description.",
      "Place important terms naturally in your summary, skills section, and relevant project or experience bullets.",
      "Do not add technology you cannot discuss. Recruiters often validate keywords during screening or interviews."
    ]
  },
  {
    slug: "linkedin-profile-tips-for-job-seekers",
    category: "LinkedIn Guide",
    title: "LinkedIn Profile Tips for Job Seekers",
    description:
      "Improve your LinkedIn presence so your resume and profile tell one story.",
    readTime: "7 min read",
    image: "resume-format-for-freshers.png",
    advice: [
      "Your headline should say more than your job title. Add a specialty, target role, or the value you create.",
      "Use the About section to connect your experience, strengths, and goals in a clear first-person voice.",
      "Keep dates, titles, and major projects consistent with your resume so a recruiter sees one coherent story."
    ]
  },
  {
    slug: "how-to-write-an-internship-resume",
    category: "Placement Tips",
    title: "How to Write an Internship Resume",
    description:
      "Build an internship resume around coursework, projects, and potential.",
    readTime: "6 min read",
    image: "resume-format-for-freshers.png",
    advice: [
      "Put education, coursework, projects, skills, and achievements ahead of work history when applying for your first internship.",
      "Use project bullets to show initiative: what you built, why it mattered, and what tools or methods you used.",
      "Tailor every application. A research internship and a software internship should not receive the same skills order."
    ]
  },
  {
    slug: "cover-letter-guide-with-examples",
    category: "Career Advice",
    title: "Cover Letter Guide with Examples",
    description:
      "Write focused cover letters that connect your experience to the role.",
    readTime: "8 min read",
    image: "resume-vs-cv.png",
    advice: [
      "Use the first paragraph to name the role and show why your background fits this employer specifically.",
      "Choose two or three relevant examples from your resume and connect them directly to the role's needs.",
      "End with a confident, polite next step. Do not repeat your entire resume or use a generic opening."
    ]
  },
  {
    slug: "resume-summary-examples-that-work",
    category: "Resume Tips",
    title: "Resume Summary Examples That Work",
    description:
      "Write a concise professional summary supported by evidence.",
    readTime: "7 min read",
    image: "ats-resume-guide-cover.png",
    advice: [
      "A summary is most useful when you have relevant experience or a clear technical direction. Keep it to two or three focused lines.",
      "Include your role, strongest relevant skills, and a result or area of expertise. Avoid adjectives such as hardworking without evidence.",
      "For freshers, a targeted objective and projects are often more useful than an exaggerated professional summary."
    ]
  },
  {
    slug: "best-resume-fonts-for-readability",
    category: "ATS Tips",
    title: "Best Resume Fonts for Readability",
    description:
      "Choose practical fonts and spacing for a more readable resume.",
    readTime: "5 min read",
    image: "software-engineer-resume-guide.png",
    advice: [
      "Choose a familiar font such as Arial, Calibri, Helvetica, or Georgia. Consistency and readable spacing matter more than personality.",
      "Use approximately 10-12pt body text and larger headings. Test the PDF at normal viewing size before submitting it.",
      "Avoid overly thin, condensed, decorative, or tiny fonts. They reduce readability and can create parsing problems."
    ]
  },
  {
    slug: "how-to-improve-ats-score",
    category: "ATS Tips",
    title: "How to Improve ATS Score",
    description:
      "Learn practical steps to improve your ATS score with relevant keywords, simple formatting, and stronger evidence.",
    readTime: "6 min read",
    image: "how-to-improve-ats-score.png",
    advice: [
      "An ATS score improves when the document clearly matches the role's essential skills, responsibilities, and experience level.",
      "Use a simple single-column layout, conventional headings, and a readable font. Parsing errors can hide otherwise strong experience.",
      "Never chase a score by repeating keywords. Relevant achievements and accurate terminology are more valuable than keyword density."
    ]
  },
  {
    slug: "resume-guide-for-mca-students",
    category: "Freshers Guide",
    title: "Resume Guide for MCA Students",
    description:
      "Present MCA coursework, projects, and technical strengths effectively.",
    readTime: "7 min read",
    image: "resume-format-for-freshers.png",
    advice: [
      "Lead with your MCA specialization, relevant coursework, technical skills, and practical projects.",
      "For each project, make your individual contribution clear, particularly when it was completed with a team.",
      "Add internships, coding profiles, open-source contributions, and certifications only when they strengthen your target role."
    ]
  },
  {
    slug: "resume-tips-for-campus-placements",
    category: "Placement Tips",
    title: "Resume Tips for Campus Placements",
    description:
      "Prepare a placement resume that is concise, credible, and recruiter-friendly.",
    readTime: "8 min read",
    image: "best-skills-for-a-resume-in-2026.png",
    advice: [
      "Keep a placement resume focused on academics, projects, internships, technical skills, and leadership or achievements.",
      "Prepare different versions for software, analytics, consulting, and core roles. The order of content should match the opportunity.",
      "Practice explaining every bullet. Placement interviews often begin with a project or achievement listed on the resume."
    ]
  }
];

export const featuredPosts = blogPosts.slice(0, 6);

export const templateNames = [
  "Professional",
  "Executive",
  "Corporate",
  "Creative",
  "Student",
  "Fresher",
  "Developer",
  "Designer",
  "Manager",
  "Minimal"
];

export type LegalPageKey = "privacy" | "terms" | "cookies" | "disclaimer";

export const legalPages: Record<
  LegalPageKey,
  {
    title: string;
    description: string;
    lead: string;
    sections: { title: string; body: string }[];
  }
> = {
  privacy: {
    title: "Privacy Policy",
    description:
      "Read the ATS Resume Builder privacy policy covering data usage, cookies, and user controls.",
    lead: "Last updated: July 11, 2026",
    sections: [
      {
        title: "Information we collect",
        body: "Information entered into the resume builder, such as contact details, education, experience, and skills, is used to generate the resume preview in your browser. If you contact us, we may receive the name, email address, and message you provide."
      },
      {
        title: "Cookies and analytics",
        body: "We use a small local preference to remember cookie choices. Analytics services, when enabled, may collect aggregated usage data to help us understand site performance and improve the experience."
      },
      {
        title: "Advertising and third parties",
        body: "We may use Google AdSense or other advertising partners. Those partners may use cookies or similar technologies in accordance with their own policies. Third-party services used for hosting, analytics, or advertising process information only as needed to provide their services."
      },
      {
        title: "Data storage and security",
        body: "We use reasonable technical and organizational measures to protect information. No online service can guarantee absolute security; please avoid entering sensitive information that is not necessary for your resume."
      },
      {
        title: "Your rights",
        body: "You may ask about, correct, or request deletion of personal information you sent to us, subject to applicable law. To make a privacy request, contact us using the address below."
      },
      {
        title: "Contact",
        body: `For privacy questions, email ${site.email}. We may update this policy when our practices or legal obligations change.`
      }
    ]
  },
  terms: {
    title: "Terms & Conditions",
    description:
      "Terms and conditions for ATS Resume Builder, including service use, intellectual property, and user responsibilities.",
    lead: "Last updated: July 11, 2026",
    sections: [
      {
        title: "Website usage",
        body: "You may use ATS Resume Builder for lawful personal and professional purposes. You agree not to interfere with the service, attempt unauthorized access, or use the site in a way that harms others."
      },
      {
        title: "User responsibilities",
        body: "You are responsible for the accuracy, completeness, and legality of information included in your resume. Review all generated content before sharing it with an employer or third party."
      },
      {
        title: "Intellectual property",
        body: "The website, branding, design, and original content are owned by ATS Resume Builder or its licensors. You may use resumes you create for your own purposes; you may not copy or redistribute our site materials without permission."
      },
      {
        title: "Disclaimer and limitation of liability",
        body: "The service is provided as available. We do not guarantee interviews, employment outcomes, uninterrupted access, or error-free operation. To the extent allowed by law, ATS Resume Builder is not liable for indirect or consequential loss arising from use of the site."
      },
      {
        title: "Termination",
        body: "We may suspend or restrict access where we reasonably believe these terms have been breached or the service is at risk."
      },
      {
        title: "Contact",
        body: `Questions about these terms can be sent to ${site.email}.`
      }
    ]
  },
  cookies: {
    title: "Cookie Policy",
    description:
      "Read how ATS Resume Builder uses browser storage for cookie preferences and privacy-friendly functionality.",
    lead: "How and why we use cookies and similar technologies.",
    sections: [
      {
        title: "What cookies are",
        body: "Cookies are small text files stored by a browser. They can support basic website preferences, measure aggregate usage, and help advertising services deliver relevant advertising."
      },
      {
        title: "Cookie types",
        body: "Essential preference cookies remember choices such as the site cookie notice. Analytics cookies help us understand how visitors use pages. Advertising cookies may be set by advertising partners such as Google AdSense where enabled."
      },
      {
        title: "Managing cookies",
        body: "You can manage or delete cookies using your browser settings. Most browsers allow you to block cookies or receive a notice before a cookie is stored. Blocking certain cookies may affect some site features."
      },
      {
        title: "Browser settings",
        body: "Consult your browser help pages for instructions on managing cookies in Chrome, Firefox, Edge, Safari, or your chosen browser. You can also revisit your site preference by clearing local browser data."
      }
    ]
  },
  disclaimer: {
    title: "Disclaimer",
    description:
      "Important disclaimers for ATS Resume Builder, including content accuracy, usage guidance, and third-party links.",
    lead: "General information for users of ATS Resume Builder.",
    sections: [
      {
        title: "General information",
        body: "ATS Resume Builder provides general resume-building tools and career information for educational purposes. It is not professional legal, financial, employment, or recruitment advice."
      },
      {
        title: "Accuracy",
        body: "We aim to keep information useful and current, but do not guarantee that every page is complete, accurate, or suitable for every situation. Hiring practices and applicant tracking systems vary by employer."
      },
      {
        title: "External links",
        body: "Links to third-party websites are provided for convenience. We do not control or endorse their content, availability, or privacy practices."
      },
      {
        title: "No guarantees or legal responsibility",
        body: "Using this service does not guarantee a particular ATS score, interview, job offer, or career result. You use the website and its content at your own discretion. To the extent permitted by law, ATS Resume Builder is not responsible for losses connected with that use."
      }
    ]
  }
};
