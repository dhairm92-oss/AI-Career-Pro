import { ScreenInfo, CvTemplate, FlutterCodeFile } from '../types';

export const ASSETS = {
  BG_IMAGE: 'https://lh3.googleusercontent.com/aida/AEtjO1VKXZ6JwNWAWn-TUDHVIIMQeviCQmLsHv1o6HzfdIPZmH4riofGdqQDXTAMGMQ3OoxY8bOPKSrsjBJ1Md5dxYNSEaSmaLZh2viAJe5c1l39jlYkErlAQpeJLyD7JMNtqZMZhv2YSkWnBaDBM-4iXSbNImP-Fu9fo__B7DIQxj5afil9BVxRI5a2-SWIIrUP_95BInHOchemOIfe7Efccj4iCmYjADnW2wPuyQ4gUReJIDMDtESSTqR07w',
  BACKGROUND_IMAGE: 'https://lh3.googleusercontent.com/aida/AEtjO1VKXZ6JwNWAWn-TUDHVIIMQeviCQmLsHv1o6HzfdIPZmH4riofGdqQDXTAMGMQ3OoxY8bOPKSrsjBJ1Md5dxYNSEaSmaLZh2viAJe5c1l39jlYkErlAQpeJLyD7JMNtqZMZhv2YSkWnBaDBM-4iXSbNImP-Fu9fo__B7DIQxj5afil9BVxRI5a2-SWIIrUP_95BInHOchemOIfe7Efccj4iCmYjADnW2wPuyQ4gUReJIDMDtESSTqR07w',
  EMBLEM_IMAGE: 'https://lh3.googleusercontent.com/aida/AEtjO1Wmv-NJGPhuJzJVsICwUP9OWQ9VzveoqmUQz4i3fGsc7mYXkCPr4kMM-MQ47Uy7cfAybu2LxlxXomp4-4xNGJ-Pk85PcaiUp9jVMKkjRPXh0IJWsU5AluEKKspYXf5XPYVwPrcsZ6MZzOU_WraCbyuXwt6Kw4yN8TEjlu_mkIJh6wMmZCbQYB_qo7D82fnB5KRtozR_F3O2DLWGSX3TFRbDsKkfa0AYqqfknsShlqgERdbLndHycsLsFdM',
  PROFILE_IMAGE: 'https://lh3.googleusercontent.com/aida/AEtjO1UhrHeSSAXqUqLROwQrSiTAASlCWVLOOy5wl0yxluNYod2L1RWLTVqXtQloOGfLlWdHfczHL1JelHNJqh3t3fregnHlDupHDFPNIi7RHRWe1YhCA_uXHKJCGJMdh78t_KVk_NbxQD7mhHUuuedjXLeUdxr_VKVMD75JziCwbvnBF-piY7kkP3LdSWmMT7cXjmErmb64q2PAOcGeN4oO_rqt4rGYTlFoeqTIRrB0L7RMUgKybvIHv1NJ_A',
  TELEMETRY_IMAGE: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNh9KjtcQi8_rmrJWdik2mhfRDq2bfXEtZ2nvlAy7unpyXlPn0iTnojwwjpsgZsDMmkSa5dbAW5CDX0xuENqZo98i2D2aC1yIvhMcVEwLOleiQgV8Rl-dWg2xWgA8tdE42b4HWv0X6dFjaKyxdkssFcg7Zl6BY-Ago-S4lyHjh8of-MiHfQ_IORyVeUw-84ppOBQ5Adu5LQg-oQvDmuaZ6e1B97RvDmfrpJdc5y5pwisyRsu-SD-6U',
};

