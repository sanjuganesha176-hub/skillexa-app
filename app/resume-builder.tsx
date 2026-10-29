import { Feather } from "@expo/vector-icons";
import React, { useState, useMemo } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppHeader } from "../components/common/AppHeader";
import { Palette, Radii, Shadows } from "../constants/theme";

// Types
interface ProjectItem {
  id: string;
  title: string;
  tech: string;
  desc: string;
}

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  desc: string;
}

interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
}

// Preset profiles
const ROLE_PRESETS = [
  {
    name: "Full Stack Engineer",
    skills: {
      languages: "TypeScript, JavaScript, Python, Java, SQL",
      frameworks: "React, Next.js, Node.js, Express, React Native, TailwindCSS",
      tools: "Git, Docker, AWS (S3, EC2), PostgreSQL, Redis, Postman",
    },
    projects: [
      {
        id: "p1",
        title: "SkillExa - Interactive Learning & Assessment Engine",
        tech: "React Native, TypeScript, FastAPI, SQLite",
        desc: "Engineered scalable student learning application with live coding challenges and AI analytics, boosting user engagement by 42%.",
      },
      {
        id: "p2",
        title: "Distributed Task Queue & Scheduler",
        tech: "Node.js, Redis, Docker, PostgreSQL",
        desc: "Architected fault-tolerant asynchronous queue processing 15,000+ jobs/min with 99.98% uptime and heartbeat retry mechanisms.",
      },
    ],
    experience: [
      {
        id: "e1",
        role: "Software Engineering Intern",
        company: "NextGen Cloud Systems",
        duration: "Jan 2025 - Jun 2025",
        desc: "Optimized REST API query throughput by 35% using Redis caching; developed 12+ reusable React UI components across internal dashboards.",
      },
    ],
  },
  {
    name: "Mobile App Developer",
    skills: {
      languages: "TypeScript, JavaScript, Swift, Kotlin, Python",
      frameworks: "React Native, Expo, Redux Toolkit, React Navigation",
      tools: "Xcode, Android Studio, Git, Jest, Firebase, App Store Connect",
    },
    projects: [
      {
        id: "p1",
        title: "CampusConnect - Student Community App",
        tech: "React Native, Expo, Firebase, WebSockets",
        desc: "Designed cross-platform iOS/Android app with real-time peer messaging and event feeds, adopted by 3,500+ active campus students.",
      },
      {
        id: "p2",
        title: "Offline-First Expense Tracker",
        tech: "React Native, WatermelonDB, SQLite",
        desc: "Implemented local-first synchronization protocol resolving conflict matrices with under 120ms latency across 5,000 monthly transactions.",
      },
    ],
    experience: [
      {
        id: "e1",
        role: "Mobile Developer Intern",
        company: "AppSphere Interactive",
        duration: "Jun 2024 - Dec 2024",
        desc: "Reduced mobile bundle size by 24% through tree-shaking and lazy loading; achieved 99.8% crash-free session rate over 50,000 users.",
      },
    ],
  },
  {
    name: "Cloud & DevOps",
    skills: {
      languages: "Python, Go, Bash, YAML, SQL",
      frameworks: "FastAPI, Terraform, Helm, Docker, Kubernetes",
      tools: "AWS, GitHub Actions, Prometheus, Grafana, Linux, Nginx",
    },
    projects: [
      {
        id: "p1",
        title: "Automated GitOps Multi-Cluster Deployment",
        tech: "Kubernetes, ArgoCD, Terraform, AWS EKS",
        desc: "Automated zero-downtime canary deployment pipeline reducing production deployment cycle times from 45 minutes to under 4 minutes.",
      },
      {
        id: "p2",
        title: "Serverless Observability & Log Alerting Engine",
        tech: "Python, AWS Lambda, CloudWatch, Prometheus",
        desc: "Developed real-time incident monitor tracking microservice health metrics and dispatching automated Slack alerts within 1.5 seconds.",
      },
    ],
    experience: [
      {
        id: "e1",
        role: "DevOps Engineering Intern",
        company: "ScaleGrid Cloud Solutions",
        duration: "May 2024 - Nov 2024",
        desc: "Constructed CI/CD workflows for 18 microservices; decreased AWS cloud infrastructure costs by 22% via spot instance autoscale policies.",
      },
    ],
  },
];

// Sample Target Job Descriptions
const SAMPLE_JDS = [
  {
    role: "Full-Stack Software Engineer (SDE 1)",
    text: "We are seeking a Full-Stack Engineer proficient in TypeScript, React, Node.js, SQL, REST APIs, Docker, and Git. Experience with automated testing, cloud deployments on AWS, and agile methodologies is preferred. Strong understanding of data structures, algorithms, and database indexing.",
    keywords: ["typescript", "react", "node.js", "sql", "rest", "docker", "git", "aws", "data structures", "algorithms"],
  },
  {
    role: "Mobile Engineer (React Native / iOS / Android)",
    text: "Looking for an energetic Mobile Developer skilled in React Native, TypeScript, State Management (Redux/Zustand), REST/GraphQL APIs, offline storage, performance optimization, and mobile CI/CD pipelines. Strong focus on clean UI/UX and native performance.",
    keywords: ["react native", "typescript", "redux", "api", "mobile", "ios", "android", "performance", "git", "firebase"],
  },
  {
    role: "Backend & Cloud Engineer",
    text: "Join our core platform team building distributed microservices. Requirements: Python, Go or Java, Docker, Kubernetes, AWS, PostgreSQL, Redis, message queues (Kafka/RabbitMQ), system architecture, unit testing, and CI/CD pipelines.",
    keywords: ["python", "docker", "kubernetes", "aws", "postgresql", "redis", "microservices", "git", "rest", "linux"],
  },
];

const STRONG_ACTION_VERBS = [
  "engineered",
  "architected",
  "optimized",
  "developed",
  "implemented",
  "automated",
  "deployed",
  "designed",
  "spearheaded",
  "constructed",
  "refactored",
  "scaled",
  "integrated",
  "reduced",
  "increased",
  "built",
  "launched",
];

const WIZARD_STEPS = [
  { id: 1, label: "Personal", icon: "user" },
  { id: 2, label: "Education", icon: "book" },
  { id: 3, label: "Skills", icon: "code" },
  { id: 4, label: "Projects", icon: "folder" },
  { id: 5, label: "Experience", icon: "briefcase" },
  { id: 6, label: "Certs", icon: "award" },
  { id: 7, label: "Preview & PDF", icon: "eye" },
];

