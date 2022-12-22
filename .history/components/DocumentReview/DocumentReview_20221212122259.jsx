import React from "react";

const DocumentReview = ({ title, register, type }) => {
  return (
    <div className="flex w-48 flex-col gap-2">
      <label htmlFor="status" className="block text-sm font-semibold">
        {title}
      </label>
      <select
        {...register(`${type}.documents.${title}`, {
          required: `Please, submit the ${title}`,
        })}
        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="">Select</option>
        <option value="Not Submitted">Not Submitted</option>
        <option value="Needs Review">Needs Review</option>
        <option value="Incorrect">Incorrect</option>
        <option value="Correct">Correct</option>
      </select>
    </div>
  );
};

export default DocumentReview;
