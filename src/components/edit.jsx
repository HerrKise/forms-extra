import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validator } from "../utils/validator";
import TextField from "./textField";

const Edit = () => {
    const history = useNavigate();
    const [data, setData] = useState({
        name: "",
        surname: "",
        born: "",
        portfolio: "",
        expirience: "",
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (localStorage.getItem("data")) {
            setData(JSON.parse(localStorage.getItem("data")));
        }
    }, []);

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: { message: "Поле 'Имя' обязательно для заполнения" },
        },
        surname: {
            isRequired: {
                message: "Поле 'Фамилия' обязательно для заполнения",
            },
        },
        born: {
            isRequired: {
                message: "Поле 'Год рождения' обязательно для заполнения",
            },
            max: {
                message: "Поле 'Год рождения' некорректно",
                value: new Date().getFullYear(),
            },
            min: {
                message: "Поле 'Год рождения' некорректно",
                value: 4,
            },
        },
        portfolio: {
            isRequired: {
                message: "Поле 'Портфолио' обязательно для заполнения",
            },
            isPortfolio: { message: "Поле 'Портфолио' должно быть ссылкой" },
        },
        expirience: {
            isRequired: { message: "Поле 'Опыт' обязательно для заполнения" },
            isDigit: { message: "Поле 'Опыт' должно быть числом" },
        },
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        else {
            localStorage.setItem("data", JSON.stringify(data));
            alert("Обновлено!");
            history("/");
        }
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {localStorage.getItem("data") ? (
                        <h3 className="mb-4">Редактировать</h3>
                    ) : (
                        <h3 className="mb-4">Создать</h3>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Фамилия"
                            name="surname"
                            value={data.surname}
                            onChange={handleChange}
                            error={errors.surname}
                        />
                        <TextField
                            label="Год рождения"
                            name="born"
                            value={data.born}
                            onChange={handleChange}
                            error={errors.born}
                        />
                        <TextField
                            label="Портфолио"
                            name="portfolio"
                            value={data.portfolio}
                            onChange={handleChange}
                            error={errors.portfolio}
                        />
                        <TextField
                            label="Опыт"
                            name="expirience"
                            value={data.expirience}
                            onChange={handleChange}
                            error={errors.expirience}
                        />
                        {localStorage.getItem("data") ? (
                            <>
                                <Link
                                    className="btn btn-secondary w-50 mx-auto"
                                    to="/"
                                    role="button"
                                >
                                    Назад
                                </Link>
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-50 mx-auto"
                                >
                                    Обновить
                                </button>
                            </>
                        ) : (
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Submit
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Edit;