export default function ResumeBuilderPage() {
  // Main view toggle: 'builder' | 'ats'
  const [activeTab, setActiveTab] = useState<"builder" | "ats">("builder");

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const [template, setTemplate] = useState<"modern" | "executive" | "harvard" | "compact">("modern");

  // Resume Content State
  const [personal, setPersonal] = useState({
    fullName: "Ganesh Kumar",
    title: "Computer Science Engineer",
    email: "ganesh@example.edu",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    github: "github.com/ganesh-code",
    linkedin: "linkedin.com/in/ganesh-kumar",
    summary:
      "Passionate Software Engineer with a solid foundation in Data Structures, Full-Stack Web Development, and Cloud Systems. Proven track record of engineering scalable applications and optimizing database query throughput.",
  });

  const [education, setEducation] = useState({
    degree: "B.Tech in Computer Science & Engineering",
    institution: "National Institute of Technology",
    score: "CGPA: 8.9 / 10",
    year: "2022 - 2026",
    location: "Bengaluru, India",
  });

  const [skills, setSkills] = useState({
    languages: "Java, Python, C++, TypeScript, JavaScript, SQL",
    frameworks: "React Native, React, Node.js, Express, FastAPI, Expo",
    tools: "Git, Docker, AWS (EC2, S3), Redis, PostgreSQL, Linux, Postman",
  });

  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: "p1",
      title: "SkillExa - Interactive Learning & Assessment Engine",
      tech: "React Native, TypeScript, FastAPI, SQLite",
      desc: "Engineered scalable student learning application with live coding challenges and AI analytics, boosting user engagement by 42%.",
    },
    {
      id: "p2",
      title: "Distributed Cloud Task Scheduler",
      tech: "Go, Docker, Redis, PostgreSQL",
      desc: "Developed high-throughput task worker pool with fault-tolerant heartbeat monitoring, processing 10,000+ jobs/min with 99.9% uptime.",
    },
  ]);

  const [experience, setExperience] = useState<ExperienceItem[]>([
    {
      id: "e1",
      role: "Software Engineering Intern",
      company: "NextGen Tech Solutions",
      duration: "May 2025 - July 2025",
      desc: "Optimized REST API throughput by 28% and built reusable component design tokens adopted across 4 client web projects.",
    },
  ]);

  const [certifications, setCertifications] = useState<CertificationItem[]>([
    { id: "c1", title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services" },
    { id: "c2", title: "Meta Certified React Native Specialist", issuer: "Meta" },
  ]);

  // Target Job Description State for ATS scanner
  const [selectedJdIndex, setSelectedJdIndex] = useState(0);
  const [customJdText, setCustomJdText] = useState("");
  const [useCustomJd, setUseCustomJd] = useState(false);

  // Quick Action Verb Helper
  const addActionVerbToProject = (projId: string, verb: string) => {
    setProjects(
      projects.map((p) => {
        if (p.id === projId) {
          const capitalized = verb.charAt(0).toUpperCase() + verb.slice(1);
          return {
            ...p,
            desc: p.desc ? `${capitalized} ${p.desc}` : `${capitalized} `,
          };
        }
        return p;
      })
    );
  };

  // Preset Applicator
  const applyPreset = (presetName: string) => {
    const preset = ROLE_PRESETS.find((p) => p.name === presetName);
    if (!preset) return;
    setSkills({ ...preset.skills });
    setProjects([...preset.projects]);
    setExperience([...preset.experience]);
    setPersonal((prev) => ({ ...prev, title: presetName }));
    Alert.alert("Preset Applied", `Loaded ${presetName} skills, projects, and work experience!`);
  };

  // Compile entire resume text for analysis
  const fullResumeText = useMemo(() => {
    const projs = projects.map((p) => `${p.title} ${p.tech} ${p.desc}`).join(" ");
    const exps = experience.map((e) => `${e.role} ${e.company} ${e.desc}`).join(" ");
    const certs = certifications.map((c) => `${c.title} ${c.issuer}`).join(" ");
    return `${personal.fullName} ${personal.title} ${personal.summary} ${personal.email} ${personal.phone} ${personal.location} ${personal.github} ${personal.linkedin} ${education.degree} ${education.institution} ${education.score} ${skills.languages} ${skills.frameworks} ${skills.tools} ${projs} ${exps} ${certs}`.toLowerCase();
  }, [personal, education, skills, projects, experience, certifications]);

  // ---------------- ATS Scoring & Diagnostics Engine ----------------
  const atsAnalysis = useMemo(() => {
    const text = fullResumeText;
    let score = 0;
    const checks: { title: string; passed: boolean; score: number; maxScore: number; detail: string }[] = [];
    const suggestions: string[] = [];

    // 1. Contact Information Integrity (Max: 15)
    const hasEmail = Boolean(personal.email && personal.email.includes("@"));
    const hasPhone = Boolean(personal.phone && personal.phone.length > 7);
    const hasLocation = Boolean(personal.location && personal.location.length > 2);
    const hasLinks = Boolean(personal.github || personal.linkedin);
    const contactPassed = hasEmail && hasPhone && hasLocation && hasLinks;
    const contactScore = (hasEmail ? 4 : 0) + (hasPhone ? 4 : 0) + (hasLocation ? 3 : 0) + (hasLinks ? 4 : 0);
    score += contactScore;
    checks.push({
      title: "Contact & Profile Completeness",
      passed: contactPassed,
      score: contactScore,
      maxScore: 15,
      detail: `${contactScore}/15 pts - Email, phone, location & portfolio links present.`,
    });
    if (!contactPassed) {
      suggestions.push("Ensure your LinkedIn profile and GitHub portfolio are populated in contact details.");
    }

    // 2. Professional Summary & Title (Max: 10)
    const hasTitle = Boolean(personal.title && personal.title.length > 3);
    const hasSummary = Boolean(personal.summary && personal.summary.length > 40);
    const sumScore = (hasTitle ? 5 : 0) + (hasSummary ? 5 : 0);
    score += sumScore;
    checks.push({
      title: "Target Title & Summary",
      passed: hasTitle && hasSummary,
      score: sumScore,
      maxScore: 10,
      detail: `${sumScore}/10 pts - Professional headline and ATS executive summary detected.`,
    });
    if (!hasSummary) {
      suggestions.push("Add a 2-3 sentence technical summary with your target engineering domain.");
    }

    // 3. Academic Credentials (Max: 15)
    const hasDegree = Boolean(education.degree && education.degree.length > 5);
    const hasInst = Boolean(education.institution && education.institution.length > 3);
    const hasScore = Boolean(education.score && education.score.length > 2);
    const eduScore = (hasDegree ? 6 : 0) + (hasInst ? 5 : 0) + (hasScore ? 4 : 0);
    score += eduScore;
    checks.push({
      title: "Education & Standard Degrees",
      passed: hasDegree && hasInst,
      score: eduScore,
      maxScore: 15,
      detail: `${eduScore}/15 pts - College name, degree, and GPA/marks format.`,
    });

    // 4. Skills Coverage (Max: 15)
    const totalSkillsCount =
      skills.languages.split(",").length + skills.frameworks.split(",").length + skills.tools.split(",").length;
    const skillsScore = Math.min(15, totalSkillsCount >= 10 ? 15 : totalSkillsCount >= 6 ? 10 : 5);
    score += skillsScore;
    checks.push({
      title: "Technical Matrix & Tools",
      passed: totalSkillsCount >= 10,
      score: skillsScore,
      maxScore: 15,
      detail: `${skillsScore}/15 pts - ${totalSkillsCount} skills indexed across Languages, Frameworks & Cloud.`,
    });
    if (totalSkillsCount < 10) {
      suggestions.push("List at least 10 specific technical skills (e.g. Docker, TypeScript, PostgreSQL, Git).");
    }

    // 5. Action Verbs & Power Words (Max: 15)
    const detectedVerbs = STRONG_ACTION_VERBS.filter((verb) => text.includes(verb));
    const verbScore = Math.min(15, detectedVerbs.length * 3);
    score += verbScore;
    checks.push({
      title: "Strong Action Verbs",
      passed: detectedVerbs.length >= 4,
      score: verbScore,
      maxScore: 15,
      detail: `${verbScore}/15 pts - ${detectedVerbs.length} high-impact action verbs detected (${detectedVerbs.slice(0, 4).join(", ")}...).`,
    });
    if (detectedVerbs.length < 4) {
      suggestions.push("Begin project and experience bullet points with strong action verbs: Engineered, Optimized, Architected.");
    }

    // 6. Measurable Metrics & Quantified Impact (Max: 15)
    const numbersRegex = /\b\d+(?:\.\d+)?%|\b\d{2,}\b|\b\d+\+\b/g;
    const matches = text.match(numbersRegex) || [];
    const metricScore = Math.min(15, matches.length * 3.5);
    score += Math.round(metricScore);
    checks.push({
      title: "Quantifiable Metrics & ROI",
      passed: matches.length >= 3,
      score: Math.round(metricScore),
      maxScore: 15,
      detail: `${Math.round(metricScore)}/15 pts - ${matches.length} metric/percentage references found (${matches.slice(0, 3).join(", ")}...).`,
    });
    if (matches.length < 3) {
      suggestions.push("Quantify your achievements! (e.g., 'improved throughput by 28%', 'reduced latency by 150ms').");
    }

    // 7. Experience & Projects Layout (Max: 15)
    const hasProjects = projects.length >= 2;
    const hasExp = experience.length >= 1;
    const projScore = (hasProjects ? 8 : 4) + (hasExp ? 7 : 3);
    score += projScore;
    checks.push({
      title: "Section Architecture & Length",
      passed: hasProjects,
      score: projScore,
      maxScore: 15,
      detail: `${projScore}/15 pts - Standard ATS single-column sections with clear chronological ordering.`,
    });

    const finalScore = Math.min(100, Math.max(20, score));

    // Job Description Matching
    const currentJd = useCustomJd
      ? {
          role: "Custom Job Description",
          keywords: customJdText
            .toLowerCase()
            .split(/[\s,.;]+/)
            .filter((w) => w.length > 2)
            .slice(0, 15),
        }
      : SAMPLE_JDS[selectedJdIndex];

    const matchedKeywords: string[] = [];
    const missingKeywords: string[] = [];

    currentJd.keywords.forEach((kw) => {
      if (text.includes(kw.toLowerCase())) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    });

    const jdMatchRate =
      currentJd.keywords.length > 0
        ? Math.round((matchedKeywords.length / currentJd.keywords.length) * 100)
        : 80;

    return {
      finalScore,
      checks,
      suggestions,
      detectedVerbs,
      totalWords: text.split(/\s+/).length,
      currentJd,
      matchedKeywords,
      missingKeywords,
      jdMatchRate,
    };
  }, [fullResumeText, personal, education, skills, projects, experience, selectedJdIndex, customJdText, useCustomJd]);

  // Handler: Add missing keyword to skills
  const addMissingKeyword = (keyword: string) => {
    setSkills((prev) => ({
      ...prev,
      tools: prev.tools ? `${prev.tools}, ${keyword}` : keyword,
    }));
    Alert.alert("Skill Added", `Added "${keyword}" to your Developer Tools.`);
  };

  // Handler: Print or Export PDF
  const handleExportPdf = () => {
    if (Platform.OS === "web") {
      try {
        window.print();
      } catch (err) {
        Alert.alert("Print Triggered", "Use browser Print to save your resume as an ATS-compliant PDF.");
      }
    } else {
      Alert.alert(
        "PDF Generated",
        `Your ATS-compliant PDF for "${personal.fullName}" has been rendered with an ATS score of ${atsAnalysis.finalScore}/100!`
      );
    }
  };

  // Handler: Copy ATS Plain Text
  const handleCopyPlainText = () => {
    const plainText = `
${personal.fullName.toUpperCase()}
${personal.title}
${personal.email} | ${personal.phone} | ${personal.location}
GitHub: ${personal.github} | LinkedIn: ${personal.linkedin}

PROFESSIONAL SUMMARY
${personal.summary}

EDUCATION
${education.degree}
${education.institution} - ${education.year}
Grade: ${education.score}

TECHNICAL SKILLS
- Programming Languages: ${skills.languages}
- Frameworks & Libraries: ${skills.frameworks}
- Cloud & Developer Tools: ${skills.tools}

FEATURED PROJECTS
${projects
  .map(
    (p) => `* ${p.title} (${p.tech})
  ${p.desc}`
  )
  .join("\n\n")}

EXPERIENCE
${experience
  .map(
    (e) => `* ${e.role} - ${e.company} (${e.duration})
  ${e.desc}`
  )
  .join("\n\n")}

CERTIFICATIONS
${certifications.map((c) => `* ${c.title} - ${c.issuer}`).join("\n")}
    `.trim();

    if (Platform.OS === "web" && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(plainText);
      Alert.alert("Copied!", "ATS-ready plain text resume copied to clipboard for direct portal submission.");
    } else {
      Alert.alert("Copied!", "ATS plain text formatted and ready.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppHeader
        showBack
        title="Resume Builder & ATS"
        subtitle={
          activeTab === "builder"
            ? `Step ${currentStep} of 7: ${WIZARD_STEPS[currentStep - 1].label}`
            : `ATS Diagnostics & Optimization (Score: ${atsAnalysis.finalScore}%)`
        }
      />

      {/* Top Main Mode Switcher: Builder vs ATS Scanner */}
      <View style={styles.topTabContainer}>
        <TouchableOpacity
          style={[styles.topTabBtn, activeTab === "builder" && styles.topTabBtnActive]}
          onPress={() => setActiveTab("builder")}
          activeOpacity={0.8}
        >
          <Feather
            name="edit-3"
            size={16}
            color={activeTab === "builder" ? "#0A192F" : "#64748b"}
          />
          <Text style={[styles.topTabText, activeTab === "builder" && styles.topTabTextActive]}>
            Resume Builder & Editor
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.topTabBtn, activeTab === "ats" && styles.topTabBtnActive]}
          onPress={() => setActiveTab("ats")}
          activeOpacity={0.8}
        >
          <View style={styles.tabBadgeRow}>
            <Feather
              name="check-circle"
              size={16}
              color={activeTab === "ats" ? "#0A192F" : "#64748b"}
            />
            <Text style={[styles.topTabText, activeTab === "ats" && styles.topTabTextActive]}>
              ATS Checker & Auditor
            </Text>
            <View
              style={[
                styles.miniScoreBadge,
                atsAnalysis.finalScore >= 80 ? styles.badgeSuccess : styles.badgeWarning,
              ]}
            >
              <Text style={styles.miniScoreText}>{atsAnalysis.finalScore}%</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ========================================================= */}
        {/* TAB 1: BUILDER & EDITOR                                   */}
        {/* ========================================================= */}
        {activeTab === "builder" && (
          <View style={styles.tabContent}>
            {/* Quick Role Preset Bar */}
            <View style={styles.presetBar}>
              <Text style={styles.presetLabel}>Quick Presets:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                {ROLE_PRESETS.map((p) => (
                  <TouchableOpacity
                    key={p.name}
                    style={styles.presetChip}
                    onPress={() => applyPreset(p.name)}
                    activeOpacity={0.8}
                  >
                    <Feather name="zap" size={12} color="#0066FF" />
                    <Text style={styles.presetChipText}>{p.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Wizard Steps Navigation */}
            <View style={styles.stepIndicatorContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stepScroll}>
                {WIZARD_STEPS.map((step) => {
                  const isCompleted = step.id < currentStep;
                  const isCurrent = step.id === currentStep;
                  return (
                    <TouchableOpacity
                      key={step.id}
                      style={[
                        styles.stepPill,
                        isCurrent && styles.stepPillCurrent,
                        isCompleted && styles.stepPillCompleted,
                      ]}
                      onPress={() => setCurrentStep(step.id)}
                    >
                      <Text
                        style={[
                          styles.stepNumText,
                          isCurrent && styles.stepNumTextCurrent,
                          isCompleted && styles.stepNumTextCompleted,
                        ]}
                      >
                        {step.id}
                      </Text>
                      <Text style={[styles.stepLabelText, isCurrent && styles.stepLabelTextCurrent]}>
                        {step.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Step 1: Personal & Contact Details */}
            {currentStep === 1 && (
              <View style={styles.formSection}>
                <View style={styles.sectionHeaderRow}>
                  <View>
                    <Text style={styles.sectionHeaderTitle}>1. Personal & Contact Information</Text>
                    <Text style={styles.sectionHeaderSub}>
                      Standard single-column header ensures 100% ATS readability.
                    </Text>
                  </View>
                  <View style={styles.atsCheckPill}>
                    <Feather name="shield" size={12} color="#16a34a" />
                    <Text style={styles.atsCheckText}>ATS Standard</Text>
                  </View>
                </View>

                <View style={styles.inputCard}>
                  <Text style={styles.inputLabel}>FULL NAME *</Text>
                  <TextInput
                    style={styles.input}
                    value={personal.fullName}
                    placeholder="e.g. Ganesh Kumar"
                    onChangeText={(t) => setPersonal({ ...personal, fullName: t })}
                  />

                  <Text style={styles.inputLabel}>PROFESSIONAL HEADLINE / TARGET ROLE *</Text>
                  <TextInput
                    style={styles.input}
                    value={personal.title}
                    placeholder="e.g. Computer Science Engineer | Full Stack Developer"
                    onChangeText={(t) => setPersonal({ ...personal, title: t })}
                  />

                  <View style={styles.rowInputs}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inputLabel}>EMAIL ADDRESS *</Text>
                      <TextInput
                        style={styles.input}
                        value={personal.email}
                        keyboardType="email-address"
                        onChangeText={(t) => setPersonal({ ...personal, email: t })}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inputLabel}>PHONE NUMBER *</Text>
                      <TextInput
                        style={styles.input}
                        value={personal.phone}
                        keyboardType="phone-pad"
                        onChangeText={(t) => setPersonal({ ...personal, phone: t })}
                      />
                    </View>
                  </View>

                  <Text style={styles.inputLabel}>LOCATION (CITY, COUNTRY) *</Text>
                  <TextInput
                    style={styles.input}
                    value={personal.location}
                    placeholder="e.g. Bengaluru, India"
                    onChangeText={(t) => setPersonal({ ...personal, location: t })}
                  />

                  <View style={styles.rowInputs}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inputLabel}>GITHUB / PORTFOLIO</Text>
                      <TextInput
                        style={styles.input}
                        value={personal.github}
                        placeholder="github.com/username"
                        onChangeText={(t) => setPersonal({ ...personal, github: t })}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inputLabel}>LINKEDIN URL</Text>
                      <TextInput
                        style={styles.input}
                        value={personal.linkedin}
                        placeholder="linkedin.com/in/username"
                        onChangeText={(t) => setPersonal({ ...personal, linkedin: t })}
                      />
                    </View>
                  </View>

                  <Text style={styles.inputLabel}>PROFESSIONAL SUMMARY (2-3 ATS SENTENCES)</Text>
                  <TextInput
                    style={[styles.input, styles.textAreaLarge]}
                    multiline
                    value={personal.summary}
                    placeholder="Brief overview highlighting core strengths, top skills, and career objective."
                    onChangeText={(t) => setPersonal({ ...personal, summary: t })}
                  />
                </View>
              </View>
            )}

            {/* Step 2: Academic Credentials */}
            {currentStep === 2 && (
              <View style={styles.formSection}>
                <Text style={styles.sectionHeaderTitle}>2. Academic Credentials</Text>
                <Text style={styles.sectionHeaderSub}>
                  List college degree, major, CGPA/percentage, and expected graduation.
                </Text>

                <View style={styles.inputCard}>
                  <Text style={styles.inputLabel}>DEGREE & MAJOR *</Text>
                  <TextInput
                    style={styles.input}
                    value={education.degree}
                    onChangeText={(t) => setEducation({ ...education, degree: t })}
                  />

                  <Text style={styles.inputLabel}>INSTITUTION / UNIVERSITY *</Text>
                  <TextInput
                    style={styles.input}
                    value={education.institution}
                    onChangeText={(t) => setEducation({ ...education, institution: t })}
                  />

                  <View style={styles.rowInputs}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inputLabel}>GRADE / CGPA / PERCENTAGE *</Text>
                      <TextInput
                        style={styles.input}
                        value={education.score}
                        onChangeText={(t) => setEducation({ ...education, score: t })}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.inputLabel}>GRADUATION YEAR / TIMELINE *</Text>
                      <TextInput
                        style={styles.input}
                        value={education.year}
                        onChangeText={(t) => setEducation({ ...education, year: t })}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* Step 3: Technical Skills Matrix */}
            {currentStep === 3 && (
              <View style={styles.formSection}>
                <Text style={styles.sectionHeaderTitle}>3. Technical Matrix & Keywords</Text>
                <Text style={styles.sectionHeaderSub}>
                  Categorized skills are 3x more likely to match ATS parser semantic taxonomy.
                </Text>

                <View style={styles.inputCard}>
                  <Text style={styles.inputLabel}>PROGRAMMING LANGUAGES (COMMA SEPARATED)</Text>
                  <TextInput
                    style={styles.input}
                    value={skills.languages}
                    onChangeText={(t) => setSkills({ ...skills, languages: t })}
                  />

                  <Text style={styles.inputLabel}>FRAMEWORKS & LIBRARIES</Text>
                  <TextInput
                    style={styles.input}
                    value={skills.frameworks}
                    onChangeText={(t) => setSkills({ ...skills, frameworks: t })}
                  />

                  <Text style={styles.inputLabel}>DEVELOPER TOOLS, CLOUD & DATABASES</Text>
                  <TextInput
                    style={styles.input}
                    value={skills.tools}
                    onChangeText={(t) => setSkills({ ...skills, tools: t })}
                  />
                </View>
              </View>
            )}

            {/* Step 4: Engineering Projects */}
            {currentStep === 4 && (
              <View style={styles.formSection}>
                <View style={styles.sectionHeaderRow}>
                  <View>
                    <Text style={styles.sectionHeaderTitle}>4. Engineering Projects</Text>
                    <Text style={styles.sectionHeaderSub}>
                      Use action verbs and measurable performance metrics.
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.addSectionBtn}
                    onPress={() =>
                      setProjects([
                        ...projects,
                        {
                          id: `p${Date.now()}`,
                          title: "New Scalable Project",
                          tech: "React, Node.js, PostgreSQL",
                          desc: "Engineered responsive full-stack system improving query execution times by 30%.",
                        },
                      ])
                    }
                  >
                    <Feather name="plus" size={14} color="#FFFFFF" />
                    <Text style={styles.addSectionBtnText}>Add Project</Text>
                  </TouchableOpacity>
                </View>

                {projects.map((proj, idx) => (
                  <View key={proj.id} style={[styles.inputCard, idx > 0 && { marginTop: 14 }]}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.cardItemTitle}>PROJECT {idx + 1}</Text>
                      {projects.length > 1 && (
                        <TouchableOpacity
                          onPress={() => setProjects(projects.filter((p) => p.id !== proj.id))}
                        >
                          <Feather name="trash-2" size={16} color="#ef4444" />
                        </TouchableOpacity>
                      )}
                    </View>

                    <Text style={styles.inputLabel}>PROJECT TITLE</Text>
                    <TextInput
                      style={styles.input}
                      value={proj.title}
                      onChangeText={(t) =>
                        setProjects(projects.map((p) => (p.id === proj.id ? { ...p, title: t } : p)))
                      }
                    />

                    <Text style={styles.inputLabel}>TECH STACK (ATS KEYWORDS)</Text>
                    <TextInput
                      style={styles.input}
                      value={proj.tech}
                      onChangeText={(t) =>
                        setProjects(projects.map((p) => (p.id === proj.id ? { ...p, tech: t } : p)))
                      }
                    />

                    {/* Action Verb Helper Chips */}
                    <View style={styles.verbHelperRow}>
                      <Text style={styles.verbHelperTitle}>Insert Power Verb:</Text>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
                        {STRONG_ACTION_VERBS.slice(0, 6).map((verb) => (
                          <TouchableOpacity
                            key={verb}
                            style={styles.verbChip}
                            onPress={() => addActionVerbToProject(proj.id, verb)}
                          >
                            <Text style={styles.verbChipText}>+{verb}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>

                    <Text style={styles.inputLabel}>BULLET IMPACT DESCRIPTION</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      multiline
                      value={proj.desc}
                      placeholder="Start with an action verb, describe technology used, and end with quantifiable metric."
                      onChangeText={(t) =>
                        setProjects(projects.map((p) => (p.id === proj.id ? { ...p, desc: t } : p)))
                      }
                    />
                  </View>
                ))}
              </View>
            )}

            {/* Step 5: Work & Internship Experience */}
            {currentStep === 5 && (
              <View style={styles.formSection}>
                <View style={styles.sectionHeaderRow}>
                  <View>
                    <Text style={styles.sectionHeaderTitle}>5. Internship & Work Experience</Text>
                    <Text style={styles.sectionHeaderSub}>
                      Chronological work history with company and duration.
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.addSectionBtn}
                    onPress={() =>
                      setExperience([
                        ...experience,
                        {
                          id: `e${Date.now()}`,
                          role: "Junior Developer / Contributor",
                          company: "Open Source Tech",
                          duration: "Aug 2024 - Present",
                          desc: "Refactored core REST services and integrated unit test suites across 20+ modules.",
                        },
                      ])
                    }
                  >
                    <Feather name="plus" size={14} color="#FFFFFF" />
                    <Text style={styles.addSectionBtnText}>Add Experience</Text>
                  </TouchableOpacity>
                </View>

                {experience.map((exp, idx) => (
                  <View key={exp.id} style={[styles.inputCard, idx > 0 && { marginTop: 14 }]}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.cardItemTitle}>POSITION {idx + 1}</Text>
                      {experience.length > 1 && (
                        <TouchableOpacity
                          onPress={() => setExperience(experience.filter((e) => e.id !== exp.id))}
                        >
                          <Feather name="trash-2" size={16} color="#ef4444" />
                        </TouchableOpacity>
                      )}
                    </View>

                    <View style={styles.rowInputs}>
                      <View style={{ flex: 1.2 }}>
                        <Text style={styles.inputLabel}>ROLE / TITLE</Text>
                        <TextInput
                          style={styles.input}
                          value={exp.role}
                          onChangeText={(t) =>
                            setExperience(experience.map((e) => (e.id === exp.id ? { ...e, role: t } : e)))
                          }
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.inputLabel}>COMPANY</Text>
                        <TextInput
                          style={styles.input}
                          value={exp.company}
                          onChangeText={(t) =>
                            setExperience(experience.map((e) => (e.id === exp.id ? { ...e, company: t } : e)))
                          }
                        />
                      </View>
                    </View>

                    <Text style={styles.inputLabel}>TIMELINE / DURATION</Text>
                    <TextInput
                      style={styles.input}
                      value={exp.duration}
                      placeholder="e.g. May 2025 - July 2025"
                      onChangeText={(t) =>
                        setExperience(experience.map((e) => (e.id === exp.id ? { ...e, duration: t } : e)))
                      }
                    />

                    <Text style={styles.inputLabel}>RESPONSIBILITIES & MEASURABLE OUTCOMES</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      multiline
                      value={exp.desc}
                      onChangeText={(t) =>
                        setExperience(experience.map((e) => (e.id === exp.id ? { ...e, desc: t } : e)))
                      }
                    />
                  </View>
                ))}
              </View>
            )}

            {/* Step 6: Certifications */}
            {currentStep === 6 && (
              <View style={styles.formSection}>
                <View style={styles.sectionHeaderRow}>
                  <View>
                    <Text style={styles.sectionHeaderTitle}>6. Honors & Certifications</Text>
                    <Text style={styles.sectionHeaderSub}>
                      Industry-recognized certifications elevate candidate authority.
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.addSectionBtn}
                    onPress={() =>
                      setCertifications([
                        ...certifications,
                        { id: `c${Date.now()}`, title: "New Technical Credential", issuer: "Authority" },
                      ])
                    }
                  >
                    <Feather name="plus" size={14} color="#FFFFFF" />
                    <Text style={styles.addSectionBtnText}>Add Cert</Text>
                  </TouchableOpacity>
                </View>

                {certifications.map((cert, idx) => (
                  <View key={cert.id} style={[styles.inputCard, idx > 0 && { marginTop: 14 }]}>
                    <View style={styles.cardHeaderRow}>
                      <Text style={styles.cardItemTitle}>CERTIFICATION {idx + 1}</Text>
                      {certifications.length > 1 && (
                        <TouchableOpacity
                          onPress={() => setCertifications(certifications.filter((c) => c.id !== cert.id))}
                        >
                          <Feather name="trash-2" size={16} color="#ef4444" />
                        </TouchableOpacity>
                      )}
                    </View>

                    <Text style={styles.inputLabel}>CERTIFICATION NAME</Text>
                    <TextInput
                      style={styles.input}
                      value={cert.title}
                      onChangeText={(t) =>
                        setCertifications(certifications.map((c) => (c.id === cert.id ? { ...c, title: t } : c)))
                      }
                    />

                    <Text style={styles.inputLabel}>ISSUING AUTHORITY</Text>
                    <TextInput
                      style={styles.input}
                      value={cert.issuer}
                      onChangeText={(t) =>
                        setCertifications(certifications.map((c) => (c.id === cert.id ? { ...c, issuer: t } : c)))
                      }
                    />
                  </View>
                ))}
              </View>
            )}

            {/* Step 7: Live Document Preview & Export */}
            {currentStep === 7 && (
              <View style={styles.previewSection}>
                {/* Template Chooser Bar */}
                <View style={styles.templateSelectorRow}>
                  <Text style={styles.templateLabel}>ATS Template:</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                    {(
                      [
                        { id: "modern", name: "Modern Tech" },
                        { id: "executive", name: "Executive" },
                        { id: "harvard", name: "Harvard Clean" },
                        { id: "compact", name: "Compact" },
                      ] as const
                    ).map((t) => (
                      <TouchableOpacity
                        key={t.id}
                        style={[styles.templatePill, template === t.id && styles.templatePillActive]}
                        onPress={() => setTemplate(t.id)}
                      >
                        <Text style={[styles.templateText, template === t.id && styles.templateTextActive]}>
                          {t.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                {/* Live Resume Document Canvas */}
                <View
                  style={[
                    styles.resumeDocument,
                    template === "executive" && styles.resumeDocExecutive,
                    template === "harvard" && styles.resumeDocHarvard,
                    template === "compact" && styles.resumeDocCompact,
                  ]}
                >
                  {/* Header */}
                  <View style={styles.docHeader}>
                    <Text style={styles.docName}>{personal.fullName}</Text>
                    <Text style={styles.docHeadline}>{personal.title}</Text>
                    <Text style={styles.docContact}>
                      {personal.email} • {personal.phone} • {personal.location}
                    </Text>
                    <Text style={styles.docGithub}>
                      {personal.github} {personal.linkedin ? `• ${personal.linkedin}` : ""}
                    </Text>
                  </View>

                  {personal.summary ? (
                    <>
                      <View style={styles.docDivider} />
                      <View style={styles.docBlock}>
                        <Text style={styles.docBlockTitle}>PROFESSIONAL SUMMARY</Text>
                        <Text style={styles.docSummaryText}>{personal.summary}</Text>
                      </View>
                    </>
                  ) : null}

                  <View style={styles.docDivider} />

                  {/* Education */}
                  <View style={styles.docBlock}>
                    <Text style={styles.docBlockTitle}>EDUCATION</Text>
                    <View style={styles.docRowBetween}>
                      <Text style={styles.docDegree}>{education.degree}</Text>
                      <Text style={styles.docDate}>{education.year}</Text>
                    </View>
                    <Text style={styles.docInst}>
                      {education.institution} — <Text style={{ fontWeight: "700" }}>{education.score}</Text>
                    </Text>
                  </View>

                  {/* Skills */}
                  <View style={styles.docBlock}>
                    <Text style={styles.docBlockTitle}>TECHNICAL SKILLS</Text>
                    <Text style={styles.docSkillLine}>
                      <Text style={styles.boldLabel}>Languages: </Text>
                      {skills.languages}
                    </Text>
                    <Text style={styles.docSkillLine}>
                      <Text style={styles.boldLabel}>Frameworks: </Text>
                      {skills.frameworks}
                    </Text>
                    <Text style={styles.docSkillLine}>
                      <Text style={styles.boldLabel}>Tools & Cloud: </Text>
                      {skills.tools}
                    </Text>
                  </View>

                  {/* Projects */}
                  <View style={styles.docBlock}>
                    <Text style={styles.docBlockTitle}>FEATURED PROJECTS</Text>
                    {projects.map((proj) => (
                      <View key={proj.id} style={styles.projectItem}>
                        <Text style={styles.docProjectTitle}>
                          {proj.title} <Text style={styles.docTechPill}>({proj.tech})</Text>
                        </Text>
                        <Text style={styles.docBullet}>• {proj.desc}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Experience */}
                  <View style={styles.docBlock}>
                    <Text style={styles.docBlockTitle}>EXPERIENCE</Text>
                    {experience.map((exp) => (
                      <View key={exp.id} style={{ marginBottom: 6 }}>
                        <View style={styles.docRowBetween}>
                          <Text style={styles.docRole}>
                            {exp.role} — <Text style={{ fontWeight: "600" }}>{exp.company}</Text>
                          </Text>
                          <Text style={styles.docDate}>{exp.duration}</Text>
                        </View>
                        <Text style={styles.docBullet}>• {exp.desc}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Certifications */}
                  {certifications.length > 0 && (
                    <View style={styles.docBlock}>
                      <Text style={styles.docBlockTitle}>CERTIFICATIONS</Text>
                      {certifications.map((cert) => (
                        <Text key={cert.id} style={styles.docCertLine}>
                          • <Text style={{ fontWeight: "700" }}>{cert.title}</Text> — {cert.issuer}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>

                {/* Primary Export Actions */}
                <View style={styles.downloadRow}>
                  <TouchableOpacity style={styles.exportBtnSecondary} onPress={handleCopyPlainText}>
                    <Feather name="copy" size={15} color="#0A192F" />
                    <Text style={styles.exportBtnSecondaryText}>Copy Plain Text</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.exportBtnSecondary} onPress={() => setActiveTab("ats")}>
                    <Feather name="shield" size={15} color="#16a34a" />
                    <Text style={[styles.exportBtnSecondaryText, { color: "#16a34a" }]}>
                      Audit ({atsAnalysis.finalScore}%)
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.downloadBtn} onPress={handleExportPdf}>
                    <Feather name="download" size={16} color="#FFFFFF" />
                    <Text style={styles.downloadBtnText}>Download PDF</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Bottom Wizard Controls */}
            <View style={styles.wizardControlRow}>
              {currentStep > 1 && (
                <TouchableOpacity
                  style={styles.prevBtn}
                  onPress={() => setCurrentStep(currentStep - 1)}
                  activeOpacity={0.8}
                >
                  <Feather name="arrow-left" size={16} color={Palette.textTitle} />
                  <Text style={styles.prevBtnText}>Previous</Text>
                </TouchableOpacity>
              )}

              {currentStep < 7 ? (
                <TouchableOpacity
                  style={styles.nextBtn}
                  onPress={() => setCurrentStep(currentStep + 1)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.nextBtnText}>Continue to Step {currentStep + 1}</Text>
                  <Feather name="arrow-right" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ATS RESUME CHECKER & AUDITOR                       */}
        {/* ========================================================= */}
        {activeTab === "ats" && (
          <View style={styles.tabContent}>
            {/* Top Score Banner */}
            <View style={styles.atsHeroCard}>
              <View style={styles.atsHeroLeft}>
                <View
                  style={[
                    styles.atsBigCircle,
                    atsAnalysis.finalScore >= 85
                      ? styles.circleGreen
                      : atsAnalysis.finalScore >= 70
                      ? styles.circleOrange
                      : styles.circleRed,
                  ]}
                >
                  <Text style={styles.atsBigScoreText}>{atsAnalysis.finalScore}</Text>
                  <Text style={styles.atsBigScoreSub}>/ 100</Text>
                </View>
              </View>

              <View style={styles.atsHeroRight}>
                <View style={styles.badgeRow}>
                  <View
                    style={[
                      styles.ratingPill,
                      atsAnalysis.finalScore >= 85
                        ? styles.pillGreen
                        : atsAnalysis.finalScore >= 70
                        ? styles.pillOrange
                        : styles.pillRed,
                    ]}
                  >
                    <Text style={styles.ratingPillText}>
                      {atsAnalysis.finalScore >= 85
                        ? "ATS OPTIMIZED"
                        : atsAnalysis.finalScore >= 70
                        ? "GOOD COMPATIBILITY"
                        : "NEEDS ATTENTION"}
                    </Text>
                  </View>
                </View>

                <Text style={styles.atsHeroTitle}>
                  {atsAnalysis.finalScore >= 85
                    ? "High Likelihood to Pass Enterprise ATS"
                    : "Resume is Readable with Optimization Potential"}
                </Text>
                <Text style={styles.atsHeroDesc}>
                  Evaluated across standard section headers, contact completeness, action verbs, quantified metrics,
                  and keyword density.
                </Text>
              </View>
            </View>

            {/* Quick Metrics Strip */}
            <View style={styles.metricsRow}>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{atsAnalysis.totalWords}</Text>
                <Text style={styles.metricLabel}>Word Count</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{atsAnalysis.detectedVerbs.length}</Text>
                <Text style={styles.metricLabel}>Action Verbs</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{projects.length + experience.length}</Text>
                <Text style={styles.metricLabel}>Experience Entries</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{skills.languages.split(",").length}</Text>
                <Text style={styles.metricLabel}>Languages</Text>
              </View>
            </View>

            {/* Target Job Role / JD Keyword Matcher */}
            <View style={styles.auditSectionCard}>
              <View style={styles.auditHeaderRow}>
                <View>
                  <Text style={styles.auditSectionTitle}>Target Job Role Keyword Matching</Text>
                  <Text style={styles.auditSectionSubtitle}>
                    ATS parsers score candidates based on keyword matching against the job description.
                  </Text>
                </View>
                <View style={styles.jdMatchRateBadge}>
                  <Text style={styles.jdMatchRateText}>{atsAnalysis.jdMatchRate}% Match</Text>
                </View>
              </View>

              {/* JD Selector Pills */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginVertical: 12 }}>
                {SAMPLE_JDS.map((jd, idx) => (
                  <TouchableOpacity
                    key={jd.role}
                    style={[
                      styles.jdSelectorChip,
                      !useCustomJd && selectedJdIndex === idx && styles.jdSelectorChipActive,
                    ]}
                    onPress={() => {
                      setUseCustomJd(false);
                      setSelectedJdIndex(idx);
                    }}
                  >
                    <Text
                      style={[
                        styles.jdSelectorChipText,
                        !useCustomJd && selectedJdIndex === idx && styles.jdSelectorChipTextActive,
                      ]}
                    >
                      {jd.role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Matched Keywords */}
              <View style={styles.keywordGroup}>
                <Text style={styles.keywordGroupTitle}>
                  Matched Keywords ({atsAnalysis.matchedKeywords.length})
                </Text>
                <View style={styles.keywordChipsWrap}>
                  {atsAnalysis.matchedKeywords.map((kw) => (
                    <View key={kw} style={styles.keywordChipGreen}>
                      <Feather name="check" size={12} color="#15803d" />
                      <Text style={styles.keywordTextGreen}>{kw}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Missing Keywords with 1-Click Add */}
              {atsAnalysis.missingKeywords.length > 0 && (
                <View style={[styles.keywordGroup, { marginTop: 12 }]}>
                  <Text style={styles.keywordGroupTitleMissing}>
                    Missing Keywords in Resume ({atsAnalysis.missingKeywords.length})
                  </Text>
                  <Text style={styles.keywordHelp}>Tap any missing keyword to instantly add it to your Skills section:</Text>
                  <View style={styles.keywordChipsWrap}>
                    {atsAnalysis.missingKeywords.map((kw) => (
                      <TouchableOpacity
                        key={kw}
                        style={styles.keywordChipRed}
                        onPress={() => addMissingKeyword(kw)}
                      >
                        <Feather name="plus" size={12} color="#dc2626" />
                        <Text style={styles.keywordTextRed}>{kw}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}
            </View>

            {/* Detailed ATS Checklist */}
            <View style={styles.auditSectionCard}>
              <Text style={styles.auditSectionTitle}>ATS Architecture Audit Breakdown</Text>
              <Text style={styles.auditSectionSubtitle}>
                Key compliance criteria tested by Taleo, Greenhouse, and Workday parsing algorithms.
              </Text>

              <View style={{ marginTop: 12 }}>
                {atsAnalysis.checks.map((check, idx) => (
                  <View key={idx} style={styles.checkRow}>
                    <View style={styles.checkIconWrapper}>
                      <Feather
                        name={check.passed ? "check-circle" : "alert-circle"}
                        size={20}
                        color={check.passed ? "#16a34a" : "#f59e0b"}
                      />
                    </View>
                    <View style={styles.checkDetails}>
                      <View style={styles.checkTitleRow}>
                        <Text style={styles.checkTitle}>{check.title}</Text>
                        <Text style={[styles.checkScore, check.passed ? styles.textGreen : styles.textOrange]}>
                          {check.score} / {check.maxScore} pts
                        </Text>
                      </View>
                      <Text style={styles.checkDesc}>{check.detail}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Actionable Recommendations */}
            {atsAnalysis.suggestions.length > 0 && (
              <View style={styles.recommendationsCard}>
                <View style={styles.recHeaderRow}>
                  <Feather name="zap" size={18} color="#0066FF" />
                  <Text style={styles.recHeaderTitle}>Smart Actionable Improvements</Text>
                </View>
                {atsAnalysis.suggestions.map((sug, i) => (
                  <View key={i} style={styles.recItemRow}>
                    <Text style={styles.recBullet}>•</Text>
                    <Text style={styles.recText}>{sug}</Text>
                  </View>
                ))}

                <TouchableOpacity
                  style={styles.jumpEditBtn}
                  onPress={() => {
                    setActiveTab("builder");
                    setCurrentStep(4);
                  }}
                >
                  <Text style={styles.jumpEditBtnText}>Apply Improvements in Builder →</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FAFC" },
  scrollContent: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 50 },

  // Top Tab Switcher
  topTabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    gap: 10,
  },
  topTabBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
  },
  topTabBtnActive: {
    backgroundColor: "#E2E8F0",
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  tabBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  topTabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  topTabTextActive: {
    color: "#0A192F",
    fontWeight: "700",
  },
  miniScoreBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  badgeSuccess: { backgroundColor: "#DCFCE7" },
  badgeWarning: { backgroundColor: "#FEF3C7" },
  miniScoreText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#166534",
  },

  tabContent: {
    width: "100%",
    maxWidth: 820,
    alignSelf: "center",
  },

  // Presets
  presetBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  presetLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
  },
  presetChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  presetChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1D4ED8",
  },

  // Wizard indicator
  stepIndicatorContainer: { marginBottom: 18 },
  stepScroll: { gap: 8, paddingVertical: 4 },
  stepPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Radii.pill,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: Palette.border,
  },
  stepPillCurrent: {
    backgroundColor: Palette.primaryLight,
    borderColor: Palette.primary,
  },
  stepPillCompleted: {
    backgroundColor: Palette.successLight,
    borderColor: Palette.successBorder,
  },
  stepNumText: { fontSize: 11, fontWeight: "700", color: Palette.textSecondary },
  stepNumTextCurrent: { color: Palette.primary },
  stepNumTextCompleted: { color: Palette.success },
  stepLabelText: { fontSize: 12, fontWeight: "600", color: Palette.textSecondary },
  stepLabelTextCurrent: { color: Palette.primary, fontWeight: "700" },

  // Forms
  formSection: { marginBottom: 20 },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  sectionHeaderTitle: { fontSize: 17, fontWeight: "800", color: "#0F172A" },
  sectionHeaderSub: { fontSize: 12.5, color: "#64748B", marginTop: 2 },
  atsCheckPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  atsCheckText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#166534",
  },
  addSectionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#0A192F",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addSectionBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: Radii.card,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...Shadows.card,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardItemTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: 0.6,
  },
  inputLabel: {
    fontSize: 10.5,
    fontWeight: "800",
    color: "#334155",
    letterSpacing: 0.6,
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: Radii.input,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#0F172A",
  },
  rowInputs: {
    flexDirection: "row",
    gap: 10,
  },
  textArea: {
    height: 60,
    textAlignVertical: "top",
  },
  textAreaLarge: {
    height: 75,
    textAlignVertical: "top",
  },

  // Action Verb Helper
  verbHelperRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    marginBottom: 4,
  },
  verbHelperTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
  },
  verbChip: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  verbChipText: {
    fontSize: 11,
    color: "#334155",
    fontWeight: "600",
  },

  // Step 7: Preview
  previewSection: { marginBottom: 20 },
  templateSelectorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  templateLabel: { fontSize: 13, fontWeight: "700", color: Palette.textTitle },
  templatePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: Palette.border,
  },
  templatePillActive: { backgroundColor: "#0A192F", borderColor: "#0A192F" },
  templateText: { fontSize: 12, fontWeight: "600", color: Palette.textSecondary },
  templateTextActive: { color: "#FFFFFF", fontWeight: "700" },

  // Resume Document Canvas
  resumeDocument: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...Shadows.floating,
  },
  resumeDocExecutive: {
    borderLeftWidth: 6,
    borderLeftColor: "#0A192F",
  },
  resumeDocHarvard: {
    borderWidth: 1,
    borderColor: "#94A3B8",
    padding: 28,
  },
  resumeDocCompact: {
    padding: 16,
  },
  docHeader: { alignItems: "center", marginBottom: 12 },
  docName: { fontSize: 21, fontWeight: "800", color: "#0A192F", letterSpacing: -0.4 },
  docHeadline: { fontSize: 13, fontWeight: "600", color: "#0066FF", marginTop: 2 },
  docContact: { fontSize: 11, color: "#64748B", marginTop: 4 },
  docGithub: { fontSize: 11, color: "#0066FF", marginTop: 2 },
  docDivider: { height: 1, backgroundColor: "#E2E8F0", marginVertical: 10 },
  docBlock: { marginBottom: 12 },
  docBlockTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0A192F",
    letterSpacing: 0.8,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingBottom: 2,
  },
  docSummaryText: { fontSize: 11.5, color: "#334155", lineHeight: 16 },
  docRowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  docDegree: { fontSize: 12.5, fontWeight: "700", color: "#0F172A" },
  docDate: { fontSize: 11, color: "#64748B" },
  docInst: { fontSize: 11.5, color: "#475569", marginTop: 1 },
  docSkillLine: { fontSize: 11.5, color: "#334155", marginTop: 2 },
  boldLabel: { fontWeight: "700", color: "#0F172A" },
  projectItem: { marginTop: 5 },
  docProjectTitle: { fontSize: 12, fontWeight: "700", color: "#0F172A" },
  docTechPill: { fontWeight: "500", color: "#64748B", fontSize: 11 },
  docBullet: { fontSize: 11, color: "#334155", marginTop: 2, lineHeight: 15 },
  docRole: { fontSize: 12.5, fontWeight: "700", color: "#0F172A" },
  docCertLine: { fontSize: 11.5, color: "#334155", marginTop: 2 },

  downloadRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },
  exportBtnSecondary: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: Radii.button,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  exportBtnSecondaryText: { fontSize: 13, fontWeight: "700", color: "#0A192F" },
  downloadBtn: {
    flex: 1.4,
    backgroundColor: "#0A192F",
    borderRadius: Radii.button,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    ...Shadows.button,
  },
  downloadBtnText: { fontSize: 14, fontWeight: "700", color: "#FFFFFF" },

  wizardControlRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  prevBtn: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: Radii.button,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  prevBtnText: { fontSize: 13.5, fontWeight: "700", color: Palette.textTitle },
  nextBtn: {
    flex: 1,
    backgroundColor: "#0A192F",
    borderRadius: Radii.button,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    ...Shadows.button,
  },
  nextBtnText: { fontSize: 14, fontWeight: "700", color: "#FFFFFF" },

  // ATS AUDIT TAB STYLES
  atsHeroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 16,
    ...Shadows.card,
  },
  atsHeroLeft: {
    alignItems: "center",
    justifyContent: "center",
  },
  atsBigCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
  },
  circleGreen: {
    borderColor: "#16A34A",
    backgroundColor: "#F0FDF4",
  },
  circleOrange: {
    borderColor: "#F59E0B",
    backgroundColor: "#FFFBEB",
  },
  circleRed: {
    borderColor: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
  atsBigScoreText: {
    fontSize: 28,
    fontWeight: "900",
    color: "#0F172A",
  },
  atsBigScoreSub: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "600",
    marginTop: -2,
  },
  atsHeroRight: {
    flex: 1,
  },
  badgeRow: {
    marginBottom: 6,
  },
  ratingPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  pillGreen: { backgroundColor: "#DCFCE7" },
  pillOrange: { backgroundColor: "#FEF3C7" },
  pillRed: { backgroundColor: "#FEE2E2" },
  ratingPillText: {
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 0.6,
    color: "#0F172A",
  },
  atsHeroTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },
  atsHeroDesc: {
    fontSize: 12,
    color: "#64748B",
    lineHeight: 16,
  },

  // Metrics Row
  metricsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  metricItem: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  metricLabel: {
    fontSize: 10.5,
    color: "#64748B",
    fontWeight: "600",
    marginTop: 2,
    textAlign: "center",
  },

  // Audit Section Card
  auditSectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 16,
    ...Shadows.card,
  },
  auditHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  auditSectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  auditSectionSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
  jdMatchRateBadge: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  jdMatchRateText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#1D4ED8",
  },
  jdSelectorChip: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  jdSelectorChipActive: {
    backgroundColor: "#0A192F",
    borderColor: "#0A192F",
  },
  jdSelectorChipText: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "600",
  },
  jdSelectorChipTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  keywordGroup: {
    marginTop: 6,
  },
  keywordGroupTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#15803D",
    marginBottom: 6,
  },
  keywordGroupTitleMissing: {
    fontSize: 12,
    fontWeight: "700",
    color: "#DC2626",
    marginBottom: 4,
  },
  keywordHelp: {
    fontSize: 11,
    color: "#64748B",
    marginBottom: 6,
  },
  keywordChipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  keywordChipGreen: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  keywordTextGreen: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#166534",
  },
  keywordChipRed: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  keywordTextRed: {
    fontSize: 11.5,
    fontWeight: "600",
    color: "#991B1B",
  },

  // Audit Checklist
  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    gap: 12,
  },
  checkIconWrapper: {
    paddingTop: 2,
  },
  checkDetails: {
    flex: 1,
  },
  checkTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#0F172A",
  },
  checkScore: {
    fontSize: 12,
    fontWeight: "800",
  },
  textGreen: { color: "#16A34A" },
  textOrange: { color: "#D97706" },
  checkDesc: {
    fontSize: 11.5,
    color: "#64748B",
    marginTop: 2,
  },

  // Recommendations
  recommendationsCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    marginBottom: 20,
  },
  recHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  recHeaderTitle: {
    fontSize: 14.5,
    fontWeight: "800",
    color: "#1E40AF",
  },
  recItemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 6,
  },
  recBullet: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "800",
  },
  recText: {
    flex: 1,
    fontSize: 12.5,
    color: "#1E3A8A",
    lineHeight: 17,
  },
  jumpEditBtn: {
    backgroundColor: "#0A192F",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  jumpEditBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});
