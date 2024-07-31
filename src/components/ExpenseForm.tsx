import categories from "./categories";
import { useForm } from "react-hook-form";

interface FormData {
  description: string;
  amount: number;
  category: string;
}

interface Props {
  onSubmit: (data: FormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          {...register("description", { required: true, minLength: 3 })}
          type="text"
          id="description"
          className="form-control"
        />
        {errors.description?.type === "required" && (
          <p className="text text-danger">Enter a description</p>
        )}
        {errors.description?.type === "minLength" && (
          <p className="text text-danger">
            the description should be at least 3 characters
          </p>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          {...register("amount", { required: true, valueAsNumber: true })}
          type="number"
          id="amount"
          className="form-control"
        />
        {errors.amount?.type === "required" && (
          <p className="text text-danger">Enter the amount</p>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          id="category"
          className="form-select"
          {...register("category", { required: true })}
        >
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category?.type === "required" && (
          <p className="text text-danger">Select a catgory</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default ExpenseForm;
