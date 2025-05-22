import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState('')
	const [list, setList] = useState([])

	const getTodo = async () => {
		const response = await fetch('https://playground.4geeks.com/todo/users/Andres');
		if (response.status == 404) {
			createUser()
			return
		};
		if (response.ok) {
			const data = await response.json();
			setList(data.todos);
		}

	};

	const createUser = async () => {
		const response = await fetch('https://playground.4geeks.com/todo/users/Andres', {
			method: "POST",
			headers: { "Content-Type": "application/json" }
		});

		if (response.status == 201) {
			return
		}
	};

	const addTask = async () => {
		const response = await fetch('https://playground.4geeks.com/todo/todos/Andres', {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(
				{
					"label": inputValue,
					"is_done": false
				}
			)
		});

		if (response.status == 201) {
			getTodo()
			return
		}
	};

	const deleteTask = async (id) => {
		const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});

		if (response.status == 204) {
			getTodo()
			return
		}
	};

	useEffect(() => {
		getTodo();
	}, []
	);

	return (
		<div className="container">
			<h1 className="text-center mt-5">Todos</h1>
			<input type="text"
				onChange={(e) => setInputValue(e.target.value)}
				value={inputValue}
				onKeyDown={(e) => {
					if (inputValue > "2") {
						if (e.key === "Enter") {
							addTask()
							setInputValue("")
						}
					}
				}
				}
				placeholder="What needs to be done?" />
			<ul>
				{list.map((t, index) => (
					<li key={index}>
						{t.label} <button className="btn btn-outline-danger float-end" type="button" onClick={() => deleteTask(t.id)}>X</button>
					</li>
				))}
			</ul>

			<p className="theTasks" >{list.length} Tasks</p>
		</div>
	);
};

export default Home;