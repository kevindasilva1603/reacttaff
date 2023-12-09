import React, { useRef, useState, useEffect } from "react";

const UpdateProfileForm = () => {
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const [error, setError] = useState({ firstName: "", lastName: "" });

    useEffect(() => {
        firstNameRef.current.value = localStorage.getItem("firstName") || "";
        lastNameRef.current.value = localStorage.getItem("lastName") || "";
    }, []);

    const validateInput = (input) => {
        // Regex pour identifier les caractères spéciaux
        const specialCharRegex = /[^a-zA-Z0-9 ]/g;
        return specialCharRegex.test(input);
    };

    const handleUpdate = () => {
        const firstName = firstNameRef.current.value.trim();
        const lastName = lastNameRef.current.value.trim();
        const newError = { firstName: "", lastName: "" };

        // Vérifier si le prénom est vide
        if (!firstName) {
            newError.firstName = "Veuillez remplir le champ du prénom.";
        } else if (validateInput(firstName)) {
            newError.firstName =
                "Le prénom ne peut pas contenir de caractères spéciaux.";
        } else {
            localStorage.setItem("firstName", firstName);
        }

        // Vérifier si le nom de famille est vide
        if (!lastName) {
            newError.lastName = "Veuillez remplir le champ du nom de famille.";
        } else if (validateInput(lastName)) {
            newError.lastName =
                "Le nom de famille ne peut pas contenir de caractères spéciaux.";
        } else {
            localStorage.setItem("lastName", lastName);
        }

        setError(newError);
    };

    return (
        <div className='update-profile-form'>
            <label htmlFor='first-name'>Prénom</label>
            <input
                ref={firstNameRef}
                id='first-name'
                type='text'
                defaultValue={localStorage.getItem("firstName") || ""}
            />
            {error.firstName && <p className='error'>{error.firstName}</p>}

            <label htmlFor='last-name'>Nom de famille</label>
            <input
                ref={lastNameRef}
                id='last-name'
                type='text'
                defaultValue={localStorage.getItem("lastName") || ""}
            />
            {error.lastName && <p className='error'>{error.lastName}</p>}

            <button onClick={handleUpdate}>Mettre à jour</button>
        </div>
    );
};

export default UpdateProfileForm;
