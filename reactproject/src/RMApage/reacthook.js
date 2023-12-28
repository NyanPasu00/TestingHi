import React, {
  useEffect,
  useReducer,
  useState,
  useContext,
  useMemo,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { ThemeContext } from "./context";
export const MyContext = React.createContext();
export const ContextTesting = React.createContext();

//useReducer with object , state
//useReducer is a React Hook that lets you add a reducer to your component.
const ACTIONS = {
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export function Hook() {
  const [resourceType, setResourceType] = useState("");

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const handleIncrement = () => {
    dispatch({ type: ACTIONS.INCREMENT });
  };
  const handleDecrement = () => {
    dispatch({ type: ACTIONS.DECREMENT });
  };

  const handleResourceType = (different) => {
    setResourceType(different);
  };

  //Const and UseState

  // 1. Const 只能更改里面的Value 并且不能Rendering
  // 2. Const 是普通Javascript 变量
  // 1. UseState , State , 更新(function) , React Rendering
  // 2. 确保UI 及时更新
  // useState is a React Hook that lets you add a state variable to your component.
  const [countState, setCount] = useState(0);
  let count = 0;

  const increment = () => {
    console.log("Count:", (count += 1));
  };
  const incrementState = () => {
    setCount((countState) => countState + 1);
  };

  //useEffect !!!
  //useEffect is a React Hook that lets you synchronize a component with an external system.
  //useEffect 是一个 React Hook，可让您将组件与外部系统同步。

  // const [countTime, setCountTime] = useState(0);

  // useEffect(() => {
  //   // 执行(Side Effect) (一些副作用)
  //   const timer = setInterval(() => {
  //     setCountTime((prevCount) => prevCount + 1);
  //   }, 500);

  //   return () => {
  //     //副作用操作需要在组件卸载前清除，以避免内存泄漏或无效的操作
  //     clearInterval(timer); // 比如没有这个ClearInterval(timer)的话 下次run 这个effect的时候 会变成两秒来加
  //     console.log("Done Clear");
  //   };
  // }, [state]);

  //useContext
  //useContext is a React Hook that lets you read and subscribe to context from your component.
  // 1. useContext 就是为了直接拿到资料 不用通过 Props
  // 2. Props 的话 就好像 ( student.name.address ) 需要经过非常多的地方 (useContext的话 能更直接的得到想要的资料)
  const trycontext = useContext(ThemeContext);

  //useMemo
  // useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
  // useMemo 是一个 React Hook，可让您在重新渲染之间缓存计算结果。
  // 缓存类似于记录或存储计算结果。它允许你将计算的结果保存在内存中，以便在将来需要相同数据时能够直接使用缓存的结果
  const [a, setA] = useState(3);
  const [b, setB] = useState(36);

  const add = useMemo(() => {
    console.log("Calculating...");
    return a + b;
  }, [a, b]);

  //用了useMemo后 他就第一次Render会走一次 过后当有value被改或者触发到的话 就会走这个function
  const expensiveValue = useMemo(() => {
    let result = 0;
    for (let i = 0; i < 10000; i++) {
      result += Math.random();
    }
    return result;
  }, [a, b]);

  //useCallback
  //useCallback is a React Hook that lets you cache a function definition between re-renders.
  //useCallback 是一个 React Hook，可让您在重新渲染之间缓存函数定义。
  const [countCallB, setCountCallB] = useState(0);
  const [countCallA, setCountCallA] = useState(10);

  const handleClick = useCallback(() => {
    console.log("Increasing");
    setCountCallB((prevCount) => prevCount + 1 + countCallA);
  }, []);
  const handleChange = () => {
    setCountCallA(50);
  };

  //useRef
  // useRef is a React Hook that lets you reference a value that’s not needed for rendering.
  // useRef 是一个 React Hook，可让您引用渲染不需要的值。
  // 有些值是组件内部使用但不希望触发组件重新渲染的，useRef 可以帮助你保存这样的变量。
  const [countRef, setcountRef] = useState(0);
  
  function usePrevious(value) {
    const renderCount = useRef();
    useEffect(() => {
      renderCount.current = value;
      console.log(renderCount.current);

    }, [countRef]);
    return renderCount.current;
  }
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // 通过 useRef 创建的引用可以访问并操作 DOM 元素
  };

  //useLayoutEffect
  //useLayoutEffect is a version of useEffect that fires before the browser repaints the screen.
  //useLayoutEffect 是 useEffect 的一个版本，在浏览器重新绘制屏幕之前触发。
  const boxRef = useRef(null);

  useLayoutEffect(() => {
    // Change background color immediately after rendering
    if (boxRef.current) {
      console.log("changing");
      boxRef.current.style.backgroundColor = "lightgreen";
    }
  }, []);

  //useImperativeHandle is a React Hook that lets you customize the handle exposed as a ref.
  //useImperativeHandle 是一个 React Hook，可让您自定义作为引用公开的句柄。

  //useDebugValue is a React Hook that lets you add a label to a custom Hook in React DevTools.
  //useDebugValue 是一个 React Hook，可让您在 React DevTools 中向自定义 Hook 添加标签。
  return (
    <>
      <div>
        {/* Use State */}
        <b>Const and UseState</b>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
      </div>
      <div>
        <p>Count: {countState}</p>
        <button onClick={incrementState}>Increment</button>
      </div>

      <p>{`${resourceType}`}</p>
      <button onClick={() => handleResourceType(123)}>Posts</button>
      <button onClick={() => handleResourceType("users")}>Users</button>
      <button onClick={() => handleResourceType("comments")}>Comments</button>
      <br />

      {/* Use Context */}
      <b>UseContext Example</b>

      <ul>
        {trycontext.map((item) => (
          <li key={item.id}>
            {" "}
            ID : {item.id} , Name : {item.name}{" "}
          </li>
        ))}
      </ul>

      {/* Use Effect */}
      <b>useEffect Example</b>
      <div>{/* <p>Timer: {countTime} seconds</p> */}</div>
      {/* Use Reducer */}
      <b>useReducer Example</b>
      <br />
      <button onClick={handleIncrement}>+</button>
      {state.count}
      <button onClick={handleDecrement}>-</button>

      <br />
      {/* Use Memo */}
      <b>useMemo Example</b>
      <p>a : {a}</p>
      <p>b : {b}</p>
      <p>Sum of a and b : {add}</p>
      <button onClick={() => setA((a) => a + 1)}>Increment A</button>
      <button onClick={() => setB((b) => b + 1)}>Increment B</button>
      <p>Expensive Value: {expensiveValue}</p>

      {/* Use CallBack */}
      <b>useCallBack Example</b>
      <div>
        <p>Count: {countCallB}</p>
        <button onClick={handleClick}>Increment Count</button>
        <button onClick={handleChange}>Change Count</button>
        <div>{countCallA}</div>
      </div>

      {/* Use Ref */}
      <b>useRef Example</b>
      <div>
        previousCount {usePrevious(countRef)} , Count {countRef}
      </div>
      <button onClick={() => setcountRef((prev) => prev + 1)}>Add One</button>
      <button onClick={() => setcountRef(0)}>Reset</button>
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={focusInput}>Focus Input</button>
      </div>

      {/* useLayoutEffect */}
      <div>
        <h2>useLayoutEffect Example</h2>
        <div
          ref={boxRef}
          style={{ width: "200px", height: "200px", border: "1px solid black" }}
        >
          This is a box
        </div>
      </div>
    </>
  );
}
