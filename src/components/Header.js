import { BsFillBrushFill } from 'react-icons/bs';
export function Header(props) {
    return (
        <h1 className="text-4xl font-bold underline">
            <BsFillBrushFill className='inline-block text-red-400' /> {props.title}
        </h1>
    );
}