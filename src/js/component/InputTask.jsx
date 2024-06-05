import React, { useState } from "react";

const InputTask = ({ addTask }) => {
	const [inputValue, setInputValue] = useState("");
	const [alert, setAlert] = useState({ type: '', message: '' });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValue === '') {
			setAlert({ type: 'danger', message: 'El campo de entrada no puede estar vacío' });
		} else {
			addTask(inputValue);
			setInputValue("");
		}
	};

	return (
		<div className="mb-3">
			{alert.message && (
				<div className={`alert alert-${alert.type}`} role="alert">
					{alert.message}
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<input
					autoComplete="off"
					type="text"
					className="form-control custom-input"
					id="task"
					value={inputValue}
					onChange={(event) => setInputValue(event.target.value)}
					placeholder="add a task"
				/>
			</form>
		</div>
	);
}

export default InputTask;