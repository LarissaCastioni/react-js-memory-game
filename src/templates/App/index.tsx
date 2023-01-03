import { Grid } from '../../components/Grid'
import { cards } from '../../data/cards'
import './style.css'

const handleClick = (id: string) => {
  console.log(id)
}

export default function App() {

  return (
    <div className="app">
      <Grid cards={cards} />
    </div>
  )
}
