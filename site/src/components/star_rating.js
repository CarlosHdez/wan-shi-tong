import React, {useState} from 'react'

import 'stylesheets/components/star_rating.scss'

const StarRating = ({value, className, label = 'Rating', editable = true}) => {
  const starValue = value -1
  const [hoverVal, setHoverVal] = useState(null)
  const MAX_RATING = new Array(5).fill(0)

  const onStarHover = (value) => {
    if (!editable) {
      return
    }
    setHoverVal(value)
  }

  const renderRatingStart = (idx, value) => {
    let icon = 'star_border'
    if ((hoverVal !== null && hoverVal >= idx) ||
      (hoverVal === null && starValue >= idx)) {
      icon = 'star'
    }
    return (
      <span
        key={idx}
        className='material-icons'
        onMouseOver={() => onStarHover(idx)}
      >
        {icon}
      </span>
    )
  }

  const renderLabel = () => {
    if (!label) {
      return
    }
    return <label>{label}</label>
  }

  return (
    <div
      className={`star-rating ${className}`}
      onMouseOut={() => onStarHover(null)}
    >
      {renderLabel()}
      {MAX_RATING.map((_, i) => renderRatingStart(i, value))}
    </div>
  )
}

export default StarRating
