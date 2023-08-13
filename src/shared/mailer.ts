export const emailVerificationTemplate = (email: string, url: string) => {
	return [
		email,
		"Confirma tu cuenta de usuario",
		`Por favor, confirma tu cuenta de usuario haciendo click en el siguiente enlace: ${url}/confirm-account`,
		`
            <h1>Confirma tu cuenta de usuario</h1>
            <p>Por favor, confirma tu cuenta de usuario haciendo click en el siguiente enlace: <a href="${url}/confirm-account">Confirmar cuenta</a></p>
            <p>Si no has solicitado la creación de una cuenta de usuario, ignora este mensaje.</p>
        `,
	];
};
