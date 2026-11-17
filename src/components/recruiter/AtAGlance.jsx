import { EDUCATION } from '../../data/recruiterData'

export default function AtAGlance() {
  const cards = [
    { title: 'DEGREE', value: EDUCATION.degree, sub: EDUCATION.institution },
    { title: 'CORE FOCUS', value: 'AI / ML Engineering', sub: 'Production-oriented intelligent systems' },
    { title: 'BACKEND & APIS', value: 'FastAPI · REST APIs · Spring Boot', sub: 'Microservices, PostgreSQL, JPA' },
    { title: 'AI / LLM STACK', value: 'Python · PyTorch · RAG · ChromaDB', sub: 'Sentence Transformers, Scikit-Learn' },
    { title: 'PROBLEM SOLVING', value: '343 Solved · CodeChef 1438', sub: '25 contests · Active: 101 days' },
  ]

  return (
    <div className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="p-4 sm:p-5 bg-[#FFFFFF]/85 backdrop-blur-sm border border-[#D0C9BA] rounded-2xl hover:border-[#4A7A3A] transition-all duration-200 hover:-translate-y-0.5 shadow-2xs hover:shadow-xs"
        >
          <p className="label-mono text-[10px] text-[#4A7A3A] font-bold tracking-widest mb-1.5">
            {card.title}
          </p>
          <h3 className="text-sm font-bold text-[#1A1612] font-['Space_Grotesk'] leading-tight mb-1">
            {card.value}
          </h3>
          <p className="text-xs text-[#5A5448]">
            {card.sub}
          </p>
        </div>
      ))}
    </div>
  )
}
