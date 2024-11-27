import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true
  },
  {
    userName: 'illojuan',
    name: 'Juan Alberto',
    isFollowing: false
  },
  {
    userName: 'PacoHdezs',
    name: 'Paco Hdez',
    isFollowing: true
  },
  {
    userName: 'TMChein',
    name: 'Tomas',
    isFollowing: false
  }
]
// Cuando renderizamos un array, tenemos que añadir un Key (identificador unico a cada elemento)
export function App () {
  return (
    <section className='App'>
      {
        users.map(({ userName, name, isFollowing }) => {
          return (
            <TwitterFollowCard
                key={userName} /* Cuando renderizamos un array, tenemos que añadir un Key (identificador unico a cada elemento)
                en este caso usamos el userName pero podria ser tambien el ID o lo que sea */
                userName={userName}
                initialIsFollowing={isFollowing}
            >
                {name}
            </TwitterFollowCard>
          )
        })    
      }
    </section>
  )
}