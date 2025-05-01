import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getPokemon } from '../services/pokeapi';
import { Radar } from 'recharts';

export default function CompareModal({ isOpen, onClose, ids }) {
  const [pokes, setPokes] = useState([]);
  useEffect(() => {
    if (isOpen && ids.length===2) {
      Promise.all(ids.map(getPokemon)).then(setPokes);
    }
  }, [isOpen, ids]);
  if (!isOpen) return null;
  const data = pokes[0]?.stats.map((s,i) => ({ stat: s.stat.name, [pokes[0].name]: s.base_stat, [pokes[1]?.name]: pokes[1]?.stats[i].base_stat }));
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="p-4 bg-white rounded-lg max-w-lg mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Compare</h2>
      {data && <Radar data={data} dataKey={pokes[0]?.name} />}
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">Close</button>
    </Modal>
  );
}