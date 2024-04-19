import Timer from '../timer'
import SessionPanel from './session'

const TaskPanel = () => {
  return (
    <div className='pt-4 flex flex-col lg:justify-evenly lg:items-stretch gap-4 justify-center items-center lg:flex-row bg-error min-h-screen'>
        <SessionPanel/>
        <Timer/>
    </div>
  )
}

export default TaskPanel