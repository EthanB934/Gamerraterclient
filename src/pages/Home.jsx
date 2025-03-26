import { GamesList } from "../components/Games/GamesList"
import "./Home.css"
function Home({ token, games }) {
  return (
    <main className='text-slate-900'>
      <h1 className='banner'>Welcome to Gamer Rater</h1>
      <GamesList token={token} games={games}/>
    </main>
  )
}

export default Home