export const SCREENS_LIST: ScreenInfo[] = [
  {
    id: '01_splash',
    number: '01',
    titleEn: '3D Visual Identity & Interactive Splash',
    titleAr: 'الهوية البصرية ثلاثية الأبعاد وشاشة الإطلاق',
    subtitleEn: 'Glass reflections, cybernetic initialization & E2EE handshake',
    subtitleAr: 'انعكاسات زجاجية، وتهيئة سيادية مشفرة AES-256',
    icon: 'sparkles',
  },
  {
    id: '02_auth',
    number: '02',
    titleEn: 'Standalone Executive Authentication Gateway',
    titleAr: 'بوابة التحقق القيادية السيادية المستقلة',
    subtitleEn: 'Nafath SSO, biometric telemetry & sandboxed enclave',
    subtitleAr: 'نفاذ الرقمي، القياس الحيوي، والعزل المشفر',
    icon: 'shield_locked',
  },
  {
    id: '03_onboarding',
    number: '03',
    titleEn: 'Executive Onboarding Wizard',
    titleAr: 'معالج الإعداد والتهيئة القيادية',
    subtitleEn: '4 Steps: Trajectory, scope & zero fake data verification',
    subtitleAr: '٤ مراحل: المسار، التعويض، وتوثيق عدم التزييف',
    icon: 'tune',
  },
  {
    id: '04_dashboard',
    number: '04',
    titleEn: 'Executive Mobile Dashboard & Shell',
    titleAr: 'لوحة القيادة التنفيذية ومحطة القياس المباشر',
    subtitleEn: 'Real-time leadership KPI station & strategic action hub',
    subtitleAr: 'محطة مؤشرات الأداء الحية واختصارات المنظومة',
    icon: 'grid_view',
  },
  {
    id: '05_docs_intel',
    number: '05',
    titleEn: 'Document Intelligence & OCR Audit',
    titleAr: 'ذكاء المستندات والتدقيق البصري الصارم',
    subtitleEn: 'Structured CV analysis, OCR pipelines & credential registry',
    subtitleAr: 'تحليل السيرة، التشفير الصارم، وسجل الشهادات المعتمد',
    icon: 'auto_awesome_motion',
  },
  {
    id: '06_cv_builder',
    number: '06',
    titleEn: 'Smart CV Builder & ATS Certified Templates',
    titleAr: 'استوديو بناء السيرة الذاتية وقوالب ATS القيادية',
    subtitleEn: 'Algorithmic screening optimization & power verb rewrites',
    subtitleAr: 'تحسين الفرز الخوارزمي وصياغة أفعال القوة القيادية',
    icon: 'post_add',
  },
  {
    id: '07_job_analyzer',
    number: '07',
    titleEn: 'Job Match Analyzer & Gap Diagnostic',
    titleAr: 'محلل مطابقة الوظائف وتشخيص الفجوات المهارية',
    subtitleEn: 'Competency gap detection & 1-click tailored alignment',
    subtitleAr: 'اكتشاف الفجوات المهنية وتوليد النسخة المخصصة بنقرة واحدة',
    icon: 'troubleshoot',
  },
  {
    id: '08_subscription',
    number: '08',
    titleEn: 'Subscription Gate & Flexible Executive Passes',
    titleAr: 'بوابة الاشتراكات وتصاريح النفاذ المرنة',
    subtitleEn: 'Sprint passes (24h/7d) & sovereign Stripe PCI-DSS rail',
    subtitleAr: 'تصاريح سريعة وخطة C-Suite عبر بوابات مشفرة معتمدة',
    icon: 'workspace_premium',
  },
  {
    id: '09_interview_coach',
    number: '09',
    titleEn: 'AI Interview Coach & Audio Prep Hub',
    titleAr: 'مدرب المقابلات الذكي ومختبر الصوت القيادي',
    subtitleEn: 'STAR framework, live waveform telemetry & boardroom style',
    subtitleAr: 'منهجية STAR، تخطيط صوتي مباشر، ومحاكاة طاولة مجلس الإدارة',
    icon: 'mic',
  },
  {
    id: '10_settings',
    number: '10',
    titleEn: 'Sovereign Security & Data Privacy Settings',
    titleAr: 'إعدادات الأمان السيادي والخصوصية المشفرة',
    subtitleEn: 'Cryptographic isolation, purge keys & enterprise sync',
    subtitleAr: 'العزل التام عن تدريب النماذج، والامتثال لضوابط الهيئة الوطنية',
    icon: 'admin_panel_settings',
  },
  {
    id: '11_completion_hub',
    number: '11',
    titleEn: 'Executive Completion & Certification Hub',
    titleAr: 'مركز الإنجاز والاعتماد الشامل وتصدير فلاتر',
    subtitleEn: 'Product readiness, commercial cert & Flutter clean arch',
    subtitleAr: 'جاهزية متجر التطبيقات وشهادة الاعتماد وتصدير فلاتر النظيف',
    icon: 'rocket_launch',
  },
];

