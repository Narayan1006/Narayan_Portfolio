import RecruiterNav from '../components/recruiter/RecruiterNav'
import RecruiterHero from '../components/recruiter/RecruiterHero'
import AtAGlance from '../components/recruiter/AtAGlance'
import ExperienceSection from '../components/recruiter/ExperienceSection'
import ProjectsSection from '../components/recruiter/ProjectsSection'
import SkillsSection from '../components/recruiter/SkillsSection'
import EducationSection from '../components/recruiter/EducationSection'
import ContactSection from '../components/recruiter/ContactSection'

export default function RecruiterPage({ onNavigateBack }) {
  return (
    <div className="min-h-screen bg-[#EBE7DF] text-[#1A1612] font-['Inter'] selection:bg-[#4A7A3A] selection:text-white">
      
      {/* STICKY NAV BAR */}
      <RecruiterNav onNavigateBack={onNavigateBack} />

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* 01 HERO SECTION */}
        <RecruiterHero />

        {/* AT A GLANCE QUICK STRIP */}
        <AtAGlance />

        {/* 02 EXPERIENCE SECTION */}
        <ExperienceSection />

        {/* 03 SELECTED PROJECTS SECTION */}
        <ProjectsSection />

        {/* 04 SKILLS & PROBLEM SOLVING */}
        <SkillsSection />

        {/* 05 EDUCATION & CERTIFICATIONS */}
        <EducationSection />

        {/* 06 CONTACT SECTION */}
        <ContactSection />

      </main>

      {/* FOOTER */}
      <footer className="py-8 bg-[#E5E0D5]/90 border-t border-[#D0C9BA] text-center text-xs text-[#7A7468] label-mono">
        © {new Date().getFullYear()} NARAYAN SINGH — SOFTWARE ENGINEER & AI / ML DEVELOPER
      </footer>

    </div>
  )
}
