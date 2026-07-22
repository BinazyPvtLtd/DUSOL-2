import FeatureCard from './FeatureCard'
import IconMapper from './IconMapper'

export default function KeyHighlights({ homeData }) {
  const highlights = homeData?.keyHighlights || []

  const leftColumn = highlights.filter((_, i) => i % 2 === 0)
  const rightColumn = highlights.filter((_, i) => i % 2 === 1)

  return (
    <section className='key-highlights'>
      <div className='wrap'>
        <div className='kh-grid'>
          <div className='kh-col'>
            {leftColumn.map((item, i) => (
              <FeatureCard
                key={item.title}
                icon={<IconMapper name={item.icon} />}
                title={item.title}
                description={item.description}
                style={{ animationDelay: `${i * 90}ms` }}
              />
            ))}
          </div>

          <div className='kh-col'>
            {rightColumn.map((item, i) => (
              <FeatureCard
                key={item.title}
                icon={<IconMapper name={item.icon} />}
                title={item.title}
                description={item.description}
                style={{ animationDelay: `${i * 90 + 45}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
