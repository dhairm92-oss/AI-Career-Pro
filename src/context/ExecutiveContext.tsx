import React, { createContext, useContext, useState } from 'react';
import {
  ExecutiveProfile,
  EXECUTIVE_PROFILES,
  MegaprojectRequisition,
  SOVEREIGN_REQUISITIONS,
} from '../data/executiveProfiles';

interface ExecutiveContextType {
  currentProfile: ExecutiveProfile;
  allProfiles: ExecutiveProfile[];
  allRequisitions: MegaprojectRequisition[];
  selectedRequisition: MegaprojectRequisition;
  setSelectedRequisition: (req: MegaprojectRequisition) => void;
  switchProfile: (profileId: string) => void;
  updateProfile: (updates: Partial<ExecutiveProfile>) => void;
  applyCustomData: (custom: {
    nameAr: string;
    nameEn: string;
    titleAr: string;
    titleEn: string;
    baseSalaryMonthlySAR: number;
    yearsExperience: number;
    sectorAr: string;
    sectorEn: string;
  }) => void;
  isDataInjectorOpen: boolean;
  setIsDataInjectorOpen: (open: boolean) => void;
}

const ExecutiveContext = createContext<ExecutiveContextType | undefined>(undefined);

export const ExecutiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentProfile, setCurrentProfile] = useState<ExecutiveProfile>(EXECUTIVE_PROFILES[0]);
  const [selectedRequisition, setSelectedRequisition] = useState<MegaprojectRequisition>(
    SOVEREIGN_REQUISITIONS[0]
  );
  const [isDataInjectorOpen, setIsDataInjectorOpen] = useState(false);

  const switchProfile = (profileId: string) => {
    const found = EXECUTIVE_PROFILES.find((p) => p.id === profileId);
    if (found) {
      setCurrentProfile(found);
    }
  };

  const updateProfile = (updates: Partial<ExecutiveProfile>) => {
    setCurrentProfile((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const applyCustomData = (custom: {
    nameAr: string;
    nameEn: string;
    titleAr: string;
    titleEn: string;
    baseSalaryMonthlySAR: number;
    yearsExperience: number;
    sectorAr: string;
    sectorEn: string;
  }) => {
    setCurrentProfile((prev) => ({
      ...prev,
      nameAr: custom.nameAr || prev.nameAr,
      nameEn: custom.nameEn || prev.nameEn,
      titleAr: custom.titleAr || prev.titleAr,
      titleEn: custom.titleEn || prev.titleEn,
      baseSalaryMonthlySAR: custom.baseSalaryMonthlySAR || prev.baseSalaryMonthlySAR,
      salaryBenchmarkAr: `${custom.baseSalaryMonthlySAR.toLocaleString()} ر.س شهرياً + حوافز LTI`,
      salaryBenchmarkEn: `SAR ${custom.baseSalaryMonthlySAR.toLocaleString()} / month + LTI Equity`,
      yearsExperience: custom.yearsExperience || prev.yearsExperience,
      sectorAr: custom.sectorAr || prev.sectorAr,
      sectorEn: custom.sectorEn || prev.sectorEn,
    }));
  };

  return (
    <ExecutiveContext.Provider
      value={{
        currentProfile,
        allProfiles: EXECUTIVE_PROFILES,
        allRequisitions: SOVEREIGN_REQUISITIONS,
        selectedRequisition,
        setSelectedRequisition,
        switchProfile,
        updateProfile,
        applyCustomData,
        isDataInjectorOpen,
        setIsDataInjectorOpen,
      }}
    >
      {children}
    </ExecutiveContext.Provider>
  );
};

export const useExecutive = () => {
  const context = useContext(ExecutiveContext);
  if (!context) {
    throw new Error('useExecutive must be used within an ExecutiveProvider');
  }
  return context;
};
