import Link from 'next/link'
import React from 'react'

const CardSlider = ({article}) => {
  return (
    <div className="card-item">
              <img src={article.url} alt="" />
              <div className="card-info">
                <Link href={"/"} className="card-title capitalise">{article.title}</Link>
                <p className="text-lg card-description">{article.content}</p>
              </div>
            </div>
  )
}

export default CardSlider