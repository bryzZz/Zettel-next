interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...other }) => {
  return (
    <div>
      <label className="block text-xs text-gray-600 uppercase">
        {label}
        <input
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          {...other}
        />
      </label>
    </div>
  );
};
