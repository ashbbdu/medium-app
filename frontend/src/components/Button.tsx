interface Button {
    title : string,
    onClick : React.MouseEventHandler<HTMLElement>
}
const Button = ({title , onClick} : Button) => {
  return (
    <div className="w-full mt-4">
        <button className="shadow bg-black w-full focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-md" type="button" onClick={onClick}>
        {title}
      </button>

    </div>
  )
}

export default Button