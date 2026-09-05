export interface ExecutiveProfile {
  id: string;
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  avatarUrl: string;
  nationalIdHash: string;
  sectorEn: string;
  sectorAr: string;
  yearsExperience: number;
  salaryBenchmarkEn: string;
  salaryBenchmarkAr: string;
  baseSalaryMonthlySAR: number;
  ltiEquityBonusSAR: number;
  housingAllowanceSAR: number;
  boardReadinessScore: number;
  atsMatchScore: number;
  verifiedCredentialsCount: number;
  bioEn: string;
  bioAr: string;
  enhancedBioEn: string;
  enhancedBioAr: string;
  achievements: {
    id: string;
    entity: string;
    period: string;
    bulletEn: string;
    bulletAr: string;
    enhancedBulletEn: string;
    enhancedBulletAr: string;
    metrics: string;
    verified: boolean;
  }[];
  credentials: {
    id: string;
    titleEn: string;
    titleAr: string;
    issuerEn: string;
    issuerAr: string;
    year: string;
    confidence: number;
    hash: string;
    verified: boolean;
  }[];
}

export const EXECUTIVE_PROFILES: ExecutiveProfile[] = [
  {
    id: 'tariq',
    nameEn: 'Dr. Tariq Al-Mansoor',
    nameAr: 'د. طارق المنصور',
    titleEn: 'Chief Digital Officer & VP Enterprise Architecture',
    titleAr: 'رئيس قطاع الرقمنة والتحول التنفيذي (C-Suite / CDO)',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1UhrHeSSAXqUqLROwQrSiTAASlCWVLOOy5wl0yxluNYod2L1RWLTVqXtQloOGfLlWdHfczHL1JelHNJqh3t3fregnHlDupHDFPNIi7RHRWe1YhCA_uXHKJCGJMdh78t_KVk_NbxQD7mhHUuuedjXLeUdxr_VKVMD75JziCwbvnBF-piY7kkP3LdSWmMT7cXjmErmb64q2PAOcGeN4oO_rqt4rGYTlFoeqTIRrB0L7RMUgKybvIHv1NJ_A',
    nationalIdHash: '90D2-E41F-889B-01A7',
    sectorEn: 'Public Investment Fund (PIF) & Sovereign Cloud',
    sectorAr: 'صندوق الاستثمارات العامة والحوسبة السيادية',
    yearsExperience: 18,
    salaryBenchmarkEn: 'SAR 175,000 / month + LTI Equity Pool',
    salaryBenchmarkAr: '175,000 ر.س / شهرياً + حوافز ملكية سيادية LTI',
    baseSalaryMonthlySAR: 175000,
    ltiEquityBonusSAR: 850000,
    housingAllowanceSAR: 350000,
    boardReadinessScore: 97.4,
    atsMatchScore: 98.4,
    verifiedCredentialsCount: 14,
    bioEn:
      'Enterprise and strategic technology transformation leader across 8 major sovereign entities, establishing digital governance architectures reducing costs by 34% with accelerated growth in market value exceeding SAR 120M over 3 consecutive fiscal years.',
    bioAr:
      'قاد التحول التقني والاستراتيجي عبر ٨ جهات رئيسية، وأنشأ معماريات الحوكمة الرقمية مما خفض التكاليف بنسبة ٣٤٪ مع نمو متسارع في القيمة السوقية فاق ١٢٠ مليون ريال على مدى ٣ سنوات مالية متتالية.',
    enhancedBioEn:
      'Spearheaded and scaled sovereign digital transformation across 8 Tier-1 enterprises; anchored resilient Zero-Trust governance protocols that plummeted operational overhead by 34% while generating over SAR 120M in incremental portfolio valuation across 3 fiscal years.',
    enhancedBioAr:
      'قاد وطور التحول الرقمي الاستراتيجي عبر ٨ هيئات سيادية كبرى، ورسخ أطر الحوكمة الرقمية الصارمة مما خفض التكاليف التشغيلية بنسبة ٣٤٪ مع تحقيق نمو متسارع في القيمة السوقية تجاوز ١٢٠ مليون ريال على مدى ٣ سنوات مالية متتالية.',
    achievements: [
      {
        id: 'ach-1',
        entity: 'Saudi Data & AI Authority (SDAIA)',
        period: '2021 - Present',
        bulletEn:
          'Architected and governed sovereign cloud infrastructure strategy across 14 government entities, lifting query efficiency by 48% and reducing systemic downtime to 0.01%.',
        bulletAr:
          'صمم وحوكم استراتيجية البنية التحتية السحابية السيادية عبر ١٤ جهة حكومية، مما رفع كفاءة الاستعلامات بنسبة ٤٨٪ وخفض فترات التوقف النظامي إلى ٠.٠١٪.',
        enhancedBulletEn:
          'Spearheaded and institutionalized sovereign cloud infrastructure strategy across 14 government entities, supercharging query efficiency by 48% and eliminating downtime to a negligible 0.01%.',
        enhancedBulletAr:
          'قاد ورسخ استراتيجية البنية التحتية السحابية السيادية عبر ١٤ هيئة حكومية، مما عزز كفاءة معالجة البيانات بنسبة ٤٨٪ وألغى التوقفات التشغيلية تماماً لتصل إلى ٠.٠١٪.',
        metrics: '48% Efficiency • 0.01% Downtime',
        verified: true,
      },
      {
        id: 'ach-2',
        entity: 'Global Telecom & Technology Group (STC)',
        period: '2017 - 2021',
        bulletEn:
          'Spearheaded intelligent task automation pipelines and directed a cross-functional cohort of 45 engineers delivering major platforms 3 months ahead of roadmap.',
        bulletAr:
          'قاد خطوط أتمتة المهام الذكية وأدار فريقاً متعدد التخصصات يضم ٤٥ مهندساً لتسليم منصات رقمية كبرى قبل الموعد المحدد بـ ٣ أشهر.',
        enhancedBulletEn:
          'Directed enterprise cognitive automation architectures, mobilizing 45 engineers to deliver Tier-1 sovereign platforms 3 months ahead of schedule and SAR 18M under capital expenditure budget.',
        enhancedBulletAr:
          'أشرف على تنفيذ أتمتة العمليات المؤسسية الإدراكية، موجهاً ٤٥ مهندساً لإطلاق منصات سيادية متقدمة قبل موعدها بـ ٣ أشهر وبتوفير ١٨ مليون ريال من الميزانية الرأسمالية.',
        metrics: '45 Engineers • 3 Months Ahead',
        verified: true,
      },
      {
        id: 'ach-3',
        entity: 'Ministry of Communications & IT (MCIT)',
        period: '2014 - 2017',
        bulletEn:
          'Engineered national digital framework standards adopting ISO/IEC 27001 compliance for sovereign data enclaves.',
        bulletAr:
          'وضع المعايير الوطنية لأطر التحول الرقمي وفق مواصفات ISO/IEC 27001 لضمان سلامة البيانات السيادية.',
        enhancedBulletEn:
          'Codified national data sovereignty architectures, certifying 22 state entities against strict ISO/IEC 27001 and NCA ECC compliance mandates.',
        enhancedBulletAr:
          'صاغ وأقر المعايير الوطنية لسيادة البيانات، محققاً الامتثال التام لـ ٢٢ جهة حكومية مع ضوابط الأمن السيبراني الوطنية NCA ECC.',
        metrics: '100% NCA Compliance • 22 Entities',
        verified: true,
      },
    ],
    credentials: [
      {
        id: 'cred-1',
        titleEn: 'Master of Science in Computer Science & Systems',
        titleAr: 'ماجستير علوم الحاسب وهندسة النظم',
        issuerEn: 'Stanford University (E2EE Certified)',
        issuerAr: 'جامعة ستانفورد (معتمد وموثق رقمياً)',
        year: '2018 - 2020',
        confidence: 99.8,
        hash: 'SHA256:7b1e84a2c091...ff81',
        verified: true,
      },
      {
        id: 'cred-2',
        titleEn: 'TOGAF 9.2 Enterprise Architecture Practitioner',
        titleAr: 'ممارس معتمد في معمارية المؤسسات TOGAF 9.2',
        issuerEn: 'The Open Group (Credential ID: TOG-9821)',
        issuerAr: 'ذا أوبن جروب العالمية (رقم الاعتماد: TOG-9821)',
        year: 'Valid to 2027',
        confidence: 99.4,
        hash: 'SHA256:94e21a88b02c...31ac',
        verified: true,
      },
      {
        id: 'cred-3',
        titleEn: 'SDAIA Sovereign AI & Cloud Fellow',
        titleAr: 'زمالة الذكاء الاصطناعي والحوسبة السيادية (سدايا)',
        issuerEn: 'Saudi Data & AI Authority (SDAIA Fellowship)',
        issuerAr: 'الهيئة السعودية للبيانات والذكاء الاصطناعي',
        year: '2023 - 2024',
        confidence: 100.0,
        hash: 'SHA256:4c18f029aa87...bb01',
        verified: true,
      },
      {
        id: 'cred-4',
        titleEn: 'NCA Level-4 Cybersecurity Governance Certification',
        titleAr: 'شهادة حوكمة الأمن السيبراني المستوى الرابع (NCA)',
        issuerEn: 'National Cybersecurity Authority (NCA ECC-1)',
        issuerAr: 'الهيئة الوطنية للأمن السيبراني',
        year: 'Valid to 2028',
        confidence: 98.9,
        hash: 'SHA256:12e09a34bc77...99ea',
        verified: true,
      },
    ],
  },
  {
    id: 'sarah',
    nameEn: 'Eng. Sarah Al-Qahtani',
    nameAr: 'م. سارة القحطاني',
    titleEn: 'Chief Information Security Officer (CISO) & Cyber Sovereign Director',
    titleAr: 'رئيس أمن المعلومات (CISO) ومدير السيادة السيبرانية',
    avatarUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    nationalIdHash: '84B1-D99C-110F-77A2',
    sectorEn: 'NEOM Tech & Digital & Zero-Trust Grid',
    sectorAr: 'نيوم الرقمية وشبكات الأمن السيبراني المتقدمة',
    yearsExperience: 15,
    salaryBenchmarkEn: 'SAR 165,000 / month + Executive Housing Package',
    salaryBenchmarkAr: '165,000 ر.س / شهرياً + باقة الإقامة التنفيذية في نيوم',
    baseSalaryMonthlySAR: 165000,
    ltiEquityBonusSAR: 750000,
    housingAllowanceSAR: 320000,
    boardReadinessScore: 98.6,
    atsMatchScore: 99.1,
    verifiedCredentialsCount: 16,
    bioEn:
      'Seasoned Chief Information Security Officer specializing in Sovereign Zero-Trust Architectures, Critical Infrastructure Protection (CIP), and Cognitive Defense systems across Vision 2030 megaprojects.',
    bioAr:
      'قائدة تنفيذية في أمن المعلومات متخصصة في معماريات انعدام الثقة (Zero-Trust) وحماية البنى التحتية الحرجة ومنظومات الدفاع الإدراكي عبر كبرى مشاريع الرؤية.',
    enhancedBioEn:
      'Formulated and executed the sovereign cyber resilience perimeter for Tier-0 cognitive energy and data grids; shielded over 40 petabytes of classified infrastructure with 0 zero-day incidents over a 48-month tenure.',
    enhancedBioAr:
      'صاغت ونفذت نطاق الحصانة السيبرانية السيادي لشبكات الطاقة والبيانات الإدراكية من الفئة صفر؛ وحمت ما يزيد عن ٤٠ بيتابايت من البنى التحتية الحساسة بصفر اختراقات أمنية خلال ٤ سنوات.',
    achievements: [
      {
        id: 'ach-s1',
        entity: 'NEOM Tech & Digital (OXAGON / THE LINE)',
        period: '2022 - Present',
        bulletEn:
          'Led end-to-end deployment of post-quantum cryptographic lattice across smart utility networks serving over 20,000 active nodes.',
        bulletAr:
          'قادت النشر الشامل لشبكة التشفير الكمومي المقاوم عبر شبكات المرافق الذكية التي تخدم أكثر من ٢٠,٠٠٠ عقدة نشطة.',
        enhancedBulletEn:
          'Spearheaded the world’s first municipal-scale Kyber-768 post-quantum cryptographic grid, safeguarding 20,000+ cognitive nodes against quantum decryption vectors.',
        enhancedBulletAr:
          'قادت إطلاق أول شبكة تشفير كمومي بلوري Kyber-768 على مستوى المدن، محصنة أكثر من ٢٠ ألف عقدة إدراكية ضد أخطار فك التشفير الكمومي.',
        metrics: '20K Nodes • Post-Quantum Kyber-768',
        verified: true,
      },
      {
        id: 'ach-s2',
        entity: 'Saudi Aramco Cyber Defense Center',
        period: '2016 - 2022',
        bulletEn:
          'Directed industrial OT/ICS security monitoring and response operations mitigating over 1,200 critical cyber threat attempts per year.',
        bulletAr:
          'أدارت عمليات المراقبة والاستجابة الأمنية للأنظمة الصناعية OT/ICS متصدية لأكثر من ١,٢٠٠ محاولة تهديد سيبراني حرج سنوياً.',
        enhancedBulletEn:
          'Commanded enterprise industrial OT/ICS security command centers, neutralizing 1,200+ targeted APT campaigns with zero disruption to sovereign energy throughput.',
        enhancedBulletAr:
          'أدارت مراكز قيادة الأمن الصناعي OT/ICS، محيدة ما يربو على ١,٢٠٠ هجمة إلكترونية متقدمة APT دون أي انقطاع في تدفق الطاقة السيادية.',
        metrics: '1,200+ APTs Defeated • 99.999% Uptime',
        verified: true,
      },
    ],
    credentials: [
      {
        id: 'cred-s1',
        titleEn: 'MIT Professional Certificate in Cyber Security Strategy',
        titleAr: 'الشهادة الاحترافية في استراتيجيات الأمن السيبراني (MIT)',
        issuerEn: 'Massachusetts Institute of Technology (MIT)',
        issuerAr: 'معهد ماساتشوستس للتكنولوجيا (MIT)',
        year: '2021',
        confidence: 99.9,
        hash: 'SHA256:3a19e88ff011...cc44',
        verified: true,
      },
      {
        id: 'cred-s2',
        titleEn: 'Certified Information Systems Security Professional (CISSP)',
        titleAr: 'محترف معتمد في أمن نظم المعلومات (CISSP)',
        issuerEn: 'ISC2 Global Security Council',
        issuerAr: 'المجلس الدولي لأمن المعلومات ISC2',
        year: 'Valid to 2026',
        confidence: 100.0,
        hash: 'SHA256:88bc2100aa77...11f0',
        verified: true,
      },
    ],
  },
  {
    id: 'faisal',
    nameEn: 'Dr. Faisal Al-Shammari',
    nameAr: 'د. فيصل الشمري',
    titleEn: 'VP of Cognitive AI & P&L Operations',
    titleAr: 'نائب الرئيس للذكاء الاصطناعي الإدراكي وعمليات الأرباح والخسائر P&L',
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    nationalIdHash: '77E1-22A0-998C-44F1',
    sectorEn: 'Red Sea Global (RSG) & Cognitive Hospitality',
    sectorAr: 'شركة البحر الأحمر الدولية والضيافة الإدراكية الفاخرة',
    yearsExperience: 20,
    salaryBenchmarkEn: 'SAR 190,000 / month + Board Advisory Fees',
    salaryBenchmarkAr: '190,000 ر.س / شهرياً + مكافآت اللجان الاستشارية لمجالس الإدارة',
    baseSalaryMonthlySAR: 190000,
    ltiEquityBonusSAR: 950000,
    housingAllowanceSAR: 380000,
    boardReadinessScore: 99.2,
    atsMatchScore: 97.8,
    verifiedCredentialsCount: 18,
    bioEn:
      'P&L-oriented Senior Executive with 20 years driving cognitive AI platforms, smart mobility networks, and ESG-compliant automation across luxury regenerative tourism portfolios.',
    bioAr:
      'قيادي تنفيذي أول بمسؤولية إدارة الأرباح والخسائر P&L يمتلك ٢٠ عاماً في قيادة منصات الذكاء الاصطناعي والتنقل الذكي والأتمتة المستدامة المتوافقة مع معايير ESG.',
    enhancedBioEn:
      'Orchestrated multi-billion SAR cognitive automation agendas across 12 luxury islands; reduced energy consumption by 42% via autonomous AI load-balancing, generating SAR 210M EBITDA uplift.',
    enhancedBioAr:
      'أدار برامج الأتمتة الإدراكية بمليارات الريالات عبر ١٢ جزيرة فاخرة؛ وخفض استهلاك الطاقة بنسبة ٤٢٪ عبر الموازنة الذاتية بالذكاء الاصطناعي محققاً نمواً في الأرباح قبل الضرائب EBITDA بـ ٢١٠ ملايين ريال.',
    achievements: [
      {
        id: 'ach-f1',
        entity: 'Red Sea Global (RSG)',
        period: '2021 - Present',
        bulletEn:
          'Engineered the world’s largest regenerative smart destination IoT sensor mesh with 100% renewable microgrid telemetry.',
        bulletAr:
          'صمم أكبر شبكة مستشعرات إنترنت أشياء للأماكن المتجددة الذكية في العالم مع ربط مباشر بشبكات الطاقة المتجددة بنسبة ١٠٠٪.',
        enhancedBulletEn:
          'Architected the apex regenerative destination sensory grid with 1.4 million active IoT endpoints, slashing municipal operational footprint by 38%.',
        enhancedBulletAr:
          'صمم الشبكة الحسية الأكبر للوجهات المتجددة بـ ١.٤ مليون نقطة اتصال إنترنت أشياء، مخفضاً البصمة التشغيلية بنسبة ٣٨٪.',
        metrics: '1.4M Endpoints • 38% OPEX Cut',
        verified: true,
      },
    ],
    credentials: [
      {
        id: 'cred-f1',
        titleEn: 'PhD in Cognitive Artificial Intelligence',
        titleAr: 'دكتوراه في الذكاء الاصطناعي الإدراكي',
        issuerEn: 'University of Cambridge',
        issuerAr: 'جامعة كامبريدج البريطانية',
        year: '2015',
        confidence: 100.0,
        hash: 'SHA256:55aa1982b100...44ed',
        verified: true,
      },
    ],
  },
];