export const CV_TEMPLATES: CvTemplate[] = [
  {
    id: 'classic',
    nameEn: 'Executive Classic',
    nameAr: 'الكلاسيكي التنفيذي',
    descEn: 'Executive Classic • 100% Readability',
    descAr: 'تصميم تنفيذي رصين • مقروئية ١٠٠٪',
    category: 'C-Suite',
    atsScore: '99.8%',
  },
  {
    id: 'tech',
    nameEn: 'Standard Tech ATS',
    nameAr: 'التقني المعياري ATS',
    descEn: 'Standard Tech ATS • Engineering Grid',
    descAr: 'شبكة هندسية دقيقة • اجتياز Taleo',
    category: 'Technology',
    atsScore: '99.4%',
  },
  {
    id: 'strategic',
    nameEn: 'Strategic Corporate',
    nameAr: 'المؤسسي الاستراتيجي',
    descEn: 'Strategic Corporate • Board Level',
    descAr: 'مستوى مجالس الإدارة واللجان',
    category: 'Board Level',
    atsScore: '98.9%',
  },
  {
    id: 'academic',
    nameEn: 'Minimal Academic',
    nameAr: 'الأكاديمي البسيط',
    descEn: 'Minimal Academic • Research & Publ.',
    descAr: 'الأبحاث والمنشورات والزمالات',
    category: 'Research',
    atsScore: '98.2%',
  },
];

