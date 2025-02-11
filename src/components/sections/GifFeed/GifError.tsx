type GifErrorProps = {
  message: string;
};

function GifError({ message }: GifErrorProps) {
  return <h1 className="text-2xl text-center text-default">{message}</h1>;
}

export default GifError;
