import React from 'react'

const image =
  'https://cache.skoob.com.br/local/images//0IobvjBfoc_GDUEqqj4fiVqt8tM=/170x170/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/usuarios/394638/394638SK-V11624626632G.jpg'

const data = {
  name: 'Mary D. Senters',
  image: image,
  followers: ['some', 'some', 'some', 'some', 'some'],
  foolowing: ['some', 'some', 'some', 'some', 'some', 'some', 'some'],
  gameLists: [1, 2, 3, 4],
  reviews: [
    {
      game: 'game',
      score: 4,
      image: image,
      comment: 'I like that one',
    },
    {
      game: 'game2',
      score: 5,
      image: image,
      comment: 'I love that one',
    },
    {
      game: 'game3',
      score: 1,
      image: image,
      comment: 'I hate that one',
    },
    {
      game: 'game4',
      score: 0,
      image: image,
      comment: 'I hate that one',
    },
  ],
}

interface Review {
  game: string
  score: number
  image: string
  comment: string
}

function ReviewItem({ game, score, image, comment }: Review) {
  return (
    <div style={{ padding: '10px' }}>
      <img src={image} alt="" width="206px" height="161px" />
      <div>{game}</div>
      {score}
      <p>{comment}</p>
    </div>
  )
}

const UserPage: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        justifyContent: 'center',
        alignContent: 'center',
        justifyItems: 'left',
        color: '#FFFFFF',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          justifySelf: 'center',
          marginTop: '20%',
        }}
      >
        <img
          style={{
            borderRadius: '50%',
          }}
          src={data.image}
          alt=""
        />
        <p
          style={{
            fontSize: '32px',
            marginLeft: '-30px',
            marginTop: '20px',
            marginBottom: '15px',
          }}
        >
          {data.name}
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            fontSize: '16px',
            marginLeft: '-30px',
          }}
        >
          <span>{data.followers.length} Followers</span>
          <span>{data.foolowing.length} Following</span>
        </div>
      </div>
      <div
        style={{
          borderLeft: '0.991352px solid #36383B',
          padding: '77px',
        }}
      >
        <h3
          style={{
            fontSize: '32px',
            lineHeight: '37px',
          }}
        >
          Game Lists
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        >
          {data.reviews.map((review) => (
            <ReviewItem
              game={review.game}
              score={review.score}
              image={review.image}
              comment={review.comment}
              key={review.game}
            />
          ))}
        </div>
        <h3
          style={{
            fontSize: '32px',
            lineHeight: '37px',
          }}
        >
          Reviews
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            marginTop: '30px',
            marginBottom: '30px',
          }}
        >
          {data.reviews.map((review) => (
            <ReviewItem
              game={review.game}
              score={review.score}
              image={review.image}
              comment={review.comment}
              key={review.game}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserPage
