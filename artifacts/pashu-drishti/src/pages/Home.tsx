import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import AnalyzeSection from '@/components/AnalyzeSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import BreedsSection from '@/components/BreedsSection';
import StatsSection from '@/components/StatsSection';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <AnalyzeSection />
      <HowItWorksSection />
      <StatsSection />
      <BreedsSection />
    </Layout>
  );
}