import { Github } from "lucide-react";

export default function Footer() {
  return (
    <div className="absolute w-full py-5 text-center">
      <p className="text-gray-500">
        A project by{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://github.com/Suryansh-23"
          target="_blank"
          rel="noopener noreferrer"
        >
          Suryansh Chauhan
        </a>{" "}
        &{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://github.com/Ansh1902396"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rudransh Shinghal
        </a>
      </p>
      <a
        href="https://github.com/Suryansh-23/x_place"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-2 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-200 bg-white px-6 py-2 transition-all duration-75 hover:scale-105"
      >
        <Github />
        <p className="font-medium text-gray-600">Code.</p>
      </a>
    </div>
  );
}
