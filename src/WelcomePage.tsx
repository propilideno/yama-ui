export function WelcomePage() {
  return (
    <>
      <div className="flex justify-end">
        <div className="p-2 m-2"> Home </div>
        <div className="p-2 m-2"> History </div>
        <div className="p-2 m-2"> Chat </div>
        <div className="p-2 m-2"> Support </div>
      </div>
      <div className="p-4 m-4 flex-none justify-center">
        Welcome to yuma-ui 🚀.
        <p> A simple UI for interact with LLM </p>
        <p> Click on the menu to navigate </p>
        <p> Enjoy! </p>
      </div>

    </>
  )
}
