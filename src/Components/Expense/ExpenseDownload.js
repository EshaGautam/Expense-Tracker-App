import React from 'react';
import './ExpenseDownload.css'
import { FaDownload } from "react-icons/fa";
import { useSelector } from 'react-redux';

const ExpenseDownload = () => {
    const expenses = useSelector((state) => state.expense.expense);
  const handleDownloadCSV = () => {

    // Convert expenses to CSV format
    const csvContent =
      "Amount,Description,Category\n" +
      expenses
        .map(
          (expense) =>
            `${expense.amount},${expense.description},${expense.category}`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';

    document.body.appendChild(a);
    a.click();
  }

  return (
    <button className='download-button'
     onClick={handleDownloadCSV}
    >
    <FaDownload />
    </button>
  )
}



export default ExpenseDownload ;
