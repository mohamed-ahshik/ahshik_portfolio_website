import { Icons } from "@/components/icons";
import {
  Brain,
  Code,
  Database,
  HomeIcon,
  Layers,
  MessageSquare,
  Search,
  Table,
  Workflow,
} from "lucide-react";
import {
  SiDocker,
  SiFastapi,
  SiGit,
  SiHuggingface,
  SiLangchain,
  SiMlflow,
  SiNeo4J,
  SiOpencv,
  SiPython,
  SiPytorch,
  SiScikitlearn,
  SiSupabase,
  SiTensorflow,
} from "react-icons/si";

export const DATA = {
  name: "Mohamed Ahshik",
  initials: "MA",
  url: "https://ahshik.vercel.app",
  location: "Singapore",
  locationLink: "https://www.google.com/maps/place/singapore",
  description: "AI Engineer",
  summary: `Dedicated and detail-oriented Engineer with a robust background in mechatronics and artificial intelligence. Extensive experience involving complex projects in academic and professional settings, with a proven track record of delivering innovations in data capture, process automation, and system development.`,
  avatarUrl: "/profile_photo/1_profile_photo_ntu_square.jpeg",
  skills: [
    { name: "Python", icon: SiPython },
    { name: "TensorFlow", icon: SiTensorflow },
    { name: "PyTorch", icon: SiPytorch },
    { name: "Scikit-learn", icon: SiScikitlearn },
    { name: "OpenCV", icon: SiOpencv },
    { name: "Hugging Face", icon: SiHuggingface },
    { name: "FastAPI", icon: SiFastapi },
    { name: "Docker", icon: SiDocker },
    { name: "Git", icon: SiGit },
    { name: "MLflow", icon: SiMlflow },
    { name: "LLMs", icon: Brain },
    { name: "RAG", icon: Search },
    { name: "LangChain / LangGraph", icon: SiLangchain },
    { name: "LlamaIndex", icon: Layers },
    { name: "Prompt Engineering", icon: MessageSquare },
    { name: "Data Engineering", icon: Workflow },
    { name: "Neo4j", icon: SiNeo4J },
    { name: "KuzuDB", icon: Database },
    { name: "Supabase", icon: SiSupabase },
    { name: "SQL", icon: Table },
    { name: "Cypher", icon: Code },
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "mohamedahshik@outlook.com",
    tel: "+65 9085 8555",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/mohamed-ahshik",
        icon: Icons.github,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:mohamedahshik@outlook.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Deriv",
      href: "https://deriv.com",
      location: "Singapore",
      title: "AI Engineer",
      logoUrl: "/logos/deriv.jpeg",
      start: "January 2026",
      end: undefined,
      description: `- Contributed to AI integration projects within the marketing function, building automated pipelines to detect, generate, and publish market-moving events using LLMs.
- Developed LLM-based insights (Claude) to analyze quarterly stock performance, incorporating prompt engineering and structured output generation.
- Integrated generative AI tools (Nano Banana) via APIs to produce on-brand visual assets for social media campaigns.
- Developed an AI-powered video generation pipeline combining text-to-speech, background audio, and automated content generation for scalable media production.
- Engineered an AI-driven video processing tool to automate podcast editing, utilizing machine learning to isolate key Q&A segments, format multi-cam side-by-side views, and apply programmatic branding to slash post-production turnaround from hours to minutes.`,
    },
    {
      company: "AI Singapore - NUS",
      href: "https://aisingapore.org",
      location: "Singapore",
      title: "Associate AI Engineer",
      logoUrl: "/logos/aisingapore.jpeg",
      start: "September 2024",
      end: "June 2025",
      description: `- Selected for the highly competitive 9-month AI Apprenticeship Programme (AIAP) through a rigorous technical assessment and interview process.
- Completed intensive training in statistics, classical machine learning techniques (SVMs, Random Forest, Logistic Regression), and modern deep learning with LLMs such as DeepSeek-R1-Distill, SaulLM, and LLaMA.
- Engineered a pipeline to synthesize annotated legal statutes by integrating structured legal data.
- Built a domain-specific knowledge graph mapping legal Acts, Sections, and Case Law, enabling linkage between legislation and cases.
- Developed and deployed a Retrieval-Augmented Generation (RAG) system with vector database integration, indexing legal text using dense embeddings for semantic retrieval.
- Achieved automated section-level annotation by retrieving the top-cited cases for each statutory section and generating LLM-based annotation with paragraph-level source attribution.`,
    },
    {
      company: "Rehabilitation Research Institute of Singapore - NTU",
      href: "https://www.ntu.edu.sg",
      location: "Singapore",
      title: "Project Officer / Research Associate",
      logoUrl: "/logos/ntu.edu.jpeg",
      start: "November 2019",
      end: "September 2024",
      description: `- **Ability Data:** Managed the Qualisys Track Manager (QTM) motion capture system to collect Asian-centric motion data from over 200 subjects, conducted detailed data cleaning and processing, and served as the lead trainer for QTM operations across teams.
- **Visual3D:** Built automation scripts using Visual3D and Python (Pandas, PyQt5) to streamline post-processing of large datasets, including a one-click system that automated modeling of 200 subjects' height, weight, and pipeline parameters.
- **Markerless System:** Advanced a markerless tracking system that identifies anatomical points without traditional markers; improved quality-check scripts and built an analytical layer that generates detailed PDF reports via HTML and the Jinja templating library.`,
    },
    {
      company: "Singapore Police Force",
      href: "https://www.police.gov.sg",
      location: "Singapore",
      title: "Police Patrol Officer Sergeant (2)",
      logoUrl: "/logos/Singapore_police_force.jpeg",
      start: "October 2015",
      end: "August 2017",
      description: `- Received the Commander's Award for dedicated service in 2016, acknowledging exceptional commitment and professionalism in law enforcement tasks.`,
    },
    {
      company: "Thales Solutions Asia Pte Ltd",
      href: "https://www.thalesgroup.com",
      location: "Singapore",
      title: "Internship",
      logoUrl: "/logos/thalesgroup.jpeg",
      start: "October 2014",
      end: "December 2014",
      description: `- Engineering internship at Thales Solutions Asia Pte Ltd.`,
    },
  ],
  education: [
    {
      school: "Nanyang Polytechnic",
      href: "https://www.nyp.edu.sg",
      degree: "Specialist Diploma in Artificial Intelligence",
      logoUrl: "/logos/nyp.edu.jpeg",
      start: "2022",
      end: "2023",
    },
    {
      school: "Nanyang Technological University",
      href: "https://www.ntu.edu.sg",
      degree: "Master of Science in Mechanical Engineering (Additive Manufacturing)",
      logoUrl: "/logos/ntu.edu.jpeg",
      start: "2020",
      end: "2022",
    },
    {
      school: "University of Glasgow (Singapore Institute of Technology)",
      href: "https://www.gla.ac.uk",
      degree: "Bachelor of Engineering in Mechatronics (Hons)",
      logoUrl: "/logos/gla.ac.jpeg",
      start: "2017",
      end: "2019",
    },
    {
      school: "Nanyang Polytechnic",
      href: "https://www.nyp.edu.sg",
      degree: "Diploma in Electronics, Computer & Communication Engineering",
      logoUrl: "/logos/nyp.edu.jpeg",
      start: "2012",
      end: "2015",
    },
  ],
  projects: [
    {
      title: "Traditional RAG System",
      href: "https://github.com/mohamed-ahshik/rag_insurance",
      dates: "Personal Project",
      description:
        "A document question-answering system with a Streamlit front end: uploaded documents are chunked, embedded, and indexed into a vector database; semantically similar chunks are retrieved for an LLM to generate grounded answers.",
      technologies: ["Python", "Streamlit", "Vector Database", "LLMs", "RAG"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/mohamed-ahshik/rag_insurance",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "https://opengraph.githubassets.com/1/mohamed-ahshik/rag_insurance",
      video: "",
    },
    {
      title: "Player Detection in Football using YOLOv8",
      href: "https://github.com/mohamed-ahshik/football_analysis_cv",
      dates: "Personal Project",
      description:
        "Fine-tuned YOLOv8 (pre-trained on COCO) to detect the ball, players, and referees in football footage. Used K-Means clustering on jersey colors from the top half of each bounding box to distinguish the two teams.",
      technologies: ["Python", "YOLOv8", "OpenCV", "K-Means"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/mohamed-ahshik/football_analysis_cv",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image:
        "https://opengraph.githubassets.com/1/mohamed-ahshik/football_analysis_cv",
      video: "",
    },
    {
      title: "Deep Learning Yoga Pose Classification",
      href: "https://github.com/mohamed-ahshik/AIProjectsCodes",
      dates: "Academic Project",
      description:
        "Built a training dataset from anatomical coordinates and trained a deep learning model (OpenPose + TensorFlow) to classify yoga poses live from a webcam stream, exploring hyperparameters to optimise performance.",
      technologies: ["Python", "OpenPose", "TensorFlow", "Computer Vision"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/mohamed-ahshik/AIProjectsCodes",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image:
        "https://opengraph.githubassets.com/1/mohamed-ahshik/AIProjectsCodes",
      video: "",
    },
    {
      title: "Object Detection",
      href: "https://github.com/mohamed-ahshik/machine_learning",
      dates: "Academic Project",
      description:
        "Explored open-source packages including YOLO and ResNet to train a model for detecting unique objects not originally in the training sets (sunny-side-up eggs alongside human figures) and implemented non-maximum suppression to keep the highest-confidence detection box.",
      technologies: ["Python", "YOLO", "ResNet", "Non-Maximum Suppression"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/mohamed-ahshik/machine_learning",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image:
        "https://opengraph.githubassets.com/1/mohamed-ahshik/machine_learning",
      video: "",
    },
    {
      title: "Optical Blood Pressure Monitoring System",
      href: "https://github.com/mohamed-ahshik/arduinoSensorsProjectsCodes",
      dates: "Academic Project",
      description:
        "Developed a non-invasive, cuffless blood pressure monitoring system using pulse oximetry and Arduino. Applied photoplethysmography techniques to detect specific signal points in real time, enabling systolic and diastolic blood pressure measurement.",
      technologies: ["Arduino", "Photoplethysmography", "Signal Processing"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/mohamed-ahshik/arduinoSensorsProjectsCodes",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image:
        "https://opengraph.githubassets.com/1/mohamed-ahshik/arduinoSensorsProjectsCodes",
      video: "",
    },
    {
      title: "Smart Home Appliances",
      href: "https://github.com/mohamed-ahshik/arduinoSensorsProjectsCodes",
      dates: "Academic Project",
      description:
        "Engineered a system to control home appliances remotely over the internet by extracting IR data from a fan and integrating it with a Spark core carrying an IR sender, allowing appliance control from connected devices.",
      technologies: ["Arduino", "Spark Core", "IR", "IoT"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/mohamed-ahshik/arduinoSensorsProjectsCodes",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image:
        "https://opengraph.githubassets.com/1/mohamed-ahshik/arduinoSensorsProjectsCodes",
      video: "",
    },
  ],
} as const;
