import React, { useEffect, useState, useRef } from 'react';
import styles from './Modal.module.css';
import cn from 'classnames';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const Modal = ({ errorMessage, setErrorStatus }) => {

	const checkError = (e) => {
		switch (e) {
			case 'С таким адресом электронной почты зарегистрировано несколько аккаунтов!':
				return 'Este endereço de e-mail já está em uso!';
				break;
			case 'Вы указали e-mail в неверном формате!':
				return 'Por favor, digite o e-mail correto.';
				break;
			case 'Недопустимая валюта':
				return 'Moeda inválida.';
				break;
			case 'Ошибка.':
				return 'Erro. Tente se registrar mais tarde.';
				break;
			case 'Минимум 6 символов, обязан содержать цифры и латинский буквы.':
				return 'Mínimo de 6 símbolos. Deve conter apenas caracteres e dígitos latinos!';
				break;
			default: 'Erro. Tente se registrar mais tarde.';
		}

		if (e.includes('Извините, регистрация игроков из указанной страны')) {
			return 'Desculpe, o registro do país especificado (Brasil) está suspenso.'
		}

		return 'Erro. Tente se registrar mais tarde.'
	}

	const ref = useRef();
	useOnClickOutside(ref, () => setErrorStatus(false));

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setErrorStatus(false)
		}, 3000)

		document.addEventListener('keydown', function (e) {
			if (e.code === 'Escape') {
				setErrorStatus(false)
			}
		});

		return () => clearTimeout(timeOut);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (

		<div className={styles.modalWrapper}>
			<div className={styles.modal} ref={ref}>
				{checkError(errorMessage)}

				<button className={styles.close} onClick={() => setErrorStatus(false)}>
					<span className={styles.line1} />
					<span className={styles.line2} />
				</button>
			</div>
		</div>

	);
}

export default Modal;
