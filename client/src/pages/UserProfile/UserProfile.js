import { useEffect, useState } from "react";
import { ItemCardSquare } from "../../components/ItemCard/ItemCardSquare";
import { ImagePreview } from "../../components/Forms/ImagePreview";
import { useParams, useLocation } from 'react-router-dom';

export function UserPage() {
    //for the real thing, we would have user passed in as a prop
    const [user, setUser] = useState({});
    const [isEditing, setEditing] = useState(false);
    const [userItems, setUserItems] = useState([]);
    const location = useLocation();
    //get userid from URL
    const params = useParams();
    
    const editToggle = ()=>{
      setEditing(!isEditing);  
    };

    const onEditSubmit = ()=>{
        alert('THIS IS A WIP GO HOME');
    }

    useEffect(() => {
        //Get Username from Route
        
        //console.log(location.state)
        const username = params.username;
        console.log(username);


        //Get User
        console.log(`Username: ${username}`)
        fetch(`/api/users/${username}`)
        .then((resp) => {return resp.json()})
        .then((json)=>{setUser(json)})
        .then(()=>{
            //Get products by user
            //Doesn't work. Doesn't return a 404, but doesn't return anything. 
            //Should work once the path is implemented.
            fetch(`/api/listings/userItems/${username}`)
            .then((resp) => {return resp.json()})
            .then((json)=>{console.log(json);setUserItems(json);})
            .catch(()=>{alert('User Item Fetch Failed. Replace alert with on-page error')})
        })
        .catch(()=>{alert('User Fetch Failed. Replace alert with on-page error')})


        

       
    }, [location.state, params.username])

    console.log(user);
    return (<div>
        {user !== null?( !isEditing?<Display user={user} userItems={userItems} editToggle={editToggle}></Display>:<Edit user={user} onSubmit={onEditSubmit} editToggle={editToggle}/>):<NoUser/>}
    </div>);
}

function Edit({user, onSubmit, editToggle}){

    const [previewImages, setPreviewImages] = useState([])

    const onImageChange = (e)=>{
        const pickedFiles = e.target.files
        console.log("Image changed!")
        console.log(pickedFiles)
        if(pickedFiles[0] !== undefined){
            //set image statevar to the picked image
            setPreviewImages(pickedFiles);
        }
    }

    return(
        <div className="item-form">
        <form onSubmit={onSubmit}>
            <label>
                First Name:{" "}
                <input
                    type="text"
                    name="firstName"
                    defaultValue={user !== undefined ? user.firstName : ""}
                    required></input>
            </label>
            <label>
             Last Name:{" "}
                <input
                    type="text"
                    name="lastName"
                    defaultValue={user !== undefined ? user.lastName : ""}></input>
            </label>
            <label>
                Birthday:{" "}
                <input
                    type="date"
                    name="birthday"
                    defaultValue={user !== undefined ? user.birthday : ""}></input>
            </label>
            <label>
                Profile Picture:{" "}
                <input
                    className="image-input"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={onImageChange}
                    required></input>
            </label>
            <label>
                Gender:{" "}
                <input
                    type="text"
                    name="gender"
                    defaultValue={user !== undefined ? user.gender : ""}
                    required></input>
            </label>
            <label>
                E-Mail:{" "}
                <input
                    type="email"
                    name="email"
                    defaultValue={
                        user !== undefined ? user.email : ""
                    }></input>
            </label>
            <label>
                Phone Number:{" "}
                <input
                    type="tel"
                    name="phoneNumber"
                    defaultValue={user !== undefined ? user.phoneNumber : ""}
                    required
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"></input>
            </label>
            <input type="submit"></input>
        </form>

        <ImagePreview src={previewImages} />
    </div>
    );
}

function Display({user, userItems, editToggle}){
    const listingJSX = userItems.map((item) => {
        return (<ItemCardSquare item={item} />);
    })

    return(
        <><h1>{user.username}</h1><h2>{user.firstName} {user.lastName}</h2><img src={user.picture} alt={user.username}></img><div className="profile-personal-info">
        <h1>Personal Info:</h1>
        <p>Birthday: {user.birthday}</p>
        <p>E-Mail: {user.email}</p>
        <p>Phone Number: {user.phoneNumber}</p>
        <p>Gender: {user.gender}</p>
        <button onClick={editToggle}>Edit Info</button>
    </div><div>
            <h1>Items</h1>
            {listingJSX}
        </div></>
    );
}


function NoUser(){
    return(<div><h1>This user does not exist.</h1></div>)
}