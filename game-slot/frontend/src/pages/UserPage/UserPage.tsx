import React from 'react'
import { Link } from 'react-router-dom'

const image =
  'https://www.comboinfinito.com.br/principal/wp-content/uploads/2019/12/the_witcher_3-_wild_hunt.jpg'

const data = {
  name: 'Mary D. Senters',
  image:
    'https://cache.skoob.com.br/local/images//0IobvjBfoc_GDUEqqj4fiVqt8tM=/170x170/center/top/smart/filters:format(jpeg)/https://skoob.s3.amazonaws.com/usuarios/394638/394638SK-V11624626632G.jpg',
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
  ],
}

interface Review {
  score: number
  image: string
  comment: string
}

interface List {
  name: string
  image: string
}

interface UserPageProps {
  id: number
}

function ListItem({ name, image }: List) {
  return (
    <div style={{ padding: '10px' }}>
      <img
        src={image}
        alt=""
        style={{
          width: '206px',
          height: '161px',
        }}
      />
      <div
        style={{
          fontSize: '16px',
          marginTop: '16px',
        }}
      >
        {name}
      </div>
    </div>
  )
}

function ReviewItem({ score, image, comment }: Review) {
  return (
    <div style={{ padding: '10px', textAlign: 'center' }}>
      <img
        src={image}
        alt=""
        style={{
          width: '206px',
          height: '161px',
          marginBottom: '10px',
        }}
      />
      <span
        style={{
          color: '#F1C644',
          width: '39px',
          height: '39px',
        }}
      >
        {[...Array(score)].map((i) => (
          <span key={i}>{'\u2605'}</span>
        ))}
        {[...Array(5 - score)].map((i) => (
          <span key={i}>{'\u2606'}</span>
        ))}
      </span>
      <p
        style={{
          marginTop: '10px',
        }}
      >
        {comment}
      </p>
    </div>
  )
}

function More() {
  return (
    <Link
      to="/"
      style={{
        width: '206px',
        height: '161px',
        background: '#36383B',
        marginTop: '10px',
        textAlign: 'center',
        paddingTop: '65px',
        padding: 'auto',
        fontSize: '30px',
      }}
    >
      More
    </Link>
  )
}

const UserPage: React.FC<any> = ({ id }: UserPageProps) => {
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
          {id} - {data.name}
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
        <button
          style={{
            width: '106px',
            height: '50px',
            background: '#2B6EAD',
            borderRadius: '4px',
            marginLeft: '-20px',
            marginTop: '39px',
          }}
        >
          Follow
        </button>
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
            <ListItem
              name={review.game}
              image={review.image}
              key={review.game}
            />
          ))}
          <More />
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
              score={review.score}
              image={review.image}
              comment={review.comment}
              key={review.game}
            />
          ))}
          <More />
        </div>
      </div>
    </div>
  )
}

export default UserPage
