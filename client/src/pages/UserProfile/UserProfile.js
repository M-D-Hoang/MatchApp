import { useEffect, useState } from "react";
import { ItemCardSquare } from "../../components/ItemCard/ItemCardSquare";
import { ImagePreview } from "../../components/Forms/ImagePreview";

const exampleUser = {
    _id: 'user1026',
    username: 'bobzilla1289',
    lastName: 'Bob',
    firstName: 'Billy',
    birthday: 'Febuary 17 2004',
    gender: 'Male',
    email: 'pewdiepie@gmail.com',
    phoneNumber: '123-123-1234',
    picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTTiQ8Yl6XjZK9qjqoqztkUDOXXerRr7Kp0z38NwfdYQ&s',
    type: 'buyer'
}

export function UserPage() {
    //for the real thing, we would have user passed in as a prop
    const user = exampleUser
    const [isEditing, setEditing] = useState(false);
    const [userItems, setUserItems] = useState([]);

    const editToggle = ()=>{
      setEditing(!isEditing);  
    };

    const onEditSubmit = ()=>{
        alert('THIS IS A WIP GO HOME');
    }

    useEffect(() => {
        //get products by user
        setUserItems([
            {
              
                    "_id": "65dd042f642427fd5770228a",
                    "ownerID": "user9381",
                    "title": "NERF Nstrike Snapfire",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dol",
                    "price": 56.79,
                    "imageURIs": [
                        "https://m.media-amazon.com/images/I/71fM1bvB8iL._AC_UL320_.jpg"
                    ],
                    "condition": "fair",
                    "extraField": "none",
                    "category": "Games & Toys",
                    "__v": 0
                
            },
            {
                
                    "_id": "65dd042f642427fd5770228a",
                    "ownerID": "user9381",
                    "title": "NERF Nstrike Snapfire",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dol",
                    "price": 56.79,
                    "imageURIs": [
                        "https://m.media-amazon.com/images/I/71fM1bvB8iL._AC_UL320_.jpg"
                    ],
                    "condition": "fair",
                    "extraField": "none",
                    "category": "Games & Toys",
                    "__v": 0
                
            },
            {
               
                    "_id": "65dd042f642427fd5770228a",
                    "ownerID": "user9381",
                    "title": "NERF Nstrike Snapfire",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dol",
                    "price": 56.79,
                    "imageURIs": [
                        "https://m.media-amazon.com/images/I/71fM1bvB8iL._AC_UL320_.jpg"
                    ],
                    "condition": "fair",
                    "extraField": "none",
                    "category": "Games & Toys",
                    "__v": 0
                
            }

        ])
    }, [])

    

    return (<div>
        {!isEditing?<Display user={user} userItems={userItems} editToggle={editToggle}></Display>:<Edit user={user} onSubmit={onEditSubmit} editToggle={editToggle}/>}
        
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