import { ChangeEvent } from "react"

interface LabelledInput {
    label : string,
    placeholder : string,
    type : string,
    onChange : (e : ChangeEvent<HTMLInputElement> ) => void
}

const LabelledInput = ({label , placeholder , type , onChange} : LabelledInput) => {
  return (
    <div className="my-2">
    <label>{label}</label> <br />
    <input type={type} className="w-full px-2 py-2 rounded-md border" placeholder={placeholder} onChange={onChange} />
  </div>
  )
}

export default LabelledInput