import Footer from '../components/Footer'
import Header from '../components/Header'
import MainContent from '../components/MainContent'

export default function HomePage() {
  return (
    <div className="page-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <section className="welcome-card" aria-labelledby="welcome-title">
        <Header />
        <MainContent />
        <Footer />
      </section>
      <p className="page-caption">A calm corner of the internet <span>·</span> Take a breath</p>
    </div>
  )
}
