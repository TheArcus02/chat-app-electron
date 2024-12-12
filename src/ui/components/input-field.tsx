const InputField = ({
  label,
  type,
  value,
  placeholder,
  onChange,
  error,
}: any) => (
  <div className='form-control w-full mb-4'>
    <label className='block text-sm font-medium text-gray-300 mb-2'>
      {label}
    </label>
    <input
      type={type}
      className='input input-bordered w-full bg-gray-700 text-white rounded-full py-3 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
  </div>
);

export default InputField;
