import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  background: ${({ type }) => (type === 'submit' ? '#27ae60' : '#ccc')};
  color: #fff;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

function EditTaskModal({ task, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    priority: 'medium',
    end_date: '',
  });

  // Pré-remplir le formulaire quand la tâche change
  useEffect(() => {
    if (task) {
      setForm({
        name: task.name || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        end_date: task.end_date ? task.end_date.slice(0, 10) : '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(task.id, form);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Modifier la tâche</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Nom de la tâche"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <Select name="priority" value={form.priority} onChange={handleChange}>
            <option value="lower">lower</option>
            <option value="medium">medium</option>
            <option value="height">higher</option>
          </Select>
          <Input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
          />
          <Buttons>
            <Button type="button" onClick={onClose}>Annuler</Button>
            <Button type="submit">Mettre à jour</Button>
          </Buttons>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default EditTaskModal;
