const StarRating = ({ rating = 0, reviews = 0 }) => {
  const rounded = Math.round(rating)

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex text-[#f59e0b]">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>{star <= rounded ? '★' : '☆'}</span>
        ))}
      </div>
      <span className="text-slate-600">{rating.toFixed(1)}</span>
      <span className="text-sky-700">({reviews} reviews)</span>
    </div>
  )
}

export default StarRating
