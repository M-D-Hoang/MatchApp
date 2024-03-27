//This shows up when someone logs in with google but doesn't have an account in
//the system. This form allows them to add extra information about themselves
//and formally add the user to the DB.
import { UserEdit } from "../../components/UserEdit/UserEdit";
import { useTranslation } from "react-i18next";
export function NewUserForm(){
  const [t, i18n] = useTranslation("global");
  const onSubmit = ()=>{
    //Send the data to the server. Let them know if something went wrong, 
    //send them to their userpage when it works. 
  }
  return(
    <div>
      <h1>{t("user.welcome")}</h1>
      <p>{t("user.new")}:</p>
      <UserEdit onSubmit={onSubmit}/>
    </div>
  );
}