import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { Card } from "./card.jsx";
import { RickyRicon } from "./rickyRicon.jsx";

//create your first component
const Home = () => {

	const [data, setData] = useState([]);
	const [task, setTask] = useState('')

	useEffect(() => {
		//se cree usuario
		getUserTodos()
	}, [])
	//POST
	const userCreate = () => {
		fetch('https://playground.4geeks.com/todo/users/seiglie', {
			method: 'POST'
		})
			.then(resp => {
				if (!resp.ok) throw new Error(`error code: ${resp.status}`)
				return resp.json()
			})
			.then(data => getUserTodos())
			.catch(err => console.log(err))
	}
	//GET
	const getUserTodos = () => {
		fetch('https://playground.4geeks.com/todo/users/seiglie')
			.then(resp => {
				if (!resp.ok) throw new Error(`error code: ${resp.status}`)
				return resp.json()
			})
			.then(data => setData(data.todos))
			.catch(err => userCreate())
	}
	/*
		const handleSubmit = e => {
			e.preventDefault();
			fetch('https://playground.4geeks.com/todo/todos/seiglie', {
				method: 'POST', //que tipo de pedido 
				body: JSON.stringify({			//el cuerpo que contiene la informacion que enviamos
					"label": task,
					"is_done": false
				}),
				headers: { //como interactuamos con la api
					'Content-Type': 'application/json' //siempre sera application/json
				}
			})
				.then(resp => {
					if (!resp.ok) throw new Error(`error code: ${resp.status}`)
					return resp.json()
				})
				.then(data => {
					setTask('')
					getUserTodos()
				})
				.catch(err => console.log(err))
		}
	*/

	useEffect(() => {
		if (task.length > 0) {
			fetch('https://playground.4geeks.com/todo/todos/seiglie', {
				method: 'POST', //que tipo de pedido 
				body: JSON.stringify({			//el cuerpo que contiene la informacion que enviamos
					"label": task,
					"is_done": false
				}),
				headers: { //como interactuamos con la api
					'Content-Type': 'application/json' //siempre sera application/json
				}
			})
				.then(resp => {
					if (!resp.ok) throw new Error(`error code: ${resp.status}`)
					return resp.json()
				})
				.then(data => {
					console.log(data)
					setTask('')
				})
				.catch(err => console.log(err))
		}
	}, [data])




	const handleSubmitV2 = e => {
		e.preventDefault();
		console.log('asdasdasd');
		setData([...data, { label: task, is_done: false }])
	}



	const handleDelete = (id) => {
		console.log(id)
		fetch('https://playground.4geeks.com/todo/todos/' + id, {
			method: 'DELETE', //que tipo de pedido 
		})
			.then(resp => {
				getUserTodos()
			})

	}

	console.log(data)
	return (
		<div className="text-center">
			{/* 
			<RickyRicon/>
  			*/}

			<form onSubmit={handleSubmitV2} >
				<input type="text" value={task} onChange={e => setTask(e.target.value)} />
				<input type="submit" hidden />
			</form>
			<div className="card">
				{data && data.map((el, i) => <div key={i}>
					<p>{el.label}<span onClick={() => handleDelete(el.id)}>X</span> </p>
				</div>)}
			</div>
		</div>
	);
};

export default Home;