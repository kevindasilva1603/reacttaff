import React, { useRef, useState, useEffect } from 'react';

const UpdateProfileForm = () => {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const [error, setError] = useState({ firstName: '', lastName: '' });

  // Charger les données du localStorage quand le composant est monté
  useEffect(() => {
    firstNameRef.current.value = localStorage.getItem('firstName') || '';
    lastNameRef.current.value = localStorage.getItem('lastName') || '';
  }, []);

  const validateInput = (input) => {
    // Regex pour identifier les caractères spéciaux
    const specialCharRegex = /[^a-zA-Z0-9 ]/g;
    return specialCharRegex.test(input);
  };

  const handleUpdate = () => {
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const newError = { firstName: '', lastName: '' };

    // Validation des champs
    if (validateInput(firstName)) {
      newError.firstName = 'Le prénom ne peut pas contenir de caractères spéciaux.';
    } else {
      // Enregistrer dans localStorage si le champ est valide
      localStorage.setItem('firstName', firstName);
    }

    if (validateInput(lastName)) {
      newError.lastName = 'Le nom de famille ne peut pas contenir de caractères spéciaux.';
    } else {
      // Enregistrer dans localStorage si le champ est valide
      localStorage.setItem('lastName', lastName);
    }

    setError(newError);
  };

  return (
    <div className="update-profile-form">
      <label htmlFor="first-name">Prénom</label>
      <input ref={firstNameRef} id="first-name" type="text" defaultValue={localStorage.getItem('firstName') || ''} />
      {error.firstName && <p className="error">{error.firstName}</p>}

      <label htmlFor="last-name">Nom de famille</label>
      <input ref={lastNameRef} id="last-name" type="text" defaultValue={localStorage.getItem('lastName') || ''} />
      {error.lastName && <p className="error">{error.lastName}</p>}

      <button onClick={handleUpdate}>Mettre à jour</button>
    </div>
  );
};

export default UpdateProfileForm;
