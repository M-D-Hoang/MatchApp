import { useEffect, useState } from "react";
import { ItemCardSquare } from "../../components/ItemCard/ItemCardSquare";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { useTranslation } from "react-i18next";
import "./UserProfile.css";

export function UserPage() {
    //for the real thing, we would have user passed in as a prop
    const [user, setUser] = useState(undefined);
    const [userItems, setUserItems] = useState([]);
    const location = useLocation();
    //get userid from URL
    const params = useParams();

    const navigate = useNavigate();

    const editToggle = () => {
        //navigate to edit page
        //<UserEdit user={user} editToggle={editToggle} />
        navigate("/user/edit", { state: { data: user } });
    };

    useEffect(() => {
        //Get Username from Route

        //console.log(location.state)
        const username = params.username;
        // console.log(username);

        //Get User
        // console.log(`Username: ${username}`);
        fetch(`/api/users/${username}`)
            .then((resp) => {
                return resp.json();
            })
            .then((json) => {
                setUser(json);
            })
            .then(() => {
                //Get products by user
                //Doesn't work. Doesn't return a 404, but doesn't return anything.
                //Should work once the path is implemented.
                fetch(`/api/listings/userItems/${username}`)
                    .then((resp) => {
                        return resp.json();
                    })
                    .then((json) => {
                        // console.log(json);
                        setUserItems(json);
                    })
                    .catch(() => {
                        alert(
                            "User Item Fetch Failed. Replace alert with on-page error"
                        );
                    });
            })
            .catch(() => {
                alert("User Fetch Failed. Replace alert with on-page error");
            });
    }, [location.state, params.username]);

    const loadingJSX = (
        <ReactLoading
            className="loading-bar"
            type={"spin"}
            color={"#58cc77"}
            height={400}
            width={400}
        />
    );

    // console.log(user);
    return (
        <div className="profile-menu-base">
            {user === undefined ? (
                loadingJSX
            ) : user !== null ? (
                <Display
                    user={user}
                    userItems={userItems}
                    editToggle={editToggle}></Display>
            ) : (
                <NoUser />
            )}
        </div>
    );
}

function Display({ user, userItems, editToggle }) {
    const [t] = useTranslation("global");
    const listingJSX = userItems.map((item) => {
        return <ItemCardSquare item={item} />;
    });

    const [isUser, setIsUser] = useState(false);
    //check if current logged in user is the one being looked at
    //probably not the most secure way to check this
    useEffect(() => {
        fetch("/api/users/check-auth", {
            method: "GET",
            credentials: "include",
        })
            .then((resp) => {
                if (!resp.ok) {
                    setIsUser(false);
                    return;
                }
                return resp.json();
            })
            .then((json) => {
                setIsUser(user.username === json.username);
            })
            .catch((e) => {
                console.error(e);
                setIsUser(false);
            });
    }, [user.username]);

    return (
        <div className="profile-page">
            <div className="profile-card">
                <img
                    className="profile-pfp"
                    src={user.picture}
                    alt={user.username}></img>
                <div className="profile-personal-info">
                    <p className="profile-username">{user.username}</p>
                    <p className="profile-name">
                        {user.firstName} {user.lastName}
                    </p>
                    <p>{t("user.birthday")} {user.birthday}</p>
                    <p>{t("user.email")} {user.email}</p>
                    <p>{t("user.phoneNumber")} {user.phoneNumber}</p>
                    <p>{t("user.gender")} {user.gender}</p>
                    {isUser && (
                        <button
                            className="edit-user-button"
                            onClick={editToggle}>
                            {t("user.edit")}
                        </button>
                    )}
                </div>
            </div>
            <div>
                {listingJSX.length !== 0 && (
                    <div className="items-section">
                        <h1 className="items-title">{t("user.items")}</h1>
                        <div className="listings-display square">{listingJSX}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

function NoUser() {
    const [t] = useTranslation("global");
    return (
        <div>
            <p className="profile-error">{t("user.noUser")}</p>
        </div>
    );
}

