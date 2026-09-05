export type ScreenId =
  | '01_splash'
  | '02_auth'
  | '03_onboarding'
  | '04_dashboard'
  | '05_docs_intel'
  | '06_cv_builder'
  | '07_job_analyzer'
  | '08_subscription'
  | '09_interview_coach'
  | '10_settings'
  | '11_completion_hub';

export type Language = 'en' | 'ar';

export type DeviceMode = 'mobile' | 'tablet' | 'desktop' | 'fluid';

export interface UserProfile {
  name: string;
  nameAr: string;
  title: string;
  titleAr: string;
  email: string;
  avatarUrl: string;
  verifiedStatus: string;
  nationalId: string;
  currentTier: string;
}

export interface ScreenInfo {
  id: ScreenId;
  number: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  icon: string;
}

export interface CvTemplate {
  id: string;
  nameEn: string;
  nameAr: string;
  descEn: string;
  descAr: string;
  category: string;
  atsScore: string;
}

export interface InterviewMetric {
  confidence: number;
  wpm: number;
  methodology: number;
  strategicWeight: number;
}

export interface FlutterCodeFile {
  path: string;
  filename: string;
  layer: 'Core & Theme' | 'Domain' | 'Data' | 'Presentation (BLoC)' | 'Screens' | 'Configuration';
  description: string;
  code: string;
}
