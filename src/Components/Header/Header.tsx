import "./header.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { RootState } from "../../store/store";

const Header = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.token !== null);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(logout());
    };

    return (
        <nav>
            <div className="container">
                {isAuthenticated && (
                    <>
                        <Link className="link" to={"/officers"}>
                            <li>Ответственный сотрудник</li>
                        </Link>
                        <Link className="link" to={"/cases/"}>
                            <li>Все кражи</li>
                        </Link>
                        <Link className="link" to={"/"}>
                            <li onClick={handleClick}>Выйти</li>
                        </Link>
                    </>
                )}
                {
                    <>
                        <Link className="link" to={"/report"}>
                            <li>Сообщить о краже</li>
                        </Link>

                        {!isAuthenticated && (
                            <>
                                <Link className="link" to={"/auth/sign_in"}>
                                    <li>Войти</li>
                                </Link>
                                <Link className="link" to={"/auth/sign_up"}>
                                    <li>Регистрация</li>
                                </Link>
                            </>
                        )}
                    </>
                }
            </div>
        </nav>
    );
};

export default Header;
