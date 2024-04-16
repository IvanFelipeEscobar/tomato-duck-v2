import { useAuth0 } from "@auth0/auth0-react";

function App() {
const {loginWithRedirect, logout, user, isAuthenticated, isLoading} = useAuth0()
console.log(user)
  return (
<>
   <button className="btn btn-primary"
    onClick={()=>loginWithRedirect()}
   >login</button> 
   {isLoading && <div>loading...</div>}
   <hr />
   {
    isAuthenticated && user && (
      <div>
        <img src={user.picture} alt={user.name} height={30} width={96} />
        <h2>{user.given_name} {user.family_name}</h2>
        <p>{user.email}</p>
      </div>
    )
   }
   <button className="btn btn-link" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
   Log Out
 </button></>
  )
}

export default App
