import type {Route} from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "New React Router App"},
        {name: "description", content: "Welcome to React Router!"},
    ];
}

export default function Home() {
    function submitComment() {

    }

    return (
        <div className="flex flex-col items-start *:m-1">
          <label>Name:</label>
          <input name='name' className="border border-gray-400 rounded px-2 py-1" />
          <label>Message:</label>
          <textarea name='message' className="border border-gray-400 rounded px-2 py-1" />
          <button className="border border-gray-400 rounded bg-gray-100 px-3 py-1 hover:bg-gray-200 active:bg-gray-300" onClick={submitComment}>Submit</button>
        </div>
    );
}
