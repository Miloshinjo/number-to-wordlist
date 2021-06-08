import { SubmitHandler, useForm } from 'react-hook-form';
import { Keyboard } from '../keyboard/keyboard';

import styles from './form.module.css';

type Inputs = {
  number: string;
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
  const { register, handleSubmit, setValue, watch } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetchWordlist(parseInt(data.number, 10), data.shouldUseDictionary);
  };

  /**
   * Programatically sets value of the number input
   *
   * @param value Number value to set
   */
  function setInputValue(value: string): void {
    setValue('number', watch('number') + value, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  }

  /**
   * Programatically trims the last character from the value
   */
  function backspaceValue(): void {
    setValue('number', watch('number').slice(0, -1), {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  }

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
          {...register('number', {
            required: true,
            min: 0,
            max: 10000000000000,
          })}
        />
      </label>
      <Keyboard setInputValue={setInputValue} backspaceValue={backspaceValue} />
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
