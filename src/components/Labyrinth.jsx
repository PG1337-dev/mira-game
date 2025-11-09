import '../styles/Labyrinth.css'

function Labyrinth({ maze, start, finish }) {
  return (
    <div className="labyrinth">
      {maze.map((row, rowIndex) => (
        <div key={rowIndex} className="labyrinth-row">
          {row.map((cell, colIndex) => {
            const isStart = start.x === colIndex && start.y === rowIndex
            const isFinish = finish.x === colIndex && finish.y === rowIndex
            
            let cellClass = 'labyrinth-cell'
            if (cell === 1) {
              cellClass += ' wall'
            } else {
              cellClass += ' path'
            }
            if (isStart) cellClass += ' start'
            if (isFinish) cellClass += ' finish'

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cellClass}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Labyrinth

