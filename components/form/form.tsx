import { SubmitHandler, useForm } from 'react-hook-form';

import styles from './form.module.css';

type Inputs = {
  number: number;
  shouldUseDictionary: boolean;
};

export type Props = {
  fetchWordlist: (
    number: number,
    shouldUseDictionary: boolean,
  ) => Promise<void>;
};

/**
 * Form component that takes user's input and submits it to the backend
 *
 * @param   fetchWordlist Fetches the wordlist from the backend
 * @returns               A form that submits the number to the backend for interpolation
 */
export function Form({ fetchWordlist }: Props): JSX.Element {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetchWordlist(data.number, data.shouldUseDictionary);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      aria-label="Number to Wordlist form"
    >
      <label className={styles.inputLabel}>
        Number input
        <input
          type="number"
          className={styles.input}
          placeholder="Enter a number to convert"
          {...register('number', { required: true, min: 0 })}
        />
      </label>
      <label className={styles.checkboxLabel}>
        <input
          className={styles.checkbox}
          type="checkbox"
          {...register('shouldUseDictionary')}
        />
        <span className="text-sm ml-1">Only English words</span>
      </label>
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
}
