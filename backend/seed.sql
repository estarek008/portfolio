-- =============================================
-- CERTIFICATES
-- =============================================
INSERT INTO certificates (title, provider, category, completion_date, skills, verify_link) VALUES
-- SAS Platform
('SAS Programming 1: Essentials', 'SAS Institute', 'SAS Platform', '2023-01-02', 'SAS Programming, Data Manipulation', NULL),
('SAS Programming 2: Data Manipulation Techniques', 'SAS Institute', 'SAS Platform', NULL, 'SAS Programming, Advanced Data Manipulation', NULL),
('SAS Visual Analytics 1 for SAS Viya: Basics (8.5)', 'SAS Institute', 'SAS Platform', '2023-02-09', 'SAS Viya, Data Visualization, Reporting', NULL),
('SAS Visual Analytics 2 for SAS Viya: Advanced (8.5)', 'SAS Institute', 'SAS Platform', NULL, 'SAS Viya, Advanced Analytics, Dashboarding', NULL),
('SAS Enterprise Guide 1: Querying and Reporting (8.2)', 'SAS Institute', 'SAS Platform', NULL, 'SAS Enterprise Guide, SQL, Reporting', NULL),
('SAS Event Stream Processing: Essentials (6.2)', 'SAS Institute', 'SAS Platform', NULL, 'SAS ESP, Real-Time Streaming, Event Processing', NULL),
('Essential Functions of SAS Intelligent Decisioning, Release 5.5', 'SAS Institute', 'SAS Platform', '2023-05-03', 'Decisioning, Business Rules, AI Decisioning', NULL),
('Managing and Using the SAS Customer Intelligence Common Data Model', 'SAS Institute', 'SAS Platform', '2023-04-11', 'Customer Intelligence, Data Modeling', NULL),
('SAS Real-Time Decision Manager: Creating Resources for Inbound Campaigns', 'SAS Institute', 'SAS Platform', '2023-03-30', 'Real-Time Decisioning, Campaign Management', NULL),
('Creating Information Maps Using SAS', 'SAS Institute', 'SAS Platform', '2023-04-05', 'SAS Information Maps, Data Navigation', NULL),
('Introduction to Data Curation for SAS Data Scientists', 'SAS Institute', 'SAS Platform', NULL, 'Data Curation, Data Quality, SAS', NULL),

-- Dataiku
('Core Designer Certificate', 'Dataiku', 'AI / ML / Data Science', '2025-03-09', 'Dataiku DSS, Machine Learning, Pipeline Design', 'https://verify.skilljar.com/c/jdgkdziedpgm'),
('Generative AI Practitioner Certificate', 'Dataiku', 'Generative AI & LLMs', '2025-03-17', 'Generative AI, LLMs, RAG, Prompt Engineering', 'https://verify.skilljar.com/c/gmhecenyppuj'),

