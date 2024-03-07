
const Appbar = () => {
  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
        <div>
            Medium
        </div>
        <div>
            <img className="h-[30px] rounded-full"
            src={`https://api.dicebear.com/5.x/initials/svg?seed=ashish`}
            alt="avatar" />
        </div>
    </div>
  )
}

export default Appbar