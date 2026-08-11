import { EDUCATION } from '../../data/recruiterData'

export default function AtAGlance() {
  const cards = [
    { title: 'DEGREE', value: EDUCATION.degree, sub: EDUCATION.institution },
    { title: 'CORE FOCUS', value: 'AI / ML Engineering', sub: 'Production-oriented intelligent systems' },
    { title: 'BACKEND STACK', value: 'Java · Spring Boot · FastAPI', sub: 'REST APIs, Microservices, JPA' },
    { title: 'AI / LLM STACK', value: 'Python · ML · RAG · ChromaDB', sub: 'LangChain, Embeddings, Scikit-Learn' },
  ]

  return (
    <div className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="p-5 bg-[#FFFFFF]/60 backdrop-blur-sm border border-[#D0C9BA] rounded-xl hover:border-[#4A7A3A] transition-colors"
        >
          <p className="label-mono text-[10px] text-[#4A7A3A] font-bold tracking-widest mb-1.5">
            {card.title}
          </p>
          <h3 className="text-sm font-bold text-[#1A1612] font-['Space_Grotesk'] leading-tight mb-1">
            {card.value}
          </h3>
          <p className="text-xs text-[#7A7468]">
            {card.sub}
          </p>
        </div>
      ))}
    </div>
  )
}
