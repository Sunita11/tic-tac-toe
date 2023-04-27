
import { Inter } from 'next/font/google'
import Game from '../component/game';

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <main
      className={`${inter.className}`}
    ><div>
      Tic Tac Toe Game
      <Game/>
    </div>
    </main>
  )
}
