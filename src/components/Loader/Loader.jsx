import Loading from "../../assets/Logo/logo.svg"

const Loader = ({ size = 60 }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src={Loading}
        alt="Loading..."
        width={size}
        height={size}
      />
    </div>
  );
}

export default Loader;
