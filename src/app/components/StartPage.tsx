import axios from "axios";
import { useContext } from "react";
import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { Side, Types} from "../reducers";
import { AppContext } from "../context";

const StartPage = () => {
  const [, initData] = useInitData();
  const { dispatch } = useContext(AppContext);
  const handleStartGame = async (side: Side | 'random') => {
    const result = await axios.post('/api/game/', {
      side: side
    }, {
      headers: {
        'tg-init-data': initData
      }
    })
    dispatch({
      type: Types.LoadGameAndOpenPage,
      payload: {
        page: 'chess_game',
        game: result.data
      }
    })
  }

  return <div className="StartPage">
    <h1>Chess</h1>
    <div className="inside">
      <h3>За кого будешь играть?</h3>
      <button onClick={() => handleStartGame('white')}>Ариец</button>
      <h3>или</h3>
      <button onClick={() => handleStartGame('black')}>Чёрный властелин</button>
      <h3>а может</h3>
      <button onClick={() => handleStartGame('random')}>Нагнёшь за любых</button>
    </div>
  </div>
};

export default StartPage;
