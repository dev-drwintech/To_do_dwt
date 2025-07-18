import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TaskItem from '../components/TaskItem';
import TaskStats from '../components/TaskStats';
import { FaPlus } from 'react-icons/fa';
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';

const PageWrapper = styled.div`
max-width: 800px;
margin: auto;
padding: 2rem;
background: #fff9f1;
min-height: 100vh;
`;

const Header = styled.h1`
text-align: center;
color: #c0392b;
margin-bottom: 2rem;
`;

const Button = styled.button`
background-color: #ff5400;
color: white;
padding: 10px 18px;
font-weight: bold;
border: none;
border-radius: 8px;
cursor: pointer;
display: flex;
align-items: center;
gap: 8px;
margin: 0 auto 2rem auto;

&:hover {
    background-color: #e64a00;
}
`;

const SearchBar = styled.input`
padding: 10px;
width: 60%;
border-radius: 8px;
border: 1px solid #ddd;
margin-right: 1rem;
`;

const Select = styled.select`
padding: 10px;
border-radius: 8px;
border: 1px solid #ddd;
`;

const FilterSection = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 1.5rem;
`;

function Dashboard() {
const [tasks, setTasks] = useState([]);
const [search, setSearch] = useState('');
const [priorityFilter, setPriorityFilter] = useState('all');
const [showModal, setShowModal] = useState(false);
const [editTask, setEditTask] = useState(null);

// Charger les tâches au démarrage
useEffect(() => {
    fetchTasks();
}, []);

// Récupère depuis API Laravel
const fetchTasks = async () => {
    try {
     const res = await axios.get('http://localhost:8000/api/tasks');
     setTasks(res.data);
    } catch (err) {
     console.error('Erreur de chargement des tâches', err);
    }
};

const HandleAddTask = async (FormData) => {
    try {
        await axios.post('http://localhost:8000/api/tasks', FormData)
        fetchTasks();
        
    } catch (err) {
         console.error("erreur lors de l'ajout de la tache", err) 
        }
};

const markAsCompleted = async (id) => {
try {
    await axios.patch(`http://localhost:8000/api/tasks/${id}`, {
     completed: true,
    });
    fetchTasks();
} catch (err) {
    console.error('Erreur lors de la complétion de la tâche', err);
}
};

// 🗑 Supprimer une tâche
const deleteTask = async (id) => {
    try {
     await axios.delete(`http://localhost:8000/api/tasks/${id}`);
     fetchTasks();
    } catch (err) {
     console.error('Erreur de suppression', err);
    }
};


//modifier une tache
const modifyTask = (task) => {
    setEditTask(task); 
};


const handleUpdateTask = async (id, updatedData) => {
  try {
    await axios.put(`http://localhost:8000/api/tasks/${id}`, updatedData); // ⬅️ C’est ici que la route est appelée
    fetchTasks();           // recharge les tâches après modification
    setEditTask(null);      // ferme le modal
  } catch (err) {
    console.error('Erreur lors de la mise à jour', err);
  }
};






//  Statistiques
const total = tasks.length;
const completed = tasks.filter(t => t.completed).length;
const highPriority = tasks.filter(t => t.priority === 'haute').length;

//  Tâches filtrées
const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
});


return (
    <PageWrapper>
     <Header>Ma Todo List</Header>
        
     {/* Statistiques */}
     <TaskStats total={total} completed={completed} highPriority={highPriority} />

     {/* Bouton Nouvelle tâche */}
     <Button onClick={ () => setShowModal(true)}>
        <FaPlus /> Nouvelle tâche
     </Button>

     {/* Recherche + filtre */}
     <FilterSection>
        <SearchBar
         type="text"
         placeholder=" Rechercher..."
         value={search}
         onChange={e => setSearch(e.target.value)}
        />
        <Select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}>
         <option value="all">Toutes priorités</option>
         <option value="haute">Haute</option>
         <option value="moyenne">Moyenne</option>
         <option value="basse">Basse</option>
        </Select>
     </FilterSection>

     {/* Liste des tâches */}
     {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} onDelete={deleteTask} onComplete={markAsCompleted} onModify={() => modifyTask(task)} />
        
     ))}

     {/* Afficher le moadal */}
     { showModal && 
        <AddTaskModal onClose={() =>setShowModal(false)}
        onSubmit={HandleAddTask}/>
        
     }

        {editTask && (
        <EditTaskModal
            task={editTask} 
            onClose={() => setEditTask(false)}
            onSubmit={handleUpdateTask}
        />
        )}
     
     
    </PageWrapper>
);
}

export default Dashboard;