export interface MegaprojectRequisition {
  id: string;
  projectNameAr: string;
  projectNameEn: string;
  roleTitleAr: string;
  roleTitleEn: string;
  sponsorEntity: string;
  salaryRangeSAR: string;
  locationAr: string;
  locationEn: string;
  matchScore: number;
  openingsCount: number;
  urgency: 'Immediate (Apex Priority)' | 'Q2 Fast Track' | 'Board Mandate';
  keyRequirementsAr: string[];
  keyRequirementsEn: string[];
  missingKeywords: string[];
  boardCommitteeAr: string;
  boardCommitteeEn: string;
}

export const SOVEREIGN_REQUISITIONS: MegaprojectRequisition[] = [
  {
    id: 'req-pif-cdo',
    projectNameAr: 'محفظة صندوق الاستثمارات العامة (PIF)',
    projectNameEn: 'Public Investment Fund (PIF Portfolio)',
    roleTitleAr: 'المدير التنفيذي لقطاع الرقمنة والذكاء السيادي (CDO)',
    roleTitleEn: 'Executive Director, Sovereign AI & Digital Architecture',
    sponsorEntity: 'PIF Technology & Media Directorate',
    salaryRangeSAR: '150,000 - 190,000 ر.س شهرياً + حوافز LTI',
    locationAr: 'الرياض، المملكة العربية السعودية',
    locationEn: 'Riyadh, Kingdom of Saudi Arabia',
    matchScore: 97.4,
    openingsCount: 3,
    urgency: 'Immediate (Apex Priority)',
    keyRequirementsAr: [
      'خبرة لا تقل عن ١٥ عاماً في قيادة التحول التقني للمؤسسات الكبرى',
      'إتقان استراتيجيات حوكمة البيانات والامتثال لضوابط سدايا وهيئة الأمن السيبراني',
      'سجل مثبت في إدارة ميزانيات تفوق ٥٠٠ مليون ريال',
      'حضور قوي وإقناع أمام لجان مجالس الإدارة والترشيحات',
    ],
    keyRequirementsEn: [
      '15+ years enterprise strategic technology transformation leadership',
      'Mastery of sovereign data governance, SDAIA & NCA ECC mandates',
      'Proven capital expenditure management exceeding SAR 500M',
      'Executive gravitas before Board Nomination & Remuneration Committees',
    ],
    missingKeywords: [
      'Post-Quantum Kyber Lattice',
      'Autonomous Agent Swarms',
      'FinOps Enterprise Allocation',
    ],
    boardCommitteeAr: 'لجنة الاستثمار والتقنية الرقمية بمجلس الإدارة',
    boardCommitteeEn: 'Board Investment & Digital Technology Committee',
  },
  {
    id: 'req-neom-ciso',
    projectNameAr: 'نيوم (NEOM Cognitive Cities - The Line)',
    projectNameEn: 'NEOM Digital & Cognitive Infrastructure',
    roleTitleAr: 'نائب الرئيس للأمن السيبراني والبنى التحتية الإدراكية',
    roleTitleEn: 'VP, Cognitive Cyber Defense & Resilient Infrastructure',
    sponsorEntity: 'NEOM Technology & Digital Holding Co.',
    salaryRangeSAR: '160,000 - 210,000 ر.س شهرياً + إقامة VIP',
    locationAr: 'نيوم، تبوك، المملكة العربية السعودية',
    locationEn: 'NEOM, Tabuk, Kingdom of Saudi Arabia',
    matchScore: 95.8,
    openingsCount: 2,
    urgency: 'Board Mandate',
    keyRequirementsAr: [
      'ريادة في معماريات انعدام الثقة للمدن الذكية المستقلة',
      'خبرة في إدارة أنظمة التحكم الصناعي OT وشبكات الجيل القادم 5G/6G',
      'إدارة أزمات سيبرانية على المستوى السيادي وصفر تسريبات',
    ],
    keyRequirementsEn: [
      'Pioneering Zero-Trust cognitive architecture for autonomous cities',
      'Mastery of industrial OT systems and sovereign 5G/6G edge nodes',
      'Sovereign crisis response and absolute zero-data leakage track record',
    ],
    missingKeywords: ['Zero-Knowledge Proofs', 'Smart Utility OT Mesh', 'ISO 27032 Lead'],
    boardCommitteeAr: 'لجنة الحوكمة والمخاطر السيادية بنيوم',
    boardCommitteeEn: 'NEOM Sovereign Risk & Governance Board',
  },
  {
    id: 'req-aramco-ai',
    projectNameAr: 'أرامكو الرقمية (Aramco Digital Innovations)',
    projectNameEn: 'Aramco Digital Industrial Cloud',
    roleTitleAr: 'كبير مهندسي الحوسبة السحابية وحلول الطاقة السيادية',
    roleTitleEn: 'Chief Architect, Sovereign Energy Cloud & Industrial AI',
    sponsorEntity: 'Aramco Digital Company',
    salaryRangeSAR: '170,000 - 220,000 ر.س شهرياً + صندوق تقاعدي قيادي',
    locationAr: 'الظهران / الرياض، المملكة العربية السعودية',
    locationEn: 'Dhahran / Riyadh, Kingdom of Saudi Arabia',
    matchScore: 98.2,
    openingsCount: 4,
    urgency: 'Q2 Fast Track',
    keyRequirementsAr: [
      'تصميم مراكز بيانات سحابية متقدمة ذات موثوقية 99.999%',
      'تطبيق نماذج الذكاء الاصطناعي التنبؤي لقطاعات النفط والغاز والطاقة المتجددة',
      'شراكات استراتيجية عالمية ونقل المعرفة للكوادر الوطنية',
    ],
    keyRequirementsEn: [
      'Design of mission-critical sovereign clouds with 99.999% tier-4 uptime',
      'Predictive industrial AI modeling for renewables and energy grids',
      'Global hyperscaler partnerships & high-impact Saudi talent localization',
    ],
    missingKeywords: ['OPC-UA Telemetry', 'Multi-tenant Enclave Separation', 'Carbon Zero AI'],
    boardCommitteeAr: 'مجلس إدارة أرامكو الرقمية ولجنة التحول التقني',
    boardCommitteeEn: 'Aramco Digital Board Technology Transformation Council',
  },
];
