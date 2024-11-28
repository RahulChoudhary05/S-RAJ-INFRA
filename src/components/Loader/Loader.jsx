import Loading from "../../assets/Logo/logo.svg"

const Loader = ({ size = 60 }) => {
  return (
    <div className="flex items-center justify-center">
      <img
        src={Loading}
        alt="Loading..."
        width={size}
        height={size}
        className="animate-spin"
      />
    </div>
  );
}

export default Loader;
