
type LS = 'log' | 'sign'
const AuthForm = ({logSign} : { logSign: LS}) => {
    const submitFrom = async () => {

    }
    console.log(logSign)
  return (
   <form action="post" onSubmit={submitFrom}>

   </form>
  )
}

export default AuthForm