export const FLUTTER_CODE_FILES: FlutterCodeFile[] = [
  {
    path: 'pubspec.yaml',
    filename: 'pubspec.yaml',
    layer: 'Configuration',
    description: 'Flutter project specification with Flutter BLoC, Dio, Glassmorphism, Google Fonts, and animations.',
    code: `name: ai_career_pro
description: "AI-powered executive career advancement platform built with Flutter Clean Architecture."
publish_to: "none"
version: 1.0.0+1

environment:
  sdk: ">=3.2.0 <4.0.0"
  flutter: ">=3.16.0"

dependencies:
  flutter:
    sdk: flutter
  flutter_localizations:
    sdk: flutter

  # State Management & Architecture
  flutter_bloc: ^8.1.3
  equatable: ^2.0.5
  get_it: ^7.6.4
  dartz: ^0.10.1

  # Networking & Cryptography
  dio: ^5.4.0
  crypto: ^3.0.3

  # UI, Icons, Glassmorphism & Animations
  google_fonts: ^6.1.0
  glassmorphism: ^3.0.0
  flutter_animate: ^4.5.0
  lucide_icons: ^0.257.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
`,
  },
  {
    path: 'lib/core/theme/app_theme.dart',
    filename: 'app_theme.dart',
    layer: 'Core & Theme',
    description: 'Executive 3D Glassmorphism theme definition with Obsidian Abyss background, Electric Cyan, and Gold accents.',
    code: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  static const Color background = Color(0xFF0B0F19);
  static const Color surface = Color(0xFF0F131D);
  static const Color surfaceContainerLow = Color(0xFF171B26);
  static const Color surfaceContainer = Color(0xFF1C1F2A);
  static const Color surfaceContainerHigh = Color(0xFF262A35);
  static const Color surfaceContainerLowest = Color(0xFF0A0E18);

  // Executive Neons
  static const Color primaryCyan = Color(0xFF00F0FF);
  static const Color primaryDim = Color(0xFF00DBE9);
  static const Color primaryLight = Color(0xFFDBFCFF);
  static const Color secondaryBlue = Color(0xFF0566D9);
  static const Color secondaryLight = Color(0xFFADC6FF);
  static const Color tertiaryGold = Color(0xFFFDD55A);
  static const Color tertiaryFixed = Color(0xFFFFE088);
  
  // Text Colors
  static const Color onSurface = Color(0xFFDFE2F1);
  static const Color onSurfaceVariant = Color(0xFFB9CACB);
  static const Color outline = Color(0xFF849495);
}

class AppTheme {
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.background,
      primaryColor: AppColors.primaryCyan,
      textTheme: GoogleFonts.plusJakartaSansTextTheme(
        ThemeData.dark().textTheme.apply(
          bodyColor: AppColors.onSurface,
          displayColor: AppColors.onSurface,
        ),
      ),
      colorScheme: const ColorScheme.dark(
        background: AppColors.background,
        surface: AppColors.surface,
        primary: AppColors.primaryCyan,
        secondary: AppColors.secondaryBlue,
        tertiary: AppColors.tertiaryGold,
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/core/widgets/glass_container.dart',
    filename: 'glass_container.dart',
    layer: 'Core & Theme',
    description: 'Reusable tactile glassmorphic container with frosted backdrop filter and specular light rim.',
    code: `import 'dart:ui';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class GlassContainer extends StatelessWidget {
  final Widget child;
  final double borderRadius;
  final EdgeInsetsGeometry? padding;
  final Color? borderColor;
  final double blur;

  const GlassContainer({
    Key? key,
    required this.child,
    this.borderRadius = 16.0,
    this.padding,
    this.borderColor,
    this.blur = 20.0,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(borderRadius),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
        child: Container(
          padding: padding ?? const EdgeInsets.all(16.0),
          decoration: BoxDecoration(
            color: AppColors.surfaceContainerLow.withOpacity(0.65),
            borderRadius: BorderRadius.circular(borderRadius),
            border: Border.all(
              color: borderColor ?? Colors.white.withOpacity(0.12),
              width: 1.0,
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.45),
                blurRadius: 24,
                offset: const Offset(0, 8),
              ),
            ],
          ),
          child: child,
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/domain/entities/executive_profile.dart',
    filename: 'executive_profile.dart',
    layer: 'Domain',
    description: 'Clean Architecture entity representing verified executive candidate credentials without fake data.',
    code: `import 'package:equatable/equatable.dart';

class ExecutiveProfile extends Equatable {
  final String id;
  final String fullName;
  final String targetRole;
  final String nationalIdHash;
  final double readinessIndex;
  final double atsMatchProbability;
  final int verifiedCredentialsCount;
  final double marketDemandScore;
  final bool isZeroFakeDataCertified;

  const ExecutiveProfile({
    required this.id,
    required this.fullName,
    required this.targetRole,
    required this.nationalIdHash,
    required this.readinessIndex,
    required this.atsMatchProbability,
    required this.verifiedCredentialsCount,
    required this.marketDemandScore,
    required this.isZeroFakeDataCertified,
  });

  @override
  List<Object?> get props => [
        id,
        fullName,
        targetRole,
        nationalIdHash,
        readinessIndex,
        atsMatchProbability,
        verifiedCredentialsCount,
        marketDemandScore,
        isZeroFakeDataCertified,
      ];
}
`,
  },
  {
    path: 'lib/presentation/bloc/executive_bloc.dart',
    filename: 'executive_bloc.dart',
    layer: 'Presentation (BLoC)',
    description: 'BLoC state manager coordinating real-time telemetry, ATS optimization, and STAR interview simulations.',
    code: `import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import '../../domain/entities/executive_profile.dart';

// Events
abstract class ExecutiveEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class LoadExecutiveTelemetry extends ExecutiveEvent {}

class EnhanceSummaryWithVerbs extends ExecutiveEvent {
  final String currentSummary;
  EnhanceSummaryWithVerbs(this.currentSummary);
  @override
  List<Object?> get props => [currentSummary];
}

class ChangeAtSTemplate extends ExecutiveEvent {
  final String templateId;
  ChangeAtSTemplate(this.templateId);
  @override
  List<Object?> get props => [templateId];
}

// States
abstract class ExecutiveState extends Equatable {
  @override
  List<Object?> get props => [];
}

class ExecutiveInitial extends ExecutiveState {}
class ExecutiveLoading extends ExecutiveState {}

class ExecutiveLoaded extends ExecutiveState {
  final ExecutiveProfile profile;
  final String activeTemplate;
  final bool isEnhancedVerbs;

  ExecutiveLoaded({
    required this.profile,
    this.activeTemplate = 'classic',
    this.isEnhancedVerbs = false,
  });

  @override
  List<Object?> get props => [profile, activeTemplate, isEnhancedVerbs];
}

// BLoC Implementation
class ExecutiveBloc extends Bloc<ExecutiveEvent, ExecutiveState> {
  ExecutiveBloc() : super(ExecutiveInitial()) {
    on<LoadExecutiveTelemetry>((event, emit) async {
      emit(ExecutiveLoading());
      await Future.delayed(const Duration(milliseconds: 600));
      emit(ExecutiveLoaded(
        profile: const ExecutiveProfile(
          id: 'EXEC-2025-SA',
          fullName: 'Dr. Tariq Al-Mansoor',
          targetRole: 'VP of Digital Transformation',
          nationalIdHash: 'SHA256:8f92c1a4e50d7b32',
          readinessIndex: 0.948,
          atsMatchProbability: 0.98,
          verifiedCredentialsCount: 14,
          marketDemandScore: 9.6,
          isZeroFakeDataCertified: true,
        ),
      ));
    });

    on<ChangeAtSTemplate>((event, emit) {
      if (state is ExecutiveLoaded) {
        final current = state as ExecutiveLoaded;
        emit(ExecutiveLoaded(
          profile: current.profile,
          activeTemplate: event.templateId,
          isEnhancedVerbs: current.isEnhancedVerbs,
        ));
      }
    });

    on<EnhanceSummaryWithVerbs>((event, emit) {
      if (state is ExecutiveLoaded) {
        final current = state as ExecutiveLoaded;
        emit(ExecutiveLoaded(
          profile: current.profile,
          activeTemplate: current.activeTemplate,
          isEnhancedVerbs: !current.isEnhancedVerbs,
        ));
      }
    });
  }
}
`,
  },
  {
    path: 'lib/presentation/screens/dashboard_screen.dart',
    filename: 'dashboard_screen.dart',
    layer: 'Screens',
    description: 'Executive Dashboard screen matching the approved design with live KPI cards and navigation shortcuts.',
    code: `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../core/theme/app_theme.dart';
import '../../core/widgets/glass_container.dart';
import '../bloc/executive_bloc.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.surfaceContainerLowest.withOpacity(0.85),
        title: const Text('Executive Dashboard', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            margin: const EdgeInsets.only(right: 12),
            decoration: BoxDecoration(
              color: AppColors.surfaceContainerHigh,
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Row(
              children: [
                Icon(Icons.verified_user, size: 14, color: AppColors.primaryCyan),
                SizedBox(width: 4),
                Text('SHA-256', style: TextStyle(fontSize: 10, color: AppColors.primaryCyan, fontWeight: FontWeight.bold)),
              ],
            ),
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Banner
            GlassContainer(
              borderColor: AppColors.primaryCyan.withOpacity(0.3),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('REAL-TIME TELEMETRY & MARKET ALIGNMENT',
                      style: TextStyle(fontSize: 10, color: AppColors.primaryCyan, fontWeight: FontWeight.bold)),
                  SizedBox(height: 6),
                  Text('Dr. Tariq Al-Mansoor',
                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white)),
                  Text('Target Role: C-Suite / VP of Digital Transformation',
                      style: TextStyle(fontSize: 12, color: AppColors.primaryCyan)),
                ],
              ),
            ),
            const SizedBox(height: 16),
            // KPI Grid
            Row(
              children: [
                Expanded(
                  child: GlassContainer(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('94.8%', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w800, color: AppColors.primaryCyan)),
                        SizedBox(height: 4),
                        Text('Career Readiness Index', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: GlassContainer(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text('98%', style: TextStyle(fontSize: 26, fontWeight: FontWeight.w800, color: Colors.white)),
                        SizedBox(height: 4),
                        Text('ATS Match Probability', style: TextStyle(fontSize: 11, color: AppColors.onSurfaceVariant)),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
`,
  },
  {
    path: 'lib/main.dart',
    filename: 'main.dart',
    layer: 'Configuration',
    description: 'Application entry point initializing dependency injection, BLoC providers, and bilingual routing.',
    code: `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'core/theme/app_theme.dart';
import 'presentation/bloc/executive_bloc.dart';
import 'presentation/screens/dashboard_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const AICareerProApp());
}

class AICareerProApp extends StatelessWidget {
  const AICareerProApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<ExecutiveBloc>(
          create: (context) => ExecutiveBloc()..add(LoadExecutiveTelemetry()),
        ),
      ],
      child: MaterialApp(
        title: 'AI Career Pro',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.darkTheme,
        home: const DashboardScreen(),
      ),
    );
  }
}
`,
  },
];

export const FLUTTER_CODE_SNIPPETS: Record<string, string> = {
  pubspec: FLUTTER_CODE_FILES.find((f) => f.filename === 'pubspec.yaml')?.code || '',
  theme: FLUTTER_CODE_FILES.find((f) => f.filename === 'app_theme.dart')?.code || '',
  glass: FLUTTER_CODE_FILES.find((f) => f.filename === 'glass_container.dart')?.code || '',
  domain: FLUTTER_CODE_FILES.find((f) => f.filename === 'executive_profile.dart')?.code || '',
  bloc: FLUTTER_CODE_FILES.find((f) => f.filename === 'executive_bloc.dart')?.code || '',
  screen: FLUTTER_CODE_FILES.find((f) => f.filename === 'dashboard_screen.dart')?.code || '',
};
