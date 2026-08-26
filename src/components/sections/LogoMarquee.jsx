/**
 * LogoMarquee — structural placeholder track for verified client logos.
 * No fake client names are rendered here.
 */
export default function LogoMarquee() {
  const items = [0, 1, 2, 3, 4, 5, 6, 7]

  return (
    <div className="logo-marquee" aria-hidden="true">
      <div className="logo-marquee__track">
        {items.concat(items).map((item, index) => (
          <div key={index} className="logo-marquee__item chip" />
        ))}
      </div>
    </div>
  )
}