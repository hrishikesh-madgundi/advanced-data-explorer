import React from 'react';

export default function PokemonDetail({ detail, evolution }) {
  if (!detail) return null;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <img src={detail.sprites.front_default} alt={detail.name} className="w-32 h-32" />
        <h2 className="text-3xl capitalize font-bold">{detail.name} #{detail.id}</h2>
      </div>
      <div>
        <h3 className="font-semibold">Stats</h3>
        <ul>{detail.stats.map(s=><li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>)}</ul>
      </div>
      <div>
        <h3 className="font-semibold">Abilities</h3>
        <ul>{detail.abilities.map(a=><li key={a.ability.name}>{a.ability.name}</li>)}</ul>
      </div>
      <div>
        <h3 className="font-semibold">Moves</h3>
        <ul className="grid grid-cols-2 gap-2 max-h-48 overflow-auto">{detail.moves.map(m=><li key={m.move.name}>{m.move.name}</li>)}</ul>
      </div>
      <div>
        <h3 className="font-semibold">Evolution Chain</h3>
        <ul>
          {/* simple traversal */}
          {(() => {
            const evo = [];
            let node = evolution;
            while (node) {
              evo.push(node.species.name);
              node = node.evolves_to[0];
            }
            return evo.map(n=><li key={n}>{n}</li>);
          })()}
        </ul>
      </div>
    </div>
  );
}
