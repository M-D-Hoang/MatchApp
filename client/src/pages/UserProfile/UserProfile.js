import { useEffect, useState } from "react";
import { ItemCardSquare } from "../../components/ItemCard/ItemCardSquare";


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
    const [userItems, setUserItems] = useState([])
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

    const listingJSX = userItems.map((item) => {
        return (<ItemCardSquare item={item} />);
    })

    return (<div>
        <h1>{user.username}</h1>
        <h2>{user.firstName} {user.lastName}</h2>
        <img src={user.picture} alt={user.username}></img>
        <div className="profile-personal-info">
            <h1>Personal Info:</h1>
            <p>Birthday: {user.birthday}</p>
            <p>E-Mail: {user.email}</p>
            <p>Phone Number: {user.phoneNumber}</p>
            <p>Gender: {user.gender}</p>
        </div>
        <div>
            <h1>Items</h1>
            {listingJSX}
        </div>
    </div>);
}