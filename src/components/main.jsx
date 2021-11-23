import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
    let user;
    if (localStorage.getItem("data")) {
        user = JSON.parse(localStorage.getItem("data"));
    }
    const Age = () => {
        const currentYear = new Date().getFullYear();
        const age = currentYear - user.born;
        if ((age - 1) % 10 === 0) {
            return `${age} год`;
        } else if (
            (age - 2) % 10 === 0 ||
            (age - 3) % 10 === 0 ||
            (age - 4) % 10 === 0
        ) {
            return `${age} года`;
        } else return `${age} лет`;
    };
    const yearsOfExpirience = () => {
        if ((user.expirience - 1) % 10 === 0) {
            return `${user.expirience} год`;
        } else if (
            (user.expirience - 2) % 10 === 0 ||
            (user.expirience - 3) % 10 === 0 ||
            (user.expirience - 4) % 10 === 0
        ) {
            return `${user.expirience} года`;
        } else return `${user.expirience} лет`;
    };
    return (
        <>
            <div className="m-4">
                <h1>Карточка студента</h1>
                {localStorage.getItem("data") && (
                    <div>
                        <h6>
                            <b>Имя: </b>
                            {user.name}
                        </h6>
                        <h6>
                            <b>Фамилия: </b>
                            {user.surname}
                        </h6>
                        <h6>
                            <b>Год рождения: </b>
                            {user.born}({Age()})
                        </h6>
                        <h6>
                            <b>Портфолио: </b>
                            <a href={user.portfolio}>{user.portfolio}</a>
                        </h6>
                        <h6>
                            <b>Опыт: </b>
                            {yearsOfExpirience()}
                        </h6>
                        <Link
                            className="btn btn-primary"
                            to="/edit"
                            role="button"
                        >
                            Редактировать
                        </Link>
                    </div>
                )}
                {!localStorage.getItem("data") && (
                    <div>
                        <h3>Нет данных</h3>
                        <Link
                            className="btn btn-primary"
                            to="/edit"
                            role="button"
                        >
                            Создать
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Main;