-- Oracle
('Oracle Cloud Infrastructure 2025 Certified Generative AI Professional', 'Oracle', 'Generative AI & LLMs', '2025-01-01', 'OCI, Generative AI, LLMs, Oracle Cloud', 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=565B980F1FA8E674C5622709B37418DAA62FDDB52F84DA6CCFD7FDB6633ABA54'),

-- Databricks
('Generative AI Fundamentals', 'Databricks', 'Generative AI & LLMs', NULL, 'Databricks, Generative AI, LLM Fundamentals, MLflow', 'https://credentials.databricks.com/89d617ff-7663-4e07-8810-cda46dd0c5e5#acc.MkrUq1th'),

-- Credly / Other (placeholders — to be updated via admin)
('Badge 1 (Update via Admin)', 'Provider — Update via Admin', 'Other', NULL, NULL, 'https://www.credly.com/badges/c2dbd49c-ea26-494a-bf47-d30bc751e334/linked_in_profile'),
('Badge 2 (Update via Admin)', 'Provider — Update via Admin', 'Other', NULL, NULL, 'https://www.credly.com/badges/fa407720-5c3a-4b95-89d9-fb3b12d93f80/linked_in_profile'),
('Badge 3 (Update via Admin)', 'Provider — Update via Admin', 'Other', NULL, NULL, 'https://www.credly.com/badges/357560b3-dab7-4d7e-9458-c09773a5ebfe/linked_in_profile'),
('Badge 4 (Update via Admin)', 'Provider — Update via Admin', 'Other', NULL, NULL, 'https://www.credly.com/badges/0b5937fb-308c-4278-aa78-98cdf4c992f5/linked_in_profile'),
('Coursera Certificate 1 (Update via Admin)', 'Coursera — Update via Admin', 'AI / ML / Data Science', NULL, NULL, 'https://www.coursera.org/account/accomplishments/verify/QM4CYFEN6DX6'),
('Coursera Certificate 2 (Update via Admin)', 'Coursera — Update via Admin', 'AI / ML / Data Science', NULL, NULL, 'https://www.coursera.org/account/accomplishments/verify/2SP5DQ5739CF');

-- =============================================
-- PROJECTS
-- =============================================
INSERT INTO projects (title, description, tools, status, category, featured) VALUES
('AI Chatbot with LLM Orchestration', 'A domain-aware GenAI chatbot for loan analysis and e-invoice support, built with dynamic UI, model switching, and context-driven orchestration. Integrates multiple LLM providers with intelligent routing.', 'Gradio, GPT-4, Python, LLM Orchestration, Domain Adaptation', 'Completed', 'Generative AI', 1),
('GenAI-Powered Engineering Plan Review', 'An AI compliance reviewer that combines LLMs and OCR to automatically interpret engineering plans and map them to regulatory standards — reducing manual review time significantly.', 'LLMs, OCR Pipelines, Python, Regulatory Mapping, Document Intelligence', 'Completed', 'Generative AI', 1),
('Shareholder Mapping & Identity Reconciliation Tool', 'An AI-powered platform integrating ChatGPT, Perplexity, and custom LLMs for shareholder tracing and identity reconciliation, reducing manual tracing effort by over 70%.', 'ChatGPT, Perplexity API, Vector Search, Metadata Extraction, Python', 'Completed', 'Generative AI', 1),
('Shams — Autonomous Robotic Nurse', 'An autonomous robotic nurse system for healthcare assistance, incorporating vision-based GenAI for behavior recognition, facial recognition, navigation, and contextual dialogue using multimodal AI.', 'Computer Vision, GenAI, Robotics, Facial Recognition, Dialogue Models, ROS', 'Completed', 'Robotics', 1);

-- =============================================
-- PUBLICATIONS
-- =============================================
INSERT INTO publications (title, journal, year, citations, authors, tags, link) VALUES
('Neural Network-Based Method for Early Diagnosis of Autism Spectral Disorder Head-Banging Behavior from Recorded Videos', 'International Journal of Pattern Recognition and Artificial Intelligence', 2023, 12, 'ET Sadek, NA Seada, S Ghoniemy', 'Machine Learning,Deep Learning,Computer Vision,Autism Detection', NULL),
('Computer Vision Techniques for Autism Symptoms Detection and Recognition: A Survey', 'International Journal of Intelligent Computing and Information Sciences', 2020, 12, 'ET Sadek, NA AbdElSabour Seada, S Ghoniemy', 'Computer Vision,Deep Learning,Autism Detection,Survey', NULL),
('Computer Vision-Based Approach for Detecting Arm-Flapping as Autism Suspect Behavior', 'International Journal of Medical Engineering and Informatics, Vol. 15, pp. 166-176', 2023, 3, 'Esraa Tarek Ahmed Hassan Sadek, Noha Aly AbdElSabour Seada, S Ghoniemy', 'Computer Vision,Robotics,Autism Detection,Behavior Recognition', NULL),
('A Review on Computer Vision-Based Techniques for Autism Symptoms Detection and Recognition', '2020 15th International Conference on Computer Engineering and Systems (ICCES)', 2020, 3, 'ET Sadek, NA Seada, S Ghoniemy', 'Computer Vision,Machine Learning,Autism Detection,Review', NULL),
('SHAMS — Smart Hospital Assisting Multitasking System', '2021 Tenth International Conference on Intelligent Computing and Information Systems (ICICIS)', 2021, 2, 'ET Sadek, M Mohammed, ME Mohammad, NL Badr, MA Mohamed et al.', 'Robotics,Machine Learning,Deep Learning,Healthcare AI', NULL);
