export type ExperienceItem = {
  id: string
  title: string
  company: string
  duration: string
  location?: string
  image: string
  description: string[]
  keyWork: string[]
  skills: string[]
}

export const experienceData: ExperienceItem[] = [
  {
    id: "adecco-google-robotics",
    title: "Data Analyst",
    company: "Google via Adecco USA",
    duration: "Jul 2026 – Present",
    location: "Ann Arbor, Michigan",
    image: "/experience/adecco-google-robotics.png",
    description: [
      "Develop and support data ingestion and ETL pipelines for recorded robotics episodes, including multi-camera video and associated data.",
      "Process, transform, and validate robotics datasets to support robot evaluation, training, and downstream analytics.",
    ],
    keyWork: [
      "Build and maintain data workflows for ingesting recorded robotics episodes into structured data pipelines.",
      "Perform data processing, transformation, and quality validation to improve dataset reliability.",
      "Support the preparation of organized, analytics-ready datasets for robotics evaluation and machine learning teams.",
    ],
    skills: [
      "Python",
      "SQL",
      "Google Cloud",
      "BigQuery",
      "Apache Airflow",
      "ETL/ELT",
      "Data Quality",
    ],
  },
  {
    id: "computing-aura",
    title: "Data Analyst",
    company: "Computing Aura",
    duration: "Aug 2025 – Jun 2026",
    location: "Snohomish, WA - Remote",
    image: "/experience/computing-aura.png",
    description: [
      "Automated SQL and Python reporting workflows to streamline recurring business reports and improve data delivery efficiency",
      "Designed executive KPI dashboards in Power BI and Tableau to track business performance and operational metrics",
    ],
    keyWork: [
      "Performed advanced SQL analysis on operational datasets to uncover trends and generate actionable business insights",
      "Optimized key performance indicators (KPIs) through data exploration, validation, and metric standardization",
    ],
    skills: ["SQL", "Python", "Tableau", "Power BI", "Advanced Excel"],
  },
  {
    id: "drexel-university",
    title: "Teaching Assistant",
    company: "Drexel University",
    duration: "Jan 2024 – Dec 2024",
    location: "Philadelphia, PA",
    image: "/experience/drexel-university.png",
    description: [
      "Conducted undergraduate physics lab sessions and demonstrated experimental procedures for core physics concepts",
      "Supported faculty in managing laboratory sessions and maintaining academic standards for coursework",
    ],
    keyWork: [
      "Guided students through physics experiments, data collection, and interpretation of experimental results",
      "Provided constructive feedback to help students strengthen their understanding of fundamental physics concepts",
    ],
    skills: [],
  },
  {
    id: "techextensor",
    title: "Data Analytics Engineer",
    company: "TechExtensor Pvt. Ltd.",
    duration: "Aug 2019 – Jul 2023",
    location: "Ahmedabad, India",
    image: "/experience/techextensor.png",
    description: [
      "Built scalable ELT pipelines on cloud data platforms to integrate multi-source business data into analytics-ready datasets",
      "Optimized complex SQL transformations on large cloud datasets to improve query performance and support high-volume analytics",
    ],
    keyWork: [
      "Developed cloud-based data ingestion pipelines to integrate data from APIs, databases, and operational systems into centralized analytical storage",
      "Developed KPI dashboards and analytical reports in Tableau and Power BI using structured data models from the cloud data warehouse",
    ],
    skills: ["SQL", "Python", "Cloud", "Data Warehousing", "Tableau", "Power BI"],
  },
]
