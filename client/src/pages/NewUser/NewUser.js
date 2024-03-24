//This shows up when someone logs in with google but doesn't have an account in
//the system. This form allows them to add extra information about themselves
//and formally add the user to the DB.
import { UserEdit } from "../../components/UserEdit/UserEdit";

export function NewUserForm(){
  const onSubmit = ()=>{
    //Send the data to the server. Let them know if something went wrong, 
    //send them to their userpage when it works. 
  }
  return(
    <div>
      <h1>Welcome to MatchApp!</h1>
      <p>Before we can let you in, we need to know a little more about you.</p>
      <UserEdit onSubmit={onSubmit}/>
    </div>
  );
}