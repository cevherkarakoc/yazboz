import { useCallback, useEffect, useMemo, useState } from "react";

const RANGE = Array.from({ length: 100 });

export function App() {
  const [players, setPlayers] = useState([]);

  const addPlayer = useCallback(() => {
    const player = {
      name: "Oyuncu" + (players.length + 1),
      scores: Array.from({ length: 100 }).fill(""),
    };
    setPlayers((players) => [...players, player]);
  }, [players, setPlayers]);

  const reset = useCallback(() => {
    const _players = players.map((player) => ({
      ...player,
      scores: Array.from({ length: 100 }).fill(""),
    }));
    setPlayers(_players);
  }, [players, setPlayers]);

  const updateName = useCallback(
    (playerIndex, value) => {
      players[playerIndex].name = value;
      setPlayers(players.slice(0));
    },
    [players, setPlayers],
  );

  const updateScore = useCallback(
    (playerIndex, scoreIndex, value) => {
      players[playerIndex].scores[scoreIndex] = value;
      setPlayers(players.slice(0));
    },
    [players, setPlayers],
  );

  useEffect(() => {
    const _players = Array.from({ length: 4 }).map((_, i) => ({
      name: "Oyuncu " + (i + 1),
      scores: Array.from({ length: 100 }).fill(""),
    }));

    setPlayers(_players);
  }, []);

  const gridTemplateColumns = useMemo(() => {
    return players.map(() => "1fr").join(" ");
  }, [players.length]);

  const totals = useMemo(() => {
    return players.map((player) =>
      player.scores.reduce((acc, score) => acc + (Number(score) || 0), 0),
    );
  }, [players]);

  useEffect(() => {
    if (players && players.length > 0) {
      localStorage.setItem("players", JSON.stringify(players));
    }
  }, [players]);

  useEffect(() => {
    const str = localStorage.getItem("players");
    if (str) {
      setPlayers(JSON.parse(str));
    }
  }, []);

  return (
    <div className="app">
      <div className="grid" style={{ gridTemplateColumns }}>
        {players.map((player, index) => (
          <input
            key={index}
            type="text"
            value={player.name}
            onChange={(e) => updateName(index, e.target.value)}
            className="title"
          />
        ))}
        {players.map((player, index) => (
          <div className="total" key={index}>
            {totals[index]}
          </div>
        ))}
      </div>
      <div className="grid scroll" style={{ gridTemplateColumns }}>
        {RANGE.map((_, row) =>
          players.map((player, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              value={player.scores[row]}
              onChange={(e) => updateScore(index, row, e.target.value)}
            />
          )),
        )}
      </div>
      <div className="footer">
        <button onClick={reset}>Temizle</button>
        <button onClick={addPlayer}>Oyuncu Ekle</button>
        <button onClick={addPlayer}>Oyuncu Çıkar</button>
      </div>
    </div>
  );
}
