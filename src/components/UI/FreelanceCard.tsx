export interface TagData {
  text: string;
  color: string;
  borderColor: string;
}

interface FreelanceCardProps {
  image: string;
  link: string;
  title: string;
  stars: number;
  tags: TagData[];
}

export default function FreelanceCard({ image, link, title, stars, tags }: FreelanceCardProps) {
  return (
    <div
      className="glass-panel glass-card d-flex align-items-center p-3 mb-4 bg-opacity-10 glass-border"
      style={{ borderRadius: '15px', cursor: 'pointer' }}
      onClick={() => window.open(link, '_blank')}
      title={`Abrir perfil en ${title}`}
    >
      <div
        className="d-flex justify-content-center align-items-center text-white fw-bold fs-5"
        style={{
          width: '50px',
          height: '50px',
          backgroundImage: `url(${image})`,
          backgroundColor: 'white',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '50%',
          marginRight: '15px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      ></div>

      <div>
        <h6 className="mb-1 text-white" style={{ fontWeight: 800 }}>{title}</h6>
        {tags && tags.length > 0 && (
          <div className="d-flex gap-2 mb-1 flex-wrap">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className={`badge text-${tag.color} bg-${tag.color} bg-opacity-25`}
                style={{ fontSize: '0.65rem', border: `1px solid ${tag.borderColor}` }}
              >
                {tag.text}
              </span>
            ))}
          </div>
        )}
        {stars > 0 && (
          <div className="text-warning" style={{ fontSize: '0.8rem', letterSpacing: '2px' }}>
            {'⭐'.repeat(stars)}
          </div>
        )}
      </div>
    </div>
  );
}
