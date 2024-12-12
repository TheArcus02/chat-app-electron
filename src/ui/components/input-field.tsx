import * as React from 'react';
import { cn } from '../lib/utils';

const InputField = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { label: string; error?: string }
>(({ className, error, ...props }, ref) => (
  <div className='form-control w-full mb-4'>
    <label className='block text-sm font-medium text-gray-300 mb-2'>
      {props.label}
    </label>
    <input
      {...props}
      ref={ref}
      className={cn(
        'input input-bordered w-full bg-gray-700 text-white rounded-full py-3 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:border-indigo-500',
        className,
      )}
    />
    {error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
  </div>
));

export default InputField;
