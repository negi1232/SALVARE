import React, { useState, useEffect } from 'react';
import tasksData from './tasks.json';

import ListComponent from './component/ListComponent'
import './home.css';

function List_top(props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(tasksData);
    }, []);

    return (
        <>
            <div className="button-container">
            <button type="button"  className="btn btn-dark button block"
                onClick={() => { props.cont.sign() }} >connect MetaMask</button>
            </div>

            <div className="todo-container" >
            <h3>受けているタスク</h3>
                {tasks.map((task) => (
                    <ListComponent
                        key={task.id}
                        title={task.title}
                        address={task.address}
                    />
                ))}
            </div>

            <div className="todo-container" >
            <h3>収集待ちのタスク</h3>
                {tasks.map((task) => (
                    <ListComponent
                        key={task.id}
                        title={task.title}
                        address={task.address}
                    />
                ))}
            </div>


        </>
    );
}
export default List_top;
