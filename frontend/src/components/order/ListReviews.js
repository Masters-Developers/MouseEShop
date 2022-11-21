import React from 'react'

const ListReviews = ({ opinions }) => {
    return (
        <div className="reviews w-75">
            <h3>Client's Opinions:</h3>
            <hr />
            {opinions && opinions.map(opinion => (
                <div key={opinion._id} className="review-card my-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(opinion.rating / 5) * 100}%` }}></div>
                    </div>
                    <p className="review_user">BY {opinion.clientName}</p>
                    <p className="review_comment">{opinion.comment}</p>

                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ListReviews