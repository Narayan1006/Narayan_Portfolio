import { PROFILE } from '../../data/recruiterData'

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 border-t border-[#D0C9BA]/60">
      
      <div className="p-8 sm:p-12 bg-[#FFFFFF]/80 backdrop-blur-md border border-[#D0C9BA] rounded-2xl text-center space-y-6 max-w-3xl mx-auto shadow-sm">
        
        <span className="label-mono text-xs text-[#4A7A3A] font-bold tracking-[0.3em]">
          GET IN TOUCH
        </span>

        <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-[#1A1612] font-['Space_Grotesk'] leading-none">
          LET'S BUILD SOMETHING.
        </h2>

        <p className="text-sm text-[#5A5448] max-w-md mx-auto leading-relaxed">
          Have an open software engineering role, internship opportunity, or intelligent system project worth solving?
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="px-6 py-3 bg-[#4A7A3A] hover:bg-[#3B632E] text-white label-mono text-xs font-bold rounded-lg shadow-sm transition-all duration-200"
          >
            EMAIL ME →
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#E5E0D5] hover:bg-[#D0C9BA] text-[#1A1612] label-mono text-xs font-bold rounded-lg transition-all duration-200"
          >
            LINKEDIN →
          </a>

          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#E5E0D5] hover:bg-[#D0C9BA] text-[#1A1612] label-mono text-xs font-bold rounded-lg transition-all duration-200"
          >
            GITHUB →
          </a>

          <a
            href={PROFILE.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-[#4A7A3A] text-[#4A7A3A] hover:bg-[#4A7A3A] hover:text-white label-mono text-xs font-bold rounded-lg transition-all duration-200"
          >
            DOWNLOAD RESUME ↓
          </a>
        </div>

        {/* DIRECT CONTACT STRIP */}
        <div className="pt-6 border-t border-[#D0C9BA]/60 flex flex-wrap items-center justify-center gap-6 text-xs text-[#7A7468] label-mono">
          <div>DIRECT EMAIL: <span className="text-[#1A1612] font-bold">{PROFILE.email}</span></div>
          <div>PHONE: <span className="text-[#1A1612] font-bold">{PROFILE.phone}</span></div>
        </div>

      </div>

    </section>
  )
}
