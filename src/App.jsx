import { useState, useEffect, useRef } from "react";
import { BsDice5Fill } from "react-icons/bs";
import axios from "axios";
import Typed from "typed.js";

const TypedLoading = () => {
  const loadingEl = useRef(null),
    loadingtyped = useRef(null);
  useEffect(() => {
    const options = {
      strings: ["Loading..."],
      typeSpeed: 50,
      backSpeed: 50,
    };
    loadingtyped.current = new Typed(loadingEl.current, options);
    return () => loadingtyped.current.destroy();
  }, []);
  return <span style={{ whiteSpace: "pre" }} ref={loadingEl} />;
};

export default function App() {
  const [data, setData] = useState([]),
    [counter, setCounter] = useState(0),
    [loading, setLoading] = useState(true);

  const IncCounter = (counter) => setCounter(counter + 1);

  function getAdvice() {
    setLoading(true);
    axios.get("	https://api.adviceslip.com/advice").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }

  useEffect(() => getAdvice(), [counter]);

  return (
    <div className="bg-primary min-h-screen flex flex-col p-4 items-center text-gray-100">
      <div className="bg-secondary max-w-sm flex flex-col gap-4 font-medium items-center my-auto rounded-xl p-4">
        {!loading ? (
          <>
            <p className="text-accent uppercase tracking-widest ">
              advice #{data.slip.id}
            </p>
            <q className="text-2xl quotes text-center font-semibold p-4">
              {data.slip.advice}
            </q>
          </>
        ) : (
          <>
            <p className="uppercase">advice</p>
            <p className="text-3xl quotes text-accent tracking-wide  text-center font-semibold ">
              <TypedLoading />
            </p>
          </>
        )}
        <div
          onClick={() => IncCounter(counter)}
          className="bg-accent cursor-pointer dice-cover p-3 hover:scale-110 sctive:scale-90 rounded-full justify-self-end my-auto -mb-10"
        >
          <BsDice5Fill size="1.5em" fill="#202632" />
        </div>
      </div>
    </div>
  );
}
