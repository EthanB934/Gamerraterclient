export const ReviewsList = ({ reviews, game }) => {
    const findGameReviews = () => {
       const gameReviews = reviews.filter((review) => review.game === game.id)
        return gameReviews.map((gameReview) => {
            return (
                <li className="review-list-item">{gameReview.review}</li>
            )
        })
    }
    return <>{reviews && game ? <ul className="game-reviews-list">{findGameReviews()}</ul> : " "}</>
}