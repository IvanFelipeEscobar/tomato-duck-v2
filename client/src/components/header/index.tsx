import Logo from "./logo"
import Signin from "./sign-in"

const Nav = () => {
  return (
    <div className='flex justify-between mx-2 mt-1'>
        <Logo/>
        <Signin/>
    </div>
  )
}

export default Nav