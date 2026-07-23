const isHtmlContent = value => /<\/?[a-z][\s\S]*>/i.test(value || '')

export default function FeatureCard({ icon, title, description, style }) {
  return (
    <div className='card kh-card' style={style}>
      <span className='kh-ico' aria-hidden='true'>
        {icon}
      </span>

      <div>
        <h3>{title}</h3>
        {isHtmlContent(description) ? (
          <div className='rich-content' dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <p>{description}</p>
        )}
      </div>
    </div>
  )
}
