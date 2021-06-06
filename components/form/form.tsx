import { SubmitHandler, useForm } from 'react-hook-form';
import { WordlistResult } from '../../models/wordlist';
import { Keyboard } from '../keyboard/keyboard';

import styles from './form.module.css';

type Inputs = {
  number: number;
};

type Props = {
  fetchWordlist: (number: number) => Promise<void>;
};

/**
 * Form component that takes user's input and submits it to the backend
 *
 * @returns A form that submits the number to the backend for interpolation
 */
export function Form({ fetchWordlist }: Props): JSX.Element {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetchWordlist(data.number);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>
        Number input
        <input
          type="number"
          className={styles.input}
          placeholder="Enter a number to convert"
          {...register('number')}
        />
      </label>
    </form>
  );
}
