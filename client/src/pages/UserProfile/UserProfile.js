import { useEffect, useState } from "react";
import { ItemCardSquare } from "../../components/ItemCard/ItemCardSquare";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { UserEdit } from "../../components/UserEdit/UserEdit";


export function UserPage() {
    //for the real thing, we would have user passed in as a prop
    const [user, setUser] = useState(undefined);
    const [isEditing, setEditing] = useState(false);
    const [userItems, setUserItems] = useState([]);
    const location = useLocation();
    //get userid from URL
    const params = useParams();

    const editToggle = () => {
        setEditing(!isEditing);
    };

    const navigate = useNavigate();

    const onEditSubmit = async (e) => {

        e.preventDefault();
        var formData = new FormData(e.target);
        formData.append("image", '');
        formData.append('username', user.username);

        const resp = await fetch('/api/users/', {
            method: "PATCH",
            headers:{},
            body: formData,
        });

        const json = await resp.json();
        if (!resp.ok) {
            console.error(JSON.stringify(json));
        }
        else {
            //If post went through, navigate back to user page
            navigate(`/user/${user.username}`, { state: { data: user.username } });
        }
        console.error(JSON.stringify(json));


    }

    useEffect(() => {
        //Get Username from Route

        //console.log(location.state)
        const username = params.username;
        console.log(username);


        //Get User
        console.log(`Username: ${username}`)
        fetch(`/api/users/${username}`)
            .then((resp) => { return resp.json() })
            .then((json) => { setUser(json) })
            .then(() => {
                //Get products by user
                //Doesn't work. Doesn't return a 404, but doesn't return anything. 
                //Should work once the path is implemented.
                fetch(`/api/listings/userItems/${username}`)
                    .then((resp) => { return resp.json() })
                    .then((json) => { console.log(json); setUserItems(json); })
                    .catch(() => { alert('User Item Fetch Failed. Replace alert with on-page error') })
            })
            .catch(() => { alert('User Fetch Failed. Replace alert with on-page error') })





    }, [location.state, params.username])

    const loadingJSX = <ReactLoading type={"spin"} color={"#58cc77"} height={667} width={375} />

    console.log(user);
    return (<div>
        {user === undefined ? loadingJSX : user !== null ? (!isEditing ? <Display user={user} userItems={userItems} editToggle={editToggle}></Display> : <UserEdit user={user} onSubmit={onEditSubmit} editToggle={editToggle} />) : <NoUser />}
    </div>);
}



function Display({ user, userItems, editToggle }) {
    const listingJSX = userItems.map((item) => {
        return (<ItemCardSquare item={item} />);
    })

    return (
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


function NoUser() {
    return (<div><h1>This user does not exist.</h1></div>)
}