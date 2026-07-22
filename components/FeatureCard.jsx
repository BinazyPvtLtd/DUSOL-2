export default function FeatureCard({ icon, title, description, style }) {
  return (
    <div className='card kh-card' style={style}>
      <span className='kh-ico' aria-hidden='true'>
        {icon}
      </span>

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
