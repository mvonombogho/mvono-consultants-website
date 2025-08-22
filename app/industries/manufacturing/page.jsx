'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Factory, Shield, Zap, FileCheck, Award, CheckCircle, TrendingUp, Users, AlertTriangle, Settings } from 'lucide-react';
import Footer from '../../../components/shared/Footer';
import MetaTags from '../../../components/MetaTags';
import { gradients, colorSchemes } from '../../../utils/colors';

const manufacturingServices = [
  {
    name: 'Factory Safety Audits',
    description: 'Comprehensive DOSH compliance audits for manufacturing facilities, machinery safety, and worker protection protocols.',
    benefits: ['Reduce workplace accidents by 85%', 'Ensure DOSH compliance', 'Lower insurance premiums'],
    icon: <Shield size={24} />
  },
  {
    name: 'Industrial Energy Optimization',
    description: 'Energy audits specifically for manufacturing processes, machinery efficiency, and power consumption reduction.',
    benefits: ['Average 23% energy cost reduction', 'Optimize production efficiency', 'Reduce carbon footprint'],
    icon: <Zap size={24} />
  },
  {
    name: 'Equipment Statutory Inspection',
    description: 'Pressure vessels, lifting equipment, boilers, and industrial machinery certification for manufacturing plants.',
    benefits: ['100% regulatory compliance', 'Prevent equipment failures', 'Extend machinery lifespan'],
    icon: <Settings size={24} />
  },
  {
    name: 'Environmental Compliance',
    description: 'NEMA assessments for manufacturing operations, waste management, and environmental impact mitigation.',
    benefits: ['NEMA approval guarantee', 'Sustainable operations', 'Community relations'],
    icon: <FileCheck size={24} />
  }
];

const manufacturingClients = [
  { name: 'Unga Group', industry: 'Food Processing' },
  { name: 'Tata Chemicals', industry: 'Chemical Manufacturing' },
  { name: 'National Cement', industry: 'Cement Production' },
  { name: 'Alpine Coolers', industry: 'Refrigeration Equipment' },
  { name: 'Wire Products', industry: 'Metal Processing' },
  { name: 'Alloy Castings', industry: 'Metal Casting' },
  { name: 'Saint Gobain', industry: 'Building Materials' },
  { name: 'Line Plast', industry: 'Plastic Manufacturing' }
];

const manufacturingChallenges = [
  {
    challenge: 'High workplace accident rates',
    solution: 'Comprehensive safety management systems and worker training',
    icon: <AlertTriangle size={20} />
  },
  {
    challenge: 'Rising energy costs affecting profitability',
    solution: 'Energy audits and optimization reducing costs by 20-30%',
    icon: <TrendingUp size={20} />
  },
  {
    challenge: 'Complex DOSH and NEMA compliance requirements',
    solution: 'Expert regulatory guidance ensuring 100% compliance',
    icon: <FileCheck size={20} />
  },
  {
    challenge: 'Equipment failures causing production downtime',
    solution: 'Preventive statutory inspections and maintenance planning',
    icon: <Settings size={20} />
  }
];

export default function ManufacturingPage() {
  return (
    <>
      <MetaTags
        title="Manufacturing Safety & Energy Consultants Kenya | Mvono Consultants"
        description="Leading safety, energy, and compliance consultants for Kenya's manufacturing industry. DOSH compliance, energy audits, equipment inspection, and environmental assessments for factories and industrial plants. Serving Unga Group, Tata Chemicals, and 200+ manufacturers."
        keywords="manufacturing safety Kenya, factory safety audit, industrial energy audit Kenya, DOSH compliance manufacturing, equipment inspection Kenya, factory energy optimization, manufacturing environmental compliance, industrial safety consultants Kenya, factory statutory inspection"
        canonicalUrl="https://www.mvonoconsultants.com/industries/manufacturing"
        page="industry-manufacturing"
      />
      
      <main className="overflow-x-hidden bg-white">
        <Footer />
      </main>
    </>
  );
}
